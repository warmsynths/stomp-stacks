import type { StompState, MacroStep } from '../../state/types.js';
import { ACTIONS } from '../../data/controllers.js';
import { HardwareRegistry } from '../../data/registry.js';
import { MAX_VALUE } from '../../data/devices.js';
import type { TargetAdapter, TargetExportFile, CompileLine } from './types.js';

const CC_STATUS_BASE = 0xb0;

export interface CompiledMessage {
  statusByte: number;
  dataByte1: number;
  dataByte2: number;
}

export interface DescribedStep {
  label: string;
  deviceId: string;
  deviceName: string;
  accent: string;
  channel: number;
  cc: number;
  value: number;
  message: CompiledMessage;
}

export function describeStep(step: MacroStep, channels?: Record<string, number>): DescribedStep {
  const device = HardwareRegistry.getDevice(step.device);
  const control = HardwareRegistry.getControl(step.device, step.control);
  const channel = channels && channels[step.device] ? channels[step.device] : device?.midiChannel || 1;
  const value = step.value ?? MAX_VALUE;
  
  let label = control?.label || step.control;
  if (step.value !== null && step.value !== undefined && control) {
    const opt = HardwareRegistry.valueOptionsFor(control).find((v) => v.value === step.value);
    if (opt) label += ' · ' + opt.label;
  }
  const cc = control?.cc || 0;
  const statusByte = CC_STATUS_BASE + (channel - 1);
  
  return {
    label,
    deviceId: device?.id || step.device,
    deviceName: device?.name || step.device,
    accent: device?.accent || '#ffffff',
    channel,
    cc,
    value,
    message: { statusByte, dataByte1: cc, dataByte2: value },
  };
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
            const d = describeStep(s, state.channels);
            return { type: 'Control Change', channel: d.channel, cc: d.cc, value: d.value };
          });
        }
      });
      if (Object.keys(acts).length) {
        presets.push({ bank: bankIndex + 1, preset: switchKey, name: switchKey, actions: acts });
      }
    });
  });

  return { device: 'Morningstar MC3', schema: 'stomp-stacks/mc3@1', presets };
}

export class Mc3TargetAdapter implements TargetAdapter {
  id = 'mc3';
  name = 'Morningstar MC3';

  compileExport(state: StompState): TargetExportFile {
    const json = compileMc3Json(state);
    return {
      filename: `mc3-preset-${state.controllerId}.json`,
      mimeType: 'application/json',
      content: JSON.stringify(json, null, 2),
    };
  }

  compilePreview(state: StompState): CompileLine[] {
    const json = compileMc3Json(state);
    return JSON.stringify(json, null, 2)
      .split('\n')
      .map((line) => ({ text: line || ' ' }));
  }
}
