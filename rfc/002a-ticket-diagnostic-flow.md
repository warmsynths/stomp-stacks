# Ticket 1: Design the Diagnostic & Set Flow

**Type:** `wayfinder:prototype` (HITL)
**Status:** Resolved

## Question

Since Chase Bliss pedals do not support querying their MIDI channel via SysEx, we cannot just add a "Get Channel" button that magically reads the value. 

Based on research, setting a channel on a Chase Bliss pedal requires a manual hardware flow:
1. Unplug power.
2. Hold both stomp switches.
3. Plug in power (keep holding until boot finishes).
4. Release switches.
5. Send a Program Change (PC) message on the desired channel.

**How should we build the UX in the debugging panel to solve the user's friction?**

## Decision

**Option 3: Both**

We will build both tools directly into the **pedal channel selector popover** (rather than a separate modal/panel) so they are contextually available exactly where the user goes to change a channel:
1. **The "Channel Sweeper" (Discovery) Flow:** A tool that sends a safe, visible CC message (like toggling bypass) across channels 1-16. It will highlight the current channel being tested, and the user can stop the sweep when they see their physical pedal react.
2. **The "Guided Set" Flow:** A wizard-like flow that walks the user through the 5 hardware steps to manually re-assign the pedal's MIDI channel, providing a button to send the final PC message on the newly desired channel.
