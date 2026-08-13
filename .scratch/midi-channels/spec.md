# Specification: MIDI Channel Tools

**Labels:** `ready-for-agent`

## Problem Statement

Users struggle with debugging MIDI mappings when the channel assigned in Stomp Stacks doesn't match the pedal's actual hardware channel. Chase Bliss pedals in particular do not support SysEx channel queries, meaning the app cannot automatically sync this state without user intervention. The user needs a frictionless way to identify or set the MIDI channel of their physical pedal, and this needs to be contextually available precisely when they are configuring the channel in the UI.

## Solution

Build diagnostic and configuration flows (Channel Sweeper and Guided Set) directly into the **pedal channel selector popover**. By moving this out of the global connect modal/debugging panel, users have direct contextual access to these tools where they already go to pick a channel. The flow uses a "Need help?" transition to swap between standard selection and the diagnostic tools.

## User Stories

1. As a musician, I want a "Need help?" or "Find/Set channel" option below the standard 1-16 channel grid, so that I can access tools to resolve channel mismatches without leaving the context of the pedal.
2. As a musician, I want a "Find my channel" (Sweeper) tool that cycles through channels sending a safe CC message, so that I can visually identify which channel my pedal is currently listening to (e.g. by seeing a physical LED flash).
3. As a musician, I want a "Set a new channel" (Guided Set) wizard that walks me through the hardware MIDI Learn steps, so that I can safely configure a new channel and lock it in by sending the final PC message directly from the UI.
4. As a user, I want the popover to cleanly discard any wizard state when I close it, so that the next time I open the popover it defaults back to the standard 1-16 grid without confusion.
5. As a musician, I want my selected or discovered channel to automatically persist to the application's global state, so that subsequent MIDI messages route correctly to this pedal.

## Implementation Decisions

- **UI Location:** The diagnostic tools will be built into the existing pedal channel selector popover in the `device-tabs` component, rather than as a separate debugging panel or connect modal.
- **State Transition:** The popover will have a "Need help?" button. Clicking it swaps the view to a "Help" view offering the Sweeper and Guided Set buttons.
- **Ephemeral State:** The popover discards its wizard state on close (e.g. clicking outside). When re-opened, it defaults to the simple 1-16 grid.
- **Direct MIDI Access:** The popover component will connect directly to the global MIDI store to send test CC messages and the PC confirmation message, rather than having callbacks passed down from parent components.
- **Cleanup:** Remove the existing prototype of the "Guided Channel Setup" from `src/components/connect-modal.ts` as its responsibility now belongs to `device-tabs.ts`.

## Testing Decisions

- A good test should verify the external behavior of the UI: clicking the "Need help?" button shows the diagnostic options, and closing the popover resets this state.
- **Modules Tested:** The rendering logic inside `src/components/device-tabs.ts` for the channel selector popover.
- We will mock the global store's MIDI sending functions to ensure that starting the Sweeper emits the correct sequence of CC messages, and that finishing the Guided Set emits the correct PC message.

## Out of Scope

- Automated SysEx channel detection (Chase Bliss pedals don't support it).
- Generic channel setup for non-Chase Bliss pedals.
- Persisting wizard state across popover openings.

## Further Notes

- Chase Bliss MIDI learn process: 1) Unplug power. 2) Hold both stomp switches. 3) Plug in power (keep holding until boot finishes). 4) Release switches. 5) Send a PC message on the desired channel.
