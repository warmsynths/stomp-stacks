import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  tokens,
  resetAndButton,
  motionKeyframes,
  renderHintPopover,
} from '../styles/shared.js';
import { CAPS, type CapabilityDef } from '../data/capabilities.js';
import { SOUNDS, SOUND_TAGS, type ActionDef } from '../data/actions.js';
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
      .dev-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-top: 10px;
      }
      .dev-pill {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11.5px;
        font-weight: 600;
        border: 2px solid #16323d;
        transition: background 150ms ease;
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
  @state() private moreSoundTags = false;

  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  private renderActionCard(
    a: ActionDef,
    c: CapabilityDef,
    usageMap: Record<string, number>,
    curActLabel: string,
    slotName: string,
    whyTags?: string[],
    isTourTarget = false
  ) {
    const st = this.store.state;
    const build = st.mode === 'build' && !!st.actEdit;
    const useCount = usageMap[a.id] || 0;
    const missing = this.store.missingFor(a);
    const editing = build && st.actEdit === a.id;
    const devs = [...new Set(a.steps.map((m) => m.device))];
    const wi = this.store.wiggleInfo(a.steps);
    const setObj = wi ? wi.set : null;
    const setDev = setObj ? HardwareRegistry.getDevice(setObj.device) : null;
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
          <span style="font-size:13.5px;font-weight:600;flex:1;min-width:0"
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
        <div style="font-size:11.5px;line-height:1.45;opacity:.72;margin-top:3px">
          ${a.what}
        </div>
        ${setObj
          ? html`
              <button
                style=${setStyle}
                title="see or mark this pedal setup"
                @click=${() => this.store.openSetups(setObj.id, setObj.device)}
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
        ${whyTags && whyTags.length
          ? html`
              <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:7px">
                ${whyTags.map(
                  (label) => html`
                    <span
                      style="font-family:'DM Mono',monospace;font-size:9.5px;padding:1px 7px;border-radius:9px;border:1.5px solid #16323d;background:#fdf3d4"
                      >${label}</span
                    >
                  `
                )}
              </div>
            `
          : null}
        <div style="display:flex;align-items:center;gap:6px;margin-top:9px">
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
                  data-tour=${isTourTarget ? 't2' : ''}
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

    const libQ = (st.soundQuery || '').trim().toLowerCase();
    const libPick = st.soundTags || [];
    const qWords = ` ${libQ.replace(/[^a-z\- ]/g, ' ')} `;
    const heardSounds = libQ
      ? SOUNDS.filter((sd) => sd.words.some((w) => qWords.includes(` ${w}`))).map(
          (sd) => sd.id
        )
      : [];
    const activeSounds = [
      ...libPick,
      ...heardSounds.filter((id) => !libPick.includes(id)),
    ];
    const soundsOf = (a: ActionDef) => SOUND_TAGS[a.id] || [];
    const searching = activeSounds.length > 0 || libQ.length > 0;

    const rigSoundRank = SOUNDS.map((sd) => ({
      sd,
      n: st.actions.filter(
        (a) =>
          soundsOf(a).includes(sd.id) &&
          a.steps.some((x) => st.rig.includes(x.device))
      ).length,
    }))
      .filter((x) => x.n >= 1 || libPick.includes(x.sd.id) || heardSounds.includes(x.sd.id))
      .sort((x, y) => y.n - x.n);

    const visibleTags = rigSoundRank
      .map((x) => x.sd)
      .filter(
        (sd, i) =>
          this.moreSoundTags ||
          i < 6 ||
          libPick.includes(sd.id) ||
          heardSounds.includes(sd.id)
      );

    const allHits = !searching
      ? []
      : st.actions
          .map((a) => {
            const hits = SOUNDS.filter(
              (sd) =>
                activeSounds.includes(sd.id) && soundsOf(a).includes(sd.id)
            );
            const text =
              libQ.length > 2 &&
              `${a.name} ${a.what || ''}`.toLowerCase().includes(libQ);
            return { a, hits, score: hits.length * 2 + (text ? 3 : 0) };
          })
          .filter(
            (x) =>
              x.score > 0 &&
              (!st.libDev || x.a.steps.some((y) => y.device === st.libDev))
          )
          .sort((x, y) => y.score - x.score);

    const limit = st.soundLimit || 5;
    const shownHits = allHits.slice(0, limit);

    const bankActs: Record<string, boolean> = {};
    const bankWhere: Record<string, string> = {};
    const curBank = st.banks[st.bank] || {};
    Object.keys(curBank).forEach((k) =>
      (['press', 'hold', 'double'] as const).forEach((ac) =>
        (curBank[k]?.[ac] || []).forEach((x) => {
          if (x.act) {
            bankActs[x.act] = true;
            bankWhere[x.act] = bankWhere[x.act] || k;
          }
        })
      )
    );
    const hereActs: Record<string, boolean> = {};
    curList.forEach((x) => {
      if (x.act) hereActs[x.act] = true;
    });
    const bankSounds: Record<string, boolean> = {};
    st.actions.forEach((a) => {
      if (bankActs[a.id]) {
        soundsOf(a).forEach((t) => {
          bankSounds[t] = true;
        });
      }
    });
    const PAIRS: Record<string, string> = {
      a12: 'a10',
      a10: 'a12',
      a4: 'a8',
      a8: 'a4',
      a7: 'a9',
    };
    const soundsById: Record<string, (typeof SOUNDS)[number]> = {};
    SOUNDS.forEach((sd) => {
      soundsById[sd.id] = sd;
    });
    const suggest = st.actions
      .filter((a) => !hereActs[a.id] && a.steps.some((x) => st.rig.includes(x.device)))
      .map((a) => {
        const fresh = soundsOf(a).filter((t) => !bankSounds[t]);
        const mateId = PAIRS[a.id];
        const mate =
          mateId && bankActs[mateId] && !bankActs[a.id]
            ? this.store.actionById(mateId)
            : null;
        const n = usageMap[a.id] || 0;
        let score = 0;
        let reason = '';
        if (mate) {
          score = 3;
          reason = `pairs with ${mate.name} on ${bankWhere[mate.id]}.`;
        } else if (fresh.length && soundsById[fresh[0]]) {
          score = 2 + (n ? 0 : 0.5);
          reason = `adds ${soundsById[fresh[0]].name} — nothing on this bank does yet.`;
        } else if (!n) {
          score = 1;
          reason = "you haven't used this one anywhere yet.";
        } else {
          score = 0.5;
          reason = `already on ${n}${n === 1 ? ' press' : ' presses'} — a familiar pick.`;
        }
        return { a, score: score - (bankActs[a.id] ? 1.5 : 0), reason };
      })
      .sort((x, y) => y.score - x.score)
      .slice(0, 3);

    const renderDevPills = () => html`
      <div class="dev-pills" style="margin-top:0">
        ${[null, ...st.rig].map((id) => {
          const dev = id ? HardwareRegistry.getDevice(id) : null;
          const on = (st.libDev || null) === id;
          const count = id
            ? st.actions.filter((a) => a.steps.some((x) => x.device === id))
                .length
            : st.actions.length;
          const label = `${dev ? dev.name : 'all pedals'} · ${count}`;
          const title = dev
            ? `only actions that touch ${dev.name}`
            : 'show every action';
          return html`
            <button
              class="dev-pill"
              title=${title}
              style=${on
                ? 'background:#16323d;color:#fdf3d4'
                : 'background:#fffbf0'}
              @click=${() => this.store.setLibDev(id)}
            >
              ${dev
                ? html`<span
                    style="width:10px;height:10px;flex:none;border-radius:3px;border:2px solid ${on
                      ? '#fdf3d4'
                      : '#16323d'};background:${dev.accent}"
                  ></span>`
                : null}
              <span>${label}</span>
            </button>
          `;
        })}
      </div>
    `;

    return html`
      <div class="head">
        <div class="head-row">
          <span class="head-title">capabilities</span>
          ${renderHintPopover(
            this.store,
            'lib',
            'left',
            'what are capabilities & actions?',
            'capabilities are the musical jobs in your rig. search by sound or open a capability — ready-made moves you can put on any switch.'
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
        <div
          style="display:flex;align-items:center;gap:6px;margin-top:10px;padding:3px 3px 3px 12px;border-radius:16px;border:2.5px solid #16323d;background:#fff"
        >
          <input
            .value=${st.soundQuery || ''}
            placeholder="what do you want to hear?"
            style="flex:1;min-width:0;padding:6px 0;border:0;background:transparent;font-family:inherit;font-size:13.5px;color:#16323d;outline:none"
            @input=${(e: Event) =>
              this.store.setSoundQuery((e.target as HTMLInputElement).value)}
          />
          ${searching
            ? html`
                <button
                  style="flex:none;padding:4px 9px;border-radius:12px;font-size:11.5px;font-weight:600;opacity:.6"
                  @click=${() => this.store.clearSoundSearch()}
                >
                  clear
                </button>
              `
            : null}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:8px">
          ${visibleTags.map((sd) => {
            const on = libPick.includes(sd.id);
            const heard = !on && heardSounds.includes(sd.id);
            return html`
              <button
                style="padding:4px 10px;border-radius:12px;font-size:11.5px;font-weight:600;border:2px solid #16323d;transition:background 150ms ease;${on
                  ? 'background:#16323d;color:#fdf3d4'
                  : heard
                    ? 'background:#f7c948;border-style:dashed'
                    : 'background:#fffbf0'}"
                @click=${() => this.store.toggleSoundTag(sd.id)}
              >
                ${sd.name}
              </button>
            `;
          })}
          <button
            style="padding:4px 10px;border-radius:12px;font-size:11.5px;font-weight:600;border:2px dashed rgba(22,50,61,.45)"
            @click=${() => {
              this.moreSoundTags = !this.moreSoundTags;
            }}
          >
            ${this.moreSoundTags ? 'fewer' : 'more sounds'}
          </button>
        </div>
      </div>

      <div class="list">
        ${searching
          ? html`
              <span
                style="font-family:'DM Mono',monospace;font-size:10.5px;opacity:.6;padding:0 2px"
              >
                ${allHits.length}
                ${allHits.length === 1
                  ? 'action sounds like that'
                  : 'actions sound like that'}
              </span>
              ${renderDevPills()}
              ${shownHits.map((x, xi) =>
                this.renderActionCard(
                  x.a,
                  this.store.capOf(x.a.caps[0]),
                  usageMap,
                  curActLabel,
                  slotName,
                  x.hits.map((sd) => sd.name),
                  xi === 0
                )
              )}
              ${allHits.length > limit
                ? html`
                    <button
                      class="dashed-btn"
                      style="align-self:center;margin-top:2px"
                      @click=${() => this.store.showMoreSounds()}
                    >
                      show 5 more (${allHits.length - limit} left)
                    </button>
                  `
                : null}
              ${allHits.length === 0
                ? html`
                    <span
                      style="font-size:12.5px;line-height:1.5;opacity:.6;padding:14px 6px;text-align:center;text-wrap:pretty"
                    >
                      nothing sounds like that yet. try another word, or clear to browse by capability.
                    </span>
                  `
                : null}
            `
          : !st.libBrowse
            ? html`
                <span style="font-size:13px;font-weight:600;padding:2px 2px 0">
                  for ${slotName}
                </span>
                ${suggest.map((g, gi) => {
                  const c = this.store.capOf(g.a.caps[0]);
                  const devs = [...new Set(g.a.steps.map((m) => m.device))];
                  const missing = this.store.missingFor(g.a);
                  return html`
                    <div
                      style="padding:10px 11px;border-radius:14px;border:2.5px solid #16323d;background:#fff;box-shadow:2px 2px 0 #16323d;display:flex;flex-direction:column;gap:5px"
                    >
                      <div style="display:flex;align-items:center;gap:8px">
                        <span
                          style="width:12px;height:12px;flex:none;border-radius:4px;border:2px solid #16323d;background:${c.colour}"
                        ></span>
                        <span
                          style="flex:1;min-width:0;font-size:13.5px;font-weight:600"
                          >${g.a.name}</span
                        >
                        <button
                          data-tour=${gi === 0 ? 't2' : ''}
                          title=${missing.length === devs.length
                            ? 'needs a pedal not in your rig'
                            : `put this action on ${slotName}`}
                          style="flex:none;padding:4px 11px;border-radius:12px;font-size:11.5px;font-weight:600;border:2px solid #16323d;background:${c.colour};box-shadow:2px 2px 0 #16323d${missing.length ===
                          devs.length
                            ? ';opacity:.35;pointer-events:none'
                            : ''}"
                          @click=${() => this.store.insertAction(g.a.id)}
                        >
                          + ${curActLabel}
                        </button>
                      </div>
                      <span
                        style="font-size:11.5px;line-height:1.4;opacity:.65;text-wrap:pretty"
                        >${g.reason}</span
                      >
                    </div>
                  `;
                })}
                ${suggest.length === 0
                  ? html`
                      <span
                        style="font-size:12.5px;line-height:1.5;opacity:.6;padding:6px 2px;text-wrap:pretty"
                      >
                        everything fits already. try a sound above.
                      </span>
                    `
                  : null}
                <button
                  style="align-self:flex-start;margin-top:4px;padding:6px 12px;border-radius:14px;border:2px dashed rgba(22,50,61,.45);font-size:12.5px;font-weight:600"
                  @click=${() => this.store.setLibBrowse(true)}
                >
                  browse all ${st.actions.length} actions
                </button>
              `
            : html`
                <div
                  style="display:flex;align-items:center;gap:8px;padding:2px 2px 0"
                >
                  <span style="flex:1;font-size:13px;font-weight:600"
                    >every action, by capability</span
                  >
                  <button
                    style="padding:4px 10px;border-radius:12px;font-size:11.5px;font-weight:600;opacity:.65"
                    @click=${() => this.store.setLibBrowse(false)}
                  >
                    back to suggestions
                  </button>
                </div>
                ${renderDevPills()}
                ${CAPS.filter(
                  (c) =>
                    !st.libDev ||
                    st.actions.some(
                      (a) =>
                        a.caps.includes(c.id) &&
                        a.steps.some((x) => x.device === st.libDev)
                    )
                ).map((c) => {
              const open = st.libDev
                ? st.capOpen[c.id] !== false
                : !!st.capOpen[c.id];
              const acts = st.actions.filter(
                (a) =>
                  a.caps.includes(c.id) &&
                  (!st.libDev || a.steps.some((x) => x.device === st.libDev))
              );
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
                  <div
                    style="display:flex;align-items:center;gap:8px;padding:10px 11px"
                  >
                    <button
                      style="flex:1;min-width:0;display:flex;align-items:center;gap:8px;padding:0;text-align:left"
                      @click=${() => this.store.toggleCapOpen(c.id)}
                    >
                      <span
                        style="width:14px;height:14px;border-radius:5px;background:${c.colour};border:2px solid #16323d;flex:none"
                      ></span>
                      <span style="font-size:14px;font-weight:600"
                        >${c.name}</span
                      >
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
                          <div
                            style="font-size:12px;line-height:1.45;opacity:.68"
                          >
                            ${c.blurb}
                          </div>
                          ${acts.map((a, ai) =>
                            this.renderActionCard(
                              a,
                              c,
                              usageMap,
                              curActLabel,
                              slotName,
                              undefined,
                              c.id === CAPS[0].id && ai === 0
                            )
                          )}
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
                                    @click=${() =>
                                      this.store.saveStackAsAction(c.id)}
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
          `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'capabilities-aside': CapabilitiesAside;
  }
}
