// The Compiler Engine — Bridges visual macro-stack state to raw MIDI bytes and
// multi-target hardware exports via Target Adapters.

import { ACTIONS } from '../data/controllers.js';
import { NAMING, PALETTE, type ColorName } from '../data/naming.js';
import { HardwareRegistry } from '../data/registry.js';
import type { StompState, PresetNaming } from '../state/types.js';
import type { TargetAdapter, CompilationResult, CompileLine, IssueItem, TargetExportFile } from './adapters/types.js';
import { RigTargetAdapter, compileRigJson, getUsedDeviceIds, getUsedControlIds } from './adapters/rig.js';
import { Mc3TargetAdapter, compileMc3Json, describeStep, type CompiledMessage, type DescribedStep } from './adapters/mc3.js';
import { ScribbleTargetAdapter, compileScribbleMacroJson, compileConfig, compileHardwareScribbleConfig, eachStack } from './adapters/scribble.js';
import { LabelsTargetAdapter } from './adapters/labels.js';
import { TraceTargetAdapter, hex } from './adapters/trace.js';

export type { CompiledMessage, DescribedStep, CompileLine, IssueItem, TargetExportFile, CompilationResult };
export { describeStep, getUsedDeviceIds as usedDeviceIds, getUsedControlIds as usedControlIds, eachStack, compileRigJson, compileMc3Json, compileScribbleMacroJson, compileConfig, compileHardwareScribbleConfig, hex };

export function hexByte(n: number): string {
  return '0x' + n.toString(16).toUpperCase().padStart(2, '0');
}

/** Registry of available target adapters. */
const ADAPTES_MAP: Record<string, TargetAdapter> = {
  rig: new RigTargetAdapter(),
  mc3: new Mc3TargetAdapter(),
  scribble: new ScribbleTargetAdapter(),
  labels: new LabelsTargetAdapter(),
  trace: new TraceTargetAdapter(),
};

/** Diagnostic validation engine for detecting stack depth, channel, and hardware mismatches. */
export function findIssues(state: StompState): IssueItem[] {
  const brain = HardwareRegistry.getBrain(state.brainId);
  const ctrl = HardwareRegistry.getController(state.controllerId);
  const out: IssueItem[] = [];

  let over = 0;
  let worst = 0;

  eachStack(state, (_bi, _k, _ki, _a, list) => {
    if (list.length > brain.maxSteps) {
      over++;
      if (list.length > worst) worst = list.length;
    }
  });

  if (over) {
    out.push({
      type: 'warn',
      text: `${over} stack${over === 1 ? '' : 's'} run to ${worst} messages — ${brain.full.toLowerCase()} sends ${brain.maxSteps}${
        state.brainId === 'none' ? '. this is the case for a brain.' : '. trim them or move up.'
      }`,
    });
  }

  if (state.banks.length > brain.banks) {
    out.push({
      type: 'warn',
      text: `${ctrl.name} has ${state.banks.length} banks; ${brain.full.toLowerCase()} holds ${brain.banks}.`,
    });
  }

  if (state.brainId === 'onboard' && !ctrl.onboard) {
    out.push({
      type: 'warn',
      text: `${ctrl.name} can't hold stacks onboard — it only sends one message per switch.`,
    });
  }

  const orphans = getUsedDeviceIds(state).filter((id) => !state.rig.includes(id));
  if (orphans.length) {
    out.push({
      type: 'warn',
      text: `${orphans.map((id) => HardwareRegistry.getDevice(id)?.name || id).join(' + ')} ${
        orphans.length === 1 ? 'is' : 'are'
      } stacked but no longer in the rig — those steps won't be sent.`,
    });
  }

  const collisions = HardwareRegistry.detectChannelCollisions(state.rig, state.channels);
  collisions.forEach(({ channel, devices }) => {
    out.push({
      type: 'warn',
      text: `${devices.join(' + ')} are both on channel ${channel} — their cc numbers will collide.`,
    });
  });

  if (state.targetId === 'mc3' && state.controllerId !== 'mc3') {
    out.push({
      type: 'warn',
      text: `building an mc3 preset, but the rig is set to ${ctrl.name}.`,
    });
  }

  if (state.targetId === 'scribble' && state.brainId !== 'scribble') {
    out.push({
      type: 'warn',
      text: `building a scribble config, but the brain is set to ${brain.full.toLowerCase()}.`,
    });
  }

  // Naming & color diagnostic checks
  const storeInstance = {
    state,
    namingTargets() {
      const ids = [state.controllerId];
      if (state.brainId === 'scribble') ids.push('scribble');
      return ids.filter((id) => NAMING[id]).map((id) => ({ ...NAMING[id] }));
    },
    displayTargets() {
      return this.namingTargets().filter((t) => t.name > 0);
    },
    sharedColors() {
      const lit = this.namingTargets().filter((t) => t.colors === null || t.colors.length > 0);
      if (!lit.length) return [];
      return PALETTE.map((p) => p[0]).filter((n) => lit.every((t) => t.colors === null || (t.colors && t.colors.includes(n))));
    },
  };

  const named: Array<{ name: string; secondary: string; color: ColorName | null; raw: PresetNaming }> = [];
  state.banks.forEach((b, bi) => {
    Object.keys(b).forEach((k) => {
      let n = 0;
      ACTIONS.forEach((a) => {
        n += b[k][a.id].length;
      });
      if (n) {
        const namingKey = `${bi}:${k}`;
        const raw = (state.naming && state.naming[namingKey]) || {};
        named.push({
          name: raw.name || '',
          secondary: raw.secondary || '',
          color: raw.color || null,
          raw,
        });
      }
    });
  });

  const displayTargets = storeInstance.displayTargets();
  displayTargets.forEach((t) => {
    const long = named.filter((id) => id.raw.name && id.name.length > t.name).length;
    if (long) {
      out.push({
        type: 'warn',
        text: `${long} ${long === 1 ? 'name is' : 'names are'} longer than the ${t.label.toLowerCase()} shows (${
          t.name
        } characters) — ${long === 1 ? 'it reads' : 'they read'} trimmed there.`,
      });
    }
    if (!t.secondary) {
      const sec = named.filter((id) => id.secondary).length;
      if (sec) {
        out.push({
          type: 'warn',
          text: `${sec} second ${sec === 1 ? 'line has' : 'lines have'} nowhere to go on the ${t.label.toLowerCase()} — ${
            sec === 1 ? 'it lands' : 'they land'
          } on the label sheet instead.`,
        });
      }
    }
  });

  const shared = storeInstance.sharedColors();
  const stray: Record<string, boolean> = {};
  named.forEach((id) => {
    if (id.color && (!shared.length || !shared.includes(id.color))) stray[id.color] = true;
  });
  Object.keys(stray).forEach((c) => {
    const colorName = c as ColorName;
    const cant = storeInstance.namingTargets().filter((t) => t.colors && t.colors.length && !t.colors.includes(colorName));
    if (cant.length) {
      out.push({
        type: 'warn',
        text: `${c} isn't in ${cant
          .map((t) => t.label.toLowerCase())
          .join(' or ')}'s palette — those stacks fall back to a compatible color there.`,
      });
    }
  });

  if (!out.length) {
    out.push({ type: 'ok', text: 'all clear — nothing collides, nothing overflows.' });
  }

  return out;
}

/** Legacy preview builder for backward compatibility. */
export function buildPreview(state: StompState): CompileLine[] {
  const adapter = ADAPTES_MAP[state.targetId] || ADAPTES_MAP['trace'];
  return adapter.compilePreview(state);
}

/** Main Compiler Engine entry point seam. */
export class CompilerEngine {
  static compile(state: StompState, targetId: string = state.targetId): CompilationResult {
    const adapter = ADAPTES_MAP[targetId] || ADAPTES_MAP['rig'];
    const exportFile = adapter.compileExport(state);
    const preview = adapter.compilePreview(state);
    const diagnostics = findIssues(state);

    return {
      targetId,
      exportFile,
      preview,
      diagnostics,
    };
  }

  static getAdapter(targetId: string): TargetAdapter {
    return ADAPTES_MAP[targetId] || ADAPTES_MAP['rig'];
  }
}

export const compile = CompilerEngine.compile;
