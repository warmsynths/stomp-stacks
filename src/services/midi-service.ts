import { CONTROLLERS } from '../data/controllers.js';
import { DEVICES } from '../data/devices.js';
import type { ConnectedNode, StompState } from '../state/types.js';
import type { ScribbleConfig, ScribbleDeviceSettings } from '../types/scribble.js';
import {
  PirateMidiDeviceApi,
  WebSerialTransport,
  type ReadConfigOptions,
  type WriteConfigOptions,
} from './pirate-midi-device-api.js';

/** Scribble enumerates as a USB CDC device at 115200 baud. */
const SERIAL_BAUD_RATE = 115200;




export function hex(n: number): string {
  return '0x' + n.toString(16).toUpperCase().padStart(2, '0');
}

export class WebMidiService {
  private midiAccess: MIDIAccess | null = null;
  private listeners: Set<() => void> = new Set();
  public isSupported: boolean = typeof navigator !== 'undefined' && 'requestMIDIAccess' in navigator;
  public isSerialSupported: boolean = typeof navigator !== 'undefined' && 'serial' in (navigator as any);
  public activePort: any = null;
  public activePortName: string = '';

  async init(): Promise<boolean> {
    if (!this.isSupported) return false;
    try {
      this.midiAccess = await navigator.requestMIDIAccess({ sysex: true });
      this.midiAccess.onstatechange = () => {
        this.notifyListeners();
      };
      return true;
    } catch (err) {
      console.warn('Web MIDI Access denied or unavailable:', err);
      return false;
    }
  }

  onStateChange(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notifyListeners() {
    this.listeners.forEach((fn) => fn());
  }

  /**
   * Scans Web MIDI ports and combines with active rig devices to generate
   * the list of hardware nodes shown in the Connect Modal.
   */
  getHardwareNodes(state: StompState): ConnectedNode[] {
    const nodes: ConnectedNode[] = [];
    const ports = this.getDetectedMidiPorts();

    // 1. Brain / Controller node
    const ctrl = CONTROLLERS[state.controllerId];
    const isScribble = state.brainId === 'scribble' || state.controllerId === 'scribble';
    const targetName = isScribble ? 'Pirate MIDI Scribble' : ctrl ? ctrl.name : 'Controller';
    const portMatch = ports.find((p) => p.name.toLowerCase().includes(state.brainId) || p.name.toLowerCase().includes(state.controllerId));

    const defaultPort = isScribble
      ? (this.activePortName || (this.isSerialSupported ? 'USB Serial CDC (115200)' : 'Web Serial unavailable'))
      : 'USB MIDI Port 1';

    nodes.push({
      id: isScribble ? 'scribble' : state.controllerId,
      name: targetName,
      kind: isScribble ? 'USB-C Serial · CDC' : 'USB-C MIDI',
      port: portMatch ? portMatch.portName : defaultPort,
      canRead: true,
      canListen: false,
    });

    // 2. Pedals in active rig
    state.rig.forEach((pedalId) => {
      const dev = DEVICES[pedalId];
      if (!dev) return;
      const devPortMatch = ports.find((p) => p.name.toLowerCase().includes(pedalId));
      nodes.push({
        id: pedalId,
        name: dev.name,
        kind: 'TRS MIDI',
        port: devPortMatch ? devPortMatch.portName : `MIDI Out Ch ${state.channels[pedalId] || 1}`,
        canRead: false,
        canListen: true,
      });
    });

    return nodes;
  }

  private getDetectedMidiPorts(): Array<{ id: string; name: string; portName: string }> {
    if (!this.midiAccess) return [];
    const list: Array<{ id: string; name: string; portName: string }> = [];

    this.midiAccess.inputs.forEach((input) => {
      list.push({ id: input.id, name: input.name || 'Unknown Device', portName: input.name || input.id });
    });
    return list;
  }

  /**
   * Opens (or reuses) a Web Serial connection to the Scribble and handshakes
   * via the CHCK command to retrieve device identity.
   */
  async connectScribble(promptUser: boolean = true): Promise<ScribbleDeviceSettings | null> {
    if (!this.isSerialSupported) {
      throw new Error('Web Serial is not supported in this browser. Please use Chrome or Edge on desktop.');
    }
    const api = await this.openDeviceApi(promptUser);
    if (!api) return null;
    try {
      const devSettings = await api.check();
      return devSettings;
    } catch (err: any) {
      console.warn('Scribble handshake failed:', err);
      throw err;
    } finally {
      await api.close();
    }
  }

  /**
   * Closes the active Web Serial connection and releases the COM port.
   */
  async disconnectScribble(): Promise<void> {
    if (this.activePort) {
      try {
        await this.activePort.close();
      } catch (err) {
        console.warn('Error closing serial port:', err);
      }
      this.activePort = null;
      this.activePortName = '';
    }
  }

  /**
   * Opens (or reuses) a Web Serial connection to the Scribble and returns a
   * protocol client for it.
   */
  private async openDeviceApi(allowPrompt: boolean): Promise<PirateMidiDeviceApi | null> {
    if (!this.isSerialSupported) {
      console.warn('Web Serial is unavailable — the Device API needs Chrome or Edge on desktop.');
      return null;
    }

    const serial = (navigator as any).serial;

    let port: any = this.activePort;
    if (!port) {
      const paired = await serial.getPorts();
      if (paired.length > 0) {
        port = paired[0];
      } else if (allowPrompt) {
        port = await serial.requestPort();
      }
    }

    if (!port) return null;

    if (!port.readable || !port.writable) {
      try {
        await port.open({ baudRate: SERIAL_BAUD_RATE });
      } catch (err: any) {
        // A port already open from an earlier read is fine; anything else is not.
        if (err?.name !== 'InvalidStateError' && !String(err?.message || '').includes('already open')) {
          throw err;
        }
      }
    }

    this.activePort = port;
    const info = port.getInfo ? port.getInfo() : {};
    this.activePortName = info.usbVendorId
      ? `USB Serial (0x${info.usbVendorId.toString(16).padStart(4, '0')})`
      : 'USB Serial CDC (115200 baud)';

    return new PirateMidiDeviceApi(new WebSerialTransport(port));
  }

  /**
   * Reads the full device configuration over USB CDC using the Pirate MIDI
   * Device API. Prompts for pairing if not already paired.
   */
  async requestLiveSerialConfig(options: ReadConfigOptions = {}): Promise<ScribbleConfig | null> {
    let api: PirateMidiDeviceApi | null = null;
    try {
      api = await this.openDeviceApi(true);
      if (!api) return null;
      return await api.readFullConfig(options);
    } catch (err) {
      console.warn('Scribble read failed:', err);
      throw err;
    } finally {
      await api?.close();
    }
  }

  /**
   * Reads the full device configuration. `allowPrompt` defaults to true so
   * user gestures (such as clicking 'read') can pair the device if needed.
   */
  async readLiveDeviceConfig(
    id: string,
    options: ReadConfigOptions & { allowPrompt?: boolean } = {},
  ): Promise<ScribbleConfig | null> {
    if (id !== 'scribble') return null;

    let api: PirateMidiDeviceApi | null = null;
    try {
      api = await this.openDeviceApi(options.allowPrompt ?? true);
      if (!api) return null;
      return await api.readFullConfig(options);
    } catch (err) {
      console.warn('Scribble read failed:', err);
      throw err;
    } finally {
      await api?.close();
    }
  }

  /**
   * Writes a configuration to the device and commits it to flash.
   *
   * The Scribble holds transferred banks in RAM until `savePresets` runs, so
   * skipping the commit loses everything at power-off.
   */
  async writeLiveDeviceConfig(config: ScribbleConfig, options: WriteConfigOptions = {}): Promise<boolean> {
    let api: PirateMidiDeviceApi | null = null;
    try {
      api = await this.openDeviceApi(true);
      if (!api) return false;
      await api.writeFullConfig(config, options);
      return true;
    } catch (err) {
      console.warn('Scribble write failed:', err);
      return false;
    } finally {
      await api?.close();
    }
  }

  /**
   * Transmits MIDI Control Change message out through Web MIDI if available.
   */
  sendControlChange(channel: number, cc: number, value: number) {
    if (!this.midiAccess) return;
    const status = 0xb0 | ((channel - 1) & 0x0f);
    this.midiAccess.outputs.forEach((output) => {
      try {
        output.send([status, cc & 0x7f, value & 0x7f]);
      } catch (e) {
        // Output port not active or error sending
      }
    });
  }

  /**
   * Transmits MIDI Program Change message out through Web MIDI if available.
   */
  sendProgramChange(channel: number, program: number) {
    if (!this.midiAccess) return;
    const status = 0xc0 | ((channel - 1) & 0x0f);
    this.midiAccess.outputs.forEach((output) => {
      try {
        output.send([status, program & 0x7f]);
      } catch (e) {
        // Output port not active or error sending
      }
    });
  }
}

export const midiService = new WebMidiService();

