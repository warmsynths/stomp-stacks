import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim, motionKeyframes } from '../styles/shared.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import { midiService, hex } from '../services/midi-service.js';
import { DEVICES } from '../data/devices.js';

@customElement('connect-modal')
export class ConnectModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    motionKeyframes,
    css`
      .panel {
        width: 540px;
        max-width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        box-shadow: 8px 8px 0 var(--ink);
        overflow: hidden;
      }
      .head {
        flex: none;
        padding: 22px 24px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .meta {
        font-size: 12.5px;
        opacity: 0.65;
        margin-top: 4px;
        text-wrap: pretty;
      }
      .body {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 16px 24px 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .rows-box {
        border: 2.5px solid var(--ink);
        border-radius: 20px;
        overflow: hidden;
      }
      .dev-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 2px solid rgba(22, 50, 61, 0.15);
        background: var(--paper);
      }
      .dev-row:last-child {
        border-bottom: 0;
      }
      .dev-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid var(--ink);
        flex: none;
      }
      .dev-info {
        flex: 1;
        min-width: 0;
      }
      .dev-top {
        display: flex;
        align-items: baseline;
        gap: 8px;
      }
      .dev-name {
        font-size: 14px;
        font-weight: 600;
      }
      .dev-kind {
        font-family: var(--mono);
        font-size: 9.5px;
        padding: 1px 6px;
        border-radius: 8px;
        background: rgba(22, 50, 61, 0.08);
        border: 1px solid rgba(22, 50, 61, 0.2);
      }
      .dev-port {
        font-family: var(--mono);
        font-size: 10.5px;
        opacity: 0.55;
        display: block;
        margin-top: 1px;
      }
      .btn-action {
        padding: 5px 12px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        font-size: 12px;
        font-weight: 600;
        background: var(--card);
        transition: background 150ms ease;
      }
      .btn-action:hover {
        background: var(--mustard);
      }
      .btn-listen {
        padding: 5px 12px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        font-size: 12px;
        font-weight: 600;
        background: var(--sky);
        transition: background 150ms ease;
      }
      .btn-toggle {
        padding: 5px 12px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 600;
      }
      .heard-card {
        padding: 14px 16px;
        border-radius: 18px;
        border: 2.5px solid var(--ink);
        background: #e8f4fa;
        animation: sheetIn 180ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .heard-head {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 6px;
      }
      .heard-title {
        font-size: 13.5px;
        font-weight: 600;
      }
      .heard-body {
        font-size: 12.5px;
        line-height: 1.5;
        opacity: 0.75;
        margin-bottom: 12px;
        text-wrap: pretty;
      }
      .heard-btns {
        display: flex;
        gap: 8px;
      }
      .btn-accept {
        padding: 8px 15px;
        border-radius: 16px;
        background: var(--sky);
        border: 2.5px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-size: 13px;
        font-weight: 600;
      }
      .btn-dismiss {
        padding: 8px 14px;
        border-radius: 16px;
        font-size: 13px;
        opacity: 0.6;
      }
      .monitor-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        border-radius: 18px;
        border: 2.5px solid var(--ink);
        background: var(--paper);
      }
      .toggle-switch {
        width: 44px;
        height: 24px;
        border-radius: 12px;
        border: 2.5px solid var(--ink);
        position: relative;
        cursor: pointer;
        transition: background 200ms ease;
      }
      .toggle-knob {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--ink);
        position: absolute;
        top: 2.5px;
        transition: transform 200ms ease;
      }
      .toggle-switch[active] {
        background: var(--mustard);
      }
      .toggle-switch[active] .toggle-knob {
        transform: translateX(20px);
      }
      .foot {
        flex: none;
        display: flex;
        justify-content: flex-end;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
        background: var(--card);
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
    midiService.init();
  }

  private handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target?.result as string);
        this.store.loadScribbleFile(json);
      } catch (err) {
        alert('Could not parse JSON configuration file. Please check file format.');
      }
    };
    reader.readAsText(file);
  }

  private triggerFileInput() {
    const el = this.shadowRoot?.querySelector<HTMLInputElement>('#scribble-file-input');
    if (el) el.click();
  }



  render() {
    const st = this.store.state;
    if (!st.connectOpen) return null;

    const nodes = midiService.getHardwareNodes(st);
    const connCount = nodes.filter((n) => st.conn[n.id]).length;
    const connectMeta = `${connCount} connected · ${nodes.length} available ports`;

    return html`
      <div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this.store.closeConnect()}>
        <input
          type="file"
          id="scribble-file-input"
          accept=".json"
          style="display:none"
          @change=${(e: Event) => this.handleFileSelect(e)}
        />
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">what's on the other end of the cable</div>
            <div class="meta">${connectMeta}</div>
          </div>
          <div class="body">
            <div class="rows-box">
              ${nodes.map((r) => {
                const on = !!st.conn[r.id];
                const listening = st.listening === r.id;
                const dotBg = listening ? 'var(--sky)' : on ? '#5bb85b' : 'rgba(22,50,61,.3)';
                return html`
                  <div class="dev-row">
                    <span class="dev-dot" style="background:${dotBg}"></span>
                    <div class="dev-info">
                      <div class="dev-top">
                        <span class="dev-name">${r.name}</span>
                        <span class="dev-kind">${r.kind}</span>
                      </div>
                      <span class="dev-port">${r.port}</span>
                    </div>
                    ${r.id === 'scribble'
                      ? html`
                          <button
                            class="btn-action"
                            style="background:${on ? '#e1f4e1' : 'var(--mustard)'};"
                            @click=${() => this.store.connectAndImportScribble()}
                          >
                            ${on ? '✓ Synced' : 'Connect & Sync'}
                          </button>
                        `
                      : html`
                          <button
                            class="btn-toggle"
                            style="background:${on ? '#ffe6dd' : 'transparent'};opacity:${on ? 1 : 0.6}"
                            @click=${() => this.store.toggleConn(r.id)}
                          >
                            ${on ? 'Disconnect' : 'Connect'}
                          </button>
                        `}

                  </div>
                `;
              })}
            </div>


            ${st.heard
              ? html`
                  <div class="heard-card">
                    <div class="heard-head">
                      <span class="dev-dot" style="background:var(--sky)"></span>
                      <span class="heard-title">heard on the wire</span>
                    </div>
                    <div class="heard-body">
                      ${DEVICES[st.heard.pedal]?.name || st.heard.pedal} sent ${hex(st.heard.cc)} when you moved
                      ${DEVICES[st.heard.pedal]?.controls.find((c) => c.id === st.heard?.control)?.short || st.heard.control}. Expected
                      ${hex(st.heard.expect)} (diff ${st.heard.drift > 0 ? '+' : ''}${st.heard.drift}). Shift the map to align?
                    </div>
                    <div class="heard-btns">
                      <button class="btn-accept" @click=${() => this.store.acceptDrift()}>
                        accept drift (${st.heard.drift > 0 ? '+' : ''}${st.heard.drift})
                      </button>
                      <button class="btn-dismiss" @click=${() => this.store.dismissHeard()}>dismiss</button>
                    </div>
                  </div>
                `
              : null}

            <div class="monitor-row">
              <div style="flex:1;min-width:0">
                <span style="display:block;font-size:13.5px;font-weight:600">watch the wire</span>
                <span style="display:block;font-size:11.5px;opacity:.6;margin-top:2px;text-wrap:pretty">
                  shows live MIDI traffic in a rail at the bottom of the screen.
                </span>
              </div>
              <div
                class="toggle-switch"
                ?active=${st.monitorOn}
                @click=${() => this.store.toggleMonitor()}
              >
                <div class="toggle-knob"></div>
              </div>
            </div>
          </div>
          <div class="foot">
            <button class="btn-action" style="margin-right:auto" @click=${() => this.triggerFileInput()}>
              📂 load scribble.json file
            </button>
            <button class="btn-done" @click=${() => this.store.closeConnect()}>done</button>
          </div>
        </div>
      </div>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'connect-modal': ConnectModal;
  }
}
