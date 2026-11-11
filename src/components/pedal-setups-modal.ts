import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  tokens,
  resetAndButton,
  modalScrim,
  motionKeyframes,
  renderHintPopover,
} from '../styles/shared.js';
import {
  SETUP_DEVICES,
  getDipLayout,
  explainSet,
  walkSteps,
  type PedalSetup,
  type DipSwitchItem,
} from '../data/setups.js';
import { HardwareRegistry } from '../data/registry.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

@customElement('pedal-setups-modal')
export class PedalSetupsModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    motionKeyframes,
    css`
      .hover-opa:hover {
        opacity: 1 !important;
      }
      .hover-paper:hover {
        background: #f7f1e3 !important;
      }
      .active-press:active {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 #16323d !important;
      }
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  private flipDip(cur: PedalSetup, d: DipSwitchItem) {
    if (!d.id || !d.kind) return;
    this.store.updateSet(cur.id, (s) => {
      if (d.kind === 'move') {
        s.move[d.id!] = !s.move[d.id!];
      } else if (d.kind === 'fall') {
        s.fall[d.id!] = !s.fall[d.id!];
      } else if (d.kind === 'bounce') {
        s.bounce = !s.bounce;
      } else if (d.kind === 'sweep') {
        s.sweep = s.sweep === 'top' ? 'bottom' : 'top';
      } else if (d.kind === 'shape') {
        s.shape = s.shape === 'square' ? 'tri' : 'square';
      } else if (d.kind === 'extra') {
        s.extras = {
          ...(s.extras || {}),
          [d.id!]: !(s.extras && s.extras[d.id!]),
        };
      }
      s.saved = false;
      return s;
    });
  }

  render() {
    const st = this.store.state;
    if (!st.setsOpen) return null;

    const so: PedalSetup | undefined =
      st.pedalSets.find((s) => s.id === st.setsOpen) || st.pedalSets[0];
    const activeDeviceId = so ? so.device : 'mood';
    const dev = HardwareRegistry.getDevice(activeDeviceId);
    const deviceSets = st.pedalSets.filter((s) => s.device === activeDeviceId);
    const enclosureBg =
      activeDeviceId === 'mood' ? '#f2a07e' : dev?.body || '#f2a07e';
    const tabActiveBg =
      activeDeviceId === 'mood' ? '#e8785a' : dev?.accent || '#e8785a';

    const layout = so ? getDipLayout(so) : null;
    const bankL = layout ? layout.left : [];
    const bankR = layout ? layout.right : [];
    const allDips = [...bankL, ...bankR];

    const walk = so
      ? walkSteps(so, {
          controllerId: st.controllerId,
          banks: st.banks,
          channels: st.channels,
          onCreateSaveButton: (s) => this.store.createSaveButtonOnP128(s),
        })
      : [];
    const wi = Math.min(st.walkIndex || 0, Math.max(0, walk.length - 1));
    const wStep = walk[wi];
    const soUsers = so
      ? st.actions.filter((a) =>
          a.steps.some((x) => x.control === 'pc' && x.set === so.id)
        )
      : [];
    const setExplain = so ? explainSet(so) : [];

    return html`
      <div
        class="scrim"
        style="z-index:94"
        @click=${(e: Event) =>
          e.target === e.currentTarget && this.store.closeSetups()}
      >
        <div
          class="sheet-in"
          style="width:660px;max-width:100%;max-height:92vh;display:flex;flex-direction:column;background:#fffbf0;border:2.5px solid #16323d;border-radius:26px;overflow:hidden;box-shadow:8px 8px 0 #16323d"
        >
          <div
            style="flex:none;padding:20px 24px 15px;border-bottom:2.5px solid #16323d;background:#fdf3d4"
          >
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span
                style="font-size:19px;font-weight:600;letter-spacing:-.02em"
                >${dev ? dev.name : 'MOOD'} set-ups</span
              >
              ${renderHintPopover(
                this.store,
                'sets',
                'left',
                'why set-ups?',
                "MOOD MkI can move a knob on its own (a wiggle or a slow glide), but only from the switches on its back — midi can't flip them. so you set the switches once, save them into a MOOD slot, and any action can bring them back. slots 1 and 2 save straight from the pedal, no cables needed."
              )}
              <span style="flex:1"></span>
              <div style="display:flex;gap:5px">
                ${SETUP_DEVICES.map((dId) => {
                  const d = HardwareRegistry.getDevice(dId);
                  const on = activeDeviceId === dId;
                  return html`
                    <button
                      style="display:flex;align-items:center;gap:5px;padding:4px 10px;border-radius:12px;font-size:11.5px;font-weight:600;border:2px solid #16323d;background:${on &&
                      d
                        ? d.accent
                        : '#fffbf0'};${on
                        ? 'box-shadow:2px 2px 0 #16323d'
                        : 'opacity:.65'}"
                      @click=${() => {
                        const first = st.pedalSets.find(
                          (x) => x.device === dId
                        );
                        if (first) {
                          this.store.openSetups(first.id, dId);
                        } else {
                          this.store.newSet(dId);
                        }
                      }}
                    >
                      <span
                        style="width:10px;height:10px;border-radius:3px;border:1.5px solid #16323d;background:${d
                          ? d.accent
                          : '#f7c948'}"
                      ></span>
                      <span>${d ? d.name : dId}</span>
                    </button>
                  `;
                })}
              </div>
            </div>

            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px">
              ${deviceSets.map((x) => {
                const on = so && so.id === x.id;
                return html`
                  <button
                    style="padding:5px 12px;border-radius:13px;font-size:12px;font-weight:600;border:2px solid #16323d;transition:background 150ms ease;${on
                      ? `background:${tabActiveBg};box-shadow:2px 2px 0 #16323d`
                      : 'background:#fffbf0;opacity:.65'}"
                    @click=${() => this.store.openSetups(x.id, x.device)}
                  >
                    ${x.name} · ${x.slot}
                  </button>
                `;
              })}
              <button
                class="hover-opa"
                style="padding:5px 12px;border-radius:13px;border:2px dashed #16323d;font-size:12px;font-weight:600;opacity:.6"
                @click=${() => this.store.newSet(activeDeviceId)}
              >
                + new set-up
              </button>
            </div>
          </div>

          <div
            style="flex:1;min-height:0;overflow:auto;padding:18px 24px 22px;display:flex;flex-direction:column;gap:16px"
          >
            ${so
              ? html`
                  <div style="display:flex;align-items:center;gap:10px">
                    <input
                      .value=${so.name}
                      maxlength="24"
                      style="flex:1;min-width:0;padding:8px 12px;border-radius:14px;border:2.5px solid #16323d;background:#fffbf0;font-family:inherit;font-size:15px;font-weight:600;color:#16323d;outline:none"
                      @input=${(e: InputEvent) =>
                        this.store.updateSet(so.id, (x) => ({
                          ...x,
                          name: (e.target as HTMLInputElement).value,
                        }))}
                    />
                    <select
                      .value=${String(so.slot)}
                      style="flex:none;padding:8px 10px;border-radius:14px;border:2.5px solid #16323d;background:#16323d;color:#f7c948;font-family:'DM Mono',monospace;font-size:12px;font-weight:600"
                      @change=${(e: Event) => {
                        const slot = parseInt(
                          (e.target as HTMLSelectElement).value,
                          10
                        );
                        this.store.updateSet(so.id, (x) => ({
                          ...x,
                          slot,
                          saved: false,
                        }));
                        this.store.setWalkIndex(0);
                      }}
                    >
                      ${Array.from({ length: 122 }, (_, i) => {
                        const val = i + 1;
                        const label =
                          i === 0
                            ? 'slot 1 · toggle right'
                            : i === 1
                              ? 'slot 2 · toggle left'
                              : `slot ${val} · via scribble`;
                        return html`
                          <option value=${val} ?selected=${so.slot === val}>
                            ${label}
                          </option>
                        `;
                      })}
                    </select>
                  </div>

                  <div
                    style="padding:16px 14px 14px;border-radius:22px;border:2.5px solid #16323d;background:${enclosureBg};box-shadow:4px 4px 0 #16323d;display:flex;flex-direction:column;gap:12px"
                  >
                    <div
                      style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap"
                    >
                      <span
                        style="font-size:13px;font-weight:600;color:#16323d"
                        >the back of ${dev ? dev.name : 'MOOD'}</span
                      >
                      <span
                        style="font-size:11.5px;color:#16323d;opacity:.8"
                        >tap a switch to flip it</span
                      >
                      ${renderHintPopover(
                        this.store,
                        'dips',
                        'left',
                        'reading the diagram',
                        'this is the pedal seen from behind, like the photo. only the outlined switches matter for this set-up; leave the faded ones as they are. right bank: down is on. left bank: down is rise, shape ■ and sweep T.'
                      )}
                    </div>

                    <div
                      style="display:flex;align-items:flex-end;justify-content:center;gap:10px;overflow-x:auto;padding-bottom:2px"
                    >
                      <div
                        style="flex:none;display:flex;flex-direction:column;justify-content:space-between;height:66px;padding:6px 7px;border:2px solid #16323d;border-radius:6px;font-size:11px;font-weight:600;color:#16323d;text-align:center"
                      >
                        <span>fall</span>
                        <span>rise</span>
                      </div>

                      <div
                        style="flex:none;display:flex;flex-direction:column;gap:6px"
                      >
                        <div style="display:flex;gap:4px">
                          ${bankL.map(
                            (d) => html`
                              <span
                                style="flex:none;width:22px;height:78px;display:flex;align-items:flex-start;justify-content:center;writing-mode:vertical-rl;transform:rotate(180deg);text-align:right;font-size:12px;font-weight:600;line-height:1;color:#16323d;${d.hot
                                  ? ''
                                  : 'opacity:.45'}"
                                >${d.l}</span
                              >
                            `
                          )}
                        </div>
                        <div
                          style="display:flex;gap:4px;padding:7px 6px 4px;border-radius:6px;background:#a61d24;border:2px solid #16323d"
                        >
                          ${bankL.map(
                            (d, i) => html`
                              <button
                                title=${d.l}
                                style="flex:none;width:22px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:0;${d.id
                                  ? ''
                                  : 'cursor:default'}"
                                @click=${() => this.flipDip(so, d)}
                              >
                                <span
                                  style="display:flex;flex-direction:column;justify-content:${d.on
                                    ? 'flex-end'
                                    : 'flex-start'};width:16px;height:38px;padding:2px;border-radius:3px;background:#6e1116;${d.hot
                                    ? 'box-shadow:0 0 0 2px #f7c948'
                                    : 'opacity:.55'};transition:box-shadow 160ms ease"
                                >
                                  <span
                                    style="display:block;width:100%;height:15px;border-radius:2px;background:#fffbf0"
                                  ></span>
                                </span>
                                <span
                                  style="font-family:'DM Mono',monospace;font-size:8.5px;color:#f7d9d0"
                                  >${8 - i}</span
                                >
                              </button>
                            `
                          )}
                        </div>
                      </div>

                      <div
                        style="flex:none;display:flex;flex-direction:column;gap:6px"
                      >
                        <div style="display:flex;gap:4px">
                          ${bankR.map(
                            (d) => html`
                              <span
                                style="flex:none;width:22px;height:78px;display:flex;align-items:flex-start;justify-content:center;writing-mode:vertical-rl;transform:rotate(180deg);text-align:right;font-size:12px;font-weight:600;line-height:1;color:#16323d;${d.hot
                                  ? ''
                                  : 'opacity:.45'}"
                                >${d.l}</span
                              >
                            `
                          )}
                        </div>
                        <div
                          style="display:flex;gap:4px;padding:7px 6px 4px;border-radius:6px;background:#a61d24;border:2px solid #16323d"
                        >
                          ${bankR.map(
                            (d, i) => html`
                              <button
                                title=${d.l}
                                style="flex:none;width:22px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:0;${d.id
                                  ? ''
                                  : 'cursor:default'}"
                                @click=${() => this.flipDip(so, d)}
                              >
                                <span
                                  style="display:flex;flex-direction:column;justify-content:${d.on
                                    ? 'flex-end'
                                    : 'flex-start'};width:16px;height:38px;padding:2px;border-radius:3px;background:#6e1116;${d.hot
                                    ? 'box-shadow:0 0 0 2px #f7c948'
                                    : 'opacity:.55'};transition:box-shadow 160ms ease"
                                >
                                  <span
                                    style="display:block;width:100%;height:15px;border-radius:2px;background:#fffbf0"
                                  ></span>
                                </span>
                                <span
                                  style="font-family:'DM Mono',monospace;font-size:8.5px;color:#f7d9d0"
                                  >${8 - i}</span
                                >
                              </button>
                            `
                          )}
                        </div>
                      </div>

                      <div
                        style="flex:none;display:flex;flex-direction:column;justify-content:space-between;height:66px;padding:6px 7px;border:2px solid #16323d;border-radius:6px;font-size:11px;font-weight:600;color:#16323d;text-align:center"
                      >
                        <span>off</span>
                        <span>on</span>
                      </div>
                    </div>

                    <div
                      style="display:flex;flex-wrap:wrap;gap:6px 14px;font-size:11.5px;color:#16323d;line-height:1.4"
                    >
                      <span
                        ><b>left bank</b> · up = fall, down = rise · shape up ▼
                        / down ■ · sweep up B / down T</span
                      >
                      <span><b>right bank</b> · up = off, down = on</span>
                    </div>
                  </div>

                  <div
                    style="padding:14px 16px;border-radius:20px;border:2.5px solid #16323d;background:#f7f1e3"
                  >
                    <div
                      style="font-size:13.5px;font-weight:600;margin-bottom:8px"
                    >
                      what this does
                    </div>
                    <div style="display:flex;flex-direction:column;gap:6px">
                      ${setExplain.map(
                        (text) => html`
                          <div
                            style="display:flex;gap:9px;font-size:12.5px;line-height:1.5"
                          >
                            <span
                              style="width:7px;height:7px;flex:none;margin-top:7px;border-radius:2px;background:#16323d"
                            ></span>
                            <span style="flex:1;text-wrap:pretty">${text}</span>
                          </div>
                        `
                      )}
                    </div>
                  </div>

                  ${wStep
                    ? html`
                        <div
                          style="padding:16px;border-radius:20px;border:2.5px solid #16323d;background:#fffbf0;display:flex;flex-direction:column;gap:13px"
                        >
                          <div style="display:flex;align-items:center;gap:8px">
                            <span
                              style="flex:1;font-size:13.5px;font-weight:600"
                              >putting it on the pedal</span
                            >
                            <span
                              style="flex:none;font-family:'DM Mono',monospace;font-size:10px;padding:3px 9px;border-radius:10px;border:2px solid #16323d;background:${so.saved
                                ? '#e7f5e7'
                                : '#ffe6dd'}"
                            >
                              ${so.saved ? 'on the pedal' : 'not saved yet'}
                            </span>
                          </div>

                          <div style="display:flex;gap:5px">
                            ${walk.map(
                              (_, i) => html`
                                <span
                                  style="flex:1;height:6px;border-radius:3px;border:2px solid #16323d;background:${i <
                                  wi
                                    ? '#16323d'
                                    : i === wi
                                      ? '#f7c948'
                                      : 'transparent'}"
                                ></span>
                              `
                            )}
                          </div>

                          <div
                            style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"
                          >
                            <div
                              style="flex:none;width:170px;height:104px;border-radius:16px;border:2.5px solid #16323d;background:${enclosureBg};position:relative;display:flex;align-items:center;justify-content:center"
                            >
                              ${wStep.art === 'dips'
                                ? html`
                                    <div
                                      style="display:flex;flex-direction:column;align-items:center;gap:6px"
                                    >
                                      <div style="display:flex;gap:2px">
                                        ${allDips.map(
                                          (d, idx) => html`
                                            <span
                                              style="display:flex;flex-direction:column;justify-content:${d.on
                                                ? 'flex-end'
                                                : 'flex-start'};width:7px;height:22px;padding:1px;border-radius:2px;background:#6e1116;${idx ===
                                              8
                                                ? 'margin-left:6px;'
                                                : ''}${d.hot
                                                ? 'box-shadow:0 0 0 1.5px #f7c948'
                                                : 'opacity:.5'}"
                                            >
                                              <span
                                                style="display:block;height:9px;border-radius:1px;background:#fffbf0"
                                              ></span>
                                            </span>
                                          `
                                        )}
                                      </div>
                                      <span
                                        style="font-family:'DM Mono',monospace;font-size:9.5px;color:#16323d"
                                        >back of
                                        ${dev ? dev.name : 'MOOD'}</span
                                      >
                                    </div>
                                  `
                                : wStep.art === 'toggle'
                                  ? html`
                                      <div
                                        style="display:flex;flex-direction:column;align-items:center;gap:8px"
                                      >
                                        <div
                                          style="position:relative;width:96px;height:26px;border-radius:13px;background:#16323d"
                                        >
                                          <span
                                            style="position:absolute;top:3px;width:20px;height:20px;border-radius:50%;background:#f7c948;border:2px solid #f7f1e3;transition:left 260ms cubic-bezier(.32,.72,0,1);left:${wStep.pos ===
                                            'left'
                                              ? '3px'
                                              : wStep.pos === 'right'
                                                ? '73px'
                                                : '38px'}"
                                          ></span>
                                        </div>
                                        <div
                                          style="display:flex;justify-content:space-between;width:104px;font-family:'DM Mono',monospace;font-size:9.5px;color:#16323d"
                                        >
                                          <span>slot 2</span>
                                          <span>live</span>
                                          <span>slot 1</span>
                                        </div>
                                      </div>
                                    `
                                  : wStep.art === 'feet'
                                    ? html`
                                        <div
                                          style="display:flex;flex-direction:column;align-items:center;gap:8px"
                                        >
                                          <div style="display:flex;gap:26px">
                                            <span
                                              style="width:34px;height:34px;border-radius:50%;background:#f7f1e3;border:2.5px solid #16323d;animation:ring 1.1s cubic-bezier(.23,1,.32,1) infinite"
                                            ></span>
                                            <span
                                              style="width:34px;height:34px;border-radius:50%;background:#f7f1e3;border:2.5px solid #16323d;animation:ring 1.1s cubic-bezier(.23,1,.32,1) infinite"
                                            ></span>
                                          </div>
                                          <span
                                            style="font-family:'DM Mono',monospace;font-size:9.5px;color:#16323d"
                                            >${wStep.feetLabel ||
                                            'hold both'}</span
                                          >
                                        </div>
                                      `
                                    : html`
                                        <div
                                          style="display:flex;flex-direction:column;align-items:center;gap:6px"
                                        >
                                          <div
                                            style="display:flex;align-items:center;gap:8px;padding:7px 9px;border-radius:10px;background:#16323d"
                                          >
                                            <span
                                              style="width:14px;height:14px;border-radius:50%;background:#f7f1e3"
                                            ></span>
                                            <span
                                              style="padding:3px 7px;border-radius:5px;background:#f7c948;font-family:'DM Mono',monospace;font-size:9.5px;font-weight:600;color:#16323d;white-space:nowrap"
                                              >${wStep.screen ||
                                              'SAVE MOOD'}</span
                                            >
                                            <span
                                              style="width:14px;height:14px;border-radius:50%;background:#f7f1e3"
                                            ></span>
                                          </div>
                                          <span
                                            style="font-family:'DM Mono',monospace;font-size:9.5px;color:#16323d"
                                            >your scribble</span
                                          >
                                        </div>
                                      `}
                            </div>

                            <div
                              style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:5px"
                            >
                              <span
                                style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;opacity:.5"
                                >step ${wi + 1} of ${walk.length}</span
                              >
                              <span
                                style="font-size:15px;font-weight:600;letter-spacing:-.01em"
                                >${wStep.title}</span
                              >
                              <span
                                style="font-size:12.5px;line-height:1.5;opacity:.75;text-wrap:pretty"
                                >${wStep.body}</span
                              >
                              ${wStep.helper
                                ? html`
                                    <button
                                      style="align-self:flex-start;margin-top:4px;padding:6px 12px;border-radius:13px;border:2px solid #16323d;background:#f7c948;font-size:12px;font-weight:600;box-shadow:2px 2px 0 #16323d"
                                      @click=${() => wStep.helper?.run()}
                                    >
                                      ${wStep.helper.label}
                                    </button>
                                  `
                                : null}
                            </div>
                          </div>

                          <div
                            style="display:flex;align-items:center;gap:8px"
                          >
                            ${wi > 0
                              ? html`
                                  <button
                                    class="hover-paper"
                                    style="padding:8px 14px;border-radius:16px;border:2px solid #16323d;font-size:13px"
                                    @click=${() =>
                                      this.store.setWalkIndex(
                                        Math.max(0, wi - 1)
                                      )}
                                  >
                                    back
                                  </button>
                                `
                              : null}
                            <span
                              style="flex:1;font-size:11.5px;line-height:1.4;opacity:.6;text-wrap:pretty"
                            >
                              ${so.saved
                                ? `${
                                    dev ? dev.name : 'MOOD'
                                  } has this in slot ${
                                    so.slot
                                  }. change a switch here and you'll need to save it again.`
                                : `tick it off once you've done it on the pedal. until then, loading it recalls whatever is already in slot ${so.slot}.`}
                            </span>
                            <button
                              class="active-press"
                              style="flex:none;padding:8px 16px;border-radius:16px;background:#8fd0e6;border:2.5px solid #16323d;box-shadow:2px 2px 0 #16323d;font-size:13px;font-weight:600"
                              @click=${() => {
                                if (wi < walk.length - 1) {
                                  this.store.setWalkIndex(wi + 1);
                                } else {
                                  this.store.updateSet(so.id, (x) => ({
                                    ...x,
                                    saved: !x.saved,
                                  }));
                                  this.store.setWalkIndex(0);
                                }
                              }}
                            >
                              ${wi < walk.length - 1
                                ? 'next'
                                : so.saved
                                  ? 'mark as not saved'
                                  : "done — it's saved"}
                            </button>
                          </div>

                          <div
                            style="padding-top:10px;border-top:2px dashed rgba(22,50,61,.25);font-size:11.5px;opacity:.65"
                          >
                            ${soUsers.length
                              ? `used by ${soUsers
                                  .map((a) => `“${a.name}”`)
                                  .join(', ')}`
                              : "no action uses this yet — add it from an action's editor."}
                          </div>
                        </div>
                      `
                    : null}
                `
              : html`
                  <div
                    style="padding:18px;border-radius:20px;border:2.5px dashed rgba(22,50,61,.3);font-size:13px;line-height:1.5;opacity:.7;text-wrap:pretty"
                  >
                    no set-ups yet. make one to get ${dev ? dev.name : 'MOOD'}'s
                    knobs moving on their own.
                  </div>
                `}
          </div>

          <div
            style="flex:none;display:flex;justify-content:flex-end;padding:14px 20px;border-top:2.5px solid #16323d"
          >
            <button
              class="active-press"
              style="padding:10px 20px;border-radius:22px;background:#f7c948;border:2.5px solid #16323d;box-shadow:3px 3px 0 #16323d;font-size:14px;font-weight:600"
              @click=${() => this.store.closeSetups()}
            >
              done
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pedal-setups-modal': PedalSetupsModal;
  }
}
