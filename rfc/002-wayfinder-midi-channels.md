# Wayfinder Map: MIDI Channel Discovery

## Destination

Working code merged that surfaces a Chase Bliss pedal's current MIDI channel in the debugging panel to eliminate debugging friction, and optionally allows setting it via a guided UI flow.

## Notes

- **Domain:** MIDI (SysEx, CC, PC), React, Web MIDI API.
- **Scope:** Chase Bliss pedals only for now.
- **Research Note:** Chase Bliss pedals **do not** natively support querying their MIDI channel via SysEx. They use a hardware-based "MIDI Learn" process (hold both switches on boot, then send a PC message on the desired channel).

## Decisions so far

- **Diagnostic Flow:** We will build *both* a "Channel Sweeper" (Discovery) flow and a "Guided Set" flow in the channel selector popover (see [Ticket 1](file:///c:/reyn/Projects/stomp-stacks/rfc/002a-ticket-diagnostic-flow.md)).
- **State Persistence:** The confirmed channel will be written back to the global app state using `StompStore.setPedalChannel(id, channel)`.
- **UI Components:** The pedal channel selector popover will host a new section for MIDI channel diagnostic tools, rendering the sweeper controls and the guided wizard steps beneath the manual channel selection.

## Frontier (Open Tickets)

*(None, map is clear. Ready for `/to-spec`)*

## Out of scope

- Generic MIDI channel identification for non-Chase Bliss pedals.
