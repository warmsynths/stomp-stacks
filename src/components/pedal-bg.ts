export interface PedalBgBox {
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
}

export interface PedalBgOpts {
  W: number;
  H: number;
  now: number;
  dt: number;
  P: PedalBgBox;
  p: { x: number; y: number } | null;
  k: number;
  hit: boolean;
  // Per-style mutable animation store
  S: Record<string, any>;
  reduce: boolean;
  acc?: string;
}

export type PedalBgOption = readonly [id: string, label: string];

export const BG_STYLES: Record<string, readonly PedalBgOption[]> = {
  blooper: [
    ['doodles', 'doodle drift'],
    ['tape', 'tape loop'],
    ['warp', 'warped tape'],
  ],
  mood: [
    ['drip', 'drip + moon'],
    ['clock', 'clock dial'],
    ['slip', 'slip'],
  ],
  elcap: [
    ['reels', 'reels'],
    ['echo', 'echo trail'],
    ['springs', 'springs'],
  ],
  genloss: [
    ['forest', 'pine forest'],
    ['generations', 'generations'],
    ['tracking', 'tracking'],
  ],
};

export const DEFAULT_BG_BY: Record<string, string> = {
  blooper: 'doodles',
  mood: 'drip',
  elcap: 'reels',
  genloss: 'forest',
};

const INK = '#16323d';
const BLUE = '#8fd0e6';
const YEL = '#f7c948';
const COR = '#ef7d5c';
const GRN = '#7cc68a';
const CREAM = '#fffbf0';
const MRED = '#e0473f';
const MPUR = '#41336f';
const SLATE = '#5b646b';
const LED = '#e5483b';
const ELP = '#7b62b8';
const GL_DEEP = '#1f3b4d';
const GL_BLUE = '#6d93ad';
const GL_PALE = '#a9c3d4';
const GL_MIST = '#d3e1ea';

const hash = (a: number, b: number) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

function twice(ctx: CanvasRenderingContext2D, col: string, w: number) {
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = INK;
  ctx.lineWidth = w + 4.5;
  ctx.stroke();
  ctx.strokeStyle = col;
  ctx.lineWidth = w;
  ctx.stroke();
}

function rr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function crescent(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rot: number,
  col: string
) {
  const d = r * 0.9;
  const yy = Math.sqrt(r * r - (d * d) / 4);
  const th = Math.atan2(yy, d / 2);
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.arc(0, 0, r, th, Math.PI * 2 - th, false);
  ctx.arc(d, 0, r, Math.atan2(-yy, -d / 2), Math.atan2(yy, -d / 2), true);
  ctx.closePath();
  ctx.fillStyle = col;
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = INK;
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.restore();
}

function drop(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  col: string
) {
  ctx.beginPath();
  ctx.moveTo(x, y - s * 1.5);
  ctx.bezierCurveTo(x + s * 0.4, y - s * 0.6, x + s, y, x + s, y + s * 0.35);
  ctx.arc(x, y + s * 0.35, s, 0, Math.PI, false);
  ctx.bezierCurveTo(x - s, y, x - s * 0.4, y - s * 0.6, x, y - s * 1.5);
  ctx.closePath();
  ctx.fillStyle = col;
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = INK;
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function doodle(
  ctx: CanvasRenderingContext2D,
  q: { x: number; y: number; rot: number; t: string },
  s: number,
  col: string
) {
  ctx.save();
  ctx.translate(q.x, q.y);
  ctx.rotate(q.rot);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (q.t === 'dash') {
    ctx.beginPath();
    ctx.moveTo(-s / 2, 0);
    ctx.lineTo(s / 2, 0);
    twice(ctx, col, 4);
  } else if (q.t === 'squiggle') {
    ctx.beginPath();
    for (let i = 0; i <= 24; i++) {
      const x = -s + (i * (2 * s)) / 24;
      const y = Math.sin((i / 24) * Math.PI * 3) * s * 0.28;
      if (i) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    }
    twice(ctx, col, 3.5);
  } else if (q.t === 'sun') {
    const r = s * 0.36;
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r * 1.5, Math.sin(a) * r * 1.5);
      ctx.lineTo(Math.cos(a) * r * 2.05, Math.sin(a) * r * 2.05);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 6.283);
    ctx.fillStyle = YEL;
    ctx.fill();
    ctx.stroke();
  } else if (q.t === 'chain') {
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = INK;
    ctx.beginPath();
    ctx.ellipse(-s * 0.26, 0, s * 0.4, s * 0.21, 0, 0, 6.283);
    ctx.fillStyle = col;
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(s * 0.26, 0, s * 0.4, s * 0.21, 0, 0, 6.283);
    ctx.stroke();
  } else if (q.t === 'ring') {
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.34, 0, 6.283);
    ctx.fillStyle = col;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = INK;
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(-s * 0.4, 0);
    ctx.lineTo(s * 0.4, 0);
    ctx.moveTo(0, -s * 0.4);
    ctx.lineTo(0, s * 0.4);
    twice(ctx, col, 3);
  }
  ctx.restore();
}

function speed(o: PedalBgOpts, gain: number): number {
  const S = o.S;
  const t = o.reduce ? 0 : 1 + gain * o.k;
  S.sp = (S.sp == null ? 1 : S.sp) + (t - (S.sp == null ? 1 : S.sp)) * 0.12;
  S.T = (S.T || 0) + o.dt * S.sp;
  return S.sp;
}

function reel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  R: number,
  pack: number,
  ang: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, R, 0, 6.283);
  ctx.fillStyle = CREAM;
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, pack, 0, 6.283);
  ctx.fillStyle = SLATE;
  ctx.fill();
  ctx.stroke();
  ctx.rotate(ang);
  ctx.beginPath();
  ctx.arc(0, 0, R * 0.3, 0, 6.283);
  ctx.fillStyle = '#c7ced2';
  ctx.fill();
  ctx.stroke();
  for (let i = 0; i < 3; i++) {
    ctx.rotate((Math.PI * 2) / 3);
    ctx.beginPath();
    ctx.ellipse(0, -R * 0.62, R * 0.17, R * 0.2, 0, 0, 6.283);
    ctx.fillStyle = '#f7f1e3';
    ctx.fill();
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, R * 0.08, 0, 6.283);
  ctx.fillStyle = INK;
  ctx.fill();
  ctx.restore();
}

function pine(
  ctx: CanvasRenderingContext2D,
  x: number,
  base: number,
  h: number,
  col: string,
  sway: number
) {
  const w = h * 0.36;
  ctx.beginPath();
  ctx.moveTo(x + sway, base - h);
  for (let i = 1; i <= 3; i++) {
    const y = base - h + (h * i) / 3;
    const s = sway * (1 - i / 3);
    ctx.lineTo(x + s + (w * i) / 3, y);
    if (i < 3) ctx.lineTo(x + s + ((w * i) / 3) * 0.45, y);
  }
  for (let i = 3; i >= 1; i--) {
    const y = base - h + (h * i) / 3;
    const s = sway * (1 - i / 3);
    if (i < 3) ctx.lineTo(x + s - ((w * i) / 3) * 0.45, y);
    ctx.lineTo(x + s - (w * i) / 3, y);
  }
  ctx.closePath();
  ctx.fillStyle = col;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = INK;
  ctx.lineJoin = 'round';
  ctx.stroke();
}

const DRAWERS: Record<
  string,
  (ctx: CanvasRenderingContext2D, o: PedalBgOpts) => void
> = {
  doodles: (ctx, o) => {
    const { W, H, dt, P, p, k, S } = o;
    const sp = speed(o, 2.4);
    const want = Math.max(14, Math.min(40, Math.round((W * H) / 26000)));
    if (!S.parts || S.parts.length !== want) {
      const types = ['dash', 'squiggle', 'sun', 'chain', 'ring', 'spark'];
      S.parts = Array.from({ length: want }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.03,
        vy: (Math.random() - 0.5) * 0.03 - 0.006,
        ex: 0,
        ey: 0,
        rot: Math.random() * 6.28,
        vr: (Math.random() - 0.5) * 0.0016,
        s: 12 + Math.random() * 9,
        t: types[i % 6],
        ci: (i * 3) % 5,
      }));
    }
    const cols = [o.acc || BLUE, YEL, COR, GRN, CREAM];
    for (const q of S.parts) {
      if (o.hit) {
        const dx = q.x - P.cx;
        const dy = q.y - P.cy;
        const d = Math.hypot(dx, dy) || 1;
        q.ex += (dx / d) * 0.12;
        q.ey += (dy / d) * 0.12;
      }
      q.ex *= 0.97;
      q.ey *= 0.97;
      if (p) {
        const px = q.x - p.x;
        const py = q.y - p.y;
        const pd = Math.hypot(px, py) || 1;
        if (pd < 90) {
          q.ex += (px / pd) * (1 - pd / 90) * 0.05;
          q.ey += (py / pd) * (1 - pd / 90) * 0.05;
        }
      }
      q.x += (q.vx * sp + q.ex) * dt;
      q.y += (q.vy * sp + q.ey) * dt;
      q.rot += q.vr * dt * sp;
      if (q.x < -30) q.x = W + 30;
      if (q.x > W + 30) q.x = -30;
      if (q.y < -30) q.y = H + 30;
      if (q.y > H + 30) q.y = -30;
      doodle(ctx, q, q.s * (1 + 0.25 * k), cols[q.ci]);
    }
  },

  tape: (ctx, o) => {
    const { W, H, P, S } = o;
    speed(o, 2.4);
    const a = Math.min(P.h * 0.62, H * 0.46);
    const kx = Math.min(
      (P.w / 2 + 80) / (0.354 * a),
      (W / 2 - 24) / (0.354 * a)
    );
    const pt = (u: number): [number, number] => {
      const s = Math.sin(u);
      const c = Math.cos(u);
      const d = 1 + s * s;
      return [P.cx + ((a * s * c) / d) * kx, P.cy + (a * c) / d];
    };
    ctx.beginPath();
    for (let i = 0; i <= 160; i++) {
      const q = pt((i / 160) * Math.PI * 2);
      if (i) ctx.lineTo(q[0], q[1]);
      else ctx.moveTo(q[0], q[1]);
    }
    ctx.closePath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = INK;
    ctx.lineWidth = 24;
    ctx.stroke();
    ctx.strokeStyle = '#d6eef6';
    ctx.lineWidth = 19;
    ctx.stroke();
    ctx.setLineDash([0.1, 15]);
    ctx.lineDashOffset = -S.T * 0.05;
    ctx.strokeStyle = INK;
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.setLineDash([]);
    ['rec', 'stop', 'undo'].forEach((g, i) => {
      const q = pt(S.T * 0.0005 + (i * Math.PI * 2) / 3);
      if (g === 'rec' && o.k > 0.05) {
        ctx.globalAlpha = o.k;
        ctx.beginPath();
        ctx.arc(q[0], q[1], 16 + (1 - o.k) * 20, 0, 6.283);
        ctx.strokeStyle = COR;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.beginPath();
      ctx.arc(q[0], q[1], 16, 0, 6.283);
      ctx.fillStyle = CREAM;
      ctx.fill();
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      if (g === 'rec') {
        ctx.beginPath();
        ctx.arc(q[0], q[1], 6.5, 0, 6.283);
        ctx.fillStyle = COR;
        ctx.fill();
        ctx.stroke();
      } else if (g === 'stop') {
        ctx.fillStyle = INK;
        ctx.fillRect(q[0] - 5.5, q[1] - 5.5, 11, 11);
      } else {
        ctx.beginPath();
        ctx.arc(q[0] + 1, q[1] + 1, 6, Math.PI * 1.05, Math.PI * 2.6);
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(q[0] - 8, q[1] - 3);
        ctx.lineTo(q[0] - 4.5, q[1] + 1.5);
        ctx.lineTo(q[0] - 0.5, q[1] - 2.5);
        ctx.stroke();
      }
    });
  },

  warp: (ctx, o) => {
    const { W, H, p, S } = o;
    speed(o, 1.4);
    const gap = 22;
    const n = Math.floor(H / gap);
    const T = S.T;
    const amp0 = 2.5 + 10 * o.k;
    const hi = [o.acc || BLUE, YEL, COR];
    for (let i = 0; i < n; i++) {
      const y0 = gap * (i + 0.5) + (H - n * gap) / 2;
      ctx.beginPath();
      for (let x = -10; x <= W + 10; x += 6) {
        let amp = amp0;
        if (p) {
          amp +=
            18 *
            Math.exp(-((y0 - p.y) ** 2) / 3200) *
            Math.exp(-((x - p.x) ** 2) / 14000);
        }
        const y =
          y0 +
          amp *
            Math.sin(x * 0.035 + T * 0.003 + i * 0.7) *
            (0.6 + 0.4 * Math.sin(x * 0.011 - T * 0.0013 + i));
        if (x === -10) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      if (i % 5 === 2) {
        twice(ctx, hi[Math.floor(i / 5) % 3], 3.5);
      } else {
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'rgba(22,50,61,.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  },

  drip: (ctx, o) => {
    const { W, H, now, dt, P, p, S } = o;
    const sp = o.reduce ? 0 : 1 + 2 * o.k;
    const cols = [COR, MRED, MPUR];
    S.drops = S.drops || [];
    S.moons = S.moons || [];
    S.rip = S.rip || [];
    S.nd = S.nd || 0;
    S.nm = S.nm || 0;
    const addDrop = () =>
      S.drops.push({
        x: Math.random() * P.cx,
        y: -20,
        v: 0.05 + Math.random() * 0.05,
        s: 5 + Math.random() * 3,
        col: cols[Math.floor(Math.random() * 3)],
        floor: H * (0.55 + Math.random() * 0.4),
      });
    const addMoon = () =>
      S.moons.push({
        x: P.cx + Math.random() * (W - P.cx),
        y: H + 20,
        v: 0.02 + Math.random() * 0.02,
        r: 8 + Math.random() * 6,
        rot: Math.random() * 6,
        vr: (Math.random() - 0.5) * 0.001,
        sw: Math.random() * 6,
      });
    if (!o.reduce) {
      const dens = Math.max(1, W / 420);
      if (now > S.nd) {
        addDrop();
        S.nd = now + 420 / sp / dens;
      }
      if (now > S.nm) {
        addMoon();
        S.nm = now + 1300 / sp / dens;
      }
      if (o.hit) {
        for (let i = 0; i < 8; i++) {
          addDrop();
          addMoon();
          S.moons[S.moons.length - 1].y = H - Math.random() * 60;
        }
      }
    }
    S.rip = S.rip.filter((r: any) => now - r.t < 900);
    for (const r of S.rip) {
      const q = (now - r.t) / 900;
      ctx.globalAlpha = 1 - q;
      ctx.beginPath();
      ctx.ellipse(r.x, r.y, 6 + q * 26, 2 + q * 8, 0, 0, 6.283);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = INK;
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(r.x, r.y, 3 + q * 14, 1 + q * 4, 0, 0, 6.283);
      ctx.strokeStyle = r.col;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    S.drops = S.drops.filter((d: any) => {
      d.v += 0.00012 * dt;
      d.y += d.v * dt * sp;
      const hitP =
        p && Math.abs(d.x - p.x) < 34 && d.y > p.y - 40 && d.y < p.y - 20;
      if (d.y > d.floor || hitP) {
        S.rip.push({ x: d.x, y: d.y, t: now, col: d.col });
        return false;
      }
      drop(ctx, d.x, d.y, d.s, d.col);
      return true;
    });
    S.moons = S.moons.filter((m: any) => {
      m.y -= m.v * dt * sp;
      m.rot += m.vr * dt;
      const x = m.x + Math.sin(now * 0.0012 + m.sw) * 10;
      if (p) {
        const dx = x - p.x;
        const dy = m.y - p.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 70) m.x += (dx / d) * 0.08 * dt;
      }
      if (m.y < -30) return false;
      crescent(ctx, x, m.y, m.r, m.rot, YEL);
      return true;
    });
    if (p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y - 22, 30, Math.PI, 0);
      ctx.lineTo(p.x + 30, p.y - 22);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,251,240,.9)';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = INK;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - 22);
      ctx.lineTo(p.x, p.y + 6);
      ctx.arc(p.x - 5, p.y + 6, 5, 0, Math.PI);
      ctx.stroke();
    }
  },

  clock: (ctx, o) => {
    const { W, H, dt, P, p, S } = o;
    S.a = S.a || 0;
    S.b = S.b || 0;
    const R = Math.min(W / 2 - 8, H / 2 - 8, P.h * 0.62);
    const labels = [
      '2k',
      '3k',
      '4k',
      '6k',
      '8k',
      '12k',
      '16k',
      '24k',
      '32k',
      '48k',
      '64k',
    ];
    const f = p ? Math.max(0, Math.min(1, (p.x - (P.cx - R)) / (2 * R))) : 0.5;
    const sp = o.reduce ? 0 : 1 + 3 * o.k;
    S.a += dt * 0.00018 * sp;
    S.b -= dt * 0.00026 * sp;
    const step = (1 - f) * 0.35;
    const q = (v: number) => (step < 0.01 ? v : Math.floor(v / step) * step);
    const A = q(S.a);
    const B = q(S.b);
    ctx.save();
    ctx.translate(P.cx, P.cy);
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, 6.283);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = INK;
    ctx.stroke();
    for (let i = 0; i < 72; i++) {
      const a = A + (i / 72) * 6.283;
      const L = i % 6 === 0 ? 14 : 7;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * R, Math.sin(a) * R);
      ctx.lineTo(Math.cos(a) * (R - L), Math.sin(a) * (R - L));
      ctx.lineWidth = i % 6 === 0 ? 2.5 : 1.5;
      ctx.stroke();
    }
    ctx.font = "500 12px 'DM Mono', monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    labels.forEach((t, i) => {
      const a = A + (i / labels.length) * 6.283;
      const x = Math.cos(a) * (R - 30);
      const y = Math.sin(a) * (R - 30);
      const hot = Math.abs(i / (labels.length - 1) - f) < 0.06;
      rr(ctx, x - 17, y - 10, 34, 20, 10);
      ctx.fillStyle = hot ? YEL : CREAM;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = INK;
      ctx.fillText(t, x, y + 0.5);
    });
    const r2 = R * 0.78;
    ctx.setLineDash([2, 12]);
    ctx.lineDashOffset = B * 60;
    ctx.beginPath();
    ctx.arc(0, 0, r2, 0, 6.283);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.setLineDash([]);
    const n = Math.round(4 + f * 40);
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const a = B * 2 + (i / n) * 6.283;
      const rad = r2 + 10 + Math.sin((i / n) * 6.283 * 3 + S.a * 4) * 8;
      if (i) ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
      else ctx.moveTo(Math.cos(a) * rad, Math.sin(a) * rad);
    }
    twice(ctx, COR, 3);
    ctx.restore();
  },

  slip: (ctx, o) => {
    const { W, now, dt, P, p, S } = o;
    const TW = 44;
    const GAP = 56;
    const bands = (
      [
        [0.61, 0.735, COR, 0.03],
        [0.735, 0.86, MRED, -0.022],
        [0.86, 1.0, MPUR, 0.016],
      ] as const
    ).map((b) => ({
      y: P.y + P.h * b[0],
      h: P.h * (b[1] - b[0]),
      col: b[2],
      v: b[3],
    }));
    const nT = Math.ceil(W / TW) + 1;
    if (!S.tiles || S.tiles[0].length !== nT) {
      S.scroll = S.scroll || 0;
      S.next = 0;
      S.tiles = bands.map(() =>
        Array.from({ length: nT }, () => ({
          o: 0,
          to: 0,
          s: 1,
          ts: 1,
          rev: false,
          until: 0,
        }))
      );
    }
    S.scroll += dt * (o.reduce ? 0 : 1 + 2 * o.k);
    const glitch = (t: any, strong?: boolean) => {
      const r = Math.random();
      if (r < 0.45) {
        t.to +=
          (Math.random() < 0.5 ? -1 : 1) *
          GAP *
          (1 + Math.floor(Math.random() * 3));
      } else if (r < 0.8) {
        t.ts = 1.6 + Math.random() * 1.4;
      } else {
        t.rev = !t.rev;
      }
      t.until = now + (strong ? 500 : 700 + Math.random() * 900);
    };
    if (!o.reduce && now > S.next) {
      glitch(
        S.tiles[Math.floor(Math.random() * 3)][Math.floor(Math.random() * nT)]
      );
      S.next = now + (140 * 420) / Math.max(420, W);
    }
    if (o.hit) {
      for (const row of S.tiles) {
        for (const t of row) {
          if (Math.random() < 0.7) glitch(t, true);
        }
      }
    }
    bands.forEach((b, bi) => {
      S.tiles[bi].forEach((t: any, i: number) => {
        const x0 = i * TW;
        const hover =
          p && p.y > b.y && p.y < b.y + b.h && p.x > x0 && p.x < x0 + TW;
        if (now > t.until && !hover) {
          t.ts = 1;
          t.rev = false;
          t.to = Math.round(t.to / GAP) * GAP;
        }
        if (hover) {
          t.ts = 2.6;
          t.until = now + 400;
        }
        t.o += (t.to - t.o) * 0.12;
        t.s += (t.ts - t.s) * 0.14;
        if (!hover) t.base = S.scroll * b.v * (t.rev ? -1 : 1);
        const u0 = (t.base || 0) + t.o;
        const c1 = u0 + TW / t.s;
        const cy = b.y + b.h / 2;
        ctx.save();
        ctx.beginPath();
        ctx.rect(x0, b.y, TW + 0.5, b.h);
        ctx.clip();
        ctx.fillStyle = b.col;
        ctx.fillRect(x0, b.y, TW + 1, b.h);
        for (
          let k = Math.floor(u0 / GAP) - 1;
          k <= Math.ceil(c1 / GAP) + 1;
          k++
        ) {
          const cx = x0 + (k * GAP - u0) * t.s;
          const kind = ((k % 3) + 3) % 3;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.scale(t.s, 1);
          if (kind === 0) drop(ctx, 0, -2, 6, CREAM);
          else if (kind === 1) crescent(ctx, 0, 0, 8, -0.4, CREAM);
          else {
            ctx.beginPath();
            ctx.moveTo(-10, 8);
            ctx.lineTo(-10, -8);
            ctx.lineTo(0, 2);
            ctx.lineTo(10, -8);
            ctx.lineTo(10, 8);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = CREAM;
            ctx.lineWidth = 2.5;
            ctx.stroke();
          }
          ctx.restore();
        }
        if (Math.abs(t.s - 1) > 0.05 || Math.abs(t.o - t.to) > 1 || t.rev) {
          ctx.fillStyle = 'rgba(255,251,240,.16)';
          ctx.fillRect(x0, b.y, TW + 1, b.h);
        }
        ctx.restore();
        ctx.beginPath();
        ctx.moveTo(x0, b.y);
        ctx.lineTo(x0, b.y + b.h);
        ctx.strokeStyle = 'rgba(22,50,61,.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
      ctx.beginPath();
      ctx.moveTo(0, b.y);
      ctx.lineTo(W, b.y);
      ctx.moveTo(0, b.y + b.h);
      ctx.lineTo(W, b.y + b.h);
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    });
  },

  reels: (ctx, o) => {
    const { now, dt, P, p, S } = o;
    S.a = S.a || 0;
    if (S.wind == null) {
      S.wind = 0.5;
      S.dir = 1;
    }
    const R = Math.max(60, Math.min(110, P.w * 0.25));
    const L: [number, number] = [P.x - 6, P.y + R * 0.5];
    const Rr: [number, number] = [P.x + P.w + 6, P.y + R * 0.5];
    let drag = 1;
    if (
      p &&
      (Math.hypot(p.x - L[0], p.y - L[1]) < R ||
        Math.hypot(p.x - Rr[0], p.y - Rr[1]) < R)
    ) {
      drag = 0.15;
    }
    const flutter =
      1 + 0.18 * Math.sin(now * 0.0021) + 0.06 * Math.sin(now * 0.017);
    S.v =
      (S.v == null ? 1 : S.v) +
      ((1 + 3 * o.k) * drag * flutter - (S.v == null ? 1 : S.v)) * 0.08;
    const w = o.reduce ? 0 : dt * 0.0022 * S.v;
    S.a += w;
    S.wind += S.dir * w * 0.012;
    if (S.wind > 1) {
      S.wind = 1;
      S.dir = -1;
    }
    if (S.wind < 0) {
      S.wind = 0;
      S.dir = 1;
    }
    const pl = R * (0.36 + 0.56 * (1 - S.wind));
    const pr = R * (0.36 + 0.56 * S.wind);
    const g1: [number, number] = [P.x + 34, P.y + P.h + 26];
    const g2: [number, number] = [P.x + P.w - 34, P.y + P.h + 26];
    ctx.beginPath();
    ctx.moveTo(L[0] - pl, L[1]);
    ctx.lineTo(g1[0] - 12, g1[1]);
    ctx.lineTo(g2[0] + 12, g2[1]);
    ctx.lineTo(Rr[0] + pr, Rr[1]);
    ctx.lineJoin = 'round';
    ctx.strokeStyle = INK;
    ctx.lineWidth = 7;
    ctx.stroke();
    ctx.strokeStyle = SLATE;
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.setLineDash([3, 14]);
    ctx.lineDashOffset = -S.a * 40;
    ctx.strokeStyle = CREAM;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
    for (const g of [g1, g2]) {
      ctx.beginPath();
      ctx.arc(g[0], g[1], 12, 0, 6.283);
      ctx.fillStyle = '#c7ced2';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = INK;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(g[0], g[1], 3, 0, 6.283);
      ctx.fillStyle = INK;
      ctx.fill();
    }
    reel(ctx, L[0], L[1], R, pl, S.a);
    reel(ctx, Rr[0], Rr[1], R, pr, S.a * 1.13);
  },

  echo: (ctx, o) => {
    const { now, P, p, S } = o;
    if (S.ang == null) {
      S.ang = -0.7;
      S.sp = 26;
    }
    const target = p
      ? Math.atan2(P.cy - p.y, P.cx - p.x)
      : -0.7 + Math.sin(now * 0.0004) * 0.6;
    let d = target - S.ang;
    while (d > Math.PI) d -= 6.283;
    while (d < -Math.PI) d += 6.283;
    S.ang += d * 0.06;
    S.sp += (26 + 30 * o.k - S.sp) * 0.1;
    const TAP = 600;
    const beat = (now % TAP) / TAP;
    const n = 6;
    for (let i = n; i >= 1; i--) {
      const x = P.x + Math.cos(S.ang) * S.sp * i;
      const y = P.y + Math.sin(S.ang) * S.sp * i;
      const lit = Math.abs(beat * n - (i - 1)) < 0.6;
      ctx.globalAlpha = Math.max(0.12, 1 - i / (n + 1));
      rr(ctx, x, y, P.w, P.h, 22);
      ctx.fillStyle = lit ? '#cdbff0' : '#dfe3e6';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = INK;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + P.w * 0.18, y + P.h * 0.68, 5, 0, 6.283);
      ctx.fillStyle = lit ? LED : '#9aa2a8';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  },

  springs: (ctx, o) => {
    const { W, H, now, dt, P, p, S } = o;
    const xs = [P.x - 70, P.x - 36, P.x + P.w + 36, P.x + P.w + 70].map((x) =>
      Math.max(14, Math.min(W - 14, x))
    );
    if (!S.sp) {
      S.sp = xs.map((_x, i) => ({ A: 0, ph: i * 1.3, lastSide: null }));
    }
    const top = Math.max(24, P.y - 60);
    const bot = Math.min(H - 24, P.y + P.h + 60);
    const Lh = bot - top;
    const cols = [ELP, LED, ELP, LED];
    S.sp.forEach((sp: any, i: number) => {
      const sx = xs[i];
      if (o.hit) sp.A = Math.max(sp.A, 16);
      if (p && p.y > top && p.y < bot) {
        const side = p.x < sx ? -1 : 1;
        if (sp.lastSide != null && side !== sp.lastSide) {
          sp.A = Math.min(22, sp.A + 14);
        }
        sp.lastSide = side;
      } else {
        sp.lastSide = null;
      }
      sp.A *= Math.pow(0.9985, dt);
      const wob = (2.5 + sp.A) * Math.sin(now * 0.012 + sp.ph);
      const r = 9;
      const turns = Math.round(Lh / 18);
      ctx.beginPath();
      ctx.moveTo(sx, top - 14);
      ctx.lineTo(sx, top);
      ctx.moveTo(sx, bot);
      ctx.lineTo(sx, bot + 14);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = INK;
      ctx.lineCap = 'round';
      ctx.stroke();
      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        for (let t = 0; t <= turns * 24; t++) {
          const u = t / (turns * 24);
          const ang = u * turns * 6.283;
          const front = Math.cos(ang) > 0;
          const y = top + u * Lh + Math.sin(ang) * 3;
          const x =
            sx +
            Math.sin(ang + Math.PI / 2) * r +
            wob * Math.sin(u * Math.PI);
          if ((pass === 1) === front) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        }
        if (pass === 0) {
          ctx.strokeStyle = 'rgba(22,50,61,.3)';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          twice(ctx, cols[i], 2.5);
        }
      }
      for (const y of [top, bot]) {
        ctx.beginPath();
        ctx.arc(sx, y, 5, 0, 6.283);
        ctx.fillStyle = CREAM;
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = INK;
        ctx.stroke();
      }
    });
  },

  forest: (ctx, o) => {
    const { W, H, now, dt, p, S } = o;
    const sp = speed(o, 3);
    const layers: ReadonlyArray<readonly [number, string, number, number, number]> = [
      [0.6, GL_MIST, 0.004, 70, 0.7],
      [0.74, GL_PALE, 0.008, 100, 0.85],
      [0.9, GL_BLUE, 0.014, 140, 1],
    ];
    const par = p ? p.x / W - 0.5 : 0;
    S.gust = (S.gust || 0) * 0.97;
    if (o.hit) S.gust = 1;
    layers.forEach((L, li) => {
      const base = H * L[0] + Math.sin(S.T * 0.0015 + li * 1.7) * 3;
      const step = 26 + li * 6;
      ctx.fillStyle = L[1];
      ctx.fillRect(0, base, W, H - base);
      ctx.beginPath();
      ctx.moveTo(0, base);
      ctx.lineTo(W, base);
      ctx.lineWidth = 2;
      ctx.strokeStyle = INK;
      ctx.stroke();
      const off = S.T * L[2] + par * 40 * (li + 1);
      const k0 = Math.floor((off - 40) / step);
      const k1 = Math.ceil((off + W + 40) / step);
      for (let k = k0; k <= k1; k++) {
        if (hash(k, li) < 0.25) continue;
        const x = k * step - off + (hash(k, li + 9) - 0.5) * step * 0.6;
        const h = L[3] * (0.45 + hash(k, li + 3) * 0.75) * L[4];
        const sway =
          ((Math.sin(now * 0.002 + k) * 1.5 + S.gust * 14) * (li + 1)) / 3;
        pine(ctx, x, base + 4, h, L[1], sway);
      }
    });
    const snow: Array<{ x: number; y: number; r: number; v: number; ph: number }> =
      (S.snow = S.snow || []);
    const want = Math.round((W * H) / 4000);
    while (snow.length < want) {
      snow.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 1.6 + Math.random() * 2.2,
        v: 0.015 + Math.random() * 0.025,
        ph: Math.random() * 6,
      });
    }
    const wind = (p ? ((p.x - W / 2) / W) * 0.12 : 0) + S.gust * 0.35;
    snow.forEach((f) => {
      f.y += f.v * dt * sp;
      f.x += (wind + Math.sin(now * 0.001 + f.ph) * 0.01) * dt;
      if (f.y > H + 5) {
        f.y = -5;
        f.x = Math.random() * W;
      }
      if (f.x > W + 5) f.x = -5;
      if (f.x < -5) f.x = W + 5;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, 6.283);
      ctx.fillStyle = CREAM;
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = INK;
      ctx.stroke();
    });
  },

  generations: (ctx, o) => {
    const { W, H, now, p, S } = o;
    speed(o, 4);
    const gap = 40;
    const BW = 11;
    const BG = 6;
    const drift = S.T * 0.012;
    const off = drift % gap;
    const base = Math.floor(drift / gap);
    const mix = (a: string, b: string, t: number) => {
      const pa = parseInt(a.slice(1), 16);
      const pb = parseInt(b.slice(1), 16);
      const c = (s: number) =>
        Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t);
      return `rgb(${c(16)},${c(8)},${c(0)})`;
    };
    for (let j = -1; j <= Math.ceil(H / gap); j++) {
      const y = j * gap + off;
      const id = j - base;
      const d = Math.max(0, Math.min(1, y / H)) * 0.9 + o.k * 0.3;
      const dir = id % 2 ? 1 : -1;
      const sx = (dir * S.T * 0.02) % (BW + BG);
      const col = mix(GL_DEEP, GL_PALE, Math.min(1, d));
      for (let x = sx - (BW + BG); x < W + BW; x += BW + BG) {
        const k = Math.round((x - sx) / (BW + BG));
        let gone = hash(id, k) < d * 0.7;
        let jx =
          (hash(id, k + 50) - 0.5) * d * 16 +
          Math.sin(now * 0.02 + id) * d * 3;
        if (p) {
          const dd = Math.hypot(x - p.x, y - p.y);
          if (dd < 70) {
            jx += ((x - p.x) / (dd || 1)) * (70 - dd) * 0.5;
            gone = gone || hash(id, k + 7) < 0.5 * (1 - dd / 70);
          }
        }
        if (gone) continue;
        const h = 24 * (1 - d * 0.55 * hash(id, k + 99));
        ctx.fillStyle = col;
        ctx.fillRect(x + jx, y - h / 2, BW, h);
        if (d < 0.35) {
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = INK;
          ctx.strokeRect(x + jx, y - h / 2, BW, h);
        }
      }
    }
  },

  tracking: (ctx, o) => {
    const { W, H, now, dt, p, S } = o;
    const sp = speed(o, 3);
    S.roll = ((S.roll || 0) + dt * 0.03 * sp) % (H + 200);
    if (!S.heldAt || now - S.heldAt > 90) {
      S.heldAt = now;
      S.seed = Math.random() * 1000;
    }
    const heavy = o.k;
    const sd = S.seed;
    const nSpeck = Math.round((W * H) / (heavy > 0.3 ? 900 : 5200));
    for (let i = 0; i < nSpeck; i++) {
      const x = hash(sd, i) * W;
      const y = hash(sd + 1, i) * H;
      const w = 2 + hash(sd + 2, i) * 10;
      ctx.fillStyle = hash(sd + 3, i) < 0.5 ? GL_BLUE : GL_DEEP;
      ctx.globalAlpha = 0.35 + 0.4 * hash(sd + 4, i);
      ctx.fillRect(x, y, w, 2);
    }
    ctx.globalAlpha = 1;
    [0, 0.45].forEach((ph, bi) => {
      const y0 = H + 100 - ((S.roll + ph * (H + 200)) % (H + 200));
      const bh = 40 + bi * 24;
      for (let r = 0; r < bh; r += 3) {
        const yy = y0 + r;
        const n = 6 + Math.floor(hash(sd + r, bi) * 10);
        for (let i = 0; i < n; i++) {
          const x = hash(sd + r + i, bi + 3) * W;
          const w = 8 + hash(sd + i, r) * 50;
          ctx.fillStyle = [GL_PALE, GL_BLUE, CREAM][i % 3];
          ctx.fillRect(x, yy, w, 2.2);
        }
      }
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.lineTo(W, y0);
      ctx.moveTo(0, y0 + bh);
      ctx.lineTo(W, y0 + bh);
      ctx.strokeStyle = 'rgba(22,50,61,.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
    const ty = p ? p.y : H * 0.5 + Math.sin(now * 0.0007) * H * 0.3;
    ctx.beginPath();
    for (let x = 0; x <= W; x += 8) {
      const y = ty + (hash(sd, x) - 0.5) * (6 + heavy * 30);
      if (x) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    }
    twice(ctx, CREAM, 4);
    if (heavy > 0.2) {
      const tears = 3;
      for (let i = 0; i < tears; i++) {
        const y = hash(sd + 9, i) * H;
        const h = 6 + hash(sd + 8, i) * 18;
        const dx = (hash(sd + 7, i) - 0.5) * 60 * heavy;
        ctx.fillStyle = GL_BLUE;
        ctx.globalAlpha = heavy;
        ctx.fillRect(dx, y, W, h);
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.moveTo(0, y + h);
        ctx.lineTo(W, y + h);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  },
};

export function drawPedalBg(
  style: string,
  ctx: CanvasRenderingContext2D,
  o: PedalBgOpts
): void {
  const fn = DRAWERS[style];
  if (fn) fn(ctx, o);
}

