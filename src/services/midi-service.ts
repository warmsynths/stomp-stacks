import { CONTROLLERS } from '../data/controllers.js';
import { DEVICES } from '../data/devices.js';
import type { ConnectedNode, StompState } from '../state/types.js';




export function hex(n: number): string {
  return '0x' + n.toString(16).toUpperCase().padStart(2, '0');
}

export class WebMidiService {
  private midiAccess: MIDIAccess | null = null;
  private listeners: Set<() => void> = new Set();
  public isSupported: boolean = typeof navigator !== 'undefined' && 'requestMIDIAccess' in navigator;

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
    const targetName = state.brainId === 'scribble' ? 'Pirate MIDI Scribble' : ctrl ? ctrl.name : 'Controller';
    const portMatch = ports.find((p) => p.name.toLowerCase().includes(state.brainId) || p.name.toLowerCase().includes(state.controllerId));

    nodes.push({
      id: state.brainId === 'scribble' ? 'scribble' : state.controllerId,
      name: targetName,
      kind: 'USB-C MIDI',
      port: portMatch ? portMatch.portName : 'USB MIDI Port 1',
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
   * Reads live configuration directly from connected USB hardware via Web Serial CDC
   * or Web MIDI SysEx dump request.
   */
  /**
   * Directly triggers Web Serial requestPort (must be invoked during a user click event)
   * to connect and stream live configuration from Pirate MIDI Scribble over USB CDC.
   */
  async requestLiveSerialConfig(): Promise<any | null> {
    if (typeof navigator !== 'undefined' && 'serial' in (navigator as any)) {
      try {
        const serial = (navigator as any).serial;
        let port: any = null;
        const existingPorts = await serial.getPorts();

        if (existingPorts.length > 0) {
          port = existingPorts[0];
        } else {
          port = await serial.requestPort();
        }

        if (port) {
          if (!port.opened) {
            try {
              await port.open({ baudRate: 115200 });
            } catch (openErr: any) {
              if (openErr?.name !== 'InvalidStateError' && !openErr?.message?.includes('already open')) {
                console.warn('Serial open warning:', openErr);
              }
            }
          }

          await new Promise((r) => setTimeout(r, 150));

          try {
            const writer = port.writable.getWriter();
            const cmds = [
              JSON.stringify({ cmd: 'export' }) + '\r\n',
              JSON.stringify({ command: 'export' }) + '\r\n',
              'EXPO\r\n',
              'export\r\n',
            ];
            for (const cmd of cmds) {
              await writer.write(new TextEncoder().encode(cmd));
              await new Promise((r) => setTimeout(r, 60));
            }
            writer.releaseLock();
          } catch (wErr) {
            console.warn('Serial writer send:', wErr);
          }

          const reader = port.readable.getReader();
          let jsonBuffer = '';
          const startTime = Date.now();

          try {
            while (Date.now() - startTime < 3500) {
              const { value, done } = await reader.read();
              if (done) break;
              jsonBuffer += new TextDecoder().decode(value, { stream: true });
              if (jsonBuffer.includes('}') && jsonBuffer.includes('{')) {
                const start = jsonBuffer.indexOf('{');
                const end = jsonBuffer.lastIndexOf('}');
                if (start >= 0 && end > start) {
                  const candidate = jsonBuffer.slice(start, end + 1);
                  try {
                    const parsed = JSON.parse(candidate);
                    try {
                      reader.releaseLock();
                    } catch (e) {}
                    return parsed;
                  } catch (e) {
                    // Keep accumulating
                  }
                }
              }
            }
          } catch (e) {
            // Stream end or cancelled
          } finally {
            try {
              reader.releaseLock();
            } catch (e) {}
          }
        }
      } catch (err) {
        console.warn('Web Serial live read error:', err);
      }
    }

    // Fallback to SysEx query if Web Serial didn't return JSON
    return this.readLiveDeviceConfig('scribble');
  }




  /**
   * Reads live configuration directly from connected Pirate MIDI Scribble hardware via Web Serial CDC
   * or Web MIDI SysEx dump request.
   */
  async readLiveDeviceConfig(id: string): Promise<any | null> {
    // 1. Try Web Serial API first using already paired ports
    if (typeof navigator !== 'undefined' && 'serial' in (navigator as any)) {
      try {
        const serial = (navigator as any).serial;
        const existingPorts = await serial.getPorts();

        if (existingPorts.length > 0) {
          const port = existingPorts[0];
          if (!port.opened) {
            try {
              await port.open({ baudRate: 115200 });
            } catch (openErr: any) {
              if (openErr?.name !== 'InvalidStateError' && !openErr?.message?.includes('already open')) {
                console.warn('Serial open warning:', openErr);
              }
            }
          }

          try {
            const writer = port.writable.getWriter();
            const exportCmd1 = JSON.stringify({ cmd: 'export' }) + '\r\n';
            const exportCmd2 = 'EXPO\r\n';
            await writer.write(new TextEncoder().encode(exportCmd1));
            await writer.write(new TextEncoder().encode(exportCmd2));
            writer.releaseLock();
          } catch (wErr) {
            console.warn('Serial writer send warning:', wErr);
          }

          const reader = port.readable.getReader();
          let jsonBuffer = '';
          const timeout = setTimeout(() => {
            try { reader.cancel(); } catch (e) {}
          }, 3000);

          try {
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              jsonBuffer += new TextDecoder().decode(value);
              if (jsonBuffer.includes('}') && jsonBuffer.includes('{')) {
                const start = jsonBuffer.indexOf('{');
                const end = jsonBuffer.lastIndexOf('}');
                if (start >= 0 && end > start) {
                  const candidate = jsonBuffer.slice(start, end + 1);
                  try {
                    const parsed = JSON.parse(candidate);
                    clearTimeout(timeout);
                    try { reader.releaseLock(); } catch (e) {}
                    return parsed;
                  } catch (e) {}
                }
              }
            }
          } catch (e) {
          } finally {
            clearTimeout(timeout);
            try { reader.releaseLock(); } catch (e) {}
          }
        }

      } catch (err) {
        console.warn('Web Serial paired read:', err);
      }
    }


    // 2. Try Web MIDI SysEx dump request (Pirate MIDI Manufacturer ID: 00 02 4F)
    if (this.midiAccess) {
      return new Promise((resolve) => {
        let resolved = false;
        const outputs: MIDIOutput[] = [];
        const inputs: MIDIInput[] = [];

        this.midiAccess!.outputs.forEach((o) => outputs.push(o));
        this.midiAccess!.inputs.forEach((i) => inputs.push(i));

        const targetOut = outputs.find((o) => o.name?.toLowerCase().includes(id.toLowerCase()) || o.name?.toLowerCase().includes('pirate'));
        const targetIn = inputs.find((i) => i.name?.toLowerCase().includes(id.toLowerCase()) || i.name?.toLowerCase().includes('pirate'));

        if (targetOut && targetIn) {
          const onMidiMessage = (event: MIDIMessageEvent) => {
            const data = event.data;
            if (data && data[0] === 0xf0) {
              targetIn.removeEventListener('midimessage', onMidiMessage as any);
              resolved = true;

              const textBytes = Array.from(data.slice(1, data.length - 1));
              const text = String.fromCharCode(...textBytes);
              try {
                const start = text.indexOf('{');
                const end = text.lastIndexOf('}');
                if (start >= 0 && end > start) {
                  const parsed = JSON.parse(text.slice(start, end + 1));
                  resolve(parsed);
                  return;
                }
              } catch (e) {}
              resolve(null);
            }
          };

          targetIn.addEventListener('midimessage', onMidiMessage as any);

          try {
            targetOut.send([0xf0, 0x00, 0x02, 0x4f, 0x04, 0x01, 0xf7]);
            targetOut.send([0xf0, 0x00, 0x02, 0x4f, 0x00, 0x01, 0xf7]);
          } catch (e) {
            targetIn.removeEventListener('midimessage', onMidiMessage as any);
          }

          setTimeout(() => {
            if (!resolved) {
              targetIn.removeEventListener('midimessage', onMidiMessage as any);
              resolve(null);
            }
          }, 3000);
          return;
        }

        resolve(null);
      });
    }


    return null;
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
}

export const midiService = new WebMidiService();

