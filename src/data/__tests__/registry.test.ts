import { describe, it, expect } from 'vitest';
import { HardwareRegistry } from '../registry.js';

describe('HardwareRegistry', () => {
  it('resolves devices, controllers, brains, and targets', () => {
    expect(HardwareRegistry.getDevice('blooper')?.name).toBe('blooper');
    expect(HardwareRegistry.getController('chocolate')?.keys).toEqual(['A', 'B', 'C', 'D']);
    expect(HardwareRegistry.getBrain('scribble')?.maxSteps).toBe(8);
    expect(HardwareRegistry.getTarget('rig')?.label).toBe('rig.json');
  });

  it('performs O(1) control lookup across devices', () => {
    const ctrl = HardwareRegistry.getControl('blooper', 'volume');
    expect(ctrl?.cc).toBe(14);
    expect(ctrl?.label).toBe('Ramp / Volume');

    const missing = HardwareRegistry.getControl('blooper', 'nonexistent');
    expect(missing).toBeUndefined();
  });

  it('formats control labels with optional discrete value labels', () => {
    expect(HardwareRegistry.formatControlLabel('blooper', 'volume', 64)).toBe('Ramp / Volume · noon');
    expect(HardwareRegistry.formatControlLabel('blooper', 'record', null)).toBe('Record');
  });

  it('finds next available MIDI channel without collisions', () => {
    const rig = ['blooper', 'mood', 'elcap'];
    const channels = { blooper: 1, mood: 2, elcap: 3 };
    expect(HardwareRegistry.findNextFreeChannel(rig, channels)).toBe(4);
  });

  it('detects channel collisions accurately', () => {
    const rig = ['blooper', 'mood'];
    const channels = { blooper: 1, mood: 1 };
    const collisions = HardwareRegistry.detectChannelCollisions(rig, channels);
    expect(collisions).toHaveLength(1);
    expect(collisions[0].channel).toBe(1);
    expect(collisions[0].devices).toEqual(['blooper', 'MOOD']);
  });

  it('converts device accent hex to RGB integer', () => {
    const intVal = HardwareRegistry.getDeviceAccentColorInt('blooper');
    expect(intVal).toBe(9425126); // #8fd0e6 -> 0x8FD0E6 -> 9425126
  });
});
