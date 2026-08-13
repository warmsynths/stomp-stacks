# 01 — Vertical Slice: The Guided Set Flow

**What to build:** The complete ability to manually set a channel. It adds the "Need help?" button to the popover which opens the "Help" view. This view contains the 5-step wizard, the dropdown, and the button that sends the final PC message via the global MIDI store. It also implements the ephemeral state (closing the popover resets back to the 1-16 grid).

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] "Need help?" button added to the 1-16 channel grid popover.
- [ ] Clicking it swaps the UI to the Guided Set wizard (5 steps).
- [ ] Includes dropdown to pick target channel and "Send PC" confirmation button.
- [ ] Button sends PC message on selected channel via `StompStore`.
- [ ] Closing popover discards state (re-opening shows standard 1-16 grid).
