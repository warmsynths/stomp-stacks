import type { ActionId } from '../data/controllers.js';

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

export interface StompState {
  controllerId: string;
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
  /** Phone-only bottom sheet expanded state. */
  sheetOpen: boolean;
}
