import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim, motionKeyframes } from '../styles/shared.js';
import { PEDAL_RAMP_KNOBS, setupsCompatible, type PedalSetup, type SetupDeviceId } from '../data/setups.js';
import { HardwareRegistry } from '../data/registry.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

@customElement('conflict-modal')
export class ConflictModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    motionKeyframes,
    css`
      .cancel-btn:hover {
        opacity: 1 !important;
      }
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  private movesFor(s?: PedalSetup | null): string {
    if (!s) return '';
    const dev = (s.device || 'mood') as SetupDeviceId;
    const knobs = PEDAL_RAMP_KNOBS[dev] || PEDAL_RAMP_KNOBS.mood;
    return knobs
      .filter((m) => s.move[m[0]])
      .map((m) => m[1])
      .join(' + ');
  }

  private loseFor(s?: PedalSetup | null): string {
    if (!s) return '';
    const m = this.movesFor(s);
    if (!m) return 'its dip set-up is lost';
    return `${m}${s.bounce ? " won't wiggle" : " won't glide"}`;
  }

  render() {
    const cf = this.store.state.conflict;
    if (!cf) return null;

    const A = this.store.findSet(cf.oldSet);
    const B = this.store.findSet(cf.newSet);
    const act = this.store.actionById(cf.act) || { name: '' };
    const dev = HardwareRegistry.getDevice(cf.device);
    const devName = dev ? dev.name : cf.device;
    const ok = setupsCompatible(A, B);

    const optStyle = (on: boolean, dis: boolean) =>
      `display:flex;flex-direction:column;align-items:flex-start;gap:3px;width:100%;padding:12px 14px;border-radius:16px;text-align:left;border:2.5px solid #16323d;background:${
        on ? '#fdf3d4' : '#fffbf0'
      };box-shadow:${dis ? 'none' : '3px 3px 0 #16323d'}${
        dis ? ';opacity:.45;cursor:default' : ''
      }`;

    const cfTitle = `${devName} can only load one preset per press`;
    const cfSub = `“${cf.oldName}” already loads “${
      A ? A.name : 'a preset'
    }”. “${act.name}” wants to load “${
      B ? B.name : 'another'
    }”. whichever loads last wins — knobs and dips.`;

    const mergeSub = ok
      ? `“${A?.name || ''} + ${B?.name || ''}” moves ${[
          this.movesFor(A),
          this.movesFor(B),
        ]
          .filter(Boolean)
          .join(' + ')}. needs saving to ${devName} once.`
      : `can't: ${
          A && B && !!A.bounce !== !!B.bounce
            ? 'one bounces, the other glides.'
            : 'sweep or shape differs.'
        }`;

    const opts = [
      {
        how: 'merge' as const,
        title: 'merge into one preset',
        sub: mergeSub,
        on: true,
        dis: !ok,
      },
      {
        how: 'useNew' as const,
        title: `use “${B ? B.name : 'the new one'}”`,
        sub: `“${cf.oldName}” keeps its other messages, but ${this.loseFor(A)}.`,
        on: false,
        dis: false,
      },
      {
        how: 'keepOld' as const,
        title: `keep “${A ? A.name : 'the current one'}”`,
        sub: `“${act.name}” goes in without its preset load, so ${this.loseFor(B)}.`,
        on: false,
        dis: false,
      },
    ];

    return html`
      <div
        class="scrim"
        style="z-index:85"
        @click=${(e: Event) =>
          e.target === e.currentTarget && this.store.closeConflict()}
      >
        <div
          class="sheet-in"
          style="width:460px;max-width:100%;max-height:90vh;overflow:auto;background:#fffbf0;border:2.5px solid #16323d;border-radius:26px;box-shadow:8px 8px 0 #16323d"
        >
          <div
            style="padding:20px 22px 16px;border-bottom:2.5px solid #16323d;background:#f7c948"
          >
            <div
              style="font-size:18px;font-weight:600;letter-spacing:-.02em;text-wrap:pretty"
            >
              ${cfTitle}
            </div>
            <div
              style="font-size:12.5px;line-height:1.45;margin-top:6px;text-wrap:pretty"
            >
              ${cfSub}
            </div>
          </div>
          <div
            style="padding:16px 22px;display:flex;flex-direction:column;gap:10px"
          >
            ${opts.map(
              (o) => html`
                <button
                  style=${optStyle(o.on, o.dis)}
                  @click=${() => !o.dis && this.store.insertAction(cf.act, o.how)}
                >
                  <span style="font-size:14px;font-weight:600">${o.title}</span>
                  <span
                    style="font-size:12px;line-height:1.4;opacity:.7;text-wrap:pretty"
                    >${o.sub}</span
                  >
                </button>
              `
            )}
          </div>
          <div style="display:flex;justify-content:flex-end;padding:0 22px 18px">
            <button
              class="cancel-btn"
              style="padding:7px 14px;border-radius:12px;font-size:12.5px;font-weight:600;opacity:.65"
              @click=${() => this.store.closeConflict()}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'conflict-modal': ConflictModal;
  }
}
