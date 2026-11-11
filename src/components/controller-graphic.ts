import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, motionKeyframes } from '../styles/shared.js';
import { CONTROLLERS, ACTIONS, SIDE_LABELS } from '../data/controllers.js';
import { DEVICES } from '../data/devices.js';
import { HEX, TEXTHEX, NAMING } from '../data/naming.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

@customElement('controller-graphic')
export class ControllerGraphic extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    motionKeyframes,
    css`
      :host {
        display: block;
      }
      .bank-hit-btn:hover {
        background: rgba(127, 196, 255, 0.18) !important;
      }
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  @property({ type: Boolean, reflect: true }) desktop = false;
  @property({ type: Boolean, reflect: true }) phone = false;
  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  private trunc(str: string, max: number): string {
    if (!max || !str) return '';
    return str.length <= max ? str : str.slice(0, max - 1) + '…';
  }

  render() {
    const st = this.store.state;
    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS.chocolate;
    const bank = st.banks[st.bank] || st.banks[0];
    const acts = this.store.availableActions();
    const idNow = this.store.ident(st.bank, st.selectedKey);
    const shared = this.store.sharedColors();
    const canName = this.store.displayTargets().length > 0 || shared.length > 0;
    const chocChips = canName && st.brainId === 'scribble' && !ctrl.isBrain;
    const onDev = canName && ((!!ctrl.isBrain && !!ctrl.photo) || chocChips);
    const showBrainPhoto = !ctrl.isBrain && st.brainId === 'scribble' && canName;
    const stripInk = TEXTHEX[idNow.textColor];
    const list = bank?.[st.selectedKey]?.[st.action] || [];
    const lim = this.store.limit();
    const lcdCount = `${list.length}/${lim}`;
    const bankCaption = `bank ${st.bank + 1} of ${st.banks.length}`;

    const ctrlHeadRowStyle = `display:flex;align-items:center;gap:10px;margin-bottom:${
      st.ctrlMin ? 10 : 14
    }px`;
    const ctrlToggleStyle = `flex:none;width:26px;height:26px;padding:0;border-radius:8px;border:2px solid #16323d;font-size:10px;line-height:1;display:flex;align-items:center;justify-content:center;background:transparent`;

    if (st.ctrlMin) {
      const p = ctrl.photo;
      const ki = ctrl.keys.indexOf(st.selectedKey);
      const sumCtrlThumbStyle = p
        ? `position:relative;flex:none;height:30px;aspect-ratio:${p.ar};background:url(${p.src}) center/100% 100% no-repeat;border-radius:${p.radius};box-shadow:0 0 0 1.5px #16323d`
        : '';
      const sumMarkStyle =
        p && ki >= 0 && p.x[ki] != null
          ? `position:absolute;left:${p.x[ki]}%;top:${p.y[ki]}%;width:${
              p.s + 5
            }%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;border:2.5px solid #f7c948;box-shadow:0 0 0 1.5px #16323d`
          : 'display:none';
      const scribPhoto = CONTROLLERS.scribble.photo!;
      const sumBrainThumbStyle = `flex:none;height:30px;aspect-ratio:${scribPhoto.ar};background:url(${scribPhoto.src}) center/100% 100% no-repeat;border-radius:${scribPhoto.radius};box-shadow:0 0 0 1.5px #16323d`;
      const sumCtrlText = ctrl.nav
        ? `p${String(st.bank + 1).padStart(3, '0')}`
        : `bank ${st.bank + 1} · ${st.selectedKey}`;
      const sumBrainText = showBrainPhoto
        ? `scribble “${idNow.name || 'unnamed'}”`
        : idNow.name
          ? `“${idNow.name}”`
          : '';

      return html`
        <div>
          <div style=${ctrlHeadRowStyle}>
            <button
              style="display:flex;align-items:baseline;gap:8px;flex:1;min-width:0;padding:0;text-align:left"
              @click=${() => this.store.openControllerPicker()}
            >
              <span
                style="flex:0 1 auto;min-width:0;font-size:16px;font-weight:600;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
                >${ctrl.name}</span
              >
              <span
                style="flex:none;font-size:13px;opacity:.5"
                title="change controller"
                >⌄</span
              >
            </button>
            <button
              title="show the controller"
              style=${ctrlToggleStyle}
              @click=${() => this.store.toggleCtrlMin()}
            >
              ▾
            </button>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <button
              title="show controller and brain"
              style="display:flex;flex-direction:column;gap:6px;padding:0;text-align:left;color:#16323d"
              @click=${() => this.store.toggleCtrlMin()}
            >
              <div style="display:flex;align-items:center;gap:8px">
                ${p
                  ? html`<div style=${sumCtrlThumbStyle}>
                      <span style=${sumMarkStyle}></span>
                    </div>`
                  : null}
                ${showBrainPhoto
                  ? html`
                      <span style="flex:none;font-size:12px;opacity:.5">→</span>
                      <div style=${sumBrainThumbStyle}></div>
                    `
                  : null}
              </div>
              <div
                style="display:flex;align-items:baseline;gap:8px;font-family:'DM Mono',monospace;font-size:10.5px"
              >
                <span
                  style="flex:1;min-width:0;opacity:.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
                  >${sumCtrlText}</span
                >
                <span
                  style="flex:none;max-width:55%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
                >
                  <span style="opacity:.6">${sumBrainText}</span> ${lcdCount}
                </span>
              </div>
            </button>
            <div
              style="display:flex;gap:3px;height:30px;box-sizing:border-box;padding:2px;border-radius:10px;border:2px solid #16323d;background:#fffbf0"
            >
              ${acts.map((a) => {
                const on = st.action === a.id;
                const n = bank?.[st.selectedKey]?.[a.id]?.length || 0;
                const label =
                  (a.id === 'press' ? 'tap' : a.label) + (n ? ` ${n}` : '');
                return html`
                  <button
                    style="flex:1;min-width:0;padding:0 2px;border-radius:7px;font-size:11.5px;font-weight:600;white-space:nowrap;transition:background 150ms ease;${on
                      ? 'background:#f7c948'
                      : 'background:transparent;opacity:.6'}"
                    @click=${() => this.store.selectAction(a.id)}
                  >
                    ${label}
                  </button>
                `;
              })}
            </div>
          </div>
        </div>
      `;
    }

    const bankRail = !ctrl.nav && !(ctrl.photo && ctrl.photo.screen?.digits);
    const bankOnScreen = !!(ctrl.photo && ctrl.photo.screen?.digits);
    const hasScreen =
      !(ctrl.isBrain && canName) &&
      (ctrl.screen || !!(ctrl.photo && ctrl.photo.screen));
    const lcdInStrip = !!ctrl.isBrain && canName;
    const devChipsOn = onDev && !chocChips;
    const chipGroupOn = chocChips;

    const bankRailStyle = `position:relative;display:flex;align-items:center;gap:7px;padding:6px;border-radius:${
      ctrl.photo ? '14px;margin-bottom:12px' : '16px 16px 0 0'
    };background:#16323d;flex-wrap:wrap${
      ctrl.nav
        ? `;width:${this.desktop ? 312 : 292}px;max-width:100%;margin:0 auto`
        : ''
    }`;

    const stripStyle = ctrl.photo
      ? `position:relative;width:100%;max-width:${
          ctrl.nav ? 340 : 420
        }px;margin:${ctrl.photo.screen?.digits ? 20 : 0}px auto ${
          ctrl.isBrain && canName ? 42 : ctrl.nav ? 22 : 26
        }px;aspect-ratio:${ctrl.photo.ar};background:url(${
          ctrl.photo.src
        }) center/100% 100% no-repeat;border-radius:${
          ctrl.photo.radius
        };box-shadow:0 0 0 2px #16323d,4px 4px 0 2px #16323d`
      : ctrl.nav
        ? `position:relative;width:${
            this.desktop ? 312 : 292
          }px;max-width:100%;margin:0 auto;height:${
            this.desktop ? 112 : 104
          }px;border-radius:0 0 14px 14px;background:#16323d;box-shadow:4px 4px 0 #7b62b8`
        : `position:relative;height:${
            this.desktop ? ctrl.heightDesktop : ctrl.height
          }px;margin-bottom:${
            chocChips ? 12 : 0
          }px;border-radius:0 0 16px 16px;background:#16323d;box-shadow:4px 4px 0 #7b62b8`;

    const screenStyle =
      ctrl.photo && ctrl.photo.screen
        ? `position:absolute;left:${ctrl.photo.screen.l}%;top:${
            ctrl.photo.screen.t
          }%;width:${ctrl.photo.screen.w}%;height:${
            ctrl.photo.screen.h
          }%;border-radius:${
            ctrl.photo.screen.r
          };display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;${
            ctrl.photo.screen.digits
              ? "background:#0b0f12;color:#cfe9ff;font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.04em;text-shadow:0 0 6px #7fc4ff"
              : `padding:4px 8px;font-size:15px;font-weight:600;letter-spacing:-.01em;line-height:1.15;background:${
                  idNow.color ? HEX[idNow.color] : '#0b0f12'
                };color:${
                  idNow.color ? stripInk : '#f7f1e3'
                };transition:background 200ms ease`
          }`
        : ctrl.nav
          ? `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${
              this.desktop ? 156 : 146
            }px;height:${
              this.desktop ? 70 : 64
            }px;border-radius:8px;padding:5px 9px;background:${
              idNow.color ? HEX[idNow.color] : '#f7f1e3'
            };border:2.5px solid #16323d;display:flex;align-items:center;justify-content:center;text-align:center;font-size:14px;font-weight:600;letter-spacing:-.01em;line-height:1.2;overflow:hidden;color:${
              idNow.color ? stripInk : '#16323d'
            };transition:background 200ms ease`
          : "position:absolute;left:50%;top:52%;transform:translateX(-50%);width:118px;height:26px;border-radius:4px;background:#f7f1e3;display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:10px;color:#16323d";

    const screenText =
      ctrl.photo && ctrl.photo.screen?.digits
        ? String(st.bank + 1).padStart(3, '0')
        : this.trunc(
            idNow.name,
            (NAMING[st.controllerId] || NAMING.mc3).name
          ) ||
          (ctrl.nav
            ? `preset ${String(st.bank + 1).padStart(3, '0')}`
            : `bank ${st.bank + 1} · ${st.selectedKey}`);

    const scribSc = CONTROLLERS.scribble.photo!.screen!;
    const lcdStyle = `position:absolute;left:${scribSc.l}%;top:${
      scribSc.t
    }%;width:${scribSc.w}%;height:${scribSc.h}%;border-radius:${
      scribSc.r
    };display:flex;flex-direction:column;align-items:stretch;justify-content:center;gap:2px;padding:16px 8px 4px;background:${
      idNow.color ? HEX[idNow.color] : '#0b0f12'
    };transition:background 200ms ease;box-shadow:inset 0 0 0 2px rgba(247,201,72,.0)`;
    const lcdTopStyle = `position:absolute;top:5%;left:5px;right:7px;display:flex;align-items:center;gap:2px;font-family:'DM Mono',monospace;font-size:10px;font-weight:500;color:${
      idNow.color ? stripInk : '#f7f1e3'
    };opacity:.75`;
    const lcdNameStyle = `width:100%;padding:0;border:0;background:transparent;text-align:center;font-family:inherit;font-size:${
      this.desktop ? 15 : 13
    }px;font-weight:600;letter-spacing:-.01em;line-height:1.2;outline:none;color:${
      idNow.color ? stripInk : '#f7f1e3'
    }`;
    const lcdSecStyle = `width:100%;padding:0;border:0;background:transparent;text-align:center;font-family:'DM Mono',monospace;font-size:10px;line-height:1.3;outline:none;opacity:.75;color:${
      idNow.color ? stripInk : '#f7f1e3'
    }`;
    const lcdColorBtn = `position:absolute;left:11.4%;top:${
      chocChips ? 72 : 74
    }%;width:22px;height:22px;transform:translate(-50%,-50%);padding:0;border-radius:7px;border:2px solid #16323d;background:${
      idNow.color
        ? HEX[idNow.color]
        : 'repeating-linear-gradient(135deg,#fffbf0 0 3px,#e9e0cc 3px 6px)'
    };box-shadow:2px 2px 0 #16323d;z-index:7`;
    const lcdColorLabel = `position:absolute;left:11.4%;top:calc(${
      chocChips ? 72 : 74
    }% - 27px);line-height:1;transform:translateX(-50%);font-family:'DM Mono',monospace;font-size:9px;color:#16323d;opacity:.6;z-index:7`;

    const presetDownStyle = `width:22px;height:22px;margin:-4px 0;padding:0;font-size:14px;font-weight:600;color:inherit;background:transparent${
      st.bank > 0 ? '' : ';opacity:.3;pointer-events:none'
    }`;
    const presetUpStyle = `width:22px;height:22px;margin:-4px 0;padding:0;font-size:14px;font-weight:600;color:inherit;background:transparent${
      st.bank < st.banks.length - 1 ? '' : ';opacity:.3;pointer-events:none'
    }`;

    const stackNamePlaceholder =
      idNow.auto ||
      (ctrl.nav ? 'name this preset' : `name switch ${st.selectedKey}`);

    return html`
      <div>
        <div style=${ctrlHeadRowStyle}>
          <button
            style="display:flex;align-items:baseline;gap:8px;flex:1;min-width:0;padding:0;text-align:left"
            @click=${() => this.store.openControllerPicker()}
          >
            <span
              style="flex:0 1 auto;min-width:0;font-size:16px;font-weight:600;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
              >${ctrl.name}</span
            >
            <span
              style="flex:none;font-size:13px;opacity:.5"
              title="change controller"
              >⌄</span
            >
          </button>
          ${!st.ctrlMin && !!ctrl.photo
            ? html`<span
                style="flex:none;font-family:'DM Mono',monospace;font-size:10px;opacity:.55;white-space:nowrap"
                >${bankCaption}</span
              >`
            : null}
          <button
            title="collapse to a summary"
            style=${ctrlToggleStyle}
            @click=${() => this.store.toggleCtrlMin()}
          >
            ▴
          </button>
        </div>

        ${bankRail
          ? html`
              <div style=${bankRailStyle}>
                <span
                  style="font-family:'DM Mono',monospace;font-size:10px;color:#f7f1e3;opacity:.5;padding-left:6px;margin-right:2px;flex:none"
                  >bank</span
                >
                ${st.banks.map((_, i) => {
                  const on = i === st.bank;
                  return html`
                    <button
                      style="flex:0 0 auto;min-width:34px;white-space:nowrap;padding:5px 7px;border-radius:11px;font-size:12.5px;font-weight:600;border:2px solid ${on
                        ? '#f7c948'
                        : 'rgba(247,241,227,.28)'};transition:background 150ms ease,color 150ms ease,border-color 150ms ease;${on
                        ? 'background:#f7c948;color:#16323d'
                        : 'background:transparent;color:rgba(247,241,227,.6)'}"
                      @click=${() => this.store.selectBank(i)}
                    >
                      ${String(i + 1).padStart(ctrl.nav ? 3 : 2, '0')}
                    </button>
                  `;
                })}
              </div>
            `
          : null}

        <div style=${stripStyle}>
          ${hasScreen
            ? html`<div style=${screenStyle}>${screenText}</div>`
            : null}
          ${bankOnScreen && ctrl.photo?.screen
            ? html`
                <div
                  style="position:absolute;left:calc(${ctrl.photo.screen.l +
                  ctrl.photo.screen.w /
                    2}% - 46px);top:50%;transform:translateY(-50%);width:92px;height:44px;display:flex;justify-content:space-between;z-index:7"
                >
                  <button
                    class="bank-hit-btn"
                    title="previous bank"
                    style="width:44px;height:44px;padding:0;border-radius:6px 0 0 6px;font-size:16px;font-weight:600;color:#cfe9ff;text-shadow:0 0 6px #7fc4ff;background:transparent;transition:background 150ms ease${st.bank >
                    0
                      ? ''
                      : ';opacity:.25;pointer-events:none'}"
                    @click=${() => this.store.selectBank(Math.max(0, st.bank - 1))}
                  >
                    ‹
                  </button>
                  <button
                    class="bank-hit-btn"
                    title="next bank"
                    style="width:44px;height:44px;padding:0;border-radius:0 6px 6px 0;font-size:16px;font-weight:600;color:#cfe9ff;text-shadow:0 0 6px #7fc4ff;background:transparent;transition:background 150ms ease${st.bank <
                    st.banks.length - 1
                      ? ''
                      : ';opacity:.25;pointer-events:none'}"
                    @click=${() =>
                      this.store.selectBank(
                        Math.min(st.banks.length - 1, st.bank + 1)
                      )}
                  >
                    ›
                  </button>
                </div>
              `
            : null}
          ${lcdInStrip
            ? html`
                <div style=${lcdStyle}>
                  <div style=${lcdTopStyle}>
                    <button
                      title="previous preset"
                      style=${presetDownStyle}
                      @click=${() =>
                        this.store.selectBank(Math.max(0, st.bank - 1))}
                    >
                      ‹
                    </button>
                    <span>${String(st.bank + 1).padStart(3, '0')}</span>
                    <button
                      title="next preset"
                      style=${presetUpStyle}
                      @click=${() =>
                        this.store.selectBank(
                          Math.min(st.banks.length - 1, st.bank + 1)
                        )}
                    >
                      ›
                    </button>
                    <span style="flex:1"></span>
                    <span title="messages on this press">${lcdCount}</span>
                  </div>
                  <input
                    .value=${idNow.raw.name || ''}
                    placeholder=${stackNamePlaceholder}
                    maxlength="12"
                    style=${lcdNameStyle}
                    @input=${(e: InputEvent) =>
                      this.store.setIdent({
                        name: (e.target as HTMLInputElement).value,
                      })}
                  />
                  <input
                    .value=${idNow.secondary}
                    placeholder="second line"
                    maxlength="12"
                    style=${lcdSecStyle}
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
                  style=${lcdColorBtn}
                  @click=${() => this.store.toggleColorPicker()}
                ></button>
              `
            : null}
          ${ctrl.keys.map((k, i) => {
            const on = st.selectedKey === k;
            let n = 0;
            ACTIONS.forEach((a) => {
              n += bank?.[k]?.[a.id]?.length || 0;
            });
            const devs: Record<string, number> = {};
            ACTIONS.forEach((a) =>
              bank?.[k]?.[a.id]?.forEach((s) => {
                devs[s.device] = 1;
              })
            );
            const ids = Object.keys(devs);
            const fill =
              ids.length === 1
                ? DEVICES[ids[0]]?.accent || '#f7c948'
                : ids.length > 1
                  ? '#f7c948'
                  : 'rgba(247,241,227,.16)';
            const sid = this.store.ident(st.bank, k);
            const name =
              ctrl.isBrain && canName
                ? ''
                : ctrl.nav
                  ? SIDE_LABELS[k] || k
                  : n > 0 && sid.name
                    ? this.trunc(sid.name, 10)
                    : k;
            const count = n > 0 ? String(n) : '';
            const wrapStyle = ctrl.photo
              ? `position:absolute;left:${ctrl.photo.x[i]}%;top:${
                  ctrl.photo.y[i]
                }%;width:${ctrl.photo.s + 2}%;aspect-ratio:1;transform:translate(-50%,-50%);padding:0`
              : `position:absolute;left:${ctrl.x[i]}%;top:${ctrl.y[i]}%;transform:translate(-50%,-50%);width:38px;height:38px;padding:0`;

            const lensCapObj = st.lens ? this.store.capOf(st.lens) : null;
            const lensMatch =
              st.lens && this.store.slotCaps(bank[k]).includes(st.lens);
            const capStyle = `display:flex;align-items:center;justify-content:center;width:100%;height:100%;border-radius:50%;font-size:12px;font-weight:600;color:#16323d;background:${
              ctrl.photo ? (n ? `${fill}cc` : 'transparent') : fill
            };border:2.5px ${on || !ctrl.nav ? 'solid ' : 'dashed '}${
              on
                ? '#f7c948'
                : ctrl.photo
                  ? ctrl.nav
                    ? 'rgba(22,50,61,.4)'
                    : 'transparent'
                  : 'rgba(247,241,227,.4)'
            };box-shadow:${
              on ? '0 0 0 4px rgba(247,201,72,.3)' : 'none'
            };transition:box-shadow 160ms cubic-bezier(.23,1,.32,1),border-color 160ms ease,background 160ms ease${
              st.firing === k
                ? ';animation:ring 520ms cubic-bezier(.23,1,.32,1) infinite'
                : ''
            }${
              st.lens && lensCapObj
                ? lensMatch
                  ? `;box-shadow:0 0 0 5px ${lensCapObj.colour}`
                  : ';opacity:.3'
                : ''
            }`;

            const nameStyle = `position:absolute;left:50%;top:calc(100% + 5px);transform:translateX(-50%);max-width:${
              this.desktop ? 88 : 74
            }px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;line-height:14px;font-size:11.5px;font-weight:600;color:${
              ctrl.photo
                ? on
                  ? '#16323d;background:#f7c948;padding:0 6px;border-radius:7px'
                  : '#16323d;opacity:.6'
                : on
                  ? '#f7c948'
                  : 'rgba(247,241,227,.55)'
            }`;

            return html`
              <button
                style=${wrapStyle}
                @click=${() => this.store.selectSwitch(k)}
              >
                <span style=${capStyle}>${count}</span>
                <span style=${nameStyle}>${name}</span>
              </button>
            `;
          })}
          ${devChipsOn && ctrl.isBrain && ctrl.photo
            ? ctrl.keys.map((k, ki) =>
                acts.map((a, ai) => {
                  const on = st.selectedKey === k && st.action === a.id;
                  const n = bank?.[k]?.[a.id]?.length || 0;
                  const label = a.id === 'press' ? 'tap' : a.label;
                  const style = `position:absolute;top:calc(100% + 8px);${
                    ki === 0
                      ? `left:${ai * 60}`
                      : `right:${(acts.length - 1 - ai) * 60}`
                  }px;width:56px;justify-content:center;z-index:6;display:flex;align-items:center;gap:4px;padding:2px 3px 2px 7px;border-radius:10px;font-size:10.5px;font-weight:600;white-space:nowrap;border:2px solid #16323d;transition:background 150ms ease,box-shadow 150ms ease;${
                    on
                      ? 'background:#f7c948;box-shadow:2px 2px 0 #16323d'
                      : 'background:#fffbf0;opacity:.75'
                  }`;
                  const countStyle = `font-family:'DM Mono',monospace;font-size:9px;min-width:14px;text-align:center;border-radius:7px;background:${
                    on ? '#16323d' : 'rgba(22,50,61,.14)'
                  };color:${on ? '#f7c948' : '#16323d'}`;
                  return html`
                    <button
                      title="${k === 'L' ? 'left' : 'right'} switch · ${label}"
                      style=${style}
                      @click=${() => {
                        this.store.selectSwitch(k);
                        this.store.selectAction(a.id);
                      }}
                    >
                      <span>${label}</span>
                      <span style=${countStyle}>${n}</span>
                    </button>
                  `;
                })
              )
            : null}
        </div>

        ${chipGroupOn
          ? html`
              <div style="display:flex;flex-direction:column;gap:8px;margin:0 0 18px">
                <span
                  style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;opacity:.5"
                  >switch ${st.selectedKey}</span
                >
                <div
                  style="display:flex;gap:3px;padding:3px;border-radius:12px;border:2px solid #16323d;background:#fffbf0"
                >
                  ${acts.map((a) => {
                    const on = st.action === a.id;
                    const n = bank?.[st.selectedKey]?.[a.id]?.length || 0;
                    const lab = a.id === 'press' ? 'tap' : a.label;
                    return html`
                      <button
                        title="switch ${st.selectedKey} · ${lab}"
                        style="flex:1;min-width:0;display:flex;align-items:center;justify-content:center;gap:5px;padding:5px 4px;border-radius:8px;font-size:12px;font-weight:600;white-space:nowrap;color:#16323d;transition:background 150ms ease,opacity 150ms ease;${on
                          ? 'background:#f7c948'
                          : 'background:transparent;opacity:.6'}"
                        @click=${() => this.store.selectAction(a.id)}
                      >
                        <span>${lab}</span>
                        <span
                          style="font-family:'DM Mono',monospace;font-size:9.5px;min-width:15px;text-align:center;border-radius:7px;background:${on
                            ? '#16323d'
                            : 'rgba(22,50,61,.14)'};color:${on
                            ? '#f7c948'
                            : '#16323d'}"
                          >${n}</span
                        >
                      </button>
                    `;
                  })}
                </div>
              </div>
            `
          : null}
        ${showBrainPhoto
          ? html`
              <div
                style="margin:0 0 8px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;opacity:.5"
              >
                scribble · screen when you press
                ${ctrl.nav ? 'this preset' : st.selectedKey}
              </div>
              <div
                style="position:relative;width:100%;max-width:${this.desktop
                  ? 300
                  : this.phone
                    ? 220
                    : 260}px;margin:0 auto 4px;aspect-ratio:${CONTROLLERS
                  .scribble.photo!.ar};background:url(${CONTROLLERS.scribble
                  .photo!.src}) center/100% 100% no-repeat;border-radius:${CONTROLLERS
                  .scribble.photo!
                  .radius};box-shadow:0 0 0 2px #16323d,4px 4px 0 2px #16323d"
              >
                <div style=${lcdStyle}>
                  <div style=${lcdTopStyle}>
                    <span style="flex:1"></span>
                    <span title="messages on this press">${lcdCount}</span>
                  </div>
                  <input
                    .value=${idNow.raw.name || ''}
                    placeholder=${stackNamePlaceholder}
                    maxlength="12"
                    style=${lcdNameStyle}
                    @input=${(e: InputEvent) =>
                      this.store.setIdent({
                        name: (e.target as HTMLInputElement).value,
                      })}
                  />
                  <input
                    .value=${idNow.secondary}
                    placeholder="second line"
                    maxlength="12"
                    style=${lcdSecStyle}
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
                  style=${lcdColorBtn}
                  @click=${() => this.store.toggleColorPicker()}
                ></button>
                <span style=${lcdColorLabel}>colour</span>
                ${CONTROLLERS.scribble.photo!.x.map(
                  (x, i) => html`
                    <span
                      style="position:absolute;left:${x}%;top:${CONTROLLERS
                        .scribble.photo!.y[i]}%;width:${CONTROLLERS.scribble
                        .photo!.s +
                      2}%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:rgba(240,238,232,.75);pointer-events:none"
                    ></span>
                  `
                )}
              </div>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'controller-graphic': ControllerGraphic;
  }
}
