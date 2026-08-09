import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { tokens, resetAndButton } from '../styles/shared.js';
import { DEVICES, type Device, type DeviceControl } from '../data/devices.js';
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
      .stage {
        position: relative;
        flex: none;
        container-type: size;
        filter: drop-shadow(5px 5px 0 var(--ink));
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
    `,
  ];

  @property({ attribute: false }) store!: StompStore;
  @property({ type: Boolean, reflect: true }) phone = false;

  private storeController!: StoreController;

  connectedCallback() {
    super.connectedCallback();
    this.storeController ??= new StoreController(this, this.store);
  }

  render() {
    const st = this.store.state;
    const device = DEVICES[st.browseDevice];
    const drawn = st.face === 'drawn';
    const list = this.store.activeStack;

    const stageStyle = {
      aspectRatio: drawn ? '344/426' : `${device.pw}/${device.ph}`,
      width: this.phone ? '100%' : 'auto',
      maxWidth: '100%',
      height: this.phone ? 'auto' : '100%',
    };

    return html`
      <div class="canvas">
        <div class="stage" style=${styleMap(stageStyle)}>
          ${drawn
            ? html`
                <div class="enclosure" style="background:${device.body}"></div>
                <div class="brand" style="color:${device.ink}">${device.faceName}</div>
              `
            : html`<img class="face-photo" src=${device.photo} alt=${device.faceName} />`}
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
