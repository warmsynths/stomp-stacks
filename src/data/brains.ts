export interface BrainDef {
  id: string;
  short: string;
  full: string;
  sub: string;
  icon: string;
  colour: string;
  maxSteps: number;
  banks: number;
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
  },
};

export const BRAIN_ORDER = ['scribble', 'onboard', 'none'];
