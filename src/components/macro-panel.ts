import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, motionKeyframes } from '../styles/shared.js';
import { ACTIONS } from '../data/controllers.js';
import { DEVICES, valueOptionsFor } from '../data/devices.js';
import { MAX_STEPS } from '../state/store.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import { describeStep } from '../compiler/midi.js';

/** The macro-stack rail: action tabs (tap/hold/double), the value popover for
 * whichever knob/toggle is being set, and the ordered list of assigned steps
 * for the active switch+action. Docks as a side rail on tablet/desktop and a
 * collapsible bottom sheet on phone. */
@customElement('macro-panel')
export class MacroPanel extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    motionKeyframes,
    css`
      :host {
        display: flex;
        flex-direction: column;
        background: var(--card);
      }
      :host(:not([phone])) {
        width: 340px;
        flex: none;
        border-left: 2.5px solid var(--ink);
      }
      :host([desktop]) {
        width: 380px;
      }
      :host([phone]) {
        flex: none;
        border-top: 2.5px solid var(--ink);
        border-radius: 20px 20px 0 0;
        transition: max-height 260ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .grabber {
        display: none;
        width: 44px;
        height: 5px;
        margin: 8px auto 6px;
        border-radius: 3px;
        background: rgba(22, 50, 61, 0.3);
        padding: 0;
      }
      :host([phone]) .grabber {
        display: block;
      }
      .head {
        flex: none;
        padding: 12px 16px 13px;
        background: var(--panel-warm);
        border-bottom: 2.5px solid var(--ink);
      }
      :host([desktop]) .head {
        padding: 15px 18px 13px;
      }
      .head-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
      }
      .title {
        flex: 1;
        font-size: 15.5px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      :host([desktop]) .title {
        font-size: 16px;
      }
      .capacity {
        font-family: var(--mono);
        font-size: 11px;
        padding: 3px 9px;
        border-radius: 11px;
        border: 2px solid var(--ink);
      }
      .chevron {
        width: 28px;
        height: 28px;
        flex: none;
        border-radius: 50%;
        border: 2px solid var(--ink);
        font-size: 13px;
        line-height: 1;
        display: none;
        align-items: center;
        justify-content: center;
      }
      :host([phone]) .chevron {
        display: flex;
      }
      .tabs {
        display: flex;
        gap: 6px;
      }
      .tab {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 7px 0;
        border-radius: 15px;
        font-size: 13px;
        font-weight: 500;
        border: 2.5px solid var(--ink);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .tab-count {
        font-family: var(--mono);
        font-size: 10px;
        min-width: 17px;
        padding: 1px 0;
        border-radius: 9px;
      }
      .popover {
        flex: none;
        padding: 13px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--popover-bg);
        animation: sheetIn 180ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      :host([desktop]) .popover {
        padding: 15px 18px;
      }
      .popover-head {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 10px;
      }
      .pop-dot {
        width: 14px;
        height: 14px;
        border-radius: 5px;
        flex: none;
        border: 2px solid var(--ink);
      }
      .pop-title {
        flex: 1;
        font-size: 13.5px;
        font-weight: 600;
      }
      .pop-close {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2px solid var(--ink);
        font-size: 13px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pop-options {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .pop-option {
        padding: 7px 13px;
        border-radius: 14px;
        font-size: 13px;
        border: 2px solid var(--ink);
        background: var(--card);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .list {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--card);
      }
      :host([desktop]) .list {
        padding: 14px;
        gap: 9px;
      }
      .empty {
        text-align: center;
        padding: 24px 18px;
        border-radius: 18px;
        border: 2.5px dashed rgba(22, 50, 61, 0.3);
      }
      :host([desktop]) .empty {
        padding: 30px 22px;
        border-radius: 20px;
      }
      .creature {
        width: 44px;
        height: 44px;
        margin: 0 auto 13px;
        border-radius: 14px;
        background: var(--sky);
        border: 2.5px solid var(--ink);
        position: relative;
        animation: bob 2.6s ease-in-out infinite;
      }
      .creature-eye {
        position: absolute;
        top: 16px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--ink);
      }
      .creature-mouth {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
        width: 14px;
        height: 7px;
        border-bottom: 2.5px solid var(--ink);
        border-radius: 0 0 14px 14px;
      }
      .empty-title {
        font-size: 13.5px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      :host([desktop]) .empty-title {
        font-size: 14px;
        margin-bottom: 5px;
      }
      .empty-body {
        font-size: 12.5px;
        line-height: 1.5;
        opacity: 0.6;
        text-wrap: pretty;
      }
      .row {
        flex: none;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 16px;
        border: 2.5px solid var(--ink);
        background: var(--card);
        box-shadow: 3px 3px 0 var(--ink);
        animation: stepIn 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .row-num {
        width: 22px;
        height: 22px;
        flex: none;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--mono);
        font-size: 11px;
        background: var(--ink);
        color: var(--card);
      }
      .row-dot {
        width: 13px;
        height: 13px;
        flex: none;
        border-radius: 5px;
        border: 2px solid var(--ink);
      }
      .row-text {
        flex: 1;
        min-width: 0;
      }
      .row-label {
        display: block;
        font-size: 13.5px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .row-meta {
        display: block;
        font-family: var(--mono);
        font-size: 10px;
        opacity: 0.55;
      }
      .row-actions {
        display: flex;
        gap: 4px;
        flex: none;
      }
      .nav-btn {
        width: 30px;
        height: 30px;
        border-radius: 9px;
        border: 2px solid var(--ink);
        font-size: 12px;
        line-height: 1;
        transition: background 140ms ease;
      }
      :host([desktop]) .nav-btn {
        width: 24px;
        height: 24px;
        border-radius: 8px;
        font-size: 11px;
      }
      .nav-btn[disabled] {
        opacity: 0.25;
        pointer-events: none;
      }
      .remove-btn {
        width: 30px;
        height: 30px;
        border-radius: 9px;
        border: 2px solid var(--ink);
        font-size: 13px;
        line-height: 1;
        transition:
          background 140ms ease,
          color 140ms ease;
      }
      .remove-btn:hover {
        background: var(--coral);
        color: var(--card);
      }
      :host([desktop]) .remove-btn {
        width: 24px;
        height: 24px;
        border-radius: 8px;
        font-size: 12px;
      }
      .full-notice {
        padding: 9px 13px;
        border-radius: 14px;
        background: var(--full-bg);
        border: 2px solid var(--ink);
        font-size: 12.5px;
      }
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  @property({ type: Boolean, reflect: true }) phone = false;
  @property({ type: Boolean, reflect: true }) desktop = false;

  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  render() {
    const st = this.store.state;
    const bank = st.banks[st.bank];
    const list = this.store.activeStack;
    const open = st.sheetOpen || !this.phone;
    if (this.phone) {
      this.style.maxHeight = open ? '56%' : 'none';
    } else {
      this.style.maxHeight = '';
    }

    const popDevice = DEVICES[st.browseDevice];
    const popControl = st.popoverControlId ? popDevice.controls.find((c) => c.id === st.popoverControlId) : null;

    return html`
      <button class="grabber" @click=${() => this.store.toggleSheet()}></button>

      <div class="head">
        <div class="head-row">
          <div class="title">switch ${st.selectedKey} macro</div>
          <span class="capacity" style=${list.length >= MAX_STEPS ? 'background:var(--full-border-bg)' : 'background:transparent'}
            >${list.length} / ${MAX_STEPS}</span
          >
          <button class="chevron" @click=${() => this.store.toggleSheet()}>${open ? '⌄' : '⌃'}</button>
        </div>
        <div class="tabs">
          ${ACTIONS.map(({ id, label }) => {
            const n = bank[st.selectedKey][id].length;
            const on = st.action === id;
            return html`
              <button
                class="tab"
                style=${on ? 'background:var(--mustard);box-shadow:2px 2px 0 var(--ink)' : 'background:transparent;opacity:.6'}
                @click=${() => this.store.selectAction(id)}
              >
                <span>${label}</span>
                <span class="tab-count" style="background:${on ? 'var(--ink)' : 'rgba(22,50,61,.14)'};color:${on ? 'var(--mustard)' : 'var(--ink)'}"
                  >${n}</span
                >
              </button>
            `;
          })}
        </div>
      </div>

      ${popControl
        ? html`
            <div class="popover">
              <div class="popover-head">
                <span class="pop-dot" style="background:${popDevice.accent}"></span>
                <span class="pop-title">${popControl.label} lands on…</span>
                <button class="pop-close" @click=${() => this.store.closePopover()}>×</button>
              </div>
              <div class="pop-options">
                ${valueOptionsFor(popControl).map((opt) => {
                  const on = list.some((s) => s.device === st.browseDevice && s.control === popControl.id && s.value === opt.value);
                  return html`
                    <button
                      class="pop-option"
                      style=${on ? 'background:var(--sky);font-weight:600;box-shadow:2px 2px 0 var(--ink)' : ''}
                      @click=${() => this.store.addStep(popControl.id, opt.value)}
                    >
                      ${opt.label}
                    </button>
                  `;
                })}
              </div>
            </div>
          `
        : null}
      ${open
        ? html`
            <div class="list">
              ${list.length === 0
                ? html`
                    <div class="empty">
                      ${this.desktop
                        ? html`
                            <div class="creature">
                              <span class="creature-eye" style="left:11px"></span>
                              <span class="creature-eye" style="right:11px"></span>
                              <span class="creature-mouth"></span>
                            </div>
                          `
                        : null}
                      <div class="empty-title">nothing stacked yet</div>
                      <div class="empty-body">
                        ${this.phone ? 'tap' : 'poke'} any knob or switch on the pedal${this.phone ? ' above' : ''}. mix pedals freely — up to 8
                        per stomp.
                      </div>
                    </div>
                  `
                : list.map((step, i) => {
                    const d = describeStep(step);
                    return html`
                      <div class="row">
                        <span class="row-num">${i + 1}</span>
                        <span class="row-dot" style="background:${d.accent}"></span>
                        <span class="row-text">
                          <span class="row-label">${d.label}</span>
                          <span class="row-meta">${d.deviceName} · cc${d.cc} · ${d.value}</span>
                        </span>
                        <span class="row-actions">
                          <button class="nav-btn" ?disabled=${i === 0} @click=${() => this.store.moveStep(i, -1)}>↑</button>
                          <button class="nav-btn" ?disabled=${i === list.length - 1} @click=${() => this.store.moveStep(i, 1)}>↓</button>
                          <button class="remove-btn" @click=${() => this.store.removeStep(i)}>×</button>
                        </span>
                      </div>
                    `;
                  })}
              ${list.length >= MAX_STEPS
                ? html`<div class="full-notice">stack's full — 8 is the limit. drop one to add another.</div>`
                : null}
            </div>
          `
        : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'macro-panel': MacroPanel;
  }
}
