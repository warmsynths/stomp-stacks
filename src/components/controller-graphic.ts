import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton } from '../styles/shared.js';
import { CONTROLLERS, ACTIONS } from '../data/controllers.js';
import { DEVICES } from '../data/devices.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

/** "controller · name · change" affordance plus the physical strip graphic
 * (screen for controllers that have one, and a cap per foot switch). */
@customElement('controller-graphic')
export class ControllerGraphic extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    css`
      :host {
        display: block;
      }
      .name-row {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        margin-bottom: 8px;
        text-align: left;
      }
      .name {
        flex: 1;
        font-size: 14.5px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .change {
        font-size: 11px;
        opacity: 0.5;
      }
      .strip {
        position: relative;
        border-radius: 16px;
        background: var(--ink);
        box-shadow: 3px 3px 0 var(--violet);
      }
      .screen {
        position: absolute;
        left: 50%;
        top: 52%;
        transform: translateX(-50%);
        width: 112px;
        height: 24px;
        border-radius: 4px;
        background: var(--paper);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--mono);
        font-size: 9.5px;
        color: var(--ink);
      }
      .switch-wrap {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 38px;
        height: 38px;
        padding: 0;
      }
      .cap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        font-size: 12px;
        font-weight: 600;
        color: var(--ink);
        transition:
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1),
          border-color 160ms ease,
          background 160ms ease;
      }
      .switch-name {
        position: absolute;
        left: 50%;
        top: calc(100% + 5px);
        transform: translateX(-50%);
        font-size: 11.5px;
        font-weight: 600;
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
    const def = CONTROLLERS[st.controllerId];
    const bank = st.banks[st.bank];

    return html`
      <button class="name-row" @click=${() => this.store.openControllerPicker()}>
        <span class="name">${def.name}</span>
        <span class="change">change ⌄</span>
      </button>
      <div class="strip" style="height:${def.height}px">
        ${def.screen
          ? html`<div class="screen">bank ${st.bank + 1} · ${st.selectedKey}</div>`
          : null}
        ${def.keys.map((key, i) => {
          const on = st.selectedKey === key;
          let count = 0;
          const devicesUsed = new Set<string>();
          ACTIONS.forEach(({ id: action }) => {
            bank[key][action].forEach((s) => {
              count++;
              devicesUsed.add(s.device);
            });
          });
          const fill =
            devicesUsed.size === 1
              ? DEVICES[[...devicesUsed][0]].accent
              : devicesUsed.size > 1
                ? 'var(--mustard)'
                : 'rgba(247,241,227,.16)';
          return html`
            <button
              class="switch-wrap"
              style="left:${def.x[i]}%;top:${def.y[i]}%"
              @click=${() => this.store.selectSwitch(key)}
            >
              <span
                class="cap"
                style="background:${fill};border:2.5px solid ${on ? 'var(--mustard)' : 'rgba(247,241,227,.4)'};box-shadow:${on ? '0 0 0 4px rgba(247,201,72,.3)' : 'none'}"
                >${count > 0 ? count : ''}</span
              >
              <span class="switch-name" style="color:${on ? 'var(--mustard)' : 'rgba(247,241,227,.55)'}">${key}</span>
            </button>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'controller-graphic': ControllerGraphic;
  }
}
