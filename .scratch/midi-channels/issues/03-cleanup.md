# 03 — Cleanup connect-modal.ts

**What to build:** Removes the now-obsolete prototype of the "Guided Channel Setup" from the `connect-modal.ts` component, keeping our codebase clean and consolidating all channel logic into the popover.

**Blocked by:** 01 — Vertical Slice: The Guided Set Flow, 02 — Vertical Slice: The Channel Sweeper Flow

**Status:** ready-for-agent

- [ ] Remove the old Guided Channel Setup prototype UI from `connect-modal.ts`.
- [ ] Clean up any orphaned state variables inside `connect-modal.ts` that were only used for that setup.
