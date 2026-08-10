import { describe, it, expect } from 'vitest';
import { BRAINS, BRAIN_ORDER } from '../brains.js';

describe('Brain Dictionary Data', () => {
  it('contains all required brains in BRAIN_ORDER', () => {
    expect(BRAIN_ORDER).toEqual(['scribble', 'onboard', 'none']);
    BRAIN_ORDER.forEach((id) => {
      expect(BRAINS[id]).toBeDefined();
      expect(BRAINS[id].id).toBe(id);
    });
  });

  it('defines valid step limits, bank capacity, and documentation notes', () => {
    Object.values(BRAINS).forEach((brain) => {
      expect(brain.maxSteps).toBeGreaterThanOrEqual(1);
      expect(brain.banks).toBeGreaterThan(0);
      expect(brain.notes).toBeDefined();
      expect(brain.notes!.length).toBeGreaterThan(0);
    });
  });

  it('correctly sets step caps per brain profile', () => {
    expect(BRAINS.scribble.maxSteps).toBe(8);
    expect(BRAINS.onboard.maxSteps).toBe(6);
    expect(BRAINS.none.maxSteps).toBe(1);
  });
});
