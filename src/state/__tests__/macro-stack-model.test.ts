import { describe, it, expect } from 'vitest';
import { MacroStackModel } from '../macro-stack-model.js';

describe('MacroStackModel', () => {
  it('creates empty banks based on controller ID', () => {
    const chocolateBanks = MacroStackModel.createBanks('chocolate');
    expect(chocolateBanks).toHaveLength(4);
    expect(Object.keys(chocolateBanks[0])).toEqual(['A', 'B', 'C', 'D']);

    const mc3Banks = MacroStackModel.createBanks('mc3');
    expect(mc3Banks).toHaveLength(3);
    expect(Object.keys(mc3Banks[0])).toEqual(['A', 'B', 'C']);
  });

  it('adds and toggles steps maintaining immutability', () => {
    const initial = MacroStackModel.createBanks('chocolate');
    const stepAdded = MacroStackModel.addOrToggleStep(initial, 0, 'A', 'press', 'blooper', 'volume', 64);

    expect(MacroStackModel.getActiveStack(stepAdded, 0, 'A', 'press')).toHaveLength(1);
    expect(MacroStackModel.getActiveStack(initial, 0, 'A', 'press')).toHaveLength(0);

    // Toggling the exact same step removes it
    const stepToggledOff = MacroStackModel.addOrToggleStep(stepAdded, 0, 'A', 'press', 'blooper', 'volume', 64);
    expect(MacroStackModel.getActiveStack(stepToggledOff, 0, 'A', 'press')).toHaveLength(0);
  });

  it('enforces maximum step limit', () => {
    let banks = MacroStackModel.createBanks('chocolate');
    for (let i = 0; i < 10; i++) {
      banks = MacroStackModel.addOrToggleStep(banks, 0, 'A', 'press', 'blooper', `control-${i}`, i, 8);
    }
    expect(MacroStackModel.getActiveStack(banks, 0, 'A', 'press')).toHaveLength(8);
  });

  it('moves steps within a stack correctly', () => {
    let banks = MacroStackModel.createBanks('chocolate');
    banks = MacroStackModel.addOrToggleStep(banks, 0, 'A', 'press', 'blooper', 'volume', 64);
    banks = MacroStackModel.addOrToggleStep(banks, 0, 'A', 'press', 'mood', 'length', 32);

    const moved = MacroStackModel.moveStep(banks, 0, 'A', 'press', 0, 1);
    const stack = MacroStackModel.getActiveStack(moved, 0, 'A', 'press');
    expect(stack[0].device).toBe('mood');
    expect(stack[1].device).toBe('blooper');
  });

  it('counts total assigned steps across all banks and switches', () => {
    let banks = MacroStackModel.createBanks('chocolate');
    banks = MacroStackModel.addOrToggleStep(banks, 0, 'A', 'press', 'blooper', 'volume', 64);
    banks = MacroStackModel.addOrToggleStep(banks, 1, 'B', 'hold', 'mood', 'length', 32);
    expect(MacroStackModel.countTotalAssignedSteps(banks)).toBe(2);
  });
});
