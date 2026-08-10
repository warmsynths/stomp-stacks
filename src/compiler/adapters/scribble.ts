import type { StompState, MacroStep } from '../../state/types.js';
import { ACTIONS, type ActionId } from '../../data/controllers.js';
import { HardwareRegistry } from '../../data/registry.js';
import { type ScribbleConfig, type ScribblePresetSetting } from '../../types/scribble.js';
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

export function compileHardwareScribbleConfig(state: StompState): ScribbleConfig {
  const presetSettings: ScribblePresetSetting[] = [];

  for (let i = 0; i < 128; i++) {
    const isPopulated = i < state.banks.length;
    let bankName = `Preset ${i + 1}`;
    let secondaryText = `Second. ${i + 1}`;
    let presetColour = 0;
    const messages: Array<{ statusByte: number; dataByte1: number; dataByte2: number; outputs: { usbd: boolean; ble: boolean; midi1: boolean } }> = [];

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
              outputs: { usbd: true, ble: true, midi1: true },
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

    presetSettings.push({
      bankId: i,
      bankName,
      secondaryText,
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
