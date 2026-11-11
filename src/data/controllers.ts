// Physical remote controllers ("dumb" foot controllers or self-contained brain/controllers) that trigger macro stacks.

export type ActionId = 'press' | 'hold' | 'double';

export interface ControllerPhotoScreen {
  l: number;
  t: number;
  w: number;
  h: number;
  r: string;
  digits?: boolean;
}

export interface ControllerPhoto {
  src: string;
  ar: string;
  x: number[];
  y: number[];
  s: number;
  radius: string;
  screen?: ControllerPhotoScreen;
}

export interface ControllerDef {
  id: string;
  name: string;
  short: string;
  sub: string;
  blurb?: string;
  keys: string[];
  /** Switch cap positions, percent of the strip, one pair per key. */
  x: number[];
  y: number[];
  /** Strip height in px, tablet/phone. */
  height: number;
  /** Strip height in px, desktop — taller because the bank row sits above it. */
  heightDesktop: number;
  banks: number;
  screen: boolean;
  onboard: boolean;
  isBrain?: boolean;
  nav?: boolean;
  actions?: ActionId[];
  photo?: ControllerPhoto;
  /** Hardware documentation and capability details. */
  notes?: string[];
}

export const CONTROLLERS: Record<string, ControllerDef> = {
  chocolate: {
    id: 'chocolate',
    name: 'M-Vave Chocolate',
    short: 'chocolate',
    sub: '4 switches · 4 banks',
    blurb: 'cheap bluetooth stomper, no screen — whatever you name a switch, the caps stay blank',
    keys: ['A', 'B', 'C', 'D'],
    x: [14, 38, 62, 86],
    y: [42, 42, 42, 42],
    height: 74,
    heightDesktop: 80,
    banks: 4,
    screen: false,
    onboard: false,
    photo: {
      src: 'assets/chocolate-top.png',
      ar: '1448/243',
      x: [6.6, 35.4, 64.1, 92.5],
      y: [53.5, 53.5, 53.5, 53.5],
      s: 8.3,
      radius: '1%/6%',
      screen: { l: 46.1, t: 22.6, w: 7.3, h: 57.6, r: '4px', digits: true },
    },
    notes: [
      'Hardware Layout: 4 foot switches (A, B, C, D) across 4 banks.',
      'No Onboard Macro Storage: Sends 1 MIDI message per switch. Requires an external smart relay hub (Pirate MIDI Scribble) to fan out multi-step macro stacks.',
      'Editor & Connection: Configured via M-Vave CubeSuite app over Bluetooth or USB-C MIDI.',
    ],
  },
  mc3: {
    id: 'mc3',
    name: 'Morningstar MC3',
    short: 'mc3',
    sub: '3 switches · 3 banks',
    blurb: 'workhorse midi controller with a small screen and colour leds per switch',
    keys: ['A', 'B', 'C'],
    x: [26, 74, 50],
    y: [74, 74, 14],
    height: 158,
    heightDesktop: 170,
    banks: 3,
    screen: true,
    onboard: true,
    notes: [
      'Hardware Layout: 3 foot switches (A, B, C) supporting 30 physical banks.',
      'Onboard Macro Storage: Stores up to 16 MIDI messages per switch action directly in memory without requiring an external relay box.',
      'Editor Integration: Exports native preset JSON for import via the Morningstar Editor.',
      'Connectivity: Features OLED display screen, 1x 5-pin DIN MIDI Out, 4x 3.5mm TRS MIDI outputs, and USB-C MIDI.',
    ],
  },
  scribble: {
    id: 'scribble',
    name: 'Scribble relay',
    short: 'scribble',
    sub: 'left + right switch · tap + hold · 128 presets',
    blurb: 'screen and brain in one — 128 presets, each with a left and right switch you can tap or hold',
    keys: ['L', 'R'],
    x: [27, 73],
    y: [70, 70],
    height: 120,
    heightDesktop: 130,
    banks: 128,
    screen: false,
    onboard: true,
    isBrain: true,
    nav: true,
    actions: ['press', 'hold'],
    photo: {
      src: 'assets/scribble-top.png',
      ar: '1315/504',
      x: [11.4, 91.3],
      y: [27.8, 27.8],
      s: 9.9,
      radius: '3.5%/9%',
      screen: { l: 25.1, t: 12.3, w: 52.5, h: 76.4, r: '9%' },
    },
    notes: [
      'Hardware Layout: Left + Right switches across 128 presets with tap and hold triggers.',
      'Self-Contained Brain & Screen: Fans out up to 8 MIDI messages per action with a colour LCD screen.',
    ],
  },
};

export const CONTROLLER_ORDER = ['chocolate', 'mc3', 'scribble'];

export const ACTIONS: Array<{ id: ActionId; label: string }> = [
  { id: 'press', label: 'tap' },
  { id: 'hold', label: 'hold' },
  { id: 'double', label: 'double' },
];

export const SIDE_LABELS: Record<string, string> = {
  L: 'left',
  R: 'right',
};

