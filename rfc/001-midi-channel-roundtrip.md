# RFC: MIDI Channel-to-Device Round-Trip Mismatch

**Status:** Open  
**Date:** 2026-08-11  
**Author:** auto-generated from debugging session  
**Affects:** `src/compiler/adapters/scribble.ts` → `parseMessageList`  
**Related:** `src/components/read-modal.ts` → `stepsLabel`

---

## Problem

When Stomp Stacks reads MIDI preset messages back from a Pirate MIDI Scribble device, it reverse-maps raw MIDI bytes to pedal controls using the **current** app channel configuration. This mapping can produce incorrect device attributions when:

1. The channel assignments were different at the time the config was written to the device
2. The config was written by a different tool (e.g. the Pirate MIDI Editor) with its own channel assumptions
3. Pedals have been re-assigned to different MIDI channels since the last write

### Concrete example

A preset named "BLOOPER" containing CC messages on MIDI channel 1 (written when blooper was on ch1, or written by another tool) gets read back with the current mapping where ch1 = el capistan. The steps are attributed to el capistan instead of blooper, producing labels like "el capistan time" for a preset that has nothing to do with the el cap.

### Root cause

```typescript
// scribble.ts — parseMessageList
const ch = (statusByte & 0x0f) + 1;
const devId = channelToDevice[ch] || fallbackDevId;
```

The `channelToDevice` map is built from the current app state's `channels` record. Raw MIDI bytes are absolute — they encode the channel used at write time, not the current config.

### Secondary issue

```typescript
const control = dev.controls.find((c) => c.cc === cc) || dev.controls[0];
```

When no control matches the CC on the (potentially wrong) device, it silently falls back to `controls[0]`. For el capistan that's `time` (CC 12). This masks the mismatch — instead of showing "unknown control", it confidently shows the wrong one.

## Impact

- **Read modal display:** Fixed (now shows `p.second` label instead of re-deriving from steps)
- **Step import/reconciliation:** Still affected. If a user reads presets from a device and applies them to banks, the steps carry wrong device/control attributions. The MIDI bytes would still be correct when re-compiled (since compilation goes device→channel→bytes), but the UI would show wrong pedal names in the bank editor.

## Possible fixes

### Option A: Don't reverse-map at all
Store raw MIDI bytes as-is and only display the named labels from the device. Skip step-level device attribution entirely. Simplest, but loses the ability to show which pedals a preset controls.

### Option B: Best-effort with "unknown" fallback
Keep the channel mapping but drop the `|| dev.controls[0]` silent fallback. If a CC doesn't match any control on the resolved device, mark it as an unrecognised message instead of guessing.

### Option C: Store channel config alongside presets
When writing to the device, embed the channel mapping in a metadata field (e.g. a custom JSON comment or unused bank). On read, use the stored mapping instead of the current one. Requires a Scribble firmware feature or a creative encoding hack.

### Option D: Fuzzy matching across all devices
Instead of mapping channel → single device, try all devices in the rig and pick the one where the CC matches a known control. Falls apart when multiple devices share CC numbers.

## Decision

Not yet decided. The display issue is resolved. This RFC documents the deeper round-trip fidelity problem for future work.
