# Order-Dependent Clash Detection and Set-up Merging

Rather than silently deduplicating or blocking multiple Messages targeting the same Pedal or control within a Press, a Press preserves its exact Message sequence and evaluates order-dependent hardware semantics ("last message wins") via live clash analysis (`clash(list, i)`). Because a Program Change on MOOD MkI or Generation Loss MKII overwrites all physical knob, toggle, and dip-switch states on that pedal—and because sending a Control Change to a ramping knob *after* a preset load shifts the ramp's starting bound rather than stopping the motion—order determines what the hardware actually produces.

## Consequences

- **Overridden controls**: Any knob or toggle Message followed later in the same Press by another Message to the same control—or by a Program Change Set-up load on the same Pedal—is flagged as overridden (struck through with a 1-click **remove** action that frees a message slot).
- **Wiggle start-point shift**: A knob Message placed *after* a Set-up load from a different Action that ramps that knob is surfaced as an informational blue note (`moves where "<set-up>" starts`) rather than an error.
- **Single Set-up per Pedal per Press**: Adding an Action that loads a different Set-up onto a Pedal that already loads one in the current Press opens a resolution dialog offering to **merge** the two Set-ups into a new union Set-up (when `bounce`, `sweep`, and `shape` are compatible), **use the new Set-up**, or **keep the existing Set-up**.

