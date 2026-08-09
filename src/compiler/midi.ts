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
