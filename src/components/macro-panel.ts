import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  tokens,
  resetAndButton,
  motionKeyframes,
  renderHintPopover,
} from '../styles/shared.js';
import { CAPS } from '../data/capabilities.js';
import type { ActionDef } from '../data/actions.js';
import { SETUP_DEVICES, type SetupDeviceId } from '../data/setups.js';
import { ACTIONS, SIDE_LABELS } from '../data/controllers.js';
import { KNOB_VALUES } from '../data/devices.js';
import { HardwareRegistry } from '../data/registry.js';
import { PALETTE, HEX, TEXTS, TEXTHEX } from '../data/naming.js';
import { knobWord } from '../state/macro-stack-model.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import { describeStep } from '../compiler/midi.js';
import type { MacroStep, WiggleInfo } from '../state/types.js';

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
        background: #fffbf0;
        flex: 1;
        min-height: 0;
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
      .del-btn:hover {
        background: #ef7d5c !important;
        color: #fffbf0 !important;
      }
      .pop-close:hover {
        background: #16323d !important;
        color: #e8f4fa !important;
      }
      .hover-mustard:hover {
        background: #f7c948 !important;
      }
      .hover-paper:hover {
        background: #f7f1e3 !important;
      }
      .hover-opa:hover {
        opacity: 1 !important;
      }
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  @property({ type: Boolean, reflect: true }) phone = false;
  @property({ type: Boolean, reflect: true }) desktop = false;

  @state() private pinnedRowIndex: number | null = null;
  @state() private focusKey: string | null = null;
  @state() private dragState: { key: string; v: number } | null = null;

  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  private wigVis(wi: WiggleInfo, col: string) {
    const dur = (3.2 - (2.6 * wi.speed) / 127).toFixed(2);
    return {
      track:
        'position:relative;height:12px;border-radius:7px;background:#fffbf0;border:2px solid #16323d',
      seg: `position:absolute;top:0;bottom:0;left:${(
        (wi.lo / 127) *
        100
      ).toFixed(1)}%;width:${(((wi.hi - wi.lo) / 127) * 100).toFixed(
        1
      )}%;background:${col};border-radius:5px`,
      dot: `position:absolute;top:50%;left:0;width:14px;height:14px;border-radius:50%;background:#f7c948;border:2px solid #16323d;transform:translate(-50%,-50%);animation:${wi.bounce
        ? `wig ${dur}s ease-in-out infinite alternate`
        : `glide ${dur}s cubic-bezier(.23,1,.32,1) infinite`
        }`,
    };
  }

  private capChipStyle(on: boolean, col: string) {
    return `display:flex;align-items:center;gap:6px;padding:4px 10px;border-radius:12px;font-size:11.5px;font-weight:600;border:2px solid #16323d;transition:background 140ms ease,box-shadow 140ms ease;${on
      ? `background:${col};box-shadow:2px 2px 0 #16323d`
      : 'background:#fffbf0;opacity:.55'
      }`;
  }

  private formatStepLabel(s: MacroStep): string {
    const dev = HardwareRegistry.getDevice(s.device);
    if (!dev) return s.control;
    if (s.control === 'pc') {
      const set = this.store.findSet(s.set);
      return `load set-up · ${set ? set.name : 'missing'}`;
    }
    return HardwareRegistry.formatControlLabel(s.device, s.control, s.value);
  }

  render() {
    const st = this.store.state;
    const build = st.mode === 'build' && !!st.actEdit;
    const ea = build && st.actEdit ? this.store.actionById(st.actEdit) : null;
    const list = ea ? ea.steps : this.store.activeStack;
    const lim = this.store.limit();
    const open = st.sheetOpen || !this.phone;

    const popDevice = HardwareRegistry.getDevice(st.browseDevice);
    const popControl =
      st.popoverControlId && st.popoverControlId !== 'pc'
        ? HardwareRegistry.getControl(st.browseDevice, st.popoverControlId)
        : null;

    return html`
      <button class="grabber" @click=${() => this.store.toggleSheet()}></button>

      ${!build ? this.renderAssignHeader(list, lim, open) : null}

      ${st.popoverControlId === 'pc' && popDevice
        ? this.renderPcPopover(popDevice, list)
        : popControl && popDevice
          ? this.renderControlPopover(popDevice, popControl, list)
          : null}

      ${build && ea
        ? this.renderBuildMode(ea, list, lim)
        : open
          ? this.renderAssignList(list, lim)
          : null}
    `;
  }

  private renderAssignHeader(list: MacroStep[], lim: number, open: boolean) {
    const st = this.store.state;
    const ctrl = HardwareRegistry.getController(st.controllerId);
    const bank = st.banks[st.bank] || st.banks[0];
    const acts = this.store.availableActions();
    const idNow = this.store.ident(st.bank, st.selectedKey);
    const shared = this.store.sharedColors();
    const canName = this.store.displayTargets().length > 0 || shared.length > 0;
    const chocChips = canName && st.brainId === 'scribble' && !ctrl.isBrain;
    const onDev = canName && ((!!ctrl.isBrain && !!ctrl.photo) || chocChips);

    const selectedKeyIsNav = !!ctrl.nav && !(ctrl.isBrain && canName);
    const selectedKeyIsTag = !onDev;
    const showStripCard = canName && !(ctrl.isBrain || st.brainId === 'scribble');
    const pressHead = onDev;
    const cantName = !canName;
    const panelTabs = !onDev;

    const stripBg = idNow.color ? HEX[idNow.color] : '#16323d';
    const stripInk = TEXTHEX[idNow.textColor];
    const selectedKey = ctrl.nav
      ? SIDE_LABELS[st.selectedKey] || st.selectedKey
      : st.selectedKey;
    const pressTitle = `${ctrl.nav ? (st.selectedKey === 'L' ? 'left' : 'right') : st.selectedKey
      } · ${st.action === 'press' ? 'tap' : st.action}`;
    const pressSub = `${ctrl.nav
      ? `p${String(st.bank + 1).padStart(3, '0')}`
      : `bank ${st.bank + 1}`
      } · ${list.length} of ${lim} messages`;
    const stackNamePlaceholder =
      idNow.auto ||
      (ctrl.nav ? 'name this preset' : `name switch ${st.selectedKey}`);

    const curActLabel =
      ACTIONS.find((a) => a.id === st.action)?.label || st.action;
    const hStackBody = `everything listed below goes out, in order, when you ${curActLabel} ${ctrl.nav ? 'on this preset' : 'this switch'
      }. ${this.store.limitWho()} sends up to ${lim} messages per press. actions show as a coloured card — 'unlink' keeps the messages but stops them following the action.`;

    const flags: Array<{ text: string }> = [];
    if (canName) {
      this.store.displayTargets().forEach((t) => {
        if (idNow.raw.name && idNow.name.length > t.name) {
          flags.push({
            text: `${t.label.toLowerCase()} shows “${idNow.name.slice(0, t.name - 1)}…”`,
          });
        }
        if (idNow.secondary && !t.secondary) {
          flags.push({ text: `${t.label.toLowerCase()} drops the second line` });
        } else if (idNow.secondary && idNow.secondary.length > t.secondary) {
          flags.push({
            text: `${t.label.toLowerCase()} trims line two to “${idNow.secondary.slice(
              0,
              t.secondary - 1
            )}…”`,
          });
        }
      });
    }

    const dimmed = PALETTE.filter(
      (p) => shared.length > 0 && !shared.includes(p[0])
    ).map((p) => p[0]);
    const colorPopNote = shared.length
      ? `every device in the rig can light these. ${dimmed.length
        ? `${dimmed.join(', ')} ${dimmed.length === 1 ? 'is' : 'are'
        } out of range.`
        : ''
      }`
      : 'no device in this rig has a light — colour rides along on the label sheet only.';

    return html`
      <div
        style="flex:none;padding:${this.desktop
        ? '15px 18px 13px'
        : '12px 16px 13px'};background:#fdf3d4;border-bottom:2.5px solid #16323d"
      >
        <div
          style="position:relative;display:flex;align-items:center;gap:8px;margin-bottom:${panelTabs ||
        flags.length
        ? '9px'
        : '0'}"
        >
          ${selectedKeyIsNav
        ? html`
                <select
                  .value=${String(st.bank + 1)}
                  style="flex:none;font-family:'DM Mono',monospace;font-size:12px;font-weight:600;padding:5px 9px;border-radius:10px;background:#16323d;color:#f7c948;border:2px solid #16323d"
                  @change=${(e: Event) =>
            this.store.selectBank(
              parseInt((e.target as HTMLSelectElement).value, 10) - 1
            )}
                >
                  ${st.banks.map((_, i) => {
              const lensMatch =
                st.lens &&
                ctrl.keys.some((k) =>
                  this.store.slotCaps(st.banks[i][k]).includes(st.lens!)
                );
              const lensName = st.lens
                ? this.store.capOf(st.lens)?.name
                : '';
              return html`
                      <option value=${i + 1} ?selected=${i === st.bank}>
                        p${String(i + 1).padStart(3, '0')}${lensMatch
                  ? `  ● ${lensName}`
                  : ''}
                      </option>
                    `;
            })}
                </select>
              `
        : null}
          ${selectedKeyIsTag
        ? html`
                <span
                  style="flex:none;font-family:'DM Mono',monospace;font-size:11px;padding:3px 8px;border-radius:10px;background:#16323d;color:#fdf3d4"
                  >${selectedKey}</span
                >
              `
        : null}
          ${showStripCard
        ? html`
                <div
                  style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:1px;padding:6px 11px;border-radius:13px;border:2.5px solid #16323d;background:${stripBg};transition:background 200ms ease"
                >
                  <input
                    .value=${idNow.raw.name || ''}
                    placeholder=${stackNamePlaceholder}
                    maxlength="24"
                    style="width:100%;padding:0;border:0;background:transparent;font-family:inherit;font-size:15px;font-weight:600;letter-spacing:-.02em;line-height:1.25;color:${stripInk};outline:none"
                    @input=${(e: InputEvent) =>
            this.store.setIdent({
              name: (e.target as HTMLInputElement).value,
            })}
                  />
                  <input
                    .value=${idNow.secondary}
                    placeholder=${idNow.autoSec || 'second line'}
                    maxlength="24"
                    style="width:100%;padding:0;border:0;background:transparent;font-family:'DM Mono',monospace;font-size:11px;line-height:1.35;color:${stripInk};opacity:.72;outline:none"
                    @input=${(e: InputEvent) =>
            this.store.setIdent({
              secondary: (e.target as HTMLInputElement).value,
            })}
                  />
                </div>
                <button
                  title=${idNow.color
            ? `strip colour · ${idNow.color}`
            : 'give this stack a colour'}
                  style="width:26px;height:26px;flex:none;border-radius:9px;border:2.5px solid #16323d;background:${idNow.color
            ? HEX[idNow.color]
            : 'repeating-linear-gradient(135deg,#fffbf0 0 4px,#e9e0cc 4px 8px)'};transition:box-shadow 150ms cubic-bezier(.23,1,.32,1)"
                  @click=${() => this.store.toggleColorPicker()}
                ></button>
              `
        : null}
          ${pressHead
        ? html`
                <div
                  style="flex:1;min-width:0;display:flex;align-items:baseline;gap:8px"
                >
                  <span
                    style="font-size:15px;font-weight:600;letter-spacing:-.02em;white-space:nowrap"
                    >${pressTitle}</span
                  >
                  <span
                    style="min-width:0;font-family:'DM Mono',monospace;font-size:11px;opacity:.55;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
                    >${pressSub}</span
                  >
                </div>
                ${renderHintPopover(
          this.store,
          'stack',
          'right',
          "what's in this press",
          hStackBody
        )}
              `
        : null}
          ${cantName
        ? html`<div
                style="flex:1;min-width:0;font-size:16px;font-weight:600;letter-spacing:-.02em"
              >
                macro
              </div>`
        : null}
          ${selectedKeyIsTag
        ? html`
                <span
                  style="flex:none;font-family:'DM Mono',monospace;font-size:11px;padding:3px 9px;border-radius:10px;border:2px solid #16323d;background:${list.length >=
            lim
            ? '#ffd9cc'
            : '#fffbf0'}"
                >
                  ${list.length} / ${lim}
                </span>
              `
        : null}
          ${this.phone
        ? html`
                <button
                  style="width:26px;height:26px;flex:none;border-radius:50%;border:2px solid #16323d;font-size:12px;line-height:1;display:flex;align-items:center;justify-content:center"
                  @click=${() => this.store.toggleSheet()}
                >
                  ${open ? '⌄' : '⌃'}
                </button>
              `
        : null}

          ${st.colorPickerOpen
        ? html`
                <div
                  style="position:absolute;left:0;top:calc(100% + 8px);z-index:30;width:262px;max-width:100%;padding:14px;border-radius:20px;background:#fffbf0;border:2.5px solid #16323d;box-shadow:5px 5px 0 #16323d;animation:sheetIn 170ms cubic-bezier(.23,1,.32,1)"
                >
                  <div
                    style="display:flex;align-items:center;gap:8px;margin-bottom:10px"
                  >
                    <span style="flex:1;font-size:12.5px;font-weight:600"
                      >${ctrl.nav
            ? `preset ${String(st.bank + 1).padStart(3, '0')}`
            : `switch ${st.selectedKey}`}
                      lights up…</span
                    >
                    <button
                      style="width:24px;height:24px;border-radius:50%;border:2px solid #16323d;font-size:12px;line-height:1;display:flex;align-items:center;justify-content:center"
                      @click=${() => this.store.closeColorPicker()}
                    >
                      ×
                    </button>
                  </div>
                  <div
                    style="display:grid;grid-template-columns:repeat(5,1fr);gap:7px"
                  >
                    ${PALETTE.map((p) => {
              const allowed = shared.length
                ? shared.includes(p[0])
                : true;
              const on = idNow.color === p[0];
              return html`
                        <button
                          title=${allowed
                  ? p[0]
                  : `${p[0]} — not in this rig's palette`}
                          style="height:30px;border-radius:11px;border:2.5px solid #16323d;background:${p[1]};transition:box-shadow 150ms cubic-bezier(.23,1,.32,1),transform 120ms cubic-bezier(.23,1,.32,1);${on
                  ? 'box-shadow:0 0 0 3px #16323d inset,3px 3px 0 #16323d;'
                  : ''}${allowed
                    ? ''
                    : 'opacity:.22;pointer-events:none;'}"
                          @click=${() => {
                  if (!allowed) return;
                  this.store.setIdent({ color: on ? null : p[0] });
                  this.store.closeColorPicker();
                }}
                        ></button>
                      `;
            })}
                  </div>
                  <div
                    style="display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-top:11px;padding-top:11px;border-top:2px solid rgba(22,50,61,.15)"
                  >
                    <span style="flex:1;font-size:12px;font-weight:600"
                      >text</span
                    >
                    ${TEXTS.map((t) => {
              const on = idNow.textColor === t[0];
              return html`
                        <button
                          title="text in ${t[0]}${idNow.autoText
                  ? ' — picked automatically until you choose'
                  : ''}"
                          style="display:flex;align-items:center;gap:5px;flex:none;padding:4px 9px 4px 5px;border-radius:11px;border:2px solid #16323d;background:#fffbf0;font-size:11px;font-weight:600;color:#16323d;transition:box-shadow 150ms cubic-bezier(.23,1,.32,1),opacity 150ms ease;${on
                  ? 'box-shadow:2px 2px 0 #16323d'
                  : 'opacity:.55'}"
                          @click=${() => this.store.setIdent({ textColor: t[0] })}
                        >
                          <span
                            style="width:14px;height:14px;flex:none;border-radius:5px;border:2px solid #16323d;background:${t[1]}"
                          ></span>
                          <span>${t[0]}</span>
                        </button>
                      `;
            })}
                  </div>
                  <div
                    style="margin-top:10px;font-size:11px;line-height:1.45;opacity:.6;text-wrap:pretty"
                  >
                    ${colorPopNote}
                  </div>
                </div>
              `
        : null}
        </div>

        ${flags.length > 0
        ? html`
              <div
                style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px"
              >
                ${flags.map(
          (f) => html`
                    <button
                      title="see how each device renders this"
                      style="display:flex;align-items:center;gap:6px;padding:3px 9px;border-radius:10px;border:1.5px solid #16323d;background:#fffbf0;font-size:11px"
                      @click=${() => this.store.openSettings()}
                    >
                      <span
                        style="width:8px;height:8px;border-radius:50%;background:#f7c948;border:1.5px solid #16323d"
                      ></span>
                      <span>${f.text}</span>
                    </button>
                  `
        )}
              </div>
            `
        : null}

        ${panelTabs
        ? html`
              <div style="display:flex;gap:6px">
                ${acts.map((a) => {
          const on = st.action === a.id;
          const count = bank?.[st.selectedKey]?.[a.id]?.length || 0;
          return html`
                    <button
                      style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:7px 9px;border-radius:13px;font-size:12.5px;font-weight:600;border:2px solid #16323d;transition:background 150ms ease,box-shadow 150ms ease;${on
              ? 'background:#f7c948;box-shadow:2px 2px 0 #16323d'
              : 'background:#fffbf0;opacity:.65'}"
                      @click=${() => this.store.selectAction(a.id)}
                    >
                      <span>${a.label}</span>
                      <span
                        style="font-family:'DM Mono',monospace;font-size:10px;padding:1px 6px;border-radius:8px;background:${on
              ? '#16323d'
              : 'rgba(22,50,61,.12)'};color:${on
                ? '#f7c948'
                : '#16323d'}"
                        >${count}</span
                      >
                    </button>
                  `;
        })}
                <span style="display:flex;align-items:center">
                  ${renderHintPopover(
          this.store,
          'stack',
          'right',
          "what's in this press",
          hStackBody
        )}
                </span>
              </div>
            `
        : null}
      </div>
    `;
  }

  private renderPcPopover(
    popDevice: NonNullable<ReturnType<typeof HardwareRegistry.getDevice>>,
    list: MacroStep[]
  ) {
    const sets = this.store.setsForDevice(popDevice.id);
    const activePc = list.find(
      (s) => s.device === popDevice.id && s.control === 'pc'
    );

    return html`
      <div
        style="flex:none;padding:14px 16px;border-bottom:2.5px solid #16323d;background:#e8f4fa;animation:sheetIn 180ms cubic-bezier(.23,1,.32,1)"
      >
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:11px">
          <span
            style="width:14px;height:14px;border-radius:5px;flex:none;background:${popDevice.accent};border:2px solid #16323d"
          ></span>
          <span style="flex:1;font-size:13.5px;font-weight:600"
            >${popDevice.name} · recall set-up</span
          >
          <button
            class="pop-close"
            style="width:26px;height:26px;border-radius:50%;border:2px solid #16323d;font-size:13px;line-height:1;display:flex;align-items:center;justify-content:center;transition:background 150ms ease"
            @click=${() => this.store.closePopover()}
          >
            ×
          </button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${sets.map((ps) => {
      const on = activePc?.set === ps.id;
      return html`
              <button
                style="padding:8px 14px;border-radius:14px;font-size:13px;border:2px solid #16323d;transition:background 150ms ease,box-shadow 150ms ease;${on
          ? 'background:#8fd0e6;font-weight:600;box-shadow:2px 2px 0 #16323d'
          : 'background:#fffbf0'}"
                @click=${() => this.store.setPedalSetupStep(ps.id, popDevice.id)}
              >
                ${ps.name} · slot ${ps.slot}
              </button>
            `;
    })}
          <button
            style="padding:8px 14px;border-radius:14px;font-size:13px;border:2px dashed #16323d;background:#fffbf0"
            @click=${() => {
        this.store.closePopover();
        this.store.openSetups(null, popDevice.id as SetupDeviceId);
      }}
          >
            manage set-ups…
          </button>
        </div>
      </div>
    `;
  }

  private renderControlPopover(
    popDevice: NonNullable<ReturnType<typeof HardwareRegistry.getDevice>>,
    popControl: NonNullable<ReturnType<typeof HardwareRegistry.getControl>>,
    list: MacroStep[]
  ) {
    const options = popControl.values || KNOB_VALUES;
    const activeEntry = list.find(
      (s) => s.device === popDevice.id && s.control === popControl.id
    );
    const dk = `pop:${popDevice.id}:${popControl.id}`;
    const dragVal =
      this.dragState && this.dragState.key === dk ? this.dragState.v : null;
    const rawNum =
      activeEntry?.value != null && !isNaN(Number(activeEntry.value))
        ? Number(activeEntry.value)
        : null;
    const popVal = dragVal != null ? dragVal : rawNum != null ? rawNum : 64;
    const popValWord =
      dragVal != null
        ? `${dragVal} / 127`
        : rawNum == null
          ? 'not set yet'
          : knobWord(rawNum) === String(rawNum)
            ? String(rawNum)
            : `${rawNum} · ${knobWord(rawNum)}`;

    return html`
      <div
        style="flex:none;padding:14px 16px;border-bottom:2.5px solid #16323d;background:#e8f4fa;animation:sheetIn 180ms cubic-bezier(.23,1,.32,1)"
      >
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:11px">
          <span
            style="width:14px;height:14px;border-radius:5px;flex:none;background:${popDevice.accent};border:2px solid #16323d"
          ></span>
          <span style="flex:1;font-size:13.5px;font-weight:600"
            >${popControl.label} lands on…</span
          >
          <button
            class="pop-close"
            style="width:26px;height:26px;border-radius:50%;border:2px solid #16323d;font-size:13px;line-height:1;display:flex;align-items:center;justify-content:center;transition:background 150ms ease"
            @click=${() => this.store.closePopover()}
          >
            ×
          </button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${options.map((opt) => {
      const on = activeEntry?.value === opt.value;
      return html`
              <button
                style="padding:8px 14px;border-radius:14px;font-size:13px;border:2px solid #16323d;transition:background 150ms ease,box-shadow 150ms ease;${on
          ? 'background:#8fd0e6;font-weight:600;box-shadow:2px 2px 0 #16323d'
          : 'background:#fffbf0'}"
                @click=${() => this.store.setKnobValue(popControl.id, opt.value)}
              >
                ${opt.label}
              </button>
            `;
    })}
        </div>
        ${popControl.type === 'knob'
        ? html`
              <div
                style="display:flex;align-items:center;gap:10px;margin-top:12px"
              >
                <input
                  type="range"
                  min="0"
                  max="127"
                  step="1"
                  .value=${String(popVal)}
                  style="flex:1;min-width:0;width:100%;accent-color:#16323d;height:22px;margin:0;cursor:pointer"
                  @input=${(e: Event) => {
            this.dragState = {
              key: dk,
              v: Number((e.target as HTMLInputElement).value),
            };
          }}
                  @change=${(e: Event) => {
            const v = Number((e.target as HTMLInputElement).value);
            this.dragState = null;
            this.store.setKnobNumericValue(popControl.id, v);
          }}
                />
                <span
                  style="flex:none;width:104px;text-align:right;font-family:'DM Mono',monospace;font-size:11px;font-variant-numeric:tabular-nums;white-space:nowrap"
                  >${popValWord}</span
                >
              </div>
            `
        : null}
      </div>
    `;
  }

  private renderBuildMode(ea: ActionDef, list: MacroStep[], lim: number) {
    const st = this.store.state;
    const usage = this.store.actionUsage();
    const useCount = usage[ea.id] || 0;
    const edUsed = useCount
      ? `on ${useCount} ${useCount === 1 ? 'press' : 'presses'
      } — edits land on all of them`
      : 'not on any press yet';
    const eaWi = this.store.wiggleInfo(ea.steps);
    const firstCapCol = this.store.capOf(ea.caps[0])?.colour || '#9fe0c0';
    const eaWv = eaWi ? this.wigVis(eaWi, firstCapCol) : null;

    const setupPedalId =
      st.rig.find(
        (id) =>
          SETUP_DEVICES.includes(id as SetupDeviceId) &&
          this.store.setsForDevice(id).length > 0
      ) || null;
    const setupPedal = setupPedalId
      ? HardwareRegistry.getDevice(setupPedalId)
      : null;
    const edCanSet =
      !!setupPedalId && !ea.steps.some((x) => x.control === 'pc');

    return html`
      <div
        style="flex:none;padding:15px 18px 13px;background:#fdf3d4;border-bottom:2.5px solid #16323d"
      >
        <div
          style="display:flex;align-items:center;gap:8px;margin-bottom:5px"
        >
          <span
            style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;opacity:.5"
            >editing an action</span
          >
          <span style="flex:1"></span>
          <span style="font-size:11px;opacity:.6;text-align:right"
            >${edUsed}</span
          >
        </div>
        <input
          .value=${ea.name}
          placeholder="name it"
          maxlength="28"
          style="width:100%;padding:0;border:0;background:transparent;font-family:inherit;font-size:19px;font-weight:600;letter-spacing:-.02em;color:#16323d;outline:none"
          @input=${(e: InputEvent) =>
        this.store.updateAction(ea.id, (a) => ({
          ...a,
          name: (e.target as HTMLInputElement).value,
        }))}
        />
        <input
          .value=${ea.what}
          placeholder="in plain words — what does it do to the sound?"
          style="width:100%;margin-top:3px;padding:0;border:0;background:transparent;font-family:inherit;font-size:12.5px;color:#16323d;opacity:.75;outline:none"
          @input=${(e: InputEvent) =>
        this.store.updateAction(ea.id, (a) => ({
          ...a,
          what: (e.target as HTMLInputElement).value,
        }))}
        />
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:11px">
          ${CAPS.map((c) => {
          const on = ea.caps.includes(c.id);
          return html`
              <button
                style=${this.capChipStyle(on, c.colour)}
                @click=${() =>
              this.store.updateAction(ea.id, (a) => {
                const has = a.caps.includes(c.id);
                const nextCaps =
                  has && a.caps.length > 1
                    ? a.caps.filter((x) => x !== c.id)
                    : has
                      ? a.caps
                      : [...a.caps, c.id];
                return { ...a, caps: nextCaps };
              })}
              >
                <span
                  style="width:11px;height:11px;flex:none;border-radius:4px;border:2px solid #16323d;background:${c.colour}"
                ></span>
                <span>${c.name}</span>
              </button>
            `;
        })}
        </div>
      </div>

      <div
        style="flex:1;min-height:0;overflow:auto;padding:13px;display:flex;flex-direction:column;gap:9px;background:#fffbf0"
      >
        ${eaWi && eaWv
        ? html`
              <div
                style="padding:12px 13px;border-radius:16px;border:2.5px solid #16323d;background:#f7f1e3;display:flex;flex-direction:column;gap:8px"
              >
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-size:13px;font-weight:600"
                    >moves using the “${eaWi.set.name}” set-up</span
                  >
                  ${renderHintPopover(
          this.store,
          'wig',
          'right',
          'the moving dot',
          "the bar is the knob's full travel. the coloured part is where it'll move, and the dot shows the motion — back and forth for a wiggle, one way for a glide. the knob's value in this action sets one end; the set-up's sweep sets the other. mix sets the speed."
        )}
                  <span style="flex:1"></span>
                  <button
                    class="hover-mustard"
                    style="padding:4px 10px;border-radius:11px;border:2px solid #16323d;background:#fffbf0;font-size:11.5px;font-weight:600"
                    @click=${() =>
            this.store.openSetups(eaWi.set.id, eaWi.set.device)}
                  >
                    see the dips
                  </button>
                </div>
                <div style=${eaWv.track}>
                  <div style=${eaWv.seg}>
                    <div style=${eaWv.dot}></div>
                  </div>
                </div>
                <div style="font-family:'DM Mono',monospace;font-size:10.5px">
                  ${eaWi.text}
                </div>
              </div>
            `
        : null}

        <div style="display:flex;align-items:center">
          <span
            style="flex:1;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;opacity:.5"
            >messages, in order</span
          >
          <span
            style="font-family:'DM Mono',monospace;font-size:11px;padding:2px 8px;border-radius:10px;border:2px solid #16323d"
            >${list.length} / ${lim}</span
          >
        </div>

        ${list.map((s, i) => {
          const dev = HardwareRegistry.getDevice(s.device);
          const c = dev?.controls.find((x) => x.id === s.control);
          const fKey = `${s.device}:${s.control}`;
          const focused = this.focusKey === fKey;
          const role = this.store.stepRole(list, s);
          const setObj = s.control === 'pc' ? this.store.findSet(s.set) : null;
          const stepTitle =
            s.control === 'pc'
              ? `${dev ? dev.name : s.device} · load the “${setObj ? setObj.name : '?'
              }” set-up`
              : `${dev ? dev.name : s.device} · ${c ? c.label : s.control}${c?.type === 'foot' ? ' · press' : ''
              }`;

          let vals: Array<{ label: string; on: boolean; onClick: () => void }> =
            [];
          if (s.control === 'pc') {
            vals = this.store.setsForDevice(s.device).map((ps) => ({
              label: `${ps.name} · ${ps.slot}`,
              on: s.set === ps.id,
              onClick: () =>
                this.store.updateAction(ea.id, (a) => {
                  const next = a.steps.slice();
                  next[i] = { ...next[i], set: ps.id };
                  return { ...a, steps: next };
                }),
            }));
          } else if (c && (c.values || c.type === 'knob')) {
            vals = (c.values || KNOB_VALUES).map((v) => ({
              label: v.label,
              on: s.value === v.value,
              onClick: () =>
                this.store.updateAction(ea.id, (a) => {
                  const next = a.steps.slice();
                  next[i] = { ...next[i], value: v.value };
                  return { ...a, steps: next };
                }),
            }));
          }

          return html`
            <div
              style="padding:10px 12px;border-radius:15px;cursor:pointer;border:2.5px solid #16323d;background:${s.control ===
              'pc'
              ? '#fdf3d4'
              : '#fffbf0'};transition:box-shadow 160ms ease;${focused
                ? 'box-shadow:0 0 0 4px #f7c948'
                : ''}"
              @click=${() => {
              this.focusKey = fKey;
              if (st.rig.includes(s.device)) {
                this.store.setBrowseDevice(s.device);
              }
            }}
            >
              <div style="display:flex;align-items:center;gap:9px">
                <span
                  style="width:22px;height:22px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;border:2px solid #16323d;background:${focused
              ? '#f7c948'
              : '#fffbf0'}"
                  >${i + 1}</span
                >
                <span style="flex:1;min-width:0">
                  <span style="display:block;font-size:13px;font-weight:600"
                    >${stepTitle}</span
                  >
                  ${role
              ? html`<span
                        style="display:block;font-size:11.5px;line-height:1.4;opacity:.65;margin-top:2px;text-wrap:pretty"
                        >${role}</span
                      >`
              : null}
                </span>
                <button
                  class="del-btn"
                  style="width:24px;height:24px;flex:none;border-radius:9px;border:2px solid #16323d;font-size:12px;line-height:1"
                  @click=${(e: Event) => {
              e.stopPropagation();
              this.store.removeStep(i);
            }}
                >
                  ×
                </button>
              </div>
              ${vals.length > 0
              ? html`
                    <div
                      style="display:flex;flex-wrap:wrap;gap:5px;margin-top:9px"
                    >
                      ${vals.map(
                (v) => html`
                          <button
                            style="padding:5px 10px;border-radius:11px;font-size:11.5px;border:2px solid #16323d;transition:background 140ms ease;${v.on
                    ? 'background:#8fd0e6;font-weight:600;box-shadow:2px 2px 0 #16323d'
                    : 'background:#fffbf0;opacity:.7'}"
                            @click=${(e: Event) => {
                    e.stopPropagation();
                    v.onClick();
                  }}
                          >
                            ${v.label}
                          </button>
                        `
              )}
                    </div>
                  `
              : null}
            </div>
          `;
        })}

        ${list.length === 0
        ? html`
              <div
                style="padding:20px 16px;border-radius:16px;border:2.5px dashed rgba(22,50,61,.3);font-size:12.5px;line-height:1.5;opacity:.7;text-align:center;text-wrap:pretty"
              >
                tap any control on the pedal to add it to this action.
              </div>
            `
        : null}

        ${edCanSet && setupPedalId && setupPedal
        ? html`
              <button
                class="hover-opa"
                style="align-self:flex-start;padding:6px 12px;border-radius:13px;border:2px dashed #16323d;font-size:12px;font-weight:600;opacity:.7"
                @click=${() => {
            const sets = this.store.setsForDevice(setupPedalId);
            if (!sets.length) return;
            this.store.updateAction(ea.id, (a) => ({
              ...a,
              steps: [
                {
                  device: setupPedalId,
                  control: 'pc',
                  set: sets[0].id,
                  value: null,
                },
                ...a.steps,
              ],
            }));
          }}
              >
                + make a ${setupPedal.name} knob move on its own
              </button>
            `
        : null}
      </div>

      <div
        style="flex:none;display:flex;align-items:center;gap:8px;padding:12px 14px;border-top:2.5px solid #16323d;background:#fffbf0"
      >
        <button
          class="hover-opa"
          style="padding:8px 10px;border-radius:16px;font-size:12.5px;opacity:.55"
          @click=${() => this.store.deleteAction(ea.id)}
        >
          delete
        </button>
        <span style="flex:1"></span>
        <button
          class="hover-paper"
          style="padding:8px 12px;border-radius:16px;border:2px solid #16323d;font-size:12.5px;font-weight:600"
          @click=${() => {
        this.store.setMode('assign', null);
        this.store.insertAction(ea.id);
      }}
        >
          + ${this.store.slotName()}
        </button>
        <button
          style="padding:9px 16px;border-radius:18px;background:#f7c948;border:2.5px solid #16323d;box-shadow:3px 3px 0 #16323d;font-size:13px;font-weight:600"
          @click=${() => this.store.setMode('assign', null)}
        >
          done
        </button>
      </div>
    `;
  }

  private renderAssignList(list: MacroStep[], lim: number) {
    const st = this.store.state;
    const usage = this.store.actionUsage();
    const navBtnStyle = (enabled: boolean) =>
      `width:${this.phone ? 30 : 24}px;height:${this.phone ? 30 : 24
      }px;border-radius:9px;border:2px solid #16323d;font-size:12px;line-height:1;transition:background 140ms ease;${enabled ? '' : 'opacity:.25;pointer-events:none'
      }`;
    const delStyle = `width:${this.phone ? 30 : 24}px;height:${this.phone ? 30 : 24
      }px;border-radius:9px;border:2px solid #16323d;font-size:12px;line-height:1;transition:background 140ms ease,color 140ms ease`;

    return html`
      ${st.notice
        ? html`
            <div
              style="flex:none;display:flex;align-items:center;gap:9px;padding:10px 14px;background:#ffe6dd;border-bottom:2.5px solid #16323d;font-size:12.5px;line-height:1.4;animation:stepIn 160ms cubic-bezier(.23,1,.32,1)"
            >
              <span style="flex:1;text-wrap:pretty">${st.notice}</span>
              <button
                style="width:22px;height:22px;flex:none;border-radius:50%;border:2px solid #16323d;font-size:11px;line-height:1;display:flex;align-items:center;justify-content:center"
                @click=${() => this.store.clearNotice()}
              >
                ×
              </button>
            </div>
          `
        : null}

      <div
        style="flex:1;min-height:0;overflow:auto;padding:13px;display:flex;flex-direction:column;gap:9px;background:#fffbf0"
      >
        ${list.length === 0
        ? html`
              <div
                style="text-align:center;padding:28px 20px;border-radius:20px;border:2.5px dashed rgba(22,50,61,.3)"
              >
                <div
                  style="width:44px;height:44px;margin:0 auto 13px;border-radius:14px;background:#8fd0e6;border:2.5px solid #16323d;position:relative;animation:bob 2.6s ease-in-out infinite"
                >
                  <span
                    style="position:absolute;left:11px;top:16px;width:5px;height:5px;border-radius:50%;background:#16323d"
                  ></span>
                  <span
                    style="position:absolute;right:11px;top:16px;width:5px;height:5px;border-radius:50%;background:#16323d"
                  ></span>
                  <span
                    style="position:absolute;left:50%;bottom:10px;transform:translateX(-50%);width:14px;height:7px;border-bottom:2.5px solid #16323d;border-radius:0 0 14px 14px"
                  ></span>
                </div>
                <div style="font-size:14px;font-weight:600;margin-bottom:5px">
                  nothing on this press yet
                </div>
                <div
                  style="font-size:12.5px;line-height:1.5;opacity:.6;text-wrap:pretty"
                >
                  tap the pedal, or add an action from the left.
                </div>
              </div>
            `
        : null}

        ${list.map((s, i) => {
          const d = describeStep(s, st.channels, st.pedalSets, st.offsets);
          const a = s.act ? this.store.actionById(s.act) : null;
          const head = !!a && (i === 0 || list[i - 1].inst !== s.inst);
          const col = a
            ? this.store.capOf(a.caps[0])?.colour || '#f7c948'
            : '#f7c948';
          const groupSteps =
            head && s.inst ? list.filter((x) => x.inst === s.inst) : [];
          const wi = head ? this.store.wiggleInfo(groupSteps) : null;
          const wv = wi ? this.wigVis(wi, '#fffbf0') : null;
          const n = a ? usage[a.id] || 0 : 0;
          const pinned = this.pinnedRowIndex === i;

          const ctl = HardwareRegistry.getControl(s.device, s.control);
          const isKnob =
            !!ctl &&
            ctl.type === 'knob' &&
            s.value != null &&
            !isNaN(Number(s.value));
          const opts =
            ctl && ctl.values && s.control !== 'pc' ? ctl.values : null;
          const pcSets =
            s.control === 'pc' ? this.store.setsForDevice(s.device) : null;
          const editOn =
            pinned && (isKnob || !!opts || (!!pcSets && pcSets.length > 0));

          const dk = `row:${i}`;
          const dragVal =
            this.dragState && this.dragState.key === dk
              ? this.dragState.v
              : null;
          const numVal = isKnob ? Number(s.value) : 64;
          const editVal = dragVal != null ? dragVal : numVal;
          const editWord =
            dragVal != null
              ? `${dragVal} / 127`
              : isKnob
                ? knobWord(numVal) === String(numVal)
                  ? String(numVal)
                  : `${numVal} · ${knobWord(numVal)}`
                : '';

          const cl = this.store.clash(list, i);
          const label = this.formatStepLabel(s);
          const meta = `${s.from ? `was “${s.from}”, changed · ` : ''}${d
            ? s.control === 'pc'
              ? `${d.deviceName} · ch${d.channel} · pc ${d.value}`
              : `${d.deviceName} · ch${d.channel} · cc${d.cc} · ${d.value}`
            : s.device
            }`;

          const headStyle = `flex:none;display:flex;flex-direction:column;gap:9px;padding:10px 12px;border-radius:16px;border:2.5px solid #16323d;background:${col};box-shadow:3px 3px 0 #16323d;margin-top:${i ? 5 : 0
            }px;animation:stepIn 160ms cubic-bezier(.23,1,.32,1)`;

          const rowStyle = a
            ? `flex:none;display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:8px 12px;margin-left:16px;border-radius:14px;border:2px solid #16323d;cursor:pointer;transition:background 120ms ease;background:${pinned ? '#f7c948' : '#fffbf0'
            };animation:stepIn 160ms cubic-bezier(.23,1,.32,1)`
            : `flex:none;display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:10px 12px;border-radius:16px;border:2.5px solid #16323d;cursor:pointer;transition:background 120ms ease;background:${pinned ? '#f7c948' : '#fffbf0'
            };box-shadow:3px 3px 0 #16323d;margin-top:${i && list[i - 1].act ? 5 : 0
            }px;animation:stepIn 160ms cubic-bezier(.23,1,.32,1)`;

          return html`
            <div style="display:contents">
              ${head && a
              ? html`
                    <div
                      style=${headStyle}
                      @pointerenter=${() => {
                  if (this.pinnedRowIndex === null && groupSteps[0]) {
                    this.store.setPeek({
                      device: groupSteps[0].device,
                      control: groupSteps[0].control,
                      value: groupSteps[0].value,
                    });
                  }
                }}
                      @pointerleave=${() => {
                  if (this.pinnedRowIndex === null) {
                    this.store.setPeek(null);
                  }
                }}
                    >
                      <div style="display:flex;align-items:center;gap:8px">
                        <span style="display:flex;gap:3px;flex:none">
                          ${a.caps.map((cId) => {
                  const cap = this.store.capOf(cId);
                  return cap
                    ? html`<span
                                  title=${cap.name}
                                  style="width:12px;height:12px;border-radius:4px;border:2px solid #16323d;background:${cap.colour}"
                                ></span>`
                    : null;
                })}
                        </span>
                        <span
                          style="flex:1;min-width:0;font-size:13.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
                          >${a.name}</span
                        >
                        <span
                          style="flex:none;font-family:'DM Mono',monospace;font-size:9.5px;padding:2px 7px;border-radius:9px;background:#16323d;color:#fdf3d4"
                          >${n > 1 ? `linked · on ${n}` : 'linked'}</span
                        >
                      </div>
                      ${wi && wv
                  ? html`
                            <div
                              style="display:flex;flex-direction:column;gap:6px"
                            >
                              <div style=${wv.track}>
                                <div style=${wv.seg}>
                                  <div style=${wv.dot}></div>
                                </div>
                              </div>
                              <span
                                style="font-family:'DM Mono',monospace;font-size:10.5px"
                                >${wi.text}</span
                              >
                            </div>
                          `
                  : null}
                      <div style="display:flex;gap:6px">
                        <button
                          style="padding:4px 10px;border-radius:11px;border:2px solid #16323d;background:#fffbf0;font-size:11.5px;font-weight:600"
                          @click=${() => this.store.setMode('build', a.id)}
                        >
                          edit action
                        </button>
                        <button
                          class="hover-opa"
                          title="keep these messages here but stop following the action"
                          style="padding:4px 10px;border-radius:11px;border:2px solid #16323d;background:transparent;font-size:11.5px;font-weight:600;opacity:.7"
                          @click=${() =>
                  s.inst && this.store.detachGroup(s.inst)}
                        >
                          unlink
                        </button>
                        <span style="flex:1"></span>
                        <button
                          class="hover-opa"
                          title="take the whole action off"
                          style="padding:4px 10px;border-radius:11px;font-size:11.5px;font-weight:600;opacity:.6"
                          @click=${() =>
                  s.inst && this.store.removeGroup(s.inst)}
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  `
              : null}

              <div
                style=${rowStyle}
                @pointerenter=${() => {
              if (this.pinnedRowIndex === null) {
                this.store.setPeek({
                  device: s.device,
                  control: s.control,
                  value: s.value,
                });
              }
            }}
                @pointerleave=${() => {
              if (this.pinnedRowIndex === null) {
                this.store.setPeek(null);
              }
            }}
                @click=${(e: Event) => {
              const target = e.target as HTMLElement;
              if (target.closest('button,input')) return;
              if (this.pinnedRowIndex === i) {
                this.pinnedRowIndex = null;
                this.store.setPeek(null);
              } else {
                this.pinnedRowIndex = i;
                this.store.setPeek({
                  device: s.device,
                  control: s.control,
                  value: s.value,
                });
                if (st.rig.includes(s.device)) {
                  this.store.setBrowseDevice(s.device);
                }
              }
            }}
              >
                <span
                  style="width:22px;height:22px;flex:none;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:11px;background:#16323d;color:#fffbf0"
                  >${i + 1}</span
                >
                <span
                  style="width:13px;height:13px;flex:none;border-radius:5px;background:${d
              ? d.accent
              : '#ccc'};border:2px solid #16323d"
                ></span>
                <span style="flex:1;min-width:0">
                  <span
                    style="display:block;font-size:13.5px;font-weight:600;line-height:1.25;text-wrap:pretty;overflow-wrap:anywhere${cl &&
              cl.kind === 'over'
              ? ';opacity:.45;text-decoration:line-through;text-decoration-thickness:1.5px'
              : ''}"
                    >${label}</span
                  >
                  <span
                    style="display:block;font-family:'DM Mono',monospace;font-size:10px;opacity:.55"
                    >${meta}</span
                  >
                </span>
                <span style="display:flex;gap:4px;flex:none">
                  <button
                    style=${navBtnStyle(i > 0)}
                    @click=${(e: Event) => {
              e.stopPropagation();
              this.store.moveStep(i, -1);
            }}
                  >
                    ↑
                  </button>
                  <button
                    style=${navBtnStyle(i < list.length - 1)}
                    @click=${(e: Event) => {
              e.stopPropagation();
              this.store.moveStep(i, 1);
            }}
                  >
                    ↓
                  </button>
                  <button
                    class="del-btn"
                    style=${delStyle}
                    @click=${(e: Event) => {
              e.stopPropagation();
              if (this.pinnedRowIndex === i) this.pinnedRowIndex = null;
              this.store.removeStep(i);
            }}
                  >
                    ×
                  </button>
                </span>

                ${editOn
              ? html`
                      <span
                        style="flex:1 0 100%;display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;margin-top:-2px;padding:6px 8px;border-radius:9px;background:#fffbf0;border:2px solid #16323d"
                      >
                        ${isKnob
                  ? html`
                              <input
                                type="range"
                                min="0"
                                max="127"
                                step="1"
                                .value=${String(editVal)}
                                style="flex:1;min-width:120px;width:100%;accent-color:#16323d;height:22px;margin:0;cursor:pointer"
                                @input=${(e: Event) => {
                      this.dragState = {
                        key: dk,
                        v: Number(
                          (e.target as HTMLInputElement).value
                        ),
                      };
                    }}
                                @change=${(e: Event) => {
                      const v = Number(
                        (e.target as HTMLInputElement).value
                      );
                      this.dragState = null;
                      this.store.setValueAt(i, v);
                    }}
                              />
                              <span
                                style="flex:none;width:104px;text-align:right;font-family:'DM Mono',monospace;font-size:11px;font-variant-numeric:tabular-nums;white-space:nowrap"
                                >${editWord}</span
                              >
                            `
                  : null}
                        ${opts
                  ? opts.map((opt) => {
                    const on = s.value === opt.value;
                    return html`
                                <button
                                  style="padding:3px 10px;border-radius:9px;font-size:11.5px;font-weight:600;border:2px solid #16323d;background:${on
                        ? '#8fd0e6'
                        : '#fffbf0'}"
                                  @click=${() =>
                        this.store.setValueAt(i, opt.value)}
                                >
                                  ${opt.label}
                                </button>
                              `;
                  })
                  : null}
                        ${pcSets
                  ? pcSets.map((ps) => {
                    const on = s.set === ps.id;
                    return html`
                                <button
                                  style="padding:3px 10px;border-radius:9px;font-size:11.5px;font-weight:600;border:2px solid #16323d;background:${on
                        ? '#8fd0e6'
                        : '#fffbf0'}"
                                  @click=${() =>
                        this.store.setPedalSetupAt(i, ps.id)}
                                >
                                  ${ps.name} · ${ps.slot}
                                </button>
                              `;
                  })
                  : null}
                      </span>
                    `
              : null}

                ${cl
              ? html`
                      <span
                        style="flex:1 0 100%;display:flex;align-items:center;gap:8px;margin-top:-2px;padding:5px 6px 5px 9px;border-radius:9px;font-size:11.5px;line-height:1.3;font-weight:500;color:#16323d;background:${cl.kind ===
                  'wig'
                  ? '#e8f4fa'
                  : 'rgba(22,50,61,.08)'}"
                      >
                        <span style="flex:1;min-width:0;text-wrap:pretty"
                          >${cl.text}</span
                        >
                        ${cl.kind === 'over'
                  ? html`
                              <button
                                style="flex:none;padding:3px 9px;border-radius:8px;border:2px solid #16323d;background:#fffbf0;font-size:11px;font-weight:600"
                                @click=${(e: Event) => {
                      e.stopPropagation();
                      if (cl.merge != null) {
                        this.store.mergeSetups(i, cl.merge);
                      } else {
                        this.store.removeStep(i);
                      }
                    }}
                              >
                                ${cl.merge != null ? 'merge' : 'remove'}
                              </button>
                            `
                  : null}
                      </span>
                    `
              : null}
              </div>
            </div>
          `;
        })}

        ${list.length >= lim
        ? html`
              <div
                style="padding:9px 13px;border-radius:14px;background:#ffe6dd;border:2px solid #16323d;font-size:12.5px"
              >
                this press is full (${lim} of ${lim} messages for
                ${this.store.limitWho()}). remove a step to make room.
              </div>
            `
        : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'macro-panel': MacroPanel;
  }
}
