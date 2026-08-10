import { describe, it, expect } from 'vitest';
import { StompStore } from '../store.js';
import { midiService } from '../../services/midi-service.js';

describe('StompStore Hardware Connection & Read Config', () => {
  it('opens and closes connect modal', () => {
    const store = new StompStore();
    expect(store.state.connectOpen).toBe(false);

    store.openConnect();
    expect(store.state.connectOpen).toBe(true);

    store.closeConnect();
    expect(store.state.connectOpen).toBe(false);
  });

  it('toggles device connection status and logs entry', () => {
    const store = new StompStore();
    expect(store.state.conn.scribble).toBeFalsy();

    store.toggleConn('scribble');
    expect(store.state.conn.scribble).toBe(true);
    expect(store.state.log.length).toBeGreaterThan(0);

    store.toggleConn('scribble');
    expect(store.state.conn.scribble).toBe(false);
  });


  it('reads config from connected device and sets up read modal data', async () => {
    const store = new StompStore();
    expect(store.state.readOpen).toBe(false);

    await store.readFrom('scribble');
    expect(store.state.readOpen).toBe(true);
    expect(store.state.readData).toBeDefined();
    expect(store.state.readData?.from).toBe('scribble');
  });

  it('reconciles and applies read device configuration into banks', async () => {
    const store = new StompStore();
    await store.readFrom('scribble');

    if (store.state.readData && store.state.readData.allPresets.length) {
      store.importSelectedDevicePresets();
      expect(store.state.readOpen).toBe(false);
      expect(store.state.readData).toBeNull();
    }
  });

  it('toggles monitor rail and logs stomp test', () => {
    const store = new StompStore();
    expect(store.state.monitorOn).toBe(false);

    store.toggleMonitor();
    expect(store.state.monitorOn).toBe(true);

    store.stompTest();
    expect(store.state.log.length).toBeGreaterThan(0);

    store.clearLog();
    expect(store.state.log.length).toBe(0);
  });

  it('scans hardware nodes via midiService', () => {
    const store = new StompStore();
    const nodes = midiService.getHardwareNodes(store.state);
    expect(nodes.length).toBeGreaterThan(0);
    expect(nodes[0].name).toContain('Pirate MIDI Scribble');
  });

  it('parses real scribble.json config file objects', () => {
    const store = new StompStore();
    const mockScribbleConfig: any = {
      deviceSettings: { deviceModel: 'Scribble', firmwareVersion: '1.0.1', hardwareVersion: '1.x.0', deviceName: 'Scribble', uId: 1, profileId: 0 },
      globalSettings: { deviceName: 'Scribble', currentBank: 0, lightMode: 'dark', mainColour: 0, textColour: 0, displayBrightness: 100, midiChannel: 1, globalBpm: 120, switches: [], customMessages: { numMessages: 0, messages: [] } },
      presetSettings: [
        {
          bankId: 0,
          bankName: 'CUSTOM BLOOPER',
          secondaryText: 'volume + ramp',
          colourOverride: true,
          colour: 15199215,
          textColourOverride: true,
          textColour: 0,
          bpm: 120,
          switches: [],
          customMessages: { numMessages: 0, messages: [] },
          presetMessages: {
            numMessages: 1,
            messages: [{ statusByte: 0xb0, dataByte1: 21, dataByte2: 64, outputs: { usbd: true, ble: true, midi1: true } }],
          },

        },
      ],
    };

    store.loadScribbleFile(mockScribbleConfig);
    expect(store.state.readOpen).toBe(true);
    expect(store.state.readData?.allPresets.length).toBeGreaterThan(0);
    expect(store.state.readData?.allPresets[0].steps[0].device).toBe('blooper');
  });

});

