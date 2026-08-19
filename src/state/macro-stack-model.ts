// Macro Stack Domain Model — Pure functional domain logic for bank/switch/action
// macro stack transformations, immutability, step reordering, and step limits.

import { CONTROLLERS, ACTIONS, type ActionId } from '../data/controllers.js';
import type { Bank, MacroStep } from './types.js';

export const DEFAULT_MAX_STEPS = 8;

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
  private static cloneBanks(banks: Bank[]): Bank[] {
    return banks.map((bank) => {
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
  ): Bank[] {
    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bankIndex][switchKey][action];
    const at = list.findIndex((s) => s.device === device && s.control === controlId && s.value === value);

    if (at >= 0) {
      list.splice(at, 1);
      return next;
    }

    if (list.length >= maxSteps) return next;

    list.push({ device, control: controlId, value, ...(label ? { label } : {}) });
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
    const at = list.findIndex((s) => s.device === device && s.control === 'pc' && s.value === program);

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
    } else {
      if (list.length < maxSteps) {
        list.push(pcStep);
      }
    }

    return next;
  }

  static removeStep(banks: Bank[], bankIndex: number, switchKey: string, action: ActionId, stepIndex: number): Bank[] {
    const next = MacroStackModel.cloneBanks(banks);
    const list = next[bankIndex][switchKey][action];
    if (stepIndex >= 0 && stepIndex < list.length) {
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
            if (s.device === deviceId) map[s.control] = true;
          });
        });
      });
    });
    return Object.keys(map);
  }
}
