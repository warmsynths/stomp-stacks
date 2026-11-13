import { ACTIONS, type ActionId, CONTROLLERS } from '../data/controllers.js';
import { BRAINS } from '../data/brains.js';
import type { DeviceControl } from '../data/devices.js';
import { DEVICES } from '../data/devices.js';
import { NAMING, PALETTE, HEX, FALLBACK, isDark, type ColorName, type NamingTargetDef } from '../data/naming.js';
import { HardwareRegistry, DEVICE_ORDER } from '../data/registry.js';
import { CAPS, capOf, type CapabilityDef, type CapabilityId } from '../data/capabilities.js';
import { SEED_SETS, type PedalSetup, type SetupDeviceId } from '../data/setups.js';
import { SEED_ACTIONS, type ActionDef } from '../data/actions.js';
import { MacroStackModel, DEFAULT_MAX_STEPS, knobWord, wiggleInfo, stepRole, clash } from './macro-stack-model.js';
import type {
  ActionBucket,
  Bank,
  ClashResult,
  DragState,
  FaceMode,
  IdentResult,
  MacroStep,
  Message,
  ParsedPresetItem,
  PeekState,
  PresetNaming,
  ReadPresetSlot,
  RigSyncInfo,
  SavedRigRecord,
  SavedRigSnapshot,
  StompState,
  WiggleInfo,
  WireLogEntry,
} from './types.js';
import { DEFAULT_BG_BY } from '../components/pedal-bg.js';
import { midiService, hex } from '../services/midi-service.js';
import { parseAllScribblePresets } from '../compiler/adapters/scribble.js';
import { describeStep } from '../compiler/adapters/mc3.js';
import { type ScribbleConfig, detectScribbleFirmwareVersion } from '../types/scribble.js';

export const MAX_STEPS = DEFAULT_MAX_STEPS;

function trunc(s: string, n: number): string {
  if (!s) return '';
  return s.length <= n ? s : s.slice(0, n);
}

function getInitialSetupStep(): 1 | null {
  try {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('stomp-stacks:setup-done')) {
      return null;
    }
  } catch {
    // ignore storage errors
  }
  return 1;
}

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
    colorPickerOpen: false,
    targetId: 'scribble',
    rig: ['blooper', 'mood', 'elcap'],
    channels: { blooper: 1, mood: 2, elcap: 3 },
    naming: {},
    sheetOpen: false,
    connectOpen: false,
    readOpen: false,
    readData: null,
    conn: {},
    listening: null,
    heard: null,
    offsets: {},
    monitorOn: false,
    log: [],
    seq: 0,
    // v3 fields
    ctrlMin: false,
    drag: null,
    conflict: null,
    peek: null,
    mode: 'assign',
    actEdit: null,
    edPick: null,
    focus: null,
    libOpen: typeof window !== 'undefined' ? window.innerWidth >= 1100 : true,
    libDev: null,
    capOpen: {},
    lens: null,
    actions: SEED_ACTIONS.map((a) => ({ ...a, caps: [...a.caps], steps: a.steps.map((s) => ({ ...s })) })),
    pedalSets: SEED_SETS.map((s) => ({
      ...s,
      move: { ...s.move },
      fall: { ...s.fall },
      ...(s.extras ? { extras: { ...s.extras } } : {}),
    })),
    setsOpen: null,
    setsDevice: 'mood',
    walkIndex: null,
    instSeq: 1,
    setupStep: getInitialSetupStep(),
    hintOpen: null,
    hintAll: false,
    notice: null,
    firing: null,
    lit: null,
    jumpOpen: false,
    scribbleFirmware: { version: '2.0.0', major: 'v2', detectedFrom: 'default' },
    rigs: [],
    rigId: null,
    rigMenuOpen: false,
    rigRenaming: false,
    rigDraft: '',
    rigDeleteConfirm: false,
    bgBy: { ...DEFAULT_BG_BY },
  };
}

const RIG_STORE = 'stompstacks.rigs.v1';
const BG_STORE = 'stompstacks.bgBy';
const RIG_KEYS: Array<keyof SavedRigSnapshot> = [
  'banks',
  'controllerId',
  'brainId',
  'channels',
  'rig',
  'naming',
  'actions',
  'pedalSets',
  'offsets',
];

function snapState(s: StompState): SavedRigSnapshot {
  const o = {
    banks: s.banks,
    controllerId: s.controllerId,
    brainId: s.brainId,
    channels: s.channels,
    rig: s.rig,
    naming: s.naming,
    actions: s.actions,
    pedalSets: s.pedalSets,
    offsets: s.offsets,
  };
  return JSON.parse(JSON.stringify(o)) as SavedRigSnapshot;
}

/**
 * Central reactive UI store for the app.
 * Acts as a thin reactive binding layer over MacroStackModel & HardwareRegistry.
 */
export class StompStore extends EventTarget {
  state: StompState = initialState('chocolate');
  private _loadingRig = false;

  constructor() {
    super();
    this.hydratePersistedState();
  }

  private hydratePersistedState() {
    if (typeof localStorage === 'undefined') return;
    try {
      const rawBg = localStorage.getItem(BG_STORE);
      if (rawBg) {
        const parsedBg = JSON.parse(rawBg) as Record<string, string>;
        if (parsedBg && typeof parsedBg === 'object') {
          this.state = {
            ...this.state,
            bgBy: { ...this.state.bgBy, ...parsedBg },
          };
        }
      }
    } catch {
      // ignore storage errors
    }

    try {
      const rawRigs = localStorage.getItem(RIG_STORE);
      const parsed = rawRigs
        ? (JSON.parse(rawRigs) as { rigs?: SavedRigRecord[]; current?: string })
        : null;
      if (parsed && Array.isArray(parsed.rigs) && parsed.rigs.length > 0) {
        const cur =
          parsed.rigs.find((r) => r.id === parsed.current) || parsed.rigs[0];
        this._loadingRig = true;
        this.applyLoadedRig(cur, parsed.rigs, { skipSetupClear: false });
        this._loadingRig = false;
        return;
      }
    } catch {
      // ignore storage errors
    }

    const first: SavedRigRecord = {
      id: `r${Date.now()}`,
      name: 'my first rig',
      data: snapState(this.state),
      updated: Date.now(),
      sent: null,
      sentAt: null,
    };
    this.state = { ...this.state, rigs: [first], rigId: first.id };
    this.writeRigStore(this.state.rigs, first.id);
  }

  private writeRigStore(rigs: SavedRigRecord[], id: string | null) {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(RIG_STORE, JSON.stringify({ rigs, current: id }));
    } catch {
      // ignore storage quota errors
    }
  }

  private set(patch: Partial<StompState>) {
    const prev = this.state;
    let next: StompState = { ...prev, ...patch };
    if (!this._loadingRig && next.rigId) {
      const changed = RIG_KEYS.some(
        (k) => k in patch && next[k] !== prev[k]
      );
      if (changed) {
        const snap = snapState(next);
        const now = Date.now();
        const rigs = next.rigs.map((r) =>
          r.id === next.rigId ? { ...r, data: snap, updated: now } : r
        );
        next = { ...next, rigs };
        this.writeRigStore(rigs, next.rigId);
      }
    }
    this.state = next;
    this.dispatchEvent(new Event('change'));
  }

  get activeStack(): MacroStep[] {
    const { banks, bank, selectedKey, action } = this.state;
    return MacroStackModel.getActiveStack(banks, bank, selectedKey, action);
  }

  get totalAssigned(): number {
    return MacroStackModel.countTotalAssignedSteps(this.state.banks);
  }

  limit(): number {
    const st = this.state;
    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS.chocolate;
    if (ctrl.isBrain) return BRAINS.scribble.maxSteps;
    if (st.brainId === 'onboard' && !ctrl.onboard) return 1;
    return BRAINS[st.brainId]?.maxSteps || DEFAULT_MAX_STEPS;
  }

  limitWho(): string {
    const st = this.state;
    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS.chocolate;
    if (ctrl.isBrain || st.brainId === 'scribble') return 'scribble';
    if (st.brainId === 'onboard' && ctrl.onboard) return ctrl.short;
    return `${ctrl.short} on its own`;
  }

  slotName(): string {
    const st = this.state;
    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS.chocolate;
    const act = ACTIONS.find((x) => x.id === st.action)?.label || st.action;
    const keyLabel = ctrl.nav
      ? `p${String(st.bank + 1).padStart(3, '0')} ${({ L: 'left', R: 'right' } as Record<string, string>)[st.selectedKey] || st.selectedKey}`
      : `switch ${st.selectedKey}`;
    return `${keyLabel} ${act}`;
  }

  availableActions(): Array<{ id: ActionId; label: string }> {
    const ctrl = CONTROLLERS[this.state.controllerId] || CONTROLLERS.chocolate;
    return ACTIONS.filter((a) => !ctrl.actions || ctrl.actions.includes(a.id));
  }

  setsForDevice(deviceId: string): PedalSetup[] {
    return this.state.pedalSets.filter((s) => s.device === deviceId);
  }

  setPedalSetupStep(setId: string, deviceId: string = this.state.browseDevice) {
    const { banks, bank, selectedKey, action, mode, actEdit, actions } = this.state;
    if (mode === 'build' && actEdit) {
      this.updateAction(actEdit, (a) => {
        const at = a.steps.findIndex((x) => x.device === deviceId && x.control === 'pc');
        if (at >= 0) {
          a.steps[at] = { ...a.steps[at], set: setId, value: null };
        } else if (a.steps.length < this.limit()) {
          a.steps.unshift({ device: deviceId, control: 'pc', set: setId, value: null });
        }
        return a;
      });
      this.set({ popoverControlId: null });
      return;
    }

    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bank]?.[selectedKey]?.[action];
    if (!list) return;
    const at = list.findIndex((x) => x.device === deviceId && x.control === 'pc');
    if (at >= 0) {
      if (list[at].inst !== undefined) {
        MacroStackModel.detachIn(list, list[at].inst!, actions);
      }
      if (list[at].set === setId) {
        list.splice(at, 1);
      } else {
        list[at] = { ...list[at], set: setId, value: null };
      }
    } else if (list.length < this.limit()) {
      list.unshift({ device: deviceId, control: 'pc', set: setId, value: null });
    }
    this.set({ banks: next, popoverControlId: null });
  }

  setPedalSetupAt(stepIndex: number, setId: string) {
    const next = MacroStackModel.cloneBanks(this.state.banks);
    const list = next[this.state.bank]?.[this.state.selectedKey]?.[this.state.action];
    if (!list || !list[stepIndex]) return;
    if (list[stepIndex].inst !== undefined) {
      MacroStackModel.detachIn(list, list[stepIndex].inst!, this.state.actions);
    }
    list[stepIndex] = { ...list[stepIndex], set: setId, value: null };
    this.set({ banks: next });
  }

  setKnobValue(controlId: string, v: number) {
    this.setKnob(controlId, v);
  }

  setKnobNumericValue(controlId: string, v: number) {
    this.setKnob(controlId, v);
  }

  clearNotice() {
    this.setNotice(null);
  }

  setBank(i: number) {
    this.selectBank(i);
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
    const libDev = this.state.libDev === id ? null : this.state.libDev;
    this.set({
      rig,
      browseDevice,
      libDev,
      channelPickerOpen: false,
      popoverControlId: null,
      confirmRemovePedal: null,
    });
  }

  toggleRigPedal(id: string) {
    if (this.state.rig.includes(id)) {
      if (this.state.rig.length > 1) this.dropPedal(id);
    } else {
      this.addPedal(id);
    }
  }

  setPedalChannel(id: string, channel: number) {
    const channels = { ...this.state.channels, [id]: channel };
    this.set({ channels, channelPickerOpen: false });
  }

  sendTestCC(channel: number) {
    midiService.sendControlChange(channel, 93, 127);
    this.pushLog({
      text: `sent test cc 93 on ch ${channel}`,
      sub: `sweeper diagnostic`,
      tone: 'out',
    });
  }

  assignGuidedPC(id: string, channel: number, targetKey?: string) {
    const { banks, bank, action } = this.state;
    const switchKey = targetKey || this.state.selectedKey;
    const updatedBanks = MacroStackModel.assignGuidedPCStep(banks, bank, switchKey, action, id, channel, this.limit());
    const channels = { ...this.state.channels, [id]: channel };

    this.set({
      banks: updatedBanks,
      channels,
      selectedKey: switchKey,
    });

    const dev = HardwareRegistry.getDevice(id);
    this.pushLog({
      text: `assigned PC 0 on ch ${channel} for ${dev?.name || id}`,
      sub: `Switch ${switchKey} (${action}) · temporary channel learn`,
      tone: 'ok',
    });
  }

  sendDirectPC(channel: number, program: number = 0) {
    midiService.sendProgramChange(channel, program);
    this.pushLog({
      text: `sent direct program change ${program} on ch ${channel}`,
      sub: `Web MIDI broadcast`,
      tone: 'out',
    });
  }

  sendGuidedPC(id: string, channel: number) {
    this.assignGuidedPC(id, channel);
  }

  addPCStep(deviceId: string, program: number, label?: string) {
    const { banks, bank, selectedKey, action } = this.state;
    const updatedBanks = MacroStackModel.addOrUpdatePCStep(
      banks,
      bank,
      selectedKey,
      action,
      deviceId,
      program,
      label,
      this.limit(),
    );
    this.set({ banks: updatedBanks });
  }

  openPresetPopover(deviceId: string = this.state.browseDevice) {
    this.set({ browseDevice: deviceId, popoverControlId: 'pc' });
  }

  selectKey(key: string) {
    this.selectSwitch(key);
  }

  toggleChannelPicker() {
    this.set({ channelPickerOpen: !this.state.channelPickerOpen });
  }

  openChannelPicker() {
    this.set({ channelPickerOpen: true });
  }

  closeChannelPicker() {
    this.set({ channelPickerOpen: false });
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

  /** A control opens its popover if it has value options or is a knob/toggle; in build mode it appends/focuses immediately. */
  clickControl(control: DeviceControl) {
    if (this.state.mode === 'build' && this.state.actEdit) {
      const defaultVal =
        control.values && control.values.length > 0 ? control.values[0].value : control.type === 'knob' ? 64 : null;
      this.addStep(control.id, defaultVal);
      return;
    }

    if (control.type === 'foot') {
      this.addStep(control.id, null);
      return;
    }

    const device = HardwareRegistry.getDevice(this.state.browseDevice);
    const hasTemplates = device?.macroTemplates?.some((t) => t.controlId === control.id);
    const hasValues = (control.values && control.values.length > 0) || control.type === 'knob' || control.type === 'toggle';

    if (hasValues || hasTemplates) {
      this.set({
        popoverControlId: this.state.popoverControlId === control.id ? null : control.id,
        sheetOpen: true,
      });
      return;
    }
    this.addStep(control.id, null);
  }

  /** Toggles the step off if it's already assigned; otherwise appends (capped at limit()). Supports build mode for Actions. */
  addStep(controlId: string, value: number | null, label?: string) {
    const { banks, bank, selectedKey, action, browseDevice, mode, actEdit, actions } = this.state;

    if (mode === 'build') {
      if (!actEdit) {
        this.set({
          notice: 'pick an action on the left first — or start a new one.',
          popoverControlId: null,
        });
        return;
      }
      this.updateAction(actEdit, (a) => {
        const at = a.steps.findIndex((x) => x.device === browseDevice && x.control === controlId);
        if (at < 0 && a.steps.length < this.limit()) {
          a.steps.push({ device: browseDevice, control: controlId, value, ...(label ? { label } : {}) });
        } else if (at >= 0) {
          a.steps[at] = { ...a.steps[at], value, ...(label ? { label } : {}) };
        }
        return a;
      });
      this.set({ popoverControlId: null, notice: null, focus: `${browseDevice}:${controlId}` });
      return;
    }

    const updatedBanks = MacroStackModel.addOrToggleStep(
      banks,
      bank,
      selectedKey,
      action,
      browseDevice,
      controlId,
      value,
      this.limit(),
      label,
      actions,
    );
    this.set({ banks: updatedBanks, popoverControlId: null, sheetOpen: true });
  }

  setKnob(controlId: string, v: number | string) {
    const numVal = Number(v);
    const dev = this.state.browseDevice;
    if (this.state.mode === 'build' && this.state.actEdit) {
      const ea = this.actionById(this.state.actEdit);
      if (!ea || !ea.steps.some((x) => x.device === dev && x.control === controlId)) {
        this.addStep(controlId, numVal);
        return;
      }
      this.updateAction(ea.id, (a) => {
        const at = a.steps.findIndex((x) => x.device === dev && x.control === controlId);
        if (at >= 0) a.steps[at] = { ...a.steps[at], value: numVal };
        return a;
      });
      return;
    }

    const updatedBanks = MacroStackModel.setKnobInBanks(
      this.state.banks,
      this.state.bank,
      this.state.selectedKey,
      this.state.action,
      dev,
      controlId,
      numVal,
      this.limit(),
      this.state.actions,
    );
    this.set({ banks: updatedBanks, sheetOpen: true });
  }

  setValueAt(stepIndex: number, v: number | string | null, label?: string) {
    const numVal = v === null ? null : Number(v);
    const next = MacroStackModel.cloneBanks(this.state.banks);
    const list = next[this.state.bank]?.[this.state.selectedKey]?.[this.state.action];
    if (!list || !list[stepIndex]) return;
    if (list[stepIndex].inst !== undefined) {
      MacroStackModel.detachIn(list, list[stepIndex].inst!, this.state.actions);
    }
    list[stepIndex] = {
      ...list[stepIndex],
      value: numVal,
      ...(label !== undefined ? { label } : {}),
    };
    this.set({ banks: next });
  }

  /** Inserts all steps from an onboard switch lifecycle macro template into the active action bucket. */
  applyMacroTemplate(templateId: string) {
    const { banks, bank, selectedKey, action, browseDevice } = this.state;
    const device = HardwareRegistry.getDevice(browseDevice);
    const tmpl = device?.macroTemplates?.find((t) => t.id === templateId);
    if (!tmpl) return;
    const updatedBanks = MacroStackModel.addMacroTemplateSteps(
      banks,
      bank,
      selectedKey,
      action,
      browseDevice,
      tmpl.steps,
      this.limit(),
    );
    this.set({ banks: updatedBanks, popoverControlId: null, sheetOpen: true });
  }

  removeStep(index: number) {
    const { banks, bank, selectedKey, action, actions } = this.state;
    const updatedBanks = MacroStackModel.removeStep(banks, bank, selectedKey, action, index, actions);
    this.set({ banks: updatedBanks, edPick: null });
  }

  moveStep(index: number, dir: -1 | 1) {
    const { banks, bank, selectedKey, action } = this.state;
    const updatedBanks = MacroStackModel.moveStep(banks, bank, selectedKey, action, index, dir);
    this.set({ banks: updatedBanks });
  }

  moveTo(fromIndex: number, toIndex: number) {
    const { banks, bank, selectedKey, action } = this.state;
    const updatedBanks = MacroStackModel.moveTo(banks, bank, selectedKey, action, fromIndex, toIndex);
    this.set({ banks: updatedBanks });
  }

  // --- Linked Actions & Capabilities Methods ---

  findSet(id?: string | null): PedalSetup | undefined {
    if (!id) return undefined;
    return this.state.pedalSets.find((x) => x.id === id);
  }

  actionById(id?: string | null): ActionDef | undefined {
    if (!id) return undefined;
    return this.state.actions.find((a) => a.id === id);
  }

  capOf(id: string): CapabilityDef {
    return capOf(id);
  }

  listCaps(list: Message[]): CapabilityId[] {
    const m: Record<string, boolean> = {};
    list.forEach((x) => {
      if (!x.act) return;
      const a = this.actionById(x.act);
      if (a) a.caps.forEach((c) => (m[c] = true));
    });
    return Object.keys(m) as CapabilityId[];
  }

  slotCaps(slot?: ActionBucket): CapabilityId[] {
    if (!slot) return [];
    return this.listCaps([...slot.press, ...slot.hold, ...slot.double]);
  }

  actionUsage(): Record<string, number> {
    const m: Record<string, number> = {};
    this.state.banks.forEach((b) =>
      Object.keys(b).forEach((k) =>
        ACTIONS.forEach((a) => {
          const seen: Record<number, boolean> = {};
          b[k][a.id].forEach((x) => {
            if (x.act && x.inst !== undefined && !seen[x.inst]) {
              seen[x.inst] = true;
              m[x.act] = (m[x.act] || 0) + 1;
            }
          });
        }),
      ),
    );
    return m;
  }

  missingFor(a: ActionDef): string[] {
    const m: Record<string, boolean> = {};
    a.steps.forEach((x) => {
      if (!this.state.rig.includes(x.device)) {
        m[DEVICES[x.device]?.name || x.device] = true;
      }
    });
    return Object.keys(m);
  }

  updateAction(id: string, fn: (a: ActionDef) => ActionDef) {
    const actions = this.state.actions.map((a) =>
      a.id === id
        ? fn({
          ...a,
          steps: a.steps.map((x) => ({ ...x })),
          caps: [...a.caps],
        })
        : a,
    );
    const act = actions.find((a) => a.id === id);
    const banks = act
      ? MacroStackModel.syncBanks(
        this.state.banks,
        id,
        act.steps.filter((x) => this.state.rig.includes(x.device)),
      )
      : this.state.banks;
    this.set({ actions, banks });
  }

  insertAction(id: string, how?: 'merge' | 'useNew' | 'keepOld') {
    const st = this.state;
    const a = this.actionById(id);
    if (!a) return;

    if (!how) {
      const cur = st.banks[st.bank]?.[st.selectedKey]?.[st.action] || [];
      const np = a.steps.find(
        (x) =>
          x.control === 'pc' &&
          x.set &&
          st.rig.includes(x.device) &&
          cur.some((y) => y.device === x.device && y.control === 'pc' && y.set && y.set !== x.set),
      );
      if (np && np.set) {
        const oi = cur.findIndex((y) => y.device === np.device && y.control === 'pc' && y.set && y.set !== np.set);
        if (oi >= 0) {
          const oldStep = cur[oi];
          const oldName = oldStep.act
            ? this.actionById(oldStep.act)?.name || 'this press'
            : oldStep.from || 'this press';
          this.set({
            conflict: {
              act: id,
              device: np.device,
              oldSet: oldStep.set!,
              newSet: np.set,
              oldName,
            },
            popoverControlId: null,
          });
          return;
        }
      }
    }

    const list = st.banks[st.bank]?.[st.selectedKey]?.[st.action] || [];
    const where = this.slotName();
    const miss = this.missingFor(a);
    let send = a.steps.filter((x) => st.rig.includes(x.device));
    const cf = st.conflict;

    if (how === 'keepOld' && cf) {
      send = send.filter((x) => !(x.device === cf.device && x.control === 'pc'));
    }
    if (how === 'useNew' && cf) {
      const extra = list.filter((y) => y.device === cf.device && y.control === 'pc').length;
      if (list.length - extra + send.length > this.limit()) {
        this.set({
          notice: `“${a.name}” doesn't fit, even after dropping the other preset load.`,
          conflict: null,
        });
        return;
      }
    }
    if (how === 'merge' && cf) {
      send = send.filter((x) => !(x.device === cf.device && x.control === 'pc'));
    }

    if (!a.steps.length) {
      this.set({ notice: `“${a.name}” has no messages yet — open it and add some.` });
      return;
    }
    if (!send.length) {
      this.set({
        notice: `none of “${a.name}”'s pedals are in the rig (${miss.join(' + ')}). edit it to point at yours.`,
      });
      return;
    }
    if (how !== 'useNew' && list.length + send.length > this.limit()) {
      this.set({
        notice: `“${a.name}” needs ${send.length} messages; ${where} only has room for ${this.limit() - list.length} more.`,
      });
      return;
    }

    const inst = st.instSeq;
    let mergedId: string | null = null;
    let nextSets = st.pedalSets;

    if (how === 'merge' && cf) {
      const A = this.findSet(cf.oldSet);
      const B = this.findSet(cf.newSet);
      if (A && B) {
        const dev = A.device || (cf.device as SetupDeviceId) || 'mood';
        const used: Record<number, boolean> = {};
        st.pedalSets.filter((s) => s.device === dev).forEach((x) => (used[x.slot] = true));
        let slot = 1;
        while (used[slot] && slot < 122) slot++;
        mergedId = 's' + Date.now();
        const m: PedalSetup = {
          id: mergedId,
          device: dev,
          name: `${A.name} + ${B.name}`,
          slot,
          saved: false,
          move: { ...A.move, ...B.move },
          fall: { ...A.fall, ...B.fall },
          bounce: A.bounce,
          sweep: A.sweep,
          shape: A.shape,
          extras: { ...(A.extras || {}), ...(B.extras || {}) },
        };
        nextSets = [...st.pedalSets, m];
      }
    }

    const nextBanks = MacroStackModel.cloneBanks(st.banks);
    const l = nextBanks[st.bank][st.selectedKey][st.action];

    if (how === 'useNew' && cf) {
      for (let k = l.length - 1; k >= 0; k--) {
        if (l[k].device === cf.device && l[k].control === 'pc') {
          if (l[k].inst !== undefined) MacroStackModel.detachIn(l, l[k].inst!, st.actions);
          l.splice(k, 1);
        }
      }
    }
    if (how === 'merge' && cf && mergedId) {
      l.forEach((y, k) => {
        if (y.device === cf.device && y.control === 'pc') {
          if (y.inst !== undefined) MacroStackModel.detachIn(l, y.inst!, st.actions);
          l[k] = { ...l[k], set: mergedId! };
        }
      });
    }

    const detached = how === 'keepOld' || how === 'merge';
    send.forEach((x) => {
      l.push(detached ? { ...x, from: a.name } : { ...x, act: id, inst });
    });

    const devName = cf ? DEVICES[cf.device]?.faceName || DEVICES[cf.device]?.name || cf.device.toUpperCase() : 'MOOD';
    const mergeNotice =
      how === 'merge'
        ? `merged into a new set-up — save it to ${devName} once (walkthrough in set-ups) before it'll move anything.`
        : miss.length
          ? `added “${a.name}” without its ${miss.join(' + ')} messages — not in the rig.`
          : null;

    this.set({
      banks: nextBanks,
      pedalSets: nextSets,
      conflict: how ? null : st.conflict,
      instSeq: inst + 1,
      notice: mergeNotice,
      sheetOpen: true,
      popoverControlId: null,
    });

    this.pushLog({
      text: `+ ${a.name}`,
      sub: `${where} · ${send.length} ${send.length === 1 ? 'message' : 'messages'}, ${detached ? 'unlinked' : 'linked'}`,
      tone: 'ok',
    });
  }

  removeGroup(inst: number) {
    const next = MacroStackModel.cloneBanks(this.state.banks);
    const l = next[this.state.bank]?.[this.state.selectedKey]?.[this.state.action];
    if (!l) return;
    for (let i = l.length - 1; i >= 0; i--) {
      if (l[i].inst === inst) l.splice(i, 1);
    }
    this.set({ banks: next, edPick: null });
  }

  detachGroup(inst: number) {
    const next = MacroStackModel.cloneBanks(this.state.banks);
    const l = next[this.state.bank]?.[this.state.selectedKey]?.[this.state.action];
    if (!l) return;
    MacroStackModel.detachIn(l, inst, this.state.actions);
    this.set({ banks: next });
  }

  newAction(cap: CapabilityId) {
    const id = 'u' + Date.now();
    const nextAct: ActionDef = { id, name: 'new action', caps: [cap], what: '', steps: [] };
    this.set({
      actions: [...this.state.actions, nextAct],
      actEdit: id,
      mode: 'build',
      capOpen: { ...this.state.capOpen, [cap]: true },
    });
  }

  saveStackAsAction(cap: CapabilityId) {
    const st = this.state;
    const list = st.banks[st.bank]?.[st.selectedKey]?.[st.action] || [];
    const plain = list.filter((x) => !x.act);
    if (!plain.length) return;
    const steps: Message[] = plain.map((x) => {
      const n = { ...x };
      delete n.from;
      return n;
    });
    const id = 'u' + Date.now();
    const inst = st.instSeq;
    const nm = this.ident(st.bank, st.selectedKey).name || 'new action';
    const nextBanks = MacroStackModel.cloneBanks(st.banks);
    const l = nextBanks[st.bank][st.selectedKey][st.action];
    l.forEach((x, i) => {
      if (!x.act) {
        const n: Message = { ...x, act: id, inst };
        delete n.from;
        l[i] = n;
      }
    });
    this.set({
      actions: [...st.actions, { id, name: nm, caps: [cap], what: '', steps }],
      banks: nextBanks,
      actEdit: id,
      mode: 'build',
      instSeq: inst + 1,
    });
  }

  deleteAction(id: string) {
    const st = this.state;
    const a = st.actions.find((x) => x.id === id);
    const fix = (l: Message[]): Message[] =>
      l.map((x) => {
        if (x.act !== id) return x;
        const n: Message = { ...x, from: a ? a.name : 'an action' };
        delete n.act;
        delete n.inst;
        return n;
      });
    const banks = st.banks.map((b) => {
      const nb: Bank = {};
      Object.keys(b).forEach((k) => {
        nb[k] = {
          press: fix(b[k].press),
          hold: fix(b[k].hold),
          double: fix(b[k].double),
        };
      });
      return nb;
    });
    this.set({
      actions: st.actions.filter((x) => x.id !== id),
      banks,
      actEdit: null,
      mode: 'assign',
    });
  }

  // --- Pedal Set-ups Methods ---

  updateSet(id: string, fn: (s: PedalSetup) => PedalSetup) {
    const pedalSets = this.state.pedalSets.map((x) =>
      x.id === id
        ? fn({
          ...x,
          move: { ...x.move },
          fall: { ...x.fall },
          ...(x.extras ? { extras: { ...x.extras } } : {}),
        })
        : x,
    );
    this.set({ pedalSets });
  }

  newSet(device: SetupDeviceId = this.state.setsDevice) {
    const used: Record<number, boolean> = {};
    this.state.pedalSets.filter((x) => x.device === device).forEach((x) => (used[x.slot] = true));
    let slot = 1;
    while (used[slot] && slot < 122) slot++;
    const id = 's' + Date.now();
    const newSetup: PedalSetup = {
      id,
      device,
      name: 'new set-up',
      slot,
      saved: false,
      move: {},
      fall: {},
      bounce: true,
      sweep: 'top',
      shape: 'tri',
      extras: {},
    };
    this.set({
      pedalSets: [...this.state.pedalSets, newSetup],
      setsOpen: id,
      setsDevice: device,
      walkIndex: null,
    });
  }

  saveSetToPedal(id: string) {
    const set = this.findSet(id);
    if (!set) return;
    const dev = set.device || 'mood';
    const devName = DEVICES[dev]?.faceName || DEVICES[dev]?.name || dev.toUpperCase();
    const ch = this.state.channels[dev] || 2;
    if (this.state.conn[dev]) {
      midiService.sendProgramChange(ch, set.slot);
    }
    this.pushLog({
      text: `${hex(192 + ch - 1)} ${hex(set.slot)}`,
      sub: `${devName} stores its switches and knobs in slot ${set.slot} — keep both footswitches held`,
      tone: this.state.conn[dev] ? 'out' : 'warn',
    });
    this.updateSet(id, (x) => ({ ...x, saved: true }));
  }

  mergeSetups(i: number, j: number) {
    const st = this.state;
    const nextBanks = MacroStackModel.cloneBanks(st.banks);
    const list = nextBanks[st.bank]?.[st.selectedKey]?.[st.action];
    if (!list) return;
    const a = list[i];
    const b = list[j];
    if (!a || !b || !a.set || !b.set) return;
    const A = this.findSet(a.set);
    const B = this.findSet(b.set);
    if (!A || !B) return;

    const dev = A.device || (a.device as SetupDeviceId) || 'mood';
    const used: Record<number, boolean> = {};
    st.pedalSets.filter((x) => x.device === dev).forEach((x) => (used[x.slot] = true));
    let slot = 1;
    while (used[slot] && slot < 122) slot++;
    const id = 's' + Date.now();
    const m: PedalSetup = {
      id,
      device: dev,
      name: `${A.name} + ${B.name}`,
      slot,
      saved: false,
      move: { ...A.move, ...B.move },
      fall: { ...A.fall, ...B.fall },
      bounce: A.bounce,
      sweep: A.sweep,
      shape: A.shape,
      extras: { ...(A.extras || {}), ...(B.extras || {}) },
    };

    if (a.inst !== undefined) MacroStackModel.detachIn(list, a.inst, st.actions);
    if (b.inst !== undefined) MacroStackModel.detachIn(list, b.inst, st.actions);
    list[i] = { ...list[i], set: id };
    list.splice(j, 1);

    this.set({
      banks: nextBanks,
      pedalSets: [...st.pedalSets, m],
    });
  }

  openSetups(setId?: string | null, device?: SetupDeviceId) {
    const set = setId ? this.findSet(setId) : undefined;
    const targetDev = set?.device || device || this.state.setsDevice || 'mood';
    const firstForDev = this.state.pedalSets.find((s) => s.device === targetDev);
    this.set({
      setsDevice: targetDev,
      setsOpen: set ? set.id : firstForDev ? firstForDev.id : '__empty__',
      walkIndex: null,
    });
  }

  closeSetups() {
    this.set({ setsOpen: null, walkIndex: null });
  }

  setWalkIndex(walkIndex: number | null) {
    this.set({ walkIndex });
  }

  createSaveButtonOnP128(so: PedalSetup) {
    const st = this.state;
    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS.chocolate;
    const nextBanks = MacroStackModel.cloneBanks(st.banks);
    const last = nextBanks.length - 1;
    const key = ctrl.keys[0];
    nextBanks[last][key].press = [{ device: so.device, control: 'pc', set: so.id, value: null }];
    const naming = {
      ...st.naming,
      [`${last}:${key}`]: {
        name: `SAVE ${so.device.toUpperCase().slice(0, 6)}`,
        secondary: `slot ${so.slot}`,
        color: 'orange' as ColorName,
      },
    };
    this.set({ banks: nextBanks, naming });
    this.pushLog({
      text: `p128 → save ${so.device.toUpperCase()} slot ${so.slot}`,
      sub: 'in your next scribble export',
      tone: 'ok',
    });
  }

  // --- Wiggle, Clash & UI State Helpers ---

  knobWord(v: number | string | null | undefined): string {
    return knobWord(v);
  }

  wiggleInfo(steps: Message[]): WiggleInfo | null {
    return wiggleInfo(steps, this.state.pedalSets);
  }

  stepRole(steps: Message[], s: Message): string {
    return stepRole(steps, s, this.state.pedalSets);
  }

  clash(list: Message[], i: number): ClashResult | null {
    return clash(list, i, this.state.pedalSets);
  }

  setCtrlMin(ctrlMin: boolean) {
    this.set({ ctrlMin, colorPickerOpen: false });
  }

  toggleCtrlMin() {
    this.set({ ctrlMin: !this.state.ctrlMin, colorPickerOpen: false });
  }

  setDrag(drag: DragState | null) {
    this.set({ drag });
  }

  setPeek(peek: PeekState | null) {
    this.set({ peek });
  }

  setMode(mode: 'assign' | 'build', actEdit: string | null = mode === 'assign' ? null : this.state.actEdit) {
    this.set({ mode, actEdit, popoverControlId: null, notice: null, focus: null });
  }

  setEdPick(edPick: number | null) {
    this.set({ edPick });
  }

  setFocus(focus: string | null) {
    this.set({ focus });
  }

  setLibOpen(libOpen: boolean) {
    this.set({ libOpen });
  }

  setLibDev(libDev: string | null) {
    this.set({ libDev });
  }

  toggleLibOpen() {
    this.set({ libOpen: !this.state.libOpen });
  }

  toggleCapOpen(cap: string) {
    const isOpen = this.state.libDev
      ? this.state.capOpen[cap] !== false
      : !!this.state.capOpen[cap];
    this.set({ capOpen: { ...this.state.capOpen, [cap]: !isOpen } });
  }

  setLens(lens: CapabilityId | null) {
    this.set({ lens: this.state.lens === lens ? null : lens });
  }

  setHintOpen(hintOpen: string | null) {
    this.set({ hintOpen: this.state.hintOpen === hintOpen ? null : hintOpen });
  }

  toggleHintAll() {
    this.set({ hintAll: !this.state.hintAll, hintOpen: null });
  }

  setNotice(notice: string | null) {
    this.set({ notice });
  }

  setJumpOpen(jumpOpen: boolean) {
    this.set({ jumpOpen });
  }

  closeConflict() {
    this.set({ conflict: null });
  }

  setSetupStep(setupStep: 1 | 2 | 3 | null) {
    this.set({ setupStep });
  }

  finishSetup(skipped: boolean) {
    const st = this.state;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('stomp-stacks:setup-done', '1');
      }
    } catch {
      // ignore
    }
    this.set({ setupStep: null });
    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS.chocolate;
    const brain = BRAINS[st.brainId] || BRAINS.scribble;
    this.pushLog({
      text: skipped ? 'setup skipped' : 'rig set',
      sub: `${ctrl.short} · ${brain.short} · ${st.rig.length} ${st.rig.length === 1 ? 'pedal' : 'pedals'}`,
      tone: 'ok',
    });
  }

  rerunSetup() {
    this.set({ setupStep: 1, settingsOpen: false });
  }

  selectSwitch(key: string) {
    this.set({ selectedKey: key, popoverControlId: null, edPick: null });
  }

  selectBank(i: number) {
    const maxBank = Math.max(0, this.state.banks.length - 1);
    const clamped = Math.max(0, Math.min(maxBank, i));
    this.set({ bank: clamped, popoverControlId: null, jumpOpen: false, edPick: null });
  }

  selectAction(action: ActionId) {
    this.set({ action, popoverControlId: null, edPick: null });
  }

  setBrowseDevice(id: string) {
    this.set({ browseDevice: id, popoverControlId: null, channelPickerOpen: false });
  }

  closePopover() {
    this.set({ popoverControlId: null, drag: null });
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

  toggleColorPicker() {
    this.set({ colorPickerOpen: !this.state.colorPickerOpen });
  }

  closeColorPicker() {
    this.set({ colorPickerOpen: false });
  }

  namingTargets(): Array<NamingTargetDef & { id: string }> {
    const ids = [this.state.controllerId];
    if (this.state.brainId === 'scribble' && !ids.includes('scribble')) ids.push('scribble');
    return ids
      .filter((id) => NAMING[id])
      .map((id) => ({
        ...NAMING[id],
        id,
        ...(id === 'scribble' && this.state.controllerId === 'scribble' ? { role: 'controller · brain' as any } : {}),
      }));
  }

  displayTargets(): Array<NamingTargetDef & { id: string }> {
    return this.namingTargets().filter((t) => t.name > 0);
  }

  sharedColors(): ColorName[] {
    const lit = this.namingTargets().filter((t) => t.colors === null || t.colors.length > 0);
    if (!lit.length) return [];
    return PALETTE.map((p) => p[0]).filter((n) => lit.every((t) => t.colors === null || (t.colors && t.colors.includes(n))));
  }

  autoName(bankIndex: number = this.state.bank, switchKey: string = this.state.selectedKey): string {
    const bank = this.state.banks[bankIndex]?.[switchKey];
    if (!bank) return '';
    let firstStep: MacroStep | null = null;
    let n = 0;
    ACTIONS.forEach((a) =>
      bank[a.id].forEach((s: MacroStep) => {
        n++;
        if (!firstStep) firstStep = s;
      }),
    );
    if (!firstStep) return '';
    const step: MacroStep = firstStep;
    const d = HardwareRegistry.getDevice(step.device);
    if (!d) return '';
    const c = step.control === 'pc' ? null : HardwareRegistry.getControl(step.device, step.control);
    const ceiling = this.displayTargets().reduce((m, t) => Math.min(m, t.name), 24);
    const shortName = step.control === 'pc' ? 'set-up' : c ? c.short : '';
    return trunc(n > 1 ? `${d.name} +${n - 1}` : `${d.name} ${shortName}`, ceiling);
  }

  autoSecondary(bankIndex: number = this.state.bank, switchKey: string = this.state.selectedKey): string {
    const bank = this.state.banks[bankIndex]?.[switchKey];
    if (!bank) return '';
    const parts: string[] = [];
    ACTIONS.forEach((a) => {
      if (bank[a.id].length) parts.push(`${bank[a.id].length} on ${a.label}`);
    });
    return parts.join(' · ');
  }

  ident(bankIndex: number = this.state.bank, switchKey?: string): IdentResult {
    const ctrl = CONTROLLERS[this.state.controllerId] || CONTROLLERS.chocolate;
    const resolvedKey = switchKey ?? (ctrl.nav ? ctrl.keys[0] : this.state.selectedKey);
    const key = `${bankIndex}:${resolvedKey}`;
    const n = this.state.naming[key] || {};
    const auto = this.autoName(bankIndex, resolvedKey);
    const autoSec = this.autoSecondary(bankIndex, resolvedKey);
    const color = n.color || null;
    const bg = color ? HEX[color] : '#16323d';
    return {
      name: n.name != null && n.name !== '' ? n.name : auto,
      secondary: n.secondary || '',
      color,
      textColor: n.textColor || (isDark(bg) ? 'cream' : 'ink'),
      autoText: !n.textColor,
      raw: n,
      auto,
      autoSec,
    };
  }

  setIdent(patch: Partial<PresetNaming>, bankIndex: number = this.state.bank, switchKey?: string) {
    const ctrl = CONTROLLERS[this.state.controllerId] || CONTROLLERS.chocolate;
    const resolvedKey = switchKey ?? (ctrl.nav ? ctrl.keys[0] : this.state.selectedKey);
    const key = `${bankIndex}:${resolvedKey}`;
    const naming = { ...this.state.naming, [key]: { ...this.state.naming[key], ...patch } };
    this.set({ naming });
  }

  colorFor(targetId: string, colorName: ColorName | null): ColorName | null {
    if (!colorName) return null;
    const t = NAMING[targetId];
    if (!t) return null;
    if (t.colors === null) return colorName;
    if (!t.colors.length) return null;
    if (t.colors.includes(colorName)) return colorName;
    const f = FALLBACK[colorName];
    return f && t.colors.includes(f) ? f : t.colors[0];
  }

  /** Switching controllers starts a fresh set of stacks. */
  switchController(id: string) {
    const ctrl = HardwareRegistry.getController(id);
    const action = ctrl.actions && !ctrl.actions.includes(this.state.action) ? ctrl.actions[0] : this.state.action;
    this.set({
      controllerId: id,
      ...(ctrl.isBrain ? { brainId: 'scribble' } : {}),
      banks: MacroStackModel.createBanks(id),
      bank: 0,
      selectedKey: ctrl.keys[0],
      action,
      controllerPickerOpen: false,
      popoverControlId: null,
      colorPickerOpen: false,
      jumpOpen: false,
    });
  }

  // --- Hardware Connection & Wire Monitor Actions ---

  openConnect() {
    this.set({ connectOpen: true });
  }

  closeConnect() {
    this.set({ connectOpen: false });
  }

  pushLog(e: { text: string; sub: string; tone: 'trig' | 'out' | 'in' | 'warn' | 'ok' }) {
    const seq = this.state.seq + 1;
    const entry: WireLogEntry = { n: seq, ...e };
    const log = [...this.state.log, entry].slice(-60);
    this.set({ seq, log });
  }

  toggleConn(id: string) {
    if (id === 'scribble') {
      const on = !!this.state.conn['scribble'];
      if (on) {
        const conn = { ...this.state.conn, scribble: false };
        this.set({ conn });
        this.pushLog({
          text: 'disconnected Pirate MIDI Scribble',
          sub: 'serial port closed',
          tone: 'warn',
        });
        midiService.disconnectScribble().catch(() => { });
        return;
      }

      if (!midiService.isSerialSupported) {
        const isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';
        if (isBrowser) {
          const msg = 'Web Serial is not supported in this browser. Please open Stomp Stacks in Google Chrome or Microsoft Edge desktop.';
          this.set({ notice: msg });
          this.pushLog({
            text: 'Web Serial unavailable',
            sub: 'Chrome or Edge desktop required for USB CDC',
            tone: 'warn',
          });
          return;
        } else {
          // Node/test environment headless fallback
          const conn = { ...this.state.conn, scribble: true };
          this.set({ conn });
          this.pushLog({ text: 'opened USB MIDI Port 1', sub: 'Pirate MIDI Scribble', tone: 'ok' });
          return;
        }
      }

      this.pushLog({
        text: 'connecting to Scribble...',
        sub: 'requesting USB serial port access',
        tone: 'trig',
      });

      midiService.connectScribble(true).then(
        (devSettings) => {
          if (!devSettings) {
            this.pushLog({
              text: 'serial connection canceled',
              sub: 'no USB port was selected',
              tone: 'warn',
            });
            return;
          }

          const fw = detectScribbleFirmwareVersion({ deviceSettings: devSettings });
          this.set({
            conn: { ...this.state.conn, scribble: true },
            scribbleFirmware: { ...fw, detectedFrom: 'device' },
          });

          this.pushLog({
            text: `connected ${devSettings.deviceName || 'Pirate MIDI Scribble'}`,
            sub: `firmware ${devSettings.firmwareVersion || fw.version} · hardware ${devSettings.hardwareVersion || '1.x'}`,
            tone: 'ok',
          });
        },
        (err) => {
          const msg = err?.name === 'NotFoundError'
            ? 'No serial port was selected'
            : err?.message && String(err.message).includes('Failed to open')
              ? 'Serial port is busy — close any other app (e.g. Pirate MIDI editor) using the port'
              : err?.message || 'Could not connect to Scribble';

          this.set({ notice: msg, conn: { ...this.state.conn, scribble: false } });
          this.pushLog({
            text: 'Scribble connection failed',
            sub: msg,
            tone: 'warn',
          });
        },
      );
      return;
    }

    const on = !!this.state.conn[id];
    const conn = { ...this.state.conn, [id]: !on };
    const listening = on && this.state.listening === id ? null : this.state.listening;
    this.set({ conn, listening });

    const nodes = midiService.getHardwareNodes(this.state);
    const node = nodes.find((n) => n.id === id);
    this.pushLog({
      text: (on ? 'closed ' : 'opened ') + (node ? node.port : id),
      sub: node ? node.name : id,
      tone: on ? 'warn' : 'ok',
    });
  }

  stompTest() {
    const st = this.state;
    const list = st.banks[st.bank]?.[st.selectedKey]?.[st.action] || [];
    const act = ACTIONS.find((a) => a.id === st.action);
    const actLabel = act ? act.label : st.action;

    if (!list.length) {
      this.pushLog({ text: `switch ${st.selectedKey} · ${actLabel}`, sub: 'nothing on this press', tone: 'warn' });
      return;
    }

    this.set({ firing: st.selectedKey });
    this.pushLog({
      text: `▸ switch ${st.selectedKey} · ${actLabel}`,
      sub: `${list.length} ${list.length === 1 ? 'message' : 'messages'} out`,
      tone: 'trig',
    });

    list.forEach((s, i) => {
      setTimeout(() => {
        const d = describeStep(s, st.channels, st.pedalSets, st.offsets);
        const live = !!this.state.conn[s.device];

        if (live) {
          if (d.pc) {
            midiService.sendProgramChange(d.channel, d.value);
          } else {
            midiService.sendControlChange(d.channel, d.cc ?? 0, d.value);
          }
        }

        this.pushLog({
          text: d.bytes.map(hex).join(' '),
          sub: live ? `${d.deviceName} · ${d.label}` : `${d.deviceName} never answered — is it plugged in?`,
          tone: live ? 'out' : 'warn',
        });

        this.set({ lit: { device: s.device, control: s.control } });
        setTimeout(() => {
          if (this.state.lit && this.state.lit.control === s.control) {
            this.set({ lit: null });
          }
        }, 280);
      }, 110 * i);
    });

    setTimeout(() => {
      this.set({ firing: null });
    }, 110 * list.length + 260);
  }

  simScribblePresets(): ReadPresetSlot[] {
    const st = this.state;
    const pool = st.rig;
    if (!pool.length) return [];
    const SLOTS = [1, 2, 3, 5, 8, 13, 17, 21, 34, 55, 64, 89, 127];
    const pal = PALETTE.map((p) => p[0]);
    return SLOTS.map((n, i) => {
      const d1 = pool[i % pool.length];
      const dev1 = DEVICES[d1];
      const foots = dev1 ? dev1.controls.filter((c) => c.type === 'foot' && !c.sub) : [];
      const c1 = foots[i % Math.max(foots.length, 1)] || (dev1 ? dev1.controls[0] : null);
      const steps: MacroStep[] = c1 ? [{ device: d1, control: c1.id, value: null }] : [];

      if (i % 3 !== 2 && pool.length > 1) {
        const d2 = pool[(i + 1) % pool.length];
        const dev2 = DEVICES[d2];
        const knobs = dev2 ? dev2.controls.filter((c) => c.type === 'knob' && !c.sub) : [];
        const c2 = knobs[i % Math.max(knobs.length, 1)] || (dev2 ? dev2.controls[0] : null);
        if (c2) {
          steps.push({ device: d2, control: c2.id, value: 16 * ((i % 7) + 1) });
        }
      }
      if (i % 4 === 1 && pool.length > 2) {
        const d3 = pool[(i + 2) % pool.length];
        const dev3 = DEVICES[d3];
        if (dev3 && dev3.controls.length) {
          const c3 = dev3.controls[(i + 1) % dev3.controls.length];
          steps.push({ device: d3, control: c3.id, value: 127 });
        }
      }
      const shortName = dev1 ? dev1.name.split(' ')[0].toUpperCase() : 'PEDAL';
      const c1Short = c1 ? (c1.short || c1.label || '').split(' ')[0] : '';
      return {
        n,
        label: `${shortName} ${c1Short}`.slice(0, 12).trim(),
        second: `${dev1 ? dev1.name.toLowerCase() : d1} · ch ${st.channels[d1] || 1}`,
        color: pal[i % pal.length] as ColorName,
        steps,
      };
    });
  }

  async readFrom(id: string, scribbleConfig?: ScribbleConfig) {
    const st = this.state;
    const ctrl = CONTROLLERS[st.controllerId];
    const keys = ctrl ? ctrl.keys : ['A', 'B', 'C', 'D'];
    const isHardwareRead = !scribbleConfig && id === 'scribble';

    // If running in Node.js test environment without Web Serial, keep mock fallback for unit tests
    if (isHardwareRead && !midiService.isSerialSupported) {
      const presets = this.simScribblePresets();
      this.pushLog({
        text: 'Web Serial unavailable in this environment',
        sub: 'loaded simulated preset slots for testing',
        tone: 'warn',
      });
      this.set({
        readOpen: true,
        readData: {
          from: id,
          presets,
          dest: {},
          filter: '',
          allPresets: [],
          readingHardware: false,
          scanned: 128,
          total: 128,
          found: presets.length,
        },
        connectOpen: false,
      });
      return;
    }

    this.set({
      readOpen: true,
      readData: {
        from: id,
        presets: [],
        dest: {},
        filter: '',
        allPresets: [],
        readingHardware: isHardwareRead,
        scanned: 0,
        total: 128,
        found: 0,
      },
      connectOpen: false,
    });

    let targetConfig = scribbleConfig;
    if (!targetConfig && isHardwareRead) {
      this.pushLog({
        text: `querying ${id}...`,
        sub: 'reading banks over USB serial CDC',
        tone: 'trig',
      });

      try {
        targetConfig = (await midiService.readLiveDeviceConfig(id, {
          allowPrompt: true,
          onProgress: (done, total) => {
            if (!this.state.readData || !this.state.readData.readingHardware) return;
            this.set({
              readData: {
                ...this.state.readData,
                scanned: done,
                total,
              },
            });
          },
        })) ?? undefined;
      } catch (err: any) {
        const msg = err?.name === 'NotFoundError'
          ? 'Device selection was canceled'
          : err?.message && String(err.message).includes('Failed to open')
            ? 'Serial port is busy — close any other app (e.g. Pirate MIDI editor) using the port'
            : err?.message || 'USB serial read failed';

        this.pushLog({
          text: `read ${id} failed`,
          sub: msg,
          tone: 'warn',
        });
        this.set({
          readOpen: false,
          readData: null,
          notice: `Could not read from Scribble: ${msg}`,
        });
        return;
      }
    }

    if (!targetConfig && isHardwareRead) {
      this.pushLog({
        text: `read ${id} failed`,
        sub: 'no data received from hardware',
        tone: 'warn',
      });
      this.set({
        readOpen: false,
        readData: null,
        notice: 'Could not connect to Scribble. Please verify the USB cable and permissions.',
      });
      return;
    }

    if (targetConfig && id === 'scribble') {
      const fw = detectScribbleFirmwareVersion(targetConfig);
      this.set({
        conn: { ...this.state.conn, scribble: true },
        scribbleFirmware: { ...fw, detectedFrom: scribbleConfig ? 'file' : 'device' },
      });
    }

    const rawParsed = targetConfig ? parseAllScribblePresets(targetConfig, st.channels, keys) : [];
    const pal = PALETTE.map((p) => p[0]);

    const presets: ReadPresetSlot[] = rawParsed.map((p, i) => {
      const n = p.slotNumber ?? (p.bankIndex * keys.length + (keys.indexOf(p.key) >= 0 ? keys.indexOf(p.key) + 1 : i + 1));
      return {
        n,
        label: p.presetName,
        second: p.secondaryText || `${DEVICES[p.steps[0]?.device]?.name || 'pedal'} · ch ${st.channels[p.steps[0]?.device] || 1}`,
        color: p.color || (pal[(n - 1) % pal.length] as ColorName),
        steps: p.steps,
      };
    });

    const allPresets: ParsedPresetItem[] = rawParsed.map((p, i) => ({
      id: `${p.bankIndex}:${p.key}:${i}`,
      bankIndex: p.bankIndex,
      key: p.key,
      presetName: p.presetName,
      secondaryText: p.secondaryText,
      steps: p.steps,
      selected: true,
    }));

    const nodes = midiService.getHardwareNodes(st);
    const node = nodes.find((n) => n.id === id);

    this.pushLog({
      text: `read ${node ? node.name : id}`,
      sub: targetConfig
        ? `${presets.length} device presets loaded live from physical Scribble`
        : 'configuration loaded',
      tone: 'ok',
    });

    this.set({
      readData: {
        from: id,
        presets,
        dest: {},
        filter: '',
        allPresets,
        readingHardware: false,
        scanned: 128,
        total: 128,
        found: presets.length,
      },
    });
  }

  async readLiveUsbSerial() {
    return this.readFrom('scribble');
  }

  async connectAndImportScribble() {
    this.pushLog({
      text: 'connecting to Scribble...',
      sub: 'requesting USB device permission',
      tone: 'trig',
    });

    let targetConfig: ScribbleConfig | null = null;
    try {
      targetConfig = await midiService.requestLiveSerialConfig();
    } catch (err: any) {
      const msg = err?.name === 'NotFoundError'
        ? 'Device selection was canceled'
        : err?.message && String(err.message).includes('Failed to open')
          ? 'Serial port is busy — close any other app (e.g. Pirate MIDI editor) using the port'
          : err?.message || 'USB serial access error';

      this.pushLog({
        text: 'Scribble connection failed',
        sub: msg,
        tone: 'warn',
      });
      this.set({ notice: `Could not connect to Scribble: ${msg}` });
      return;
    }

    if (!targetConfig) return;

    const st = this.state;
    const ctrl = CONTROLLERS[st.controllerId];
    const keys = ctrl ? ctrl.keys : ['A', 'B', 'C', 'D'];

    const fw = detectScribbleFirmwareVersion(targetConfig);
    this.set({
      conn: { ...this.state.conn, scribble: true },
      scribbleFirmware: { ...fw, detectedFrom: 'device' },
    });

    const rawParsed = parseAllScribblePresets(targetConfig, st.channels, keys);
    const allPresets: ParsedPresetItem[] = rawParsed.map((p, i) => ({
      id: `${p.bankIndex}:${p.key}:${i}`,
      bankIndex: p.bankIndex,
      key: p.key,
      presetName: p.presetName,
      secondaryText: p.secondaryText,
      steps: p.steps,
      selected: true,
    }));

    if (allPresets.length > 0) {
      this.loadPresetsIntoBanks(allPresets);
      this.pushLog({
        text: 'Scribble connected & synced',
        sub: `imported ${allPresets.length} active hardware presets`,
        tone: 'ok',
      });
      this.set({ connectOpen: false });
      return;
    }

    this.readFrom('scribble', targetConfig);
  }

  setScribbleFirmware(versionOrMajor: 'v1' | 'v2' | string) {
    const major: 'v1' | 'v2' = versionOrMajor.startsWith('1') || versionOrMajor === 'v1' ? 'v1' : 'v2';
    const version = versionOrMajor === 'v1' ? '1.0.1' : versionOrMajor === 'v2' ? '2.0.0' : versionOrMajor;
    this.set({
      scribbleFirmware: {
        version,
        major,
        detectedFrom: 'manual',
      },
    });
    this.pushLog({
      text: `scribble firmware set to ${major.toUpperCase()} (${version})`,
      sub: 'export schema adjusted',
      tone: 'ok',
    });
  }

  loadScribbleFile(config: ScribbleConfig) {
    const fw = detectScribbleFirmwareVersion(config);
    this.set({ scribbleFirmware: { ...fw, detectedFrom: fw.detectedFrom || 'file' } });
    this.pushLog({
      text: `loaded scribble config (${fw.version})`,
      sub: `firmware ${fw.major.toUpperCase()} detected from ${fw.detectedFrom || 'file'}`,
      tone: 'ok',
    });
    this.readFrom('scribble', config);
  }

  setReadFilter(filter: string) {
    if (!this.state.readData) return;
    this.set({ readData: { ...this.state.readData, filter } });
  }

  setReadDest(n: number, value: string, bankIdx?: number) {
    if (!this.state.readData) return;
    const dest = { ...this.state.readData.dest };
    if (!value) {
      delete dest[n];
    } else {
      const parts = value.split(':');
      dest[n] = {
        key: parts[0],
        bank: bankIdx ?? this.state.bank,
        action: (parts[1] as ActionId) || this.state.action,
        mode: dest[n]?.mode || 'replace',
      };
    }
    this.set({ readData: { ...this.state.readData, dest } });
  }

  setReadDestAction(n: number, action: ActionId) {
    if (!this.state.readData || !this.state.readData.dest[n]) return;
    const dest = {
      ...this.state.readData.dest,
      [n]: { ...this.state.readData.dest[n], action },
    };
    this.set({ readData: { ...this.state.readData, dest } });
  }

  setReadDestMode(n: number, mode: 'replace' | 'add') {
    if (!this.state.readData || !this.state.readData.dest[n]) return;
    const dest = {
      ...this.state.readData.dest,
      [n]: { ...this.state.readData.dest[n], mode },
    };
    this.set({ readData: { ...this.state.readData, dest } });
  }

  applyPresets() {
    const read = this.state.readData;
    if (!read || !read.presets) return;

    const picks = read.presets
      .filter((p) => read.dest[p.n])
      .map((p) => ({ p, d: read.dest[p.n] }));

    const st = this.state;

    const updatedBanks = st.banks.map((b) => {
      const nb: Bank = {};
      Object.keys(b).forEach((k) => {
        nb[k] = { press: [...b[k].press], hold: [...b[k].hold], double: [...b[k].double] };
      });
      return nb;
    });

    const updatedNaming = { ...st.naming };

    picks.forEach(({ p, d }) => {
      const bi = d.bank ?? st.bank;
      const slot = updatedBanks[bi]?.[d.key];
      if (!slot) return;

      if (d.mode === 'add') {
        slot[d.action] = [...slot[d.action], ...p.steps.map((x) => ({ ...x }))].slice(0, this.limit());
      } else {
        slot[d.action] = p.steps.map((x) => ({ ...x }));
      }

      if (d.mode === 'replace') {
        const namingKey = `${bi}:${d.key}`;
        updatedNaming[namingKey] = {
          name: p.label,
          secondary: p.second,
          color: p.color,
        };
      }
    });

    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS.chocolate;
    this.pushLog({
      text: picks.length ? `pulled ${picks.length} ${picks.length === 1 ? 'preset in' : 'presets in'}` : 'took nothing',
      sub: picks.length
        ? picks
          .map(
            (x) =>
              `p${String(x.p.n).padStart(3, '0')} → ${ctrl.nav ? `slot ${String((x.d.bank || 0) + 1).padStart(3, '0')}` : `switch ${x.d.key}`
              }`,
          )
          .join(', ')
        : 'left the rig as it was',
      tone: 'ok',
    });

    this.set({
      banks: updatedBanks,
      naming: updatedNaming,
      readOpen: false,
      readData: null,
    });
  }

  togglePresetSelection(presetId: string) {
    if (!this.state.readData || !this.state.readData.allPresets) return;
    const allPresets = this.state.readData.allPresets.map((p) =>
      p.id === presetId ? { ...p, selected: !p.selected } : p,
    );
    this.set({ readData: { ...this.state.readData, allPresets } });
  }

  selectAllReadPresets(select: boolean) {
    if (!this.state.readData || !this.state.readData.allPresets) return;
    const allPresets = this.state.readData.allPresets.map((p) => ({ ...p, selected: select }));
    this.set({ readData: { ...this.state.readData, allPresets } });
  }

  importSinglePreset(preset: ParsedPresetItem) {
    const st = this.state;
    const bankIdx = st.bank;
    const key = st.selectedKey;

    const updatedBanks = st.banks.map((b, bi) => {
      if (bi !== bankIdx) return b;
      const nb = { ...b };
      nb[key] = { ...nb[key], press: [...preset.steps] };
      return nb;
    });

    const namingKey = `${bankIdx}:${key}`;
    const naming = {
      ...st.naming,
      [namingKey]: { name: preset.presetName, secondary: preset.secondaryText },
    };

    this.pushLog({
      text: `imported preset "${preset.presetName}"`,
      sub: `loaded into Bank ${bankIdx + 1} - Switch ${key}`,
      tone: 'ok',
    });

    this.set({ banks: updatedBanks, naming });
  }

  loadPresetsIntoBanks(selectedPresets: ParsedPresetItem[]) {
    if (!selectedPresets || !selectedPresets.length) return;

    const st = this.state;
    const ctrl = CONTROLLERS[st.controllerId];
    const keys = ctrl ? ctrl.keys : ['A', 'B', 'C', 'D'];

    const maxBankIndex = Math.max(...selectedPresets.map((p) => p.bankIndex), 0);
    const requiredBanks = Math.max(st.banks.length, maxBankIndex + 1);

    const updatedBanks: typeof st.banks = [];
    for (let i = 0; i < requiredBanks; i++) {
      const existingBank = st.banks[i] || MacroStackModel.createBanks(st.controllerId)[0];
      const nb = { ...existingBank };
      Object.keys(nb).forEach((k) => {
        nb[k] = { press: [...nb[k].press], hold: [...nb[k].hold], double: [...nb[k].double] };
      });
      updatedBanks.push(nb);
    }

    const updatedNaming = { ...st.naming };

    selectedPresets.forEach((p) => {
      if (p.bankIndex < updatedBanks.length && keys.includes(p.key)) {
        if (updatedBanks[p.bankIndex][p.key]) {
          updatedBanks[p.bankIndex][p.key].press = [...p.steps];
        }
        const namingKey = `${p.bankIndex}:${p.key}`;
        updatedNaming[namingKey] = { name: p.presetName, secondary: p.secondaryText };
      }
    });

    const conn = { ...st.conn, scribble: true };

    this.set({
      banks: updatedBanks,
      naming: updatedNaming,
      conn,
      readOpen: false,
      readData: null,
    });
  }

  importSelectedDevicePresets() {
    const read = this.state.readData;
    if (!read || !read.allPresets || !read.allPresets.length) return;

    const selectedPresets = read.allPresets.filter((p) => p.selected);
    if (!selectedPresets.length) return;

    this.loadPresetsIntoBanks(selectedPresets);

    this.pushLog({
      text: `imported ${selectedPresets.length} presets from Scribble`,
      sub: `loaded into Stomp Stacks banks & macro stacks`,
      tone: 'ok',
    });
  }

  pickReadRow(_index: number, _side: 'app' | 'device') {
    // Legacy helper
  }

  applyRead() {
    this.importSelectedDevicePresets();
  }

  cancelRead() {
    this.set({ readOpen: false, readData: null });
  }

  listenTo(id: string) {
    if (!this.state.conn[id]) return;
    this.set({ listening: id, heard: null });

    const dev = DEVICES[id];
    if (!dev) return;

    const driftMap: Record<string, number> = { blooper: 0, mood: 0, elcap: 4, genloss: -2 };
    const drift = driftMap[id] || 0;
    const c = dev.controls[2] || dev.controls[0];
    const baseCc = c ? c.cc : 10;
    const currentOffset = this.state.offsets[id] || 0;

    setTimeout(() => {
      if (this.state.listening !== id) return;
      const heardCc = baseCc + currentOffset + drift;
      const expectCc = baseCc + currentOffset;

      this.set({
        heard: { pedal: id, control: c.id, cc: heardCc, expect: expectCc, drift },
      });

      const ch = this.state.channels[id] || 1;
      this.pushLog({
        text: `${hex(176 + ch - 1)} ${hex(heardCc)} 7F`,
        sub: `${dev.name} sent this when you moved ${c.short || c.label}`,
        tone: 'in',
      });
    }, 1100);
  }

  acceptDrift() {
    const h = this.state.heard;
    if (!h) return;
    const dev = DEVICES[h.pedal];
    const offsets = { ...this.state.offsets, [h.pedal]: (this.state.offsets[h.pedal] || 0) + h.drift };

    this.set({ offsets, heard: null, listening: null });
    this.pushLog({
      text: `shifted ${dev ? dev.name : h.pedal} by ${h.drift > 0 ? '+' : ''}${h.drift}`,
      sub: 'its whole map moves with it',
      tone: 'ok',
    });
  }

  dismissHeard() {
    this.set({ heard: null, listening: null });
  }

  toggleMonitor() {
    this.set({ monitorOn: !this.state.monitorOn });
  }

  clearLog() {
    this.set({ log: [] });
  }

  // --- Rig Persistence & Pedal Background Animations ---

  private applyLoadedRig(
    rec: SavedRigRecord,
    rigs: SavedRigRecord[],
    opts: { skipSetupClear?: boolean } = {}
  ) {
    const d = rec.data;
    const ctrl = CONTROLLERS[d.controllerId] || CONTROLLERS.chocolate;
    const patch: Partial<StompState> = {
      ...JSON.parse(JSON.stringify(d)),
      rigs,
      rigId: rec.id,
      bank: 0,
      selectedKey: ctrl.keys[0],
      action: 'press',
      browseDevice: d.rig[0] || DEVICE_ORDER[0],
      popoverControlId: null,
      actEdit: null,
      setsOpen: null,
      rigMenuOpen: false,
      rigRenaming: false,
      rigDeleteConfirm: false,
      ...(opts.skipSetupClear ? {} : { setupStep: null }),
    };
    this._loadingRig = true;
    this.set(patch);
    this._loadingRig = false;
    this.writeRigStore(rigs, rec.id);
  }

  private saveCurrentRigSnapshot(): SavedRigRecord[] {
    const s = this.state;
    if (!s.rigId) return s.rigs;
    const snap = snapState(s);
    const now = Date.now();
    const rigs = s.rigs.map((r) =>
      r.id === s.rigId ? { ...r, data: snap, updated: now } : r
    );
    this.writeRigStore(rigs, s.rigId);
    return rigs;
  }

  currentRig(): SavedRigRecord | undefined {
    return this.state.rigs.find((r) => r.id === this.state.rigId);
  }

  syncInfo(rec: SavedRigRecord, live?: SavedRigSnapshot): RigSyncInfo {
    const d = live || rec.data;
    if (!rec.sent) return { n: -1, label: 'not sent yet', tone: 'none' };
    const a = d.banks || [];
    const b = rec.sent.banks || [];
    let n = 0;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const x = a[i] || {};
      const y = b[i] || {};
      const keys = new Set([...Object.keys(x), ...Object.keys(y)]);
      for (const k of keys) {
        if (JSON.stringify(x[k]) !== JSON.stringify(y[k])) n++;
      }
    }
    const other = (
      ['controllerId', 'brainId', 'channels', 'rig', 'naming', 'actions', 'pedalSets'] as const
    ).some((k) => JSON.stringify(d[k]) !== JSON.stringify(rec.sent![k]));
    if (n > 0) {
      return {
        n,
        label: `${n} ${n === 1 ? 'switch' : 'switches'} not sent`,
        tone: 'dirty',
      };
    }
    if (other) return { n: 0, label: 'settings not sent', tone: 'dirty' };
    return { n: 0, label: 'on the controller', tone: 'ok' };
  }

  toggleRigMenu() {
    this.set({
      rigMenuOpen: !this.state.rigMenuOpen,
      rigRenaming: false,
      rigDeleteConfirm: false,
    });
  }

  closeRigMenu() {
    if (!this.state.rigMenuOpen) return;
    this.set({
      rigMenuOpen: false,
      rigRenaming: false,
      rigDeleteConfirm: false,
    });
  }

  switchRig(id: string) {
    if (id === this.state.rigId) {
      this.set({ rigMenuOpen: false, rigRenaming: false, rigDeleteConfirm: false });
      return;
    }
    const rigs = this.saveCurrentRigSnapshot();
    const target = rigs.find((r) => r.id === id);
    if (!target) return;
    this.applyLoadedRig(target, rigs);
  }

  newRig() {
    const rigs = this.saveCurrentRigSnapshot();
    const s = this.state;
    const data = snapState(s);
    data.banks = MacroStackModel.createBanks(s.controllerId);
    data.naming = {};
    const rec: SavedRigRecord = {
      id: `r${Date.now()}`,
      name: `untitled rig ${rigs.length + 1}`,
      data,
      updated: Date.now(),
      sent: null,
      sentAt: null,
    };
    this.applyLoadedRig(rec, [...rigs, rec], { skipSetupClear: true });
    this.set({ setupStep: 1 });
  }

  dupRig() {
    const rigs = this.saveCurrentRigSnapshot();
    const cur = rigs.find((r) => r.id === this.state.rigId);
    if (!cur) return;
    const rec: SavedRigRecord = {
      id: `r${Date.now()}`,
      name: `${cur.name} copy`,
      data: JSON.parse(JSON.stringify(cur.data)) as SavedRigSnapshot,
      updated: Date.now(),
      sent: null,
      sentAt: null,
    };
    this.applyLoadedRig(rec, [...rigs, rec]);
  }

  deleteRig() {
    const s = this.state;
    if (s.rigs.length < 2) return;
    if (!s.rigDeleteConfirm) {
      this.set({ rigDeleteConfirm: true });
      return;
    }
    const rigs = s.rigs.filter((r) => r.id !== s.rigId);
    this.applyLoadedRig(rigs[0], rigs);
  }

  startRenameRig() {
    const cur = this.currentRig();
    this.set({
      rigRenaming: true,
      rigDraft: cur ? cur.name : '',
      rigDeleteConfirm: false,
    });
  }

  setRigDraft(draft: string) {
    this.set({ rigDraft: draft });
  }

  commitRenameRig() {
    if (!this.state.rigRenaming) return;
    const name = this.state.rigDraft.trim();
    const rigs = this.state.rigs.map((r) =>
      r.id === this.state.rigId && name ? { ...r, name } : r
    );
    this.set({ rigs, rigRenaming: false });
    this.writeRigStore(rigs, this.state.rigId);
  }

  cancelRenameRig() {
    this.set({ rigRenaming: false });
  }

  exportRig() {
    const rigs = this.saveCurrentRigSnapshot();
    const cur = rigs.find((r) => r.id === this.state.rigId);
    if (!cur) return;
    const payload = JSON.stringify(
      { app: 'stomp stacks', version: 1, name: cur.name, data: cur.data },
      null,
      2
    );
    const filename = `${cur.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.stomp.json`;
    const blob = new Blob([payload], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    this.set({ rigs, rigMenuOpen: false });
    this.pushLog({ text: 'rig exported', sub: filename, tone: 'ok' });
  }

  async importRig(file: File | undefined) {
    if (!file) return;
    try {
      const text = await file.text();
      const raw = JSON.parse(text) as {
        name?: string;
        data?: Record<string, any>;
      };
      const d = raw?.data;
      const controllerId = d?.controllerId || d?.controller;
      if (!d || !Array.isArray(d.banks) || !controllerId || !CONTROLLERS[controllerId]) {
        throw new Error('bad');
      }
      const normalized: SavedRigSnapshot = {
        banks: d.banks,
        controllerId,
        brainId: d.brainId || d.brain || 'scribble',
        channels: d.channels || { blooper: 1, mood: 2, elcap: 3 },
        rig: Array.isArray(d.rig) ? d.rig : ['blooper', 'mood', 'elcap'],
        naming: d.naming || {},
        actions: Array.isArray(d.actions) ? d.actions : this.state.actions,
        pedalSets: Array.isArray(d.pedalSets)
          ? d.pedalSets
          : Array.isArray(d.moodSets)
            ? d.moodSets
            : this.state.pedalSets,
        offsets: d.offsets || {},
      };
      const rigs = this.saveCurrentRigSnapshot();
      const rec: SavedRigRecord = {
        id: `r${Date.now()}`,
        name: raw.name || file.name.replace(/\..*$/, ''),
        data: normalized,
        updated: Date.now(),
        sent: null,
        sentAt: null,
      };
      this.applyLoadedRig(rec, [...rigs, rec]);
      this.pushLog({ text: 'rig imported', sub: rec.name, tone: 'ok' });
    } catch {
      this.pushLog({
        text: "couldn't read that file",
        sub: `${file.name} isn't a stomp stacks rig`,
        tone: 'warn',
      });
    }
  }

  markRigSent() {
    const s = this.state;
    if (!s.rigId) return;
    const data = snapState(s);
    const now = Date.now();
    const rigs = s.rigs.map((r) =>
      r.id === s.rigId ? { ...r, data, updated: now, sent: data, sentAt: now } : r
    );
    this.set({ rigs });
    this.writeRigStore(rigs, s.rigId);
  }

  setPedalBg(deviceId: string, style: string) {
    const bgBy = { ...this.state.bgBy, [deviceId]: style };
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(BG_STORE, JSON.stringify(bgBy));
      } catch {
        // ignore storage errors
      }
    }
    this.set({ bgBy, browseDevice: deviceId });
  }
}

export { CAPS };
