// Capability taxonomy for musical intent categories.

export type CapabilityId = 'conductor' | 'buffer' | 'glue' | 'loop' | 'wear';

export interface CapabilityDef {
  id: CapabilityId;
  name: string;
  colour: string;
  blurb: string;
}

export const CAPS: CapabilityDef[] = [
  {
    id: 'conductor',
    name: 'conductor',
    colour: '#f7c948',
    blurb: 'keeps everything in step and changes several things with one stomp — the scene changes.',
  },
  {
    id: 'buffer',
    name: 'micro-buffer',
    colour: '#9fe0c0',
    blurb: 'catches tiny moments of what you play, then freezes, slices and retunes them.',
  },
  {
    id: 'glue',
    name: 'spatial glue',
    colour: '#b9a6e6',
    blurb: 'the space around everything — washes, trails, tape echoes and keeping layers behind the dry guitar.',
  },
  {
    id: 'loop',
    name: 'macro-loop',
    colour: '#e08fc0',
    blurb: 'long phrases: record, layer, wear them down, bend their speed.',
  },
  {
    id: 'wear',
    name: 'tape & wear',
    colour: '#6d93ad',
    blurb: 'warble, flutter, saturation, magnetic age and VHS failure across the signal chain.',
  },
];

export function capOf(id: string): CapabilityDef {
  return CAPS.find((c) => c.id === id) || CAPS[0];
}

