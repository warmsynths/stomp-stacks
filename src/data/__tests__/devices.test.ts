import { describe, it, expect } from 'vitest';
import { DEVICES, DEVICE_ORDER, valueOptionsFor, KNOB_VALUES } from '../devices.js';

describe('Device Dictionary Data', () => {
  it('contains all required devices in DEVICE_ORDER', () => {
    expect(DEVICE_ORDER).toEqual(['blooper', 'mood', 'elcap']);
    DEVICE_ORDER.forEach((id) => {
      expect(DEVICES[id]).toBeDefined();
      expect(DEVICES[id].id).toBe(id);
    });
  });

  it('has valid MIDI channels and controls per device', () => {
    Object.values(DEVICES).forEach((device) => {
      expect(device.midiChannel).toBeGreaterThanOrEqual(1);
      expect(device.midiChannel).toBeLessThanOrEqual(16);
      expect(device.controls.length).toBeGreaterThan(0);

      const controlIds = new Set<string>();
      device.controls.forEach((control) => {
        expect(controlIds.has(control.id)).toBe(false);
        controlIds.add(control.id);
        expect(control.cc).toBeGreaterThanOrEqual(0);
        expect(control.cc).toBeLessThanOrEqual(127);
      });
    });
  });

  it('captures zero-based PC rules and hardware notes for Blooper', () => {
    const blooper = DEVICES.blooper;
    expect(blooper.pcOffset).toBe(0);
    expect(blooper.notes).toBeDefined();
    expect(blooper.notes!.length).toBeGreaterThan(0);
    const zeroPcNote = blooper.notes!.find((n) => n.includes('Zero-Based Program Changes'));
    expect(zeroPcNote).toBeDefined();
    expect(zeroPcNote).toContain('Loops 1-16 are saved and recalled using Program Changes 0-15');

    const trsNote = blooper.notes!.find((n) => n.includes('TRS MIDI Connection'));
    expect(trsNote).toContain('Chase Bliss MIDIBox');
  });

  it('maps official CC numbers for Blooper controls correctly', () => {
    const blooper = DEVICES.blooper;
    const findCc = (id: string) => blooper.controls.find((c) => c.id === id)?.cc;

    expect(findCc('volume')).toBe(14);
    expect(findCc('repeats')).toBe(15);
    expect(findCc('layers')).toBe(17);
    expect(findCc('stability')).toBe(18);
    expect(findCc('modA')).toBe(30);
    expect(findCc('modB')).toBe(31);
    expect(findCc('chA')).toBe(21);
    expect(findCc('mode')).toBe(22);
    expect(findCc('chB')).toBe(23);
    expect(findCc('undo')).toBe(5);
    expect(findCc('record')).toBe(1);
    expect(findCc('loop')).toBe(2);
  });

  it('maps official CC numbers for MOOD controls correctly', () => {
    const mood = DEVICES.mood;
    const findCc = (id: string) => mood.controls.find((c) => c.id === id)?.cc;

    expect(findCc('time')).toBe(14);
    expect(findCc('mix')).toBe(15);
    expect(findCc('length')).toBe(16);
    expect(findCc('modWet')).toBe(17);
    expect(findCc('clock')).toBe(18);
    expect(findCc('modMicro')).toBe(19);
    expect(findCc('wetmode')).toBe(21);
    expect(findCc('routing')).toBe(22);
    expect(findCc('micromode')).toBe(23);
    expect(findCc('wet')).toBe(103);
    expect(findCc('microloop')).toBe(102);

    expect(mood.notes).toBeDefined();
    expect(mood.notes!.some((n) => n.includes('CC 102') && n.includes('CC 103'))).toBe(true);
  });

  it('maps official CC numbers for El Capistan controls correctly', () => {
    const elcap = DEVICES.elcap;
    const findCc = (id: string) => elcap.controls.find((c) => c.id === id)?.cc;

    expect(findCc('time')).toBe(12);
    expect(findCc('wow')).toBe(13);
    expect(findCc('cmix')).toBe(14);
    expect(findCc('repeats')).toBe(15);
    expect(findCc('age')).toBe(16);
    expect(findCc('spring')).toBe(18);
    expect(findCc('head')).toBe(11);
    expect(findCc('cmode')).toBe(19);
    expect(findCc('tap')).toBe(93);
    expect(findCc('onoff')).toBe(102);

    expect(elcap.notes).toBeDefined();
    expect(elcap.notes!.some((n) => n.includes('BLUE'))).toBe(true);
  });

  it('returns default KNOB_VALUES for knobs without custom values option list', () => {
    const timeControl = DEVICES.mood.controls.find((c) => c.id === 'time')!;
    const opts = valueOptionsFor(timeControl);
    expect(opts).toEqual(KNOB_VALUES);
  });
});
