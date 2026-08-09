import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton } from '../styles/shared.js';
import { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

import './controller-graphic.js';
import './device-tabs.js';
import './pedal-canvas.js';
import './macro-panel.js';
import './compile-modal.js';
import './settings-modal.js';
import './controller-picker-modal.js';

const PHONE_BREAKPOINT = 760;

/** App root: owns the single StompStore instance, the responsive shell
 * (phone gets a bottom-sheet macro panel, tablet/desktop a side rail), the
 * header, and the three modals. */
@customElement('stomp-app')
export class StompApp extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    css`
      :host {
        display: block;
        height: 100vh;
      }
      .root {
        height: 100vh;
        display: flex;
        flex-direction: column;
        background: var(--paper);
        background-image: radial-gradient(#16323d1f 1.4px, transparent 1.4px);
        background-size: 22px 22px;
        overflow: hidden;
      }
      header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 14px;
        height: 56px;
        flex: none;
        border-bottom: 2.5px solid var(--ink);
        background: var(--card);
      }
      :host([phone]) header {
        gap: 7px;
        padding: 0 10px;
      }
      .logo {
        width: 28px;
        height: 28px;
        flex: none;
        border-radius: 9px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
      }
      .wordmark {
        font-size: 17px;
        font-weight: 600;
        letter-spacing: -0.02em;
        white-space: nowrap;
      }
      :host([phone]) .wordmark {
        display: none;
      }
      .spacer {
        flex: 1;
      }
      .bank-tabs {
        display: flex;
        gap: 5px;
        flex: none;
      }
      .bank-tab {
        width: 32px;
        flex: none;
        white-space: nowrap;
        padding: 5px 0;
        border-radius: 11px;
        font-size: 12px;
        font-weight: 600;
        border: 2px solid var(--ink);
        transition:
          background 150ms ease,
          opacity 150ms ease;
      }
      :host([phone]) .bank-tab {
        width: 27px;
        font-size: 11px;
      }
      .settings-btn {
        width: 34px;
        height: 34px;
        flex: none;
        border-radius: 50%;
        border: 2.5px solid var(--ink);
        background: var(--card);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        transition: background 150ms ease;
      }
      .settings-btn:hover {
        background: var(--mustard);
      }
      .cook-btn {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 8px 13px;
        border-radius: 19px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-size: 13px;
        font-weight: 600;
        flex: none;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .cook-btn:active {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 var(--ink);
      }
      .cook-count {
        font-family: var(--mono);
        font-size: 10px;
        padding: 1px 6px;
        border-radius: 9px;
        background: var(--ink);
        color: var(--mustard);
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
      main {
        flex: 1;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .controller-block {
        flex: none;
        padding: 12px 14px 0;
      }
      .device-tabs-block {
        flex: none;
        padding: 12px 14px 4px;
      }
    `,
  ];

  private store = new StompStore();

  constructor() {
    super();
    new StoreController(this, this.store);
  }

  @property({ type: Boolean, reflect: true }) phone = window.innerWidth < PHONE_BREAKPOINT;

  private onResize = () => {
    this.phone = window.innerWidth < PHONE_BREAKPOINT;
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.onResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    const st = this.store.state;
    const total = this.store.totalAssigned;

    return html`
      <div class="root">
        <header>
          <span class="logo">S</span>
          <span class="wordmark">stomp stacks</span>
          <div class="spacer"></div>
          <div class="bank-tabs">
            ${st.banks.map(
              (_, i) => html`
                <button
                  class="bank-tab"
                  style=${i === st.bank ? 'background:var(--mustard)' : 'background:transparent;opacity:.45'}
                  @click=${() => this.store.selectBank(i)}
                >
                  0${i + 1}
                </button>
              `,
            )}
          </div>
          <button class="settings-btn" title="settings" @click=${() => this.store.openSettings()}>⚙</button>
          <button class="cook-btn" @click=${() => this.store.openCompile()}>
            cook
            <span class="cook-count">${total}</span>
          </button>
        </header>

        <div class="body">
          <main>
            <div class="controller-block"><controller-graphic .store=${this.store}></controller-graphic></div>
            <div class="device-tabs-block"><device-tabs .store=${this.store}></device-tabs></div>
            <pedal-canvas .store=${this.store} ?phone=${this.phone}></pedal-canvas>
          </main>
          <macro-panel .store=${this.store} ?phone=${this.phone}></macro-panel>
        </div>
      </div>

      <compile-modal .store=${this.store}></compile-modal>
      <settings-modal .store=${this.store}></settings-modal>
      <controller-picker-modal .store=${this.store}></controller-picker-modal>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stomp-app': StompApp;
  }
}
