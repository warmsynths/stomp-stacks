# Ticket 1: The Channel Sweeper Tool

**Goal:** Implement the Channel Sweeper feature end-to-end (UI, State, and MIDI logic).

**Blockers:** None.

## Requirements
### State & Logic (`src/state/store.ts`, `src/state/types.ts`)
- Add state to `src/state/types.ts` for the sweeper (e.g., `channelToolOpen`, `channelSweeperActive`, `channelSweeperCurrent`).
- Add `startChannelSweep()` to `StompStore` which uses `setInterval` to loop channels 1-16.
  - In each tick, call `midiService.sendControlChange(ch, 1, 127)` (assuming CC 1 is safe/visible for Chase Bliss).
  - Update `channelSweeperCurrent` state.
- Add `stopChannelSweep()` to clear the interval.
- Add `confirmChannel(channel)` to update `StompStore.channels` and close the tool.

### UI (`src/components/connect-modal.ts`)
- Next to Chase Bliss devices in the connection list, add a "channel tools" button.
- When clicked, expand a sub-panel below the device (or overlay).
- Render the Sweeper UI:
  - Big "Start Sweep" button.
  - When active, show a pulsing indicator with the current channel (1-16).
  - "Stop & Select" button.
