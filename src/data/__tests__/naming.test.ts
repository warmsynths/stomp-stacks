import { describe, it, expect } from 'vitest';
import { StompStore } from '../../state/store.js';
import { PALETTE, HEX, TEXTS, TEXTHEX, isDark } from '../naming.js';
import { compileRigJson } from '../../compiler/adapters/rig.js';
import { compileMc3Json } from '../../compiler/adapters/mc3.js';
import { compileScribbleMacroJson } from '../../compiler/adapters/scribble.js';

describe('Preset Naming & Color System', () => {
  it('provides complete color palette and hex mappings', () => {
    expect(PALETTE.length).toBe(10);
    expect(HEX.red).toBe('#ef5c4c');
    expect(HEX.cyan).toBe('#8fd0e6');
    expect(TEXTS.length).toBe(3);
    expect(TEXTHEX.ink).toBe('#16323d');
  });

  it('correctly calculates dark vs light luminance with isDark', () => {
    expect(isDark('#16323d')).toBe(true); // ink background -> cream text
    expect(isDark('#ffffff')).toBe(false); // white background -> ink text
    expect(isDark('#f7c948')).toBe(false); // yellow background -> ink text
  });

  it('computes autoName and ident metadata correctly', () => {
    const store = new StompStore();
    // Add step to switch A press
    store.addStep('volume', 64); // blooper volume

    const id1 = store.ident(0, 'A');
    expect(id1.name).toContain('blooper');
    expect(id1.color).toBeNull();
    expect(id1.textColor).toBe('cream');

    // Set custom naming
    store.setIdent({ name: 'WARM LOOPER', secondary: 'sub ambient', color: 'cyan', textColor: 'ink' }, 0, 'A');
    const id2 = store.ident(0, 'A');
    expect(id2.name).toBe('WARM LOOPER');
    expect(id2.secondary).toBe('sub ambient');
    expect(id2.color).toBe('cyan');
    expect(id2.textColor).toBe('ink');
  });

  it('maps colors correctly for hardware targets with colorFor', () => {
    const store = new StompStore();
    expect(store.colorFor('scribble', 'cyan')).toBe('cyan');
    expect(store.colorFor('mc3', 'cyan')).toBe('cyan');
    expect(store.colorFor('mc3', 'mint')).toBe('green'); // fallback mint -> green
    expect(store.colorFor('chocolate', 'cyan')).toBeNull(); // chocolate has no LED
  });

  it('includes naming & color metadata in rig.json compilation', () => {
    const store = new StompStore();
    store.addStep('volume', 64);
    store.setIdent({ name: 'MY PRESET', secondary: 'line 2', color: 'purple', textColor: 'cream' }, 0, 'A');

    const rig = compileRigJson(store.state);
    expect(rig.banks[0].A).toBeDefined();
    expect(rig.banks[0].A.name).toBe('MY PRESET');
    expect(rig.banks[0].A.secondary).toBe('line 2');
    expect(rig.banks[0].A.color).toBe('purple');
    expect(rig.banks[0].A.textColor).toBe('cream');
  });

  it('includes truncated name and mapped ledColour in mc3.json compilation', () => {
    const store = new StompStore();
    store.addStep('volume', 64);
    store.setIdent({ name: 'LONG PRESET NAME', color: 'mint' }, 0, 'A');

    const mc3 = compileMc3Json(store.state);
    expect(mc3.presets[0]).toBeDefined();
    expect(mc3.presets[0].name).toBe('LONG PRE'); // truncated to 8 chars
    expect(mc3.presets[0].ledColour).toBe('green'); // mint falls back to green on MC3
  });

  it('includes strip naming and hex colors in scribble.json compilation', () => {
    const store = new StompStore();
    store.addStep('volume', 64);
    store.setIdent({ name: 'SCRIBBLE STACK', secondary: 'sub', color: 'yellow', textColor: 'ink' }, 0, 'A');

    const scribble = compileScribbleMacroJson(store.state);
    expect(scribble.macros[0].strip).toBeDefined();
    expect(scribble.macros[0].strip.name).toBe('SCRIBBLE STA');
    expect(scribble.macros[0].strip.secondary).toBe('sub');
    expect(scribble.macros[0].strip.mainColour).toBe('#f7c948');
    expect(scribble.macros[0].strip.textColour).toBe('#16323d');
  });
});
