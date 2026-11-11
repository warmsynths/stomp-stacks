import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  tokens,
  resetAndButton,
  motionKeyframes,
  renderHintPopover,
} from '../styles/shared.js';
import { CAPS } from '../data/capabilities.js';
import { ACTIONS } from '../data/controllers.js';
import { HardwareRegistry } from '../data/registry.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

@customElement('capabilities-aside')
export class CapabilitiesAside extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    motionKeyframes,
    css`
      :host {
        width: 300px;
        flex: none;
        display: flex;
        flex-direction: column;
        background: #fffbf0;
        border-right: 2.5px solid #16323d;
        min-height: 0;
      }
      :host([drawer]) {
        position: fixed;
        left: 0;
        top: 58px;
        bottom: 0;
        z-index: 50;
        width: min(330px, 88vw);
        box-shadow: 6px 0 0 #16323d;
        animation: sheetIn 170ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .head {
        flex: none;
        padding: 16px 18px 13px;
        border-bottom: 2.5px solid #16323d;
        background: #fdf3d4;
      }
      .head-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .head-title {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .setups-btn {
        padding: 4px 10px;
        border-radius: 12px;
        border: 2px solid #16323d;
        background: #fffbf0;
        font-size: 11.5px;
        font-weight: 600;
        transition: box-shadow 140ms ease;
      }
      .setups-btn:hover {
        box-shadow: 2px 2px 0 #16323d;
      }
      .close-drawer-btn {
        width: 26px;
        height: 26px;
        padding: 0;
        border-radius: 50%;
        border: 2px solid #16323d;
        background: #fffbf0;
        font-size: 13px;
        line-height: 1;
      }
      .list {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 12px 13px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .dashed-btn {
        padding: 5px 11px;
        border-radius: 12px;
        border: 2px dashed #16323d;
        font-size: 11.5px;
        font-weight: 600;
        opacity: 0.6;
        transition: opacity 140ms ease, background 140ms ease;
      }
      .dashed-btn:hover {
        opacity: 1;
        background: #fffbf0;
      }
      .edit-btn:hover {
        opacity: 1 !important;
      }
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  @property({ type: Boolean, reflect: true }) drawer = false;

  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  render() {
    const st = this.store.state;
    const curList = st.banks[st.bank]?.[st.selectedKey]?.[st.action] || [];
    const plainCount = curList.filter((s) => !s.act).length;
    const build = st.mode === 'build' && !!st.actEdit;
    const actObj = ACTIONS.find((a) => a.id === st.action);
    const curActLabel = actObj ? actObj.label : st.action;
    const ctrl = HardwareRegistry.getController(st.controllerId);
    const slotName =
      (ctrl.nav
        ? `${st.selectedKey === 'L' ? 'left' : 'right'} switch`
        : `switch ${st.selectedKey}`) + ` · ${curActLabel}`;
    const usageMap = this.store.actionUsage();

    return html`
      <div class="head">
        <div class="head-row">
          <span class="head-title">capabilities</span>
          ${renderHintPopover(
            this.store,
            'lib',
            'left',
            'what are capabilities & actions?',
            'capabilities are the five musical jobs in your rig. inside each one live actions — ready-made moves you can put on any switch. edit an action once and every switch that uses it gets the change.'
          )}
          <span style="flex:1"></span>
          <button
            class="setups-btn"
            title="the saved settings inside your pedals"
            @click=${() => this.store.openSetups()}
          >
            set-ups
          </button>
          ${this.drawer
            ? html`<button
                class="close-drawer-btn"
                title="close"
                @click=${() => this.store.setLibOpen(false)}
              >
                ×
              </button>`
            : null}
        </div>
      </div>

      <div class="list">
        ${CAPS.map((c) => {
          const open = !!st.capOpen[c.id];
          const acts = st.actions.filter((a) => a.caps.includes(c.id));
          const lensed = st.lens === c.id;
          const boxStyle = `flex:none;border-radius:18px;border:2.5px solid #16323d;background:${
            lensed ? `${c.colour}55` : '#f7f1e3'
          };box-shadow:${lensed ? '3px 3px 0 #16323d' : 'none'}`;
          const lensStyle = `padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;border:2px solid #16323d;transition:background 140ms ease;${
            lensed
              ? `background:#16323d;color:${c.colour}`
              : 'background:#fffbf0;opacity:.7'
          }`;

          return html`
            <div style=${boxStyle}>
              <div style="display:flex;align-items:center;gap:8px;padding:10px 11px">
                <button
                  style="flex:1;min-width:0;display:flex;align-items:center;gap:8px;padding:0;text-align:left"
                  @click=${() => this.store.toggleCapOpen(c.id)}
                >
                  <span
                    style="width:14px;height:14px;border-radius:5px;background:${c.colour};border:2px solid #16323d;flex:none"
                  ></span>
                  <span style="font-size:14px;font-weight:600">${c.name}</span>
                  <span
                    style="font-family:'DM Mono',monospace;font-size:10px;opacity:.55"
                    >${acts.length}</span
                  >
                  <span style="font-size:10px;opacity:.5;margin-left:2px"
                    >${open ? '▾' : '▸'}</span
                  >
                </button>
                <button
                  style=${lensStyle}
                  title="highlight every switch and knob that serves this capability"
                  @click=${() => this.store.setLens(c.id)}
                >
                  ${lensed ? 'seeing it' : 'where used?'}
                </button>
              </div>

              ${open
                ? html`
                    <div
                      style="padding:0 11px 11px;display:flex;flex-direction:column;gap:8px"
                    >
                      <div style="font-size:12px;line-height:1.45;opacity:.68">
                        ${c.blurb}
                      </div>
                      ${acts.map((a) => {
                        const useCount = usageMap[a.id] || 0;
                        const missing = this.store.missingFor(a);
                        const editing = build && st.actEdit === a.id;
                        const devs = [...new Set(a.steps.map((m) => m.device))];
                        const wi = this.store.wiggleInfo(a.steps);
                        const setObj = wi ? wi.set : null;
                        const setDev = setObj
                          ? HardwareRegistry.getDevice(setObj.device)
                          : null;
                        const others = a.caps
                          .filter((k) => k !== c.id)
                          .map((k) => this.store.capOf(k)?.name || k);
                        const note = missing.length
                          ? `skips ${missing.join(' + ')} — not in rig`
                          : useCount
                            ? `on ${useCount}${useCount === 1 ? ' press' : ' presses'}`
                            : others.length
                              ? `also ${others.join(', ')}`
                              : '';
                        const rowStyle = `padding:10px 11px;border-radius:14px;border:${
                          editing
                            ? `2.5px solid #16323d;box-shadow:3px 3px 0 #16323d;background:${c.colour}40`
                            : '2px solid #16323d;background:#fffbf0'
                        }`;
                        const setStyle = setObj
                          ? `display:block;width:100%;margin-top:8px;padding:5px 9px;border-radius:11px;text-align:left;font-size:11px;font-weight:600;border:2px solid #16323d;background:${
                              setObj.saved ? '#e7f5e7' : '#ffe6dd'
                            }`
                          : '';

                        return html`
                          <div style=${rowStyle}>
                            <div style="display:flex;align-items:baseline;gap:7px">
                              <span
                                style="font-size:13.5px;font-weight:600;flex:1;min-width:0"
                                >${a.name}</span
                              >
                              ${wi
                                ? html`<span
                                    style="flex:none;font-family:'DM Mono',monospace;font-size:9.5px;padding:1px 7px;border-radius:9px;border:2px solid #16323d;background:#f7c948"
                                    >${wi.bounce ? 'wiggle' : 'glide'}</span
                                  >`
                                : null}
                              <span
                                style="font-family:'DM Mono',monospace;font-size:10px;opacity:.45;flex:none"
                                >${a.steps.length} msg</span
                              >
                            </div>
                            <div
                              style="font-size:11.5px;line-height:1.45;opacity:.72;margin-top:3px"
                            >
                              ${a.what}
                            </div>
                            ${setObj
                              ? html`
                                  <button
                                    style=${setStyle}
                                    title="see or mark this pedal setup"
                                    @click=${() =>
                                      this.store.openSetups(setObj.id, setObj.device)}
                                  >
                                    ${setObj.saved
                                      ? `✓ ready on ${
                                          setDev ? setDev.name : setObj.device
                                        } — set up once, saved in its slot ${setObj.slot}`
                                      : `needs a one-time setup on ${
                                          setDev ? setDev.name : setObj.device
                                        } — show me how →`}
                                  </button>
                                `
                              : null}
                            <div
                              style="display:flex;align-items:center;gap:6px;margin-top:9px"
                            >
                              <span style="display:flex;gap:4px;flex:none">
                                ${devs.map((dId) => {
                                  const d = HardwareRegistry.getDevice(dId);
                                  return d
                                    ? html`<span
                                        title=${d.name}
                                        style="width:11px;height:11px;border-radius:4px;background:${d.accent};border:2px solid #16323d"
                                      ></span>`
                                    : null;
                                })}
                              </span>
                              <span
                                style="font-size:11px;opacity:.55;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
                                >${note}</span
                              >
                              <button
                                class="edit-btn"
                                title="open this action to change its messages"
                                style="flex:none;padding:4px 9px;border-radius:11px;font-size:11.5px;font-weight:600;${editing
                                  ? 'background:#16323d;color:#fdf3d4'
                                  : 'opacity:.6'}"
                                @click=${() =>
                                  editing
                                    ? this.store.setMode('assign', null)
                                    : this.store.setMode('build', a.id)}
                              >
                                ${editing ? 'editing' : 'edit'}
                              </button>
                              ${!editing
                                ? html`
                                    <button
                                      title=${missing.length === devs.length
                                        ? 'needs a pedal not in your rig'
                                        : `put this action on ${slotName}`}
                                      style="flex:none;padding:4px 11px;border-radius:12px;font-size:11.5px;font-weight:600;border:2px solid #16323d;background:${c.colour};box-shadow:2px 2px 0 #16323d${missing.length ===
                                      devs.length
                                        ? ';opacity:.35;pointer-events:none'
                                        : ''}"
                                      @click=${() => this.store.insertAction(a.id)}
                                    >
                                      + ${curActLabel}
                                    </button>
                                  `
                                : null}
                            </div>
                          </div>
                        `;
                      })}
                      <div style="display:flex;flex-wrap:wrap;gap:6px">
                        <button
                          class="dashed-btn"
                          @click=${() => this.store.newAction(c.id)}
                        >
                          + new action
                        </button>
                        ${plainCount > 0 && !build
                          ? html`
                              <button
                                class="dashed-btn"
                                title="bundle the loose messages on the current switch into a reusable action"
                                @click=${() => this.store.saveStackAsAction(c.id)}
                              >
                                save this ${curActLabel} as an action
                              </button>
                            `
                          : null}
                      </div>
                    </div>
                  `
                : null}
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capabilities-aside': CapabilitiesAside;
  }
}
