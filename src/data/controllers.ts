// Physical remote controllers ("dumb" foot controllers) that trigger macro stacks.

export interface ControllerDef {
  id: string;
  name: string;
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
}

export const CONTROLLERS: Record<string, ControllerDef> = {
  chocolate: {
    id: 'chocolate',
    name: 'M-Vave Chocolate',
    sub: '4 switches · 4 banks',
    keys: ['A', 'B', 'C', 'D'],
    x: [14, 38, 62, 86],
    y: [42, 42, 42, 42],
    height: 74,
    heightDesktop: 80,
    banks: 4,
    screen: false,
  },
  mc3: {
    id: 'mc3',
    name: 'Morningstar MC3',
    sub: '3 switches · 3 banks',
    keys: ['A', 'B', 'C'],
    x: [26, 74, 50],
    y: [74, 74, 14],
    height: 158,
    heightDesktop: 170,
    banks: 3,
    screen: true,
  },
};

export const CONTROLLER_ORDER = ['chocolate', 'mc3'];

export const ACTIONS: Array<{ id: 'press' | 'hold' | 'double'; label: string }> = [
  { id: 'press', label: 'tap' },
  { id: 'hold', label: 'hold' },
  { id: 'double', label: 'double' },
];

export type ActionId = 'press' | 'hold' | 'double';
