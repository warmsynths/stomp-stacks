// Hardware Registry — The domain seam encapsulating device definitions,
// remote controllers, smart brains, and hardware lookup tables.

import { DEVICES, DEVICE_ORDER, type Device, type DeviceControl, type ControlValueOption, KNOB_VALUES } from './devices.js';
import { CONTROLLERS, CONTROLLER_ORDER, type ControllerDef } from './controllers.js';
import { BRAINS, BRAIN_ORDER, type BrainDef } from './brains.js';
import { TARGETS, type TargetDef } from './targets.js';

export class HardwareRegistry {
  private static controlMap: Map<string, DeviceControl> = new Map();
  private static targetMap: Map<string, TargetDef> = new Map();

  static {
    // Populate O(1) control lookup cache
    Object.values(DEVICES).forEach((device) => {
      device.controls.forEach((control) => {
        HardwareRegistry.controlMap.set(`${device.id}:${control.id}`, control);
      });
    });
    TARGETS.forEach((target) => {
      HardwareRegistry.targetMap.set(target.id, target);
    });
  }

  static getDevice(id: string): Device | undefined {
    return DEVICES[id];
  }

  static getController(id: string): ControllerDef {
    return CONTROLLERS[id] || CONTROLLERS['chocolate'];
  }

  static getBrain(id: string): BrainDef {
    return BRAINS[id] || BRAINS['none'];
  }

  static getTarget(id: string): TargetDef {
    return HardwareRegistry.targetMap.get(id) || TARGETS[0];
  }

  static getControl(deviceId: string, controlId: string): DeviceControl | undefined {
    return HardwareRegistry.controlMap.get(`${deviceId}:${controlId}`);
  }

  static valueOptionsFor(control: DeviceControl): ControlValueOption[] {
    if (control.values) return control.values;
    if (control.type === 'knob') return KNOB_VALUES;
    return [];
  }

  static formatControlLabel(deviceId: string, controlId: string, value?: number | null): string {
    const control = HardwareRegistry.getControl(deviceId, controlId);
    if (!control) return controlId;
    let label = control.label;
    if (value !== null && value !== undefined) {
      const opt = HardwareRegistry.valueOptionsFor(control).find((v) => v.value === value);
      if (opt) label += ' · ' + opt.label;
    }
    return label;
  }

  static findNextFreeChannel(rig: string[], channels: Record<string, number>): number {
    const taken: Record<number, boolean> = {};
    rig.forEach((id) => {
      if (channels[id]) taken[channels[id]] = true;
    });
    for (let n = 1; n <= 16; n++) {
      if (!taken[n]) return n;
    }
    return 1;
  }

  static detectChannelCollisions(rig: string[], channels: Record<string, number>): Array<{ channel: number; devices: string[] }> {
    const byCh: Record<number, string[]> = {};
    rig.forEach((id) => {
      const dev = DEVICES[id];
      const ch = channels[id] || (dev ? dev.midiChannel : 1);
      (byCh[ch] = byCh[ch] || []).push(dev?.name || id);
    });

    const collisions: Array<{ channel: number; devices: string[] }> = [];
    Object.keys(byCh).forEach((cStr) => {
      const c = Number(cStr);
      if (byCh[c].length > 1) {
        collisions.push({ channel: c, devices: byCh[c] });
      }
    });
    return collisions;
  }

  static getDeviceAccentColorInt(deviceId: string): number {
    const dev = DEVICES[deviceId];
    if (!dev || !dev.accent) return 0;
    const hex = dev.accent.replace('#', '');
    if (hex.length !== 6) return 0;
    return parseInt(hex, 16);
  }
}

export { DEVICE_ORDER, CONTROLLER_ORDER, BRAIN_ORDER };
