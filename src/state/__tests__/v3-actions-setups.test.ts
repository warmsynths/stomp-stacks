import { describe, it, expect, beforeEach } from 'vitest';
import { knobWord, wiggleInfo, clash, stepRole } from '../macro-stack-model.js';
import { StompStore } from '../store.js';
import { setupsCompatible, SEED_SETS, type PedalSetup } from '../../data/setups.js';
import type { MacroStep } from '../types.js';

describe('v3 Domain Model: Clash, Wiggle, Linked Actions & Set-ups', () => {
  describe('knobWord', () => {
    it('translates 0-127 MIDI values into readable clock positions', () => {
      expect(knobWord(0)).toBe('min');
      expect(knobWord(32)).toBe("9 o'clock");
      expect(knobWord(64)).toBe('noon');
      expect(knobWord(96)).toBe("3 o'clock");
      expect(knobWord(127)).toBe('max');
    });
  });

  describe('wiggleInfo & stepRole', () => {
    it('computes wiggle range and step roles when a Set-up preset is loaded', () => {
      const stack: MacroStep[] = [
        { device: 'mood', control: 'pc', value: 1, set: 'clockwig' },
        { device: 'mood', control: 'clock', value: 64 },
        { device: 'mood', control: 'mix', value: 96 },
      ];
      const info = wiggleInfo(stack, SEED_SETS);
      expect(info).not.toBeNull();
      expect(info?.knobId).toBe('clock');
      expect(info?.lo).toBe(64);
      expect(info?.hi).toBe(127);
      expect(info?.bounce).toBe(true);
      expect(info?.speed).toBe(96);

      expect(stepRole(stack, stack[0], SEED_SETS)).toContain('loads the switches');
      expect(stepRole(stack, stack[1], SEED_SETS)).toContain('where the movement starts');
      expect(stepRole(stack, stack[2], SEED_SETS)).toContain('speed');
    });

    it('returns null when no Set-up PC step is present', () => {
      const stack: MacroStep[] = [
        { device: 'mood', control: 'clock', value: 64 },
      ];
      expect(wiggleInfo(stack, SEED_SETS)).toBeNull();
    });
  });

  describe('clash (ADR-0002)', () => {
    it('detects same-control overwrite later in the stack', () => {
      const stack: MacroStep[] = [
        { device: 'mood', control: 'clock', value: 48, inst: 1, act: 'a1' },
        { device: 'mood', control: 'clock', value: 96, inst: 2, act: 'a2' },
      ];
      const c0 = clash(stack, 0, SEED_SETS);
      expect(c0?.kind).toBe('over');
      expect(c0?.text).toContain('overridden by 2');
    });

    it('detects when a later PC message wipes earlier CC tweaks on the same pedal', () => {
      const stack: MacroStep[] = [
        { device: 'mood', control: 'clock', value: 96 },
        { device: 'mood', control: 'pc', value: 1, set: 'clockwig' },
      ];
      const c0 = clash(stack, 0, SEED_SETS);
      expect(c0?.kind).toBe('over');
      expect(c0?.text).toContain('preset load at 2 replaces this');
    });

    it('detects when a later knob tweak shifts where an earlier Set-up wiggle starts', () => {
      const stack: MacroStep[] = [
        { device: 'mood', control: 'pc', value: 1, set: 'clockwig', inst: 1 },
        { device: 'mood', control: 'clock', value: 96, inst: 2 },
      ];
      const c1 = clash(stack, 1, SEED_SETS);
      expect(c1?.kind).toBe('wig');
      expect(c1?.text).toContain('moves where “clock wiggle” starts');
    });

    it('detects Set-up disagreement between two PC loads on the same pedal', () => {
      const compatB: PedalSetup = {
        id: 'modwig',
        device: 'mood',
        name: 'modify wiggle',
        slot: 2,
        saved: false,
        move: { modWet: true },
        fall: {},
        bounce: true,
        sweep: 'top',
        shape: 'tri',
      };
      const sets = [...SEED_SETS, compatB];
      const stack: MacroStep[] = [
        { device: 'mood', control: 'pc', value: 1, set: 'clockwig', inst: 1 },
        { device: 'mood', control: 'pc', value: 2, set: 'modwig', inst: 2 },
      ];
      const c0 = clash(stack, 0, sets);
      expect(c0?.kind).toBe('over');
      expect(c0?.merge).toBe(1);
    });
  });

  describe('Set-ups compatibility & merging', () => {
    it('allows merging compatible Set-ups that share bounce/sweep/shape', () => {
      const sA = SEED_SETS.find((s) => s.id === 'bloopmodwig')!;
      const sB = SEED_SETS.find((s) => s.id === 'bloopwearwig')!;
      expect(setupsCompatible(sA, sB)).toBe(true);

      const sIncompat = SEED_SETS.find((s) => s.id === 'smearswell')!; // bounce: false vs clockwig bounce: true
      const sClock = SEED_SETS.find((s) => s.id === 'clockwig')!;
      expect(setupsCompatible(sClock, sIncompat)).toBe(false);
    });

    it('merges two compatible Set-ups in StompStore and combines their moving knobs', () => {
      const store = new StompStore();
      store.state.banks[0]['A']['press'] = [
        { device: 'blooper', control: 'pc', value: 1, set: 'bloopmodwig' },
        { device: 'blooper', control: 'pc', value: 2, set: 'bloopwearwig' },
      ];

      store.mergeSetups(0, 1);
      const merged = store.state.pedalSets.find((s) => s.name.includes('+'));
      expect(merged).toBeDefined();
      expect(merged?.move.modA).toBe(true);
      expect(merged?.move.stability).toBe(true);
      expect(store.activeStack).toHaveLength(1);
      expect(store.activeStack[0].set).toBe(merged?.id);
    });
  });

  describe('Linked Actions (ADR-0001)', () => {
    let store: StompStore;
    beforeEach(() => {
      store = new StompStore();
      store.state.banks[0]['A']['press'] = [];
    });

    it('inserts an Action with a shared inst ID and syncs edits across banks', () => {
      store.insertAction('a1');
      let stack = store.activeStack;
      expect(stack.length).toBeGreaterThanOrEqual(2);
      const inst = stack[0].inst;
      expect(inst).toBeDefined();
      expect(stack[0].act).toBe('a1');
      expect(stack[1].inst).toBe(inst);

      // Update action a1 and verify the linked instance updates automatically
      store.updateAction('a1', (a) => ({
        ...a,
        steps: [
          { device: 'blooper', control: 'record', value: 127 },
          { device: 'blooper', control: 'volume', value: 110 },
        ],
      }));
      stack = store.activeStack;
      expect(stack[1].value).toBe(110);
    });

    it('auto-detaches a linked group when a step value is edited in the slot', () => {
      store.insertAction('a1');
      expect(store.activeStack[0].act).toBe('a1');

      store.setValueAt(0, 50);
      const stack = store.activeStack;
      expect(stack[0].act).toBeUndefined();
      expect(stack[0].inst).toBeUndefined();
      expect(stack[0].from).toBeDefined();
      expect(stack[0].value).toBe(50);
    });
  });
});
