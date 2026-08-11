export type ColorName =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'mint'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'white';

export type TextColorName = 'ink' | 'cream' | 'white';

export const PALETTE: Array<[ColorName, string]> = [
  ['red', '#ef5c4c'],
  ['orange', '#ef7d5c'],
  ['yellow', '#f7c948'],
  ['green', '#5bb85b'],
  ['mint', '#9fe0c0'],
  ['cyan', '#8fd0e6'],
  ['blue', '#5b8fd6'],
  ['purple', '#7b62b8'],
  ['pink', '#e08fc0'],
  ['white', '#f4ede0'],
];

export const HEX: Record<ColorName, string> = PALETTE.reduce(
  (acc, [name, hex]) => {
    acc[name] = hex;
    return acc;
  },
  {} as Record<ColorName, string>,
);

export const TEXTS: Array<[TextColorName, string]> = [
  ['ink', '#16323d'],
  ['cream', '#f7f1e3'],
  ['white', '#ffffff'],
];

export const TEXTHEX: Record<TextColorName, string> = TEXTS.reduce(
  (acc, [name, hex]) => {
    acc[name] = hex;
    return acc;
  },
  {} as Record<TextColorName, string>,
);

export const FALLBACK: Partial<Record<ColorName, ColorName>> = {
  mint: 'green',
  pink: 'purple',
};

export function findClosestPaletteColor(rgbInt: number): ColorName {
  const r = (rgbInt >> 16) & 0xff;
  const g = (rgbInt >> 8) & 0xff;
  const b = rgbInt & 0xff;

  let minDistance = Infinity;
  let bestColor: ColorName = 'red';

  PALETTE.forEach(([name, hex]) => {
    const cInt = parseInt(hex.slice(1), 16);
    const cr = (cInt >> 16) & 0xff;
    const cg = (cInt >> 8) & 0xff;
    const cb = cInt & 0xff;
    const dist = (r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2;
    if (dist < minDistance) {
      minDistance = dist;
      bestColor = name;
    }
  });

  return bestColor;
}

export function parseScribbleColor(val: any): ColorName | undefined {
  if (val === null || val === undefined) return undefined;
  if (typeof val === 'string') {
    const lower = val.toLowerCase().trim();
    if (PALETTE.some(([name]) => name === lower)) return lower as ColorName;
    if (lower.startsWith('#')) {
      const hexInt = parseInt(lower.slice(1), 16);
      if (!isNaN(hexInt)) return findClosestPaletteColor(hexInt);
    }
  }
  if (typeof val === 'number' && val > 0) {
    return findClosestPaletteColor(val);
  }
  return undefined;
}

export function isDark(hexColor: string): boolean {
  const hex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
  if (hex.length !== 6) return true;
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 < 150;
}

export interface NamingTargetDef {
  id: string;
  label: string;
  role: 'brain' | 'controller';
  name: number;
  secondary: number;
  /** null means any palette color allowed, empty array means no colors, string[] means specific subset. */
  colors: ColorName[] | null;
  text: boolean;
  note: string;
}

export const NAMING: Record<string, NamingTargetDef> = {
  scribble: {
    id: 'scribble',
    label: 'Scribble relay',
    role: 'brain',
    name: 12,
    secondary: 12,
    colors: null,
    text: true,
    note: 'a lit strip per switch: both lines, the colour, the text colour.',
  },
  mc3: {
    id: 'mc3',
    label: 'Morningstar MC3',
    role: 'controller',
    name: 8,
    secondary: 0,
    colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'white'],
    text: false,
    note: 'one line on the shared screen, colour on the led. the second line has nowhere to go.',
  },
  chocolate: {
    id: 'chocolate',
    label: 'M-Vave Chocolate',
    role: 'controller',
    name: 0,
    secondary: 0,
    colors: [],
    text: false,
    note: 'no screen, no leds. this one only ever reaches the printed label sheet.',
  },
};
