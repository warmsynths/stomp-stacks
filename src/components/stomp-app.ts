import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton } from '../styles/shared.js';
import { HardwareRegistry } from '../data/registry.js';
import { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

import './controller-graphic.js';
import './device-tabs.js';
import './pedal-canvas.js';
import './macro-panel.js';
import './compile-modal.js';
import './settings-modal.js';
import './controller-picker-modal.js';
import './brain-picker-modal.js';
import './add-pedal-modal.js';
import './confirm-remove-modal.js';
import './connect-modal.js';
import './read-modal.js';
import './wire-monitor.js';

const PHONE_BREAKPOINT = 760;
/** Below this, tablet/phone layout; at/above, desktop layout. */
const DESKTOP_BREAKPOINT = 1120;

/** App root: owns the single StompStore instance and picks between the two
 * distinct designs by viewport width. */
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
        gap: 10px;
        padding: 0 14px;
        height: 58px;
        flex: none;
        border-bottom: 2.5px solid var(--ink);
        background: var(--card);
      }
      :host([phone]) header {
        gap: 9px;
        padding: 0 10px;
      }
      :host([desktop]) header {
        gap: 14px;
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
        gap: 10px;
        flex: none;
      }
      .wordmark {
        font-size: 16.5px;
        font-weight: 600;
        letter-spacing: -0.02em;
        white-space: nowrap;
      }
      :host([phone]) .wordmark {
        display: inline;
      }
      :host([desktop]) .wordmark {
        font-size: 19px;
      }
      .spacer {
        flex: 1;
      }
      .rig-bar {
        display: flex;
        align-items: center;
      }
      .rig-chip {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 5px 12px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        line-height: 1.3;
        text-align: left;
        transition: box-shadow 150ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .rig-chip:hover {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .rig-chip-lbl {
        font-family: var(--mono);
        font-size: 9px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        opacity: 0.5;
      }
      .rig-chip-val {
        font-size: 12.5px;
        font-weight: 600;
      }
      .rig-arrow {
        font-size: 12px;
        opacity: 0.3;
        padding: 0 7px;
      }
      .rig-compact-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 11px;
        border-radius: 16px;
        border: 2px solid var(--ink);
        background: #e8f4fa;
        font-family: var(--mono);
        font-size: 10.5px;
        flex: none;
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
        font-size: 15px;
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
      .connect-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 18px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 500;
        transition: box-shadow 150ms ease;
      }
      .connect-btn:hover {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .connect-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1.5px solid var(--ink);
        flex: none;
      }
      .cook-btn {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 9px 14px;
        border-radius: 22px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 13px;
        font-weight: 600;
        flex: none;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .cook-btn:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
      :host([desktop]) .cook-btn {
        padding: 10px 18px;
        font-size: 14px;
      }
      .cook-count {
        font-family: var(--mono);
        font-size: 10.5px;
        padding: 1px 7px;
        border-radius: 10px;
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
        flex: none;
        padding-top: 9px;
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

    const st = this.store.state;
    const connCount = Object.keys(st.conn).filter((k) => st.conn[k]).length;

    return html`
      <div class="root">
        <header>
          <div class="brand">
            <span class="logo">S</span>
            <span class="wordmark">stomp stacks</span>
          </div>
          <div class="spacer"></div>
          ${this.renderHeaderRig()}
          <button class="connect-btn" title="connect hardware" @click=${() => this.store.openConnect()}>
            <span class="connect-dot" style="background:${connCount ? '#5bb85b' : 'rgba(22,50,61,.3)'}"></span>
            <span>${connCount ? `${connCount} live` : 'connect'}</span>
          </button>
          <button class="settings-btn" title="settings" @click=${() => this.store.openSettings()}>⚙</button>
          <button class="cook-btn" @click=${() => this.store.openCompile()}>
            <span>${this.desktop ? 'cook it up' : 'cook'}</span>
            <span class="cook-count">${total}</span>
          </button>
        </header>

        ${this.desktop ? this.renderDesktopBody() : this.renderCompactBody()}
        <wire-monitor .store=${this.store}></wire-monitor>
      </div>

      <compile-modal .store=${this.store} ?phone=${this.phone}></compile-modal>
      <settings-modal .store=${this.store}></settings-modal>
      <controller-picker-modal .store=${this.store}></controller-picker-modal>
      <brain-picker-modal .store=${this.store}></brain-picker-modal>
      <add-pedal-modal .store=${this.store}></add-pedal-modal>
      <confirm-remove-modal .store=${this.store}></confirm-remove-modal>
      <connect-modal .store=${this.store}></connect-modal>
      <read-modal .store=${this.store}></read-modal>
    `;

  }

  private renderHeaderRig() {
    const st = this.store.state;
    const ctrl = HardwareRegistry.getController(st.controllerId);
    const brain = HardwareRegistry.getBrain(st.brainId);
    const pedalSummary =
      st.rig.length <= 2
        ? st.rig.map((id) => HardwareRegistry.getDevice(id)?.name || id).join(', ')
        : `${st.rig.slice(0, 2).map((id) => HardwareRegistry.getDevice(id)?.name || id).join(', ')} +${st.rig.length - 2}`;

    if (this.phone) {
      return html`
        <button class="rig-compact-btn" title="rig" @click=${() => this.store.openBrainPicker()}>
          ${ctrl.short} → ${brain.short}
        </button>
      `;
    }

    return html`
      <div class="rig-bar">
        <button
          class="rig-chip"
          style="background:#e8f4fa"
          title="change controller"
          @click=${() => this.store.openControllerPicker()}
        >
          <span class="rig-chip-lbl">controller</span>
          <span class="rig-chip-val">${ctrl.short}</span>
        </button>
        <span class="rig-arrow">→</span>
        <button
          class="rig-chip"
          style="background:${brain.colour}55"
          title="what expands one stomp into a stack"
          @click=${() => this.store.openBrainPicker()}
        >
          <span class="rig-chip-lbl">brain</span>
          <span class="rig-chip-val">${brain.short}</span>
        </button>
        <span class="rig-arrow">→</span>
        <div class="rig-chip" style="background:var(--paper);cursor:default">
          <span class="rig-chip-lbl">pedals</span>
          <span class="rig-chip-val">${pedalSummary}</span>
        </div>
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
            <device-tabs .store=${this.store} style="flex:1;min-width:0"></device-tabs>
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
