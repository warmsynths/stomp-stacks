import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim } from '../styles/shared.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import type { FaceMode } from '../state/types.js';

const FACE_TABS: Array<{ id: FaceMode; label: string }> = [
  { id: 'photo', label: 'photo' },
  { id: 'drawn', label: 'sketch' },
];

/** Settings behind the ⚙ — currently just the pedal-artwork toggle, structured
 * as a list of labelled groups so more settings can drop in later. */
@customElement('settings-modal')
export class SettingsModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    css`
      .panel {
        width: 440px;
        max-width: 100%;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        overflow: hidden;
        box-shadow: 8px 8px 0 var(--ink);
      }
      .head {
        padding: 22px 24px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .head-title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .body {
        padding: 20px 24px;
      }
      .group-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      .group-body {
        font-size: 12.5px;
        opacity: 0.6;
        margin-bottom: 12px;
        text-wrap: pretty;
      }
      .tabs {
        display: flex;
        gap: 8px;
      }
      .tab {
        flex: 1;
        padding: 11px 0;
        border-radius: 16px;
        font-size: 14px;
        font-weight: 600;
        border: 2.5px solid var(--ink);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .foot {
        display: flex;
        justify-content: flex-end;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
      }
      .btn-done {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .btn-done:active {
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

  render() {
    const st = this.store.state;
    if (!st.settingsOpen) return null;

    return html`
      <div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this.store.closeSettings()}>
        <div class="panel sheet-in">
          <div class="head"><div class="head-title">settings</div></div>
          <div class="body">
            <div class="group-title">pedal artwork</div>
            <div class="group-body">photos of the real pedals, or clean sketches with every control labelled.</div>
            <div class="tabs">
              ${FACE_TABS.map(
                (t) => html`
                  <button
                    class="tab"
                    style=${st.face === t.id ? 'background:var(--sky);box-shadow:2px 2px 0 var(--ink)' : 'background:transparent;opacity:.55'}
                    @click=${() => this.store.setFace(t.id)}
                  >
                    ${t.label}
                  </button>
                `,
              )}
            </div>
          </div>
          <div class="foot"><button class="btn-done" @click=${() => this.store.closeSettings()}>done</button></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-modal': SettingsModal;
  }
}
