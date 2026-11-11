import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  tokens,
  resetAndButton,
  motionKeyframes,
  renderHintPopover,
} from '../styles/shared.js';
import { ACTIONS, SIDE_LABELS } from '../data/controllers.js';
import { HardwareRegistry } from '../data/registry.js';
import { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

import './capabilities-aside.js';
import './controller-graphic.js';
import './device-tabs.js';
import './pedal-canvas.js';
import './macro-panel.js';
import './compile-modal.js';
import './settings-modal.js';
import './controller-picker-modal.js';
import './brain-picker-modal.js';
import './add-pedal-modal.js';
import './confirm-remove-modal.js';
import './connect-modal.js';
import './read-modal.js';
import './wire-monitor.js';
import './pedal-setups-modal.js';
import './conflict-modal.js';
import './setup-wizard-modal.js';

const PHONE_BREAKPOINT = 760;
const DESKTOP_BREAKPOINT = 1100;

@customElement('stomp-app')
export class StompApp extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    motionKeyframes,
    css`
      :host {
        display: block;
        height: 100vh;
        overflow: hidden;
      }
      .root {
        height: 100vh;
        min-height: 560px;
        display: flex;
        flex-direction: column;
        background: #f7f1e3;
        background-image: radial-gradient(#16323d1f 1.4px, transparent 1.4px);
        background-size: 22px 22px;
        overflow: hidden;
      }
      .hover-shadow:hover {
        box-shadow: 2px 2px 0 #16323d;
      }
      .hover-mustard:hover {
        background: #f7c948 !important;
      }
      .cook-btn:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 #16323d !important;
      }
      .drawer-scrim {
        position: fixed;
        inset: 0;
        z-index: 48;
        background: rgba(22, 50, 61, 0.35);
        animation: scrimIn 150ms ease;
      }
    `,
  ];

  private store = new StompStore();

  constructor() {
    super();
    new StoreController(this, this.store);
  }

  @property({ type: Boolean, reflect: true }) phone =
    window.innerWidth < PHONE_BREAKPOINT;
  @property({ type: Boolean, reflect: true }) desktop =
    window.innerWidth >= DESKTOP_BREAKPOINT;
  @property({ type: Number }) winW = window.innerWidth;

  private onResize = () => {
    this.winW = window.innerWidth;
    this.phone = this.winW < PHONE_BREAKPOINT;
    this.desktop = this.winW >= DESKTOP_BREAKPOINT;
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.onResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.onResize);
  }

  private pipStyle(on: boolean) {
    return `width:6px;height:6px;flex:none;border-radius:50%;background:${
      on ? '#5bb85b' : 'rgba(22,50,61,.25)'
    };transition:background 200ms ease${
      on ? ';animation:breathe 2.4s ease-in-out infinite' : ''
    }`;
  }

  private renderHeaderRig() {
    const st = this.store.state;
    const ctrl = HardwareRegistry.getController(st.controllerId);
    const brain = HardwareRegistry.getBrain(st.brainId);
    const livePedals = st.rig.filter((id) => st.conn[id]).length;
    const pedalSummary =
      st.rig.length <= 2
        ? st.rig
            .map((id) => HardwareRegistry.getDevice(id)?.name || id)
            .join(', ')
        : `${st.rig
            .slice(0, 2)
            .map((id) => HardwareRegistry.getDevice(id)?.name || id)
            .join(', ')} +${st.rig.length - 2}`;

    const rigChip = (bg: string) =>
      `display:flex;flex-direction:column;align-items:flex-start;padding:5px 12px;border-radius:14px;border:2px solid #16323d;background:${bg};line-height:1.3;text-align:left;transition:box-shadow 150ms cubic-bezier(.23,1,.32,1)`;

    if (this.winW >= 1200) {
      return html`
        <div style="display:flex;align-items:center">
          <button
            class="hover-shadow"
            style=${rigChip('#e8f4fa')}
            title="change controller"
            @click=${() => this.store.openControllerPicker()}
          >
            <span
              style="display:flex;align-items:center;gap:5px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;opacity:.5"
            >
              <span style=${this.pipStyle(!!st.conn[st.controllerId])}></span>
              <span>${ctrl.isBrain ? 'controller · brain' : 'controller'}</span>
            </span>
            <span style="font-size:12.5px;font-weight:600">${ctrl.short}</span>
          </button>
          ${!ctrl.isBrain
            ? html`
                <span style="font-size:12px;opacity:.3;padding:0 7px">→</span>
                <button
                  class="hover-shadow"
                  style=${rigChip(`${brain.colour}55`)}
                  title="what turns one press into several messages"
                  @click=${() => this.store.openBrainPicker()}
                >
                  <span
                    style="display:flex;align-items:center;gap:5px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;opacity:.5"
                  >
                    <span
                      style=${this.pipStyle(
                        st.brainId === 'scribble' && !!st.conn['scribble']
                      )}
                    ></span>
                    <span>brain</span>
                  </span>
                  <span style="font-size:12.5px;font-weight:600"
                    >${brain.short}</span
                  >
                </button>
              `
            : null}
          <span style="font-size:12px;opacity:.3;padding:0 7px">→</span>
          <div style="${rigChip('#f7f1e3')};cursor:default">
            <span
              style="display:flex;align-items:center;gap:5px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;opacity:.5"
            >
              <span
                style=${this.pipStyle(st.rig.some((id) => st.conn[id]))}
              ></span>
              <span
                >${livePedals
                  ? `pedals ${livePedals}/${st.rig.length}`
                  : 'pedals'}</span
              >
            </span>
            <span style="font-size:12.5px;font-weight:600"
              >${pedalSummary}</span
            >
          </div>
        </div>
      `;
    }

    if (!this.phone) {
      return html`
        <button
          style="display:flex;align-items:center;gap:6px;padding:6px 11px;border-radius:16px;border:2px solid #16323d;background:#e8f4fa;font-family:'DM Mono',monospace;font-size:10.5px;flex:none"
          title="rig"
          @click=${() => this.store.openBrainPicker()}
        >
          ${ctrl.isBrain ? ctrl.short : `${ctrl.short} → ${brain.short}`}
        </button>
      `;
    }

    return null;
  }

  private renderCenterBanners() {
    const st = this.store.state;
    const build = st.mode === 'build' && !!st.actEdit;
    const ea = st.actEdit ? this.store.actionById(st.actEdit) : null;
    const lensCap = st.lens ? this.store.capOf(st.lens) : null;
    const ctrl = HardwareRegistry.getController(st.controllerId);
    const acts = this.store.availableActions();
    const usage = this.store.actionUsage();

    const lensUses: Array<{ bi: number; k: string; a: string; label: string }> =
      [];
    if (st.lens && !build) {
      st.banks.forEach((b, bi) => {
        Object.keys(b).forEach((k) => {
          acts.forEach((a) => {
            if (this.store.listCaps(b[k][a.id]).includes(st.lens!)) {
              const label =
                (ctrl.nav
                  ? `p${String(bi + 1).padStart(3, '0')} ${SIDE_LABELS[k] || k}`
                  : `b${bi + 1} · ${k}`) + ` ${a.label}`;
              lensUses.push({ bi, k, a: a.id, label });
            }
          });
        });
      });
    }

    return html`
      ${lensCap && !build
        ? html`
            <div
              style="position:relative;z-index:15;flex:none;display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:0 ${this
                .desktop
                ? 26
                : 14}px 6px;padding:8px 10px 8px 12px;border-radius:16px;border:2.5px solid #16323d;background:${lensCap.colour}66;animation:stepIn 160ms cubic-bezier(.23,1,.32,1)"
            >
              <span
                style="width:14px;height:14px;flex:none;border-radius:5px;border:2px solid #16323d;background:${lensCap.colour}"
              ></span>
              <span style="font-size:13px;font-weight:600;flex:none"
                >${lensCap.name}</span
              >
              <span style="font-size:12px;opacity:.65;flex:none"
                >${lensUses.length
                  ? 'is on'
                  : "isn't on any stack yet — the pedal shows what its actions reach"}</span
              >
              <div
                style="display:flex;flex-wrap:wrap;gap:5px;flex:1;min-width:0"
              >
                ${lensUses.slice(0, 40).map((u) => {
                  const here =
                    u.bi === st.bank &&
                    u.k === st.selectedKey &&
                    u.a === st.action;
                  return html`
                    <button
                      style="flex:none;padding:3px 9px;border-radius:10px;border:2px solid #16323d;font-family:'DM Mono',monospace;font-size:11px;background:${here
                        ? '#16323d'
                        : '#fffbf0'};color:${here ? '#fdf3d4' : '#16323d'}"
                      @click=${() => {
                        this.store.setBank(u.bi);
                        this.store.selectSwitch(u.k);
                        this.store.selectAction(u.a as any);
                      }}
                    >
                      ${u.label}
                    </button>
                  `;
                })}
              </div>
              <button
                title="turn the lens off"
                style="width:24px;height:24px;flex:none;border-radius:50%;border:2px solid #16323d;background:#fffbf0;font-size:12px;line-height:1;display:flex;align-items:center;justify-content:center"
                @click=${() => this.store.setLens(null)}
              >
                ×
              </button>
            </div>
          `
        : null}
      ${build && ea
        ? html`
            <div
              style="flex:none;display:flex;align-items:center;gap:10px;margin:0 ${this
                .desktop
                ? 26
                : 14}px 6px;padding:8px 13px;border-radius:14px;font-size:12.5px;line-height:1.4;text-wrap:pretty;border:2px solid #16323d;background:#f7c948"
            >
              <span style="flex:1;min-width:0;text-wrap:pretty">
                editing “${ea.name}” — tap a control to add it. its number
                matches the list on the right, where you set its value.${usage[
                  ea.id
                ]
                  ? ` changes reach all ${usage[ea.id]} ${
                      usage[ea.id] === 1 ? 'place' : 'places'
                    } it's used.`
                  : ''}
              </span>
              <button
                style="flex:none;padding:6px 14px;border-radius:14px;background:#16323d;color:#fdf3d4;font-size:12.5px;font-weight:600"
                @click=${() => this.store.setMode('assign', null)}
              >
                done
              </button>
            </div>
          `
        : null}
    `;
  }

  render() {
    const total = this.store.totalAssigned;
    const st = this.store.state;
    const connCount = Object.keys(st.conn).filter((k) => st.conn[k]).length;
    const build = st.mode === 'build' && !!st.actEdit;
    const ea = st.actEdit ? this.store.actionById(st.actEdit) : null;
    const ctrl = HardwareRegistry.getController(st.controllerId);
    const curActLabel =
      ACTIONS.find((a) => a.id === st.action)?.label || st.action;
    const slotName =
      (ctrl.nav
        ? `${st.selectedKey === 'L' ? 'left' : 'right'} switch`
        : `switch ${st.selectedKey}`) + ` · ${curActLabel}`;

    const headerStyle = `display:flex;align-items:center;gap:${
      this.phone ? 6 : 14
    }px;padding:0 ${
      this.desktop ? 26 : this.phone ? 10 : 14
    }px;height:${
      this.desktop ? 70 : 58
    }px;flex:none;border-bottom:2.5px solid #16323d;background:#fffbf0`;
    const logoStyle = `width:${this.desktop ? 30 : 28}px;height:${
      this.desktop ? 30 : 28
    }px;border-radius:9px;background:#f7c948;border:2.5px solid #16323d;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700`;
    const wordmarkStyle = `font-size:${
      this.desktop ? 19 : 16.5
    }px;font-weight:600;letter-spacing:-.02em;white-space:nowrap;display:${
      this.phone ? 'none' : 'inline'
    }`;

    const hPedalBody =
      build && ea
        ? `you're editing “${ea.name}”. tap a control to add it to the action, pick a value to change it, tap the same value again to take it out.`
        : `tap any knob, switch or toggle to add it straight to ${slotName}. good for one-offs — if you'll want the same move elsewhere, make it an action instead.`;

    return html`
      <div class="root">
        <header style=${headerStyle}>
          <div style="display:flex;align-items:center;gap:10px;flex:none">
            <span style=${logoStyle}>S</span>
            <span style=${wordmarkStyle}>stomp stacks</span>
          </div>

          <div style="flex:1"></div>

          ${this.renderHeaderRig()}

          ${!this.desktop
            ? html`
                <button
                  class="hover-shadow"
                  title="capabilities"
                  style="display:flex;align-items:center;gap:6px;flex:none;padding:7px 11px;border-radius:18px;border:2px solid #16323d;background:${st.libOpen
                    ? '#f7c948'
                    : '#fffbf0'};transition:background 150ms ease,box-shadow 150ms ease"
                  @click=${() => this.store.toggleLibOpen()}
                >
                  <span
                    style="width:9px;height:9px;border-radius:50%;background:#f7c948;border:2px solid #16323d"
                  ></span>
                  <span style="font-size:12.5px;font-weight:600"
                    >${this.phone ? 'actions' : 'capabilities'}</span
                  >
                </button>
              `
            : null}

          <button
            class="hover-shadow"
            title="plug your gear in over USB"
            style="display:flex;align-items:center;gap:7px;flex:none;padding:${this
              .desktop
              ? '8px 13px'
              : '7px 11px'};border-radius:18px;border:2px solid #16323d;background:${connCount
              ? '#e7f5e7'
              : '#fffbf0'};transition:background 150ms ease,box-shadow 150ms ease"
            @click=${() => this.store.openConnect()}
          >
            <span style=${this.pipStyle(connCount > 0)}></span>
            <span style="font-size:12.5px;font-weight:600"
              >${connCount
                ? this.phone
                  ? `${connCount} live`
                  : `${connCount} plugged in`
                : this.phone
                  ? 'usb'
                  : 'plug in'}</span
            >
          </button>

          <button
            class="hover-mustard"
            title="show or hide the help buttons"
            style="width:${this.desktop ? 38 : 34}px;height:${this.desktop
              ? 38
              : 34}px;flex:none;border-radius:50%;border:2.5px solid #16323d;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:background 150ms ease;background:${st.hintAll
              ? '#f7c948'
              : '#fffbf0'}"
            @click=${() => this.store.toggleHintAll()}
          >
            ?
          </button>

          <button
            class="hover-mustard"
            title="face style & rig setup"
            style="width:${this.desktop ? 38 : 34}px;height:${this.desktop
              ? 38
              : 34}px;flex:none;border-radius:50%;border:2.5px solid #16323d;background:#fffbf0;display:flex;align-items:center;justify-content:center;font-size:15px;transition:background 150ms ease"
            @click=${() => this.store.openSettings()}
          >
            ⚙
          </button>

          <button
            class="cook-btn"
            style="display:flex;align-items:center;gap:9px;flex:none;padding:${this
              .desktop
              ? '10px 18px'
              : '9px 14px'};border-radius:22px;background:#f7c948;border:2.5px solid #16323d;box-shadow:3px 3px 0 #16323d;font-size:${this
              .desktop
              ? 14
              : 13}px;font-weight:600;transition:transform 160ms cubic-bezier(.23,1,.32,1),box-shadow 160ms cubic-bezier(.23,1,.32,1)"
            @click=${() => this.store.openCompile()}
          >
            <span>${this.winW >= 1280 ? 'cook it up' : 'cook'}</span>
            <span
              style="font-family:'DM Mono',monospace;font-size:11px;padding:2px 8px;border-radius:10px;background:#16323d;color:#f7c948"
              >${total}</span
            >
          </button>
        </header>

        <div
          style="flex:1;min-height:0;display:flex;flex-direction:${this.phone
            ? 'column'
            : 'row'}"
        >
          ${this.desktop
            ? html`<capabilities-aside
                .store=${this.store}
              ></capabilities-aside>`
            : null}

          ${!this.desktop && st.libOpen
            ? html`
                <div
                  class="drawer-scrim"
                  @click=${() => this.store.setLibOpen(false)}
                ></div>
                <capabilities-aside
                  .store=${this.store}
                  drawer
                ></capabilities-aside>
              `
            : null}

          <main
            style="flex:1;min-width:0;min-height:0;display:flex;flex-direction:column${this
              .phone
              ? ';overflow-y:auto;overflow-x:hidden'
              : ''}"
          >
            ${this.phone && !build
              ? html`
                  <div style="flex:none;padding:12px 14px 0">
                    <controller-graphic
                      .store=${this.store}
                    ></controller-graphic>
                  </div>
                `
              : null}

            <div
              style="position:relative;z-index:20;display:flex;align-items:flex-start;gap:12px;padding:${this
                .desktop
                ? '14px 26px'
                : '12px 14px 6px'};flex:none;overflow:visible"
            >
              <span
                style="display:flex;align-items:center;gap:6px;flex:none;padding-top:6px"
              >
                <span
                  style="font-family:'DM Mono',monospace;font-size:11px;opacity:.5"
                  >pedal</span
                >
                ${renderHintPopover(
                  this.store,
                  'pedal',
                  'left',
                  'tapping the pedal',
                  hPedalBody
                )}
              </span>
              <device-tabs
                .store=${this.store}
                style="flex:1;min-width:0"
              ></device-tabs>
            </div>

            ${this.renderCenterBanners()}

            <pedal-canvas
              .store=${this.store}
              ?phone=${this.phone}
              ?desktop=${this.desktop}
            ></pedal-canvas>

            ${st.monitorOn
              ? html`<wire-monitor .store=${this.store}></wire-monitor>`
              : null}
          </main>

          <section
            style=${this.phone
              ? `flex:none;display:flex;flex-direction:column;background:#fffbf0;border-top:2.5px solid #16323d;border-radius:20px 20px 0 0`
              : `width:${
                  this.desktop ? 380 : 330
                }px;flex:none;display:flex;flex-direction:column;background:#fffbf0;border-left:2.5px solid #16323d;min-height:0`}
          >
            ${!this.phone && !build
              ? html`
                  <div
                    style="flex:none;padding:16px 18px 18px;border-bottom:2.5px solid #16323d"
                  >
                    <controller-graphic
                      .store=${this.store}
                      ?desktop=${this.desktop}
                    ></controller-graphic>
                  </div>
                `
              : null}

            <macro-panel
              .store=${this.store}
              ?phone=${this.phone}
              ?desktop=${this.desktop}
            ></macro-panel>
          </section>
        </div>

        <compile-modal .store=${this.store} ?phone=${this.phone}></compile-modal>
        <settings-modal .store=${this.store}></settings-modal>
        <controller-picker-modal .store=${this.store}></controller-picker-modal>
        <brain-picker-modal .store=${this.store}></brain-picker-modal>
        <add-pedal-modal .store=${this.store}></add-pedal-modal>
        <confirm-remove-modal .store=${this.store}></confirm-remove-modal>
        <connect-modal .store=${this.store}></connect-modal>
        <read-modal .store=${this.store}></read-modal>
        <pedal-setups-modal .store=${this.store}></pedal-setups-modal>
        <conflict-modal .store=${this.store}></conflict-modal>
        <setup-wizard-modal .store=${this.store}></setup-wizard-modal>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stomp-app': StompApp;
  }
}
