import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim, motionKeyframes } from '../styles/shared.js';
import { CONTROLLERS } from '../data/controllers.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import { compileConfig, compileLines } from '../compiler/midi.js';
import { downloadJson } from '../compiler/download.js';

/** "cook it up" result: a readable preview of the compiled MIDI messages, and
 * a button that downloads the actual preset config.json. Docks as a bottom
 * sheet on tablet/phone (Mobile) and floats centered on desktop (Whimsy). */
@customElement('compile-modal')
export class CompileModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    motionKeyframes,
    css`
      .panel {
        width: 100%;
        max-width: 620px;
        max-height: 86vh;
        display: flex;
        flex-direction: column;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 24px 24px 0 0;
        overflow: hidden;
      }
      :host([desktop]) .scrim {
        align-items: center;
      }
      :host([desktop]) .panel {
        width: 680px;
        max-width: 92vw;
        max-height: none;
        border-radius: 26px;
        box-shadow: 8px 8px 0 var(--ink);
      }
      .head {
        flex: none;
        padding: 20px 20px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      :host([desktop]) .head {
        padding: 24px 26px 18px;
      }
      .head-title {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      :host([desktop]) .head-title {
        font-size: 20px;
      }
      .head-meta {
        font-size: 12px;
        opacity: 0.65;
        margin-top: 4px;
      }
      :host([desktop]) .head-meta {
        font-size: 12.5px;
        margin-top: 5px;
      }
      .lines {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 14px 20px;
        font-family: var(--mono);
        font-size: 11px;
        line-height: 1.75;
      }
      :host([desktop]) .lines {
        flex: none;
        max-height: 320px;
        padding: 16px 26px;
        font-size: 11.5px;
        line-height: 1.8;
      }
      .foot {
        flex: none;
        display: flex;
        gap: 10px;
        padding: 14px 20px 20px;
        border-top: 2.5px solid var(--ink);
      }
      :host([desktop]) .foot {
        justify-content: flex-end;
        padding: 18px 26px;
      }
      .btn-close {
        flex: 1;
        padding: 12px;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
        font-size: 14px;
      }
      :host([desktop]) .btn-close {
        flex: none;
        padding: 10px 16px;
        border: 0;
        opacity: 0.6;
        transition: opacity 150ms ease;
      }
      :host([desktop]) .btn-close:hover {
        opacity: 1;
      }
      .btn-grab {
        flex: 2;
        padding: 12px;
        border-radius: 20px;
        background: var(--sky);
        border: 2.5px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .btn-grab:active {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 var(--ink);
      }
      :host([desktop]) .btn-grab {
        flex: none;
        padding: 10px 20px;
        border-radius: 22px;
        box-shadow: 3px 3px 0 var(--ink);
      }
      :host([desktop]) .btn-grab:active {
        box-shadow: 1px 1px 0 var(--ink);
      }
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  @property({ type: Boolean, reflect: true }) desktop = false;
  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  render() {
    const st = this.store.state;
    if (!st.compileOpen) return null;

    const total = this.store.totalAssigned;
    const meta = `${total} ${total === 1 ? 'message' : 'messages'} across ${st.banks.length} banks · ${CONTROLLERS[st.controllerId].name} · per-device midi channels`;

    return html`
      <div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this.store.closeCompile()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="head-title">one stomp stacks config, freshly cooked</div>
            <div class="head-meta">${meta}</div>
          </div>
          <div class="lines">
            ${compileLines(st).map(
              (l) => html`<div style=${l.muted ? 'opacity:.4' : l.bold ? 'font-weight:500' : 'opacity:.8'}>${l.text}</div>`,
            )}
          </div>
          <div class="foot">
            <button class="btn-close" @click=${() => this.store.closeCompile()}>close</button>
            <button class="btn-grab" @click=${() => downloadJson('stomp-stacks-preset.config.json', compileConfig(st))}>
              grab preset.json
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
