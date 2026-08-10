import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim, motionKeyframes } from '../styles/shared.js';
import { DEVICES } from '../data/devices.js';
import { ACTIONS } from '../data/controllers.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

@customElement('confirm-remove-modal')
export class ConfirmRemoveModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    motionKeyframes,
    css`
      .panel {
        width: 420px;
        max-width: 100%;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        overflow: hidden;
        box-shadow: 8px 8px 0 var(--ink);
      }
      .body {
        padding: 22px 24px 18px;
      }
      .head-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 11px;
      }
      .dot {
        width: 34px;
        height: 34px;
        flex: none;
        border-radius: 11px;
        border: 2.5px solid var(--ink);
      }
      .title {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .desc {
        font-size: 13px;
        line-height: 1.5;
        opacity: 0.7;
        text-wrap: pretty;
      }
      .foot {
        display: flex;
        justify-content: flex-end;
        gap: 9px;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
      }
      .btn-cancel {
        padding: 10px 16px;
        border-radius: 20px;
        font-size: 13.5px;
        opacity: 0.6;
        transition: opacity 150ms ease;
      }
      .btn-cancel:hover {
        opacity: 1;
      }
      .btn-remove {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--coral);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .btn-remove:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  private countStackedSteps(id: string): number {
    let count = 0;
    this.store.state.banks.forEach((b) => {
      Object.keys(b).forEach((k) => {
        ACTIONS.forEach((a) => {
          b[k][a.id].forEach((s) => {
            if (s.device === id) count++;
          });
        });
      });
    });
    return count;
  }

  render() {
    const st = this.store.state;
    if (!st.confirmRemovePedal) return null;

    const id = st.confirmRemovePedal;
    const d = DEVICES[id];
    if (!d) return null;

    const n = this.countStackedSteps(id);
    let bodyText = 'nothing is stacked on it yet, so nothing is lost. add it back any time.';
    if (n === 1) {
      bodyText =
        "1 step across your banks uses it. that step stays put, but it won't be sent until you add it back — the export will flag it.";
    } else if (n > 1) {
      bodyText = `${n} steps across your banks use it. those steps stay put, but they won't be sent until you add it back — the export will flag them.`;
    }

    return html`
      <div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this.store.setConfirmRemove(null)}>
        <div class="panel sheet-in">
          <div class="body">
            <div class="head-row">
              <span class="dot" style="background:${d.accent}"></span>
              <span class="title">take ${d.name} out?</span>
            </div>
            <div class="desc">${bodyText}</div>
          </div>
          <div class="foot">
            <button class="btn-cancel" @click=${() => this.store.setConfirmRemove(null)}>keep it</button>
            <button class="btn-remove" @click=${() => this.store.dropPedal(id)}>take it out</button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'confirm-remove-modal': ConfirmRemoveModal;
  }
}
