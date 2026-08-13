import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim, motionKeyframes } from '../styles/shared.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import { midiService } from '../services/midi-service.js';
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
        gap: 11px;
        padding: 13px 14px;
        border-bottom: 2px solid var(--ink);
        background: var(--paper);
      }
      .dev-row:nth-child(even) {
        background: var(--card);
      }
      .dev-row:last-child {
        border-bottom: 0;
      }
      .dev-dot {
        width: 30px;
        height: 30px;
        border-radius: 10px;
        border: 2.5px solid var(--ink);
        flex: none;
        transition: background 200ms ease;
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
        font-size: 9px;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        opacity: 0.45;
      }
      .dev-port {
        display: block;
        font-family: var(--mono);
        font-size: 10.5px;
        margin-top: 2px;
        opacity: 0.6;
      }
      .btn-action {
        flex: none;
        padding: 6px 12px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-size: 12.5px;
        font-weight: 600;
        transition: background 150ms ease;
      }
      .btn-action:hover {
        background: var(--mustard);
      }
      .btn-listen {
        flex: none;
        padding: 6px 12px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-size: 12.5px;
        font-weight: 600;
        transition: background 150ms ease;
      }
      .btn-listen[listening] {
        background: var(--mustard);
        animation: breathe 1.4s ease-in-out infinite;
      }
      .btn-listen:hover {
        background: var(--mustard);
      }
      .btn-toggle {
        flex: none;
        padding: 6px 13px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        font-size: 12.5px;
        font-weight: 600;
        background: var(--ink);
        color: var(--panel-warm);
        transition:
          background 150ms ease,
          opacity 150ms ease;
      }
      .btn-toggle[on] {
        background: transparent;
        color: var(--ink);
        opacity: 0.55;
      }
      .heard-card {
        margin-top: 14px;
        padding: 14px 15px;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
        background: #ffe6dd;
        animation: sheetIn 190ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .heard-card[ok] {
        background: #e7f5e7;
      }
      .heard-head {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 8px;
      }
      .heard-dot {
        width: 12px;
        height: 12px;
        flex: none;
        border-radius: 4px;
        border: 2px solid var(--ink);
        background: #ef7d5c;
      }
      .heard-card[ok] .heard-dot {
        background: #5bb85b;
      }
      .heard-title {
        flex: 1;
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
      .btn-accept:active {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 var(--ink);
      }
      .btn-dismiss {
        padding: 8px 14px;
        border-radius: 16px;
        font-size: 13px;
        opacity: 0.6;
      }
      .btn-dismiss:hover {
        opacity: 1;
      }
      .monitor-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 16px;
        padding: 13px 15px;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
        background: var(--card);
      }
      .monitor-row[active] {
        background: var(--panel-warm);
      }
      .toggle-switch {
        position: relative;
        width: 52px;
        height: 30px;
        flex: none;
        border-radius: 16px;
        border: 2.5px solid var(--ink);
        background: rgba(22, 50, 61, 0.12);
        cursor: pointer;
        transition: background 200ms ease;
      }
      .toggle-knob {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--card);
        border: 2px solid var(--ink);
        transition: left 220ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .toggle-switch[active] {
        background: #5bb85b;
      }
      .toggle-switch[active] .toggle-knob {
        left: 24px;
      }
      .foot {
        flex: none;
        display: flex;
        justify-content: flex-end;
        align-items: center;
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
      .tools-panel {
        background: var(--paper);
        border-bottom: 2px solid var(--ink);
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        animation: sheetIn 200ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .tools-header {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      .guided-steps {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 13px;
        line-height: 1.6;
        opacity: 0.8;
      }
      .guided-steps li {
        margin-bottom: 6px;
        display: flex;
        gap: 8px;
      }
      .step-num {
        font-weight: 600;
        color: var(--mustard);
      }
      .guided-controls {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 8px;
      }
      .channel-select {
        padding: 8px 12px;
        border-radius: 12px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        outline: none;
        cursor: pointer;
      }
      .btn-send {
        padding: 8px 16px;
        border-radius: 16px;
        background: var(--sky);
        border: 2.5px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-size: 13px;
        font-weight: 600;
        transition: transform 100ms, box-shadow 100ms;
      }
      .btn-send:active {
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
    const connectMeta = connCount
      ? `${connCount} ${connCount === 1 ? 'device is' : 'devices are'} answering. reading pulls what's on the box; listening watches what it sends.`
      : "nothing is answering yet. open a port and the rig above stops being a diagram.";

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
                const dotBg = on ? (r.id === 'scribble' ? '#8fd0e6' : DEVICES[r.id]?.accent || '#8fd0e6') : 'transparent';
                const isPedal = r.id !== 'scribble' && r.id !== st.controllerId;
                const toolsOpen = st.channelToolOpen === r.id;

                return html`
                  <div class="dev-row">
                    <span class="dev-dot" style="background:${dotBg}"></span>
                    <div class="dev-info">
                      <div class="dev-top">
                        <span class="dev-name">${r.name}</span>
                        <span class="dev-kind">${r.kind}</span>
                      </div>
                      <span class="dev-port" style="opacity:${on ? '0.6' : '0.35'}">${on ? r.port : 'not open'}</span>
                    </div>
                    ${r.canRead
                      ? html`
                          <button class="btn-action" @click=${() => this.store.readFrom(r.id)}>
                            read
                          </button>
                        `
                      : null}
                    ${r.canListen
                      ? html`
                          <button
                            class="btn-listen"
                            ?listening=${listening}
                            @click=${() => this.store.listenTo(r.id)}
                          >
                            ${listening ? 'listening…' : 'listen'}
                          </button>
                        `
                      : null}
                    ${isPedal 
                      ? html`
                          <button class="btn-action" style="background: ${toolsOpen ? 'var(--mustard)' : 'var(--card)'}" @click=${() => this.store.toggleChannelTool(r.id)}>
                            tools
                          </button>
                        ` 
                      : null}
                    <button
                      class="btn-toggle"
                      ?on=${on}
                      @click=${() => this.store.toggleConn(r.id)}
                    >
                      ${on ? 'drop' : 'connect'}
                    </button>
                  </div>
                  ${toolsOpen ? html`
                    <div class="tools-panel">
                      <div class="tools-header">Guided Channel Setup</div>
                      <ol class="guided-steps">
                        <li><span class="step-num">1.</span> Unplug power from the pedal.</li>
                        <li><span class="step-num">2.</span> Hold down both footswitches.</li>
                        <li><span class="step-num">3.</span> Plug power back in while holding.</li>
                        <li><span class="step-num">4.</span> Wait for the LEDs to indicate channel setup mode.</li>
                        <li><span class="step-num">5.</span> Pick a channel and send a PC message.</li>
                      </ol>
                      <div class="guided-controls">
                        <select class="channel-select" id="channel-select-${r.id}" .value=${(st.channels[r.id] || 1).toString()}>
                          ${Array.from({ length: 16 }, (_, i) => i + 1).map(ch => html`
                            <option value=${ch}>Channel ${ch}</option>
                          `)}
                        </select>
                        <button class="btn-send" @click=${() => {
                          const select = this.shadowRoot?.querySelector<HTMLSelectElement>(`#channel-select-${r.id}`);
                          if (select) {
                            this.store.sendGuidedPC(r.id, parseInt(select.value, 10));
                          }
                        }}>
                          Send PC Message
                        </button>
                      </div>
                    </div>
                  ` : null}
                `;
              })}
            </div>

            ${st.heard
              ? html`
                  <div class="heard-card" ?ok=${!st.heard.drift}>
                    <div class="heard-head">
                      <span class="heard-dot"></span>
                      <span class="heard-title">
                        ${st.heard.drift
                          ? "that isn't where we expected it"
                          : `${DEVICES[st.heard.pedal]?.name || st.heard.pedal} answers where we thought`}
                      </span>
                    </div>
                    <div class="heard-body">
                      ${st.heard.drift
                        ? `${DEVICES[st.heard.pedal]?.name || st.heard.pedal} sent cc ${st.heard.cc}, but our map puts that control on cc ${st.heard.expect}. the whole map looks shifted by ${st.heard.drift > 0 ? '+' : ''}${st.heard.drift} — probably a firmware revision.`
                        : `cc ${st.heard.cc}, exactly where the map says. the rest of the pedal should line up too.`}
                    </div>
                    <div class="heard-btns">
                      ${st.heard.drift
                        ? html`
                            <button class="btn-accept" @click=${() => this.store.acceptDrift()}>
                              shift the map by ${st.heard.drift > 0 ? '+' : ''}${st.heard.drift}
                            </button>
                          `
                        : null}
                      <button class="btn-dismiss" @click=${() => this.store.dismissHeard()}>
                        ${st.heard.drift ? 'leave it' : 'good'}
                      </button>
                    </div>
                  </div>
                `
              : null}

            <div class="monitor-row" ?active=${st.monitorOn}>
              <div style="flex:1;min-width:0">
                <span style="display:block;font-size:13.5px;font-weight:600">watch the wire</span>
                <span style="display:block;font-size:11.5px;opacity:.6;margin-top:2px;text-wrap:pretty">
                  ${connCount
                    ? 'every message shows up as it leaves, and anything that goes unanswered gets called out.'
                    : "connect something first — there's nothing to watch yet."}
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
