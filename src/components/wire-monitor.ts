import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, motionKeyframes } from '../styles/shared.js';
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
        border-top: 2.5px solid var(--ink);
        background: var(--card);
        padding: 12px 18px;
        animation: sheetIn 180ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .head {
        display: flex;
        align-items: center;
        gap: 9px;
        padding-bottom: 9px;
      }
      .live-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #5bb85b;
        border: 1.5px solid var(--ink);
        box-shadow: 0 0 6px #5bb85b;
      }
      .label {
        font-family: var(--mono);
        font-size: 10px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        opacity: 0.55;
        flex: 1;
      }
      .btn-clear {
        font-family: var(--mono);
        font-size: 10px;
        opacity: 0.5;
        padding: 2px 6px;
        transition: opacity 150ms ease;
      }
      .btn-clear:hover {
        opacity: 1;
      }
      .btn-stomp {
        padding: 5px 13px;
        border-radius: 16px;
        background: var(--mustard);
        border: 2px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 600;
        transition:
          transform 150ms ease,
          box-shadow 150ms ease;
      }
      .btn-stomp:active {
        transform: translate(1px, 1px);
        box-shadow: 1px 1px 0 var(--ink);
      }
      .log-area {
        max-height: 110px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-family: var(--mono);
        font-size: 11px;
      }
      .log-row {
        display: flex;
        align-items: center;
        gap: 8px;
        line-height: 1.45;
      }
      .log-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex: none;
      }
      .log-text {
        font-weight: 500;
      }
      .log-sub {
        opacity: 0.55;
        margin-left: 6px;
      }
      .empty-note {
        font-family: var(--mono);
        font-size: 11px;
        opacity: 0.4;
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

    return html`
      <div class="head">
        <span class="live-dot"></span>
        <span class="label">wire monitor</span>
        <button class="btn-clear" @click=${() => this.store.clearLog()}>clear</button>
        <button class="btn-stomp" @click=${() => this.store.stompTest()}>stomp now</button>
      </div>
      <div class="log-area">
        ${st.log.length === 0
          ? html`<div class="empty-note">quiet on the wire — stomp something</div>`
          : st.log.map((l) => {
              const dotBg =
                l.tone === 'trig'
                  ? '#5bb85b'
                  : l.tone === 'warn'
                  ? 'var(--mustard)'
                  : l.tone === 'in' || l.tone === 'out'
                  ? 'var(--sky)'
                  : '#5bb85b';
              return html`
                <div class="log-row">
                  <span class="log-dot" style="background:${dotBg}"></span>
                  <span class="log-text">${l.text}</span>
                  <span class="log-sub">${l.sub}</span>
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
