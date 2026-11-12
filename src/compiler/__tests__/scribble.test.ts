import { describe, it, expect } from 'vitest';
import Ajv from 'ajv';
import { compileHardwareScribbleConfig } from '../adapters/scribble.js';
import { scribbleJsonSchema, detectScribbleFirmwareVersion } from '../../types/scribble.js';
import { StompStore } from '../../state/store.js';

describe('Scribble Schema Validation & Firmware Versioning', () => {
  it('generates a completely valid Pirate MIDI Scribble v1 JSON file', () => {
    const store = new StompStore();
    store.addPedal('blooper');
    store.addPedal('mood');
    store.applyMacroTemplate('blooper-left-cycle');

    const config = compileHardwareScribbleConfig(store.state, 'v1');

    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(scribbleJsonSchema);

    const valid = validate(config);
    if (!valid) {
      console.error('AJV Validation Errors (v1):', JSON.stringify(validate.errors, null, 2));
    }
    expect(valid).toBe(true);
    expect(config.bankSettings).toBeDefined();
    expect(config.globalSettings.midiOutPortMode).toBe('midiOutA');
    expect(config.globalSettings.pcBankOutputs).toBeDefined();
  });

  it('generates a completely valid Pirate MIDI Scribble v2 JSON file matching 2.0.0 schema', () => {
    const store = new StompStore();
    store.addPedal('blooper');
    store.addPedal('mood');
    store.applyMacroTemplate('blooper-left-cycle');

    const config = compileHardwareScribbleConfig(store.state, 'v2');

    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(scribbleJsonSchema);

    const valid = validate(config);
    if (!valid) {
      console.error('AJV Validation Errors (v2):', JSON.stringify(validate.errors, null, 2));
    }
    expect(valid).toBe(true);
    expect(config.presetSettings).toHaveLength(128);
    expect(config.deviceSettings.firmwareVersion).toBe('2.0.0');
    expect(config.deviceSettings.hardwareVersion).toBe('hw1.x.0');
    expect(config.globalSettings.midiOutPortMode).toBe('typeA');
    expect(config.globalSettings.bankPcMidiOutputs).toEqual({ usbd: 0, ble: 0, midi1: 0 });
    expect(config.globalSettings.tapTempoQuant).toBe('none');
    expect(config.globalSettings.zeroIndexBanks).toBe(false);
    expect(config.globalSettings.switches[0].mode).toBe('presetDown');
    expect(config.globalSettings.switches[1].mode).toBe('presetUp');
  });

  it('validates a real exported firmware 2.0.0-beta.7 payload', () => {
    const sampleV2Export = {
      deviceSettings: {
        deviceModel: 'Scribble',
        firmwareVersion: '2.0.0-beta.7',
        hardwareVersion: 'hw1.x.0',
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
        midiChannel: 0,
        globalBpm: 120,
        midiOutPortMode: 'typeA',
        bankPcMidiOutputs: { usbd: 0, ble: 0, midi1: 0 },
        clockMode: 'external',
        clockDisplayType: 'bpm',
        tapTempoQuant: 'none',
        usbdThruHandles: { usbd: false, ble: true, midi1: true },
        bleThruHandles: { usbd: true, ble: false, midi1: true },
        midi1ThruHandles: { usbd: true, ble: true, midi1: true },
        midiClockOutHandles: { usbd: false, ble: false, midi1: false },
        switches: [
          { mode: 'presetDown', pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
          { mode: 'presetUp', pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
        ],
        customMessages: { numMessages: 0, messages: [] },
        presetUpCC: 1,
        presetDownCC: 2,
        goToPresetCC: 3,
        globalCustomMessagesCC: 17,
        presetCustomMessagesCC: 16,
        midiValueDisplay: 'none',
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
      presetSettings: [
        {
          bankId: 0,
          bankName: 'Preset 1',
          secondaryText: 'Second. 1',
          colourOverride: false,
          colour: 0,
          textColourOverride: false,
          textColour: 0,
          midiValueDisplayOverride: false,
          midiValueDisplay: 'none',
          midiValueDisplayCC: 7,
          bpm: 120,
          switches: [
            { pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
            { pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
          ],
          customMessages: { numMessages: 0, messages: [] },
          presetMessages: { numMessages: 0, messages: [] },
        },
      ],
    };

    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(scribbleJsonSchema);

    const valid = validate(sampleV2Export);
    if (!valid) {
      console.error('AJV Validation Errors (sampleV2):', JSON.stringify(validate.errors, null, 2));
    }
    expect(valid).toBe(true);

    const fw = detectScribbleFirmwareVersion(sampleV2Export);
    expect(fw.major).toBe('v2');
    expect(fw.version).toBe('2.0.0-beta.7');
    expect(fw.detectedFrom).toBe('metadata');
  });

  it('correctly detects firmware version using heuristics when deviceSettings is missing', () => {
    const v2Structural = {
      globalSettings: {
        tapTempoQuant: 'none',
        bankPcMidiOutputs: { usbd: 0, ble: 0, midi1: 0 },
      },
      presetSettings: [],
    };
    expect(detectScribbleFirmwareVersion(v2Structural)).toEqual({
      version: '2.0.0',
      major: 'v2',
      detectedFrom: 'schema',
    });

    const v1Structural = {
      globalSettings: {
        pcBankOutputs: { usbd: 1, ble: 1, midi1: 1 },
      },
      bankSettings: [],
    };
    expect(detectScribbleFirmwareVersion(v1Structural)).toEqual({
      version: '1.0.1',
      major: 'v1',
      detectedFrom: 'schema',
    });
  });

  it('updates store firmware state when loading a Scribble file and allows manual switching', () => {
    const store = new StompStore();
    expect(store.state.scribbleFirmware.major).toBe('v2');

    // Load v2 config
    store.loadScribbleFile({
      deviceSettings: {
        deviceModel: 'Scribble',
        firmwareVersion: '2.0.0-beta.7',
        hardwareVersion: 'hw1.x.0',
        deviceName: 'Scribble',
        uId: 123,
        profileId: 0,
      },
      globalSettings: {} as any,
      presetSettings: [],
    });

    expect(store.state.scribbleFirmware.version).toBe('2.0.0-beta.7');
    expect(store.state.scribbleFirmware.major).toBe('v2');

    // Switch to v1
    store.setScribbleFirmware('v1');
    expect(store.state.scribbleFirmware.major).toBe('v1');
    expect(store.state.scribbleFirmware.version).toBe('1.0.1');

    // Switch back to v2
    store.setScribbleFirmware('v2');
    expect(store.state.scribbleFirmware.major).toBe('v2');
    expect(store.state.scribbleFirmware.version).toBe('2.0.0');
  });
});
