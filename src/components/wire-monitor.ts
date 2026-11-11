import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, motionKeyframes } from '../styles/shared.js';
import { CONTROLLERS } from '../data/controllers.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

@customElement('wire-monitor')
export class WireMonitor extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    motionKeyframes,
    css`
      :host {
        display: block;
        flex: none;
        border-top: 2.5px solid #16323d;
        background: #fffbf0;
        padding: 12px 18px;
        animation: sheetIn 180ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .head {
        display: flex;
        align-items: center;
        gap: 9px;
        padding-bottom: 9px;
      }
      .label {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        flex: 1;
        opacity: 0.72;
      }
      .btn-clear {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        padding: 4px 10px;
        border-radius: 12px;
        opacity: 0.5;
      }
      .btn-clear:hover {
        opacity: 1;
      }
      .btn-stomp {
        padding: 6px 13px;
        border-radius: 16px;
        background: #f7c948;
        border: 2px solid #16323d;
        box-shadow: 2px 2px 0 #16323d;
        font-size: 12px;
        font-weight: 600;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .btn-stomp:active {
        transform: translate(1px, 1px);
        box-shadow: 1px 1px 0 #16323d;
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
    if (!st.monitorOn) return null;

    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS.chocolate;
    const nLive = Object.keys(st.conn).filter((k) => st.conn[k]).length;
    const railLabel = nLive
      ? `the wire · ${nLive} connected`
      : 'the wire · preview — nothing plugged in yet';
    const liveDotStyle = `flex:none;width:8px;height:8px;border-radius:50%;border:1.5px solid #16323d;background:${
      nLive ? '#5bb85b' : '#f7c948'
    };${nLive ? 'box-shadow:0 0 6px #5bb85b' : ''}`;
    const stompLabel = ctrl.nav
      ? `fire preset ${String(st.bank + 1).padStart(3, '0')}`
      : `stomp ${st.selectedKey}`;
    const logStyle = `max-height:92px;overflow-y:auto;display:flex;flex-direction:column-reverse;gap:4px;font-family:'DM Mono',monospace;font-size:11.5px;${
      st.log.length > 3
        ? 'mask-image:linear-gradient(to bottom,transparent 0,#000 18px);-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 18px)'
        : ''
    }`;

    return html`
      <div class="head">
        <span style=${liveDotStyle}></span>
        <span class="label">${railLabel}</span>
        ${st.log.length
          ? html`<button class="btn-clear" @click=${() => this.store.clearLog()}>clear</button>`
          : null}
        <button class="btn-stomp" @click=${() => this.store.stompTest()}>${stompLabel}</button>
      </div>
      <div style=${logStyle}>
        ${st.log.length === 0
          ? html`<div style="opacity:.4;padding:4px 0">
              quiet on the wire — hit stomp or twist a knob in a popover to watch messages go out.
            </div>`
          : [...st.log]
              .slice(-18)
              .reverse()
              .map((l) => {
                const dotColor =
                  l.tone === 'trig'
                    ? '#f7c948'
                    : l.tone === 'out'
                      ? '#8fd0e6'
                      : l.tone === 'in'
                        ? '#e56b55'
                        : l.tone === 'warn'
                          ? '#f7c948'
                          : '#5bb85b';
                return html`
                  <div style="display:flex;align-items:baseline;gap:9px;line-height:1.45">
                    <span
                      style="flex:none;width:7px;height:7px;border-radius:50%;border:1.5px solid #16323d;transform:translateY(-1px);background:${dotColor}"
                    ></span>
                    <span style="font-weight:500">${l.text}</span>
                    <span style="opacity:.52;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.sub}</span>
                  </div>
                `;
              })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wire-monitor': WireMonitor;
  }
}
