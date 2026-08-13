# Ticket 2: The Guided Set Tool

**Goal:** Implement the Guided Set wizard feature end-to-end (UI, State, and MIDI logic).

**Blockers:** None.

## Requirements
### State & Logic (`src/state/store.ts`, `src/state/types.ts`)
- Add state for the Guided Set tool in `src/state/types.ts` (e.g., `channelGuidedStep`).
- Add action `setGuidedStep(step)` to navigate the wizard.
- Add action `sendGuidedPC(channel)` to `StompStore`.
  - Must call `midiService.sendProgramChange(channel, 0)` (or an appropriate program number based on the pedal's pcOffset).
  - Must update the global `channels` state via `setPedalChannel(id, channel)`.

### UI (`src/components/connect-modal.ts`)
- In the same "channel tools" sub-panel created in Ticket 1, render a tab or section for the Guided Set UI.
- Render the Guided Set UI:
  - A step-by-step list of instructions (1. Unplug, 2. Hold switches, etc.).
  - A dropdown to pick the new channel.
  - A big "Send PC Message" button to execute step 5.
