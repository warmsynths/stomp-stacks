// Physical remote controllers ("dumb" foot controllers) that trigger macro stacks.

export interface ControllerDef {
  id: string;
  name: string;
  short: string;
  sub: string;
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
  /** Hardware documentation and capability details. */
  notes?: string[];
}

export const CONTROLLERS: Record<string, ControllerDef> = {
  chocolate: {
    id: 'chocolate',
    name: 'M-Vave Chocolate',
    short: 'chocolate',
    sub: '4 switches · 4 banks',
    keys: ['A', 'B', 'C', 'D'],
    x: [14, 38, 62, 86],
    y: [42, 42, 42, 42],
    height: 74,
    heightDesktop: 80,
    banks: 4,
    screen: false,
    onboard: false,
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
};

export const CONTROLLER_ORDER = ['chocolate', 'mc3'];

export const ACTIONS: Array<{ id: 'press' | 'hold' | 'double'; label: string }> = [
  { id: 'press', label: 'tap' },
  { id: 'hold', label: 'hold' },
  { id: 'double', label: 'double' },
];

export type ActionId = 'press' | 'hold' | 'double';
