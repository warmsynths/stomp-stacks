# Linked Actions and Pedal-Specific Set-ups Replace Static Macro Templates

Previously, multi-message pedal gestures were modeled as static `MacroTemplate` definitions attached to individual controls, which copied raw `MacroStep` items one-way into a switch bucket on click. We replaced `MacroTemplate` with reusable, musical-intent **Actions** (grouped under pedal-agnostic **Capabilities**) and hardware **Set-ups** (pedal-specific rear dip-switch and preset configurations). When an Action is added to a Press, its Messages retain a live reference (`act` ID and `inst` group instance ID) so subsequent edits to the Action propagate across every Press in every bank until the user explicitly unlinks the group or edits one of its Messages in place (which detaches the group with a `from` provenance note).

## Consequences

- Editing an Action in Build mode (`syncBanks`) rewrites all linked instances across all banks while filtering out Messages for Pedals not currently in the active Rig.
- Chase Bliss rear dip-switch configurations are modeled per pedal (`mood`, `genloss`, `blooper`): MOOD MkI and Generation Loss MKII Set-ups compile to Program Change (`PC 1–122`) recalls with a 4-step physical footswitch save walkthrough, whereas Blooper Set-ups guide physical dip-switch configuration and trigger internal ramping via `CC 52` (Ramp On/Off) and `CC 20` (Ramp Speed), preserving Blooper's `PC 0–15` exclusively for recalling saved audio loops 1–16.

