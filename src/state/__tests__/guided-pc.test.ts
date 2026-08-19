import { describe, it, expect } from 'vitest';
import { StompStore } from '../store.js';
import { CompilerEngine } from '../../compiler/midi.js';

describe('Controller-Mediated Guided PC & Channel Learn Flow', () => {
  it('assigns guided PC 0 to active switch and updates pedal channel', () => {
    const store = new StompStore();
    store.addPedal('blooper');
    expect(store.state.channels['blooper']).toBe(1);

    // Select switch B, action 'press'
    store.selectKey('B');
    store.selectAction('press');

    // Assign guided PC on channel 5
    store.assignGuidedPC('blooper', 5);

    // State channel should be updated
    expect(store.state.channels['blooper']).toBe(5);

    // Active stack on switch B (press) should have a PC 0 step for blooper
    const stack = store.activeStack;
    expect(stack).toHaveLength(1);
    expect(stack[0]).toEqual({
      device: 'blooper',
      control: 'pc',
      value: 0,
      label: 'LEARN CH 5',
    });

    // Wire log should contain the guided assignment
    const lastLog = store.state.log[store.state.log.length - 1];
    expect(lastLog.text).toContain('assigned PC 0 on ch 5');
    expect(lastLog.sub).toContain('Switch B (press)');
  });

  it('compiles guided PC assignment to valid hardware exports', () => {
    const store = new StompStore();
    store.addPedal('blooper');
    store.selectKey('A');
    store.selectAction('press');
    store.assignGuidedPC('blooper', 6);

    // Compile to MC3
    const mc3Result = CompilerEngine.compile(store.state, 'mc3');
    const mc3Actions = (JSON.parse(mc3Result.exportFile.content)).presets[0].actions['Press'];
    expect(mc3Actions[0]).toEqual({
      type: 'Program Change',
      channel: 6,
      number: 0,
      label: 'LEARN CH 6',
    });

    // Compile to Scribble
    const scribbleResult = CompilerEngine.compile(store.state, 'scribble');
    const scribbleConfig = JSON.parse(scribbleResult.exportFile.content);
    const scribbleBank0 = (scribbleConfig.bankSettings || scribbleConfig.presetSettings)[0];
    const msg0 = scribbleBank0.presetMessages.messages[0];
    expect(msg0.statusByte).toBe(0xc0 + 5); // 0xC5 = 197 (Channel 6 PC)
    expect(msg0.dataByte1).toBe(0);
    expect(msg0.dataByte2).toBe(0);

    // Compile to Rig JSON
    const rigResult = CompilerEngine.compile(store.state, 'rig');
    const rigData = JSON.parse(rigResult.exportFile.content);
    expect(rigData.banks[0]['A'].actions['press'][0]).toEqual({
      pedal: 'blooper',
      control: 'pc',
      value: 0,
      label: 'LEARN CH 6',
    });
  });

  it('adds arbitrary preset recall PC steps via addPCStep', () => {
    const store = new StompStore();
    store.addPedal('mood');
    store.selectKey('C');
    store.selectAction('hold');

    store.addPCStep('mood', 14, 'LEAD RECALL');
    const stack = store.activeStack;
    expect(stack).toHaveLength(1);
    expect(stack[0]).toEqual({
      device: 'mood',
      control: 'pc',
      value: 14,
      label: 'LEAD RECALL',
    });

    // Updating / adding another preset step
    store.addPCStep('mood', 22);
    expect(store.activeStack).toHaveLength(2);
    expect(store.activeStack[1]).toEqual({
      device: 'mood',
      control: 'pc',
      value: 22,
      label: 'PRESET 22',
    });
  });

  it('opens and closes preset selection popover', () => {
    const store = new StompStore();
    store.openPresetPopover('blooper');
    expect(store.state.popoverControlId).toBe('pc');
    expect(store.state.browseDevice).toBe('blooper');

    store.closePopover();
    expect(store.state.popoverControlId).toBeNull();
  });
});
