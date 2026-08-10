import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, motionKeyframes } from '../styles/shared.js';
import { DEVICES } from '../data/devices.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

/** Dynamic chip row for choosing active rig pedal, adding/removing pedals, and editing MIDI channel. */
@customElement('device-tabs')
export class DeviceTabs extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    motionKeyframes,
    css`
      :host {
        display: block;
        position: relative;
        overflow: visible;
      }
      .wrap {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        overflow: visible;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 7px;
        flex: 1;
        min-width: 0;
        padding: 2px;
      }
      .chip-wrap {
        display: flex;
        align-items: center;
        flex: none;
        border-radius: 18px;
        border: 2px solid var(--ink);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .chip-btn {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 6px 14px;
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        transition: transform 120ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .chip-btn:active {
        transform: scale(0.97);
      }
      .chip-wrap[active] .chip-btn {
        padding-right: 6px;
      }
      .chip-wrap[active][single] .chip-btn {
        padding-right: 14px;
      }
      .dot {
        width: 13px;
        height: 13px;
        border-radius: 5px;
        flex: none;
        border: 2px solid var(--ink);
      }
      .remove-btn {
        width: 22px;
        height: 22px;
        flex: none;
        margin-right: 5px;
        border-radius: 50%;
        border: 2px solid var(--ink);
        font-size: 12px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
          background 150ms ease,
          color 150ms ease;
      }
      .remove-btn:hover {
        background: var(--coral);
        color: var(--paper);
      }
      .add-chip {
        display: flex;
        align-items: center;
        flex: none;
        padding: 6px 14px;
        border-radius: 18px;
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        background: transparent;
        opacity: 0.55;
        border: 2px dashed var(--ink);
        transition:
          background 150ms ease,
          opacity 150ms ease,
          transform 120ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .add-chip:hover {
        background: var(--panel-warm);
        opacity: 1;
      }
      .add-chip:active {
        transform: scale(0.97);
      }
      .chan-btn {
        display: flex;
        align-items: center;
        gap: 7px;
        flex: none;
        padding: 6px 12px;
        border-radius: 18px;
        border: 2px solid var(--ink);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .chan-btn:hover {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .chan-popover {
        position: absolute;
        right: 0;
        top: calc(100% + 4px);
        width: 288px;
        max-width: calc(100vw - 28px);
        padding: 14px;
        border-radius: 20px;
        background: var(--card);
        border: 2.5px solid var(--ink);
        box-shadow: 5px 5px 0 var(--ink);
        z-index: 50;
        animation: sheetIn 170ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .pop-title {
        font-size: 13.5px;
        font-weight: 600;
        margin-bottom: 3px;
      }
      .pop-sub {
        font-size: 11.5px;
        line-height: 1.45;
        opacity: 0.6;
        margin-bottom: 11px;
        text-wrap: pretty;
      }
      .chan-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 5px;
      }
      .chan-opt {
        padding: 6px 0;
        border-radius: 9px;
        font-family: var(--mono);
        font-size: 11px;
        border: 2px solid var(--ink);
        background: var(--card);
        transition: background 140ms ease;
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
    const active = st.browseDevice;
    const currentDevice = DEVICES[active];
    const currentChannel = st.channels[active] || (currentDevice ? currentDevice.midiChannel : 1);

    return html`
      <div class="wrap">
        <div class="row">
          ${st.rig.map((id) => {
            const d = DEVICES[id];
            if (!d) return null;
            const on = active === id;
            return html`
              <span
                class="chip-wrap"
                ?active=${on}
                ?single=${st.rig.length <= 1}
                style=${on ? `background:${d.accent};box-shadow:2px 2px 0 var(--ink)` : 'background:transparent;opacity:.6'}
              >
                <button class="chip-btn" @click=${() => this.store.setBrowseDevice(id)}>
                  <span class="dot" style="background:${d.accent}"></span>
                  <span>${d.name}</span>
                </button>
                ${on && st.rig.length > 1
                  ? html`
                      <button
                        class="remove-btn"
                        title="take ${d.name} out of the rig"
                        @click=${() => this.store.setConfirmRemove(id)}
                      >
                        ×
                      </button>
                    `
                  : null}
              </span>
            `;
          })}
          <button class="add-chip" title="add a pedal to your rig" @click=${() => this.store.openAddPedal()}>+ pedal</button>
        </div>

        <button
          class="chan-btn"
          title="midi channel for this pedal"
          style=${st.channelPickerOpen ? 'background:var(--mustard)' : 'background:var(--card)'}
          @click=${() => this.store.toggleChannelPicker()}
        >
          <span style="font-family:var(--mono);font-size:11px">ch ${currentChannel}</span>
          <span style="font-size:10px;opacity:.55">⚙</span>
        </button>

        ${st.channelPickerOpen
          ? html`
              <div class="chan-popover">
                <div class="pop-title">${currentDevice?.name} · midi channel</div>
                <div class="pop-sub">every message for this pedal goes out on this channel.</div>
                <div class="chan-grid">
                  ${Array.from({ length: 16 }, (_, i) => {
                    const n = i + 1;
                    const isSelected = currentChannel === n;
                    return html`
                      <button
                        class="chan-opt"
                        style=${isSelected ? `background:${currentDevice?.accent};font-weight:600` : 'background:var(--card)'}
                        @click=${() => this.store.setPedalChannel(active, n)}
                      >
                        ${n}
                      </button>
                    `;
                  })}
                </div>
              </div>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'device-tabs': DeviceTabs;
  }
}
