/**
 * Pirate MIDI Scribble JSON configuration schema & types.
 *
 * Mirrors the official device schema `piratemidi:scribble:v1.0.1:scribble`
 * published at https://developer.piratemidi.com/ (Pirate-MIDI/Device-API-Docs).
 *
 * The device schema sets `additionalProperties: false` on every object, so an
 * unrecognised key fails the whole object rather than being ignored. Keep these
 * types in step with the published schema.
 */

/**
 * Ports a single MIDI message is routed to.
 *
 * Note the key is `usb` here but `usbd` on the thru/clock handles below — that
 * asymmetry is in the device schema itself, not a typo.
 */
export interface MessageOutputs {
  usb: boolean;
  ble: boolean;
  midi1: boolean;
}

/** Ports that forward data received on a given interface. */
export interface PortHandles {
  usbd: boolean;
  ble: boolean;
  midi1: boolean;
}

/** Program-change bank value routed per interface. */
export interface PcBankOutputs {
  usbd: number;
  ble: number;
  midi1: number;
}

/** A standard MIDI message with output routing. */
export interface ScribbleMidiMessage {
  statusByte: number; // 0-255, e.g. 0xB0..0xBF (CC), 0xC0..0xCF (PC)
  dataByte1: number; // 0-127 (CC # or PC #)
  dataByte2: number; // 0-127 (CC value, or 0 for PC)
  outputs: MessageOutputs;
}

/**
 * A device control operation occupying a message slot.
 *
 * `blockingDelay` is the useful one for macro stacks: it spaces out messages
 * that a receiving pedal would otherwise drop if they arrived back-to-back.
 */
export interface ScribbleSmartMessage {
  statusByte: number;
  smartType: 'blockingDelay' | 'sendCurrentPreset';
  dataByte1: number; // 0-255
  dataByte2: number; // 0-255
}

export type ScribbleMessage = ScribbleMidiMessage | ScribbleSmartMessage;

export function isSmartMessage(msg: ScribbleMessage): msg is ScribbleSmartMessage {
  return typeof (msg as ScribbleSmartMessage).smartType === 'string';
}

/** Max messages in any single stack (press, hold, custom, preset). */
export const MAX_MESSAGES_PER_STACK = 8;

/** Physical switches on the Scribble. */
export const SWITCH_COUNT = 2;

/** Preset banks addressable over the Device API, zero-indexed 0-127. */
export const BANK_COUNT = 128;

export interface ScribbleMessageGroup {
  numMessages: number; // 0-8
  messages: ScribbleMessage[];
}

/** Switch behaviour. Only `globalSettings.switches` carries a mode. */
export type ScribbleSwitchMode =
  | 'pressPresetUp'
  | 'pressPresetDown'
  | 'holdPresetUp'
  | 'holdPresetDown'
  | 'midiOnly';

export interface ScribbleGlobalSwitchSetting {
  mode: ScribbleSwitchMode;
  pressMessages: ScribbleMessageGroup;
  holdMessages: ScribbleMessageGroup;
}

/** Per-bank switch overrides carry messages only — mode is global. */
export interface ScribbleBankSwitchSetting {
  pressMessages: ScribbleMessageGroup;
  holdMessages: ScribbleMessageGroup;
}

/** Read-only identity, as returned by the `CHCK` command. */
export interface ScribbleDeviceSettings {
  deviceModel: string;
  firmwareVersion: string;
  hardwareVersion: string;
  deviceName: string;
  uId: number;
  profileId: number;
}

export type ScribbleClockMode = 'preset' | 'external' | 'global' | 'none';
export type ScribbleClockDisplayType = 'bpm' | 'ms' | 'indicator';
export type ScribbleMidiValueDisplay =
  | 'none'
  | 'bar'
  | 'barPercent'
  | 'barValue'
  | 'percentOnly'
  | 'valueOnly';

export interface ScribbleGlobalSettings {
  deviceName: string; // max 32 chars
  currentBank: number;
  lightMode: 'light' | 'dark';
  mainColour: number; // RGB888 integer
  textColour: number; // RGB888 integer
  displayBrightness: number; // 1-100
  midiChannel: number; // 0-15 (zero-based, unlike the 1-16 shown in most UIs)
  globalBpm: number;
  midiOutPortMode: 'midiOutA' | 'midiOutB';
  clockMode: ScribbleClockMode;
  clockDisplayType: ScribbleClockDisplayType;
  pcBankOutputs: PcBankOutputs;
  usbdThruHandles: PortHandles;
  bleThruHandles: PortHandles;
  midi1ThruHandles: PortHandles;
  midiClockOutHandles: PortHandles;
  switches: ScribbleGlobalSwitchSetting[]; // exactly 2
  customMessages: ScribbleMessageGroup;
  presetUpCC: number; // 0-127
  presetDownCC: number; // 0-127
  goToPresetCC: number; // 0-127
  globalCustomMessagesCC: number; // 0-127
  presetCustomMessagesCC: number; // 0-127
  wirelessType: 'ble' | 'wifi' | 'none';
  bleMode: 'server' | 'client';
  useStaticIp: boolean;
  staticIp: string;
  gatewayIp: string;
  mainTextResize: boolean;
  midiValueDisplay: ScribbleMidiValueDisplay;
  midiValueDisplayCC: number; // 0-127
  kemperPlayerMode: boolean;
}

export interface ScribbleBankSetting {
  bankId: number;
  bankName: string; // max 17 chars
  secondaryText: string; // max 17 chars
  colourOverride: boolean;
  colour: number; // RGB888 integer
  textColourOverride: boolean;
  textColour: number; // RGB888 integer
  bpm: number;
  switches: ScribbleBankSwitchSetting[]; // exactly 2
  customMessages: ScribbleMessageGroup;
  presetMessages: ScribbleMessageGroup;
  midiValueDisplayOverride: boolean;
  midiValueDisplay: ScribbleMidiValueDisplay;
  midiValueDisplayCC: number; // 0-127
}

/** @deprecated Use {@link ScribbleBankSetting}; the API term is `bankSettings`. */
export type ScribblePresetSetting = ScribbleBankSetting;

export interface ScribbleConfig {
  deviceSettings: ScribbleDeviceSettings;
  globalSettings: ScribbleGlobalSettings;
  bankSettings: ScribbleBankSetting[]; // up to 128
  presetSettings?: ScribbleBankSetting[];
}

/** Max display-text length for bank name and secondary text. */
export const MAX_BANK_TEXT_LENGTH = 17;

/** Helper to convert hex color string (e.g. "#EF7D7B" or "EF7D7B") to 24-bit RGB integer */
export function hexToRgbInt(hex: string): number {
  const clean = hex.replace('#', '');
  return parseInt(clean, 16) || 0;
}

/** Helper to convert 24-bit RGB integer to hex string (e.g. "#EF7D7B") */
export function rgbIntToHex(rgb: number): string {
  return '#' + (rgb & 0xffffff).toString(16).padStart(6, '0').toUpperCase();
}

const messageItemSchema = {
  oneOf: [
    {
      type: 'object',
      description: 'Standard MIDI message with output routing',
      required: ['statusByte', 'dataByte1', 'dataByte2', 'outputs'],
      properties: {
        statusByte: { type: 'integer', minimum: 0, maximum: 255 },
        dataByte1: { type: 'integer', minimum: 0, maximum: 127 },
        dataByte2: { type: 'integer', minimum: 0, maximum: 127 },
        outputs: {
          type: 'object',
          required: ['usb', 'ble', 'midi1'],
          additionalProperties: false,
          properties: {
            usb: { type: 'boolean' },
            ble: { type: 'boolean' },
            midi1: { type: 'boolean' },
          },
        },
      },
    },
    {
      type: 'object',
      description: 'Smart/internal message',
      required: ['statusByte', 'smartType', 'dataByte1', 'dataByte2'],
      properties: {
        statusByte: { type: 'integer' },
        smartType: { type: 'string', enum: ['blockingDelay', 'sendCurrentPreset'] },
        dataByte1: { type: 'integer', minimum: 0, maximum: 255 },
        dataByte2: { type: 'integer', minimum: 0, maximum: 255 },
      },
    },
  ],
};

const messageGroupSchema = {
  type: 'object',
  required: ['numMessages', 'messages'],
  additionalProperties: false,
  properties: {
    numMessages: { type: 'integer', minimum: 0, maximum: MAX_MESSAGES_PER_STACK },
    messages: { type: 'array', items: messageItemSchema, maxItems: MAX_MESSAGES_PER_STACK },
  },
};

const portHandlesSchema = {
  type: 'object',
  required: ['usbd', 'ble', 'midi1'],
  additionalProperties: false,
  properties: {
    usbd: { type: 'boolean' },
    ble: { type: 'boolean' },
    midi1: { type: 'boolean' },
  },
};

/** JSON Schema mirroring the published device schema, for Ajv/Zod-style validation. */
export const scribbleJsonSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'piratemidi:scribble:v1.0.1:scribble',
  title: 'Pirate MIDI Scribble Device API (v1.0.1)',
  type: 'object',
  required: ['deviceSettings', 'globalSettings', 'bankSettings'],
  properties: {
    deviceSettings: {
      type: 'object',
      required: ['deviceModel', 'firmwareVersion', 'hardwareVersion', 'deviceName', 'uId', 'profileId'],
      additionalProperties: false,
      properties: {
        deviceModel: { type: 'string' },
        firmwareVersion: { type: 'string' },
        hardwareVersion: { type: 'string' },
        deviceName: { type: 'string' },
        uId: { type: 'integer' },
        profileId: { type: 'integer' },
      },
    },
    globalSettings: {
      type: 'object',
      required: [
        'deviceName',
        'currentBank',
        'lightMode',
        'mainColour',
        'textColour',
        'displayBrightness',
        'midiChannel',
        'globalBpm',
        'midiOutPortMode',
        'clockMode',
        'clockDisplayType',
        'pcBankOutputs',
        'usbdThruHandles',
        'bleThruHandles',
        'midi1ThruHandles',
        'midiClockOutHandles',
        'switches',
        'customMessages',
        'presetUpCC',
        'presetDownCC',
        'goToPresetCC',
        'globalCustomMessagesCC',
        'presetCustomMessagesCC',
        'wirelessType',
        'bleMode',
        'useStaticIp',
        'staticIp',
        'gatewayIp',
        'mainTextResize',
        'midiValueDisplay',
        'midiValueDisplayCC',
        'kemperPlayerMode',
      ],
      additionalProperties: false,
      properties: {
        deviceName: { type: 'string', maxLength: 32 },
        currentBank: { type: 'integer', minimum: 0 },
        lightMode: { type: 'string', enum: ['light', 'dark'] },
        mainColour: { type: 'integer' },
        textColour: { type: 'integer' },
        displayBrightness: { type: 'integer', minimum: 1, maximum: 100 },
        midiChannel: { type: 'integer', minimum: 0, maximum: 15 },
        globalBpm: { type: 'number', minimum: 0 },
        midiOutPortMode: { type: 'string', enum: ['midiOutA', 'midiOutB'] },
        clockMode: { type: 'string', enum: ['preset', 'external', 'global', 'none'] },
        clockDisplayType: { type: 'string', enum: ['bpm', 'ms', 'indicator'] },
        pcBankOutputs: {
          type: 'object',
          required: ['usbd', 'ble', 'midi1'],
          additionalProperties: false,
          properties: {
            usbd: { type: 'integer' },
            ble: { type: 'integer' },
            midi1: { type: 'integer' },
          },
        },
        usbdThruHandles: portHandlesSchema,
        bleThruHandles: portHandlesSchema,
        midi1ThruHandles: portHandlesSchema,
        midiClockOutHandles: portHandlesSchema,
        switches: {
          type: 'array',
          maxItems: SWITCH_COUNT,
          items: {
            type: 'object',
            required: ['mode', 'pressMessages', 'holdMessages'],
            additionalProperties: false,
            properties: {
              mode: {
                type: 'string',
                enum: ['pressPresetUp', 'pressPresetDown', 'holdPresetUp', 'holdPresetDown', 'midiOnly'],
              },
              pressMessages: messageGroupSchema,
              holdMessages: messageGroupSchema,
            },
          },
        },
        customMessages: messageGroupSchema,
        presetUpCC: { type: 'integer', minimum: 0, maximum: 127 },
        presetDownCC: { type: 'integer', minimum: 0, maximum: 127 },
        goToPresetCC: { type: 'integer', minimum: 0, maximum: 127 },
        globalCustomMessagesCC: { type: 'integer', minimum: 0, maximum: 127 },
        presetCustomMessagesCC: { type: 'integer', minimum: 0, maximum: 127 },
        wirelessType: { type: 'string', enum: ['ble', 'wifi', 'none'] },
        bleMode: { type: 'string', enum: ['server', 'client'] },
        useStaticIp: { type: 'boolean' },
        staticIp: { type: 'string' },
        gatewayIp: { type: 'string' },
        mainTextResize: { type: 'boolean' },
        midiValueDisplay: {
          type: 'string',
          enum: ['none', 'bar', 'barPercent', 'barValue', 'percentOnly', 'valueOnly'],
        },
        midiValueDisplayCC: { type: 'integer', minimum: 0, maximum: 127 },
        kemperPlayerMode: { type: 'boolean' },
      },
    },
    bankSettings: {
      type: 'array',
      maxItems: BANK_COUNT,
      items: {
        type: 'object',
        required: [
          'bankId',
          'bankName',
          'secondaryText',
          'colourOverride',
          'colour',
          'textColourOverride',
          'textColour',
          'bpm',
          'switches',
          'customMessages',
          'presetMessages',
          'midiValueDisplayOverride',
          'midiValueDisplay',
          'midiValueDisplayCC',
        ],
        additionalProperties: false,
        properties: {
          bankId: { type: 'integer' },
          bankName: { type: 'string', maxLength: MAX_BANK_TEXT_LENGTH },
          secondaryText: { type: 'string', maxLength: MAX_BANK_TEXT_LENGTH },
          colourOverride: { type: 'boolean' },
          colour: { type: 'integer' },
          textColourOverride: { type: 'boolean' },
          textColour: { type: 'integer' },
          bpm: { type: 'number', minimum: 0 },
          switches: {
            type: 'array',
            maxItems: SWITCH_COUNT,
            items: {
              type: 'object',
              required: ['pressMessages', 'holdMessages'],
              additionalProperties: false,
              properties: {
                pressMessages: messageGroupSchema,
                holdMessages: messageGroupSchema,
              },
            },
          },
          customMessages: messageGroupSchema,
          presetMessages: messageGroupSchema,
          midiValueDisplayOverride: { type: 'boolean' },
          midiValueDisplay: {
            type: 'string',
            enum: ['none', 'bar', 'barPercent', 'barValue', 'percentOnly', 'valueOnly'],
          },
          midiValueDisplayCC: { type: 'integer', minimum: 0, maximum: 127 },
        },
      },
    },
  },
};
