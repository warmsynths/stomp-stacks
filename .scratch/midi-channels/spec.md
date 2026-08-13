# Specification: MIDI Channel Tools

## Background
Users struggle with debugging MIDI mappings when the channel assigned in Stomp Stacks doesn't match the pedal's actual hardware channel. Chase Bliss pedals in particular do not support SysEx channel queries, meaning the app cannot automatically sync this state without user intervention.

## Goal
Provide tools inside the connection / debugging panel that eliminate MIDI channel friction for Chase Bliss pedals.

## Requirements
The connection panel must expose two specific diagnostic flows:

1. **The Channel Sweeper (Discovery Flow)**
   - A tool that loops through MIDI channels 1-16.
   - It sends a safe, visible CC message on each channel (e.g. CC 1 to simulate a tap).
   - It highlights the current channel being tested in the UI.
   - It provides a "Stop & Select" button. When the user sees their physical pedal react (e.g. an LED flashes), they stop the sweep to lock in that channel.

2. **The Guided Set (Configuration Flow)**
   - A step-by-step wizard to guide the user through the hardware "MIDI Learn" process.
   - Displays instructions: unplug power, hold both switches, plug in power, release switches.
   - Provides a dropdown to select the *desired* channel.
   - Provides a prominent "Send PC to Confirm" button that outputs a Program Change message on the selected channel to lock it in on the hardware.

3. **State Persistence**
   - Both flows must update the application's global `StompStore.channels` record upon completion, ensuring all subsequent MIDI messages use the correct channel.

## Out of Scope
- Automated SysEx channel detection (Chase Bliss pedals don't support it).
- Generic channel setup for non-Chase Bliss pedals (for now).
