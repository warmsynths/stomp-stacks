import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton } from '../styles/shared.js';
import { DEVICES, DEVICE_ORDER } from '../data/devices.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

/** Horizontal-scrolling chip row for choosing which pedal you're browsing/mapping. */
@customElement('device-tabs')
export class DeviceTabs extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    css`
      :host {
        display: block;
      }
      .row {
        display: flex;
        gap: 7px;
        overflow-x: auto;
      }
      .chip {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 6px 14px;
        border-radius: 18px;
        font-size: 13px;
        font-weight: 500;
        border: 2px solid var(--ink);
        flex: none;
        white-space: nowrap;
        transition:
          background 150ms ease,
          box-shadow 150ms ease,
          transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .dot {
        width: 13px;
        height: 13px;
        border-radius: 5px;
        flex: none;
        border: 2px solid var(--ink);
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
    const active = this.store.state.browseDevice;
    return html`
      <div class="row">
        ${DEVICE_ORDER.map((id) => {
          const d = DEVICES[id];
          const on = active === id;
          return html`
            <button
              class="chip"
              style=${on ? `background:${d.accent};box-shadow:2px 2px 0 var(--ink)` : 'background:transparent;opacity:.6'}
              @click=${() => this.store.setBrowseDevice(id)}
            >
              <span class="dot" style="background:${d.accent}"></span>
              <span>${d.name}</span>
            </button>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'device-tabs': DeviceTabs;
  }
}
