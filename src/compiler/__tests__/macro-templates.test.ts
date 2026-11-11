import { describe, it, expect } from 'vitest';
import { valueOptionsFor } from '../../data/devices.js';
import { HardwareRegistry } from '../../data/registry.js';
import { StompStore } from '../../state/store.js';
import { describeStep, compileMc3Json } from '../adapters/mc3.js';
import { compileHardwareScribbleConfig } from '../adapters/scribble.js';
import { compileRigJson } from '../adapters/rig.js';

describe('Deep MIDI Specs & Multi-Control CC Support', () => {
  it('supports discrete value options on footswitches and multi-control parameters', () => {
    const blooper = HardwareRegistry.getDevice('blooper')!;
    const recControl = blooper.controls.find((c) => c.id === 'record')!;

    expect(recControl).toBeDefined();
    expect(recControl.values).toBeDefined();
    expect(recControl.values?.length).toBeGreaterThan(0);

    const opts = valueOptionsFor(recControl);
    expect(opts[0]).toEqual({ label: 'record', value: 127, oledLabel: 'REC', cc: 1 });
    expect(opts[1]).toEqual({ label: 'play', value: 127, oledLabel: 'PLAY', cc: 2 });
    expect(opts[2]).toEqual({ label: 'overdub', value: 127, oledLabel: 'DUB', cc: 3 });
  });

  it('defines onboard footswitch lifecycle macroTemplates on devices', () => {
    const blooper = HardwareRegistry.getDevice('blooper')!;
    expect(blooper.macroTemplates).toBeDefined();
    expect(blooper.macroTemplates?.length).toBeGreaterThanOrEqual(1);

    const cycle = blooper.macroTemplates?.find((t) => t.id === 'blooper-rec-play-dub');
    expect(cycle).toBeDefined();
    expect(cycle?.steps).toHaveLength(3);
    expect(cycle?.steps[0]).toEqual({ controlId: 'record', value: 127, label: 'REC' });
    expect(cycle?.steps[1]).toEqual({ controlId: 'play', value: 127, label: 'PLAY' });
    expect(cycle?.steps[2]).toEqual({ controlId: 'overdub', value: 127, label: 'DUB' });
  });

  it('applies macro templates to action buckets via MacroStackModel and Store', () => {
    const store = new StompStore();
    store.setBrowseDevice('blooper');

    store.applyMacroTemplate('blooper-rec-play-dub');
    const active = store.activeStack;

    expect(active).toHaveLength(3);
    expect(active[0]).toEqual({ device: 'blooper', control: 'record', value: 127, label: 'REC' });
    expect(active[1]).toEqual({ device: 'blooper', control: 'play', value: 127, label: 'PLAY' });
    expect(active[2]).toEqual({ device: 'blooper', control: 'overdub', value: 127, label: 'DUB' });
  });
});

describe('Smart Compiler Step Sequencing', () => {
  it('generates dynamic OLED labels in describeStep', () => {
    const step1 = { device: 'blooper', control: 'record', value: 127, label: 'REC' };
    const desc1 = describeStep(step1);
    expect(desc1.stepLabel).toBe('REC');
    expect(desc1.cc).toBe(1);

    const step2 = { device: 'blooper', control: 'record', value: 127, label: 'PLAY' };
    const desc2 = describeStep(step2);
    expect(desc2.stepLabel).toBe('PLAY');
    expect(desc2.cc).toBe(2);
  });

  it('compiles macro steps into native controller MC3 JSON with dynamic labels', () => {
    const store = new StompStore();
    store.setBrowseDevice('blooper');
    store.applyMacroTemplate('blooper-rec-play-dub');

    const compiled = compileMc3Json(store.state);
    expect(compiled.presets).toHaveLength(1);

    const pressActions = compiled.presets[0].actions['Press'];
    expect(pressActions).toHaveLength(3);
    expect(pressActions[0]).toEqual({
      type: 'Control Change',
      channel: 1,
      cc: 1,
      value: 127,
      label: 'REC',
    });
    expect(pressActions[1].label).toBe('PLAY');
    expect(pressActions[2].label).toBe('DUB');
  });

  it('compiles hardware Scribble config with dynamic OLED secondary labels', () => {
    const store = new StompStore();
    store.setBrowseDevice('blooper');
    store.applyMacroTemplate('blooper-rec-play-dub');

    const config = compileHardwareScribbleConfig(store.state);
    const bank0 = config.bankSettings[0];

    expect(bank0.bankName).toContain('BLOOPER');
    expect(bank0.secondaryText.length).toBeGreaterThan(0);
  });

  it('compiles Rig JSON adapter with dynamic step labels', () => {
    const store = new StompStore();
    store.setBrowseDevice('blooper');
    store.applyMacroTemplate('blooper-rec-play-dub');

    const rigJson = compileRigJson(store.state);
    const pressSteps = rigJson.banks[0]['A'].actions['press'];

    expect(pressSteps).toHaveLength(3);
    expect(pressSteps[0]).toEqual({
      pedal: 'blooper',
      control: 'record',
      value: 127,
      label: 'REC',
    });
  });
});
