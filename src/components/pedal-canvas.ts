import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { tokens, resetAndButton } from '../styles/shared.js';
import { type Device, type DeviceControl } from '../data/devices.js';
import { HardwareRegistry } from '../data/registry.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import type { MacroStep } from '../state/types.js';

/** The WYSIWYG pedal face: a photo of the real pedal with invisible hotspots
 * mapped over its physical controls. Clicking a hotspot assigns (or opens a
 * value popover for) the control on the currently-selected switch/action. */
@customElement('pedal-canvas')
export class PedalCanvas extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    css`
      :host {
        display: flex;
        flex: 1;
        min-width: 0;
        min-height: 0;
      }
      .canvas {
        flex: 1;
        min-height: 0;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-x: hidden;
        overflow-y: hidden;
        padding: 10px 14px 14px;
      }
      :host([phone]) .canvas {
        align-items: flex-start;
        overflow-y: auto;
      }
      :host([desktop]) .canvas {
        padding: 0 26px 20px;
      }
      .stage {
        position: relative;
        flex: none;
        container-type: size;
        filter: drop-shadow(5px 5px 0 var(--ink));
      }
      :host([desktop]) .stage {
        filter: drop-shadow(6px 6px 0 var(--ink));
      }
      .deco {
        position: absolute;
        border: 2px solid var(--ink);
      }
      .enclosure {
        position: absolute;
        inset: 0;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
      }
      .brand {
        position: absolute;
        left: 50%;
        bottom: 2%;
        transform: translateX(-50%);
        font-size: clamp(13px, 6cqw, 20px);
        font-weight: 600;
        pointer-events: none;
      }
      .face-photo {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 14px;
        display: block;
      }
      .hotspot {
        padding: 0;
      }
      .badge {
        position: absolute;
        right: -9px;
        top: -9px;
        min-width: 23px;
        height: 23px;
        padding: 0 5px;
        border-radius: 12px;
        background: #fffbf0;
        border: 2.5px solid var(--ink);
        color: var(--ink);
        font-size: 11px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pc-preset-pill {
        position: absolute;
        top: 8px;
        right: 10px;
        z-index: 10;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 4px 8px;
        border-radius: 12px;
        background: #fffbf0;
        border: 2px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 700;
        color: var(--ink);
        cursor: pointer;
        transition: transform 120ms cubic-bezier(0.23, 1, 0.32, 1), background 150ms, box-shadow 150ms;
      }
      .pc-preset-pill:hover {
        background: var(--mustard);
      }
      .pc-preset-pill[active] {
        background: var(--mustard);
        box-shadow: 0 0 0 3px #f7c94866, 2px 2px 0 var(--ink);
      }
      .pc-pill-tag {
        padding: 1px 4px;
        border-radius: 6px;
        background: var(--ink);
        color: var(--paper);
        font-size: 9px;
      }
      .pc-pill-label {
        font-size: 10.5px;
        letter-spacing: -0.01em;
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
    const list = this.store.activeStack;

    const pcHits: number[] = [];
    list.forEach((s, i) => {
      if (s.device === device.id && s.control === 'pc') pcHits.push(i + 1);
    });
    const pcUsed = pcHits.length > 0;
    const isPcOpen = st.popoverControlId === 'pc';

    const stageStyle: Record<string, string> = {
      aspectRatio: drawn ? '344/426' : `${device.pw}/${device.ph}`,
      width: this.phone ? '100%' : 'auto',
      maxWidth: '100%',
      height: this.phone ? 'auto' : '100%',
    };
    if (this.desktop) {
      stageStyle.maxHeight = drawn ? '420px' : '600px';
    }

    return html`
      <div class="canvas">
        ${this.desktop
          ? html`
              <span class="deco" style="left:8%;top:14%;width:13px;height:13px;border-radius:50%;background:var(--sky)"></span>
              <span class="deco" style="left:13%;bottom:20%;width:20px;height:20px;border-radius:6px;background:var(--mustard);transform:rotate(14deg)"></span>
              <span class="deco" style="right:10%;top:22%;width:18px;height:18px;border-radius:6px;background:var(--coral);transform:rotate(-12deg)"></span>
              <span class="deco" style="right:7%;bottom:16%;width:12px;height:12px;border-radius:50%;background:var(--violet)"></span>
            `
          : null}
        <div class="stage" style=${styleMap(stageStyle)}>
          ${drawn
            ? html`
                <div class="enclosure" style="background:${device.body}"></div>
                <div class="brand" style="color:${device.ink}">${device.faceName}</div>
              `
            : html`<img class="face-photo" src=${device.photo} alt=${device.faceName} />`}
          <button
            class="pc-preset-pill"
            ?active=${isPcOpen || pcUsed}
            title="Recall preset (Program Change PC 0–127)"
            @click=${() => this.store.openPresetPopover(device.id)}
          >
            <span class="pc-pill-tag">PC</span>
            <span class="pc-pill-label">${pcUsed ? `PRESET ${list.find((s) => s.device === device.id && s.control === 'pc')?.value ?? 0}` : 'PRESET'}</span>
            ${pcUsed ? html`<span class="badge" style="position:static;min-width:18px;height:18px;font-size:10px">${pcHits.join(',')}</span>` : null}
          </button>
          ${device.controls.map((c) => this.renderControl(c, device, drawn, list, st.popoverControlId))}
        </div>
      </div>
    `;
  }

  private renderControl(
    control: DeviceControl,
    device: Device,
    drawn: boolean,
    list: MacroStep[],
    popoverControlId: string | null,
  ) {
    const hits: number[] = [];
    list.forEach((s, i) => {
      if (s.device === device.id && s.control === control.id) hits.push(i + 1);
    });
    const used = hits.length > 0;
    const isOpen = popoverControlId === control.id;
    const onPhoto = !drawn;
    const cx = onPhoto ? control.px : control.x;
    const cy = onPhoto ? control.py : control.y;

    const wrapStyle: Record<string, string> = {
      position: 'absolute',
      left: `${cx}%`,
      top: `${cy}%`,
      transform: 'translate(-50%,-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: String(isOpen ? 12 : 6),
    };
    if (onPhoto) {
      wrapStyle.width = `${control.ps}%`;
      wrapStyle.aspectRatio = '1';
    } else if (control.type === 'foot') {
      wrapStyle.width = '18%';
      wrapStyle.aspectRatio = '1';
    } else if (control.type === 'toggle') {
      wrapStyle.width = '9%';
      wrapStyle.height = '11%';
    } else {
      wrapStyle.width = '14%';
      wrapStyle.aspectRatio = '1';
    }
    if (this.phone) {
      wrapStyle.minWidth = '44px';
      wrapStyle.minHeight = '44px';
    }

    let faceStyle: Record<string, string>;
    if (onPhoto) {
      faceStyle = {
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: `2.5px ${isOpen || used ? 'solid' : 'dashed'} var(--ink)`,
        background: isOpen ? '#f7c948aa' : used ? '#f7c94855' : 'rgba(255,251,240,.28)',
        boxShadow: isOpen ? '0 0 0 4px #f7c94866' : 'none',
        transition: 'background 160ms ease, box-shadow 160ms cubic-bezier(.23,1,.32,1)',
      };
    } else if (control.type === 'toggle') {
      faceStyle = {
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: '7px',
        background: 'var(--ink)',
        border: '2.5px solid var(--ink)',
      };
    } else {
      faceStyle = {
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: '#fffbf0',
        border: '2.5px solid var(--ink)',
        boxShadow: isOpen ? '0 0 0 4px #f7c94866' : '2px 2px 0 var(--ink)',
        transition: 'box-shadow 160ms cubic-bezier(.23,1,.32,1)',
      };
    }

    const labelStyle: Record<string, string> = onPhoto
      ? {
          position: 'absolute',
          left: '50%',
          bottom: 'calc(100% + 6px)',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontSize: '11px',
          fontWeight: '600',
          padding: '2px 8px',
          borderRadius: '12px',
          background: 'var(--mustard)',
          border: '2px solid var(--ink)',
          color: 'var(--ink)',
          pointerEvents: 'none',
          opacity: isOpen || used ? '1' : '0',
        }
      : {
          position: 'absolute',
          left: '50%',
          [control.type === 'foot' ? 'bottom' : 'top']: control.type === 'foot' ? 'calc(100% + 6px)' : 'calc(100% + 5px)',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontSize: 'clamp(8px,3.2cqw,11px)',
          fontWeight: '500',
          color: 'var(--ink)',
          opacity: '.75',
          pointerEvents: 'none',
        };

    return html`
      <button
        class="hotspot"
        style=${styleMap(wrapStyle)}
        title=${control.label}
        @click=${() => this.store.clickControl(control)}
      >
        <span style=${styleMap(faceStyle)}></span>
        <span style=${styleMap(labelStyle)}>${control.short}</span>
        ${used ? html`<span class="badge">${hits.join(',')}</span>` : null}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pedal-canvas': PedalCanvas;
  }
}
