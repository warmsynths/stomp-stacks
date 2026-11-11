import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim, motionKeyframes } from '../styles/shared.js';
import { CONTROLLERS, CONTROLLER_ORDER } from '../data/controllers.js';
import { BRAINS, BRAIN_ORDER } from '../data/brains.js';
import { DEVICES, DEVICE_ORDER } from '../data/devices.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';

const SETUP_STEPS = [
  {
    title: "what's under your foot?",
    lead: 'pick the switches on the floor. switching controllers redraws the banks, so start here.',
  },
  {
    title: 'what fans the stack out?',
    lead: 'a foot switch only sends one message on its own. pick what holds the stack and fires the whole list when you stomp.',
  },
  {
    title: "what's in the loop?",
    lead: 'tick the pedals on your board. you can add or drop them from the tab bar any time.',
  },
];

@customElement('setup-wizard-modal')
export class SetupWizardModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    motionKeyframes,
    css`
      .setup-card:hover {
        box-shadow: 4px 4px 0 #16323d !important;
      }
      .btn-skip:hover {
        opacity: 1 !important;
      }
      .btn-back:hover {
        background: #f7f1e3 !important;
      }
      .btn-next:active {
        transform: translate(2px, 2px) !important;
        box-shadow: 1px 1px 0 #16323d !important;
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
    const step = st.setupStep;
    if (step === null) return null;

    const stepDef = SETUP_STEPS[step - 1] || SETUP_STEPS[0];
    const cardStyle = (on: boolean) =>
      `display:flex;align-items:center;gap:14px;padding:15px;border-radius:20px;border:2.5px solid #16323d;background:${
        on ? '#fdf3d4' : '#f7f1e3'
      };box-shadow:${
        on ? '4px 4px 0 #16323d' : 'none'
      };transition:background 160ms ease,box-shadow 160ms cubic-bezier(.23,1,.32,1)`;
    const markStyle = (on: boolean, bg: string) =>
      `flex:none;display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:13px;font-family:'DM Mono',monospace;font-size:12px;border:2.5px solid #16323d;background:${
        on ? bg : 'transparent'
      };${on ? '' : 'opacity:.5'}`;

    let setupCards: Array<{
      name: string;
      sub: string;
      meta: string;
      mark: string;
      style: string;
      markStyle: string;
      onClick: () => void;
    }> = [];

    if (step === 1) {
      setupCards = CONTROLLER_ORDER.map((id) => {
        const c = CONTROLLERS[id];
        const on = st.controllerId === id;
        return {
          name: c.name,
          sub: c.blurb || c.sub,
          meta: c.nav
            ? 'left + right switch · 128 presets'
            : `${c.keys.length} switches · ${c.banks} banks`,
          mark: c.nav ? 'L R' : String(c.keys.length),
          style: cardStyle(on),
          markStyle: markStyle(on, '#8fd0e6'),
          onClick: () => {
            if (!on) {
              this.store.switchController(id);
              if (c.isBrain) this.store.setBrain('scribble');
            }
          },
        };
      });
    } else if (step === 2) {
      setupCards = BRAIN_ORDER.map((id) => {
        const b = BRAINS[id];
        const on = st.brainId === id;
        return {
          name: b.full,
          mark: b.icon,
          sub:
            id === 'scribble' && st.controllerId === 'scribble'
              ? 'already under your foot — it stomps and fans out in one box'
              : b.sub,
          meta:
            b.maxSteps === 1
              ? '1 message per stomp'
              : `up to ${b.maxSteps} messages`,
          style: cardStyle(on),
          markStyle: markStyle(on, b.colour),
          onClick: () => this.store.setBrain(id),
        };
      });
    } else {
      setupCards = DEVICE_ORDER.map((id) => {
        const d = DEVICES[id];
        const on = st.rig.includes(id);
        return {
          name: d.name,
          sub: d.sub,
          mark: on ? '✓' : '+',
          meta: on ? `ch ${st.channels[id] || 1}` : 'not in the rig',
          style: cardStyle(on),
          markStyle: markStyle(on, d.accent),
          onClick: () => this.store.toggleRigPedal(id),
        };
      });
    }

    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS.chocolate;
    const brain = BRAINS[st.brainId] || BRAINS.scribble;
    const setupNote =
      step === 1
        ? 'switching controllers later redraws the banks, so start with the one under your foot.'
        : step === 2
          ? st.brainId === 'onboard' && !ctrl.onboard
            ? `${ctrl.name} can't hold stacks onboard — pick the relay or accept one message per stomp.`
            : st.controllerId === 'scribble'
              ? 'the scribble is already under your foot — it stomps and fans the stack out in the same box, 8 messages deep.'
              : `the brain sets the ceiling: ${brain.maxSteps} ${
                  brain.maxSteps === 1 ? 'message' : 'messages'
                } per stomp.`
          : `${st.rig.length} ${
              st.rig.length === 1 ? 'pedal in the rig' : 'pedals in the rig'
            } — you can add or drop them any time.`;

    return html`
      <div
        class="scrim"
        style="background:rgba(22,50,61,.62);z-index:96;padding:24px"
        @click=${(e: Event) =>
          e.target === e.currentTarget && this.store.finishSetup(true)}
      >
        <div
          class="sheet-in"
          style="width:720px;max-width:100%;max-height:92vh;display:flex;flex-direction:column;background:#fffbf0;border:2.5px solid #16323d;border-radius:28px;overflow:hidden;box-shadow:10px 10px 0 #16323d"
        >
          <div
            style="flex:none;display:flex;align-items:flex-start;gap:14px;padding:24px 26px 18px;border-bottom:2.5px solid #16323d;background:#fdf3d4"
          >
            <div style="flex:1;min-width:0">
              <div
                style="font-family:'DM Mono',monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;opacity:.5"
              >
                step ${step} of 3 · setting up the rig
              </div>
              <div
                style="font-size:22px;font-weight:600;letter-spacing:-.02em;margin-top:5px"
              >
                ${stepDef.title}
              </div>
              <div
                style="font-size:13px;line-height:1.5;opacity:.65;margin-top:5px;text-wrap:pretty"
              >
                ${stepDef.lead}
              </div>
            </div>
            <div
              style="flex:none;display:flex;align-items:center;gap:6px;padding-top:6px"
            >
              ${[1, 2, 3].map(
                (n) => html`
                  <span
                    style="width:9px;height:9px;border-radius:50%;border:2.5px solid #16323d;background:${n <=
                    step
                      ? '#16323d'
                      : 'transparent'}"
                  ></span>
                `
              )}
            </div>
          </div>

          <div
            style="flex:1;min-height:0;overflow:auto;padding:20px 26px 22px;display:flex;flex-direction:column;gap:11px"
          >
            ${setupCards.map(
              (c) => html`
                <button
                  class="setup-card"
                  style=${c.style}
                  @click=${c.onClick}
                >
                  <span style=${c.markStyle}>${c.mark}</span>
                  <span
                    style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;text-align:left"
                  >
                    <span style="display:flex;align-items:baseline;gap:8px">
                      <span
                        style="font-size:15.5px;font-weight:600;letter-spacing:-.015em"
                        >${c.name}</span
                      >
                      <span
                        style="font-family:'DM Mono',monospace;font-size:10.5px;opacity:.55"
                        >${c.meta}</span
                      >
                    </span>
                    <span
                      style="font-size:12.5px;line-height:1.45;opacity:.62;text-wrap:pretty"
                      >${c.sub}</span
                    >
                  </span>
                </button>
              `
            )}
            ${setupNote
              ? html`
                  <div
                    style="padding:13px 15px;border-radius:18px;border:2.5px dashed rgba(22,50,61,.32);font-size:12.5px;line-height:1.5;opacity:.7;text-wrap:pretty"
                  >
                    ${setupNote}
                  </div>
                `
              : null}
          </div>

          <div
            style="flex:none;display:flex;align-items:center;gap:10px;padding:16px 22px;border-top:2.5px solid #16323d"
          >
            <button
              class="btn-skip"
              style="padding:10px 14px;border-radius:20px;font-size:13px;opacity:.55"
              @click=${() => this.store.finishSetup(true)}
            >
              skip — i know my way round
            </button>
            <div style="flex:1"></div>
            ${step > 1
              ? html`
                  <button
                    class="btn-back"
                    style="padding:10px 16px;border-radius:20px;border:2.5px solid #16323d;font-size:13.5px"
                    @click=${() =>
                      this.store.setSetupStep((step - 1) as 1 | 2)}
                  >
                    back
                  </button>
                `
              : null}
            <button
              class="btn-next"
              style="padding:11px 22px;border-radius:22px;background:#f7c948;border:2.5px solid #16323d;box-shadow:3px 3px 0 #16323d;font-size:14.5px;font-weight:600;transition:transform 160ms cubic-bezier(.23,1,.32,1),box-shadow 160ms cubic-bezier(.23,1,.32,1)"
              @click=${() =>
                step < 3
                  ? this.store.setSetupStep((step + 1) as 2 | 3)
                  : this.store.finishSetup(false)}
            >
              ${step >= 3 ? 'start mapping' : 'continue'}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'setup-wizard-modal': SetupWizardModal;
  }
}
