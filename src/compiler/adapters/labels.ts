import type { StompState } from '../../state/types.js';
import { HardwareRegistry } from '../../data/registry.js';
import { describeStep } from './mc3.js';
import { eachStack } from './scribble.js';
import type { TargetAdapter, TargetExportFile, CompileLine } from './types.js';

export class LabelsTargetAdapter implements TargetAdapter {
  id = 'labels';
  name = 'Printable Labels';

  compileExport(state: StompState): TargetExportFile {
    const lines = this.compilePreview(state);
    return {
      filename: `stomp-labels-${state.controllerId}.txt`,
      mimeType: 'text/plain',
      content: lines.map((l) => l.text).join('\n'),
    };
  }

  compilePreview(state: StompState): CompileLine[] {
    const out: CompileLine[] = [];
    const push = (t: string, opts?: { muted?: boolean; bold?: boolean }) => {
      out.push({ text: t === '' ? ' ' : t, ...opts });
    };

    const ctrl = HardwareRegistry.getController(state.controllerId);
    const brain = HardwareRegistry.getBrain(state.brainId);

    push(`STOMP STACKS · ${ctrl.name}`, { bold: true });
    push(`via ${brain.full.toLowerCase()}`, { muted: true });

    eachStack(state, (bi, k, _ki, a, l) => {
      const namingKey = `${bi}:${k}`;
      const n = (state.naming && state.naming[namingKey]) || {};
      const name = n.name || `switch ${k}`;

      push('');
      push(`${name}  ·  ${a.label}`, { bold: true });
      if (n.secondary) push(n.secondary);
      push(`bank ${bi + 1} · switch ${k}${n.color ? ` · ${n.color}` : ''}`, { muted: true });
      l.forEach((s, i) => {
        const d = describeStep(s, state.channels);
        push(`   ${i + 1}. ${d.deviceName} — ${d.label}`);
      });
    });

    if (!out.length) push('nothing stacked yet — go poke a pedal', { muted: true });
    return out;
  }
}
