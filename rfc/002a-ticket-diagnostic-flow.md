# Ticket 1: Design the Diagnostic & Set Flow

**Type:** `wayfinder:prototype` (HITL)

## Question

Since Chase Bliss pedals do not support querying their MIDI channel via SysEx, we cannot just add a "Get Channel" button that magically reads the value. 

Based on research, setting a channel on a Chase Bliss pedal requires a manual hardware flow:
1. Unplug power.
2. Hold both stomp switches.
3. Plug in power (keep holding until boot finishes).
4. Release switches.
5. Send a Program Change (PC) message on the desired channel.

**How should we build the UX in the debugging panel to solve the user's friction?**

### Potential Options:

1. **The "Guided Set" Flow:**
   Instead of trying to *find* the channel, we just guide them to *reset* it. We add a button in the debugging panel: "Set MIDI Channel". When clicked, it shows the 5 hardware steps above, and provides a big "Send PC Message" button to execute step 5.
   
2. **The "Channel Sweeper" (Discovery) Flow:**
   If the user just wants to know what channel it's currently on, we could build a "Find My Pedal" tool. It sends a safe, visible CC message (like toggling bypass) on Channel 1, then Channel 2, etc., highlighting the current channel in the UI. The user clicks "Stop" when they see their physical pedal react.

3. **Both?**

Which direction should we take for the UI prototype?
