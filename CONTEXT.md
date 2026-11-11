# Stomp Stacks

Visual MIDI configuration and macro-building workspace for guitar pedalboards, translating musical intent and foot gestures into multi-pedal MIDI message sequences across controllers, smart relays, and effects pedals.

## Language

### Rig & Hardware

**Controller**:
The physical footswitch device under the player's foot that initiates a stomp (e.g., M-Vave Chocolate, Morningstar MC3, or Scribble relay).
_Avoid_: Switcher, stompbox, remote

**Brain**:
The device responsible for expanding a single incoming trigger into a multi-message sequence sent to the pedals (e.g., Scribble relay, Controller onboard memory, or Direct 1-to-1 with no brain).
_Avoid_: Hub, expander, router, processor

**Rig**:
The active hardware topology consisting of one Controller, one Brain mode, and the subset of Pedals the player owns, along with each Pedal's assigned MIDI channel and CC offset.
_Avoid_: Board, setup, patchbay, configuration

**Pedal**:
An effects unit in the Rig that receives MIDI Control Change (CC) and Program Change (PC) messages on a designated MIDI channel, represented visually with faceplate controls and optional sub-controls.
_Avoid_: Device, stompbox, unit, effect

### Mapping & Execution

**Press**:
A single physical gesture (`tap`, `hold`, or `double`) on a specific Controller switch within a bank, together with its display identity (name, secondary line, colour) and the ordered list of Messages it sends.
_Avoid_: Macro, action bucket, preset, slot, patch

**Message**:
A single atomic MIDI instruction (Control Change or Program Change) within a Press or Action that targets a specific Pedal control and value (or recalls a Set-up).
_Avoid_: Step, command, event, packet

**Clash**:
An order-dependent conflict within a Press where a later Message overrides an earlier Message on the same Pedal control, a later Set-up load wipes earlier knob/toggle Messages on that Pedal, two Set-up loads target the same Pedal, or a subsequent knob Message shifts the start point of a ramping knob.
_Avoid_: Error, collision, duplicate, warning

### Musical Intent & Reusability

**Capability**:
A pedal-agnostic musical intent category (e.g., `conductor`, `micro-buffer`, `spatial glue`, `macro-loop`, `tape & wear`) that groups related Actions and provides a Lens to inspect where that musical role appears across the Rig.
_Avoid_: Tag, folder, group, genre, category

**Lens**:
An interactive filter activated from a Capability that highlights every Press across the Controller and every Pedal control touched by that Capability.
_Avoid_: Filter, highlight mode, search, view

**Action**:
A reusable, named sequence of Messages (optionally including a Set-up load) that belongs to one or more Capabilities and remains dynamically linked across every Press where it is inserted until explicitly unlinked or modified in place.
_Avoid_: Macro template, snippet, preset, macro

**Set-up**:
A named hardware preset configuration for a pedal (such as a Chase Bliss 16-dip-switch + knob configuration for ramping/wiggling or mode selection, or a saved pedal preset slot) that must be stored into a pedal's onboard preset slot once and is recalled via a Program Change Message.
_Avoid_: MOOD set-up, dip preset, hardware patch, bank preset

**Wiggle / Glide**:
Autonomous hardware parameter motion driven by a pedal's internal ramping engine when a Set-up is loaded—either oscillating continuously back and forth (**Wiggle**, when Bounce is engaged) or sweeping once to the target extreme and holding (**Glide**, when Bounce is off).
_Avoid_: LFO, automation, modulation, sweep

