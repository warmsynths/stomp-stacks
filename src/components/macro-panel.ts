import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, motionKeyframes } from '../styles/shared.js';
import { ACTIONS } from '../data/controllers.js';
import { HardwareRegistry } from '../data/registry.js';
import { PALETTE, HEX, TEXTS, TEXTHEX } from '../data/naming.js';
import { MAX_STEPS } from '../state/store.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import { describeStep } from '../compiler/midi.js';

/** The macro-stack rail: action tabs (tap/hold/double), preset name & color picker,
 * value popover, and assigned steps list. */
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
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 9px;
      }
      .switch-tag {
        flex: none;
        font-family: var(--mono);
        font-size: 11px;
        padding: 3px 8px;
        border-radius: 10px;
        background: var(--ink);
        color: var(--panel-warm);
      }
      .strip-card {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1px;
        padding: 6px 11px;
        border-radius: 13px;
        border: 2.5px solid var(--ink);
        transition: background 200ms ease;
      }
      .name-input {
        width: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        font-family: inherit;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: -0.02em;
        line-height: 1.25;
        outline: none;
      }
      .secondary-input {
        width: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        font-family: var(--mono);
        font-size: 11px;
        line-height: 1.35;
        opacity: 0.72;
        outline: none;
      }
      .color-btn {
        width: 26px;
        height: 26px;
        flex: none;
        border-radius: 9px;
        border: 2.5px solid var(--ink);
        transition: box-shadow 150ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .color-btn:hover {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .color-popover {
        position: absolute;
        left: 0;
        top: calc(100% + 8px);
        z-index: 30;
        width: 262px;
        max-width: 100%;
        padding: 14px;
        border-radius: 20px;
        background: var(--card);
        border: 2.5px solid var(--ink);
        box-shadow: 5px 5px 0 var(--ink);
        animation: sheetIn 170ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .color-pop-head {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
      }
      .color-pop-title {
        flex: 1;
        font-size: 12.5px;
        font-weight: 600;
      }
      .color-pop-close {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid var(--ink);
        font-size: 12px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .color-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 7px;
      }
      .color-swatch {
        height: 30px;
        border-radius: 11px;
        border: 2.5px solid var(--ink);
        transition:
          box-shadow 150ms cubic-bezier(0.23, 1, 0.32, 1),
          transform 120ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .color-swatch[active] {
        box-shadow:
          0 0 0 3px #16323d inset,
          3px 3px 0 var(--ink);
      }
      .color-swatch[disabled] {
        opacity: 0.22;
        pointer-events: none;
      }
      .text-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 11px;
        padding-top: 11px;
        border-top: 2px solid rgba(22, 50, 61, 0.15);
      }
      .text-lbl {
        flex: 1;
        font-size: 12px;
        font-weight: 600;
      }
      .text-opt {
        display: flex;
        align-items: center;
        gap: 5px;
        flex: none;
        padding: 4px 9px 4px 5px;
        border-radius: 11px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-size: 11px;
        font-weight: 600;
        color: var(--ink);
        transition:
          box-shadow 150ms cubic-bezier(0.23, 1, 0.32, 1),
          opacity 150ms ease;
      }
      .text-opt[active] {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .text-opt:not([active]) {
        opacity: 0.55;
      }
      .text-dot {
        width: 14px;
        height: 14px;
        flex: none;
        border-radius: 5px;
        border: 2px solid var(--ink);
      }
      .color-pop-note {
        margin-top: 10px;
        font-size: 11px;
        line-height: 1.45;
        opacity: 0.6;
        text-wrap: pretty;
      }
      .flags-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 10px;
      }
      .flag-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 12px;
        border: 2px solid var(--ink);
        background: #ffe6dd;
        font-size: 11.5px;
        transition: box-shadow 150ms ease;
      }
      .flag-btn:hover {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .flag-dot {
        width: 8px;
        height: 8px;
        flex: none;
        border-radius: 3px;
        border: 2px solid var(--ink);
        background: var(--mustard);
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

    const popDevice = HardwareRegistry.getDevice(st.browseDevice);
    const popControl = st.popoverControlId ? HardwareRegistry.getControl(st.browseDevice, st.popoverControlId) : null;

    const idNow = this.store.ident(st.bank, st.selectedKey);
    const shared = this.store.sharedColors();
    const dimmed = PALETTE.map((p) => p[0]).filter((n) => shared.length > 0 && !shared.includes(n));
    const canName = this.store.displayTargets().length > 0 || shared.length > 0;
    const stripBg = idNow.color ? HEX[idNow.color] : '#16323d';
    const stripInk = TEXTHEX[idNow.textColor];

    const flags: string[] = [];
    if (canName) {
      this.store.displayTargets().forEach((t) => {
        if (idNow.raw.name && idNow.name.length > t.name) {
          flags.push(`${t.label.toLowerCase()} shows “${idNow.name.slice(0, t.name)}”`);
        }
        if (idNow.secondary && !t.secondary) {
          flags.push(`${t.label.toLowerCase()} drops the second line`);
        } else if (idNow.secondary && idNow.secondary.length > t.secondary) {
          flags.push(`${t.label.toLowerCase()} trims line two to “${idNow.secondary.slice(0, t.secondary)}”`);
        }
      });
      if (idNow.color && shared.length > 0 && !shared.includes(idNow.color)) {
        const cant = this.store.namingTargets().filter((t) => t.colors && t.colors.length > 0 && !t.colors.includes(idNow.color!));
        if (cant.length) {
          flags.push(`${idNow.color} is out of range on ${cant.map((t) => t.label.toLowerCase()).join(' + ')}`);
        }
      }
    }

    return html`
      <button class="grabber" @click=${() => this.store.toggleSheet()}></button>

      <div class="head">
        <div class="head-row">
          <span class="switch-tag">${st.selectedKey}</span>
          ${canName
            ? html`
                <div class="strip-card" style="background:${stripBg}">
                  <input
                    class="name-input"
                    style="color:${stripInk}"
                    .value=${idNow.raw.name || ''}
                    placeholder=${idNow.auto || 'name this stack'}
                    maxlength="24"
                    @input=${(e: InputEvent) => this.store.setIdent({ name: (e.target as HTMLInputElement).value })}
                  />
                  <input
                    class="secondary-input"
                    style="color:${stripInk}"
                    .value=${idNow.secondary}
                    placeholder=${idNow.autoSec || 'second line'}
                    maxlength="24"
                    @input=${(e: InputEvent) => this.store.setIdent({ secondary: (e.target as HTMLInputElement).value })}
                  />
                </div>
                <button
                  class="color-btn"
                  title=${idNow.color ? `strip colour · ${idNow.color}` : 'give this stack a colour'}
                  style="background:${idNow.color ? HEX[idNow.color] : 'repeating-linear-gradient(135deg,#fffbf0 0 4px,#e9e0cc 4px 8px)'}"
                  @click=${() => this.store.toggleColorPicker()}
                ></button>
              `
            : html`<div class="title">switch ${st.selectedKey} macro</div>`}

          <span class="capacity" style=${list.length >= MAX_STEPS ? 'background:var(--full-border-bg)' : 'background:transparent'}
            >${list.length} / ${MAX_STEPS}</span
          >
          <button class="chevron" @click=${() => this.store.toggleSheet()}>${open ? '⌄' : '⌃'}</button>

          ${st.colorPickerOpen
            ? html`
                <div class="color-popover">
                  <div class="color-pop-head">
                    <span class="color-pop-title">switch ${st.selectedKey} lights up…</span>
                    <button class="color-pop-close" @click=${() => this.store.closeColorPicker()}>×</button>
                  </div>
                  <div class="color-grid">
                    ${PALETTE.map(([cName, hex]) => {
                      const allowed = shared.length === 0 || shared.includes(cName);
                      const on = idNow.color === cName;
                      return html`
                        <button
                          class="color-swatch"
                          title=${allowed ? cName : `${cName} — not in this rig's palette`}
                          style="background:${hex}"
                          ?active=${on}
                          ?disabled=${!allowed}
                          @click=${() => {
                            this.store.setIdent({ color: on ? null : cName });
                            this.store.closeColorPicker();
                          }}
                        ></button>
                      `;
                    })}
                  </div>
                  <div class="text-row">
                    <span class="text-lbl">text</span>
                    ${TEXTS.map(([tName, hex]) => {
                      const on = idNow.textColor === tName;
                      return html`
                        <button
                          class="text-opt"
                          title=${`text in ${tName}${idNow.autoText ? ' — picked automatically until you choose' : ''}`}
                          ?active=${on}
                          @click=${() => this.store.setIdent({ textColor: tName })}
                        >
                          <span class="text-dot" style="background:${hex}"></span>
                          <span>${tName}</span>
                        </button>
                      `;
                    })}
                  </div>
                  <div class="color-pop-note">
                    ${shared.length > 0
                      ? `every device in the rig can light these. ${
                          dimmed.length ? `${dimmed.join(', ')} ${dimmed.length === 1 ? 'is' : 'are'} out of range.` : ''
                        }`
                      : 'no device in this rig has a light — colour rides along on the label sheet only.'}
                  </div>
                </div>
              `
            : null}
        </div>

        ${flags.length > 0
          ? html`
              <div class="flags-row">
                ${flags.map(
                  (f) => html`
                    <button class="flag-btn" title="see how each device renders this" @click=${() => this.store.openSettings()}>
                      <span class="flag-dot"></span>
                      <span>${f}</span>
                    </button>
                  `,
                )}
              </div>
            `
          : null}

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

      ${popControl && popDevice
        ? html`
            <div class="popover">
              <div class="popover-head">
                <span class="pop-dot" style="background:${popDevice.accent}"></span>
                <span class="pop-title">${popControl.label} lands on…</span>
                <button class="pop-close" @click=${() => this.store.closePopover()}>×</button>
              </div>
              <div class="pop-options">
                ${HardwareRegistry.valueOptionsFor(popControl).map((opt) => {
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
