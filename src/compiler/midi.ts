// The Compiler Engine — bridges visual macro-stack state to raw MIDI bytes and
// generates multi-target exports (Scribble, MC3, Rig schema, Printable Labels, MIDI trace log).

import { ACTIONS, CONTROLLERS, type ActionId } from '../data/controllers.js';
import { DEVICES, MAX_VALUE, valueOptionsFor } from '../data/devices.js';
import { BRAINS } from '../data/brains.js';
import type { StompState, MacroStep } from '../state/types.js';
import type { ScribbleConfig, ScribblePresetSetting } from '../types/scribble.js';

const CC_STATUS_BASE = 0xb0; // Control Change

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
  const device = DEVICES[step.device];
  const control = device.controls.find((c) => c.id === step.control)!;
  const channel = channels && channels[step.device] ? channels[step.device] : device.midiChannel;
  const value = step.value ?? MAX_VALUE;
  let label = control.label;
  if (step.value !== null && step.value !== undefined) {
    const opt = valueOptionsFor(control).find((v) => v.value === step.value);
    if (opt) label += ' · ' + opt.label;
  }
  const statusByte = CC_STATUS_BASE + (channel - 1);
  return {
    label,
    deviceId: device.id,
    deviceName: device.name,
    accent: device.accent,
    channel,
    cc: control.cc,
    value,
    message: { statusByte, dataByte1: control.cc, dataByte2: value },
  };
}

export function hexByte(n: number): string {
  return '0x' + n.toString(16).toUpperCase().padStart(2, '0');
}

export const hex = (n: number) => n.toString(16).toUpperCase().padStart(2, '0');

export function usedDeviceIds(state: StompState): string[] {
  const map: Record<string, boolean> = {};
  state.banks.forEach((b) => {
    Object.keys(b).forEach((k) => {
      ACTIONS.forEach(({ id: action }) => {
        b[k][action].forEach((s) => {
          map[s.device] = true;
        });
      });
    });
  });
  return Object.keys(map);
}

export function usedControlIds(state: StompState, deviceId: string): string[] {
  const map: Record<string, boolean> = {};
  state.banks.forEach((b) => {
    Object.keys(b).forEach((k) => {
      ACTIONS.forEach(({ id: action }) => {
        b[k][action].forEach((s) => {
          if (s.device === deviceId) map[s.control] = true;
        });
      });
    });
  });
  return Object.keys(map);
}

export function eachStack(
  state: StompState,
  fn: (bankIndex: number, switchKey: string, keyIndex: number, action: { id: ActionId; label: string }, list: MacroStep[]) => void,
) {
  state.banks.forEach((bank, bankIndex) => {
    Object.keys(bank).forEach((switchKey, keyIndex) => {
      ACTIONS.forEach((action) => {
        const list = bank[switchKey][action.id];
        if (list.length) fn(bankIndex, switchKey, keyIndex, action, list);
      });
    });
  });
}

export function compileRigJson(state: StompState) {
  const pedals: Record<string, any> = {};
  usedDeviceIds(state).forEach((id) => {
    const d = DEVICES[id];
    const ccMap: Record<string, number> = {};
    usedControlIds(state, id).forEach((cid) => {
      const c = d.controls.find((x) => x.id === cid);
      if (c) ccMap[cid] = c.cc;
    });
    pedals[id] = { name: d.name, channel: state.channels[id] || d.midiChannel, cc: ccMap };
  });

  return {
    schema: 'stomp-stacks/rig@1',
    controller: state.controllerId,
    brain: state.brainId,
    pedals,
    banks: state.banks.map((b) => {
      const outBank: Record<string, any> = {};
      Object.keys(b).forEach((k) => {
        const outActions: Record<string, any> = {};
        ACTIONS.forEach((a) => {
          if (b[k][a.id].length) {
            outActions[a.id] = b[k][a.id].map((s) => ({
              pedal: s.device,
              control: s.control,
              value: s.value === null || s.value === undefined ? MAX_VALUE : s.value,
            }));
          }
        });
        if (Object.keys(outActions).length) outBank[k] = outActions;
      });
      return outBank;
    }),
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

export function compileScribbleMacroJson(state: StompState) {
  const macros: any[] = [];
  eachStack(state, (bankIndex, _key, keyIndex, action, list) => {
    macros.push({
      trigger: { bank: bankIndex + 1, cc: 80 + keyIndex, action: action.id },
      messages: list.map((s) => {
        const d = describeStep(s, state.channels);
        return [176 + d.channel - 1, d.cc, d.value];
      }),
    });
  });
  return { schema: 'stomp-stacks/scribble@1', input: { port: 'usb-host', channel: 1 }, output: { port: 'trs-a' }, macros };
}

export interface CompileLine {
  text: string;
  muted?: boolean;
  bold?: boolean;
}

/** Dynamic preview builder supporting all target formats. */
export function buildPreview(state: StompState): CompileLine[] {
  const out: CompileLine[] = [];
  const push = (t: string, opts?: { muted?: boolean; bold?: boolean }) => {
    out.push({ text: t === '' ? ' ' : t, ...opts });
  };

  const target = state.targetId;
  const ctrl = CONTROLLERS[state.controllerId];
  const brain = BRAINS[state.brainId];

  if (target === 'rig' || target === 'scribble' || target === 'mc3') {
    const obj = target === 'rig' ? compileRigJson(state) : target === 'scribble' ? compileScribbleMacroJson(state) : compileMc3Json(state);
    JSON.stringify(obj, null, 2).split('\n').forEach((line) => push(line));
  } else if (target === 'labels') {
    push(`STOMP STACKS · ${ctrl.name}`, { bold: true });
    push(`via ${brain.full.toLowerCase()}`, { muted: true });
    eachStack(state, (bi, k, _ki, a, l) => {
      push('');
      push(`bank ${bi + 1}  ·  switch ${k}  ·  ${a.label}`, { bold: true });
      l.forEach((s, i) => {
        const d = describeStep(s, state.channels);
        push(`   ${i + 1}. ${d.deviceName} — ${d.label}`);
      });
    });
  } else {
    eachStack(state, (bi, k, _ki, a, l) => {
      push(`▸ bank ${bi + 1} · ${k} ${a.label}`, { bold: true });
      l.forEach((s) => {
        const d = describeStep(s, state.channels);
        push(`    ${hex(176 + d.channel - 1)} ${hex(d.cc)} ${hex(d.value)}    ${d.deviceName} ${d.label}`, { muted: true });
      });
      push('');
    });
  }

  if (!out.length) push('nothing stacked yet — go poke a pedal', { muted: true });
  return out;
}

export interface IssueItem {
  type: 'warn' | 'ok';
  text: string;
}

export function findIssues(state: StompState): IssueItem[] {
  const brain = BRAINS[state.brainId];
  const ctrl = CONTROLLERS[state.controllerId];
  const out: IssueItem[] = [];

  let over = 0;
  let worst = 0;

  eachStack(state, (_bi, _k, _ki, _a, list) => {
    if (list.length > brain.maxSteps) {
      over++;
      if (list.length > worst) worst = list.length;
    }
  });

  if (over) {
    out.push({
      type: 'warn',
      text: `${over} stack${over === 1 ? '' : 's'} run to ${worst} messages — ${brain.full.toLowerCase()} sends ${brain.maxSteps}${
        state.brainId === 'none' ? '. this is the case for a brain.' : '. trim them or move up.'
      }`,
    });
  }

  if (state.banks.length > brain.banks) {
    out.push({
      type: 'warn',
      text: `${ctrl.name} has ${state.banks.length} banks; ${brain.full.toLowerCase()} holds ${brain.banks}.`,
    });
  }

  if (state.brainId === 'onboard' && !ctrl.onboard) {
    out.push({
      type: 'warn',
      text: `${ctrl.name} can't hold stacks onboard — it only sends one message per switch.`,
    });
  }

  const orphans = usedDeviceIds(state).filter((id) => !state.rig.includes(id));
  if (orphans.length) {
    out.push({
      type: 'warn',
      text: `${orphans.map((id) => DEVICES[id]?.name || id).join(' + ')} ${
        orphans.length === 1 ? 'is' : 'are'
      } stacked but no longer in the rig — those steps won't be sent.`,
    });
  }

  const byCh: Record<number, string[]> = {};
  usedDeviceIds(state).forEach((id) => {
    const ch = state.channels[id] || (DEVICES[id] ? DEVICES[id].midiChannel : 1);
    (byCh[ch] = byCh[ch] || []).push(DEVICES[id]?.name || id);
  });
  Object.keys(byCh).forEach((cStr) => {
    const c = Number(cStr);
    if (byCh[c].length > 1) {
      out.push({
        type: 'warn',
        text: `${byCh[c].join(' + ')} are both on channel ${c} — their cc numbers will collide.`,
      });
    }
  });

  if (state.targetId === 'mc3' && state.controllerId !== 'mc3') {
    out.push({
      type: 'warn',
      text: `building an mc3 preset, but the rig is set to ${ctrl.name}.`,
    });
  }

  if (state.targetId === 'scribble' && state.brainId !== 'scribble') {
    out.push({
      type: 'warn',
      text: `building a scribble config, but the brain is set to ${brain.full.toLowerCase()}.`,
    });
  }

  if (!out.length) {
    out.push({ type: 'ok', text: 'all clear — nothing collides, nothing overflows.' });
  }

  return out;
}

export function compileConfig(state: StompState) {
  const presetSettings: any[] = [];
  state.banks.forEach((bank, bankIndex) => {
    Object.keys(bank).forEach((switchKey) => {
      ACTIONS.forEach(({ id: action }) => {
        const steps = bank[switchKey][action];
        if (!steps.length) return;
        presetSettings.push({
          presetName: `bank${bankIndex + 1}-${switchKey}-${action}`,
          trigger: { controller: state.controllerId, bank: bankIndex, switchKey, action },
          presetMessages: { messages: steps.map((s) => describeStep(s, state.channels).message) },
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

export function compileHardwareScribbleConfig(state: StompState): ScribbleConfig {
  const presetSettings: ScribblePresetSetting[] = [];

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
            const d = describeStep(step, state.channels);
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
      colour: messages.length > 0 ? 582655 : 0,
      textColourOverride: messages.length > 0,
      textColour: messages.length > 0 ? 16777215 : 0,
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
