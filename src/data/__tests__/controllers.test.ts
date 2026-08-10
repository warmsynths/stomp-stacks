import { describe, it, expect } from 'vitest';
import { CONTROLLERS, CONTROLLER_ORDER, ACTIONS } from '../controllers.js';

describe('Controller Dictionary Data', () => {
  it('contains all required controllers in CONTROLLER_ORDER', () => {
    expect(CONTROLLER_ORDER).toEqual(['chocolate', 'mc3']);
    CONTROLLER_ORDER.forEach((id) => {
      expect(CONTROLLERS[id]).toBeDefined();
      expect(CONTROLLERS[id].id).toBe(id);
    });
  });

  it('defines valid switch keys, coordinates, and bank counts', () => {
    Object.values(CONTROLLERS).forEach((ctrl) => {
      expect(ctrl.keys.length).toBeGreaterThan(0);
      expect(ctrl.x.length).toBe(ctrl.keys.length);
      expect(ctrl.y.length).toBe(ctrl.keys.length);
      expect(ctrl.banks).toBeGreaterThan(0);
      expect(ctrl.height).toBeGreaterThan(0);
      expect(ctrl.heightDesktop).toBeGreaterThan(0);
      expect(ctrl.notes).toBeDefined();
      expect(ctrl.notes!.length).toBeGreaterThan(0);
    });
  });

  it('differentiates onboard macro capabilities', () => {
    expect(CONTROLLERS.chocolate.onboard).toBe(false);
    expect(CONTROLLERS.mc3.onboard).toBe(true);
    expect(CONTROLLERS.mc3.screen).toBe(true);
  });

  it('defines standard switch action triggers', () => {
    expect(ACTIONS).toEqual([
      { id: 'press', label: 'tap' },
      { id: 'hold', label: 'hold' },
      { id: 'double', label: 'double' },
    ]);
  });
});
