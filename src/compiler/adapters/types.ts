import type { StompState } from '../../state/types.js';

export interface CompileLine {
  text: string;
  muted?: boolean;
  bold?: boolean;
}

export interface IssueItem {
  type: 'warn' | 'ok';
  text: string;
}

export interface TargetExportFile {
  filename: string;
  mimeType: string;
  content: string;
}

export interface TargetAdapter {
  id: string;
  name: string;
  compileExport(state: StompState): TargetExportFile;
  compilePreview(state: StompState): CompileLine[];
}

export interface CompilationResult {
  targetId: string;
  exportFile: TargetExportFile;
  preview: CompileLine[];
  diagnostics: IssueItem[];
}
