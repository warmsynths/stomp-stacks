import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim, motionKeyframes } from '../styles/shared.js';
import { CONTROLLERS } from '../data/controllers.js';
import { BRAINS } from '../data/brains.js';
import { DEVICES } from '../data/devices.js';
import { TARGETS } from '../data/targets.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import {
  buildPreview,
  findIssues,
  compileRigJson,
  compileScribbleMacroJson,
  compileMc3Json,
} from '../compiler/midi.js';
import { downloadJson, downloadText } from '../compiler/download.js';

@customElement('compile-modal')
export class CompileModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    motionKeyframes,
    css`
      .panel {
        width: 880px;
        max-width: 100%;
        max-height: 88vh;
        display: flex;
        flex-direction: column;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        box-shadow: 8px 8px 0 var(--ink);
        overflow: hidden;
      }
      :host([phone]) .panel {
        width: 100%;
        border-radius: 24px 24px 0 0;
        box-shadow: none;
      }
      :host([phone]) .scrim {
        align-items: flex-end;
        padding: 0;
      }
      .head {
        flex: none;
        padding: 20px 24px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .meta {
        font-size: 12.5px;
        opacity: 0.65;
        margin-top: 5px;
        text-wrap: pretty;
      }
      .body {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: row;
      }
      :host([phone]) .body {
        flex-direction: column;
      }
      .targets-sidebar {
        width: 216px;
        flex: none;
        display: flex;
        flex-direction: column;
        gap: 7px;
        padding: 14px;
        border-right: 2.5px solid var(--ink);
        background: var(--paper);
      }
      :host([phone]) .targets-sidebar {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 7px;
        padding: 12px 16px;
        overflow-x: auto;
        border-right: 0;
        border-bottom: 2.5px solid var(--ink);
      }
      .target-btn {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1px;
        flex: none;
        white-space: nowrap;
        padding: 9px 11px;
        border-radius: 14px;
        text-align: left;
        border: 2.5px solid var(--ink);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .target-btn[active] {
        background: var(--card);
        box-shadow: 3px 3px 0 var(--ink);
      }
      .target-btn:not([active]) {
        background: transparent;
        border-color: rgba(22, 50, 61, 0.22);
        opacity: 0.62;
      }
      .target-label {
        font-size: 13.5px;
        font-weight: 600;
      }
      .target-sub {
        font-family: var(--mono);
        font-size: 10px;
        opacity: 0.6;
      }
      .main-content {
        flex: 1;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .preview-area {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 16px 24px;
        font-family: var(--mono);
        font-size: 11.5px;
        line-height: 1.75;
        height: 318px;
        white-space: pre-wrap;
      }
      .issues-box {
        flex: none;
        border-top: 2.5px solid var(--ink);
        padding: 12px 20px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        background: var(--card);
      }
      .issue-row {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        font-size: 12px;
        line-height: 1.45;
      }
      .issue-dot {
        width: 9px;
        height: 9px;
        flex: none;
        margin-top: 4px;
        border-radius: 3px;
        border: 2px solid var(--ink);
      }
      .foot {
        flex: none;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 20px;
        border-top: 2.5px solid var(--ink);
        background: var(--card);
      }
      .target-note {
        font-family: var(--mono);
        font-size: 11px;
        opacity: 0.5;
      }
      :host([phone]) .target-note {
        display: none;
      }
      .spacer {
        flex: 1;
      }
      .btn-close {
        padding: 10px 16px;
        border-radius: 20px;
        font-size: 13.5px;
        opacity: 0.6;
        transition: opacity 150ms ease;
      }
      .btn-close:hover {
        opacity: 1;
      }
      .btn-download {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--sky);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .btn-download:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  @property({ type: Boolean, reflect: true }) phone = false;
  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  private handleDownload() {
    const st = this.store.state;
    const target = st.targetId;

    if (target === 'rig') {
      downloadJson('rig.json', compileRigJson(st));
    } else if (target === 'scribble') {
      downloadJson('scribble.json', compileScribbleMacroJson(st));
    } else if (target === 'mc3') {
      downloadJson('mc3-preset.json', compileMc3Json(st));
    } else {
      const lines = buildPreview(st).map((l) => l.text).join('\n');
      const filename = target === 'labels' ? 'pedalboard-labels.txt' : 'midi-trace.log';
      downloadText(filename, lines);
    }
  }

  render() {
    const st = this.store.state;
    if (!st.compileOpen) return null;

    const total = this.store.totalAssigned;
    const ctrl = CONTROLLERS[st.controllerId];
    const brain = BRAINS[st.brainId];
    const pedalNames = st.rig.length ? st.rig.map((id) => DEVICES[id]?.name || id).join(', ') : 'no pedals yet';
    const compileMeta = `${total} ${total === 1 ? 'message' : 'messages'} · ${ctrl.short} → ${brain.short} → ${pedalNames}`;

    const currentTargetDef = TARGETS.find((t) => t.id === st.targetId) || TARGETS[0];
    const lines = buildPreview(st);
    const issues = findIssues(st);

    return html`
      <div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this.store.closeCompile()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">one stomp stacks config, freshly cooked</div>
            <div class="meta">${compileMeta}</div>
          </div>
          <div class="body">
            <div class="targets-sidebar">
              ${TARGETS.map(
                (t) => html`
                  <button
                    class="target-btn"
                    ?active=${st.targetId === t.id}
                    @click=${() => this.store.setTarget(t.id)}
                  >
                    <span class="target-label">${t.label}</span>
                    <span class="target-sub">${t.sub}</span>
                  </button>
                `,
              )}
            </div>
            <div class="main-content">
              <div class="preview-area">
                ${lines.map(
                  (l) => html`<div style=${l.muted ? 'white-space:pre;opacity:.42' : l.bold ? 'white-space:pre;font-weight:600' : 'white-space:pre;opacity:.85'}>${l.text}</div>`,
                )}
              </div>
              <div class="issues-box">
                ${issues.map(
                  (i) => html`
                    <div class="issue-row" style=${i.type === 'ok' ? 'opacity:.6' : ''}>
                      <span class="issue-dot" style="background:${i.type === 'ok' ? '#5bb85b' : 'var(--mustard)'}"></span>
                      <span style="flex:1;text-wrap:pretty">${i.text}</span>
                    </div>
                  `,
                )}
              </div>
            </div>
          </div>
          <div class="foot">
            <span class="target-note">${currentTargetDef.note}</span>
            <span class="spacer"></span>
            <button class="btn-close" @click=${() => this.store.closeCompile()}>close</button>
            <button class="btn-download" @click=${() => this.handleDownload()}>
              grab ${currentTargetDef.label}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'compile-modal': CompileModal;
  }
}
