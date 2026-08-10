import type { ActionId } from '../data/controllers.js';
import type { DeviceControl } from '../data/devices.js';
import { HardwareRegistry, DEVICE_ORDER } from '../data/registry.js';
import { MacroStackModel, DEFAULT_MAX_STEPS } from './macro-stack-model.js';
import type { FaceMode, MacroStep, StompState } from './types.js';

export const MAX_STEPS = DEFAULT_MAX_STEPS;

function initialState(controllerId: string): StompState {
  const ctrl = HardwareRegistry.getController(controllerId);
  return {
    controllerId,
    brainId: 'scribble',
    banks: MacroStackModel.createBanks(controllerId),
    bank: 0,
    selectedKey: ctrl.keys[0],
    action: 'press',
    browseDevice: DEVICE_ORDER[0],
    face: 'photo',
    popoverControlId: null,
    compileOpen: false,
    settingsOpen: false,
    controllerPickerOpen: false,
    brainPickerOpen: false,
    addPedalOpen: false,
    confirmRemovePedal: null,
    channelPickerOpen: false,
    targetId: 'scribble',
    rig: ['blooper', 'mood', 'elcap'],
    channels: { blooper: 1, mood: 2, elcap: 3 },
    sheetOpen: false,
  };
}

/**
 * Central reactive UI store for the app.
 * Acts as a thin reactive binding layer over MacroStackModel & HardwareRegistry.
 */
export class StompStore extends EventTarget {
  state: StompState = initialState('chocolate');

  private set(patch: Partial<StompState>) {
    this.state = { ...this.state, ...patch };
    this.dispatchEvent(new Event('change'));
  }

  get activeStack(): MacroStep[] {
    const { banks, bank, selectedKey, action } = this.state;
    return MacroStackModel.getActiveStack(banks, bank, selectedKey, action);
  }

  get totalAssigned(): number {
    return MacroStackModel.countTotalAssignedSteps(this.state.banks);
  }

  nextFreeChannel(rig: string[] = this.state.rig, channels: Record<string, number> = this.state.channels): number {
    return HardwareRegistry.findNextFreeChannel(rig, channels);
  }

  addPedal(id: string) {
    if (this.state.rig.includes(id)) {
      this.set({ addPedalOpen: false, browseDevice: id });
      return;
    }
    const rig = [...this.state.rig, id];
    const channels = { ...this.state.channels };
    if (!channels[id]) {
      channels[id] = HardwareRegistry.findNextFreeChannel(rig.filter((x) => x !== id), channels);
    }
    this.set({ rig, channels, browseDevice: id, addPedalOpen: false, popoverControlId: null });
  }

  dropPedal(id: string) {
    if (this.state.rig.length <= 1) return;
    const rig = this.state.rig.filter((x) => x !== id);
    const browseDevice = this.state.browseDevice === id ? rig[0] : this.state.browseDevice;
    this.set({ rig, browseDevice, channelPickerOpen: false, popoverControlId: null, confirmRemovePedal: null });
  }

  setPedalChannel(id: string, channel: number) {
    const channels = { ...this.state.channels, [id]: channel };
    this.set({ channels, channelPickerOpen: false });
  }

  toggleChannelPicker() {
    this.set({ channelPickerOpen: !this.state.channelPickerOpen });
  }

  setBrain(id: string) {
    this.set({ brainId: id, brainPickerOpen: false });
  }

  openBrainPicker() {
    this.set({ brainPickerOpen: true, channelPickerOpen: false });
  }

  closeBrainPicker() {
    this.set({ brainPickerOpen: false });
  }

  openAddPedal() {
    this.set({ addPedalOpen: true, channelPickerOpen: false });
  }

  closeAddPedal() {
    this.set({ addPedalOpen: false });
  }

  setConfirmRemove(id: string | null) {
    this.set({ confirmRemovePedal: id, channelPickerOpen: false });
  }

  setTarget(id: string) {
    this.set({ targetId: id });
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
    const { banks, bank, selectedKey, action, browseDevice } = this.state;
    const updatedBanks = MacroStackModel.addOrToggleStep(
      banks,
      bank,
      selectedKey,
      action,
      browseDevice,
      controlId,
      value,
      MAX_STEPS,
    );
    this.set({ banks: updatedBanks, popoverControlId: null, sheetOpen: true });
  }

  removeStep(index: number) {
    const { banks, bank, selectedKey, action } = this.state;
    const updatedBanks = MacroStackModel.removeStep(banks, bank, selectedKey, action, index);
    this.set({ banks: updatedBanks });
  }

  moveStep(index: number, dir: -1 | 1) {
    const { banks, bank, selectedKey, action } = this.state;
    const updatedBanks = MacroStackModel.moveStep(banks, bank, selectedKey, action, index, dir);
    this.set({ banks: updatedBanks });
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
    this.set({ browseDevice: id, popoverControlId: null, channelPickerOpen: false });
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

  /** Switching controllers starts a fresh set of stacks. */
  switchController(id: string) {
    const ctrl = HardwareRegistry.getController(id);
    this.set({
      controllerId: id,
      banks: MacroStackModel.createBanks(id),
      bank: 0,
      selectedKey: ctrl.keys[0],
      controllerPickerOpen: false,
      popoverControlId: null,
    });
  }
}
