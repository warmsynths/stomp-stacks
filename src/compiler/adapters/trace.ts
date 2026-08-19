import type { StompState } from '../../state/types.js';
import { describeStep } from './mc3.js';
import { eachStack } from './scribble.js';
import type { TargetAdapter, TargetExportFile, CompileLine } from './types.js';

export const hex = (n: number) => n.toString(16).toUpperCase().padStart(2, '0');

export class TraceTargetAdapter implements TargetAdapter {
  id = 'trace';
  name = 'MIDI Trace Log';

  compileExport(state: StompState): TargetExportFile {
    const lines = this.compilePreview(state);
    return {
      filename: `midi-trace-${state.controllerId}.txt`,
      mimeType: 'text/plain',
      content: lines.map((l) => l.text).join('\n'),
    };
  }

  compilePreview(state: StompState): CompileLine[] {
    const out: CompileLine[] = [];
    const push = (t: string, opts?: { muted?: boolean; bold?: boolean }) => {
      out.push({ text: t === '' ? ' ' : t, ...opts });
    };

    eachStack(state, (bi, k, _ki, a, l) => {
      push(`▸ bank ${bi + 1} · ${k} ${a.label}`, { bold: true });
      l.forEach((s) => {
        const d = describeStep(s, state.channels);
        push(`    ${hex(d.message.statusByte)} ${hex(d.message.dataByte1)} ${hex(d.message.dataByte2)}    ${d.deviceName} ${d.label}`, { muted: true });
      });
      push('');
    });

    if (!out.length) push('nothing stacked yet — go poke a pedal', { muted: true });
    return out;
  }
}
