// Device Dictionary — the translation layer between the visual UI and raw MIDI.
// Each device owns a default MIDI channel and explicit CC numbers per control from official pedal manuals;
// see src/compiler/midi.ts for how these turn into statusByte/dataByte1/dataByte2.

export type ControlType = 'knob' | 'toggle' | 'foot';

export interface ControlValueOption {
  /** Human label shown in the value popover, e.g. "9 o'clock", "centre". */
  label: string;
  /** Raw MIDI CC value (0-127) sent for this option. */
  value: number;
  /** Optional custom OLED display text for this value (e.g. "REC", "PLAY", "MOD A ON"). */
  oledLabel?: string;
  /** Optional CC override when a consolidated switch option targets a secondary CC. */
  cc?: number;
  /** Optional PC flag when an option sends Program Change instead of Control Change. */
  pc?: boolean;
}

export interface MacroTemplateStep {
  /** Target control ID on the pedal. */
  controlId: string;
  /** Raw MIDI value for this step. */
  value: number;
  /** OLED display label (e.g. "REC", "PLAY", "DUB", "STOP"). */
  label: string;
}

export interface MacroTemplate {
  id: string;
  name: string;
  description?: string;
  /** Control ID this template is attached to (e.g. "record", "loop", "tap"). */
  controlId: string;
  steps: MacroTemplateStep[];
}

export interface DeviceControl {
  id: string;
  /** Short label shown on the faceplate hotspot. */
  short: string;
  /** Full label shown on hover / in the macro stack. */
  label: string;
  type: ControlType;
  /** Explicit MIDI CC number from the official pedal manual. */
  cc: number;
  /** True when this control sends a MIDI Program Change (PC) instead of CC. */
  pc?: boolean;
  /** True for secondary MIDI-only parameters without a dedicated physical faceplate knob/switch. */
  sub?: boolean;
  /** Optional hardware notes or parameter behavior details. */
  notes?: string;
  /** Drawn-faceplate position, percent of stage. */
  x: number;
  y: number;
  /** Photo-faceplate hotspot position & size, percent of stage. */
  px: number;
  py: number;
  ps: number;
  values?: ControlValueOption[];
}

export interface Device {
  id: string;
  name: string;
  faceName: string;
  sub: string;
  accent: string;
  body: string;
  ink: string;
  /** Physical MIDI channel (1-based) this pedal listens on by default. */
  midiChannel: number;
  /** Base CC fallback number. */
  base: number;
  /** Program change offset (e.g. 0 for zero-based pedals like Blooper). */
  pcOffset?: number;
  photo: string;
  pw: number;
  ph: number;
  /** Detailed hardware MIDI specification notes & documentation. */
  notes?: string[];
  controls: DeviceControl[];
  /** Onboard footswitch lifecycle macro templates (e.g. REC -> PLAY -> DUB). */
  macroTemplates?: MacroTemplate[];
}

export type DeviceDef = Device;

export const MAX_VALUE = 127;

/** Shared 5-position sweep used by every knob. */
export const KNOB_VALUES: ControlValueOption[] = [
  { label: 'min', value: 0 },
  { label: "9 o'clock", value: 32 },
  { label: 'noon', value: 64 },
  { label: "3 o'clock", value: 96 },
  { label: 'max', value: 127 },
];

const TRI_123: ControlValueOption[] = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
];

export const DEVICES: Record<string, Device> = {
  blooper: {
    id: 'blooper',
    name: 'blooper',
    faceName: 'blooper',
    sub: 'bottomless looper',
    accent: '#8fd0e6',
    body: '#9dcfe0',
    ink: '#173742',
    midiChannel: 1,
    base: 14,
    pcOffset: 0,
    photo: 'assets/blooper-face.png',
    pw: 618,
    ph: 1126,
    notes: [
      'Official Chase Bliss Blooper MIDI Spec: Knobs CC 14-19, Ramp Speed CC 20, Toggles CC 21-23 (values 1/2/3).',
      'Transport: Record (CC 1), Play (CC 2), Overdub (CC 3), Stop (CC 4), Undo (CC 5), Redo (CC 6), Erase (CC 7), Hold B (CC 8), One-Shot Dub (CC 9).',
      'Modifiers & Ramping: Mod A On/Off (CC 30), Mod B On/Off (CC 31), Ramp Enable (CC 52), Loop Slots (PC 0-15).',
    ],
    controls: [
      { id: 'volume', short: 'volume', label: 'Volume (loop level)', type: 'knob', x: 22, y: 12, px: 19.3, py: 8.8, ps: 21.7, cc: 14 },
      { id: 'layers', short: 'layers', label: 'Layers', type: 'knob', x: 50, y: 12, px: 50.6, py: 8.8, ps: 21.7, cc: 15 },
      { id: 'repeats', short: 'repeats', label: 'Repeats', type: 'knob', x: 78, y: 12, px: 81.9, py: 8.8, ps: 21.7, cc: 16 },
      { id: 'modA', short: 'mod a', label: 'Mod A', type: 'knob', x: 22, y: 33, px: 19.3, py: 28.4, ps: 21.7, cc: 17 },
      { id: 'stability', short: 'stability', label: 'Stability', type: 'knob', x: 50, y: 33, px: 50.6, py: 28.4, ps: 21.7, cc: 18 },
      { id: 'modB', short: 'mod b', label: 'Mod B', type: 'knob', x: 78, y: 33, px: 81.9, py: 28.4, ps: 21.7, cc: 19 },
      { id: 'modA_sel', short: '1 · 2 · 3', label: 'Mod A select', type: 'toggle', x: 22, y: 52, px: 18.0, py: 44.6, ps: 9.7, cc: 21, values: TRI_123 },
      {
        id: 'mode',
        short: 'norm · add · samp',
        label: 'Program mode',
        type: 'toggle',
        x: 50,
        y: 52,
        px: 50.0,
        py: 44.6,
        ps: 9.7,
        cc: 22,
        values: [
          { label: 'normal', value: 1, oledLabel: 'NORM' },
          { label: 'additive', value: 2, oledLabel: 'ADD' },
          { label: 'sampler', value: 3, oledLabel: 'SAMP' },
        ],
      },
      { id: 'modB_sel', short: '4 · 5 · 6', label: 'Mod B select', type: 'toggle', x: 78, y: 52, px: 81.6, py: 44.6, ps: 9.7, cc: 23, values: TRI_123 },
      {
        id: 'save',
        short: 'save',
        label: 'Save / Recall Slot',
        type: 'toggle',
        x: 50,
        y: 82,
        px: 50.5,
        py: 75.5,
        ps: 8.1,
        cc: 13,
        values: [
          { label: 'left (load)', value: 0, oledLabel: 'LOAD', cc: 13 },
          { label: 'mid (preview)', value: 0, oledLabel: 'PREV', cc: 11 },
          { label: 'right (save)', value: 0, oledLabel: 'SAVE', cc: 12 },
        ],
      },
      {
        id: 'record',
        short: 'rec',
        label: 'Left switch (Rec / Play / Dub / Mod A)',
        type: 'foot',
        x: 28,
        y: 82,
        px: 20.6,
        py: 88.2,
        ps: 20.6,
        cc: 1,
        values: [
          { label: 'record', value: 127, oledLabel: 'REC', cc: 1 },
          { label: 'play', value: 127, oledLabel: 'PLAY', cc: 2 },
          { label: 'overdub', value: 127, oledLabel: 'DUB', cc: 3 },
          { label: 'one-shot dub', value: 127, oledLabel: '1-SHOT', cc: 9 },
          { label: 'mod A on', value: 127, oledLabel: 'MOD A ON', cc: 30 },
          { label: 'mod A off', value: 0, oledLabel: 'MOD A OFF', cc: 30 },
        ],
      },
      {
        id: 'loop',
        short: 'stop',
        label: 'Right switch (Stop / Undo / Redo / Mod B)',
        type: 'foot',
        x: 72,
        y: 82,
        px: 80.5,
        py: 88.2,
        ps: 20.6,
        cc: 4,
        values: [
          { label: 'stop', value: 127, oledLabel: 'STOP', cc: 4 },
          { label: 'hold switch B', value: 127, oledLabel: 'HOLD B', cc: 8 },
          { label: 'erase', value: 127, oledLabel: 'ERASE', cc: 7 },
          { label: 'mod B on', value: 127, oledLabel: 'MOD B ON', cc: 31 },
          { label: 'mod B off', value: 0, oledLabel: 'MOD B OFF', cc: 31 },
        ],
      },
      // Secondary MIDI-only / direct transport controls
      { id: 'play', short: 'play', label: 'Play', type: 'foot', sub: true, x: 18, y: 94, px: 18, py: 94, ps: 8, cc: 2 },
      { id: 'overdub', short: 'overdub', label: 'Overdub', type: 'foot', sub: true, x: 28, y: 94, px: 28, py: 94, ps: 8, cc: 3 },
      { id: 'stop', short: 'stop', label: 'Stop', type: 'foot', sub: true, x: 38, y: 94, px: 38, py: 94, ps: 8, cc: 4 },
      { id: 'undo', short: 'undo', label: 'Undo', type: 'foot', sub: true, x: 48, y: 94, px: 48, py: 94, ps: 8, cc: 5 },
      { id: 'redo', short: 'redo', label: 'Redo', type: 'foot', sub: true, x: 58, y: 94, px: 58, py: 94, ps: 8, cc: 6 },
      { id: 'erase', short: 'erase', label: 'Erase loop', type: 'foot', sub: true, x: 68, y: 94, px: 68, py: 94, ps: 8, cc: 7 },
      { id: 'holdB', short: 'hold b', label: 'Hold switch B', type: 'foot', sub: true, x: 78, y: 94, px: 78, py: 94, ps: 8, cc: 8 },
      { id: 'oneShotDub', short: '1-shot', label: 'One-shot dub', type: 'foot', sub: true, x: 88, y: 94, px: 88, py: 94, ps: 8, cc: 9 },
      {
        id: 'modA_on',
        short: 'mod a on/off',
        label: 'Modifier A on/off',
        type: 'toggle',
        sub: true,
        x: 22,
        y: 65,
        px: 22,
        py: 65,
        ps: 8,
        cc: 30,
        values: [
          { label: 'on', value: 127, oledLabel: 'MOD A ON' },
          { label: 'off', value: 0, oledLabel: 'MOD A OFF' },
        ],
      },
      {
        id: 'modB_on',
        short: 'mod b on/off',
        label: 'Modifier B on/off',
        type: 'toggle',
        sub: true,
        x: 78,
        y: 65,
        px: 78,
        py: 65,
        ps: 8,
        cc: 31,
        values: [
          { label: 'on', value: 127, oledLabel: 'MOD B ON' },
          { label: 'off', value: 0, oledLabel: 'MOD B OFF' },
        ],
      },
      { id: 'rampSpeed', short: 'ramp spd', label: 'Ramp speed', type: 'knob', sub: true, x: 50, y: 65, px: 50, py: 65, ps: 8, cc: 20 },
      {
        id: 'rampOn',
        short: 'ramp',
        label: 'Ramp enable',
        type: 'toggle',
        sub: true,
        x: 36,
        y: 65,
        px: 36,
        py: 65,
        ps: 8,
        cc: 52,
        values: [
          { label: 'on', value: 127, oledLabel: 'RAMP ON' },
          { label: 'off', value: 0, oledLabel: 'RAMP OFF' },
        ],
      },
      {
        id: 'loopSlot',
        short: 'slot',
        label: 'Select loop slot',
        type: 'toggle',
        sub: true,
        x: 64,
        y: 65,
        px: 64,
        py: 65,
        ps: 8,
        cc: 13,
        pc: true,
        values: [
          { label: 'slot 1', value: 1, oledLabel: 'SLOT 1', pc: true },
          { label: 'slot 2', value: 2, oledLabel: 'SLOT 2', pc: true },
          { label: 'slot 3', value: 3, oledLabel: 'SLOT 3', pc: true },
          { label: 'slot 4', value: 4, oledLabel: 'SLOT 4', pc: true },
        ],
      },
    ],
    macroTemplates: [
      {
        id: 'blooper-rec-play-dub',
        name: 'Rec / Play / Overdub Lifecycle',
        description: 'Sequences Left Switch through Record (CC 1) -> Play (CC 2) -> Overdub (CC 3)',
        controlId: 'record',
        steps: [
          { controlId: 'record', value: 127, label: 'REC' },
          { controlId: 'play', value: 127, label: 'PLAY' },
          { controlId: 'overdub', value: 127, label: 'DUB' },
        ],
      },
    ],
  },
  mood: {
    id: 'mood',
    name: 'mood',
    faceName: 'M O O D',
    sub: 'micro-looper · space',
    accent: '#ef7d5c',
    body: '#e5a38d',
    ink: '#3a1f16',
    midiChannel: 2,
    base: 14,
    photo: 'assets/mood-face.png',
    pw: 618,
    ph: 1126,
    notes: [
      'Official Chase Bliss MOOD MIDI Spec: Knobs CC 14-19, Ramp Speed CC 20, Toggles CC 21-23 (values 1/2/3).',
      'Footswitches: Micro-Looper (CC 102: 0=off, 1-127=on), Wet Channel (CC 103: 0=off, 1-127=on), Both (CC 104).',
      'Presets: PC 0 returns to live panel; PC 1-2 recall front toggle presets; PC 3-122 recall MIDI banks.',
    ],
    controls: [
      { id: 'time', short: 'time', label: 'Time', type: 'knob', x: 22, y: 12, px: 19.3, py: 8.8, ps: 21.7, cc: 14 },
      { id: 'mix', short: 'mix (ramp)', label: 'Mix (Ramp)', type: 'knob', x: 50, y: 12, px: 50.6, py: 8.8, ps: 21.7, cc: 15 },
      { id: 'length', short: 'length', label: 'Length', type: 'knob', x: 78, y: 12, px: 81.9, py: 8.8, ps: 21.7, cc: 16 },
      { id: 'modWet', short: 'modify', label: 'Modify (wet)', type: 'knob', x: 22, y: 33, px: 19.3, py: 28.4, ps: 21.7, cc: 17 },
      { id: 'clock', short: 'clock', label: 'Clock', type: 'knob', x: 50, y: 33, px: 50.6, py: 28.4, ps: 21.7, cc: 18 },
      { id: 'modMicro', short: 'modify', label: 'Modify (micro-looper)', type: 'knob', x: 78, y: 33, px: 81.9, py: 28.4, ps: 21.7, cc: 19 },
      {
        id: 'wetmode',
        short: 'rev · del · slip',
        label: 'Wet channel mode',
        type: 'toggle',
        x: 22,
        y: 52,
        px: 18.0,
        py: 44.6,
        ps: 9.7,
        cc: 21,
        values: [
          { label: 'reverb', value: 1 },
          { label: 'delay', value: 2 },
          { label: 'slip', value: 3 },
        ],
      },
      {
        id: 'routing',
        short: 'in · both · env',
        label: 'Routing',
        type: 'toggle',
        x: 50,
        y: 52,
        px: 50.0,
        py: 44.6,
        ps: 9.7,
        cc: 22,
        values: [
          { label: 'in', value: 1 },
          { label: 'both', value: 2 },
          { label: 'env', value: 3 },
        ],
      },
      {
        id: 'micromode',
        short: 'env · tape · str',
        label: 'Loop channel mode',
        type: 'toggle',
        x: 78,
        y: 52,
        px: 81.6,
        py: 44.6,
        ps: 9.7,
        cc: 23,
        values: [
          { label: 'env', value: 1 },
          { label: 'tape', value: 2 },
          { label: 'stretch', value: 3 },
        ],
      },
      {
        id: 'preset',
        short: 'preset',
        label: 'Preset slot toggle',
        type: 'toggle',
        x: 50,
        y: 82,
        px: 50.0,
        py: 75.0,
        ps: 8.6,
        cc: 0,
        pc: true,
        values: [
          { label: 'left (slot 1)', value: 1, oledLabel: 'PC 1', pc: true },
          { label: 'off (live)', value: 0, oledLabel: 'PC 0', pc: true },
          { label: 'right (slot 2)', value: 2, oledLabel: 'PC 2', pc: true },
        ],
      },
      {
        id: 'wet',
        short: 'wet',
        label: 'Wet channel switch',
        type: 'foot',
        x: 28,
        y: 82,
        px: 20.6,
        py: 88.2,
        ps: 20.6,
        cc: 103,
        values: [
          { label: 'toggle', value: 127, oledLabel: 'WET ON' },
          { label: 'engage', value: 127, oledLabel: 'WET ON' },
          { label: 'bypass', value: 0, oledLabel: 'WET OFF' },
        ],
      },
      {
        id: 'microloop',
        short: 'loop',
        label: 'Micro-looper switch',
        type: 'foot',
        x: 72,
        y: 82,
        px: 80.5,
        py: 88.2,
        ps: 20.6,
        cc: 102,
        values: [
          { label: 'toggle', value: 127, oledLabel: 'LOOP ON' },
          { label: 'engage', value: 127, oledLabel: 'LOOP ON' },
          { label: 'bypass', value: 0, oledLabel: 'LOOP OFF' },
        ],
      },
      // Secondary MIDI-only controls
      { id: 'rampSpeed', short: 'ramp spd', label: 'Ramp speed', type: 'knob', sub: true, x: 22, y: 65, px: 22, py: 65, ps: 8, cc: 20 },
      {
        id: 'both',
        short: 'both ch',
        label: 'Both channels on/off',
        type: 'toggle',
        sub: true,
        x: 50,
        y: 65,
        px: 50,
        py: 65,
        ps: 8,
        cc: 104,
        values: [
          { label: 'engage both', value: 127, oledLabel: 'BOTH ON' },
          { label: 'bypass both', value: 0, oledLabel: 'BOTH OFF' },
        ],
      },
      { id: 'holdWet', short: 'hold wet', label: 'Hold Wet (momentary)', type: 'foot', sub: true, x: 35, y: 65, px: 35, py: 65, ps: 8, cc: 105 },
      { id: 'holdMicro', short: 'hold loop', label: 'Hold Micro (momentary)', type: 'foot', sub: true, x: 65, y: 65, px: 65, py: 65, ps: 8, cc: 106 },
      { id: 'tap', short: 'tap', label: 'Tap tempo', type: 'foot', sub: true, x: 80, y: 65, px: 80, py: 65, ps: 8, cc: 93 },
    ],
  },
  elcap: {
    id: 'elcap',
    name: 'el capistan',
    faceName: 'el capistan',
    sub: 'dTape echo',
    accent: '#c29a5b',
    body: '#c7bfae',
    ink: '#2d261c',
    midiChannel: 3,
    base: 12,
    photo: 'assets/elcap-face.png',
    pw: 618,
    ph: 989,
    notes: [
      'Official Strymon El Capistan v2 MIDI Spec: Time (CC 12), Mix (CC 13), Tape Age (CC 14), Repeats (CC 15), Wow & Flutter (CC 16).',
      'Secondary Knobs: Spring Reverb (CC 17), Low End Contour (CC 18), Tape Bias (CC 19), Tape Crinkle (CC 20), Boost/Cut (CC 21).',
      'Toggles & Switches: Tape Head (CC 28: 1-3), Mode (CC 29: 1-3), Infinite Hold (CC 27), Tap Tempo (CC 93), Bypass (CC 102).',
    ],
    controls: [
      { id: 'time', short: 'time', label: 'Time', type: 'knob', x: 20, y: 20, px: 19.6, py: 18.0, ps: 23.8, cc: 12 },
      { id: 'mix', short: 'mix', label: 'Mix', type: 'knob', x: 80, y: 20, px: 80.7, py: 18.0, ps: 23.8, cc: 13 },
      { id: 'tapeAge', short: 'tape age', label: 'Tape Age', type: 'knob', x: 20, y: 46, px: 19.6, py: 42.6, ps: 23.8, cc: 14 },
      { id: 'repeats', short: 'repeats', label: 'Repeats', type: 'knob', x: 50, y: 38, px: 50.2, py: 36.1, ps: 23.8, cc: 15 },
      { id: 'wow', short: 'wow & flutter', label: 'Wow & Flutter', type: 'knob', x: 80, y: 46, px: 80.7, py: 42.6, ps: 23.8, cc: 16 },
      {
        id: 'head',
        short: 'tape head',
        label: 'Tape Head',
        type: 'toggle',
        x: 40,
        y: 13,
        px: 43.4,
        py: 18.0,
        ps: 6.7,
        cc: 28,
        values: [
          { label: 'fixed', value: 1 },
          { label: 'multi', value: 2 },
          { label: 'single', value: 3 },
        ],
      },
      {
        id: 'cmode',
        short: 'mode',
        label: 'Mode',
        type: 'toggle',
        x: 60,
        y: 13,
        px: 56.9,
        py: 18.0,
        ps: 6.7,
        cc: 29,
        values: [
          { label: 'a', value: 1 },
          { label: 'b', value: 2 },
          { label: 'c', value: 3 },
        ],
      },
      {
        id: 'tap',
        short: 'tap',
        label: 'Tap / Hold / Splice',
        type: 'foot',
        x: 28,
        y: 82,
        px: 18.8,
        py: 80.1,
        ps: 14.2,
        cc: 93,
        values: [
          { label: 'tap / sos splice', value: 127, oledLabel: 'TAP', cc: 93 },
          { label: 'infinite hold on', value: 127, oledLabel: 'HOLD ON', cc: 27 },
          { label: 'infinite hold off', value: 0, oledLabel: 'HOLD OFF', cc: 27 },
        ],
      },
      {
        id: 'onoff',
        short: 'on',
        label: 'On / bypass',
        type: 'foot',
        x: 72,
        y: 82,
        px: 81.8,
        py: 80.1,
        ps: 14.2,
        cc: 102,
        values: [
          { label: 'engage', value: 127, oledLabel: 'ON' },
          { label: 'bypass', value: 0, oledLabel: 'BYPASS' },
        ],
      },
      // Secondary functions (physical second-layer parameters + MIDI switching)
      { id: 'spring', short: 'spring', label: 'Spring Reverb', type: 'knob', sub: true, x: 20, y: 64, px: 20, py: 64, ps: 8, cc: 17 },
      { id: 'lowEnd', short: 'low end', label: 'Low End Contour', type: 'knob', sub: true, x: 35, y: 64, px: 35, py: 64, ps: 8, cc: 18 },
      { id: 'tapeBias', short: 'bias', label: 'Tape Bias', type: 'knob', sub: true, x: 50, y: 64, px: 50, py: 64, ps: 8, cc: 19 },
      { id: 'tapeCrinkle', short: 'crinkle', label: 'Tape Crinkle', type: 'knob', sub: true, x: 65, y: 64, px: 65, py: 64, ps: 8, cc: 20 },
      { id: 'boostCut', short: 'boost/cut', label: '+/- 3dB Boost/Cut', type: 'knob', sub: true, x: 80, y: 64, px: 80, py: 64, ps: 8, cc: 21 },
      {
        id: 'speed',
        short: 'speed',
        label: 'SOS Tape Speed',
        type: 'toggle',
        sub: true,
        x: 35,
        y: 72,
        px: 35,
        py: 72,
        ps: 8,
        cc: 23,
        values: [
          { label: 'normal', value: 0, oledLabel: 'NORM SPD' },
          { label: 'half', value: 127, oledLabel: 'HALF SPD' },
        ],
      },
      {
        id: 'sync',
        short: 'clock sync',
        label: 'MIDI Clock Sync',
        type: 'toggle',
        sub: true,
        x: 65,
        y: 72,
        px: 65,
        py: 72,
        ps: 8,
        cc: 22,
        values: [
          { label: 'free', value: 0, oledLabel: 'FREE' },
          { label: 'clock sync', value: 127, oledLabel: 'SYNC' },
        ],
      },
      {
        id: 'hold',
        short: 'hold',
        label: 'Infinite Hold (Oscillation)',
        type: 'toggle',
        sub: true,
        x: 50,
        y: 72,
        px: 50,
        py: 72,
        ps: 8,
        cc: 27,
        values: [
          { label: 'hold on', value: 127, oledLabel: 'HOLD ON' },
          { label: 'hold off', value: 0, oledLabel: 'HOLD OFF' },
        ],
      },
    ],
  },
  genloss: {
    id: 'genloss',
    name: 'generation loss',
    faceName: 'generation loss',
    sub: 'video decay',
    accent: '#6d93ad',
    body: '#a9c3d4',
    ink: '#1f3b4d',
    midiChannel: 4,
    base: 14,
    photo: 'assets/genloss-face.png',
    pw: 497,
    ph: 944,
    notes: [
      'Official Chase Bliss Generation Loss MKII MIDI Spec: Wow (CC 14), Volume/Ramp (CC 15), Model (CC 16), Flutter (CC 17), Saturate (CC 18), Failure (CC 19).',
      'Toggles & Switches: Aux Mode (CC 21: 1-3), Dry (CC 22: 1-3), Noise (CC 23: 1-3), Classic Mode (CC 24), Bypass (CC 102), Aux Switch (CC 103).',
    ],
    controls: [
      { id: 'wow', short: 'wow', label: 'Wow', type: 'knob', x: 22, y: 12, px: 18.3, py: 8.7, ps: 22.1, cc: 14 },
      { id: 'volume', short: 'volume ramp', label: 'Volume (Ramp)', type: 'knob', x: 50, y: 12, px: 49.5, py: 8.7, ps: 21.1, cc: 15 },
      { id: 'model', short: 'model', label: 'Model / LP', type: 'knob', x: 78, y: 12, px: 82.7, py: 8.7, ps: 21.1, cc: 16 },
      { id: 'flutter', short: 'flutter', label: 'Flutter', type: 'knob', x: 22, y: 33, px: 18.3, py: 29.7, ps: 22.1, cc: 17 },
      { id: 'saturate', short: 'saturate', label: 'Saturate / Gen', type: 'knob', x: 50, y: 33, px: 49.5, py: 29.7, ps: 21.1, cc: 18 },
      { id: 'failure', short: 'failure', label: 'Failure / HP', type: 'knob', x: 78, y: 33, px: 82.7, py: 29.7, ps: 21.1, cc: 19 },
      {
        id: 'aux',
        short: 'stop filter fail',
        label: 'Aux',
        type: 'toggle',
        x: 22,
        y: 52,
        px: 17.7,
        py: 47.0,
        ps: 13.0,
        cc: 21,
        values: [
          { label: 'stop', value: 1 },
          { label: 'filter', value: 2 },
          { label: 'fail', value: 3 },
        ],
      },
      {
        id: 'dry',
        short: 'none small unity',
        label: 'Dry',
        type: 'toggle',
        x: 50,
        y: 52,
        px: 48.9,
        py: 46.5,
        ps: 13.0,
        cc: 22,
        values: [
          { label: 'none', value: 1 },
          { label: 'small', value: 2 },
          { label: 'unity', value: 3 },
        ],
      },
      {
        id: 'noise',
        short: 'none mild heavy',
        label: 'Noise',
        type: 'toggle',
        x: 78,
        y: 52,
        px: 81.3,
        py: 46.5,
        ps: 13.0,
        cc: 23,
        values: [
          { label: 'none', value: 1 },
          { label: 'mild', value: 2 },
          { label: 'heavy', value: 3 },
        ],
      },
      {
        id: 'preset',
        short: 'preset',
        label: 'Preset toggle',
        type: 'toggle',
        x: 50,
        y: 82,
        px: 49.5,
        py: 85.8,
        ps: 9.5,
        cc: 0,
        pc: true,
        values: [
          { label: 'left (slot 1)', value: 1, oledLabel: 'PC 1', pc: true },
          { label: 'off (live)', value: 0, oledLabel: 'PC 0', pc: true },
          { label: 'right (slot 2)', value: 2, oledLabel: 'PC 2', pc: true },
        ],
      },
      {
        id: 'auxSw',
        short: 'aux',
        label: 'Aux switch (momentary)',
        type: 'foot',
        x: 28,
        y: 82,
        px: 17.7,
        py: 91.5,
        ps: 21.1,
        cc: 103,
        values: [
          { label: 'hold on', value: 127, oledLabel: 'AUX ON' },
          { label: 'off', value: 0, oledLabel: 'AUX OFF' },
        ],
      },
      {
        id: 'bypass',
        short: 'bypass',
        label: 'Bypass',
        type: 'foot',
        x: 72,
        y: 82,
        px: 79.7,
        py: 91.5,
        ps: 21.1,
        cc: 102,
        values: [
          { label: 'engage', value: 127, oledLabel: 'ON' },
          { label: 'bypass', value: 0, oledLabel: 'BYPASS' },
        ],
      },
      // Secondary / hidden functions
      { id: 'ramp', short: 'ramp spd', label: 'Ramp speed', type: 'knob', sub: true, x: 20, y: 65, px: 20, py: 65, ps: 8, cc: 20 },
      {
        id: 'classic',
        short: 'mkii / classic',
        label: 'Classic mode',
        type: 'toggle',
        sub: true,
        x: 38,
        y: 65,
        px: 38,
        py: 65,
        ps: 8,
        cc: 24,
        values: [
          { label: 'mk ii', value: 0 },
          { label: 'classic', value: 127 },
        ],
      },
      {
        id: 'order',
        short: 'routing',
        label: 'Filter / Sat order',
        type: 'toggle',
        sub: true,
        x: 56,
        y: 65,
        px: 56,
        py: 65,
        ps: 8,
        cc: 25,
        values: [
          { label: 'filter → sat', value: 0 },
          { label: 'sat → filter', value: 127 },
        ],
      },
      {
        id: 'snag',
        short: 'snag',
        label: 'Random tape snag',
        type: 'toggle',
        sub: true,
        x: 74,
        y: 65,
        px: 74,
        py: 65,
        ps: 8,
        cc: 26,
        values: [
          { label: 'off', value: 0 },
          { label: 'on', value: 127 },
        ],
      },
      {
        id: 'bypassHold',
        short: 'spread',
        label: 'Stereo spread (hold bypass)',
        type: 'toggle',
        sub: true,
        x: 88,
        y: 65,
        px: 88,
        py: 65,
        ps: 8,
        cc: 105,
        values: [
          { label: 'off', value: 0 },
          { label: 'spread on', value: 127 },
        ],
      },
    ],
  },
};

export const DEVICE_ORDER = ['blooper', 'mood', 'elcap', 'genloss'];
export const CATALOG = DEVICE_ORDER;
export const DEFAULT_RIG = ['blooper', 'mood', 'elcap'];
export const DEFAULT_CHANNELS: Record<string, number> = {
  blooper: 1,
  mood: 2,
  elcap: 3,
  genloss: 4,
};

export function valueOptionsFor(control: DeviceControl): ControlValueOption[] {
  if (control.values) return control.values;
  if (control.type === 'knob') return KNOB_VALUES;
  return [];
}
