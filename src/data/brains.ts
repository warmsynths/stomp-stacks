export interface BrainDef {
  id: string;
  short: string;
  full: string;
  sub: string;
  icon: string;
  colour: string;
  maxSteps: number;
  banks: number;
  /** Hardware specifications and macro capability notes. */
  notes?: string[];
}

export const BRAINS: Record<string, BrainDef> = {
  scribble: {
    id: 'scribble',
    short: 'scribble',
    full: 'Scribble relay',
    sub: 'the little box in the loop — takes one message in, fans the whole stack out',
    icon: '▤',
    colour: '#8fd0e6',
    maxSteps: 8,
    banks: 16,
    notes: [
      'Pirate MIDI Scribble Relay Hub: USB-C Host / TRS / BLE relay box.',
      'Macro Capacity: Stores up to 8 MIDI messages per switch action across 16 banks (128 presets total).',
      'Firmware Flashing: Configured via USB-C or web editor using scribble.json config file.',
    ],
  },
  onboard: {
    id: 'onboard',
    short: 'onboard',
    full: 'Controller onboard',
    sub: 'no extra box — the controller holds the stack itself',
    icon: '◉',
    colour: '#f7c948',
    maxSteps: 6,
    banks: 3,
    notes: [
      'Controller Onboard Storage: Direct execution on smart controllers (like Morningstar MC3).',
      'Macro Capacity: Stores up to 16 MIDI messages per action directly on the controller without requiring an external relay hub.',
    ],
  },
  none: {
    id: 'none',
    short: 'direct',
    full: 'No brain',
    sub: 'controller talks straight to the pedals — one message per stomp',
    icon: '—',
    colour: '#ef7d5c',
    maxSteps: 1,
    banks: 16,
    notes: [
      'Direct Controller Setup: Controller sends 1 raw MIDI message per stomp directly to pedals.',
      'No Macro Stacks: Triggers are limited to 1 step per action (no multi-pedal fanout).',
    ],
  },
};

export const BRAIN_ORDER = ['scribble', 'onboard', 'none'];
