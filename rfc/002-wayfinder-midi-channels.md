# Wayfinder Map: MIDI Channel Discovery

## Destination

Working code merged that surfaces a Chase Bliss pedal's current MIDI channel in the debugging panel to eliminate debugging friction, and optionally allows setting it via a guided UI flow.

## Notes

- **Domain:** MIDI (SysEx, CC, PC), React, Web MIDI API.
- **Scope:** Chase Bliss pedals only for now.
- **Research Note:** Chase Bliss pedals **do not** natively support querying their MIDI channel via SysEx. They use a hardware-based "MIDI Learn" process (hold both switches on boot, then send a PC message on the desired channel).

## Decisions so far

*(None yet)*

## Frontier (Open Tickets)

- [Ticket 1: Design the Diagnostic & Set Flow](file:///c:/reyn/Projects/stomp-stacks/rfc/002a-ticket-diagnostic-flow.md) (wayfinder:prototype) — Since we cannot automatically query the pedal for its channel via SysEx, how do we build a UI that helps the user figure out the current channel, or guides them through the hardware "MIDI Learn" process?

## Not yet specified

- What specific UI components need to be added to the debugging panel?
- Do we build a "Sweep all channels" diagnostic tool (e.g. sending a toggle CC to channels 1-16 and asking the user to watch the pedal's LED)?
- How do we persist the confirmed channel back into the Stomp Stacks app state so the rest of the app uses it correctly?

## Out of scope

- Generic MIDI channel identification for non-Chase Bliss pedals.
