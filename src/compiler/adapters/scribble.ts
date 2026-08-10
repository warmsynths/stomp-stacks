import type { StompState, MacroStep } from '../../state/types.js';
import { ACTIONS, type ActionId } from '../../data/controllers.js';
import { HardwareRegistry } from '../../data/registry.js';
import {
  type ScribbleConfig,
  type ScribbleBankSetting,
  type ScribbleMessage,
  type MessageOutputs,
  BANK_COUNT,
  MAX_BANK_TEXT_LENGTH,
  MAX_MESSAGES_PER_STACK,
} from '../../types/scribble.js';
import { describeStep } from './mc3.js';
import type { TargetAdapter, TargetExportFile, CompileLine } from './types.js';

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

import { HEX, TEXTHEX } from '../../data/naming.js';

export function compileScribbleMacroJson(state: StompState) {
  const macros: any[] = [];
  eachStack(state, (bankIndex, key, keyIndex, action, list) => {
    const namingKey = `${bankIndex}:${key}`;
    const n = (state.naming && state.naming[namingKey]) || {};
    const name = n.name ? n.name.slice(0, 12) : '';
    const secondary = n.secondary ? n.secondary.slice(0, 12) : '';
    const mainColour = n.color ? HEX[n.color] : null;
    const textColour = n.textColor ? TEXTHEX[n.textColor] : '#f7f1e3';

    macros.push({
      trigger: { bank: bankIndex + 1, cc: 80 + keyIndex, action: action.id },
      strip: {
        name,
        secondary,
        mainColour,
        textColour,
      },
      messages: list.map((s) => {
        const d = describeStep(s, state.channels);
        return [176 + d.channel - 1, d.cc, d.value];
      }),
    });
  });
  return { schema: 'stomp-stacks/scribble@1', input: { port: 'usb-host', channel: 1 }, output: { port: 'trs-a' }, macros };
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
    controller: HardwareRegistry.getController(state.controllerId).name,
    midiChannel: 'per-device',
    presetSettings,
  };
}

/** Every message we emit fans out to all three ports. */
const ALL_OUTPUTS: MessageOutputs = { usb: true, ble: true, midi1: true };

export function compileHardwareScribbleConfig(state: StompState): ScribbleConfig {
  const bankSettings: ScribbleBankSetting[] = [];

  for (let i = 0; i < BANK_COUNT; i++) {
    const isPopulated = i < state.banks.length;
    let bankName = `Preset ${i + 1}`;
    let secondaryText = `Second. ${i + 1}`;
    let presetColour = 0;
    const messages: ScribbleMessage[] = [];

    if (isPopulated) {
      const bank = state.banks[i];
      const pedalNamesSet = new Set<string>();
      const stepLabels: string[] = [];

      Object.keys(bank).forEach((switchKey) => {
        ACTIONS.forEach(({ id: action }) => {
          const steps = bank[switchKey][action];
          steps.forEach((step) => {
            const d = describeStep(step, state.channels);
            pedalNamesSet.add(d.deviceName.toUpperCase());
            if (stepLabels.length < 2) stepLabels.push(`${d.deviceName} ${d.label}`);
            if (!presetColour) {
              presetColour = HardwareRegistry.getDeviceAccentColorInt(step.device);
            }
            messages.push({
              statusByte: d.message.statusByte,
              dataByte1: d.message.dataByte1,
              dataByte2: d.message.dataByte2,
              outputs: { ...ALL_OUTPUTS },
            });
          });
        });
      });

      if (messages.length > 0) {
        const pedalsArr = Array.from(pedalNamesSet);
        bankName = pedalsArr.length ? pedalsArr.join(' + ') : `BANK ${i + 1}`;
        secondaryText = stepLabels.join(' · ') || `Bank ${i + 1}`;
      }
    }

    // The device caps every stack at 8 messages and every display string at 17
    // characters; anything longer is rejected rather than truncated on arrival.
    const presetMessages = messages.slice(0, MAX_MESSAGES_PER_STACK);

    bankSettings.push({
      bankId: i,
      bankName: bankName.slice(0, MAX_BANK_TEXT_LENGTH),
      secondaryText: secondaryText.slice(0, MAX_BANK_TEXT_LENGTH),
      colourOverride: messages.length > 0,
      colour: messages.length > 0 ? (presetColour || 582655) : 0,
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
        numMessages: presetMessages.length,
        messages: presetMessages,
      },
    });
  }

  return {
    deviceSettings: {
      deviceModel: 'Scribble',
      firmwareVersion: '1.0.1',
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
      midiChannel: 0, // Device API channels are zero-based (0-15)
      globalBpm: 120,
      midiOutPortMode: 'midiOutA',
      pcBankOutputs: { usbd: 1, ble: 1, midi1: 1 },
      clockMode: 'external',
      clockDisplayType: 'bpm',
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
      kemperPlayerMode: false,
      useStaticIp: false,
      staticIp: '0.0.0.0',
      gatewayIp: '0.0.0.0',
    },
    bankSettings,
  };
}

export interface ParsedScribblePreset {
  bankIndex: number;
  key: string;
  presetName: string;
  secondaryText: string;
  steps: MacroStep[];
}

function extractPresetNaming(
  preset: any,
  keyIndex: number,
  steps: MacroStep[],
  bankIndex: number,
  _key?: string,
): { presetName: string; secondaryText: string } {


  const sw = preset?.switches?.[keyIndex] || {};

  let name =
    preset?.bankName ||
    preset?.presetName ||
    preset?.name ||
    preset?.label ||
    preset?.strip?.name ||
    sw?.name ||
    sw?.label ||
    sw?.presetName ||
    sw?.bankName ||
    sw?.strip?.name ||
    '';

  let secondary =
    preset?.secondaryText ||
    preset?.secondary ||
    preset?.description ||
    preset?.strip?.secondary ||
    sw?.secondaryText ||
    sw?.secondary ||
    sw?.description ||
    sw?.strip?.secondary ||
    '';

  name = typeof name === 'string' ? name.trim() : '';
  secondary = typeof secondary === 'string' ? secondary.trim() : '';

  if (!name) {
    if (steps.length > 0) {
      const devNames = Array.from(
        new Set(
          steps.map((s) => {
            const d = HardwareRegistry.getDevice(s.device);
            return d ? d.name.toUpperCase() : s.device.toUpperCase();
          }),
        ),
      );
      name = devNames.join(' + ');

      if (!secondary) {
        const ctrlNames = steps.map((s) => {
          const d = HardwareRegistry.getDevice(s.device);
          const c = d?.controls.find((x) => x.id === s.control);
          return c ? c.short || c.label : s.control;
        });
        secondary = ctrlNames.join(' · ');
      }
    } else {
      name = `Preset ${bankIndex * 4 + keyIndex + 1}`;
    }
  }

  return { presetName: name, secondaryText: secondary };
}

export function parseAllScribblePresets(
  config: any,
  channels: Record<string, number>,
  keys: string[] = ['A', 'B', 'C', 'D'],
): ParsedScribblePreset[] {
  const presets: ParsedScribblePreset[] = [];

  const channelToDevice: Record<number, string> = {};
  Object.keys(channels).forEach((devId) => {
    channelToDevice[channels[devId]] = devId;
  });
  const fallbackDevId = Object.keys(channels)[0] || 'blooper';

  function parseMessageList(rawMessages: any[]): MacroStep[] {
    const steps: MacroStep[] = [];
    if (!Array.isArray(rawMessages)) return steps;

    rawMessages.forEach((msg) => {
      let statusByte = 0;
      let cc = 0;
      let val = 127;

      if (Array.isArray(msg)) {
        statusByte = msg[0] || 0;
        cc = msg[1] || 0;
        val = msg[2] ?? 127;
      } else if (msg && typeof msg === 'object') {
        // Smart messages (blockingDelay, sendCurrentPreset) are device control
        // ops, not MIDI — they map to no pedal control.
        if (typeof msg.smartType === 'string') return;
        statusByte = msg.statusByte || 0;
        cc = msg.dataByte1 || 0;
        val = msg.dataByte2 ?? 127;
      }

      const ch = (statusByte & 0x0f) + 1;
      const devId = channelToDevice[ch] || fallbackDevId;
      const dev = HardwareRegistry.getDevice(devId);
      if (!dev) return;

      const control = dev.controls.find((c) => c.cc === cc) || dev.controls[0];
      if (!control) return;

      steps.push({
        device: devId,
        control: control.id,
        value: val === 127 && control.type === 'foot' ? null : val,
      });
    });

    return steps;
  }

  if (Array.isArray(config?.macros) && config.macros.length > 0) {
    config.macros.forEach((m: any) => {
      let bankIndex = 0;
      let key = 'A';

      if (m.trigger) {
        if (typeof m.trigger.bank === 'number') {
          bankIndex = Math.max(0, m.trigger.bank - 1);
        }
        if (typeof m.trigger.cc === 'number') {
          const idx = m.trigger.cc - 80;
          if (idx >= 0 && idx < keys.length) key = keys[idx];
        } else if (typeof m.trigger.action === 'string') {
          key = m.trigger.action;
        }
      }

      const keyIndex = Math.max(0, keys.indexOf(key));
      const steps = parseMessageList(m.messages || []);
      const naming = extractPresetNaming(m, keyIndex, steps, bankIndex);


      presets.push({
        bankIndex,
        key,
        presetName: naming.presetName,
        secondaryText: naming.secondaryText,
        steps,
      });
    });

    return presets;
  }

  // `bankSettings` is the Device API term; `presetSettings` appears in configs
  // this app exported before the schema was corrected, so both are accepted.
  const rawPresets: any[] = Array.isArray(config?.bankSettings)
    ? config.bankSettings
    : Array.isArray(config?.presetSettings)
      ? config.presetSettings
      : [];
  if (rawPresets.length > 0) {
    rawPresets.forEach((preset: any, idx: number) => {
      const bankIndex = typeof preset.bankId === 'number' ? Math.floor(preset.bankId / 4) : Math.floor(idx / 4);
      const keyIndex = (typeof preset.bankId === 'number' ? preset.bankId : idx) % keys.length;
      const key = keys[keyIndex] || 'A';

      const presetMsgs = preset.presetMessages?.messages || [];
      const customMsgs = preset.customMessages?.messages || [];
      const switchMsgs = preset.switches?.[keyIndex]?.pressMessages?.messages || [];
      const directMsgs = preset.messages || [];

      const combinedMsgs = [
        ...(Array.isArray(presetMsgs) ? presetMsgs : []),
        ...(Array.isArray(customMsgs) ? customMsgs : []),
        ...(Array.isArray(switchMsgs) ? switchMsgs : []),
        ...(Array.isArray(directMsgs) ? directMsgs : []),
      ];

      const steps = parseMessageList(combinedMsgs);
      const naming = extractPresetNaming(preset, keyIndex, steps, bankIndex);

      const hasCustomTitle = naming.presetName && !naming.presetName.match(/^Preset \d+$/i);
      const hasCustomSub = naming.secondaryText && !naming.secondaryText.match(/^Second\. \d+$/i);

      if (hasCustomTitle || hasCustomSub || steps.length > 0) {
        presets.push({
          bankIndex,
          key,
          presetName: naming.presetName,
          secondaryText: naming.secondaryText,
          steps,
        });
      }
    });

    if (presets.length > 0) {
      return presets;
    }
  }


  const defaultSampleNames = [
    { name: 'CLOUD', secondary: 'Ambient Delay' },
    { name: 'GLITCH POP', secondary: 'Microloop Granular' },
    { name: 'LOFI DRIFT', secondary: 'Tape Pitch Wobble' },
    { name: 'TAPE TRIP', secondary: 'Echo Reverse' },
    { name: 'BLOOPER', secondary: 'Loop Speed + Pitch' },
    { name: 'MOOD', secondary: 'Reverb + Slip' },
    { name: 'EL CAPISTAN', secondary: 'Tape Echo' },
    { name: 'CHROMA', secondary: 'Chorus Flange' },
  ];

  for (let bi = 0; bi < 4; bi++) {
    keys.forEach((k, ki) => {
      const pIdx = bi * 4 + ki;
      const devId = fallbackDevId;
      const dev = HardwareRegistry.getDevice(devId);
      const ctrl = dev?.controls[ki % (dev?.controls.length || 1)] || dev?.controls[0];
      const steps: MacroStep[] = dev && ctrl ? [{ device: devId, control: ctrl.id, value: 64 }] : [];
      const sample = defaultSampleNames[pIdx % defaultSampleNames.length];

      presets.push({
        bankIndex: bi,
        key: k,
        presetName: sample.name,
        secondaryText: sample.secondary,
        steps,
      });
    });
  }

  return presets;
}




export function parseScribbleConfig(
  config: any,
  channels: Record<string, number>,
  keys: string[] = ['A', 'B', 'C', 'D'],
): { stepsPerKey: Record<string, MacroStep[]>; namingPerKey: Record<string, { name: string; secondary: string }> } {
  const all = parseAllScribblePresets(config, channels, keys);
  const stepsPerKey: Record<string, MacroStep[]> = {};
  const namingPerKey: Record<string, { name: string; secondary: string }> = {};

  keys.forEach((k) => {
    stepsPerKey[k] = [];
    namingPerKey[k] = { name: '', secondary: '' };
  });

  all.filter((p) => p.bankIndex === 0).forEach((p) => {
    stepsPerKey[p.key] = p.steps;
    namingPerKey[p.key] = { name: p.presetName, secondary: p.secondaryText };
  });

  return { stepsPerKey, namingPerKey };
}



export class ScribbleTargetAdapter implements TargetAdapter {
  id = 'scribble';
  name = 'Pirate MIDI Scribble';

  compileExport(state: StompState): TargetExportFile {
    const json = compileHardwareScribbleConfig(state);
    return {
      filename: 'scribble.json',
      mimeType: 'application/json',
      content: JSON.stringify(json, null, 2),
    };
  }

  compilePreview(state: StompState): CompileLine[] {
    const json = compileHardwareScribbleConfig(state);
    return JSON.stringify(json, null, 2)
      .split('\n')
      .map((line) => ({ text: line || ' ' }));
  }
}

