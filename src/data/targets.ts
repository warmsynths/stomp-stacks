export interface TargetDef {
  id: string;
  label: string;
  sub: string;
  note: string;
}

export const TARGETS: TargetDef[] = [
  { id: 'scribble', label: 'scribble.json', sub: 'relay config', note: 'flashes onto the scribble over usb' },
  { id: 'mc3', label: 'mc3-preset.json', sub: 'native preset', note: 'import via the morningstar editor' },
  { id: 'rig', label: 'rig.json', sub: 'portable source', note: 'the source of truth — every build comes from this' },
  { id: 'labels', label: 'label sheet', sub: 'printable', note: 'one line per stomp, for the pedalboard' },
  { id: 'log', label: 'midi log', sub: 'debug trace', note: 'raw bytes, in the order they leave' },
];
