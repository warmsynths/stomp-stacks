import { describe, it, expect } from 'vitest';
import { describeStep, compileMc3Json, compileScribbleMacroJson, compileHardwareScribbleConfig, compileRigJson, CompilerEngine } from '../midi.js';
import { parseAllScribblePresets } from '../adapters/scribble.js';
import type { StompState } from '../../state/types.js';

describe('Program Change (PC) Macro Steps & Multi-Target Compiler Support', () => {
  it('correctly calculates MIDI statusByte and program number for PC steps', () => {
    // Blooper on channel 3 (default), PC 5
    const desc = describeStep({ device: 'blooper', control: 'pc', value: 5 });
    expect(desc.channel).toBe(3);
    expect(desc.cc).toBe(0);
    expect(desc.value).toBe(5);
    expect(desc.message.statusByte).toBe(0xc0 + (3 - 1)); // 0xC2 = 194
    expect(desc.message.dataByte1).toBe(5);
    expect(desc.message.dataByte2).toBe(0);
    expect(desc.label).toBe('Preset 5 · PC 5');
    expect(desc.stepLabel).toBe('PC 5');
  });

  it('respects custom label and channel override for PC steps', () => {
    const desc = describeStep(
      { device: 'mood', control: 'pc', value: 12, label: 'AMBIENT LEAD' },
      { mood: 7 },
    );
    expect(desc.channel).toBe(7);
    expect(desc.message.statusByte).toBe(0xc0 + 6); // 0xC6 = 198
    expect(desc.message.dataByte1).toBe(12);
    expect(desc.label).toBe('Preset 12 · AMBIENT LEAD');
    expect(desc.stepLabel).toBe('AMBIENT LEAD');
  });

  const createTestStateWithPC = (): StompState =>
    ({
      targetId: 'mc3',
      controllerId: 'mc3',
      brainId: 'onboard',
      rig: ['blooper', 'mood'],
      channels: { blooper: 3, mood: 2 },
      bank: 0,
      selectedKey: 'A',
      action: 'press',
      browseDevice: 'blooper',
      face: 'photo',
      popoverControlId: null,
      compileOpen: false,
      settingsOpen: false,
      controllerPickerOpen: false,
      brainPickerOpen: false,
      addPedalOpen: false,
      confirmRemovePedal: null,
      channelPickerOpen: false,
      colorPickerOpen: false,
      naming: {},
      sheetOpen: false,
      banks: [
        {
          A: {
            press: [
              { device: 'blooper', control: 'pc', value: 0, label: 'LEARN CH' },
              { device: 'mood', control: 'pc', value: 15 },
              { device: 'blooper', control: 'volume', value: 64 },
            ],
            hold: [],
            double: [],
          },
          B: { press: [], hold: [], double: [] },
          C: { press: [], hold: [], double: [] },
        },
      ],
    } as unknown as StompState);

  it('compiles Morningstar MC3 JSON with Program Change message types', () => {
    const state = createTestStateWithPC();
    const compiled = compileMc3Json(state);
    expect(compiled.device).toBe('Morningstar MC3');
    const actions = compiled.presets[0].actions['Press'];
    expect(actions).toHaveLength(3);

    expect(actions[0]).toEqual({
      type: 'Program Change',
      channel: 3,
      number: 0,
      label: 'LEARN CH',
    });

    expect(actions[1]).toEqual({
      type: 'Program Change',
      channel: 2,
      number: 15,
      label: 'PC 15',
    });

    expect(actions[2]).toEqual({
      type: 'Control Change',
      channel: 3,
      cc: 14,
      value: 64,
      label: 'NOON',
    });
  });

  it('compiles Scribble macro JSON with Program Change raw byte arrays', () => {
    const state = createTestStateWithPC();
    state.brainId = 'scribble';
    const compiled = compileScribbleMacroJson(state);
    const messages = compiled.macros[0].messages;

    // First msg: Blooper (ch 3) PC 0 -> status 194 (0xC2), data1: 0, data2: 0
    expect(messages[0]).toEqual([194, 0, 0]);

    // Second msg: Mood (ch 2) PC 15 -> status 193 (0xC1), data1: 15, data2: 0
    expect(messages[1]).toEqual([193, 15, 0]);

    // Third msg: Blooper CC 14 val 64 -> status 178 (0xB2), data1: 14, data2: 64
    expect(messages[2]).toEqual([178, 14, 64]);
  });

  it('compiles Hardware Scribble config with Program Change messages', () => {
    const state = createTestStateWithPC();
    state.brainId = 'scribble';
    const compiled = compileHardwareScribbleConfig(state);
    const bank0 = (compiled.bankSettings || compiled.presetSettings)[0];
    const msgs = bank0.presetMessages.messages;

    expect(msgs).toHaveLength(3);
    expect(msgs[0].statusByte).toBe(194);
    expect(msgs[0].dataByte1).toBe(0);
    expect(msgs[0].dataByte2).toBe(0);

    expect(msgs[1].statusByte).toBe(193);
    expect(msgs[1].dataByte1).toBe(15);
  });

  it('parses Program Change messages back into PC macro steps', () => {
    const rawConfig = {
      presetSettings: [
        {
          bankId: 0,
          bankName: 'PRESET RECALL',
          secondaryText: 'BLOOPER + MOOD',
          presetMessages: {
            numMessages: 2,
            messages: [
              { statusByte: 0xc2, dataByte1: 0, dataByte2: 0, outputs: { usb: true, ble: true, midi1: true } },
              { statusByte: 0xc1, dataByte1: 8, dataByte2: 0, outputs: { usb: true, ble: true, midi1: true } },
            ],
          },
        },
      ],
    };

    const parsed = parseAllScribblePresets(rawConfig, { blooper: 3, mood: 2 });
    expect(parsed).toHaveLength(1);
    expect(parsed[0].steps).toHaveLength(2);
    expect(parsed[0].steps[0]).toEqual({
      device: 'blooper',
      control: 'pc',
      value: 0,
      label: 'PC 0',
    });
    expect(parsed[0].steps[1]).toEqual({
      device: 'mood',
      control: 'pc',
      value: 8,
      label: 'PC 8',
    });
  });

  it('compiles Rig JSON adapter with PC macro steps', () => {
    const state = createTestStateWithPC();
    const compiled = compileRigJson(state);
    const pressSteps = compiled.banks[0]['A'].actions['press'];
    expect(pressSteps).toHaveLength(3);
    expect(pressSteps[0]).toEqual({
      pedal: 'blooper',
      control: 'pc',
      value: 0,
      label: 'LEARN CH',
    });
  });

  it('compiles cleanly through CompilerEngine seam for trace target', () => {
    const state = createTestStateWithPC();
    const result = CompilerEngine.compile(state, 'trace');
    expect(result.targetId).toBe('trace');
    const content = result.exportFile.content;
    expect(content).toContain('C2 00 00');
    expect(content.toLowerCase()).toContain('blooper');
  });
});
