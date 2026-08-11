import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens, resetAndButton, modalScrim, motionKeyframes } from '../styles/shared.js';
import type { StompStore } from '../state/store.js';
import { StoreController } from '../state/store-controller.js';
import { DEVICES } from '../data/devices.js';
import { CONTROLLERS, ACTIONS } from '../data/controllers.js';
import { HEX, isDark } from '../data/naming.js';
import type { MacroStep } from '../state/types.js';

function stepsLabel(list: MacroStep[]): string {
  if (!list || !list.length) return 'empty';
  return list
    .map((s) => {
      const d = DEVICES[s.device];
      const c = d?.controls.find((x) => x.id === s.control);
      return `${d ? d.name : s.device} ${c ? c.short || c.label : s.control}`;
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
        width: 660px;
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
        padding: 22px 24px 16px;
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
      .filter-input {
        width: 100%;
        padding: 9px 13px;
        border-radius: 16px;
        border: 2.5px solid var(--ink);
        background: var(--card);
        font-family: var(--mono);
        font-size: 11.5px;
        color: var(--ink);
        outline: none;
      }
      .preset-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .preset-slot-row {
        padding: 12px 13px;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
        background: var(--paper);
        transition:
          background 160ms ease,
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .preset-slot-row[assigned] {
        background: var(--panel-warm);
        box-shadow: 3px 3px 0 var(--ink);
      }
      .preset-top {
        display: flex;
        align-items: center;
        gap: 11px;
      }
      .num-tag {
        flex: none;
        font-family: var(--mono);
        font-size: 10px;
        padding: 4px 8px;
        border-radius: 10px;
        border: 2px solid var(--ink);
      }
      .preset-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .preset-title {
        font-size: 13.5px;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .preset-steps {
        font-family: var(--mono);
        font-size: 10.5px;
        opacity: 0.6;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dest-select {
        flex: none;
        max-width: 190px;
        padding: 7px 10px;
        border-radius: 14px;
        border: 2.5px solid var(--ink);
        background: var(--card);
        font-family: inherit;
        font-size: 12px;
        font-weight: 500;
        color: var(--ink);
        outline: none;
        cursor: pointer;
      }
      .dest-select[assigned] {
        background: var(--sky);
      }
      .assigned-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 11px;
        padding-top: 10px;
        border-top: 2px dashed rgba(22, 50, 61, 0.28);
      }
      .dest-note {
        flex: 1;
        min-width: 0;
        font-size: 11.5px;
        opacity: 0.65;
        text-wrap: pretty;
      }
      .btn-mode {
        padding: 5px 11px;
        border-radius: 13px;
        font-size: 11.5px;
        font-weight: 500;
        border: 2.5px solid var(--ink);
        background: transparent;
        opacity: 0.55;
      }
      .btn-mode[active] {
        background: var(--mustard);
        opacity: 1;
      }
      .empty-note {
        padding: 18px;
        border-radius: 20px;
        border: 2.5px dashed rgba(22, 50, 61, 0.3);
        font-size: 13px;
        line-height: 1.5;
        opacity: 0.7;
        text-wrap: pretty;
      }
      .loader-card {
        padding: 20px;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
        background: var(--paper);
        display: flex;
        flex-direction: column;
        gap: 11px;
      }
      .loader-top {
        display: flex;
        align-items: baseline;
        gap: 9px;
      }
      .scan-label {
        font-family: var(--mono);
        font-size: 13px;
        font-weight: 500;
      }
      .scan-sub {
        flex: 1;
        font-size: 12px;
        opacity: 0.6;
        text-align: right;
        text-wrap: pretty;
      }
      .scan-bar {
        height: 12px;
        border-radius: 8px;
        border: 2.5px solid var(--ink);
        background: var(--card);
        overflow: hidden;
      }
      .scan-fill {
        height: 100%;
        background: #8fd0e6;
        border-right: 2.5px solid var(--ink);
        transition: width 140ms linear;
      }
      .loader-status {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        opacity: 0.6;
      }
      .loader-dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--mustard);
        border: 2px solid var(--ink);
        animation: breathe 1.2s ease-in-out infinite;
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
      .footer-info {
        font-family: var(--mono);
        font-size: 11px;
        opacity: 0.5;
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
      .btn-apply {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--sky);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .btn-apply:active {
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

  render() {
    const st = this.store.state;
    if (!st.readOpen || !st.readData) return null;

    const read = st.readData;
    const busy = !!read.readingHardware;
    const deviceName = read.from === 'scribble' ? 'scribble relay' : read.from;
    const readTitle = `presets on the ${deviceName}`;
    const readMeta = `128 slots, ${read.presets.length} carrying something. send any of them to any stack in bank ${String(st.bank + 1).padStart(2, '0')} — nothing changes until you apply.`;

    const scanned = read.scanned || 0;
    const total = read.total || 128;
    const found = read.found || 0;
    const scanLabel = `slot ${scanned} / ${total}`;
    const scanSub = found
      ? `${found} ${found === 1 ? 'preset found so far' : 'presets found so far'}`
      : 'listening for the first answer…';
    const fillPercent = Math.min(100, Math.round((100 * scanned) / total));

    const filter = (read.filter || '').trim().toLowerCase();
    const presetList = read.presets.filter(
      (p) =>
        !filter ||
        String(p.n).indexOf(filter) === 0 ||
        p.label.toLowerCase().includes(filter) ||
        p.second.toLowerCase().includes(filter) ||
        stepsLabel(p.steps).toLowerCase().includes(filter),
    );

    const ctrl = CONTROLLERS[st.controllerId] || CONTROLLERS['chocolate'];
    const keys = ctrl ? ctrl.keys : ['A', 'B', 'C', 'D'];

    const destOpts = [{ value: '', label: '— leave it —' }];
    keys.forEach((k) => {
      ACTIONS.forEach((a) => {
        destOpts.push({
          value: `${k}:${a.id}`,
          label: `switch ${k} · ${a.label.toLowerCase()}`,
        });
      });
    });

    const destCount = Object.keys(read.dest).length;
    const readFooter = `${destCount} ${destCount === 1 ? 'preset heading into a stack' : 'presets heading into stacks'}`;
    const applyLabel = destCount ? `pull ${destCount} in` : 'close';

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
            <div class="title">${readTitle}</div>
            <div class="meta">${readMeta}</div>
          </div>
          <div class="body">
            ${busy
              ? html`
                  <div class="loader-card">
                    <div class="loader-top">
                      <span class="scan-label">${scanLabel}</span>
                      <span class="scan-sub">${scanSub}</span>
                    </div>
                    <div class="scan-bar">
                      <div class="scan-fill" style="width:${fillPercent}%;"></div>
                    </div>
                    <div class="loader-status">
                      <span class="loader-dot"></span>
                      <span>waiting on the device — it answers one slot at a time.</span>
                    </div>
                  </div>
                `
              : null}

            <input
              class="filter-input"
              .value=${read.filter || ''}
              @input=${(e: Event) => this.store.setReadFilter((e.target as HTMLInputElement).value)}
              placeholder="find a slot — number or name"
            />

            ${presetList.length === 0
              ? html`
                  <div class="empty-note">
                    ${filter
                      ? `no slot matches “${filter}”.`
                      : 'nothing on the brain yet — the 128 slots are all empty.'}
                  </div>
                `
              : html`
                  <div class="preset-list">
                    ${presetList.map((p) => {
                      const d = read.dest[p.n] || null;
                      const numStr = `p${String(p.n).padStart(3, '0')}`;
                      const bgColor = p.color && HEX[p.color] ? HEX[p.color] : 'var(--ink)';
                      const textColor =
                        p.color && HEX[p.color] && !isDark(HEX[p.color]) ? 'var(--ink)' : '#fdf3d4';
                      const destVal = d ? `${d.key}:${d.action}` : '';

                      const targetStack =
                        d && st.banks[st.bank]?.[d.key]?.[d.action]
                          ? st.banks[st.bank][d.key][d.action]
                          : null;
                      const actObj = d ? ACTIONS.find((a) => a.id === d.action) : null;
                      const actLabel = actObj ? actObj.label.toLowerCase() : d?.action || '';

                      const destNote = d
                        ? targetStack && targetStack.length
                          ? `switch ${d.key} · ${actLabel} already holds ${targetStack.length} ${targetStack.length === 1 ? 'message' : 'messages'}`
                          : `switch ${d.key} · ${actLabel} is empty`
                        : '';

                      return html`
                        <div class="preset-slot-row" ?assigned=${!!d}>
                          <div class="preset-top">
                            <span
                              class="num-tag"
                              style="background:${bgColor};color:${textColor};"
                            >
                              ${numStr}
                            </span>
                            <div class="preset-info">
                              <span class="preset-title">${p.label}</span>
                              <span class="preset-steps">${p.second || stepsLabel(p.steps)}</span>
                            </div>
                            <select
                              class="dest-select"
                              ?assigned=${!!d}
                              .value=${destVal}
                              @change=${(e: Event) =>
                                this.store.setReadDest(p.n, (e.target as HTMLSelectElement).value)}
                            >
                              ${destOpts.map(
                                (o) => html`<option value="${o.value}">${o.label}</option>`,
                              )}
                            </select>
                          </div>

                          ${d
                            ? html`
                                <div class="assigned-bar">
                                  <span class="dest-note">${destNote}</span>
                                  <button
                                    class="btn-mode"
                                    ?active=${d.mode === 'replace'}
                                    @click=${() => this.store.setReadDestMode(p.n, 'replace')}
                                  >
                                    replace the stack
                                  </button>
                                  <button
                                    class="btn-mode"
                                    ?active=${d.mode === 'add'}
                                    @click=${() => this.store.setReadDestMode(p.n, 'add')}
                                  >
                                    add to the stack
                                  </button>
                                </div>
                              `
                            : null}
                        </div>
                      `;
                    })}
                  </div>
                `}
          </div>
          <div class="foot">
            <span class="footer-info">${readFooter}</span>
            <button class="btn-cancel" @click=${() => this.store.cancelRead()}>cancel</button>
            ${!busy
              ? html`
                  <button class="btn-apply" @click=${() => this.store.applyPresets()}>
                    ${applyLabel}
                  </button>
                `
              : null}
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

