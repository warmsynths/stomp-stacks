import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim } from '../styles/shared.js';
import { CONTROLLERS, CONTROLLER_ORDER } from '../data/controllers.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

/** "what are you stomping on?" — pick the physical remote controller.
 * Switching resets the macro stacks, which this modal says up front. */
@customElement('controller-picker-modal')
export class ControllerPickerModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    css`
      .panel {
        width: 470px;
        max-width: 100%;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        overflow: hidden;
        box-shadow: 8px 8px 0 var(--ink);
      }
      .head {
        padding: 22px 24px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .head-title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .head-sub {
        font-size: 12.5px;
        opacity: 0.65;
        margin-top: 4px;
      }
      .body {
        padding: 18px 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .tile {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 13px;
        border-radius: 18px;
        text-align: left;
        border: 2.5px solid var(--ink);
        transition:
          background 160ms ease,
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .tile-strip {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 96px;
        height: 44px;
        flex: none;
        border-radius: 10px;
        background: var(--ink);
      }
      .tile-cap {
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: rgba(247, 241, 227, 0.55);
      }
      .tile-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        min-width: 0;
      }
      .tile-name {
        font-size: 15px;
        font-weight: 600;
      }
      .tile-sub {
        font-family: var(--mono);
        font-size: 10.5px;
        opacity: 0.6;
      }
      .foot {
        display: flex;
        justify-content: flex-end;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
      }
      .btn-done {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
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
  }

  render() {
    const st = this.store.state;
    if (!st.controllerPickerOpen) return null;

    return html`
      <div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this.store.closeControllerPicker()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="head-title">what are you stomping on?</div>
            <div class="head-sub">switching controllers starts a fresh set of stacks.</div>
          </div>
          <div class="body">
            ${CONTROLLER_ORDER.map((id) => {
              const c = CONTROLLERS[id];
              const on = st.controllerId === id;
              return html`
                <button
                  class="tile"
                  style=${on ? 'background:var(--panel-warm);box-shadow:3px 3px 0 var(--ink)' : 'background:var(--paper)'}
                  @click=${() => this.store.switchController(id)}
                >
                  <span class="tile-strip">${c.keys.map(() => html`<span class="tile-cap"></span>`)}</span>
                  <span class="tile-info">
                    <span class="tile-name">${c.name}</span>
                    <span class="tile-sub">${c.sub}</span>
                  </span>
                </button>
              `;
            })}
          </div>
          <div class="foot"><button class="btn-done" @click=${() => this.store.closeControllerPicker()}>done</button></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'controller-picker-modal': ControllerPickerModal;
  }
}
