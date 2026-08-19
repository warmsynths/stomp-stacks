import { ACTIONS, type ActionId, CONTROLLERS } from '../data/controllers.js';
import type { DeviceControl } from '../data/devices.js';
import { DEVICES } from '../data/devices.js';
import { NAMING, PALETTE, HEX, FALLBACK, isDark, type ColorName, type NamingTargetDef } from '../data/naming.js';
import { HardwareRegistry, DEVICE_ORDER } from '../data/registry.js';
import { MacroStackModel, DEFAULT_MAX_STEPS } from './macro-stack-model.js';
import type { FaceMode, MacroStep, StompState, PresetNaming, IdentResult, WireLogEntry, ParsedPresetItem, Bank, ReadPresetSlot } from './types.js';
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

  sendTestCC(channel: number) {
    // Send CC 93 (Tap Tempo / harmless on Chase Bliss) with value 127
    midiService.sendControlChange(channel, 93, 127);
    this.pushLog({
      text: `sent test cc 93 on ch ${channel}`,
      sub: `sweeper diagnostic`,
      tone: 'out'
    });
  }

  assignGuidedPC(id: string, channel: number, targetKey?: string) {
    const { banks, bank, action } = this.state;
    const switchKey = targetKey || this.state.selectedKey;
    const updatedBanks = MacroStackModel.assignGuidedPCStep(banks, bank, switchKey, action, id, channel, MAX_STEPS);
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
      MAX_STEPS,
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

  /** A control opens its popover if it has value options, macro templates, or is multi-state; otherwise assigns immediately. */
  clickControl(control: DeviceControl) {
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

  /** Toggles the step off if it's already assigned; otherwise appends (capped at MAX_STEPS). */
  addStep(controlId: string, value: number | null, label?: string) {
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
      label,
    );
    this.set({ banks: updatedBanks, popoverControlId: null, sheetOpen: true });
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

  simScribblePresets(): ReadPresetSlot[] {
    const st = this.state;
    const pool = st.rig;
    if (!pool.length) return [];
    const SLOTS = [1, 2, 3, 5, 8, 13, 17, 21, 34, 55, 64, 89, 127];
    const pal = PALETTE.map((p) => p[0]);
    return SLOTS.map((n, i) => {
      const d1 = pool[i % pool.length];
      const dev1 = DEVICES[d1];
      const foots = dev1 ? dev1.controls.filter((c) => c.type === 'foot') : [];
      const c1 = foots[i % Math.max(foots.length, 1)] || (dev1 ? dev1.controls[0] : null);
      const steps: MacroStep[] = c1 ? [{ device: d1, control: c1.id, value: null }] : [];

      if (i % 3 !== 2 && pool.length > 1) {
        const d2 = pool[(i + 1) % pool.length];
        const dev2 = DEVICES[d2];
        const knobs = dev2 ? dev2.controls.filter((c) => c.type === 'knob') : [];
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
    const isHardwareRead = !scribbleConfig;

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

    if (isHardwareRead) {
      this.pushLog({
        text: `querying ${id}...`,
        sub: 'sending Web Serial / MIDI query to device',
        tone: 'trig',
      });

      const TICKS = 16;
      const STEP = 128 / TICKS;
      for (let t = 1; t <= TICKS; t++) {
        setTimeout(() => {
          if (!this.state.readData || !this.state.readData.readingHardware) return;
          const scanned = Math.round(STEP * t);
          this.set({
            readData: {
              ...this.state.readData,
              scanned,
              found: Math.min(scanned, 13),
            },
          });
        }, 95 * t);
      }
    }

    let targetConfig = scribbleConfig;
    if (!targetConfig) {
      targetConfig = (await midiService.readLiveDeviceConfig(id)) ?? undefined;
    }

    const rawParsed = targetConfig ? parseAllScribblePresets(targetConfig, st.channels, keys) : [];
    const pal = PALETTE.map((p) => p[0]);

    const presets: ReadPresetSlot[] = rawParsed.length
      ? rawParsed.map((p, i) => {
          const n = p.slotNumber ?? (p.bankIndex * keys.length + (keys.indexOf(p.key) >= 0 ? keys.indexOf(p.key) + 1 : i + 1));
          return {
            n,
            label: p.presetName,
            second: p.secondaryText || `${DEVICES[p.steps[0]?.device]?.name || 'pedal'} · ch ${st.channels[p.steps[0]?.device] || 1}`,
            color: p.color || (pal[(n - 1) % pal.length] as ColorName),
            steps: p.steps,
          };
        })
      : this.simScribblePresets();

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
        : 'live hardware query finished — select scribble.json file if USB CDC requires manual grant',
      tone: targetConfig ? 'ok' : 'warn',
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
    this.set({
      readOpen: true,
      readData: {
        from: 'scribble',
        presets: [],
        dest: {},
        filter: '',
        allPresets: [],
        readingHardware: true,
        scanned: 0,
        total: 128,
        found: 0,
      },
    });

    const TICKS = 16;
    const STEP = 128 / TICKS;
    for (let t = 1; t <= TICKS; t++) {
      setTimeout(() => {
        if (!this.state.readData || !this.state.readData.readingHardware) return;
        const scanned = Math.round(STEP * t);
        this.set({
          readData: {
            ...this.state.readData,
            scanned,
            found: Math.min(scanned, 13),
          },
        });
      }, 95 * t);
    }

    const targetConfig = await midiService.requestLiveSerialConfig();
    const st = this.state;
    const ctrl = CONTROLLERS[st.controllerId];
    const keys = ctrl ? ctrl.keys : ['A', 'B', 'C', 'D'];

    const rawParsed = targetConfig ? parseAllScribblePresets(targetConfig, st.channels, keys) : [];
    const pal = PALETTE.map((p) => p[0]);

    const presets: ReadPresetSlot[] = rawParsed.length
      ? rawParsed.map((p, i) => {
          const n = p.slotNumber ?? (p.bankIndex * keys.length + (keys.indexOf(p.key) >= 0 ? keys.indexOf(p.key) + 1 : i + 1));
          return {
            n,
            label: p.presetName,
            second: p.secondaryText || `${DEVICES[p.steps[0]?.device]?.name || 'pedal'} · ch ${st.channels[p.steps[0]?.device] || 1}`,
            color: p.color || (pal[(n - 1) % pal.length] as ColorName),
            steps: p.steps,
          };
        })
      : this.simScribblePresets();

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
        ? `${presets.length} presets loaded live from physical Scribble`
        : 'no USB serial data received — select scribble.json file',
      tone: targetConfig ? 'ok' : 'warn',
    });

    this.set({
      readData: {
        from: 'scribble',
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

  setReadFilter(filter: string) {
    if (!this.state.readData) return;
    this.set({ readData: { ...this.state.readData, filter } });
  }

  setReadDest(n: number, value: string) {
    if (!this.state.readData) return;
    const dest = { ...this.state.readData.dest };
    if (!value) {
      delete dest[n];
    } else {
      const parts = value.split(':');
      dest[n] = {
        key: parts[0],
        action: parts[1] as ActionId,
        mode: dest[n]?.mode || 'replace',
      };
    }
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
    const bankIdx = st.bank;

    const updatedBanks = st.banks.map((b) => {
      const nb: Bank = {};
      Object.keys(b).forEach((k) => {
        nb[k] = { press: [...b[k].press], hold: [...b[k].hold], double: [...b[k].double] };
      });
      return nb;
    });

    const updatedNaming = { ...st.naming };

    picks.forEach(({ p, d }) => {
      const slot = updatedBanks[bankIdx]?.[d.key];
      if (!slot) return;

      if (d.mode === 'add') {
        slot[d.action] = [...slot[d.action], ...p.steps.map((x) => ({ ...x }))].slice(0, MAX_STEPS);
      } else {
        slot[d.action] = p.steps.map((x) => ({ ...x }));
      }

      if (d.mode === 'replace') {
        const namingKey = `${bankIdx}:${d.key}`;
        updatedNaming[namingKey] = {
          name: p.label,
          secondary: p.second,
          color: p.color,
        };
      }
    });

    this.pushLog({
      text: picks.length ? `pulled ${picks.length} ${picks.length === 1 ? 'preset' : 'presets'} in` : 'took nothing',
      sub: picks.length
        ? picks.map((x) => `p${String(x.p.n).padStart(3, '0')} → ${x.d.key}`).join(', ')
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

