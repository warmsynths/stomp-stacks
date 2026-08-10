import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim, motionKeyframes } from '../styles/shared.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import { DEVICES } from '../data/devices.js';
import type { MacroStep } from '../state/types.js';


function stepsLabel(list: MacroStep[]): string {
  if (!list || !list.length) return 'empty (no MIDI messages assigned)';
  return list
    .map((s) => {
      const d = DEVICES[s.device];
      const c = d?.controls.find((x) => x.id === s.control);
      return `${d ? d.name : s.device} ${c ? c.short || c.label : s.control}${s.value !== null ? ` (${s.value})` : ''}`;
    })
    .join(' → ');
}

@customElement('read-modal')
export class ReadModal extends LitElement {
  static styles = [
    tokens,
    resetAndButton,
    modalScrim,
    motionKeyframes,
    css`
      .panel {
        width: 740px;
        max-width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        box-shadow: 8px 8px 0 var(--ink);
        overflow: hidden;
      }
      .head {
        flex: none;
        padding: 20px 24px 14px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .meta {
        font-size: 12.5px;
        opacity: 0.65;
        margin-top: 4px;
        text-wrap: pretty;
      }
      .body {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 16px 24px 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .top-bar {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        padding-bottom: 4px;
      }
      .btn-file {
        padding: 8px 16px;
        border-radius: 16px;
        background: var(--sky);
        border: 2.5px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-size: 12.5px;
        font-weight: 600;
        transition: transform 150ms ease;
      }
      .btn-file:active {
        transform: translate(2px, 2px);
      }
      .btn-select-all {
        padding: 7px 12px;
        border-radius: 12px;
        border: 2px solid var(--ink);
        font-size: 11.5px;
        font-weight: 600;
        background: var(--paper);
      }
      .selection-count {
        font-family: var(--mono);
        font-size: 11.5px;
        opacity: 0.6;
        margin-left: auto;
      }
      .preset-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .preset-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 18px;
        border: 2.5px solid var(--ink);
        background: var(--paper);
        cursor: pointer;
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .preset-row[selected] {
        background: var(--card);
        box-shadow: 3px 3px 0 var(--ink);
      }
      .preset-checkbox {
        width: 20px;
        height: 20px;
        border-radius: 6px;
        border: 2.5px solid var(--ink);
        accent-color: var(--ink);
        cursor: pointer;
        flex: none;
      }
      .preset-tag {
        font-family: var(--mono);
        font-size: 10px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 8px;
        background: var(--ink);
        color: var(--panel-warm);
        flex: none;
      }
      .preset-info {
        flex: 1;
        min-width: 0;
      }
      .preset-title {
        font-size: 14px;
        font-weight: 600;
      }
      .preset-sub {
        font-size: 11.5px;
        opacity: 0.55;
        margin-top: 1px;
      }
      .preset-steps {
        font-family: var(--mono);
        font-size: 11px;
        opacity: 0.8;
        margin-top: 4px;
        word-break: break-word;
      }
      .foot {
        flex: none;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 20px;
        border-top: 2.5px solid var(--ink);
        background: var(--card);
      }
      .spacer {
        flex: 1;
      }
      .btn-cancel {
        padding: 10px 16px;
        border-radius: 20px;
        font-size: 13.5px;
        opacity: 0.6;
        transition: opacity 150ms ease;
      }
      .btn-cancel:hover {
        opacity: 1;
      }
      .btn-load-selected {
        padding: 10px 22px;
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
      .btn-load-selected:active {
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

  private handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target?.result as string);
        this.store.loadScribbleFile(json);
      } catch (err) {
        alert('Could not parse JSON configuration file. Please check file format.');
      }
    };
    reader.readAsText(file);
  }

  private triggerFileInput() {
    const el = this.shadowRoot?.querySelector<HTMLInputElement>('#read-file-input');
    if (el) el.click();
  }

  render() {
    const st = this.store.state;
    if (!st.readOpen || !st.readData) return null;

    const { from, allPresets } = st.readData;
    const deviceName = from === 'scribble' ? 'Scribble' : from.toUpperCase();
    const selectedPresets = allPresets.filter((p) => p.selected);

    return html`
      <div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this.store.cancelRead()}>
        <input
          type="file"
          id="read-file-input"
          accept=".json"
          style="display:none"
          @change=${(e: Event) => this.handleFileSelect(e)}
        />
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">read config from ${deviceName}</div>
            <div class="meta">
              Select which presets from your device to load into Stomp Stacks.
            </div>
          </div>
          <div class="body">
            <div class="top-bar">
              <button class="btn-file" @click=${() => this.triggerFileInput()}>
                📂 load scribble.json file
              </button>
              <button class="btn-select-all" @click=${() => this.store.selectAllReadPresets(true)}>
                ✓ select all
              </button>
              <button class="btn-select-all" @click=${() => this.store.selectAllReadPresets(false)}>
                deselect all
              </button>
              <span class="selection-count">
                ${selectedPresets.length} of ${allPresets.length} selected
              </span>
            </div>

            ${st.readData.readingHardware
              ? html`
                  <div style="padding:28px 24px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:12px; border:2.5px solid var(--ink); border-radius:22px; background:#e8f4fa;">
                    <div style="font-size:16px; font-weight:600; color:var(--ink);">
                      📡 Reading active presets directly from physical Scribble device...
                    </div>
                    <div style="font-size:12.5px; opacity:0.75;">
                      Communicating over USB CDC & Web MIDI SysEx...
                    </div>
                  </div>
                `
              : allPresets.length === 0
              ? html`
                  <div style="padding:32px 24px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:16px; border:2.5px dashed rgba(22,50,61,.25); border-radius:22px; background:var(--paper);">
                    <div style="font-size:16.5px; font-weight:600; color:var(--ink);">Load Device Presets</div>
                    <div style="font-size:13px; opacity:0.75; max-width:460px; line-height:1.5;">
                      Choose how to load active presets from your Pirate MIDI Scribble device:
                    </div>
                    <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap; justify-content:center; margin-top:4px;">
                      <button class="btn-file" style="padding:10px 20px; font-size:13.5px; background:var(--sky);" @click=${() => this.store.readLiveUsbSerial()}>
                        📡 Read Live from USB Device
                      </button>
                      <button class="btn-file" style="padding:10px 20px; font-size:13.5px; background:var(--mustard);" @click=${() => this.triggerFileInput()}>
                        📂 Load scribble.json file
                      </button>
                    </div>
                  </div>
                `
              : html`


                  <div class="preset-list">
                    ${allPresets.map(
                      (p) => html`
                        <div
                          class="preset-row"
                          ?selected=${p.selected}
                          @click=${() => this.store.togglePresetSelection(p.id)}
                        >
                          <input
                            type="checkbox"
                            class="preset-checkbox"
                            .checked=${p.selected}
                            @click=${(e: Event) => e.stopPropagation()}
                            @change=${() => this.store.togglePresetSelection(p.id)}
                          />
                          <span class="preset-tag">Preset ${p.bankIndex * 4 + (p.key === 'A' ? 1 : p.key === 'B' ? 2 : p.key === 'C' ? 3 : 4)} · ${p.key}</span>
                          <div class="preset-info">
                            <div class="preset-title">${p.presetName}</div>
                            ${p.secondaryText ? html`<div class="preset-sub">${p.secondaryText}</div>` : null}
                            <div class="preset-steps">${stepsLabel(p.steps)}</div>
                          </div>
                        </div>
                      `,
                    )}
                  </div>
                `}

          </div>
          <div class="foot">
            <button class="btn-cancel" @click=${() => this.store.cancelRead()}>cancel</button>
            <span class="spacer"></span>
            <button
              class="btn-load-selected"
              ?disabled=${selectedPresets.length === 0}
              @click=${() => this.store.importSelectedDevicePresets()}
            >
              load ${selectedPresets.length} selected ${selectedPresets.length === 1 ? 'preset' : 'presets'} into app
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'read-modal': ReadModal;
  }
}
