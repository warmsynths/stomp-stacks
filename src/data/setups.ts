// Multi-pedal Chase Bliss Set-ups (16-dip-switch rear diagrams, ramp/bounce/sweep configurations, and hardware save walkthroughs).

import { CONTROLLERS, ACTIONS } from './controllers.js';
import { DEVICES } from './devices.js';
import type { Bank } from '../state/types.js';

export type SetupDeviceId = 'mood' | 'genloss' | 'blooper';

export interface PedalSetup {
  id: string;
  device: SetupDeviceId;
  name: string;
  slot: number;
  saved: boolean;
  move: Record<string, boolean>;
  fall: Record<string, boolean>;
  bounce: boolean;
  sweep: 'top' | 'bottom';
  shape?: 'tri' | 'square';
  extras?: Record<string, boolean>;
}

export interface DipSwitchItem {
  id?: string;
  l: string;
  on: boolean;
  hot: boolean;
  kind?: 'move' | 'fall' | 'bounce' | 'sweep' | 'shape' | 'extra';
}

export interface DipBankLayout {
  left: DipSwitchItem[];
  right: DipSwitchItem[];
  rDown: string[];
  lDown: string[];
}

export interface WalkthroughStep {
  art: 'dips' | 'toggle' | 'feet' | 'scribble';
  pos?: 'left' | 'mid' | 'right';
  feetLabel?: string;
  screen?: string;
  title: string;
  body: string;
  helper?: {
    label: string;
    run: () => void;
  } | null;
}

export const SETUP_DEVICES: SetupDeviceId[] = ['mood', 'genloss', 'blooper'];

export const PEDAL_RAMP_KNOBS: Record<SetupDeviceId, Array<[string, string, string]>> = {
  mood: [
    ['time', 'time', 'Time'],
    ['modWet', 'modify · wet', 'Modify ●'],
    ['clock', 'clock', 'Clock'],
    ['modMicro', 'modify · micro', 'Modify ○'],
    ['length', 'length', 'Length'],
  ],
  genloss: [
    ['wow', 'wow', 'Wow'],
    ['model', 'model', 'Model'],
    ['flutter', 'flutter', 'Flutter'],
    ['saturate', 'saturate', 'Saturate'],
    ['failure', 'failure', 'Failure'],
  ],
  blooper: [
    ['volume', 'volume', 'Volume'],
    ['layers', 'layers', 'Layers'],
    ['repeats', 'repeats', 'Repeats'],
    ['modA', 'mod a', 'Mod A'],
    ['stability', 'stability', 'Stability'],
    ['modB', 'mod b', 'Mod B'],
  ],
};

export const PEDAL_SPEED_KNOB: Record<SetupDeviceId, { id: string; label: string; note: string }> = {
  mood: {
    id: 'mix',
    label: 'mix',
    note: 'mix stops being wet/dry and becomes the speed knob while this set-up is loaded.',
  },
  genloss: {
    id: 'volume',
    label: 'volume (ramp)',
    note: 'volume (ramp) becomes the ramp speed control while this set-up is loaded.',
  },
  blooper: {
    id: 'rampSpeed',
    label: 'ramp speed',
    note: 'ramp speed (or repeats on the rear panel) sets how fast the movement runs while this set-up is loaded.',
  },
};

export const PEDAL_EXTRAS: Record<SetupDeviceId, Array<[string, string]>> = {
  mood: [],
  genloss: [
    ['classic', 'Classic Mode'],
    ['order', 'Sat → Filter'],
    ['DryType', 'Dry Small'],
    ['Snag', 'Snag'],
    ['Hiss', 'Hiss Boost'],
    ['Miso', 'MISO'],
    ['Spread', 'Spread'],
  ],
  blooper: [
    ['DryKill', 'Dry Kill'],
    ['Sync', 'Sync'],
    ['PlayExp', 'Play Exp'],
    ['Notes', 'Notes'],
  ],
};

export const SEED_SETS: PedalSetup[] = [
  {
    id: 'clockwig',
    device: 'mood',
    name: 'clock wiggle',
    slot: 1,
    saved: false,
    move: { clock: true },
    fall: {},
    bounce: true,
    sweep: 'top',
    shape: 'tri',
  },
  {
    id: 'smearswell',
    device: 'mood',
    name: 'smear swell',
    slot: 2,
    saved: false,
    move: { modWet: true },
    fall: {},
    bounce: false,
    sweep: 'top',
    shape: 'tri',
  },
  {
    id: 'classicwiggle',
    device: 'genloss',
    name: 'classic wow wiggle',
    slot: 1,
    saved: false,
    move: { wow: true, flutter: true },
    fall: {},
    bounce: true,
    sweep: 'top',
    extras: { classic: true },
  },
  {
    id: 'stereochorus',
    device: 'genloss',
    name: 'stereo spread',
    slot: 2,
    saved: false,
    move: { wow: true },
    fall: {},
    bounce: true,
    sweep: 'top',
    extras: { Miso: true, Spread: true },
  },
  {
    id: 'bloopmodwig',
    device: 'blooper',
    name: 'mod a wiggle',
    slot: 1,
    saved: false,
    move: { modA: true },
    fall: {},
    bounce: true,
    sweep: 'top',
  },
  {
    id: 'bloopwearwig',
    device: 'blooper',
    name: 'stability breathe',
    slot: 2,
    saved: false,
    move: { stability: true },
    fall: {},
    bounce: true,
    sweep: 'top',
  },
];

export function getDipLayout(so: PedalSetup): DipBankLayout {
  const dev = so.device || 'mood';
  const knobs = PEDAL_RAMP_KNOBS[dev] || PEDAL_RAMP_KNOBS.mood;
  const KN: Record<string, string> = {};
  knobs.forEach(([id, , hwName]) => {
    KN[id] = hwName;
  });
  const movingIds = knobs.filter(([id]) => so.move[id]).map(([id]) => id);
  const ex = so.extras || {};

  if (dev === 'genloss') {
    const right: DipSwitchItem[] = [
      { id: 'wow', l: 'Wow', on: !!so.move.wow, hot: true, kind: 'move' },
      { id: 'model', l: 'Model', on: !!so.move.model, hot: true, kind: 'move' },
      { id: 'flutter', l: 'Flutter', on: !!so.move.flutter, hot: true, kind: 'move' },
      { id: 'saturate', l: 'Saturate', on: !!so.move.saturate, hot: true, kind: 'move' },
      { id: 'failure', l: 'Failure', on: !!so.move.failure, hot: true, kind: 'move' },
      { id: 'bounce', l: 'Bounce', on: !!so.bounce, hot: true, kind: 'bounce' },
      { id: 'Random', l: 'Random', on: !!ex.Random, hot: false, kind: 'extra' },
      { id: 'polarity', l: 'Polarity', on: movingIds.some((id) => !so.fall[id]) && !so.bounce, hot: true, kind: 'fall' },
    ];
    const left: DipSwitchItem[] = [
      { id: 'classic', l: 'Classic', on: !!ex.classic, hot: true, kind: 'extra' },
      { id: 'order', l: 'Order', on: !!ex.order, hot: true, kind: 'extra' },
      { id: 'DryType', l: 'Dry Type', on: !!ex.DryType, hot: true, kind: 'extra' },
      { id: 'Snag', l: 'Snag', on: !!ex.Snag, hot: true, kind: 'extra' },
      { id: 'Hiss', l: 'Hiss', on: !!ex.Hiss, hot: true, kind: 'extra' },
      { id: 'sweep', l: 'Sweep', on: so.sweep === 'top', hot: true, kind: 'sweep' },
      { id: 'Miso', l: 'MISO', on: !!ex.Miso, hot: true, kind: 'extra' },
      { id: 'Spread', l: 'Spread', on: !!ex.Spread, hot: true, kind: 'extra' },
    ];
    return {
      left,
      right,
      rDown: right.filter((d) => d.hot && d.on).map((d) => d.l),
      lDown: left.filter((d) => d.hot && d.on).map((d) => d.l),
    };
  }

  if (dev === 'blooper') {
    const right: DipSwitchItem[] = [
      { id: 'volume', l: 'Volume', on: !!so.move.volume, hot: true, kind: 'move' },
      { id: 'layers', l: 'Layers', on: !!so.move.layers, hot: true, kind: 'move' },
      { id: 'repeats', l: 'Repeats', on: !!so.move.repeats, hot: true, kind: 'move' },
      { id: 'modA', l: 'Mod A', on: !!so.move.modA, hot: true, kind: 'move' },
      { id: 'stability', l: 'Stability', on: !!so.move.stability, hot: true, kind: 'move' },
      { id: 'modB', l: 'Mod B', on: !!so.move.modB, hot: true, kind: 'move' },
      { id: 'Sync', l: 'Sync', on: !!ex.Sync, hot: true, kind: 'extra' },
      { id: 'DryKill', l: 'Dry Kill', on: !!ex.DryKill, hot: true, kind: 'extra' },
    ];
    const left: DipSwitchItem[] = [
      { id: 'PlayExp', l: 'Play Exp', on: !!ex.PlayExp, hot: true, kind: 'extra' },
      { id: 'bounce', l: 'Bounce', on: !!so.bounce, hot: true, kind: 'bounce' },
      { id: 'Random', l: 'Random', on: !!ex.Random, hot: false, kind: 'extra' },
      { id: 'Notes', l: 'Notes', on: !!ex.Notes, hot: true, kind: 'extra' },
      { id: 'sweep', l: 'Sweep', on: so.sweep === 'top', hot: true, kind: 'sweep' },
      { id: 'polarity', l: 'Polarity', on: movingIds.some((id) => !so.fall[id]) && !so.bounce, hot: true, kind: 'fall' },
      { l: 'Filter', on: false, hot: false },
      { l: 'CV Clock', on: false, hot: false },
    ];
    return {
      left,
      right,
      rDown: right.filter((d) => d.hot && d.on).map((d) => d.l),
      lDown: left.filter((d) => d.hot && d.on).map((d) => d.l),
    };
  }

  // Default: MOOD
  const right: DipSwitchItem[] = [
    { id: 'time', l: 'Time', on: !!so.move.time, hot: true, kind: 'move' },
    { id: 'modWet', l: 'Modify ●', on: !!so.move.modWet, hot: true, kind: 'move' },
    { id: 'length', l: 'Length', on: !!so.move.length, hot: true, kind: 'move' },
    { id: 'clock', l: 'Clock', on: !!so.move.clock, hot: true, kind: 'move' },
    { id: 'modMicro', l: 'Modify ○', on: !!so.move.modMicro, hot: true, kind: 'move' },
    { id: 'bounce', l: 'Bounce', on: !!so.bounce, hot: true, kind: 'bounce' },
    { l: 'Random', on: false, hot: false },
    { l: 'Trails', on: false, hot: false },
  ];
  const left: DipSwitchItem[] = [
    { id: 'time', l: 'Time', on: !so.bounce && !!so.move.time && !so.fall.time, hot: !so.bounce && !!so.move.time, kind: 'fall' },
    { id: 'modWet', l: 'Modify ●', on: !so.bounce && !!so.move.modWet && !so.fall.modWet, hot: !so.bounce && !!so.move.modWet, kind: 'fall' },
    { id: 'length', l: 'Length', on: !so.bounce && !!so.move.length && !so.fall.length, hot: !so.bounce && !!so.move.length, kind: 'fall' },
    { id: 'clock', l: 'Clock', on: !so.bounce && !!so.move.clock && !so.fall.clock, hot: !so.bounce && !!so.move.clock, kind: 'fall' },
    { id: 'modMicro', l: 'Modify ○', on: !so.bounce && !!so.move.modMicro && !so.fall.modMicro, hot: !so.bounce && !!so.move.modMicro, kind: 'fall' },
    { id: 'shape', l: 'Shape', on: so.shape === 'square', hot: true, kind: 'shape' },
    { id: 'sweep', l: 'Sweep', on: so.sweep === 'top', hot: true, kind: 'sweep' },
    { l: 'Miso', on: false, hot: false },
  ];
  return {
    left,
    right,
    rDown: right.filter((d) => d.hot && d.on).map((d) => d.l),
    lDown: left.filter((d) => d.hot && d.on).map((d) => d.l),
  };
}

export function explainSet(set: PedalSetup): string[] {
  const dev = set.device || 'mood';
  const knobs = PEDAL_RAMP_KNOBS[dev] || PEDAL_RAMP_KNOBS.mood;
  const moving = knobs.filter((k) => set.move[k[0]]);
  const ex = set.extras || {};
  const extraNames = (PEDAL_EXTRAS[dev] || []).filter(([id]) => ex[id]).map(([, label]) => label.toLowerCase());

  if (!moving.length) {
    if (extraNames.length) {
      return [`no knobs move; this set-up turns on ${extraNames.join(', ')} and stores where the knobs sit.`];
    }
    return ['nothing moves. this set-up only stores where the knobs sit.'];
  }
  const names = moving.map((k) => k[1]);
  const list = names.length === 1 ? names[0] : names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
  const one = moving.length === 1;
  const out: string[] = [];
  out.push(
    set.bounce
      ? `${list} ${one ? 'moves' : 'move'} back and forth on ${one ? 'its' : 'their'} own, over and over — like a hand wiggling ${one ? 'it.' : 'them.'}`
      : `${list} ${one ? 'glides' : 'glide'} once when the set-up loads, then ${one ? 'stays' : 'stay'} where ${one ? 'it lands.' : 'they land.'}`,
  );
  out.push(
    `the movement runs between where the knob is set and the ${set.sweep === 'top' ? 'top' : 'bottom'} of its travel. actions set that starting point.`,
  );
  if (!set.bounce) {
    out.push(moving.map((k) => `${k[1]}${set.fall[k[0]] ? ' falls' : ' rises'}`).join(', ') + '.');
  }
  if (extraNames.length) {
    out.push(`rear dip extras enabled: ${extraNames.join(', ')}.`);
  }
  const spInfo = PEDAL_SPEED_KNOB[dev] || PEDAL_SPEED_KNOB.mood;
  out.push(spInfo.note);
  if (dev === 'mood') {
    out.push("MOOD MkI can't follow MIDI clock, so the speed runs free rather than locking to tempo.");
  }
  return out;
}

export function setupsCompatible(A?: PedalSetup | null, B?: PedalSetup | null): boolean {
  if (!A || !B) return false;
  if ((A.device || 'mood') !== (B.device || 'mood')) return false;
  return !!A.bounce === !!B.bounce && A.sweep === B.sweep && (A.shape || 'tri') === (B.shape || 'tri');
}

export interface WalkStepsContext {
  controllerId: string;
  banks: Bank[];
  channels: Record<string, number>;
  onCreateSaveButton?: (so: PedalSetup) => void;
}

export function walkSteps(so: PedalSetup, ctx: WalkStepsContext): WalkthroughStep[] {
  const dev = so.device || 'mood';
  const devName = DEVICES[dev]?.faceName || DEVICES[dev]?.name || dev.toUpperCase();
  const ctrl = CONTROLLERS[ctx.controllerId] || CONTROLLERS.chocolate;
  const layout = getDipLayout(so);
  const { rDown, lDown } = layout;

  const dips: WalkthroughStep = {
    art: 'dips',
    title: `set the switches on ${devName}'s back`,
    body: `looking from behind, like the picture — only the outlined switches matter. right bank: push ${rDown.length ? rDown.join(', ') : 'nothing'} down, the other outlined ones up. left bank: push ${lDown.length ? lDown.join(', ') : 'nothing'} down, the other outlined ones up. anything not outlined, leave as it is.`,
  };

  if (so.slot <= 2 && (dev === 'mood' || dev === 'genloss')) {
    const side = so.slot === 1 ? 'right' : 'left';
    return [
      dips,
      {
        art: 'toggle',
        pos: side,
        title: `flick the preset toggle ${side}`,
        body: `the small toggle between ${devName}'s footswitches. ${side} is slot ${so.slot}.`,
      },
      {
        art: 'feet',
        feetLabel: 'hold ~3 seconds',
        title: 'hold both footswitches',
        body: `press both and keep holding for about three seconds, until ${devName} shows it's saved. it stores the switches and the knobs together.`,
      },
      {
        art: 'toggle',
        pos: 'mid',
        title: 'flick the toggle back to the middle',
        body: `${devName} goes back to running live. that's it — whenever an action needs “${so.name}”, scribble calls it up for you.`,
      },
    ];
  }

  let where: { bi: number; k: string; a: string } | null = null;
  ctx.banks.forEach((b, bi) =>
    Object.keys(b).forEach((k) =>
      ACTIONS.forEach((a) => {
        if (!where && b[k][a.id].some((x) => x.control === 'pc' && x.set === so.id)) {
          where = { bi, k, a: a.label };
        }
      }),
    ),
  );

  const w = where as { bi: number; k: string; a: string } | null;
  const whereLabel = w
    ? `${ctrl.nav ? 'p' + String(w.bi + 1).padStart(3, '0') + ' ' + ({ L: 'left', R: 'right' }[w.k] || w.k) : 'switch ' + w.k} · ${w.a}`
    : null;

  const saveScreen = `SAVE ${dev.toUpperCase().slice(0, 6)}`;
  const helper =
    !where && ctrl.nav && ctx.onCreateSaveButton
      ? {
          label: 'put a save button on p128',
          run: () => ctx.onCreateSaveButton?.(so),
        }
      : null;

  return [
    dips,
    {
      art: 'scribble',
      screen: whereLabel ? whereLabel.toUpperCase() : saveScreen,
      helper,
      title: whereLabel ? `find ${whereLabel} on scribble` : 'give scribble a save button',
      body: whereLabel
        ? `that button already sends “load slot ${so.slot}”. pressed while ${devName}'s footswitches are held, the same message saves instead — so it doubles as your save button.`
        : ctrl.nav
          ? `one tap below puts “${saveScreen}” on p128. export to scribble once so the button exists.`
          : `set any spare controller switch to send program change ${so.slot} on channel ${ctx.channels[dev] || 2}.`,
    },
    {
      art: 'feet',
      feetLabel: "hold, don't let go",
      title: `hold both ${devName} footswitches`,
      body: `press both and keep holding — that's what tells ${devName} to save rather than load.`,
    },
    {
      art: 'scribble',
      screen: whereLabel ? whereLabel.toUpperCase() : saveScreen,
      title: 'while holding, press it on scribble',
      body: `then let go of ${devName}'s footswitches. slot ${so.slot} now holds this set-up.`,
    },
  ];
}

