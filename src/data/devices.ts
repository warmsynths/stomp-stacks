// Device Dictionary — the translation layer between the visual UI and raw MIDI.
// Each device owns a physical MIDI channel and a fixed CC number per control;
// see src/compiler/midi.ts for how these turn into statusByte/dataByte1/dataByte2.

export type ControlType = 'knob' | 'toggle' | 'foot';

export interface ControlValueOption {
  /** Human label shown in the value popover, e.g. "9 o'clock", "centre". */
  label: string;
  /** Raw MIDI CC value (0-127) sent for this option. */
  value: number;
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
  /** Fixed MIDI CC number (dataByte1) for this control, within its device's channel. */
  cc: number;
  /** Optional hardware notes or parameter behavior details. */
  notes?: string;
  /** Drawn-fallback position, percent of stage. */
  x: number;
  y: number;
  /** Position over the real photo, percent of stage. */
  px: number;
  py: number;
  /** Hotspot size over the real photo, percent of stage width. */
  ps: number;
  /**
   * Discrete value options for multi-state controls (toggles, foot/multi-control CCs).
   * Knobs without an explicit list use the shared 5-position KNOB_VALUES.
   * Foot switches without a custom list send MAX_VALUE (127).
   */
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
  /** Physical MIDI channel (1-based) this pedal listens on. */
  midiChannel: number;
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

export const MAX_VALUE = 127;

/** Shared 5-position sweep used by every knob. */
export const KNOB_VALUES: ControlValueOption[] = [
  { label: 'min', value: 0 },
  { label: "9 o'clock", value: 32 },
  { label: 'noon', value: 64 },
  { label: "3 o'clock", value: 96 },
  { label: 'max', value: 127 },
];

const TRI: ControlValueOption[] = [
  { label: 'left', value: 0 },
  { label: 'centre', value: 64 },
  { label: 'right', value: 127 },
];

export const DEVICES: Record<string, Device> = {
  blooper: {
    id: 'blooper',
    name: 'blooper',
    faceName: 'blooper',
    sub: 'bottomless looper',
    accent: '#8fd0e6',
    body: '#bfe2ec',
    ink: '#173b47',
    midiChannel: 3,
    pcOffset: 0,
    photo: 'assets/blooper-face.png',
    pw: 508,
    ph: 948,
    notes: [
      'Zero-Based Program Changes: Blooper is a zero-based MIDI pedal. Loops 1-16 are saved and recalled using Program Changes 0-15. This allows for the use of Faves for recalling loops and puts presets in line with BOSS ES and MS series controllers. Other controllers have an option for "PC Offset" set to 0.',
      'TRS MIDI Connection: Blooper uses a 1/4" TRS Ring Active connection. Requires a Chase Bliss MIDIBox or compatible TRS adapter for 5-pin MIDI controllers.',
      'Default Channel: Listens on MIDI Channel 2 by default (configurable by holding both stomp switches at power-on and sending a Program Change).',
      'Additive Mode Overdubs: In Additive mode, MIDI CC movements for Modifiers or Stability can be recorded directly into loop overdubs.',
      'Multi-Control CC 11: CC 11 allows remote control of the onboard switch lifecycle (1=REC, 2=PLAY, 3=DUB, 4=STOP).',
    ],
    controls: [
      { id: 'volume', short: 'ramp volume', label: 'Ramp / Volume', type: 'knob', cc: 14, x: 22, y: 12, px: 18.7, py: 9.7, ps: 20.7 },
      { id: 'layers', short: 'layers', label: 'Layers', type: 'knob', cc: 17, notes: 'Navigates loop layer undo/redo history (0-127)', x: 50, y: 12, px: 49.2, py: 9.5, ps: 19.7 },
      { id: 'repeats', short: 'repeats', label: 'Repeats', type: 'knob', cc: 15, x: 78, y: 12, px: 82.0, py: 9.5, ps: 19.7 },
      { id: 'modA', short: 'mod a', label: 'Modifier A', type: 'knob', cc: 30, x: 22, y: 33, px: 19.1, py: 29.7, ps: 20.7 },
      { id: 'stability', short: 'stability', label: 'Stability', type: 'knob', cc: 18, x: 50, y: 33, px: 49.6, py: 29.5, ps: 19.7 },
      { id: 'modB', short: 'mod b', label: 'Modifier B', type: 'knob', cc: 31, x: 78, y: 33, px: 82.0, py: 29.7, ps: 19.7 },
      { id: 'chA', short: '1 2 3', label: 'Mod A channel', type: 'toggle', cc: 21, x: 22, y: 52, px: 19.7, py: 46.8, ps: 12.2, values: [{ label: '1', value: 0 }, { label: '2', value: 64 }, { label: '3', value: 127 }] },
      { id: 'mode', short: 'norm add samp', label: 'Norm / Add / Samp', type: 'toggle', cc: 22, x: 50, y: 52, px: 49.8, py: 46.8, ps: 12.2, values: [{ label: 'normal', value: 0 }, { label: 'additive', value: 64 }, { label: 'sampling', value: 127 }] },
      { id: 'chB', short: '4 5 6', label: 'Mod B channel', type: 'toggle', cc: 23, x: 78, y: 52, px: 80.7, py: 46.8, ps: 12.2, values: [{ label: '4', value: 0 }, { label: '5', value: 64 }, { label: '6', value: 127 }] },
      { id: 'undo', short: 'undo / redo', label: 'Undo / Redo', type: 'toggle', cc: 5, notes: 'CC 5 triggers Undo, CC 6 triggers Redo', x: 50, y: 82, px: 49.8, py: 85.7, ps: 9.1, values: [{ label: 'undo', value: 0 }, { label: 'off', value: 64 }, { label: 'redo', value: 127 }] },
      {
        id: 'record',
        short: 'record',
        label: 'Record',
        type: 'foot',
        cc: 1,
        notes: 'CC 1 acts exactly like pressing the left physical footswitch',
        x: 28,
        y: 82,
        px: 19.1,
        py: 89.1,
        ps: 19.7,
        values: [
          { label: 'tap', value: 127 },
        ],
      },
      {
        id: 'record_discrete',
        short: 'discrete state',
        label: 'Discrete Record State (CC 11)',
        type: 'foot',
        cc: 11,
        notes: 'CC 11 allows remote control of the onboard switch lifecycle (Requires step-sequencer)',
        x: 28,
        y: 89,
        px: 19.1,
        py: 95,
        ps: 10,
        values: [
          { label: 'record', value: 1 },
          { label: 'play', value: 2 },
          { label: 'overdub', value: 3 },
          { label: 'stop', value: 4 },
        ],
      },
      {
        id: 'loop',
        short: 'loop',
        label: 'Loop (Right Switch)',
        type: 'foot',
        cc: 2,
        notes: 'CC 2 acts exactly like pressing the right physical footswitch',
        x: 72,
        y: 82,
        px: 79.8,
        py: 89.1,
        ps: 19.7,
        values: [
          { label: 'tap', value: 127 },
        ],
      },
    ],
    macroTemplates: [
      {
        id: 'blooper-left-cycle',
        name: 'Record / Play / Overdub Lifecycle',
        description: 'Sequences through REC (v1) -> PLAY (v2) -> DUB (v3) -> PLAY (v2) (Requires Step Sequencer)',
        controlId: 'record_discrete',
        steps: [
          { controlId: 'record_discrete', value: 1, label: 'REC' },
          { controlId: 'record_discrete', value: 2, label: 'PLAY' },
          { controlId: 'record_discrete', value: 3, label: 'DUB' },
          { controlId: 'record_discrete', value: 2, label: 'PLAY' },
        ],
      },
      {
        id: 'blooper-undo-redo',
        name: 'Undo / Redo Lifecycle',
        description: 'Triggers Undo (0) followed by Redo (127)',
        controlId: 'undo',
        steps: [
          { controlId: 'undo', value: 0, label: 'UNDO' },
          { controlId: 'undo', value: 127, label: 'REDO' },
        ],
      },
    ],
  },
  mood: {
    id: 'mood',
    name: 'MOOD',
    faceName: 'MOOD',
    sub: 'instant ambience',
    accent: '#ef7d5c',
    body: '#e8785a',
    ink: '#4a150c',
    midiChannel: 2,
    photo: 'assets/mood-face.png',
    pw: 507,
    ph: 957,
    notes: [
      'Independent Channel Bypass: CC 102 controls Micro-looper bypass (0=Off, 127=On) and CC 103 controls Wet channel bypass (0=Off, 127=On). On classic MOOD, CC 103 values 0 (both off), 45 (micro only), 85 (wet only), 127 (both on) set combined states.',
      'TRS MIDI Connection: Uses 1/4" TRS Ring Active MIDI jack (requires Chase Bliss MIDIBox or TRS MIDI cable).',
      'Default Channel: Set to MIDI Channel 2 by default.',
      'Clock Sync & Subdivisions: CC 18 controls master clock speed. In Tape mode, Length (CC 16) quantizes loop subdivisions (x/32, x/16, x/8, x/4, x/2, x/1).',
    ],
    controls: [
      { id: 'time', short: 'time', label: 'Time', type: 'knob', cc: 14, x: 22, y: 12, px: 17.9, py: 10.1, ps: 20.7 },
      { id: 'mix', short: 'mix (ramp)', label: 'Mix (Ramp)', type: 'knob', cc: 15, x: 50, y: 12, px: 48.9, py: 10.1, ps: 19.8 },
      { id: 'length', short: 'length', label: 'Length', type: 'knob', cc: 16, x: 78, y: 12, px: 81.5, py: 10.1, ps: 19.8 },
      { id: 'modWet', short: 'modify', label: 'Modify — wet', type: 'knob', cc: 17, x: 22, y: 33, px: 17.9, py: 30.5, ps: 20.7 },
      { id: 'clock', short: 'clock', label: 'Clock', type: 'knob', cc: 18, x: 50, y: 33, px: 49.3, py: 30.3, ps: 19.8 },
      { id: 'modMicro', short: 'modify', label: 'Modify — micro', type: 'knob', cc: 19, x: 78, y: 33, px: 81.8, py: 30.5, ps: 19.8 },
      { id: 'wetmode', short: 'reverb delay slip', label: 'Wet effect', type: 'toggle', cc: 21, x: 22, y: 52, px: 19.3, py: 47.0, ps: 12.2, values: [{ label: 'reverb', value: 0 }, { label: 'delay', value: 64 }, { label: 'slip', value: 127 }] },
      { id: 'routing', short: 'in · ○+in · ○', label: 'Routing', type: 'toggle', cc: 22, x: 50, y: 52, px: 49.5, py: 47.0, ps: 12.2, values: [{ label: 'in', value: 0 }, { label: 'loop + in', value: 64 }, { label: 'loop', value: 127 }] },
      { id: 'micromode', short: 'stretch tape env', label: 'Micro-looper mode', type: 'toggle', cc: 23, x: 78, y: 52, px: 80.5, py: 47.0, ps: 12.2, values: [{ label: 'stretch', value: 0 }, { label: 'tape', value: 64 }, { label: 'env', value: 127 }] },
      { id: 'bypass', short: 'bypass', label: 'Bypass mode', type: 'toggle', cc: 103, notes: 'CC 103 controls Wet channel bypass; CC 102 controls Micro-looper bypass', x: 50, y: 82, px: 49.5, py: 86.7, ps: 9.1, values: TRI },
      {
        id: 'wet',
        short: 'wet',
        label: 'Wet channel',
        type: 'foot',
        cc: 1,
        notes: 'CC 1 acts exactly like pressing the left physical footswitch',
        x: 28,
        y: 82,
        px: 18.4,
        py: 90.3,
        ps: 19.8,
        values: [
          { label: 'tap', value: 127 },
        ],
      },
      {
        id: 'wet_discrete',
        short: 'wet discrete',
        label: 'Wet Channel Bypass (CC 103)',
        type: 'foot',
        cc: 103,
        notes: 'CC 103 explicitly controls Wet channel bypass state',
        x: 28,
        y: 89,
        px: 18.4,
        py: 96,
        ps: 10,
        values: [
          { label: 'off', value: 0 },
          { label: 'on', value: 127 },
        ],
      },
      {
        id: 'microloop',
        short: 'micro',
        label: 'Micro-looper',
        type: 'foot',
        cc: 2,
        notes: 'CC 2 acts exactly like pressing the right physical footswitch',
        x: 72,
        y: 82,
        px: 79.5,
        py: 90.3,
        ps: 19.8,
        values: [
          { label: 'tap', value: 127 },
        ],
      },
      {
        id: 'microloop_discrete',
        short: 'micro discrete',
        label: 'Micro-looper State (CC 102)',
        type: 'foot',
        cc: 102,
        notes: 'CC 102 explicitly controls Micro-looper bypass state',
        x: 72,
        y: 89,
        px: 79.5,
        py: 96,
        ps: 10,
        values: [
          { label: 'off', value: 0 },
          { label: 'instant', value: 64 },
          { label: 'on', value: 127 },
        ],
      },
    ],
    macroTemplates: [
      {
        id: 'mood-micro-lifecycle',
        name: 'Micro-Looper Freeze & Clear Lifecycle',
        description: 'Sequences Micro-Looper switch through REC/FREEZE (127) -> DUB (64) -> CLEAR (0)',
        controlId: 'microloop_discrete',
        steps: [
          { controlId: 'microloop_discrete', value: 127, label: 'FREEZE' },
          { controlId: 'microloop_discrete', value: 64, label: 'DUB' },
          { controlId: 'microloop_discrete', value: 0, label: 'CLEAR' },
        ],
      },
    ],
  },
  elcap: {
    id: 'elcap',
    name: 'el capistan',
    faceName: 'el capistan',
    sub: 'dTape echo',
    accent: '#7b62b8',
    body: '#c7ced2',
    ink: '#20262b',
    midiChannel: 1,
    photo: 'assets/elcap-face.png',
    pw: 775,
    ph: 872,
    notes: [
      'EXP/MIDI Jack Setup: Must configure EXP/MIDI jack to MIDI mode at power-up (hold TAP footswitch, turn MIX knob until ON LED turns BLUE).',
      'Default Channel: Defaults to MIDI Channel 1.',
      'Bypass CC: CC 102 with value 127 engages effect; value 0 bypasses.',
      'Clock Division: CC 25 controls Clock Division on V2 firmware.',
    ],
    controls: [
      { id: 'time', short: 'time', label: 'Time', type: 'knob', cc: 12, x: 22, y: 13, px: 14.9, py: 18.0, ps: 17.0 },
      { id: 'cmix', short: 'mix', label: 'Mix', type: 'knob', cc: 14, x: 78, y: 13, px: 85.1, py: 18.0, ps: 17.0 },
      { id: 'age', short: 'tape age', label: 'Tape Age', type: 'knob', cc: 16, x: 38, y: 33, px: 38.0, py: 37.3, ps: 17.0 },
      { id: 'repeats', short: 'repeats', label: 'Repeats', type: 'knob', cc: 15, x: 62, y: 33, px: 62.0, py: 37.3, ps: 17.0 },
      { id: 'wow', short: 'wow & flutter', label: 'Wow & Flutter', type: 'knob', cc: 13, x: 22, y: 45, px: 14.9, py: 42.5, ps: 17.0 },
      { id: 'spring', short: 'spring', label: 'Spring', type: 'knob', cc: 18, x: 78, y: 45, px: 85.1, py: 42.5, ps: 17.0 },
      { id: 'head', short: 'tape head', label: 'Tape head', type: 'toggle', cc: 11, x: 40, y: 13, px: 42.8, py: 18.0, ps: 6.7, values: [{ label: 'fixed', value: 0 }, { label: 'multi', value: 64 }, { label: 'single', value: 127 }] },
      { id: 'cmode', short: 'mode', label: 'Mode', type: 'toggle', cc: 19, x: 60, y: 13, px: 56.9, py: 18.0, ps: 6.7, values: [{ label: 'a', value: 0 }, { label: 'b', value: 64 }, { label: 'c', value: 127 }] },
      {
        id: 'tap',
        short: 'tap',
        label: 'Tap / SOS',
        type: 'foot',
        cc: 93,
        notes: 'CC 93 triggers Tap tempo pulse and acts as the SOS looper footswitch in Mode C',
        x: 28,
        y: 82,
        px: 18.8,
        py: 80.1,
        ps: 14.2,
        values: [
          { label: 'tap', value: 127 },
        ],
      },
      {
        id: 'onoff',
        short: 'on',
        label: 'On / bypass',
        type: 'foot',
        cc: 102,
        notes: 'CC 102 value 127 engages, 0 bypasses',
        x: 72,
        y: 82,
        px: 81.8,
        py: 80.1,
        ps: 14.2,
        values: [
          { label: 'bypass', value: 0 },
          { label: 'infinite', value: 64 },
          { label: 'engage', value: 127 },
        ],
      },
    ],
    macroTemplates: [],
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
    photo: 'assets/genloss-face.png',
    pw: 497,
    ph: 944,
    notes: [
      'TRS MIDI Connection: Uses Chase Bliss 1/4" TRS Ring Active MIDI connection.',
      'Default Channel: Configurable MIDI Channel (defaults to Channel 4 in multi-pedal rigs).',
    ],
    controls: [
      { id: 'wow', short: 'wow', label: 'Wow', type: 'knob', cc: 14, x: 22, y: 12, px: 18.3, py: 8.7, ps: 22.1 },
      { id: 'volume', short: 'volume ramp', label: 'Volume (Ramp)', type: 'knob', cc: 15, x: 50, y: 12, px: 49.5, py: 8.7, ps: 21.1 },
      { id: 'model', short: 'model', label: 'Model / LP', type: 'knob', cc: 16, x: 78, y: 12, px: 82.7, py: 8.7, ps: 21.1 },
      { id: 'flutter', short: 'flutter', label: 'Flutter', type: 'knob', cc: 17, x: 22, y: 33, px: 18.3, py: 29.7, ps: 22.1 },
      { id: 'saturate', short: 'saturate', label: 'Saturate / Gen', type: 'knob', cc: 18, x: 50, y: 33, px: 49.5, py: 29.7, ps: 21.1 },
      { id: 'failure', short: 'failure', label: 'Failure / HP', type: 'knob', cc: 19, x: 78, y: 33, px: 82.7, py: 29.7, ps: 21.1 },
      { id: 'aux', short: 'stop filter fail', label: 'Aux', type: 'toggle', cc: 21, x: 22, y: 52, px: 17.7, py: 47.0, ps: 13.0, values: [{ label: 'stop', value: 0 }, { label: 'filter', value: 64 }, { label: 'fail', value: 127 }] },
      { id: 'dry', short: 'none small unity', label: 'Dry', type: 'toggle', cc: 22, x: 50, y: 52, px: 48.9, py: 46.5, ps: 13.0, values: [{ label: 'none', value: 0 }, { label: 'small', value: 64 }, { label: 'unity', value: 127 }] },
      { id: 'noise', short: 'none mild heavy', label: 'Noise', type: 'toggle', cc: 23, x: 78, y: 52, px: 81.3, py: 46.5, ps: 13.0, values: [{ label: 'none', value: 0 }, { label: 'mild', value: 64 }, { label: 'heavy', value: 127 }] },
      { id: 'preset', short: 'preset', label: 'Preset toggle', type: 'toggle', cc: 101, x: 50, y: 82, px: 49.5, py: 85.8, ps: 9.5, values: TRI },
      {
        id: 'auxSw',
        short: 'aux',
        label: 'Aux switch',
        type: 'foot',
        cc: 1,
        notes: 'CC 1 acts exactly like pressing the left physical footswitch',
        x: 28,
        y: 82,
        px: 17.7,
        py: 91.5,
        ps: 21.1,
        values: [
          { label: 'tap', value: 127 },
        ],
      },
      {
        id: 'aux_discrete',
        short: 'aux discrete',
        label: 'Aux State (CC 103)',
        type: 'foot',
        cc: 103,
        notes: 'CC 103 explicitly controls Aux performance state',
        x: 28,
        y: 89,
        px: 17.7,
        py: 97,
        ps: 10,
        values: [
          { label: 'stop', value: 0 },
          { label: 'filter', value: 64 },
          { label: 'fail', value: 127 },
        ],
      },
      {
        id: 'bypass',
        short: 'bypass',
        label: 'Bypass',
        type: 'foot',
        cc: 2,
        notes: 'CC 2 acts exactly like pressing the right physical footswitch',
        x: 72,
        y: 82,
        px: 79.7,
        py: 91.5,
        ps: 21.1,
        values: [
          { label: 'tap', value: 127 },
        ],
      },
      {
        id: 'bypass_discrete',
        short: 'bypass discrete',
        label: 'Bypass State (CC 102)',
        type: 'foot',
        cc: 102,
        notes: 'CC 102 explicitly controls Bypass state',
        x: 72,
        y: 89,
        px: 79.7,
        py: 97,
        ps: 10,
        values: [
          { label: 'off', value: 0 },
          { label: 'on', value: 127 },
        ],
      },
    ],
    macroTemplates: [
      {
        id: 'genloss-aux-cycle',
        name: 'Aux Performance Switch Lifecycle',
        description: 'Sequences Aux switch through STOP (0) -> FILTER (64) -> FAIL (127)',
        controlId: 'aux_discrete',
        steps: [
          { controlId: 'aux_discrete', value: 0, label: 'STOP' },
          { controlId: 'aux_discrete', value: 64, label: 'FLTR' },
          { controlId: 'aux_discrete', value: 127, label: 'FAIL' },
        ],
      },
    ],
  },
};

export const DEVICE_ORDER = ['blooper', 'mood', 'elcap', 'genloss'];

export function valueOptionsFor(control: DeviceControl): ControlValueOption[] {
  if (control.values) return control.values;
  if (control.type === 'knob') return KNOB_VALUES;
  return [];
}
