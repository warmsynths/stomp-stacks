import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim, motionKeyframes } from '../styles/shared.js';
import { PALETTE, HEX, TEXTHEX, isDark } from '../data/naming.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import type { FaceMode } from '../state/types.js';

const FACE_TABS: Array<{ id: FaceMode; label: string }> = [
  { id: 'photo', label: 'photo' },
  { id: 'drawn', label: 'sketch' },
];

/** Settings behind the ⚙ — pedal-artwork toggle & device naming conventions preview. */
@customElement('settings-modal')
export class SettingsModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    motionKeyframes,
    css`
      .panel {
        width: 520px;
        max-width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        overflow: hidden;
        box-shadow: 8px 8px 0 var(--ink);
      }
      .head {
        flex: none;
        padding: 22px 24px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .head-title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .modal-body {
        flex: 1;
        min-height: 0;
        overflow: auto;
      }
      .section {
        padding: 20px 24px;
      }
      .group-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      .group-body {
        font-size: 12.5px;
        opacity: 0.6;
        margin-bottom: 12px;
        text-wrap: pretty;
      }
      .tabs {
        display: flex;
        gap: 8px;
      }
      .tab {
        flex: 1;
        padding: 11px 0;
        border-radius: 16px;
        font-size: 14px;
        font-weight: 600;
        border: 2.5px solid var(--ink);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .conventions-container {
        border: 2.5px solid var(--ink);
        border-radius: 20px;
        overflow: hidden;
      }
      .convention-row {
        display: flex;
        gap: 13px;
        padding: 14px;
      }
      .convention-meta {
        width: 106px;
        flex: none;
        padding-top: 2px;
      }
      .convention-label {
        font-size: 12.5px;
        font-weight: 600;
        line-height: 1.3;
        text-wrap: pretty;
      }
      .convention-cap {
        margin-top: 3px;
        font-family: var(--mono);
        font-size: 10px;
        line-height: 1.4;
        opacity: 0.5;
      }
      .convention-render-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1px;
        min-height: 46px;
        padding: 8px 12px;
        border-radius: 12px;
      }
      .convention-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .convention-secondary {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: var(--mono);
        font-size: 10.5px;
        opacity: 0.72;
      }
      .convention-note {
        margin-top: 7px;
        font-size: 11.5px;
        line-height: 1.4;
        opacity: 0.55;
        text-wrap: pretty;
      }
      .shared-row {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-top: 16px;
      }
      .shared-lbl {
        font-family: var(--mono);
        font-size: 10px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        opacity: 0.45;
        flex: none;
      }
      .swatches-wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
      .swatch-item {
        width: 22px;
        height: 22px;
        border-radius: 8px;
        border: 2px solid var(--ink);
      }
      .shared-note {
        margin-top: 9px;
        font-size: 11.5px;
        line-height: 1.45;
        opacity: 0.55;
        text-wrap: pretty;
      }
      .foot {
        flex: none;
        display: flex;
        justify-content: flex-end;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
      }
      .btn-done {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .btn-done:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
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
    if (!st.settingsOpen) return null;

    const idNow = this.store.ident(st.bank, st.selectedKey);
    const shared = this.store.sharedColors();
    const dimmed = PALETTE.map((p) => p[0]).filter((n) => shared.length > 0 && !shared.includes(n));
    const canName = this.store.displayTargets().length > 0 || shared.length > 0;
    const namingTargets = this.store.namingTargets();

    return html`
      <div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this.store.closeSettings()}>
        <div class="panel sheet-in">
          <div class="head"><div class="head-title">settings</div></div>
          <div class="modal-body">
            <div class="section">
              <div class="group-title">pedal artwork</div>
              <div class="group-body">photos of the real pedals, or clean sketches with every control labelled.</div>
              <div class="tabs">
                ${FACE_TABS.map(
                  (t) => html`
                    <button
                      class="tab"
                      style=${st.face === t.id ? 'background:var(--sky);box-shadow:2px 2px 0 var(--ink)' : 'background:transparent;opacity:.55'}
                      @click=${() => this.store.setFace(t.id)}
                    >
                      ${t.label}
                    </button>
                  `,
                )}
              </div>
            </div>

            ${canName
              ? html`
                  <div class="section" style="padding-top:4px;padding-bottom:22px">
                    <div class="group-title">device conventions</div>
                    <div class="group-body">you write it once, on the strip. here's what each part of the rig renders of it.</div>
                    <div class="conventions-container">
                      ${namingTargets.map((t, ti) => {
                        const sc = this.store.colorFor(t.id, idNow.color);
                        const bg = t.name === 0 ? '#f7f1e3' : sc ? HEX[sc] : '#16323d';
                        const ink = t.name === 0 ? '#16323d' : t.text ? TEXTHEX[idNow.textColor] : isDark(bg) ? '#f7f1e3' : '#16323d';
                        const caps: string[] = [];
                        if (t.name) caps.push(`${t.name} char${t.secondary ? ' × 2 lines' : ''}`);
                        else caps.push('no display');
                        if (t.colors === null) caps.push('any colour');
                        else if (t.colors.length) caps.push(`${t.colors.length} leds`);

                        const renderName = t.name ? idNow.name.slice(0, t.name) : idNow.name;
                        const hasSecondary = t.secondary > 0 && !!idNow.secondary;
                        const renderSecondary = idNow.secondary.slice(0, t.secondary);

                        return html`
                          <div
                            class="convention-row"
                            style="background:${ti % 2 ? 'var(--card)' : 'var(--paper)'};${ti ? 'border-top:2px solid var(--ink)' : ''}"
                          >
                            <div class="convention-meta">
                              <div class="convention-label">${t.label}</div>
                              <div class="convention-cap">${caps.join(' · ')}</div>
                            </div>
                            <div style="flex:1;min-width:0">
                              <div
                                class="convention-render-box"
                                style="background:${bg};color:${ink};border:2px ${t.name ? 'solid var(--ink)' : 'dashed rgba(22,50,61,.35)'}"
                              >
                                <span class="convention-name">${renderName || '—'}</span>
                                ${hasSecondary ? html`<span class="convention-secondary">${renderSecondary}</span>` : null}
                              </div>
                              <div class="convention-note">${t.note}</div>
                            </div>
                          </div>
                        `;
                      })}
                    </div>

                    ${shared.length > 0
                      ? html`
                          <div class="shared-row">
                            <span class="shared-lbl">shared</span>
                            <div class="swatches-wrap">
                              ${PALETTE.map(([cName, hex]) => {
                                const allowed = shared.includes(cName);
                                return html`
                                  <span
                                    class="swatch-item"
                                    title=${allowed ? cName : `${cName} — out of range for this rig`}
                                    style="background:${hex};${allowed ? '' : 'opacity:.18'}"
                                  ></span>
                                `;
                              })}
                            </div>
                          </div>
                          <div class="shared-note">
                            ${dimmed.length
                              ? `the picker only offers these. ${dimmed.join(', ')} ${
                                  dimmed.length === 1 ? 'is' : 'are'
                                } out of range — a colour already set stays put and gets flagged rather than snapping.`
                              : 'every device in the rig can light every colour in the picker.'}
                          </div>
                        `
                      : null}
                  </div>
                `
              : null}
          </div>
          <div class="foot"><button class="btn-done" @click=${() => this.store.closeSettings()}>done</button></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-modal': SettingsModal;
  }
}
