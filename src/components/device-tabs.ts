import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokens, resetAndButton, motionKeyframes } from '../styles/shared.js';
import { HardwareRegistry } from '../data/registry.js';
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
      .help-btn {
        margin-top: 10px;
        width: 100%;
        padding: 6px;
        border-radius: 9px;
        background: var(--paper);
        border: 2px dashed var(--ink);
        font-size: 11.5px;
        font-weight: 500;
        opacity: 0.7;
        transition: opacity 150ms ease, background 150ms ease;
      }
      .help-btn:hover {
        opacity: 1;
        background: var(--panel-warm);
      }
      .menu-btn {
        display: block;
        width: 100%;
        text-align: left;
        padding: 10px 12px;
        margin-bottom: 8px;
        border-radius: 12px;
        border: 2px solid var(--ink);
        background: var(--paper);
        font-size: 13px;
        font-weight: 600;
        transition: background 150ms ease, transform 100ms ease;
      }
      .menu-btn:hover {
        background: var(--sky);
      }
      .menu-btn:active {
        transform: scale(0.98);
      }
      .menu-btn:last-child {
        margin-bottom: 0;
      }
      @keyframes sweepPulse {
        0% { transform: scale(0.95); opacity: 0.7; }
        100% { transform: scale(1.05); opacity: 1; }
      }
      .sweep-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
      }
      .sweep-num {
        font-family: var(--mono);
        font-size: 36px;
        font-weight: 700;
        color: var(--mustard);
        margin-bottom: 12px;
        animation: sweepPulse 700ms ease-in-out infinite alternate;
      }
      .sweep-sub {
        font-size: 12px;
        opacity: 0.7;
        text-align: center;
        text-wrap: pretty;
      }
      .guided-steps {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 12.5px;
        line-height: 1.5;
        opacity: 0.8;
      }
      .guided-steps li {
        margin-bottom: 8px;
        display: flex;
        gap: 8px;
      }
      .step-num {
        font-weight: 600;
        color: var(--mustard);
      }
      .temp-notice {
        margin-bottom: 12px;
        padding: 8px 10px;
        border-radius: 10px;
        background: #f7c94826;
        border: 1.5px solid var(--ink);
        font-size: 11px;
        line-height: 1.45;
        color: var(--ink);
      }
      .guided-controls {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 14px;
      }
      .channel-select {
        padding: 6px 10px;
        border-radius: 10px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-family: inherit;
        font-size: 13px;
        font-weight: 600;
        outline: none;
        cursor: pointer;
      }
      .btn-send {
        flex: 1;
        padding: 8px 12px;
        border-radius: 12px;
        background: var(--mustard);
        border: 2px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 100ms, box-shadow 100ms;
      }
      .btn-send:active {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 var(--ink);
      }
      .btn-direct {
        padding: 6px 10px;
        border-radius: 10px;
        background: var(--card);
        border: 1.5px solid var(--ink);
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        transition: background 120ms;
      }
      .btn-direct:hover {
        background: var(--panel-warm);
      }
      .guide-status {
        margin-top: 10px;
        padding: 7px 10px;
        border-radius: 10px;
        background: #f7c94833;
        border: 1.5px solid var(--ink);
        font-size: 11px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .back-btn {
        display: inline-flex;
        align-items: center;
        font-size: 11px;
        font-weight: 600;
        opacity: 0.6;
        margin-bottom: 12px;
        transition: opacity 150ms;
      }
      .back-btn:hover {
        opacity: 1;
      }
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  private storeController!: StoreController;

  @state() private helpView: 'none' | 'menu' | 'sweep' | 'guide' = 'none';
  @state() private sweepChannel: number = 1;
  private sweepInterval: any = null;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  updated() {
    if (!this.store.state.channelPickerOpen && this.helpView !== 'none') {
      this.resetHelp();
    }
  }

  private resetHelp() {
    this.helpView = 'none';
    this.stopSweep();
  }

  private startSweep() {
    this.helpView = 'sweep';
    this.sweepChannel = 1;
    this.store.sendTestCC(this.sweepChannel);
    this.sweepInterval = setInterval(() => {
      this.sweepChannel = this.sweepChannel < 16 ? this.sweepChannel + 1 : 1;
      this.store.sendTestCC(this.sweepChannel);
    }, 700);
  }

  private stopSweep() {
    if (this.sweepInterval) {
      clearInterval(this.sweepInterval);
      this.sweepInterval = null;
    }
  }

  render() {
    const st = this.store.state;
    const active = st.browseDevice;
    const currentDevice = HardwareRegistry.getDevice(active);
    const currentChannel = st.channels[active] || (currentDevice ? currentDevice.midiChannel : 1);

    return html`
      <div class="wrap">
        <div class="row">
          ${st.rig.map((id) => {
            const d = HardwareRegistry.getDevice(id);
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
                ${this.helpView === 'none' ? html`
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
                  <button class="help-btn" @click=${() => (this.helpView = 'menu')}>
                    Need help finding or setting your channel?
                  </button>
                ` : this.helpView === 'menu' ? html`
                  <button class="reset back-btn" @click=${() => (this.helpView = 'none')}>← back to channels</button>
                  <div class="pop-title">channel tools</div>
                  <div class="pop-sub" style="margin-bottom:16px">having trouble getting ${currentDevice?.name || 'this pedal'} to listen?</div>
                  <button class="menu-btn" @click=${() => this.startSweep()}>
                    Find my channel
                    <span style="display:block;font-size:11px;font-weight:400;opacity:0.6;margin-top:2px">Watch the pedal's LED while we sweep through 1-16</span>
                  </button>
                  <button class="menu-btn" @click=${() => (this.helpView = 'guide')}>
                    Set a new channel
                    <span style="display:block;font-size:11px;font-weight:400;opacity:0.6;margin-top:2px">Walk through the hardware MIDI learn steps</span>
                  </button>
                ` : this.helpView === 'sweep' ? html`
                  <button class="reset back-btn" @click=${() => { this.stopSweep(); this.helpView = 'menu'; }}>← back</button>
                  <div class="pop-title">sweeping channels...</div>
                  <div class="pop-sub">sending test CCs. when the pedal's LED flashes, that's your channel.</div>
                  <div class="sweep-display">
                    <div class="sweep-num">${this.sweepChannel}</div>
                    <div class="sweep-sub">sending CC 93 (127) on channel ${this.sweepChannel}</div>
                  </div>
                ` : this.helpView === 'guide' ? html`
                  <button class="reset back-btn" @click=${() => (this.helpView = 'menu')}>← back</button>
                  <div class="pop-title">guided channel learn</div>
                  <div class="pop-sub" style="margin-bottom:10px">teach ${currentDevice?.name || 'this pedal'} its MIDI channel using your controller.</div>

                  <div class="temp-notice">
                    ℹ️ <strong>Temporary Setup Helper:</strong> This temporarily puts a Channel Learn message (PC 0) onto <strong>Switch ${st.selectedKey}</strong> so stepping on that physical footswitch broadcasts the learn signal. You can remove or replace it once your pedal locks in the channel.
                  </div>

                  <ol class="guided-steps">
                    <li><span class="step-num">1.</span> Unplug pedal power, hold footswitches, and reconnect power to enter Learn mode.</li>
                    <li><span class="step-num">2.</span> Choose target channel below and click <strong>Assign to Active Switch</strong>.</li>
                    <li><span class="step-num">3.</span> Compile/export to your controller, then tap physical <strong>Switch ${st.selectedKey}</strong> on your board to lock in the channel.</li>
                  </ol>

                  <div class="guided-controls">
                    <select class="channel-select" id="guided-channel-select" .value=${currentChannel.toString()}>
                      ${Array.from({ length: 16 }, (_, i) => i + 1).map(ch => html`
                        <option value=${ch}>Channel ${ch}</option>
                      `)}
                    </select>
                    <button class="btn-send" @click=${() => {
                      const select = this.shadowRoot?.querySelector<HTMLSelectElement>('#guided-channel-select');
                      if (select) {
                        const ch = parseInt(select.value, 10);
                        this.store.assignGuidedPC(active, ch);
                        this.helpView = 'none';
                        this.store.toggleChannelPicker();
                      }
                    }}>
                      Assign to Active Switch (${st.selectedKey})
                    </button>
                  </div>

                  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding-top:8px;border-top:1px dashed rgba(22,50,61,0.2)">
                    <span style="font-size:10.5px;opacity:0.65">Direct USB/BLE cable attached?</span>
                    <button class="btn-direct" @click=${() => {
                      const select = this.shadowRoot?.querySelector<HTMLSelectElement>('#guided-channel-select');
                      const ch = select ? parseInt(select.value, 10) : currentChannel;
                      this.store.sendDirectPC(ch, 0);
                    }}>
                      Send via Web MIDI
                    </button>
                  </div>
                ` : null}
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
