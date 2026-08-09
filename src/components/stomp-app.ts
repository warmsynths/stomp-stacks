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
/** Below this, tablet/phone (Mobile.dc.html) layout; at/above, desktop (Whimsy.dc.html) layout. */
const DESKTOP_BREAKPOINT = 1120;

/** App root: owns the single StompStore instance and picks between the two
 * distinct designs by viewport width — the compact single-column shell
 * (tablet side rail / phone bottom sheet, from Controller Mapper Mobile.dc.html)
 * below 1120px, and the desktop shell (aside with bank tabs built into the
 * controller strip, from Controller Mapper Whimsy.dc.html) at/above it. */
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
      :host([desktop]) .root {
        min-width: 1120px;
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
      :host([desktop]) header {
        gap: 18px;
        padding: 0 26px;
        height: 70px;
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
      :host([desktop]) .logo {
        width: 30px;
        height: 30px;
        font-size: 15px;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 11px;
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
      :host([desktop]) .wordmark {
        font-size: 19px;
      }
      .wordmark-sub {
        font-family: var(--mono);
        font-size: 11px;
        opacity: 0.55;
        white-space: nowrap;
      }
      .spacer {
        flex: 1;
      }
      .midi-pill {
        display: none;
        align-items: center;
        gap: 8px;
        padding: 5px 11px;
        border-radius: 20px;
        background: #e3f3d9;
        border: 2px solid var(--ink);
        font-family: var(--mono);
        font-size: 11px;
        white-space: nowrap;
      }
      :host([desktop]) .midi-pill {
        display: flex;
      }
      .midi-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #5bb85b;
      }
      .bank-tabs {
        display: flex;
        gap: 5px;
        flex: none;
      }
      :host([desktop]) .bank-tabs {
        display: none;
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
      :host([desktop]) .settings-btn {
        width: 38px;
        height: 38px;
        font-size: 15px;
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
      :host([desktop]) .cook-btn {
        gap: 10px;
        padding: 10px 18px;
        border-radius: 22px;
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
      }
      :host([desktop]) .cook-btn:hover {
        box-shadow: 5px 5px 0 var(--ink);
        transform: translate(-1px, -1px);
      }
      :host([desktop]) .cook-btn:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
      .cook-count {
        font-family: var(--mono);
        font-size: 10px;
        padding: 1px 6px;
        border-radius: 9px;
        background: var(--ink);
        color: var(--mustard);
      }
      :host([desktop]) .cook-count {
        font-size: 11px;
        padding: 1px 7px;
        border-radius: 10px;
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
      /* --- desktop-only layout --- */
      .aside {
        width: 380px;
        flex: none;
        display: flex;
        flex-direction: column;
        background: var(--card);
        border-left: 2.5px solid var(--ink);
      }
      .aside-top {
        flex: none;
        padding: 16px 18px 18px;
        border-bottom: 2.5px solid var(--ink);
      }
      .desktop-tabs-row {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 26px;
        flex: none;
      }
      .pedal-label {
        font-family: var(--mono);
        font-size: 11px;
        opacity: 0.5;
      }
    `,
  ];

  private store = new StompStore();

  constructor() {
    super();
    new StoreController(this, this.store);
  }

  @property({ type: Boolean, reflect: true }) phone = window.innerWidth < PHONE_BREAKPOINT;
  @property({ type: Boolean, reflect: true }) desktop = window.innerWidth >= DESKTOP_BREAKPOINT;

  private onResize = () => {
    this.phone = window.innerWidth < PHONE_BREAKPOINT;
    this.desktop = window.innerWidth >= DESKTOP_BREAKPOINT;
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
    const total = this.store.totalAssigned;

    return html`
      <div class="root">
        <header>
          <div class="brand">
            <span class="logo">S</span>
            <span class="wordmark">stomp stacks</span>
            ${this.desktop ? html`<span class="wordmark-sub">for the chocolate</span>` : null}
          </div>
          <div class="spacer"></div>
          <div class="midi-pill"><span class="midi-dot"></span><span>midi out · ch 1</span></div>
          ${this.desktop ? null : this.renderBankTabs()}
          <button class="settings-btn" title="settings" @click=${() => this.store.openSettings()}>⚙</button>
          <button class="cook-btn" @click=${() => this.store.openCompile()}>
            ${this.desktop ? 'cook it up' : 'cook'}
            <span class="cook-count">${total}</span>
          </button>
        </header>

        ${this.desktop ? this.renderDesktopBody() : this.renderCompactBody()}
      </div>

      <compile-modal .store=${this.store} ?desktop=${this.desktop}></compile-modal>
      <settings-modal .store=${this.store}></settings-modal>
      <controller-picker-modal .store=${this.store}></controller-picker-modal>
    `;
  }

  private renderBankTabs() {
    const st = this.store.state;
    return html`
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
    `;
  }

  private renderCompactBody() {
    return html`
      <div class="body">
        <main>
          <div class="controller-block"><controller-graphic .store=${this.store}></controller-graphic></div>
          <div class="device-tabs-block"><device-tabs .store=${this.store}></device-tabs></div>
          <pedal-canvas .store=${this.store} ?phone=${this.phone}></pedal-canvas>
        </main>
        <macro-panel .store=${this.store} ?phone=${this.phone}></macro-panel>
      </div>
    `;
  }

  private renderDesktopBody() {
    return html`
      <div class="body">
        <main>
          <div class="desktop-tabs-row">
            <span class="pedal-label">pedal</span>
            <device-tabs .store=${this.store}></device-tabs>
          </div>
          <pedal-canvas .store=${this.store} desktop></pedal-canvas>
        </main>
        <aside class="aside">
          <div class="aside-top"><controller-graphic .store=${this.store} desktop></controller-graphic></div>
          <macro-panel .store=${this.store} desktop></macro-panel>
        </aside>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stomp-app': StompApp;
  }
}
