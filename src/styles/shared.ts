import { css, html } from 'lit';
import type { StompStore } from '../state/store.js';

/** Design tokens as CSS custom properties, redeclared here so shadow roots
 * that don't happen to inherit from :root (e.g. in isolated tests) still work. */
export const tokens = css`
  :host {
    --ink: #16323d;
    --paper: #f7f1e3;
    --card: #fffbf0;
    --panel-warm: #fdf3d4;
    --popover-bg: #e8f4fa;
    --mustard: #f7c948;
    --coral: #ef7d5c;
    --sky: #8fd0e6;
    --violet: #7b62b8;
    --full-bg: #ffe6dd;
    --full-border-bg: #ffd9cc;
    --mono: 'DM Mono', monospace;
    --sans: Fredoka, 'Helvetica Neue', Helvetica, sans-serif;
  }
`;

export const resetAndButton = css`
  * {
    box-sizing: border-box;
  }
  button {
    font-family: inherit;
    cursor: pointer;
    border: 0;
    background: none;
    color: inherit;
  }
  a {
    color: var(--coral);
    text-decoration: none;
  }
`;

/** The recurring "sticker": thick ink border, offset hard shadow, rounded corners. */
export const stickerCard = css`
  .sticker {
    border: 2.5px solid var(--ink);
    border-radius: 26px;
    background: var(--card);
    box-shadow: 8px 8px 0 var(--ink);
  }
`;

/** @keyframes are scoped to whichever shadow root defines them — they don't
 * pierce shadow boundaries like custom properties do — so every component
 * that animates needs this included in its own `static styles`. */
export const motionKeyframes = css`
  @keyframes scrimIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes blip {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes ring {
    0% {
      box-shadow: 0 0 0 0 rgba(247, 201, 72, 0.85);
    }
    100% {
      box-shadow: 0 0 0 15px rgba(247, 201, 72, 0);
    }
  }
  @keyframes breathe {
    0%,
    100% {
      opacity: 0.35;
    }
    50% {
      opacity: 1;
    }
  }
  @keyframes sheetIn {
    from {
      opacity: 0;
      transform: scale(0.96) rotate(-1deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0);
    }
  }
  @keyframes stepIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes bob {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }
  @keyframes wig {
    from {
      left: 0;
    }
    to {
      left: 100%;
    }
  }
  @keyframes glide {
    0% {
      left: 0;
    }
    70%,
    100% {
      left: 100%;
    }
  }
  @keyframes kwig {
    from {
      transform: rotate(var(--a0));
    }
    to {
      transform: rotate(var(--a1));
    }
  }
  @keyframes kglide {
    0% {
      transform: rotate(var(--a0));
    }
    70%,
    100% {
      transform: rotate(var(--a1));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export const modalScrim = css`
  .scrim {
    position: fixed;
    inset: 0;
    background: rgba(22, 50, 61, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 80;
    padding: 20px;
    animation: scrimIn 180ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .sheet-in {
    animation: sheetIn 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
`;

/** Exact 1:1 implementation of H(id, align, title, body) from Stomp Stacks v3.dc.html */
export function renderHintPopover(
  store: StompStore,
  id: string,
  align: 'left' | 'right',
  title: string,
  body: string
) {
  const st = store.state;
  const open = st.hintOpen === id;
  const active = st.hintAll || open;
  const dotStyle = `width:18px;height:18px;flex:none;padding:0;border-radius:50%;border:2px solid #16323d;font-size:10.5px;font-weight:700;line-height:1;display:flex;align-items:center;justify-content:center;color:#16323d;transition:opacity 150ms ease,background 150ms ease;${
    active
      ? `background:#f7c948;opacity:1;animation:ring 1.4s cubic-bezier(.23,1,.32,1) ${
          st.hintAll ? 'infinite' : '1'
        }`
      : 'background:#fffbf0;opacity:.5'
  }`;
  const cardStyle = `position:absolute;top:calc(100% + 8px);${
    align === 'right' ? 'right:-6px' : 'left:-6px'
  };z-index:45;width:270px;max-width:80vw;padding:12px 13px;border-radius:16px;background:#fffbf0;border:2.5px solid #16323d;box-shadow:4px 4px 0 #16323d;display:flex;flex-direction:column;gap:5px;text-align:left;white-space:normal;animation:sheetIn 170ms cubic-bezier(.23,1,.32,1)`;

  return html`
    <span style="position:relative;display:inline-flex;align-items:center;flex:none">
      <button
        style=${dotStyle}
        title=${title}
        @click=${(e: Event) => {
          e.stopPropagation();
          store.setHintOpen(id);
        }}
      >
        ?
      </button>
      ${open
        ? html`
            <div style=${cardStyle} @click=${(e: Event) => e.stopPropagation()}>
              <div style="font-size:13px;font-weight:600;color:#16323d">${title}</div>
              <div style="font-size:12px;line-height:1.5;opacity:.75;color:#16323d">${body}</div>
              <button
                style="align-self:flex-end;margin-top:3px;padding:4px 11px;border-radius:11px;background:#f7c948;border:2px solid #16323d;font-size:11.5px;font-weight:600"
                @click=${() => store.setHintOpen(id)}
              >
                got it
              </button>
            </div>
          `
        : null}
    </span>
  `;
}

