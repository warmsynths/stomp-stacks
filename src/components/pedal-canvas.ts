import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, motionKeyframes } from '../styles/shared.js';
import { type Device, type DeviceControl } from '../data/devices.js';
import { HardwareRegistry } from '../data/registry.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import type { MacroStep } from '../state/types.js';

@customElement('pedal-canvas')
export class PedalCanvas extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    motionKeyframes,
    css`
      :host {
        display: flex;
        flex: 1;
        min-width: 0;
        min-height: 0;
      }
      .face-hover:hover {
        background: #f7c94866 !important;
      }
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  @property({ type: Boolean, reflect: true }) phone = false;
  @property({ type: Boolean, reflect: true }) desktop = false;

  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  render() {
    const st = this.store.state;
    const device = HardwareRegistry.getDevice(st.browseDevice)!;
    const drawn = st.face === 'drawn';
    const build = st.mode === 'build' && !!st.actEdit;
    const ea = build && st.actEdit ? this.store.actionById(st.actEdit) : null;
    const faceList = build ? (ea ? ea.steps : []) : this.store.activeStack;

    const primaryControls = device.controls.filter((c) => !c.sub);

    const canvasStyle = `${
      this.phone ? 'flex:none' : 'flex:1;min-height:0'
    };width:100%;display:flex;align-items:${
      this.phone ? 'flex-start' : 'center'
    };justify-content:center;overflow:${
      this.phone ? 'visible' : 'hidden'
    };padding:${this.desktop ? '0 26px 20px' : '8px 14px 14px'}`;

    const stageStyle = `position:relative;flex:none;container-type:size;filter:drop-shadow(5px 5px 0 #16323d);aspect-ratio:${
      drawn ? '344/426' : `${device.pw}/${device.ph}`
    };${
      this.phone
        ? `width:min(100%,${drawn ? 250 : 260}px);margin:0 auto;height:auto`
        : `height:100%;width:auto;max-width:100%;max-height:${
            drawn ? '420px' : '600px'
          }`
    }`;

    return html`
      <div style=${canvasStyle}>
        <div style=${stageStyle}>
          ${!drawn
            ? html`
                <div style="position:absolute;inset:0">
                  <img
                    src=${device.photo}
                    alt=${device.faceName}
                    style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:14px;display:block"
                  />
                </div>
              `
            : html`
                <div
                  style="position:absolute;inset:0;border-radius:20px;background:${device.body};border:2.5px solid #16323d"
                ></div>
                <div
                  style="position:absolute;left:50%;bottom:2%;transform:translateX(-50%);font-size:clamp(13px,6cqw,20px);font-weight:600;color:${device.ink};pointer-events:none"
                >
                  ${device.faceName}
                </div>
              `}
          ${primaryControls.map((c) =>
            this.renderControl(c, device, drawn, faceList, build, ea)
          )}
        </div>
      </div>
    `;
  }

  private renderControl(
    c: DeviceControl,
    dev: Device,
    drawn: boolean,
    faceList: MacroStep[],
    build: boolean,
    ea: ReturnType<StompStore['actionById']> | null
  ) {
    const st = this.store.state;
    const peekHit =
      st.peek !== null &&
      st.peek.device === dev.id &&
      st.peek.control === c.id;
    const peekHere = st.peek !== null && st.peek.device === dev.id;

    let lensHasControl = false;
    if (st.lens) {
      lensHasControl = st.actions.some(
        (a) =>
          a.caps.includes(st.lens!) &&
          a.steps.some((x) => x.device === dev.id && x.control === c.id)
      );
    }
    const lensHit = (!!st.lens && lensHasControl) || peekHit;
    const lensDim = (!!st.lens && !lensHasControl) || (peekHere && !peekHit);

    const hits: number[] = [];
    faceList.forEach((s, i) => {
      if (s.device === dev.id && s.control === c.id) hits.push(i + 1);
    });
    const used = hits.length > 0;
    const isOpen = st.popoverControlId === c.id;
    const eaWi = ea ? this.store.wiggleInfo(ea.steps) : null;
    const moves =
      build &&
      !!eaWi &&
      eaWi.device === dev.id &&
      !!eaWi.set.move[c.id];
    const isLit = !!(
      st.lit &&
      st.lit.device === dev.id &&
      st.lit.control === c.id
    );

    const onPhoto = !drawn && c.px != null;
    const cx = onPhoto ? c.px : c.x;
    const cy = onPhoto ? c.py : c.y;
    const box = onPhoto
      ? `width:${c.ps}%;aspect-ratio:1`
      : c.type === 'foot'
        ? 'width:18%;aspect-ratio:1'
        : c.type === 'toggle'
          ? 'width:9%;height:11%'
          : 'width:14%;aspect-ratio:1';
    const obvious = !c.values && !c.sub;

    let kv: number | null = null;
    if (c.type === 'knob') {
      faceList.forEach((s) => {
        if (
          s.device === dev.id &&
          s.control === c.id &&
          s.value != null &&
          !isNaN(Number(s.value))
        ) {
          kv = Number(s.value);
        }
      });
    }
    if (
      c.type === 'knob' &&
      st.drag &&
      st.drag.device === dev.id &&
      st.drag.control === c.id
    ) {
      kv = st.drag.value;
    }

    let wig: {
      lo: number;
      hi: number;
      from: number;
      to: number;
      bounce: boolean;
      dur: string;
    } | null = null;
    if (c.type === 'knob') {
      let pcAt = -1;
      faceList.forEach((s, i) => {
        if (s.device === dev.id && s.control === 'pc') pcAt = i;
      });
      const set = pcAt >= 0 ? this.store.findSet(faceList[pcAt].set) : null;
      if (set && set.move && set.move[c.id]) {
        let v = 64;
        faceList.forEach((s, i) => {
          if (
            i > pcAt &&
            s.device === dev.id &&
            s.control === c.id &&
            s.value != null &&
            !isNaN(Number(s.value))
          ) {
            v = Number(s.value);
          }
        });
        let sp = 64;
        faceList.forEach((s) => {
          if (
            s.device === dev.id &&
            (s.control === 'mix' || s.control === 'volume') &&
            s.value != null &&
            !isNaN(Number(s.value))
          ) {
            sp = Number(s.value);
          }
        });
        const lo = set.sweep === 'top' ? v : 0;
        const hi = set.sweep === 'top' ? 127 : v;
        const up = set.bounce || !(set.fall && set.fall[c.id]);
        wig = {
          lo,
          hi,
          from: up ? lo : hi,
          to: up ? hi : lo,
          bounce: !!set.bounce,
          dur: (3.2 - (2.6 * sp) / 127).toFixed(2),
        };
        kv = wig.from;
      }
    }

    const A = (x: number) => -135 + (270 * Math.max(0, Math.min(127, x))) / 127;
    const hasKv = kv != null;
    const ang = hasKv ? A(kv!) : 0;

    let face = '';
    if (onPhoto) {
      face = `display:block;width:100%;height:100%;border-radius:50%;border:2.5px ${
        isOpen || used ? 'solid' : 'dashed'
      } #16323d;background:${
        isOpen
          ? '#f7c948aa'
          : used
            ? '#f7c94855'
            : 'rgba(255,251,240,.28)'
      };box-shadow:${
        isOpen ? '0 0 0 4px #f7c94866' : 'none'
      };transition:background 160ms ease,box-shadow 160ms cubic-bezier(.23,1,.32,1)`;
    } else if (c.type === 'toggle') {
      face =
        'display:block;width:100%;height:100%;border-radius:7px;background:#16323d;border:2.5px solid #16323d';
    } else {
      face = `display:block;width:100%;height:100%;border-radius:50%;background:#fffbf0;border:2.5px solid #16323d;box-shadow:${
        isOpen ? '0 0 0 4px #f7c94866' : '2px 2px 0 #16323d'
      };transition:box-shadow 160ms cubic-bezier(.23,1,.32,1)`;
    }

    const lensColor = st.lens ? this.store.capOf(st.lens)?.colour : null;
    const faceStyle =
      face +
      (hasKv && onPhoto ? ';position:relative;background:transparent' : '') +
      (isLit ? ';animation:ring 480ms cubic-bezier(.23,1,.32,1)' : '') +
      (peekHit
        ? ';background:#f7c948;box-shadow:0 0 0 5px #f7c948,0 0 0 8px #16323d'
        : lensHit && lensColor
          ? `;box-shadow:0 0 0 5px ${lensColor}`
          : '');

    const wrapStyle = `position:absolute;left:${cx}%;top:${cy}%;${box};transform:translate(-50%,-50%);padding:0;display:flex;align-items:center;justify-content:center;${
      this.phone ? 'min-width:44px;min-height:44px;' : ''
    }z-index:${isOpen ? 12 : isLit ? 11 : 6}${
      lensDim ? ';opacity:.28' : ''
    };transition:opacity 200ms ease`;

    const arcStyle = hasKv
      ? `position:absolute;inset:-6px;border-radius:50%;pointer-events:none;background:${
          wig
            ? `conic-gradient(from -135deg,rgba(255,251,240,.55) 0deg ${
                A(wig.lo) + 135
              }deg,#8fd0e6 ${A(wig.lo) + 135}deg ${
                A(wig.hi) + 135
              }deg,rgba(255,251,240,.55) ${
                A(wig.hi) + 135
              }deg 270deg,transparent 270deg)`
            : `conic-gradient(from -135deg,#f7c948 0deg ${
                ang + 135
              }deg,rgba(255,251,240,.55) ${
                ang + 135
              }deg 270deg,transparent 270deg)`
        };-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 3.5px));mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 3.5px))`
      : 'display:none';

    const tickStyle = !hasKv
      ? 'display:none'
      : wig
        ? `position:absolute;inset:0;pointer-events:none;--a0:${A(
            wig.from
          )}deg;--a1:${A(wig.to)}deg;transform:rotate(${A(
            wig.from
          )}deg);animation:${
            wig.bounce
              ? `kwig ${wig.dur}s ease-in-out infinite alternate`
              : `kglide ${wig.dur}s cubic-bezier(.23,1,.32,1) infinite`
          }`
        : `position:absolute;inset:0;pointer-events:none;transform:rotate(${ang}deg);transition:transform 380ms cubic-bezier(.23,1,.32,1)`;

    const labelStyle = onPhoto
      ? `position:absolute;left:50%;bottom:calc(100% + 6px);transform:translateX(-50%);white-space:nowrap;font-size:11px;font-weight:600;padding:2px 8px;border-radius:12px;background:#f7c948;border:2px solid #16323d;color:#16323d;pointer-events:none;opacity:${
          isOpen || (used && !obvious) ? '1' : '0'
        }`
      : `position:absolute;left:50%;${
          c.type === 'foot'
            ? 'bottom:calc(100% + 6px);'
            : 'top:calc(100% + 5px);'
        }transform:translateX(-50%);white-space:nowrap;font-size:clamp(8px,3.2cqw,11px);font-weight:500;color:#16323d;opacity:.75;pointer-events:none`;

    const showBadge = used || moves;
    const badgeText = hits.join(',') + (moves ? (used ? ' ~' : '~') : '');
    const badgeStyle =
      'position:absolute;right:-9px;top:-9px;min-width:23px;height:23px;padding:0 5px;border-radius:12px;background:#fffbf0;border:2.5px solid #16323d;color:#16323d;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center';

    return html`
      <button
        title=${c.label}
        style=${wrapStyle}
        @click=${() => this.store.clickControl(c)}
      >
        <span class="face-hover" style=${faceStyle}></span>
        <span style=${arcStyle}></span>
        <span style=${tickStyle}>
          <span
            style="position:absolute;left:50%;top:6%;width:3px;height:44%;transform:translateX(-50%);border-radius:2px;background:#16323d"
          ></span>
          <span
            style="position:absolute;left:50%;top:50%;width:9px;height:9px;transform:translate(-50%,-50%);border-radius:50%;background:#16323d"
          ></span>
          <span
            style="position:absolute;left:50%;top:2%;width:9px;height:9px;transform:translateX(-50%);border-radius:50%;background:#f7c948;box-shadow:0 0 0 2px #16323d"
          ></span>
        </span>
        <span style=${labelStyle}>${c.short}</span>
        ${showBadge ? html`<span style=${badgeStyle}>${badgeText}</span>` : null}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pedal-canvas': PedalCanvas;
  }
}
