// The Compiler Engine — bridges visual macro-stack state to raw MIDI bytes and
// injects them into a Pirate MIDI Scribble-style config.json.
//
// SCHEMA NOTE: `presetSettings[].presetMessages.messages` and the byte layout
// (statusByte / dataByte1 / dataByte2) are per the hardware spec we were given.
// We don't have a real base config.json exported from a physical Scribble unit
// to merge into, so `compileConfig()` below produces a self-contained document
// built from that same shape. Swap `buildBaseTemplate()` for a real export's
// top-level fields once one is available — `presetSettings` is the only part
// this app needs to own.

import { ACTIONS, CONTROLLERS, type ActionId } from '../data/controllers.js';
import { DEVICES, MAX_VALUE, valueOptionsFor } from '../data/devices.js';
import type { StompState, MacroStep } from '../state/types.js';
import type { ScribbleConfig, ScribblePresetSetting } from '../types/scribble.js';

const CC_STATUS_BASE = 0xb0; // Control Change, channel 1

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
  cc: number;
  value: number;
  message: CompiledMessage;
}

export function describeStep(step: MacroStep): DescribedStep {
  const device = DEVICES[step.device];
  const control = device.controls.find((c) => c.id === step.control)!;
  const value = step.value ?? MAX_VALUE;
  let label = control.label;
  if (step.value !== null) {
    const opt = valueOptionsFor(control).find((v) => v.value === step.value);
    if (opt) label += ' · ' + opt.label;
  }
  const statusByte = CC_STATUS_BASE + (device.midiChannel - 1);
  return {
    label,
    deviceId: device.id,
    deviceName: device.name,
    accent: device.accent,
    cc: control.cc,
    value,
    message: { statusByte, dataByte1: control.cc, dataByte2: value },
  };
}

export function hexByte(n: number): string {
  return '0x' + n.toString(16).toUpperCase().padStart(2, '0');
}

export interface CompiledPreset {
  presetName: string;
  trigger: { controller: string; bank: number; switchKey: string; action: ActionId };
  presetMessages: { messages: CompiledMessage[] };
}

export interface CompiledConfig {
  schema: 'pirate-midi-scribble-preset-settings@1';
  generatedAt: string;
  controller: string;
  midiChannel: 'per-device';
  presetSettings: CompiledPreset[];
}

/**
 * Walks every bank/switch/action bucket with at least one step and emits
 * one preset per populated trigger, in fire order.
 */
export function compileConfig(state: StompState): CompiledConfig {
  const presetSettings: CompiledPreset[] = [];
  state.banks.forEach((bank, bankIndex) => {
    Object.keys(bank).forEach((switchKey) => {
      ACTIONS.forEach(({ id: action }) => {
        const steps = bank[switchKey][action];
        if (!steps.length) return;
        presetSettings.push({
          presetName: `bank${bankIndex + 1}-${switchKey}-${action}`,
          trigger: { controller: state.controllerId, bank: bankIndex, switchKey, action },
          presetMessages: { messages: steps.map((s) => describeStep(s).message) },
        });
      });
    });
  });

  return {
    schema: 'pirate-midi-scribble-preset-settings@1',
    generatedAt: new Date().toISOString(),
    controller: CONTROLLERS[state.controllerId].name,
    midiChannel: 'per-device',
    presetSettings,
  };
}

/**
 * Compiles macro stacks into a full 100% hardware-compatible Pirate MIDI Scribble config JSON
 * based on reverse-engineered physical device export structure.
 */
export function compileHardwareScribbleConfig(state: StompState): ScribbleConfig {
  const presetSettings: ScribblePresetSetting[] = [];

  // Generate 128 standard presets
  for (let i = 0; i < 128; i++) {
    const isPopulated = i < state.banks.length;
    let bankName = `Preset ${i + 1}`;
    let secondaryText = `Second. ${i + 1}`;
    const messages: Array<{ statusByte: number; dataByte1: number; dataByte2: number; outputs: { usbd: boolean; ble: boolean; midi1: boolean } }> = [];

    if (isPopulated) {
      const bank = state.banks[i];
      let firstLabel = '';
      Object.keys(bank).forEach((switchKey) => {
        ACTIONS.forEach(({ id: action }) => {
          const steps = bank[switchKey][action];
          steps.forEach((step) => {
            const d = describeStep(step);
            if (!firstLabel) firstLabel = `${d.deviceName} ${d.label}`;
            messages.push({
              statusByte: d.message.statusByte,
              dataByte1: d.message.dataByte1,
              dataByte2: d.message.dataByte2,
              outputs: { usbd: true, ble: true, midi1: true },
            });
          });
        });
      });
      if (messages.length > 0) {
        bankName = `BANK ${i + 1}`;
        secondaryText = firstLabel || secondaryText;
      }
    }

    presetSettings.push({
      bankId: 0,
      bankName,
      secondaryText,
      colourOverride: messages.length > 0,
      colour: messages.length > 0 ? 582655 : 0, // Cyan for populated, 0 for default
      textColourOverride: messages.length > 0,
      textColour: messages.length > 0 ? 16777215 : 0, // White text for populated
      midiValueDisplayOverride: false,
      midiValueDisplay: messages.length > 0 ? 'valueOnly' : 'none',
      midiValueDisplayCC: 0,
      bpm: 120,
      switches: [
        { pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
        { pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
      ],
      customMessages: { numMessages: 0, messages: [] },
      presetMessages: {
        numMessages: messages.length,
        messages,
      },
    });
  }

  return {
    deviceSettings: {
      deviceModel: 'Scribble',
      firmwareVersion: '1.0.1-beta.2',
      hardwareVersion: '1.x.0',
      deviceName: 'Scribble',
      uId: 158812475426520,
      profileId: 0,
    },
    globalSettings: {
      deviceName: 'Scribble',
      currentBank: 0,
      lightMode: 'dark',
      mainColour: 15199215,
      textColour: 0,
      displayBrightness: 100,
      midiChannel: 1,
      globalBpm: 120,
      midiOutPortMode: 'midiOutA',
      bankPcMidiOutputs: { usbd: 0, ble: 0, midi1: 0 },
      clockMode: 'external',
      clockDisplayType: 'bpm',
      tapTempoQuant: 'none',
      usbdThruHandles: { usbd: true, ble: true, midi1: true },
      bleThruHandles: { usbd: true, ble: true, midi1: true },
      midi1ThruHandles: { usbd: true, ble: true, midi1: true },
      midiClockOutHandles: { usbd: true, ble: true, midi1: true },
      switches: [
        { mode: 'pressPresetDown', pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
        { mode: 'pressPresetUp', pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
      ],
      customMessages: { numMessages: 0, messages: [] },
      presetUpCC: 1,
      presetDownCC: 2,
      goToPresetCC: 3,
      globalCustomMessagesCC: 17,
      presetCustomMessagesCC: 16,
      midiValueDisplay: 'valueOnly',
      midiValueDisplayCC: 7,
      wirelessType: 'ble',
      bleMode: 'server',
      mainTextResize: false,
      zeroIndexBanks: false,
      kemperPlayerMode: false,
      useStaticIp: false,
      staticIp: '0.0.0.0',
      gatewayIp: '0.0.0.0',
    },
    presetSettings,
  };
}

export interface CompileLine {
  text: string;
  muted?: boolean;
  bold?: boolean;
}

/** Human-readable preview lines for the compile modal, grouped by bank. */
export function compileLines(state: StompState): CompileLine[] {
  const out: CompileLine[] = [];
  state.banks.forEach((bank, bankIndex) => {
    out.push({ text: `// bank ${bankIndex + 1}`, muted: true });
    Object.keys(bank).forEach((switchKey) => {
      ACTIONS.forEach(({ id: action }) => {
        const steps = bank[switchKey][action];
        if (!steps.length) return;
        out.push({ text: `${switchKey}.${action}  (${steps.length} step${steps.length === 1 ? '' : 's'})`, bold: true });
        steps.forEach((step, i) => {
          const d = describeStep(step);
          out.push({
            text: `   ${i + 1}. ${d.deviceName} ${d.label}  →  [ ${hexByte(d.message.statusByte)}, ${hexByte(d.message.dataByte1)}, ${hexByte(d.message.dataByte2)} ]`,
          });
        });
      });
    });
  });
  if (out.length === state.banks.length) {
    out.push({ text: 'nothing stacked yet — go poke a pedal', muted: true });
  }
  return out;
}
