// Macro Stack Domain Model — Pure functional domain logic for bank/switch/action
// macro stack transformations, immutability, linked Actions, Pedal Set-ups, Wiggle & Clash detection.

import { CONTROLLERS, ACTIONS, type ActionId } from '../data/controllers.js';
import { DEVICES, KNOB_VALUES } from '../data/devices.js';
import { PEDAL_RAMP_KNOBS, PEDAL_SPEED_KNOB, setupsCompatible, type PedalSetup, type SetupDeviceId } from '../data/setups.js';
import type { ActionDef } from '../data/actions.js';
import type { Bank, ClashResult, MacroStep, Message, WiggleInfo } from './types.js';

export const DEFAULT_MAX_STEPS = 8;

export function knobWord(v: number | string | null | undefined): string {
  const num = typeof v === 'number' ? v : parseInt(String(v ?? 0), 10);
  if (Number.isNaN(num)) return String(v ?? '');
  const exact = KNOB_VALUES.find((p) => p.value === num);
  if (exact) return exact.label;
  const nearest = KNOB_VALUES.reduce((b, p) => (Math.abs(p.value - num) < Math.abs(b.value - num) ? p : b));
  return Math.abs(nearest.value - num) <= 6 ? `≈ ${nearest.label}` : String(num);
}

export function wiggleInfo(steps: Message[], pedalSets: PedalSetup[]): WiggleInfo | null {
  const pc = steps.find((x) => x.control === 'pc' && x.set);
  const set = pc ? pedalSets.find((s) => s.id === pc.set) : null;
  if (!set) return null;
  const dev = (set.device || pc?.device || 'mood') as SetupDeviceId;
  const rampKnobs = PEDAL_RAMP_KNOBS[dev] || PEDAL_RAMP_KNOBS.mood;
  const moving = rampKnobs.filter((m) => set.move[m[0]]);
  if (!moving.length) return null;
  const k = moving[0];
  const start = steps.find((x) => x.device === dev && x.control === k[0] && x.value !== null && x.value !== undefined);
  const v = start && start.value !== null ? Number(start.value) : 64;
  const noStart = !start;
  const speedKnobId = (PEDAL_SPEED_KNOB[dev] || PEDAL_SPEED_KNOB.mood).id;
  const sp = steps.find((x) => x.device === dev && x.control === speedKnobId && x.value !== null && x.value !== undefined);
  const speed = sp && sp.value !== null ? Number(sp.value) : 64;
  const lo = set.sweep === 'top' ? v : 0;
  const hi = set.sweep === 'top' ? 127 : v;
  const nm = k[1] + (moving.length > 1 ? ` +${moving.length - 1}` : '');
  const text = noStart
    ? `${nm}${set.bounce ? ' wiggles' : ' glides'} from wherever it was saved to the ${set.sweep === 'top' ? 'top' : 'bottom'}. tap ${k[1]} on the pedal to set where it starts.`
    : `${nm}${set.bounce ? ' wiggles ' : ' glides '}${knobWord(set.bounce || !set.fall[k[0]] ? lo : hi)}${set.bounce ? ' ↔ ' : ' → '}${knobWord(set.bounce || !set.fall[k[0]] ? hi : lo)} · speed ${knobWord(speed)}`;
  return {
    set,
    device: dev,
    lo,
    hi,
    bounce: !!set.bounce,
    speed,
    noStart,
    knobId: k[0],
    text,
  };
}

export function stepRole(steps: Message[], s: Message, pedalSets: PedalSetup[]): string {
  const devName = DEVICES[s.device]?.faceName || DEVICES[s.device]?.name || s.device.toUpperCase();
  if (s.control === 'pc' && s.set) {
    return `goes first — loads the switches, and puts ${devName}'s knobs back where they were when you saved`;
  }
  const wi = wiggleInfo(steps, pedalSets);
  if (!wi) return '';
  if (s.device === wi.device && wi.set.move[s.control]) {
    return `where the movement starts — it runs from here to the ${wi.set.sweep === 'top' ? 'top' : 'bottom'}`;
  }
  const spInfo = PEDAL_SPEED_KNOB[wi.device as SetupDeviceId] || PEDAL_SPEED_KNOB.mood;
  if (s.device === wi.device && s.control === spInfo.id) {
    return `speed — ${spInfo.label} is the speed knob while the set-up is loaded`;
  }
  return '';
}

export function clash(list: Message[], i: number, pedalSets: PedalSetup[]): ClashResult | null {
  const s = list[i];
  if (!s) return null;
  const dev = DEVICES[s.device];
  if (!dev) return null;

  if (s.control === 'pc') {
    for (let j = i + 1; j < list.length; j++) {
      const o = list[j];
      if (o.device !== s.device || o.control !== 'pc') continue;
      const A = s.set ? pedalSets.find((x) => x.id === s.set) : null;
      const B = o.set ? pedalSets.find((x) => x.id === o.set) : null;
      const ok = setupsCompatible(A, B);
      return {
        kind: 'over',
        merge: ok ? j : null,
        text:
          `the preset load at ${j + 1}${B ? ` (“${B.name}”)` : ''} replaces this whole set-up — knobs and dips.` +
          (ok
            ? ' merge them into one preset?'
            : A && B
              ? ` they can't merge: ${!!A.bounce !== !!B.bounce ? 'one bounces, one glides' : 'sweep or shape differs'}.`
              : ''),
      };
    }
    return null;
  }

  const c = dev.controls.find((x) => x.id === s.control);
  if (!c || c.type === 'foot') return null;

  for (let j = i + 1; j < list.length; j++) {
    const o = list[j];
    if (o.device !== s.device) continue;
    if (o.control === s.control) {
      return { kind: 'over', text: `overridden by ${j + 1} · frees a slot` };
    }
    if (o.control === 'pc') {
      return { kind: 'over', text: `the preset load at ${j + 1} replaces this · frees a slot` };
    }
  }

  for (let k = i - 1; k >= 0; k--) {
    const o = list[k];
    if (o.device !== s.device || o.control !== 'pc') continue;
    const set = o.set ? pedalSets.find((x) => x.id === o.set) : null;
    if (set && set.move && set.move[s.control] && s.inst !== o.inst && s.value !== null && s.value !== undefined) {
      return {
        kind: 'wig',
        at: k,
        text: `moves where “${set.name}” starts: ${c.short} now ${set.bounce ? 'wiggles from ' : 'glides from '}${knobWord(s.value)}`,
      };
    }
    return null;
  }

  return null;
}

export class MacroStackModel {
  static createBanks(controllerId: string): Bank[] {
    const def = CONTROLLERS[controllerId] || CONTROLLERS['chocolate'];
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

  /** Clone bank state structurally to maintain immutability. */
  static cloneBanks(banks: Bank[]): Bank[] {
    return banks.map((bank) => {
      const next: Bank = {};
      for (const key of Object.keys(bank)) {
        next[key] = {
          press: bank[key].press.map((x) => ({ ...x })),
          hold: bank[key].hold.map((x) => ({ ...x })),
          double: bank[key].double.map((x) => ({ ...x })),
        };
      }
      return next;
    });
  }

  static detachIn(list: Message[], inst: number, actions: ActionDef[]): void {
    list.forEach((x, i) => {
      if (x.inst !== inst) return;
      const a = actions.find((act) => act.id === x.act);
      const n: Message = { ...x, from: a ? a.name : 'an action' };
      delete n.act;
      delete n.inst;
      list[i] = n;
    });
  }

  static syncBanks(banks: Bank[], actionId: string, steps: Message[]): Bank[] {
    const rebuild = (list: Message[]): Message[] => {
      if (!list.some((x) => x.act === actionId)) return list;
      const out: Message[] = [];
      const done: Record<number, boolean> = {};
      list.forEach((x) => {
        if (x.act !== actionId) {
          out.push(x);
          return;
        }
        const inst = x.inst ?? 0;
        if (done[inst]) return;
        done[inst] = true;
        steps.forEach((s) => out.push({ ...s, act: actionId, inst: x.inst }));
      });
      return out;
    };
    return banks.map((b) => {
      const nb: Bank = {};
      Object.keys(b).forEach((k) => {
        nb[k] = {
          press: rebuild(b[k].press),
          hold: rebuild(b[k].hold),
          double: rebuild(b[k].double),
        };
      });
      return nb;
    });
  }

  static getActiveStack(banks: Bank[], bankIndex: number, switchKey: string, action: ActionId): MacroStep[] {
    if (!banks[bankIndex] || !banks[bankIndex][switchKey] || !banks[bankIndex][switchKey][action]) {
      return [];
    }
    return banks[bankIndex][switchKey][action];
  }

  static addOrToggleStep(
    banks: Bank[],
    bankIndex: number,
    switchKey: string,
    action: ActionId,
    device: string,
    controlId: string,
    value: number | null,
    maxSteps: number = DEFAULT_MAX_STEPS,
    label?: string,
    actions: ActionDef[] = [],
  ): Bank[] {
    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bankIndex][switchKey][action];
    const at = list.findIndex((s) => s.device === device && s.control === controlId && s.value === value);

    if (at >= 0) {
      if (list[at].inst !== undefined) {
        MacroStackModel.detachIn(list, list[at].inst!, actions);
      }
      list.splice(at, 1);
      return next;
    }

    if (list.length >= maxSteps) return next;

    list.push({ device, control: controlId, value, ...(label ? { label } : {}) });
    return next;
  }

  static setKnobInBanks(
    banks: Bank[],
    bankIndex: number,
    switchKey: string,
    action: ActionId,
    device: string,
    controlId: string,
    value: number,
    maxSteps: number = DEFAULT_MAX_STEPS,
    actions: ActionDef[] = [],
  ): Bank[] {
    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bankIndex][switchKey][action];
    let at = -1;
    list.forEach((x, i) => {
      if (x.device === device && x.control === controlId) at = i;
    });
    if (at >= 0) {
      if (list[at].inst !== undefined) {
        MacroStackModel.detachIn(list, list[at].inst!, actions);
      }
      list[at] = { ...list[at], value };
      return next;
    }
    if (list.length < maxSteps) {
      list.push({ device, control: controlId, value });
    }
    return next;
  }

  static setValueAtInBanks(
    banks: Bank[],
    bankIndex: number,
    switchKey: string,
    action: ActionId,
    stepIndex: number,
    value: number | null,
    actions: ActionDef[] = [],
  ): Bank[] {
    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bankIndex][switchKey][action];
    if (!list[stepIndex]) return next;
    if (list[stepIndex].inst !== undefined) {
      MacroStackModel.detachIn(list, list[stepIndex].inst!, actions);
    }
    list[stepIndex] = { ...list[stepIndex], value };
    return next;
  }

  static addMacroTemplateSteps(
    banks: Bank[],
    bankIndex: number,
    switchKey: string,
    action: ActionId,
    device: string,
    steps: Array<{ controlId: string; value: number; label: string }>,
    maxSteps: number = DEFAULT_MAX_STEPS,
  ): Bank[] {
    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bankIndex][switchKey][action];
    for (const st of steps) {
      if (list.length >= maxSteps) break;
      list.push({ device, control: st.controlId, value: st.value, label: st.label });
    }
    return next;
  }

  static addOrUpdatePCStep(
    banks: Bank[],
    bankIndex: number,
    switchKey: string,
    action: ActionId,
    device: string,
    program: number,
    label?: string,
    maxSteps: number = DEFAULT_MAX_STEPS,
  ): Bank[] {
    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bankIndex][switchKey][action];
    const at = list.findIndex((s) => s.device === device && s.control === 'pc' && s.value === program && !s.set);

    if (at >= 0) {
      list.splice(at, 1);
      return next;
    }

    if (list.length >= maxSteps) return next;

    list.push({ device, control: 'pc', value: program, label: label || `PRESET ${program}` });
    return next;
  }

  static assignGuidedPCStep(
    banks: Bank[],
    bankIndex: number,
    switchKey: string,
    action: ActionId,
    device: string,
    channel: number,
    maxSteps: number = DEFAULT_MAX_STEPS,
  ): Bank[] {
    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bankIndex][switchKey][action];

    const existingIndex = list.findIndex((s) => s.device === device && s.control === 'pc');
    const pcStep: MacroStep = {
      device,
      control: 'pc',
      value: 0,
      label: `LEARN CH ${channel}`,
    };

    if (existingIndex >= 0) {
      list[existingIndex] = pcStep;
    } else if (list.length < maxSteps) {
      list.push(pcStep);
    }

    return next;
  }

  static removeStep(
    banks: Bank[],
    bankIndex: number,
    switchKey: string,
    action: ActionId,
    stepIndex: number,
    actions: ActionDef[] = [],
  ): Bank[] {
    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bankIndex][switchKey][action];
    if (stepIndex >= 0 && stepIndex < list.length) {
      if (list[stepIndex].inst !== undefined) {
        MacroStackModel.detachIn(list, list[stepIndex].inst!, actions);
      }
      list.splice(stepIndex, 1);
    }
    return next;
  }

  static moveStep(banks: Bank[], bankIndex: number, switchKey: string, action: ActionId, stepIndex: number, dir: -1 | 1): Bank[] {
    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bankIndex][switchKey][action];
    const j = stepIndex + dir;
    if (j >= 0 && j < list.length && stepIndex >= 0 && stepIndex < list.length) {
      const tmp = list[stepIndex];
      list[stepIndex] = list[j];
      list[j] = tmp;
    }
    return next;
  }

  static moveTo(banks: Bank[], bankIndex: number, switchKey: string, action: ActionId, fromIndex: number, toIndex: number): Bank[] {
    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bankIndex][switchKey][action];
    if (fromIndex >= 0 && fromIndex < list.length && toIndex >= 0 && toIndex < list.length) {
      const [item] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, item);
    }
    return next;
  }

  static countTotalAssignedSteps(banks: Bank[]): number {
    let total = 0;
    for (const bank of banks) {
      for (const key of Object.keys(bank)) {
        total += bank[key].press.length + bank[key].hold.length + bank[key].double.length;
      }
    }
    return total;
  }

  static usedDeviceIds(banks: Bank[]): string[] {
    const map: Record<string, boolean> = {};
    banks.forEach((b) => {
      Object.keys(b).forEach((k) => {
        ACTIONS.forEach(({ id: action }) => {
          b[k][action].forEach((s) => {
            map[s.device] = true;
          });
        });
      });
    });
    return Object.keys(map);
  }

  static usedControlIds(banks: Bank[], deviceId: string): string[] {
    const map: Record<string, boolean> = {};
    banks.forEach((b) => {
      Object.keys(b).forEach((k) => {
        ACTIONS.forEach(({ id: action }) => {
          b[k][action].forEach((s) => {
            if (s.device === deviceId && s.control !== 'pc') map[s.control] = true;
          });
        });
      });
    });
    return Object.keys(map);
  }
}
