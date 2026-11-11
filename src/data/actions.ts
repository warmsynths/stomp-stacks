// Musical Action presets across Capabilities and Pedals.

import type { CapabilityId } from './capabilities.js';
import type { Message } from '../state/types.js';

export interface ActionDef {
  id: string;
  name: string;
  caps: CapabilityId[];
  what: string;
  steps: Message[];
}

const st_ = (device: string, control: string, value?: number | string | null): Message => ({
  device,
  control,
  value: value === null || value === undefined ? null : Number(value),
});

export const SEED_ACTIONS: ActionDef[] = [
  // --- Cross-Pedal & Conductor Actions ---
  {
    id: 'a1',
    name: 'scene drop',
    caps: ['conductor', 'loop', 'buffer'],
    what: 'slows the loop and freezes a texture on the same stomp.',
    steps: [st_('blooper', 'modA', 32), st_('mood', 'microloop')],
  },
  {
    id: 'a2',
    name: 'neutral start',
    caps: ['conductor'],
    what: 'puts both pedals back to a known place at the top of a song.',
    steps: [st_('blooper', 'stability', 0), st_('mood', 'mix', 64), st_('mood', 'wetmode', 1)],
  },
  {
    id: 'a3',
    name: 'octave down',
    caps: ['buffer'],
    what: 'steps the clock down so the micro-loop plays lower.',
    steps: [st_('mood', 'clock', 32)],
  },
  {
    id: 'a4',
    name: 'freeze on decay',
    caps: ['buffer'],
    what: "stretch mode, then catch whatever's ringing — stomp after the pick, not on it.",
    steps: [st_('mood', 'micromode', 3), st_('mood', 'microloop')],
  },
  {
    id: 'a5',
    name: 'tape chirps',
    caps: ['buffer'],
    what: 'tape mode with modify pushed up — short forward and backward rhythms.',
    steps: [st_('mood', 'micromode', 2), st_('mood', 'modMicro', 96)],
  },
  {
    id: 'a6',
    name: 'clock wiggle',
    caps: ['buffer', 'glue'],
    what: 'the clock knob moves back and forth by itself, like a hand wiggling it.',
    steps: [{ device: 'mood', control: 'pc', set: 'clockwig', value: null }, st_('mood', 'clock', 64), st_('mood', 'mix', 32)],
  },
  {
    id: 'a7',
    name: 'sink it',
    caps: ['glue'],
    what: 'pulls the wet mix down so the textures sit under your playing.',
    steps: [st_('mood', 'mix', 32)],
  },
  {
    id: 'a8',
    name: 'wash the loop',
    caps: ['glue', 'buffer'],
    what: 'sends the micro-loops through the reverb.',
    steps: [st_('mood', 'routing', 2), st_('mood', 'wetmode', 1)],
  },
  {
    id: 'a9',
    name: 'smear swell',
    caps: ['glue'],
    what: 'the reverb smear rises once and stays up.',
    steps: [{ device: 'mood', control: 'pc', set: 'smearswell', value: null }, st_('mood', 'modWet', 32), st_('mood', 'mix', 64)],
  },
  {
    id: 'a10',
    name: 'record / play',
    caps: ['loop'],
    what: 'first stomp records, the next one plays.',
    steps: [st_('blooper', 'record')],
  },
  {
    id: 'a11',
    name: 'tape wear',
    caps: ['loop', 'wear'],
    what: 'turns stability up for drift and warble.',
    steps: [st_('blooper', 'stability', 96)],
  },
  {
    id: 'a12',
    name: 'undo a layer',
    caps: ['loop'],
    what: 'takes the last overdub off.',
    steps: [st_('blooper', 'undo', 0)],
  },

  // --- Expanded Blooper Actions ---
  {
    id: 'a13',
    name: 'overdub layer',
    caps: ['loop'],
    what: 'drops straight into overdub without stopping the phrase.',
    steps: [st_('blooper', 'overdub')],
  },
  {
    id: 'a14',
    name: 'clean stop',
    caps: ['loop', 'conductor'],
    what: 'stops the loop cleanly on the stomp.',
    steps: [st_('blooper', 'stop')],
  },
  {
    id: 'a15',
    name: 'redo layer',
    caps: ['loop'],
    what: 'brings back the layer you just undid.',
    steps: [st_('blooper', 'redo')],
  },
  {
    id: 'a16',
    name: 'additive bake',
    caps: ['loop', 'wear'],
    what: 'switches to additive mode with light stability so modifiers bake into the loop.',
    steps: [st_('blooper', 'mode', 2), st_('blooper', 'stability', 48), st_('blooper', 'repeats', 127)],
  },
  {
    id: 'a17',
    name: 'frippertronics fade',
    caps: ['loop', 'glue'],
    what: 'sets repeats below max so older layers gently dissolve behind new ones.',
    steps: [st_('blooper', 'mode', 1), st_('blooper', 'repeats', 48)],
  },
  {
    id: 'a18',
    name: 'half-speed drop',
    caps: ['loop', 'conductor'],
    what: 'engages Mod A stepped speed down an octave.',
    steps: [st_('blooper', 'modA_sel', 2), st_('blooper', 'modA', 32), st_('blooper', 'modA_on', 127)],
  },
  {
    id: 'a19',
    name: 'stutter scramble',
    caps: ['loop', 'buffer'],
    what: 'turns on Mod B scrambler at medium intensity to shuffle the phrase.',
    steps: [st_('blooper', 'modB_sel', 1), st_('blooper', 'modB', 96), st_('blooper', 'modB_on', 127)],
  },
  {
    id: 'a20',
    name: 'clear modifiers',
    caps: ['loop', 'conductor'],
    what: 'turns both Mod A and Mod B off and resets stability.',
    steps: [st_('blooper', 'modA_on', 0), st_('blooper', 'modB_on', 0), st_('blooper', 'stability', 0)],
  },
  {
    id: 'a21',
    name: 'mod a wiggle',
    caps: ['loop'],
    what: 'loads the Blooper dip set-up so Mod A sweeps back and forth automatically.',
    steps: [{ device: 'blooper', control: 'pc', set: 'bloopmodwig', value: null }, st_('blooper', 'modA', 32), st_('blooper', 'rampOn', 127), st_('blooper', 'rampSpeed', 48)],
  },
  {
    id: 'a22',
    name: 'stability breathe',
    caps: ['loop', 'wear'],
    what: 'loads the Blooper dip set-up that gently swells and recedes tape wear.',
    steps: [{ device: 'blooper', control: 'pc', set: 'bloopwearwig', value: null }, st_('blooper', 'stability', 16), st_('blooper', 'rampOn', 127), st_('blooper', 'rampSpeed', 32)],
  },

  // --- Expanded MOOD Actions ---
  {
    id: 'a23',
    name: 'slip octave up',
    caps: ['buffer', 'glue'],
    what: 'switches the wet channel to Slip mode pitched an octave up.',
    steps: [st_('mood', 'wetmode', 3), st_('mood', 'time', 96), st_('mood', 'modWet', 64), st_('mood', 'wet', 127)],
  },
  {
    id: 'a24',
    name: 'envelope stutter',
    caps: ['buffer'],
    what: 'puts the micro-looper in envelope mode so every pick attack re-triggers the freeze.',
    steps: [st_('mood', 'micromode', 1), st_('mood', 'modMicro', 80), st_('mood', 'microloop', 127)],
  },
  {
    id: 'a25',
    name: 'clocked delay trails',
    caps: ['glue'],
    what: 'switches the wet side to delay mode with warm low-clock repeats.',
    steps: [st_('mood', 'wetmode', 2), st_('mood', 'time', 64), st_('mood', 'modWet', 64), st_('mood', 'clock', 48)],
  },
  {
    id: 'a26',
    name: 'drone bed',
    caps: ['buffer', 'glue'],
    what: 'engages both MOOD channels in stretch + smeared reverb for an instant ambient pad.',
    steps: [st_('mood', 'micromode', 3), st_('mood', 'wetmode', 1), st_('mood', 'routing', 2), st_('mood', 'modWet', 96), st_('mood', 'both', 127)],
  },
  {
    id: 'a27',
    name: 'bypass mood',
    caps: ['conductor'],
    what: 'cleanly bypasses both channels of MOOD.',
    steps: [st_('mood', 'both', 0)],
  },

  // --- El Capistan Actions ---
  {
    id: 'a28',
    name: 'warm slapback',
    caps: ['glue'],
    what: 'fixed head, short time, low repeats — classic studio tape slap.',
    steps: [st_('elcap', 'head', 1), st_('elcap', 'cmode', 1), st_('elcap', 'time', 28), st_('elcap', 'repeats', 24), st_('elcap', 'mix', 56), st_('elcap', 'onoff', 127)],
  },
  {
    id: 'a29',
    name: 'multi-head wash',
    caps: ['glue'],
    what: 'multi-head mode with generous spring reverb and high repeats for rhythmic clouds.',
    steps: [st_('elcap', 'head', 2), st_('elcap', 'cmode', 2), st_('elcap', 'repeats', 84), st_('elcap', 'spring', 80), st_('elcap', 'mix', 68)],
  },
  {
    id: 'a30',
    name: 'worn reel echo',
    caps: ['glue', 'wear'],
    what: 'cranks tape age, wow & flutter, and crinkle for a chewed-up cassette echo.',
    steps: [st_('elcap', 'tapeAge', 96), st_('elcap', 'wow', 88), st_('elcap', 'tapeCrinkle', 80), st_('elcap', 'lowEnd', 64)],
  },
  {
    id: 'a31',
    name: 'infinite runaway',
    caps: ['glue', 'conductor'],
    what: 'engages El Capistan infinite hold so the repeats oscillate without dying out.',
    steps: [st_('elcap', 'hold', 127)],
  },
  {
    id: 'a32',
    name: 'release runaway',
    caps: ['glue', 'conductor'],
    what: 'releases infinite hold and drops repeats back to a safe trail.',
    steps: [st_('elcap', 'hold', 0), st_('elcap', 'repeats', 52)],
  },
  {
    id: 'a33',
    name: 'sound-on-sound looper',
    caps: ['loop', 'glue'],
    what: 'switches El Capistan into Single Head Mode C (SOS tape looper) at half speed.',
    steps: [st_('elcap', 'head', 3), st_('elcap', 'cmode', 3), st_('elcap', 'speed', 127), st_('elcap', 'onoff', 127)],
  },
  {
    id: 'a34',
    name: 'spring-only verb',
    caps: ['glue'],
    what: 'pulls echo repeats to zero and pushes the hidden spring tank up.',
    steps: [st_('elcap', 'repeats', 0), st_('elcap', 'spring', 108), st_('elcap', 'mix', 64)],
  },

  // --- Generation Loss MKII Actions ---
  {
    id: 'a35',
    name: 'vhs camcorder',
    caps: ['wear'],
    what: 'mild wow, heavy flutter, and camcorder filter model with subtle hiss.',
    steps: [st_('genloss', 'wow', 56), st_('genloss', 'flutter', 84), st_('genloss', 'model', 48), st_('genloss', 'noise', 2), st_('genloss', 'bypass', 127)],
  },
  {
    id: 'a36',
    name: 'chewed cassette',
    caps: ['wear'],
    what: 'pushes saturation and failure up with random tape snags enabled.',
    steps: [st_('genloss', 'saturate', 92), st_('genloss', 'failure', 96), st_('genloss', 'snag', 127), st_('genloss', 'wow', 80)],
  },
  {
    id: 'a37',
    name: 'tape stop drop',
    caps: ['wear', 'conductor'],
    what: 'sets Aux to Stop mode and triggers a dramatic tape-stop pitch dive.',
    steps: [st_('genloss', 'aux', 1), st_('genloss', 'auxSw', 127)],
  },
  {
    id: 'a38',
    name: 'release aux',
    caps: ['wear', 'conductor'],
    what: 'releases the Generation Loss Aux switch so playback resumes.',
    steps: [st_('genloss', 'auxSw', 0)],
  },
  {
    id: 'a39',
    name: 'classic gen loss',
    caps: ['wear'],
    what: 'flips into Classic MK1 mode with unity dry blend for lo-fi chorus.',
    steps: [st_('genloss', 'classic', 127), st_('genloss', 'dry', 3), st_('genloss', 'wow', 64), st_('genloss', 'flutter', 48)],
  },
  {
    id: 'a40',
    name: 'wide stereo warble',
    caps: ['wear', 'glue'],
    what: 'loads the stereo spread dip set-up so wow drifts in opposite phase across L/R.',
    steps: [{ device: 'genloss', control: 'pc', set: 'stereochorus', value: null }, st_('genloss', 'wow', 48), st_('genloss', 'volume', 64)],
  },
  {
    id: 'a41',
    name: 'classic wow wiggle',
    caps: ['wear'],
    what: 'loads the classic wiggle set-up so wow and flutter sweep on their own.',
    steps: [{ device: 'genloss', control: 'pc', set: 'classicwiggle', value: null }, st_('genloss', 'wow', 32), st_('genloss', 'volume', 48)],
  },

  // --- Full-Rig Multi-Pedal Scene Actions ---
  {
    id: 'a42',
    name: 'nostalgia dissolve',
    caps: ['conductor', 'wear', 'glue'],
    what: 'freezes MOOD, kicks on El Capistan multi-head wash, and drapes Gen Loss VHS wear over the whole rig.',
    steps: [st_('mood', 'microloop', 127), st_('elcap', 'head', 2), st_('elcap', 'mix', 68), st_('genloss', 'wow', 64), st_('genloss', 'bypass', 127)],
  },
  {
    id: 'a43',
    name: 'all-home reset',
    caps: ['conductor'],
    what: 'returns Blooper, MOOD, El Capistan, and Gen Loss to clean, predictable settings.',
    steps: [st_('blooper', 'stability', 0), st_('mood', 'mix', 48), st_('elcap', 'hold', 0), st_('elcap', 'repeats', 40), st_('genloss', 'auxSw', 0), st_('genloss', 'bypass', 0)],
  },
  {
    id: 'a44',
    name: 'dub echo freeze',
    caps: ['conductor', 'buffer', 'glue'],
    what: 'catches a micro-loop in MOOD while spiking El Capistan repeats and spring tank.',
    steps: [st_('mood', 'microloop', 127), st_('elcap', 'repeats', 96), st_('elcap', 'spring', 88)],
  },
  {
    id: 'a45',
    name: 'worn loop handoff',
    caps: ['conductor', 'loop', 'wear'],
    what: 'puts Blooper into playback and engages Gen Loss saturation so the loop sounds like an old reel.',
    steps: [st_('blooper', 'play'), st_('blooper', 'stability', 64), st_('genloss', 'saturate', 80), st_('genloss', 'bypass', 127)],
  },
  {
    id: 'a46',
    name: 'ambient blackout',
    caps: ['conductor', 'loop', 'glue'],
    what: 'stops Blooper while holding El Capistan repeats and swelling MOOD reverb into the gap.',
    steps: [st_('blooper', 'stop'), st_('elcap', 'hold', 127), st_('mood', 'wetmode', 1), st_('mood', 'mix', 88)],
  },
];

