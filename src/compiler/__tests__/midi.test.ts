import { describe, it, expect } from 'vitest';
import {
  describeStep,
  hexByte,
  hex,
  compileRigJson,
  compileMc3Json,
  compileScribbleMacroJson,
  compileHardwareScribbleConfig,
  findIssues,
  buildPreview,
  CompilerEngine,
  compile,
} from '../midi.js';
import type { StompState } from '../../state/types.js';

describe('MIDI Compiler Logic & Compiler Engine Seam', () => {
  it('correctly calculates MIDI statusByte and CC for steps', () => {
    // Blooper on channel 3, volume control CC 14
    const desc = describeStep({ device: 'blooper', control: 'volume', value: 64 });
    expect(desc.channel).toBe(3); // default channel in DEVICES.blooper is 3
    expect(desc.cc).toBe(14);
    expect(desc.value).toBe(64);
    expect(desc.message.statusByte).toBe(0xb0 + (3 - 1)); // 0xB2 = 178
    expect(desc.message.dataByte1).toBe(14);
    expect(desc.message.dataByte2).toBe(64);
    expect(desc.label).toBe('Ramp / Volume · noon');
  });

  it('respects custom channel overrides in describeStep', () => {
    // Override Blooper to MIDI Channel 10
    const desc = describeStep({ device: 'blooper', control: 'volume', value: 127 }, { blooper: 10 });
    expect(desc.channel).toBe(10);
    expect(desc.message.statusByte).toBe(0xb0 + 9); // 0xB9 = 185
  });

  it('formats hex byte strings correctly', () => {
    expect(hexByte(176)).toBe('0xB0');
    expect(hex(176)).toBe('B0');
    expect(hex(14)).toBe('0E');
  });

  const createTestState = (): StompState => ({
    targetId: 'scribble',
    controllerId: 'chocolate',
    brainId: 'scribble',
    rig: ['blooper', 'mood', 'elcap'],
    channels: { blooper: 3, mood: 2, elcap: 1 },
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
            { device: 'blooper', control: 'volume', value: 64 },
            { device: 'mood', control: 'length', value: 32 },
            { device: 'elcap', control: 'onoff', value: 127 },
          ],
          hold: [],
          double: [],
        },
        B: { press: [], hold: [], double: [] },
        C: { press: [], hold: [], double: [] },
        D: { press: [], hold: [], double: [] },
      },
    ],
  });

  it('compiles rig.json with updated CC numbers', () => {
    const state = createTestState();
    const compiled = compileRigJson(state);
    expect(compiled.schema).toBe('stomp-stacks/rig@1');
    expect(compiled.controller).toBe('chocolate');
    expect(compiled.brain).toBe('scribble');
    expect(compiled.pedals.blooper.cc.volume).toBe(14);
    expect(compiled.pedals.mood.cc.length).toBe(16);
    expect(compiled.pedals.elcap.cc.onoff).toBe(102);
  });

  it('compiles MC3 JSON preset schema', () => {
    const state = createTestState();
    state.controllerId = 'mc3';
    const compiled = compileMc3Json(state);
    expect(compiled.device).toBe('Morningstar MC3');
    expect(compiled.schema).toBe('stomp-stacks/mc3@1');
    expect(compiled.presets.length).toBe(1);
    expect(compiled.presets[0].preset).toBe('A');
    expect(compiled.presets[0].actions.Press.length).toBe(3);
    expect(compiled.presets[0].actions.Press[0].cc).toBe(14); // Blooper volume
  });

  it('compiles Scribble macro JSON with raw MIDI bytes', () => {
    const state = createTestState();
    const compiled = compileScribbleMacroJson(state);
    expect(compiled.schema).toBe('stomp-stacks/scribble@1');
    expect(compiled.macros.length).toBe(1);
    expect(compiled.macros[0].trigger).toEqual({ bank: 1, cc: 80, action: 'press' });
    // Step 1: Blooper (Ch 3 -> status 178, CC 14, Val 64)
    expect(compiled.macros[0].messages[0]).toEqual([178, 14, 64]);
    // Step 2: Mood (Ch 2 -> status 177, CC 16, Val 32)
    expect(compiled.macros[0].messages[1]).toEqual([177, 16, 32]);
    // Step 3: El Capistan (Ch 1 -> status 176, CC 102, Val 127)
    expect(compiled.macros[0].messages[2]).toEqual([176, 102, 127]);
  });

  it('compiles Hardware Scribble config format', () => {
    const state = createTestState();
    const compiled = compileHardwareScribbleConfig(state);
    expect(compiled.deviceSettings.deviceModel).toBe('Scribble');
    expect(compiled.bankSettings.length).toBe(128);
    expect(compiled.bankSettings[0].presetMessages.numMessages).toBe(3);
  });

  // The device schema sets additionalProperties:false throughout, so a wrong or
  // stray key rejects the whole object rather than being ignored on upload.
  it('emits exactly the keys the published Scribble schema names', () => {
    const state = createTestState();
    const compiled = compileHardwareScribbleConfig(state);
    const global = compiled.globalSettings as Record<string, unknown>;

    expect(Object.keys(compiled).sort()).toEqual(['bankSettings', 'deviceSettings', 'globalSettings']);

    // Renamed and removed keys that earlier builds got wrong.
    expect(global).toHaveProperty('pcBankOutputs');
    expect(global).not.toHaveProperty('bankPcMidiOutputs');
    expect(global).not.toHaveProperty('tapTempoQuant');
    expect(global).not.toHaveProperty('zeroIndexBanks');

    // Message routing uses `usb`; the thru handles use `usbd`. Both spellings
    // are correct, in their own place.
    expect(Object.keys(compiled.bankSettings[0].presetMessages.messages[0].outputs).sort()).toEqual([
      'ble',
      'midi1',
      'usb',
    ]);
    expect(Object.keys(global.usbdThruHandles as object).sort()).toEqual(['ble', 'midi1', 'usbd']);

    // Ranges the device enforces.
    expect(global.midiChannel).toBeGreaterThanOrEqual(0);
    expect(global.midiChannel).toBeLessThanOrEqual(15);
    expect(global.displayBrightness).toBeGreaterThanOrEqual(1);
    expect(['preset', 'external', 'global', 'none']).toContain(global.clockMode);
  });

  it('clamps bank text and message stacks to the device limits', () => {
    const state = createTestState();
    const compiled = compileHardwareScribbleConfig(state);

    compiled.bankSettings.forEach((bank) => {
      expect(bank.bankName.length).toBeLessThanOrEqual(17);
      expect(bank.secondaryText.length).toBeLessThanOrEqual(17);
      expect(bank.presetMessages.messages.length).toBeLessThanOrEqual(8);
      expect(bank.presetMessages.numMessages).toBe(bank.presetMessages.messages.length);
      expect(bank.switches).toHaveLength(2);
    });
  });

  it('detects channel collisions and issues correctly', () => {
    const state = createTestState();
    // Simulate channel collision (blooper and mood both on channel 2)
    state.channels.blooper = 2;
    state.channels.mood = 2;

    const issues = findIssues(state);
    const collisionWarning = issues.find((i) => i.text.includes('both on channel 2'));
    expect(collisionWarning).toBeDefined();
    expect(collisionWarning?.type).toBe('warn');
  });

  it('builds preview output lines cleanly', () => {
    const state = createTestState();
    const preview = buildPreview(state);
    expect(preview.length).toBeGreaterThan(0);
  });

  it('compiles cleanly through unified CompilerEngine seam', () => {
    const state = createTestState();
    const result = CompilerEngine.compile(state, 'scribble');
    expect(result.targetId).toBe('scribble');
    expect(result.exportFile.filename).toBe('scribble.json');
    expect(result.exportFile.mimeType).toBe('application/json');
    const parsed = JSON.parse(result.exportFile.content);
    expect(parsed.deviceSettings).toBeDefined();
    expect(parsed.globalSettings).toBeDefined();
    expect(parsed.bankSettings).toHaveLength(128);
    expect(result.preview.length).toBeGreaterThan(0);
    expect(result.diagnostics.length).toBeGreaterThan(0);

    const rigResult = compile(state, 'rig');
    expect(rigResult.targetId).toBe('rig');
    expect(rigResult.exportFile.filename).toBe('rig-stack-chocolate.json');
  });
});
