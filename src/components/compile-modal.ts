import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim } from '../styles/shared.js';
import { CONTROLLERS } from '../data/controllers.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import { compileConfig, compileLines } from '../compiler/midi.js';
import { downloadJson } from '../compiler/download.js';

/** "cook it up" result: a readable preview of the compiled MIDI messages, and
 * a button that downloads the actual preset config.json. */
@customElement('compile-modal')
export class CompileModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    css`
      .scrim {
        align-items: flex-end;
      }
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
      .head {
        flex: none;
        padding: 20px 20px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .head-title {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .head-meta {
        font-size: 12px;
        opacity: 0.65;
        margin-top: 4px;
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
      .foot {
        flex: none;
        display: flex;
        gap: 10px;
        padding: 14px 20px 20px;
        border-top: 2.5px solid var(--ink);
      }
      .btn-close {
        flex: 1;
        padding: 12px;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
        font-size: 14px;
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
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
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
