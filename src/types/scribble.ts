/**
 * Pirate MIDI Scribble foot controller JSON configuration schema & types.
 * Reverse-engineered from physical Scribble device export (firmware 1.0.1-beta.2).
 */

export interface PortOutputs {
  usbd: boolean;
  ble: boolean;
  midi1: boolean;
}

export interface PortHandles {
  usbd: boolean;
  ble: boolean;
  midi1: boolean;
}

export interface BankPcMidiOutputs {
  usbd: number;
  ble: number;
  midi1: number;
}

export interface ScribbleMidiMessage {
  statusByte: number; // MIDI status byte e.g. 0xB0..0xBF (CC), 0xC0..0xCF (PC)
  dataByte1: number;  // 0-127 (CC # or PC #)
  dataByte2: number;  // 0-127 (CC value or 0 for PC)
  outputs: PortOutputs;
}

export interface ScribbleMessageGroup {
  numMessages: number;
  messages: ScribbleMidiMessage[];
}

export interface ScribbleSwitchSetting {
  mode?: 'pressPresetDown' | 'pressPresetUp' | string;
  pressMessages: ScribbleMessageGroup;
  holdMessages: ScribbleMessageGroup;
}

export interface ScribbleDeviceSettings {
  deviceModel: string;
  firmwareVersion: string;
  hardwareVersion: string;
  deviceName: string;
  uId: number;
  profileId: number;
}

export interface ScribbleGlobalSettings {
  deviceName: string;
  currentBank: number;
  lightMode: 'dark' | 'light' | string;
  mainColour: number; // 24-bit RGB integer (0xRRGGBB)
  textColour: number; // 24-bit RGB integer (0xRRGGBB)
  displayBrightness: number;
  midiChannel: number;
  globalBpm: number;
  midiOutPortMode: string;
  bankPcMidiOutputs: BankPcMidiOutputs;
  clockMode: 'external' | 'internal' | 'off' | string;
  clockDisplayType: 'bpm' | string;
  tapTempoQuant: 'none' | string;
  usbdThruHandles: PortHandles;
  bleThruHandles: PortHandles;
  midi1ThruHandles: PortHandles;
  midiClockOutHandles: PortHandles;
  switches: ScribbleSwitchSetting[];
  customMessages: ScribbleMessageGroup;
  presetUpCC: number;
  presetDownCC: number;
  goToPresetCC: number;
  globalCustomMessagesCC: number;
  presetCustomMessagesCC: number;
  midiValueDisplay: 'valueOnly' | 'none' | string;
  midiValueDisplayCC: number;
  wirelessType: 'ble' | 'wifi' | 'none' | string;
  bleMode: 'server' | 'client' | string;
  mainTextResize: boolean;
  zeroIndexBanks: boolean;
  kemperPlayerMode: boolean;
  useStaticIp: boolean;
  staticIp: string;
  gatewayIp: string;
}

export interface ScribblePresetSetting {
  bankId: number;
  bankName: string;
  secondaryText: string;
  colourOverride: boolean;
  colour: number; // 24-bit RGB integer
  textColourOverride: boolean;
  textColour: number; // 24-bit RGB integer
  midiValueDisplayOverride: boolean;
  midiValueDisplay: 'valueOnly' | 'none' | string;
  midiValueDisplayCC: number;
  bpm: number;
  switches: ScribbleSwitchSetting[];
  customMessages: ScribbleMessageGroup;
  presetMessages: ScribbleMessageGroup;
}

export interface ScribbleConfig {
  deviceSettings: ScribbleDeviceSettings;
  globalSettings: ScribbleGlobalSettings;
  presetSettings: ScribblePresetSetting[];
}

/** Helper to convert hex color string (e.g. "#EF7D7B" or "EF7D7B") to 24-bit RGB integer */
export function hexToRgbInt(hex: string): number {
  const clean = hex.replace('#', '');
  return parseInt(clean, 16) || 0;
}

/** Helper to convert 24-bit RGB integer to hex string (e.g. "#EF7D7B") */
export function rgbIntToHex(rgb: number): string {
  return '#' + (rgb & 0xffffff).toString(16).padStart(6, '0').toUpperCase();
}

/** JSON Schema representation for standard validation libraries (e.g. Ajv / Zod / JsonSchema) */
export const scribbleJsonSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'ScribbleConfig',
  type: 'object',
  required: ['deviceSettings', 'globalSettings', 'presetSettings'],
  properties: {
    deviceSettings: {
      type: 'object',
      required: ['deviceModel', 'firmwareVersion', 'hardwareVersion', 'deviceName', 'uId', 'profileId'],
      properties: {
        deviceModel: { type: 'string' },
        firmwareVersion: { type: 'string' },
        hardwareVersion: { type: 'string' },
        deviceName: { type: 'string' },
        uId: { type: 'number' },
        profileId: { type: 'number' },
      },
    },
    globalSettings: {
      type: 'object',
      required: ['deviceName', 'currentBank', 'lightMode', 'mainColour', 'textColour', 'displayBrightness', 'midiChannel', 'globalBpm', 'switches', 'customMessages'],
      properties: {
        deviceName: { type: 'string' },
        currentBank: { type: 'integer', minimum: 0, maximum: 127 },
        lightMode: { type: 'string', enum: ['dark', 'light'] },
        mainColour: { type: 'integer', minimum: 0, maximum: 16777215 },
        textColour: { type: 'integer', minimum: 0, maximum: 16777215 },
        displayBrightness: { type: 'integer', minimum: 0, maximum: 100 },
        midiChannel: { type: 'integer', minimum: 1, maximum: 16 },
        globalBpm: { type: 'integer' },
      },
    },
    presetSettings: {
      type: 'array',
      minItems: 128,
      maxItems: 128,
      items: {
        type: 'object',
        required: ['bankId', 'bankName', 'secondaryText', 'colourOverride', 'colour', 'textColourOverride', 'textColour', 'bpm', 'switches', 'presetMessages'],
        properties: {
          bankId: { type: 'integer' },
          bankName: { type: 'string' },
          secondaryText: { type: 'string' },
          colourOverride: { type: 'boolean' },
          colour: { type: 'integer', minimum: 0, maximum: 16777215 },
          textColourOverride: { type: 'boolean' },
          textColour: { type: 'integer', minimum: 0, maximum: 16777215 },
          bpm: { type: 'integer' },
          presetMessages: {
            type: 'object',
            required: ['numMessages', 'messages'],
            properties: {
              numMessages: { type: 'integer' },
              messages: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['statusByte', 'dataByte1', 'dataByte2', 'outputs'],
                  properties: {
                    statusByte: { type: 'integer', minimum: 0, maximum: 255 },
                    dataByte1: { type: 'integer', minimum: 0, maximum: 127 },
                    dataByte2: { type: 'integer', minimum: 0, maximum: 127 },
                    outputs: {
                      type: 'object',
                      required: ['usbd', 'ble', 'midi1'],
                      properties: {
                        usbd: { type: 'boolean' },
                        ble: { type: 'boolean' },
                        midi1: { type: 'boolean' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
