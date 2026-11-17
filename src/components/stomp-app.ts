import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import {
  tokens,
  resetAndButton,
  motionKeyframes,
  renderHintPopover,
} from '../styles/shared.js';
import { ACTIONS, SIDE_LABELS } from '../data/controllers.js';
import { HardwareRegistry } from '../data/registry.js';
import { CONTROLLERS } from '../data/controllers.js';
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
  private rigFileRef = createRef<HTMLInputElement>();

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

  private onGlobalActivity = (e: Event) => {
    if (this.store.state.tourStep === null) return;
    const path = typeof e.composedPath === 'function' ? e.composedPath() : [];
    const insideCard = path.some(
      (n) => n instanceof HTMLElement && n.hasAttribute('data-tour-card')
    );
    this.store.tourActivity(insideCard);
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointerdown', this.onGlobalActivity, true);
    window.addEventListener('keydown', this.onGlobalActivity, true);
    try {
      const key = this.phone ? 'stompstacks.tour.v4.m' : 'stompstacks.tour.v4';
      if (localStorage.getItem(key) !== '1' && this.store.state.setupStep === null) {
        this.store.startTour();
      }
    } catch {
      // ignore storage errors
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointerdown', this.onGlobalActivity, true);
    window.removeEventListener('keydown', this.onGlobalActivity, true);
  }

  private pipStyle(on: boolean) {
    return `width:6px;height:6px;flex:none;border-radius:50%;background:${on ? '#5bb85b' : 'rgba(22,50,61,.25)'
      };transition:background 200ms ease${on ? ';animation:breathe 2.4s ease-in-out infinite' : ''
      }`;
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
            ? ` changes reach all ${usage[ea.id]} ${usage[ea.id] === 1 ? 'place' : 'places'
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

    const headerStyle = `display:flex;align-items:center;gap:${this.phone ? 6 : 14
      }px;padding:0 ${this.desktop ? 26 : this.phone ? 10 : 14
      }px;height:${this.desktop ? 70 : 58
      }px;flex:none;border-bottom:2.5px solid #16323d;background:#fffbf0`;
    const logoStyle = `width:${this.desktop ? 30 : 28}px;height:${this.desktop ? 30 : 28
      }px;border-radius:9px;background:#f7c948;border:2.5px solid #16323d;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700`;
    const wordmarkStyle = `font-size:${this.desktop ? 19 : 16.5
      }px;font-weight:600;letter-spacing:-.02em;white-space:nowrap;display:${this.phone ? 'none' : 'inline'
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
            ${this.renderRigSwitch()}
          </div>

          <div style="flex:1"></div>

          ${!this.desktop && !this.phone
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
                    >capabilities</span
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
            ${!this.phone || connCount
        ? html`<span style="font-family:'DM Mono',monospace;font-size:11px"
                  >${connCount
            ? this.phone
              ? `${connCount}`
              : `${connCount} plugged in`
            : 'connect'}</span
                >`
        : null}
          </button>

          ${!this.phone
        ? html`
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
              `
        : null}

          <button
            class="hover-mustard"
            title="face style & rig setup"
            style="width:${this.desktop ? 38 : 34}px;height:${this.desktop
        ? 38
        : 34}px;flex:none;border-radius:50%;border:2.5px solid #16323d;background:#fffbf0;display:flex;align-items:center;justify-content:center;font-size:15px;transition:background 150ms ease${st.tourStep !==
        null
          ? ';opacity:.3;pointer-events:none'
          : ''}"
            @click=${() => this.store.openSettings()}
          >
            ⚙
          </button>

          <button
            data-tour="t4"
            class="cook-btn"
            style="display:flex;align-items:center;gap:9px;flex:none;padding:${this
        .desktop
        ? '10px 18px'
        : '9px 14px'};border-radius:22px;background:#f7c948;border:2.5px solid #16323d;box-shadow:${st.tourStep ===
        3
          ? '0 0 0 4px #fffbf0,0 0 0 7px #f7c948,3px 3px 0 7px #16323d'
          : '3px 3px 0 #16323d'};font-size:${this.desktop
        ? 14
        : 13}px;font-weight:600;transition:transform 160ms cubic-bezier(.23,1,.32,1),box-shadow 160ms cubic-bezier(.23,1,.32,1)${st.tourStep !==
        null && st.tourStep < 3
          ? ';opacity:.3;pointer-events:none'
          : ''}"
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
                style="${this.tourZoneStyle(1)}"
              ></capabilities-aside>`
        : null}

          ${!this.desktop && !this.phone && st.libOpen
        ? html`
                <div
                  class="drawer-scrim"
                  @click=${() => this.store.setLibOpen(false)}
                ></div>
                <capabilities-aside
                  .store=${this.store}
                  drawer
                  style="${this.tourZoneStyle(1)}"
                ></capabilities-aside>
              `
        : null}

          ${this.phone && st.mobileTab === 'sounds'
        ? html`
                <div
                  style="flex:1;min-height:0;display:flex;flex-direction:column;padding-bottom:84px"
                >
                  <capabilities-aside
                    .store=${this.store}
                    style="width:100%;flex:1;min-height:0;border-right:0"
                  ></capabilities-aside>
                </div>
              `
        : null}

          <main
            style="flex:1;min-width:0;min-height:0;display:${this.phone &&
              st.mobileTab !== 'rig' &&
              st.mobileTab !== 'pedal'
              ? 'none'
              : 'flex'};flex-direction:column${this.phone
              ? ';overflow-y:auto;overflow-x:hidden;padding-bottom:84px'
              : ''}"
          >
            ${this.phone && !build && st.mobileTab === 'rig'
        ? html`
                  <div style="flex:1;min-height:0;overflow-y:auto;padding:14px">
                    <controller-graphic
                      .store=${this.store}
                      phone
                    ></controller-graphic>
                  </div>
                `
        : null}

            ${!this.phone || st.mobileTab === 'pedal'
        ? html`
                  <div
                    style="position:relative;z-index:20;display:flex;align-items:flex-start;gap:12px;padding:${this
                .desktop
                ? '14px 26px'
                : '12px 14px 6px'};flex:none;overflow:visible"
                  >
                    ${!this.phone
                ? html`
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
                        `
                : null}
                    <device-tabs
                      .store=${this.store}
                      ?phone=${this.phone}
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
                `
        : null}
          </main>

          <section
            style=${this.phone
        ? `flex:1;min-height:0;display:${st.mobileTab === 'stack' ? 'flex' : 'none'};flex-direction:column;background:#fffbf0;padding-bottom:84px`
        : `width:${this.desktop ? 380 : 330
        }px;flex:none;display:flex;flex-direction:column;background:#fffbf0;border-left:2.5px solid #16323d;min-height:0`}
          >
            ${!this.phone && !build
        ? html`
                  <div
                    style="flex:none;padding:16px 18px 18px;border-bottom:2.5px solid #16323d;${this.tourZoneStyle(0)}"
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
              style="flex:1;min-height:0;display:flex;flex-direction:column;${this.tourZoneStyle(2)}"
            ></macro-panel>
          </section>
        </div>

        ${this.phone ? this.renderMobileTabs() : null}
        ${this.renderTourGhost()}
        ${this.renderTourCard()}

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
        ${this.renderRigMenu()}
      </div>
    `;
  }

  private syncDotColor(tone: 'none' | 'dirty' | 'ok'): string {
    if (tone === 'ok') return '#7cc68a';
    if (tone === 'dirty') return '#ef7d5c';
    return 'rgba(22,50,61,.25)';
  }

  private renderRigSwitch() {
    const st = this.store.state;
    const cur = this.store.currentRig();
    if (!cur) return null;
    const sync = this.store.syncInfo(cur, {
      banks: st.banks,
      controllerId: st.controllerId,
      brainId: st.brainId,
      channels: st.channels,
      rig: st.rig,
      naming: st.naming,
      actions: st.actions,
      pedalSets: st.pedalSets,
      offsets: st.offsets,
    });
    const dotCol = this.syncDotColor(sync.tone);

    return html`
      <button
        class="hover-shadow"
        title="switch, save or export rig"
        style="display:flex;align-items:center;gap:8px;padding:${this.phone
        ? '5px 9px'
        : '5px 11px'};border-radius:14px;border:2px solid #16323d;background:${st.rigMenuOpen
          ? '#fdf3d4'
          : '#fffbf0'};transition:background 150ms ease,box-shadow 150ms ease;max-width:${this
            .phone
            ? '150px'
            : '210px'}"
        @click=${() => this.store.toggleRigMenu()}
      >
        <span
          style="display:flex;flex-direction:column;align-items:flex-start;gap:2px;min-width:0"
        >
          <span
            style="font-size:12.5px;font-weight:600;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%"
            >${cur.name}</span
          >
          <span
            style="display:flex;align-items:center;gap:5px;font-family:'DM Mono',monospace;font-size:9.5px;opacity:.7;white-space:nowrap"
          >
            <span
              style="width:7px;height:7px;flex:none;border-radius:50%;border:1.5px solid #16323d;background:${dotCol}"
            ></span>
            ${sync.label}
          </span>
        </span>
        <span style="font-size:10px;opacity:.5">▾</span>
      </button>
    `;
  }

  private renderRigMenu() {
    const st = this.store.state;
    if (!st.rigMenuOpen) return null;

    const liveSnap = {
      banks: st.banks,
      controllerId: st.controllerId,
      brainId: st.brainId,
      channels: st.channels,
      rig: st.rig,
      naming: st.naming,
      actions: st.actions,
      pedalSets: st.pedalSets,
      offsets: st.offsets,
    };

    const menuStyle = `position:fixed;left:${this.phone ? 12 : 18}px;top:${this.desktop ? 62 : 56
      }px;width:${this.phone ? 'calc(100vw - 24px)' : '320px'};max-height:78vh;z-index:76;display:flex;flex-direction:column;background:#fffbf0;border:2.5px solid #16323d;border-radius:22px;box-shadow:6px 6px 0 #16323d;overflow:hidden;animation:sheetIn 160ms cubic-bezier(.23,1,.32,1)`;

    const canDelete = st.rigs.length >= 2;

    return html`
      <div
        style="position:fixed;inset:0;z-index:75"
        @click=${() => this.store.closeRigMenu()}
      ></div>
      <div style=${menuStyle}>
        <div
          style="flex:none;display:flex;align-items:center;justify-content:space-between;padding:12px 14px 6px"
        >
          <span
            style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;opacity:.55"
            >your rigs · saved on this device</span
          >
        </div>

        <div
          style="flex:1;min-height:0;overflow:auto;padding:0 6px 6px;display:flex;flex-direction:column;gap:2px"
        >
          ${st.rigs.map((r) => {
      const on = r.id === st.rigId;
      const sync = this.store.syncInfo(r, on ? liveSnap : undefined);
      const ctrl = HardwareRegistry.getController(r.data.controllerId);
      const sub = `${ctrl.short} · ${r.data.rig.length} ${r.data.rig.length === 1 ? 'pedal' : 'pedals'
        } · ${sync.label}`;
      return html`
              <button
                style="display:flex;align-items:center;gap:10px;width:100%;padding:9px 10px;border-radius:14px;text-align:left;background:${on
          ? '#fdf3d4'
          : 'transparent'};transition:background 140ms ease"
                @click=${() => this.store.switchRig(r.id)}
              >
                <span
                  style="width:9px;height:9px;flex:none;border-radius:50%;border:2px solid #16323d;background:${this.syncDotColor(
            sync.tone
          )}"
                ></span>
                <span
                  style="display:flex;flex-direction:column;gap:2px;min-width:0;flex:1"
                >
                  <span
                    style="font-size:14px;font-weight:600;text-wrap:pretty"
                    >${r.name}</span
                  >
                  <span
                    style="font-family:'DM Mono',monospace;font-size:10.5px;opacity:.6"
                    >${sub}</span
                  >
                </span>
                ${on ? html`<span style="font-size:9px;opacity:.6">●</span>` : null}
              </button>
            `;
    })}
        </div>

        <div
          style="flex:none;border-top:2.5px solid #16323d;padding:10px 12px;display:flex;flex-direction:column;gap:8px;background:#fdf3d4"
        >
          ${st.rigRenaming
        ? html`
                <input
                  .value=${st.rigDraft}
                  autofocus
                  style="width:100%;padding:8px 11px;border-radius:12px;border:2px solid #16323d;background:#fffbf0;font-family:inherit;font-size:14px;font-weight:600;color:#16323d;outline:none"
                  @input=${(e: Event) =>
            this.store.setRigDraft((e.target as HTMLInputElement).value)}
                  @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter') this.store.commitRenameRig();
            else if (e.key === 'Escape') this.store.cancelRenameRig();
          }}
                  @blur=${() => this.store.commitRenameRig()}
                />
              `
        : null}

          <div style="display:flex;flex-wrap:wrap;gap:4px">
            ${!st.rigRenaming
        ? html`
                  <button
                    style="padding:7px 11px;border-radius:14px;font-size:12.5px;font-weight:600;transition:background 140ms ease"
                    @click=${() => this.store.startRenameRig()}
                  >
                    rename
                  </button>
                `
        : null}
            <button
              style="padding:7px 11px;border-radius:14px;font-size:12.5px;font-weight:600;transition:background 140ms ease"
              @click=${() => this.store.dupRig()}
            >
              duplicate
            </button>
            <button
              style="padding:7px 11px;border-radius:14px;font-size:12.5px;font-weight:600;transition:background 140ms ease"
              @click=${() => this.store.exportRig()}
            >
              export file
            </button>
            <button
              style="padding:7px 11px;border-radius:14px;font-size:12.5px;font-weight:600;transition:background 140ms ease;${canDelete
        ? st.rigDeleteConfirm
          ? 'background:#ef7d5c;color:#fffbf0'
          : 'color:#c44525'
        : 'opacity:.35;pointer-events:none'}"
              @click=${() => this.store.deleteRig()}
            >
              ${st.rigDeleteConfirm ? 'tap again to delete' : 'delete'}
            </button>
          </div>

          <div style="display:flex;gap:8px">
            <button
              style="flex:1;padding:9px 12px;border-radius:16px;background:#f7c948;border:2.5px solid #16323d;box-shadow:2px 2px 0 #16323d;font-size:13px;font-weight:600"
              @click=${() => this.store.newRig()}
            >
              + new rig
            </button>
            <button
              style="flex:1;padding:9px 12px;border-radius:16px;background:#fffbf0;border:2.5px solid #16323d;font-size:13px;font-weight:600"
              @click=${() => this.rigFileRef.value?.click()}
            >
              import file
            </button>
          </div>

          <input
            ${ref(this.rigFileRef)}
            type="file"
            accept=".json"
            style="display:none"
            @change=${(e: Event) => {
        const input = e.target as HTMLInputElement;
        this.store.importRig(input.files?.[0]);
        input.value = '';
      }}
          />
        </div>
      </div>
    `;
  }

  private renderMobileTabs() {
    const st = this.store.state;
    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS.chocolate;
    const mt = st.mobileTab || 'pedal';
    const list = this.store.activeStack;
    const tabs: Array<'rig' | 'pedal' | 'stack' | 'sounds'> = [
      'rig',
      'pedal',
      'stack',
      'sounds',
    ];
    const activeIdx = Math.max(0, tabs.indexOf(mt));
    const pillStyle = `position:absolute;top:5px;bottom:5px;left:calc(5px + ${activeIdx} * (100% - 10px) / 4);width:calc((100% - 10px) / 4);border-radius:18px;background:#f7c948;border:2.5px solid #16323d;box-shadow:2px 2px 0 #16323d;transition:left 460ms cubic-bezier(.34,1.45,.5,1);pointer-events:none`;

    return html`
      <nav
        style="position:fixed;left:10px;right:10px;bottom:calc(10px + env(safe-area-inset-bottom));z-index:62;height:64px;display:flex;padding:5px;border-radius:24px;background:#fffbf0;border:2.5px solid #16323d;box-shadow:4px 4px 0 #16323d"
      >
        <span style=${pillStyle}></span>
        ${tabs.map((id) => {
          const on = mt === id;
          const fill = on ? '#fffbf0' : 'transparent';
          const badge =
            id === 'stack'
              ? list.length
                ? String(list.length)
                : ''
              : id === 'rig'
                ? ctrl.isBrain
                  ? String(st.bank + 1)
                  : st.selectedKey
                : '';
          return html`
            <button
              style="position:relative;z-index:1;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border-radius:18px;transition:transform 140ms cubic-bezier(.23,1,.32,1)"
              @click=${() => this.store.setMobileTab(id)}
            >
              <span
                style="position:relative;display:flex;transition:transform 420ms cubic-bezier(.34,1.56,.64,1);transform:${on
                  ? 'translateY(-1px) scale(1.12) rotate(-6deg)'
                  : 'none'}"
              >
                ${id === 'rig'
                  ? html`<svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#16323d"
                      stroke-width="2.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect
                        x="3.5"
                        y="6"
                        width="17"
                        height="12"
                        rx="3.5"
                        fill=${fill}
                      ></rect>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>`
                  : id === 'pedal'
                    ? html`<svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#16323d"
                        stroke-width="2.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="8" fill=${fill}></circle>
                        <path d="M12 12 L15.5 7.5"></path>
                        <path d="M6.5 18.5 L5 20 M17.5 18.5 L19 20"></path>
                      </svg>`
                    : id === 'stack'
                      ? html`<svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#16323d"
                          stroke-width="2.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="16"
                            height="4.5"
                            rx="2.2"
                            fill=${fill}
                          ></rect>
                          <rect
                            x="4"
                            y="10"
                            width="16"
                            height="4.5"
                            rx="2.2"
                            fill=${fill}
                          ></rect>
                          <rect
                            x="4"
                            y="16"
                            width="11"
                            height="4.5"
                            rx="2.2"
                          ></rect>
                        </svg>`
                      : html`<svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#16323d"
                          stroke-width="2.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M3 12 C5 12 5.5 6 7.5 6 S10 18 12 18 S14.5 6 16.5 6 S19 12 21 12"
                          ></path>
                        </svg>`}
                ${badge
                  ? html`
                      <span
                        style="position:absolute;top:-6px;right:-11px;min-width:17px;height:17px;padding:0 4px;border-radius:9px;border:2px solid #16323d;background:${on
                          ? '#16323d'
                          : '#f7c948'};color:${on
                          ? '#f7c948'
                          : '#16323d'};font-family:'DM Mono',monospace;font-size:9.5px;font-weight:500;line-height:13px;text-align:center"
                        >${badge}</span
                      >
                    `
                  : null}
              </span>
              <span
                style="font-size:11.5px;font-weight:${on
                  ? 700
                  : 600};letter-spacing:.01em;opacity:${on ? 1 : 0.55}"
                >${id}</span
              >
            </button>
          `;
        })}
      </nav>
    `;
  }

  private tourZoneStyle(zoneIndex: number): string {
    const t = this.store.state.tourStep;
    if (t === null || this.phone) return 'transition:opacity 240ms ease,filter 240ms ease';
    return (
      (t !== zoneIndex
        ? 'opacity:.28;filter:grayscale(.7);pointer-events:none;'
        : '') + 'transition:opacity 240ms ease,filter 240ms ease'
    );
  }

  private _lastGhostRectKey = '';

  updated() {
    const t = this.store.state.tourStep;
    if (t === null || this.store.state.setupStep !== null) {
      this._lastGhostRectKey = '';
      return;
    }
    const r = this.findTourRect(`[data-tour="t${t + 1}"]`);
    const key = r
      ? `${t}:${Math.round(r.left)}:${Math.round(r.top)}:${Math.round(r.width)}:${Math.round(r.height)}`
      : `${t}:none`;
    if (key !== this._lastGhostRectKey) {
      this._lastGhostRectKey = key;
      requestAnimationFrame(() => this.requestUpdate());
    }
  }

  private findTourRect(selector: string): DOMRect | null {
    const search = (root: Document | ShadowRoot): Element | null => {
      const hit = root.querySelector(selector);
      if (hit) {
        const b = hit.getBoundingClientRect();
        if (b.width > 0 && b.height > 0) return hit;
      }
      const all = root.querySelectorAll('*');
      for (const el of all) {
        if (el.shadowRoot) {
          const nested = search(el.shadowRoot);
          if (nested) return nested;
        }
      }
      return null;
    };
    const found = this.shadowRoot ? search(this.shadowRoot) : null;
    if (!found) return null;
    const b = found.getBoundingClientRect();
    if (b.width <= 0 || b.bottom <= 0 || b.top >= window.innerHeight) return null;
    return b;
  }

  private renderTourGhost() {
    const st = this.store.state;
    if (st.tourStep === null || st.setupStep !== null) return null;
    const t = st.tourStep + 1; // 1..4
    const r = this.findTourRect(`[data-tour="t${t}"]`);
    if (!r) return null;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const loop = '2.6s cubic-bezier(.23,1,.32,1) infinite';
    const fingerAnim = t === 3 ? `ghDrag ${loop}` : `tdFinger ${loop}`;
    const dropRect = t === 2 ? this.findTourRect('[data-tour-drop]') : null;
    const x0 = Math.max(8, r.left - 150);
    const gx = (dropRect ? dropRect.left + 30 : window.innerWidth - 320) - x0;
    const gy = (dropRect ? dropRect.top + 24 : 320) - r.top;

    return html`
      <div style="position:fixed;inset:0;z-index:64;pointer-events:none">
        <div
          style="position:absolute;left:${r.left - 4}px;top:${r.top -
          4}px;width:${r.width + 8}px;height:${r.height +
          8}px;border-radius:16px;border:2.5px dashed #16323d;opacity:.7;animation:ghGlow ${loop}"
        ></div>
        <div
          style="position:absolute;left:${cx - 22}px;top:${cy -
          22}px;width:44px;height:44px;border-radius:50%;border:3px solid #f7c948;animation:ghRing ${loop}"
        ></div>
        <div
          style="position:absolute;left:${cx - 13}px;top:${cy -
          13}px;width:26px;height:26px;border-radius:50%;border:2.5px solid #16323d;background:rgba(247,201,72,.6);box-shadow:2px 2px 0 rgba(22,50,61,.35);--fx:0px;--fy:0px;animation:${fingerAnim}"
        ></div>
        ${t === 2
          ? html`
              <div
                style="position:absolute;left:${x0}px;top:${r.top -
                2}px;padding:6px 11px;border-radius:12px;border:2.5px solid #16323d;background:#fff;box-shadow:2px 2px 0 #16323d;font-size:12.5px;font-weight:600;white-space:nowrap;--gx:${gx}px;--gy:${gy}px;animation:ghFly ${loop}"
              >
                + action
              </div>
            `
          : null}
      </div>
    `;
  }

  private renderTourCard() {
    const st = this.store.state;
    const t = st.tourStep;
    if (t === null || st.setupStep !== null) return null;
    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS.chocolate;
    const key = st.selectedKey;
    const pn = `p${String(st.bank + 1).padStart(3, '0')}`;
    const steps = ctrl.isBrain
      ? [
          {
            title: 'pick a preset to set up',
            body: 'the scribble’s switches step through presets: tap left to go back, right to go forward. each preset fires its own stack the moment you land on it. tap a switch, or the arrows on the screen, to move. not the gear you own? tap “change”.',
            btn: 'next',
            hint: 'or step to another preset to carry on',
          },
          {
            title: `what should ${pn} do when you land on it?`,
            body: `type the sound you're after, tap one of the sound chips, or take a suggestion. then hit its + button to put it on ${pn}.`,
            btn: 'next',
            hint: 'adding something moves you on too',
          },
          {
            title: `this is ${pn}'s stack`,
            body: `every row is one message, sent top to bottom as soon as you arrive on ${pn}. ${
              this.phone
                ? 'to change a value, hop to the pedal tab and tap a knob.'
                : 'tap a knob on the pedal photo to change a value.'
            } hold left or hold right can carry an extra stack too.`,
            btn: 'got it',
            hint: '',
          },
          {
            title: 'send it to your rig',
            body: "when you're happy, cook it up builds the file for the scribble, or sends it straight over when it's plugged in.",
            btn: 'finish',
            hint: '',
          },
        ]
      : [
          {
            title: 'pick a footswitch to set up',
            body: 'these are the footswitches on your controller. each one can fire a stack: several messages to your pedals from a single stomp. tap any switch to start with it. not the gear you own? tap “change” next to the controller or the brain.',
            btn: 'next',
            hint: 'or tap any switch to carry on',
          },
          {
            title: `what should switch ${key} do?`,
            body: `type the sound you're after, tap one of the sound chips, or take a suggestion. then hit its + button to put it on ${key}.`,
            btn: 'next',
            hint: 'adding something moves you on too',
          },
          {
            title: `this is ${key}'s stack`,
            body: `every row is one message, sent top to bottom when you stomp. ${
              this.phone
                ? 'to change a value, hop to the pedal tab and tap a knob. add more from the sounds tab.'
                : 'tap a knob on the pedal photo to change a value, or add more from capabilities.'
            }`,
            btn: 'got it',
            hint: '',
          },
          {
            title: 'send it to your rig',
            body: "when you're happy, cook it up builds the file your controller needs, or sends it straight over when it's plugged in.",
            btn: 'finish',
            hint: '',
          },
        ];
    const cur = steps[t] || steps[0];
    const W = this.winW || window.innerWidth;
    const colL = this.desktop ? 300 : 0;
    const colR = W - (this.desktop ? 380 : 330);
    const colW = Math.max(240, colR - colL);
    const cw = Math.min(W < 1100 ? 320 : 380, colW - 24);
    const placeStyle = this.phone
      ? 'left:12px;right:12px;bottom:86px'
      : `left:${Math.round(Math.max(colL + 12, colL + (colW - cw) / 2))}px;bottom:20px;width:${cw}px`;

    const cardStyle = `position:fixed;z-index:65;${placeStyle};transition:opacity 260ms ease,transform 260ms cubic-bezier(.23,1,.32,1);display:flex;flex-direction:column;gap:${
      this.phone ? 6 : 9
    }px;padding:${this.phone ? '11px 14px' : '16px 18px'};border-radius:22px;animation:sheetIn 260ms cubic-bezier(.23,1,.32,1);${
      st.tourFade
        ? 'background:rgba(255,240,184,.3);border:2.5px solid rgba(22,50,61,.35);box-shadow:3px 3px 0 rgba(22,50,61,.18);transform:scale(.98);pointer-events:none'
        : 'background:#fff0b8;border:2.5px solid #16323d;box-shadow:6px 6px 0 #16323d'
    }`;

    return html`
      <div
        data-tour-card="1"
        style=${cardStyle}
        @pointerenter=${() => this.store.tourWake()}
        @pointerdown=${() => this.store.tourWake()}
      >
        <div style="display:flex;align-items:center;gap:8px">
          <span style="display:flex;gap:4px">
            ${[0, 1, 2, 3].map(
              (i) => html`
                <span
                  style="width:${i === t
                    ? 16
                    : 7}px;height:7px;border-radius:4px;border:1.5px solid #16323d;background:${i <=
                  t
                    ? '#f7c948'
                    : 'transparent'};transition:width 200ms cubic-bezier(.23,1,.32,1)"
                ></span>
              `
            )}
          </span>
          <span
            style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;opacity:.55;white-space:nowrap"
            >your first stomp · ${t + 1}/4</span
          >
          <span style="flex:1"></span>
          <button
            style="padding:3px 8px;border-radius:10px;font-size:11.5px;font-weight:600;opacity:.55;white-space:nowrap"
            @click=${() => this.store.endTour()}
          >
            skip
          </button>
        </div>

        <div
          style="display:flex;flex-direction:column;gap:${this.phone
            ? 6
            : 9}px;transition:opacity 260ms ease;opacity:${st.tourFade
            ? 0.22
            : 1}"
        >
          <span
            style="font-size:${this.phone
              ? 16.5
              : 20}px;font-weight:600;letter-spacing:-.02em;line-height:1.2;text-wrap:pretty"
            >${cur.title}</span
          >
          <span
            style="font-size:${this.phone
              ? 12.5
              : 13.5}px;line-height:1.45;opacity:.75;text-wrap:pretty"
            >${cur.body}</span
          >
          <div
            style="display:flex;align-items:center;gap:10px;padding-top:${this
              .phone
              ? 7
              : 10}px;border-top:2px solid rgba(22,50,61,.15)"
          >
            ${t > 0
              ? html`
                  <button
                    style="padding:7px 12px;border-radius:16px;font-size:13px;font-weight:600;opacity:.6"
                    @click=${() => this.store.tourGo(t - 1)}
                  >
                    back
                  </button>
                `
              : null}
            <span
              style="flex:1;font-size:11.5px;line-height:1.35;opacity:.6;text-wrap:pretty"
              >${!this.phone ? cur.hint : ''}</span
            >
            <button
              style="padding:8px 16px;border-radius:18px;background:#f7c948;border:2.5px solid #16323d;box-shadow:2px 2px 0 #16323d;font-size:13.5px;font-weight:600"
              @click=${() =>
                t >= 3 ? this.store.endTour() : this.store.tourGo(t + 1)}
            >
              ${cur.btn}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stomp-app': StompApp;
  }
}
