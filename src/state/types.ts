import type { ActionId } from '../data/controllers.js';
import type { ColorName, TextColorName } from '../data/naming.js';
import type { CapabilityId } from '../data/capabilities.js';
import type { ActionDef } from '../data/actions.js';
import type { PedalSetup, SetupDeviceId } from '../data/setups.js';
import type { ScribbleFirmwareInfo } from '../types/scribble.js';

export interface Message {
  device: string;
  control: string;
  /** Raw MIDI value for this step, or null for a momentary footswitch (sends MAX_VALUE) or PC step. */
  value: number | null;
  /** Custom dynamic OLED display label (e.g. "REC", "PLAY", "DUB", "STOP"). */
  label?: string;
  /** Linked Action ID when this message belongs to a linked Action instance. */
  act?: string;
  /** Unique Action instance ID within a Press stack. */
  inst?: number;
  /** Provenance label when unlinked from an Action ("from <action name>"). */
  from?: string;
  /** Referenced PedalSetup ID when control === 'pc'. */
  set?: string;
}

export type MacroStep = Message;

export type ActionBucket = { press: Message[]; hold: Message[]; double: Message[] };

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
  device: Message[];
  app: Message[];
  pick: 'app' | 'device';
}

export interface ReadPresetDestination {
  key: string;
  bank?: number;
  action: ActionId;
  mode: 'replace' | 'add';
}

export interface ReadPresetSlot {
  n: number;
  label: string;
  second: string;
  color: ColorName | null;
  steps: Message[];
}

export interface ParsedPresetItem {
  id: string;
  bankIndex: number;
  key: string;
  presetName: string;
  secondaryText: string;
  steps: Message[];
  selected: boolean;
}

export interface ReadModalData {
  from: string;
  presets: ReadPresetSlot[];
  dest: Record<number, ReadPresetDestination>;
  filter: string;
  allPresets?: ParsedPresetItem[];
  readingHardware?: boolean;
  scanned?: number;
  total?: number;
  found?: number;
  rows?: ReadRow[];
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

export interface ClashResult {
  kind: 'over' | 'wig';
  text: string;
  merge?: number | null;
  at?: number;
}

export interface WiggleInfo {
  set: PedalSetup;
  device: string;
  lo: number;
  hi: number;
  bounce: boolean;
  speed: number;
  noStart: boolean;
  knobId: string;
  text: string;
}

export interface ConflictModalState {
  act: string;
  device: string;
  oldSet: string;
  newSet: string;
  oldName: string;
}

export interface DragState {
  device: string;
  control: string;
  value: number;
  row?: number;
}

export interface PeekState {
  device: string;
  control: string;
  value: number | null;
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
  /** Detected or targeted Scribble firmware version information. */
  scribbleFirmware: ScribbleFirmwareInfo;

  // --- v3 State Fields ---
  /** Collapses the top controller card to a compact two-line summary bar. */
  ctrlMin: boolean;
  /** Live transient slider draft value before pointerup/keyup/blur commits. */
  drag: DragState | null;
  /** Active preset-load conflict modal state when adding an Action that loads a different Set-up. */
  conflict: ConflictModalState | null;
  /** Hovered message row in the stack list to highlight on the pedal faceplate. */
  peek: PeekState | null;
  /** Workspace mode: 'assign' (editing a controller switch press) or 'build' (editing a reusable Action). */
  mode: 'assign' | 'build';
  /** ID of the Action currently being edited in 'build' mode. */
  actEdit: string | null;
  /** Index of the message row currently pinned open for inline value editing in the stack list. */
  edPick: number | null;
  /** Highlighted control key ("device:control") when adding/editing in Action build mode. */
  focus: string | null;
  /** Left Capabilities & Actions drawer open state. */
  libOpen: boolean;
  /** Active device filter in the Capabilities drawer (null = all pedals). */
  libDev: string | null;
  /** Which Capability accordions are expanded in the left drawer. */
  capOpen: Record<string, boolean>;
  /** Active Capability Lens filter highlighting matching switches and controls. */
  lens: CapabilityId | null;
  /** Reusable musical Actions library (seeded with SEED_ACTIONS). */
  actions: ActionDef[];
  /** Multi-pedal Chase Bliss Set-ups (MOOD, Gen Loss, Blooper). */
  pedalSets: PedalSetup[];
  /** Currently open Set-up ID in the Pedal Set-ups Modal (or null when closed). */
  setsOpen: string | null;
  /** Active pedal tab inside the Pedal Set-ups Modal. */
  setsDevice: SetupDeviceId;
  /** Active step index (0..3) in the 4-step hardware save walkthrough, or null when viewing dip switches. */
  walkIndex: number | null;
  /** Monotonically increasing instance counter for linked Action insertions. */
  instSeq: number;
  /** 3-step Rig Setup Wizard step (1, 2, 3, or null when finished/skipped). */
  setupStep: 1 | 2 | 3 | null;
  /** Currently open inline "?" contextual hint key. */
  hintOpen: string | null;
  /** Global "?" hint overlay toggle showing all contextual hints at once. */
  hintAll: boolean;
  /** Inline notice banner message in the stack panel. */
  notice: string | null;
  /** Switch key currently firing during "test this stomp". */
  firing: string | null;
  /** Pedal control currently lit during "test this stomp". */
  lit: { device: string; control: string } | null;
  /** Preset jump popover open state when Scribble 128-preset nav is active. */
  jumpOpen: boolean;

  // --- Rig Persistence & Pedal Background Animations ---
  /** Saved rigs persisted in localStorage. */
  rigs: SavedRigRecord[];
  /** Currently active saved rig ID. */
  rigId: string | null;
  /** Header rig switcher menu open state. */
  rigMenuOpen: boolean;
  /** Inline rename mode inside the rig switcher menu. */
  rigRenaming: boolean;
  /** Draft rig name while renaming. */
  rigDraft: string;
  /** 2-tap delete confirmation state in the rig switcher menu. */
  rigDeleteConfirm: boolean;
  /** Per-pedal background animation style IDs (or 'off'). */
  bgBy: Record<string, string>;
}

export interface SavedRigSnapshot {
  banks: Bank[];
  controllerId: string;
  brainId: string;
  channels: Record<string, number>;
  rig: string[];
  naming: Record<string, PresetNaming>;
  actions: ActionDef[];
  pedalSets: PedalSetup[];
  offsets: Record<string, number>;
}

export interface SavedRigRecord {
  id: string;
  name: string;
  data: SavedRigSnapshot;
  updated: number;
  sent: SavedRigSnapshot | null;
  sentAt: number | null;
}

export interface RigSyncInfo {
  n: number;
  label: string;
  tone: 'none' | 'dirty' | 'ok';
}
