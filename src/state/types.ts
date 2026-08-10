import type { ActionId } from '../data/controllers.js';
import type { ColorName, TextColorName } from '../data/naming.js';

export interface MacroStep {
  device: string;
  control: string;
  /** Raw MIDI value for this step, or null for a momentary footswitch (sends MAX_VALUE). */
  value: number | null;
}

export type ActionBucket = { press: MacroStep[]; hold: MacroStep[]; double: MacroStep[] };

/** One bank: every switch key on the active controller, each with its 3 action buckets. */
export type Bank = Record<string, ActionBucket>;

export type FaceMode = 'photo' | 'drawn';

export interface PresetNaming {
  name?: string;
  secondary?: string;
  color?: ColorName | null;
  textColor?: TextColorName;
}

export interface IdentResult {
  name: string;
  secondary: string;
  color: ColorName | null;
  textColor: TextColorName;
  autoText: boolean;
  raw: PresetNaming;
  auto: string;
  autoSec: string;
}

export interface HeardDrift {
  pedal: string;
  control: string;
  cc: number;
  expect: number;
  drift: number;
}

export interface ReadRow {
  key: string;
  device: MacroStep[];
  app: MacroStep[];
  pick: 'app' | 'device';
}

export interface ParsedPresetItem {
  id: string;
  bankIndex: number;
  key: string;
  presetName: string;
  secondaryText: string;
  steps: MacroStep[];
  selected: boolean;
}

export interface ReadModalData {
  from: string;
  allPresets: ParsedPresetItem[];
  readingHardware?: boolean;
}





export interface WireLogEntry {
  n: number;
  text: string;
  sub: string;
  tone: 'trig' | 'out' | 'in' | 'warn' | 'ok';
}

export interface ConnectedNode {
  id: string;
  name: string;
  kind: string;
  port: string;
  canRead: boolean;
  canListen: boolean;
}

export interface StompState {
  controllerId: string;
  brainId: string;
  banks: Bank[];
  bank: number;
  selectedKey: string;
  action: ActionId;
  /** Which device's faceplate is currently being browsed to add steps. */
  browseDevice: string;
  face: FaceMode;
  popoverControlId: string | null;
  compileOpen: boolean;
  settingsOpen: boolean;
  controllerPickerOpen: boolean;
  brainPickerOpen: boolean;
  addPedalOpen: boolean;
  confirmRemovePedal: string | null;
  channelPickerOpen: boolean;
  colorPickerOpen: boolean;
  targetId: string;
  rig: string[];
  channels: Record<string, number>;
  /** Naming & color overrides keyed by "bankIndex:switchKey" (e.g. "0:A"). */
  naming: Record<string, PresetNaming>;
  /** Phone-only bottom sheet expanded state. */
  sheetOpen: boolean;
  /** Hardware connection modal & live wire monitor states */
  connectOpen: boolean;
  readOpen: boolean;
  readData: ReadModalData | null;
  conn: Record<string, boolean>;
  listening: string | null;
  heard: HeardDrift | null;
  offsets: Record<string, number>;
  monitorOn: boolean;
  log: WireLogEntry[];
  seq: number;
}

