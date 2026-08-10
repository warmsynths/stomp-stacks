import { ACTIONS, type ActionId, CONTROLLERS } from '../data/controllers.js';
import type { DeviceControl } from '../data/devices.js';
import { DEVICES } from '../data/devices.js';
import { NAMING, PALETTE, HEX, FALLBACK, isDark, type ColorName, type NamingTargetDef } from '../data/naming.js';
import { HardwareRegistry, DEVICE_ORDER } from '../data/registry.js';
import { MacroStackModel, DEFAULT_MAX_STEPS } from './macro-stack-model.js';
import type { FaceMode, MacroStep, StompState, PresetNaming, IdentResult, WireLogEntry, ParsedPresetItem } from './types.js';
import { midiService, hex } from '../services/midi-service.js';
import { parseAllScribblePresets } from '../compiler/adapters/scribble.js';
import type { ScribbleConfig } from '../types/scribble.js';





export const MAX_STEPS = DEFAULT_MAX_STEPS;


function trunc(s: string, n: number): string {
  if (!s) return '';
  return s.length <= n ? s : s.slice(0, n);
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

  toggleColorPicker() {
    this.set({ colorPickerOpen: !this.state.colorPickerOpen });
  }

  closeColorPicker() {
    this.set({ colorPickerOpen: false });
  }

  namingTargets(): NamingTargetDef[] {
    const ids = [this.state.controllerId];
    if (this.state.brainId === 'scribble') ids.push('scribble');
    return ids.filter((id) => NAMING[id]).map((id) => ({ ...NAMING[id] }));
  }

  displayTargets(): NamingTargetDef[] {
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
    const c = HardwareRegistry.getControl(step.device, step.control);
    const ceiling = this.displayTargets().reduce((m, t) => Math.min(m, t.name), 24);
    return trunc(n > 1 ? `${d.name} +${n - 1}` : `${d.name} ${c ? c.short : ''}`, ceiling);
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

  ident(bankIndex: number = this.state.bank, switchKey: string = this.state.selectedKey): IdentResult {
    const key = `${bankIndex}:${switchKey}`;
    const n = this.state.naming[key] || {};
    const auto = this.autoName(bankIndex, switchKey);
    const autoSec = this.autoSecondary(bankIndex, switchKey);
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

  setIdent(patch: Partial<PresetNaming>, bankIndex: number = this.state.bank, switchKey: string = this.state.selectedKey) {
    const key = `${bankIndex}:${switchKey}`;
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
    this.set({
      controllerId: id,
      banks: MacroStackModel.createBanks(id),
      bank: 0,
      selectedKey: ctrl.keys[0],
      controllerPickerOpen: false,
      popoverControlId: null,
      colorPickerOpen: false,
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
      this.pushLog({ text: `switch ${st.selectedKey} · ${actLabel}`, sub: 'nothing stacked here', tone: 'warn' });
      return;
    }

    this.pushLog({
      text: `▸ switch ${st.selectedKey} · ${actLabel}`,
      sub: `${list.length} ${list.length === 1 ? 'message' : 'messages'} out`,
      tone: 'trig',
    });

    list.forEach((s, i) => {
      setTimeout(() => {
        const dev = DEVICES[s.device];
        if (!dev) return;
        const c = dev.controls.find((x) => x.id === s.control);
        const ch = st.channels[s.device] || 1;
        const baseCc = c ? c.cc : 10;
        const offset = st.offsets[s.device] || 0;
        const cc = baseCc + offset;
        const val = s.value === null ? 127 : s.value;
        const live = !!st.conn[s.device];

        if (live) {
          midiService.sendControlChange(ch, cc, val);
        }

        this.pushLog({
          text: `${hex(176 + ch - 1)} ${hex(cc)} ${hex(val)}`,
          sub: live ? `${dev.name} · ${c ? c.label : s.control}` : `${dev.name} never answered — is it plugged in?`,
          tone: live ? 'out' : 'warn',
        });
      }, 110 * i);
    });
  }

  async readFrom(id: string, scribbleConfig?: ScribbleConfig) {
    const st = this.state;
    const ctrl = CONTROLLERS[st.controllerId];
    const keys = ctrl ? ctrl.keys : ['A', 'B', 'C', 'D'];

    this.set({
      readOpen: true,
      readData: {
        from: id,
        allPresets: [],
        readingHardware: !scribbleConfig,
      },
      connectOpen: false,
    });

    let targetConfig = scribbleConfig;
    if (!targetConfig) {
      this.pushLog({
        text: `querying ${id}...`,
        sub: 'sending Web Serial / MIDI query to device',
        tone: 'trig',
      });
      targetConfig = await midiService.readLiveDeviceConfig(id);
    }

    const rawParsed = targetConfig ? parseAllScribblePresets(targetConfig, st.channels, keys) : [];

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
        ? `${allPresets.length} device presets loaded live from physical Scribble`
        : 'live hardware query finished — select scribble.json file if USB CDC requires manual grant',
      tone: targetConfig ? 'ok' : 'warn',
    });

    this.set({
      readData: {
        from: id,
        allPresets,
        readingHardware: false,
      },
    });
  }


  async readLiveUsbSerial() {
    this.set({
      readOpen: true,
      readData: {
        from: 'scribble',
        allPresets: [],
        readingHardware: true,
      },
    });

    const targetConfig = await midiService.requestLiveSerialConfig();
    const st = this.state;
    const ctrl = CONTROLLERS[st.controllerId];
    const keys = ctrl ? ctrl.keys : ['A', 'B', 'C', 'D'];

    const rawParsed = targetConfig ? parseAllScribblePresets(targetConfig, st.channels, keys) : [];
    const allPresets: ParsedPresetItem[] = rawParsed.map((p, i) => ({
      id: `${p.bankIndex}:${p.key}:${i}`,
      bankIndex: p.bankIndex,
      key: p.key,
      presetName: p.presetName,
      secondaryText: p.secondaryText,
      steps: p.steps,
      selected: true,
    }));

    this.pushLog({
      text: 'read USB device',
      sub: targetConfig
        ? `${allPresets.length} presets loaded live from physical Scribble`
        : 'no USB serial data received — select scribble.json file',
      tone: targetConfig ? 'ok' : 'warn',
    });

    this.set({
      readData: {
        from: 'scribble',
        allPresets,
        readingHardware: false,
      },
    });
  }

  async connectAndImportScribble() {
    this.pushLog({
      text: 'connecting to Scribble...',
      sub: 'requesting USB device permission',
      tone: 'trig',
    });

    const targetConfig = await midiService.requestLiveSerialConfig();
    const st = this.state;
    const ctrl = CONTROLLERS[st.controllerId];
    const keys = ctrl ? ctrl.keys : ['A', 'B', 'C', 'D'];

    if (targetConfig) {
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
    }

    this.readFrom('scribble', targetConfig || undefined);
  }

  loadScribbleFile(config: ScribbleConfig) {
    this.readFrom('scribble', config);
  }





  togglePresetSelection(presetId: string) {
    if (!this.state.readData) return;
    const allPresets = this.state.readData.allPresets.map((p) =>
      p.id === presetId ? { ...p, selected: !p.selected } : p,
    );
    this.set({ readData: { ...this.state.readData, allPresets } });
  }

  selectAllReadPresets(select: boolean) {
    if (!this.state.readData) return;
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
    if (!read || !read.allPresets.length) return;

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

    const driftMap: Record<string, number> = { blooper: 4, mood: 0, elcap: -2 };
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
}

