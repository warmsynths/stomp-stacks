import type { StompState, MacroStep } from '../../state/types.js';
import { ACTIONS } from '../../data/controllers.js';
import { HardwareRegistry } from '../../data/registry.js';
import { MAX_VALUE } from '../../data/devices.js';
import { SEED_SETS, type PedalSetup } from '../../data/setups.js';
import { knobWord } from '../../state/macro-stack-model.js';
import { NAMING, FALLBACK, type ColorName } from '../../data/naming.js';
import type { TargetAdapter, TargetExportFile, CompileLine } from './types.js';

const CC_STATUS_BASE = 0xb0;
const PC_STATUS_BASE = 0xc0;

export interface CompiledMessage {
  statusByte: number;
  dataByte1: number;
  dataByte2: number;
}

export interface DescribedStep {
  label: string;
  stepLabel: string;
  deviceId: string;
  deviceName: string;
  accent: string;
  channel: number;
  cc: number | null;
  value: number;
  pc?: boolean;
  bytes: number[];
  message: CompiledMessage;
}

export function describeStep(
  step: MacroStep,
  channels?: Record<string, number>,
  pedalSets?: PedalSetup[],
  offsets?: Record<string, number>,
): DescribedStep {
  const device = HardwareRegistry.getDevice(step.device);
  const isPc = step.control === 'pc' || step.control === '__pc__';
  const control = isPc ? null : HardwareRegistry.getControl(step.device, step.control);
  const channel = channels && channels[step.device] ? channels[step.device] : device?.midiChannel || 1;

  if (isPc) {
    const sets = pedalSets || SEED_SETS;
    const set = step.set ? sets.find((s) => s.id === step.set) : null;
    const value = step.set ? (set ? set.slot : 0) : (step.value ?? 0);
    const stepLabel = step.set ? (set ? set.name.toUpperCase() : 'SET-UP') : step.label || `PC ${value}`;
    const label = step.set
      ? `load set-up · ${set ? set.name : 'missing'}`
      : step.label
        ? `Preset ${value} · ${step.label}`
        : `Preset ${value} · PC ${value}`;
    const statusByte = PC_STATUS_BASE + (channel - 1);

    return {
      label,
      stepLabel,
      deviceId: device?.id || step.device,
      deviceName: device?.name || step.device,
      accent: device?.accent || '#ffffff',
      channel,
      cc: null,
      value,
      pc: true,
      bytes: [statusByte, value],
      message: { statusByte, dataByte1: value, dataByte2: 0 },
    };
  }

  const numValue = step.value === null || step.value === undefined ? MAX_VALUE : Number(step.value);
  const options = control ? HardwareRegistry.valueOptionsFor(control) : [];

  // Match option by explicit label/oledLabel first when multiple options share a value (e.g., consolidated switch options)
  const opt =
    (step.label
      ? options.find((v) => v.oledLabel === step.label || v.label.toLowerCase() === step.label?.toLowerCase())
      : undefined) || options.find((v) => v.value === numValue);

  const isOptionPc = !!(control?.pc || opt?.pc);
  if (isOptionPc) {
    const statusByte = PC_STATUS_BASE + (channel - 1);
    const stepLabel = step.label || opt?.oledLabel || opt?.label.toUpperCase() || `PC ${numValue}`;
    const label = `${control?.label || step.control} · ${opt?.label || `PC ${numValue}`}`;
    return {
      label,
      stepLabel,
      deviceId: device?.id || step.device,
      deviceName: device?.name || step.device,
      accent: device?.accent || '#ffffff',
      channel,
      cc: null,
      value: numValue,
      pc: true,
      bytes: [statusByte, numValue],
      message: { statusByte, dataByte1: numValue, dataByte2: 0 },
    };
  }

  let stepLabel = step.label || '';
  if (!stepLabel && opt) {
    stepLabel = (opt.oledLabel || opt.label).toUpperCase();
  }
  if (!stepLabel && control) {
    stepLabel = control.short.toUpperCase();
  }

  let label = control?.label || step.control;
  if (step.label && !opt) {
    label += ' · ' + step.label;
  } else if (step.value !== null && step.value !== undefined && control) {
    if (opt) {
      label += ' · ' + opt.label;
    } else if (control.type === 'knob') {
      label += ' · ' + knobWord(numValue);
    } else {
      label += ' · ' + numValue;
    }
  }

  const baseCc = opt?.cc !== undefined ? opt.cc : (control?.cc ?? 0);
  const cc = baseCc + (offsets?.[step.device] || 0);
  const statusByte = CC_STATUS_BASE + (channel - 1);

  return {
    label,
    stepLabel,
    deviceId: device?.id || step.device,
    deviceName: device?.name || step.device,
    accent: device?.accent || '#ffffff',
    channel,
    cc,
    value: numValue,
    pc: false,
    bytes: [statusByte, cc, numValue],
    message: { statusByte, dataByte1: cc, dataByte2: numValue },
  };
}

export function colorForTarget(targetId: string, colorName: ColorName | null): ColorName | null {
  if (!colorName) return null;
  const t = NAMING[targetId];
  if (!t) return null;
  if (t.colors === null) return colorName;
  if (!t.colors.length) return null;
  if (t.colors.includes(colorName)) return colorName;
  const f = FALLBACK[colorName];
  return f && t.colors.includes(f) ? f : t.colors[0];
}

export function compileMc3Json(state: StompState) {
  const NAME_MAP: Record<string, string> = { press: 'Press', hold: 'Long Press', double: 'Double Tap' };
  const presets: any[] = [];
  state.banks.slice(0, 3).forEach((b, bankIndex) => {
    Object.keys(b).forEach((switchKey) => {
      const acts: Record<string, any> = {};
      ACTIONS.forEach((a) => {
        const list = b[switchKey][a.id];
        if (list.length) {
          acts[NAME_MAP[a.id]] = list.slice(0, 6).map((s) => {
            const d = describeStep(s, state.channels, state.pedalSets, state.offsets);
            if (d.pc) {
              return {
                type: 'Program Change',
                channel: d.channel,
                number: d.value,
                label: d.stepLabel || d.label,
              };
            }
            return {
              type: 'Control Change',
              channel: d.channel,
              cc: d.cc ?? 0,
              value: d.value,
              label: d.stepLabel || d.label,
            };
          });
        }
      });
      if (!Object.keys(acts).length) return;
      const namingKey = `${bankIndex}:${switchKey}`;
      const n = (state.naming && state.naming[namingKey]) || {};
      const shortName = n.name ? n.name.slice(0, 8) : '';
      const ledColor = colorForTarget('mc3', n.color || null);

      presets.push({
        bank: bankIndex + 1,
        switch: switchKey,
        preset: switchKey,
        name: shortName,
        shortName,
        ledColor,
        ledColour: ledColor,
        actions: acts,
      });
    });
  });
  return { schema: 'stomp-stacks/mc3@1', device: 'Morningstar MC3', banks: 3, presets };
}

export class Mc3TargetAdapter implements TargetAdapter {
  id = 'mc3';
  name = 'Morningstar MC3 JSON';

  compileExport(state: StompState): TargetExportFile {
    const json = compileMc3Json(state);
    return {
      filename: `mc3-preset.json`,
      mimeType: 'application/json',
      content: JSON.stringify(json, null, 2),
    };
  }

  compilePreview(state: StompState): CompileLine[] {
    const json = compileMc3Json(state);
    return JSON.stringify(json, null, 2)
      .split('\n')
      .map((line) => ({ text: line }));
  }
}
