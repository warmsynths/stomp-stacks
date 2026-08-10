import type { StompState, MacroStep } from '../../state/types.js';
import { ACTIONS } from '../../data/controllers.js';
import { MAX_VALUE } from '../../data/devices.js';
import { HardwareRegistry } from '../../data/registry.js';
import type { TargetAdapter, TargetExportFile, CompileLine } from './types.js';

export function getUsedDeviceIds(state: StompState): string[] {
  const map: Record<string, boolean> = {};
  state.banks.forEach((b) => {
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

export function getUsedControlIds(state: StompState, deviceId: string): string[] {
  const map: Record<string, boolean> = {};
  state.banks.forEach((b) => {
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

export function compileRigJson(state: StompState) {
  const pedals: Record<string, any> = {};
  getUsedDeviceIds(state).forEach((id) => {
    const d = HardwareRegistry.getDevice(id);
    if (!d) return;
    const ccMap: Record<string, number> = {};
    getUsedControlIds(state, id).forEach((cid) => {
      const c = HardwareRegistry.getControl(id, cid);
      if (c) ccMap[cid] = c.cc;
    });
    pedals[id] = { name: d.name, channel: state.channels[id] || d.midiChannel, cc: ccMap };
  });

  return {
    schema: 'stomp-stacks/rig@1',
    controller: state.controllerId,
    brain: state.brainId,
    pedals,
    banks: state.banks.map((b) => {
      const outBank: Record<string, any> = {};
      Object.keys(b).forEach((k) => {
        const outActions: Record<string, any> = {};
        ACTIONS.forEach((a) => {
          if (b[k][a.id].length) {
            outActions[a.id] = b[k][a.id].map((s: MacroStep) => ({
              pedal: s.device,
              control: s.control,
              value: s.value === null || s.value === undefined ? MAX_VALUE : s.value,
            }));
          }
        });
        if (Object.keys(outActions).length) outBank[k] = outActions;
      });
      return outBank;
    }),
  };
}

export class RigTargetAdapter implements TargetAdapter {
  id = 'rig';
  name = 'Rig Schema JSON';

  compileExport(state: StompState): TargetExportFile {
    const json = compileRigJson(state);
    return {
      filename: `rig-stack-${state.controllerId}.json`,
      mimeType: 'application/json',
      content: JSON.stringify(json, null, 2),
    };
  }

  compilePreview(state: StompState): CompileLine[] {
    const json = compileRigJson(state);
    return JSON.stringify(json, null, 2)
      .split('\n')
      .map((line) => ({ text: line || ' ' }));
  }
}
