import { CONTROLLERS, type ActionId } from '../data/controllers.js';
import { DEVICE_ORDER, type DeviceControl } from '../data/devices.js';
import type { Bank, FaceMode, MacroStep, StompState } from './types.js';

export const MAX_STEPS = 8;

function newBanks(controllerId: string): Bank[] {
  const def = CONTROLLERS[controllerId];
  const out: Bank[] = [];
  for (let i = 0; i < def.banks; i++) {
    const bank: Bank = {};
    def.keys.forEach((k) => {
      bank[k] = { press: [], hold: [], double: [] };
    });
    out.push(bank);
  }
  return out;
}

function initialState(controllerId: string): StompState {
  return {
    controllerId,
    banks: newBanks(controllerId),
    bank: 0,
    selectedKey: CONTROLLERS[controllerId].keys[0],
    action: 'press',
    browseDevice: DEVICE_ORDER[0],
    face: 'photo',
    popoverControlId: null,
    compileOpen: false,
    settingsOpen: false,
    controllerPickerOpen: false,
    sheetOpen: false,
  };
}

/**
 * Central reactive store for the app. Plain EventTarget so it has zero
 * framework dependency; components observe it via StoreController.
 */
export class StompStore extends EventTarget {
  state: StompState = initialState('chocolate');

  private set(patch: Partial<StompState>) {
    this.state = { ...this.state, ...patch };
    this.dispatchEvent(new Event('change'));
  }

  private mutateStack(fn: (list: MacroStep[]) => void) {
    const banks = this.state.banks.map((bank) => {
      const next: Bank = {};
      for (const key of Object.keys(bank)) {
        next[key] = {
          press: bank[key].press.slice(),
          hold: bank[key].hold.slice(),
          double: bank[key].double.slice(),
        };
      }
      return next;
    });
    fn(banks[this.state.bank][this.state.selectedKey][this.state.action]);
    this.set({ banks });
  }

  get activeStack(): MacroStep[] {
    const { banks, bank, selectedKey, action } = this.state;
    return banks[bank][selectedKey][action];
  }

  get totalAssigned(): number {
    let total = 0;
    for (const bank of this.state.banks) {
      for (const key of Object.keys(bank)) {
        total += bank[key].press.length + bank[key].hold.length + bank[key].double.length;
      }
    }
    return total;
  }

  /** A knob/toggle opens its value popover; a footswitch assigns immediately (momentary). */
  clickControl(control: DeviceControl) {
    if (control.type !== 'foot') {
      this.set({
        popoverControlId: this.state.popoverControlId === control.id ? null : control.id,
        sheetOpen: true,
      });
      return;
    }
    this.addStep(control.id, null);
  }

  /** Toggles the step off if it's already assigned; otherwise appends (capped at MAX_STEPS). */
  addStep(controlId: string, value: number | null) {
    const device = this.state.browseDevice;
    this.mutateStack((list) => {
      const at = list.findIndex((s) => s.device === device && s.control === controlId && s.value === value);
      if (at >= 0) {
        list.splice(at, 1);
        return;
      }
      if (list.length >= MAX_STEPS) return;
      list.push({ device, control: controlId, value });
    });
    this.set({ popoverControlId: null, sheetOpen: true });
  }

  removeStep(index: number) {
    this.mutateStack((list) => list.splice(index, 1));
  }

  moveStep(index: number, dir: -1 | 1) {
    this.mutateStack((list) => {
      const j = index + dir;
      if (j < 0 || j >= list.length) return;
      const tmp = list[index];
      list[index] = list[j];
      list[j] = tmp;
    });
  }

  selectSwitch(key: string) {
    this.set({ selectedKey: key, popoverControlId: null });
  }

  selectBank(i: number) {
    this.set({ bank: i, popoverControlId: null });
  }

  selectAction(action: ActionId) {
    this.set({ action, popoverControlId: null });
  }

  setBrowseDevice(id: string) {
    this.set({ browseDevice: id, popoverControlId: null });
  }

  closePopover() {
    this.set({ popoverControlId: null });
  }

  setFace(face: FaceMode) {
    this.set({ face, popoverControlId: null });
  }

  openSettings() {
    this.set({ settingsOpen: true });
  }

  closeSettings() {
    this.set({ settingsOpen: false });
  }

  openControllerPicker() {
    this.set({ controllerPickerOpen: true });
  }

  closeControllerPicker() {
    this.set({ controllerPickerOpen: false });
  }

  openCompile() {
    this.set({ compileOpen: true });
  }

  closeCompile() {
    this.set({ compileOpen: false });
  }

  toggleSheet() {
    this.set({ sheetOpen: !this.state.sheetOpen });
  }

  setSheet(open: boolean) {
    this.set({ sheetOpen: open });
  }

  /** Switching controllers starts a fresh set of stacks — the picker warns about this up front. */
  switchController(id: string) {
    const def = CONTROLLERS[id];
    this.set({
      controllerId: id,
      banks: newBanks(id),
      bank: 0,
      selectedKey: def.keys[0],
      controllerPickerOpen: false,
      popoverControlId: null,
    });
  }
}
