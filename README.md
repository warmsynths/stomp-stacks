# Stomp Stacks 🎛️⚡

> **A visual macro-mapper and MIDI compiler that removes the friction from modern pedalboard and foot-controller workflows.**

---

## Inspiration & Motivation

Modern MIDI foot controllers (like the **M-Vave Chocolate** or **Morningstar MC3**) and digital effect pedals (such as the **Chase Bliss Blooper**, **MOOD**, and **Strymon El Capistan**) are incredibly powerful. They offer deep parameter controls, flexible MIDI implementation, and extensive macro potential.

**Despite all this power, configuring them is still full of friction:**

* Digging through user manuals and PDFs to lookup arbitrary CC numbers.
* Translating physical knob positions (e.g. "9 o'clock", "noon") into 0–127 byte values.
* Manually typing hex/decimal values into clumsy software windows or mobile apps.
* Mentally keeping track of multi-pedal macro stacks across tap, hold, and double-tap actions.

**Stomp Stacks was built to eliminate this friction.**

Instead of managing spreadsheets of CC numbers and byte strings, Stomp Stacks gives you an **interactive, photorealistic faceplate canvas**. Select a switch on your foot controller, tap or turn knobs directly on photos of your physical pedals, and let Stomp Stacks handle all the byte math, hardware channel routing, and configuration compiler output.

---

## Key Features

- 🎨 **Visual & Tactile Mapping**: Poke knobs, flip toggles, and tap footswitches directly on high-resolution pedal faceplate graphics.
- ⚡ **Multi-Action Macro Stacks**: Build multi-step macro sequences (up to 8 steps per trigger) bound to **Tap**, **Hold**, and **Double-tap** actions on any footswitch.
- 🧠 **Relay Hub & Brain Integration**: Target smart relay hubs (**Pirate MIDI Scribble**) to supercharge compact "dumb" controllers with macro capabilities, or compile for controllers with onboard macro memory (**Morningstar MC3**).
- ⚙️ **Automatic MIDI Compiler**: Converts your visual macro stacks into compiled raw MIDI CC byte streams (`0xB0 + channel`, CC, Value) and exports ready-to-flash JSON configurations (`scribble.json`).
- 🎚️ **Built-in Discrete Values**: Quick selection for standard knob sweeps (*min*, *9 o'clock*, *noon*, *3 o'clock*, *max*) and discrete toggle switch positions.
- 📱 **Fluid Responsive UI**: Designed with a whimsical cream-paper and sticker-shadow aesthetic that reshapes dynamically across phone, tablet, and desktop viewports.

---

## Supported Gear

### Foot Controllers
| Device | Switches | Banks | Description |
| :--- | :---: | :---: | :--- |
| **M-Vave Chocolate** | 4 | 4 | Ultra-compact 4-switch foot controller. Relies on external relay hubs (like Pirate MIDI Scribble) for macro expansion. |
| **Morningstar MC3** | 3 | 30 | High-performance smart controller with OLED display and onboard macro memory. |

### Brains & Relay Hubs
| Brain | Max Steps / Action | Banks | Description |
| :--- | :---: | :---: | :--- |
| **Pirate MIDI Scribble** | 8 | 16 | External USB-C / TRS relay hub. Listens to single stomps and fans out multi-pedal macro stacks. |
| **Controller Onboard** | 16 | 3 | Direct macro storage on capable smart controllers (MC3). |
| **Direct (No Brain)** | 1 | 16 | 1-to-1 switch action pass-through directly to pedals. |

### Pedals & Device Dictionary
| Pedal | MIDI Channel | Included Parameters |
| :--- | :---: | :--- |
| **Chase Bliss Blooper** | Ch 3 | Ramp/Volume, Layers, Repeats, Mod A/B, Mod Channels, Additive/Sampling Modes, Undo/Redo, Stomp Switches (Zero-based PC support). |
| **Chase Bliss MOOD** | Ch 2 | Time, Mix, Length, Modify Wet/Micro, Clock Speed, Wet/Micro Modes, Routing, Independent Channel Bypasses (CC 102/103). |
| **Strymon El Capistan** | Ch 1 | Time, Mix, Tape Age, Repeats, Wow & Flutter, Spring, Tape Head, Mode, Tap Tempo, On/Bypass (CC 102). |

---

## Project Structure

```
src/
├── compiler/       # MIDI byte math + hardware config.json generation & export
├── components/     # Lit web components (pedal canvas, macro builder, controller graphic, modals)
├── data/           # Typed device dictionaries, controller defs, and relay brain specs
├── state/          # EventTarget reactive store & Lit StoreController integration
├── styles/         # Shared CSS tokens, color palettes, and typography
└── types/          # TypeScript interfaces for macro steps, scribble schemas, and state
```

---

## Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/warmsynths/stomp-stacks.git
cd stomp-stacks

# Install dependencies
npm install

# Start local development server
npm run dev

# Run unit tests
npm run test

# Typecheck and build for production (outputs to docs/)
npm run build

# Preview production build
npm run preview
```

---

## How the Compiler Works

1. Each pedal in the **Device Dictionary** (`src/data/devices.ts`) defines its physical MIDI channel and fixed CC parameters.
2. When you add or adjust a step in a macro stack:
   - `statusByte = 0xB0 + (channel - 1)`
   - `dataByte1 = control.cc`
   - `dataByte2 = value (0-127)`
3. When you export, `src/compiler/midi.ts` compiles the active bank, footswitch, and action triggers into a clean hardware configuration file (`scribble.json`) ready for upload to your relay box or controller.

---

## License

This project is licensed under the **GNU General Public License v3.0** (GPL-3.0). See the [LICENSE](LICENSE) file for details.
