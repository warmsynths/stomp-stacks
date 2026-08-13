# 02 — Vertical Slice: The Channel Sweeper Flow

**What to build:** The complete ability to discover a channel. It adds the "Find my channel" option to the Help view. It implements the looping logic to send CC messages via the global store, updates the UI to show the active test channel, and provides the "Stop & Select" button to lock it in.

**Blocked by:** 01 — Vertical Slice: The Guided Set Flow

**Status:** ready-for-agent

- [ ] "Find my channel" (Sweeper) option added to the Help view alongside the Guided Set option.
- [ ] Clicking it starts automated CC message sweep across channels 1-16.
- [ ] UI highlights the channel currently being tested.
- [ ] "Stop & Select" button stops the sweep and saves the discovered channel to `StompStore`.
