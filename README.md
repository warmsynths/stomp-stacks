# stomp stacks

Visual macro-mapper for a "dumb" MIDI foot controller (M-Vave Chocolate or
Morningstar MC3) driving up to three pedals (Blooper, MOOD, El Capistan)
through a Pirate MIDI Scribble hub. Pick a switch, poke knobs/switches on a
photo of the real pedal, and it builds a per-switch macro stack (up to 8
steps, across tap/hold/double-tap) that compiles down to raw MIDI CC bytes.

Implemented from the `Controller Mapper Mobile.dc.html` Claude Design
prototype — the single file that already reshapes itself across phone,
tablet and desktop off one 760px breakpoint — styled per its "whimsy"
cream-paper/sticker-shadow design language.

## Stack

Lit 3 + TypeScript, built with Vite. No UI framework beyond Lit; state lives
in a plain `EventTarget`-based store (`src/state/store.ts`) that components
observe via a small `ReactiveController` (`src/state/store-controller.ts`).

```
src/data/           device & controller dictionaries (typed, ported 1:1 from the prototype)
src/state/          the reactive store + its Lit glue
src/compiler/        MIDI byte math + config.json generation + download
src/components/      Lit elements (pedal-canvas, macro-panel, controller-graphic, modals, app shell)
src/styles/          shared design tokens / CSS fragments
public/assets/       pedal faceplate photos
```

## Run it

```
npm install
npm run dev      # dev server
npm run build    # typecheck + production build to docs/
npm run preview  # serve the production build
```

## The compiler & config.json schema

`src/compiler/midi.ts` implements the Device Dictionary + Compiler Engine:
each pedal owns a fixed physical MIDI channel (El Capistan = 1, MOOD = 2,
Blooper = 3) and each control a fixed CC number within that channel. A step
resolves to `statusByte = 0xB0 + (channel - 1)`, `dataByte1 = cc`,
`dataByte2 = value` (0–127; footswitches always send 127).

**Caveat:** we don't have a real config.json exported from a physical Pirate
MIDI Scribble unit to merge into, so `compileConfig()` produces a
self-contained document in the shape described in the hardware spec
(`presetSettings[].presetMessages.messages`, one preset per populated
bank/switch/action trigger). If you can export a real base config from the
hardware, swap it in as the top-level template around `presetSettings` —
that's the only part this app generates.

## Known gaps vs. the design

- MOOD's bottom-centre toggle is labelled "Bypass mode" and the wet vs.
  micro-looper footswitch assignment is a best guess, per the original
  design chat — worth confirming against the real pedal.
- The controller-picker and settings modals only offer what's in the
  prototype (2 controllers, photo/sketch toggle); the settings modal is
  structured to take more setting groups later.
