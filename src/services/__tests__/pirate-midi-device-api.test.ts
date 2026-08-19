import { describe, it, expect } from 'vitest';
import {
  PacketBuffer,
  PirateMidiDeviceApi,
  DeviceApiError,
  framePacket,
  isAck,
  TERMINATOR,
  type SerialTransport,
} from '../pirate-midi-device-api.js';
import type { ScribbleConfig } from '../../types/scribble.js';

/**
 * Fake device that answers packets the way the Device API spec describes:
 * one reply per host packet, `~`-terminated, strictly in order.
 */
class FakeScribble implements SerialTransport {
  /** Everything the host sent, terminators included. */
  written: string[] = [];
  private outbox: string[] = [];
  private waiters: Array<(chunk: string | null) => void> = [];
  private buffer = new PacketBuffer();
  private expectingDataType: 'DREQ' | 'DTXR' | null = null;
  private expectingPayload = false;
  private closed = false;

  constructor(
    private config: ScribbleConfig,
    /** Split each reply into N chunks to exercise stream reassembly. */
    private chunkSize = Infinity,
  ) {}

  async write(text: string): Promise<void> {
    this.written.push(text);
    for (const packet of this.buffer.push(text)) {
      this.handle(packet);
    }
  }

  async read(): Promise<string | null> {
    const queued = this.outbox.shift();
    if (queued !== undefined) return queued;
    if (this.closed) return null;
    return new Promise((resolve) => this.waiters.push(resolve));
  }

  async close(): Promise<void> {
    this.closed = true;
    this.waiters.splice(0).forEach((w) => w(null));
  }

  private handle(packet: string) {
    if (this.expectingPayload) {
      this.expectingPayload = false;
      JSON.parse(packet); // reject malformed payloads the way the device would
      return this.reply('ok');
    }

    if (this.expectingDataType) {
      const mode = this.expectingDataType;
      this.expectingDataType = null;

      if (mode === 'DTXR') {
        this.expectingPayload = true;
        return this.reply('ok');
      }

      if (packet === 'globalSettings') {
        return this.reply(JSON.stringify(this.config.globalSettings));
      }
      const match = /^bankSettings,(\d+)$/.exec(packet);
      if (match) {
        const banks = this.config.bankSettings || this.config.presetSettings;
        return this.reply(JSON.stringify(banks[Number(match[1])]));
      }
      return this.reply('error');
    }

    switch (packet) {
      case 'CHCK':
        return this.reply(JSON.stringify(this.config.deviceSettings));
      case 'DREQ':
        this.expectingDataType = 'DREQ';
        return this.reply('ok');
      case 'DTXR':
        this.expectingDataType = 'DTXR';
        return this.reply('ok');
      case 'CTRL':
        this.expectingPayload = true;
        return this.reply('ok');
      default:
        return this.reply('error');
    }
  }

  private reply(payload: string) {
    const framed = framePacket(payload);
    for (let i = 0; i < framed.length; i += this.chunkSize) {
      this.push(framed.slice(i, i + this.chunkSize));
    }
  }

  private push(chunk: string) {
    const waiter = this.waiters.shift();
    if (waiter) waiter(chunk);
    else this.outbox.push(chunk);
  }
}

/** Silent transport, for timeout coverage. */
const deadTransport: SerialTransport = {
  async write() {},
  read: () => new Promise<string | null>(() => {}),
};

function makeConfig(bankCount = 4): ScribbleConfig {
  return {
    deviceSettings: {
      deviceModel: 'Scribble',
      firmwareVersion: '1.0.1',
      hardwareVersion: '1.x.0',
      deviceName: 'Scribble',
      uId: 42,
      profileId: 0,
    },
    globalSettings: {
      deviceName: 'Scribble',
      currentBank: 0,
      lightMode: 'dark',
      mainColour: 15199215,
      textColour: 0,
      displayBrightness: 100,
      midiChannel: 0,
      globalBpm: 120,
      midiOutPortMode: 'midiOutA',
      clockMode: 'external',
      clockDisplayType: 'bpm',
      pcBankOutputs: { usbd: 1, ble: 1, midi1: 1 },
      usbdThruHandles: { usbd: true, ble: true, midi1: true },
      bleThruHandles: { usbd: true, ble: true, midi1: true },
      midi1ThruHandles: { usbd: true, ble: true, midi1: true },
      midiClockOutHandles: { usbd: true, ble: true, midi1: true },
      switches: [
        { mode: 'pressPresetDown', pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
        { mode: 'pressPresetUp', pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
      ],
      customMessages: { numMessages: 0, messages: [] },
      presetUpCC: 1,
      presetDownCC: 2,
      goToPresetCC: 3,
      globalCustomMessagesCC: 17,
      presetCustomMessagesCC: 16,
      wirelessType: 'ble',
      bleMode: 'server',
      useStaticIp: false,
      staticIp: '0.0.0.0',
      gatewayIp: '0.0.0.0',
      mainTextResize: false,
      midiValueDisplay: 'valueOnly',
      midiValueDisplayCC: 7,
      kemperPlayerMode: false,
    },
    bankSettings: Array.from({ length: bankCount }, (_, i) => ({
      bankId: i,
      bankName: `Preset ${i + 1}`,
      secondaryText: `Second. ${i + 1}`,
      colourOverride: false,
      colour: 0,
      textColourOverride: false,
      textColour: 0,
      bpm: 120,
      switches: [
        { pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
        { pressMessages: { numMessages: 0, messages: [] }, holdMessages: { numMessages: 0, messages: [] } },
      ],
      customMessages: { numMessages: 0, messages: [] },
      presetMessages: { numMessages: 0, messages: [] },
      midiValueDisplayOverride: false,
      midiValueDisplay: 'none' as const,
      midiValueDisplayCC: 0,
    })),
  };
}

describe('PacketBuffer', () => {
  it('splits a stream on the ~ terminator', () => {
    const buf = new PacketBuffer();
    expect(buf.push('ok~')).toEqual(['ok']);
  });

  it('reassembles a packet split across chunks', () => {
    const buf = new PacketBuffer();
    expect(buf.push('{"deviceMo')).toEqual([]);
    expect(buf.push('del":"Scribble"}')).toEqual([]);
    expect(buf.push('~')).toEqual(['{"deviceModel":"Scribble"}']);
  });

  it('returns several packets that arrived in one chunk', () => {
    const buf = new PacketBuffer();
    expect(buf.push('ok~ok~{"a":1}~')).toEqual(['ok', 'ok', '{"a":1}']);
  });

  it('keeps an unterminated remainder pending', () => {
    const buf = new PacketBuffer();
    buf.push('ok~partial');
    expect(buf.pending).toBe('partial');
  });
});

describe('packet framing', () => {
  it('appends the terminator and nothing else', () => {
    // The spec is explicit that no CR/LF may follow the terminator.
    expect(framePacket('CHCK')).toBe('CHCK~');
    expect(framePacket('CHCK')).not.toMatch(/[\r\n]/);
  });

  it('recognises the ack packet', () => {
    expect(isAck('ok')).toBe(true);
    expect(isAck('error')).toBe(false);
  });
});

describe('PirateMidiDeviceApi', () => {
  it('reads device identity with CHCK', async () => {
    const device = new FakeScribble(makeConfig());
    const api = new PirateMidiDeviceApi(device);

    expect(await api.check()).toMatchObject({ deviceModel: 'Scribble', firmwareVersion: '1.0.1' });
    expect(device.written).toEqual(['CHCK~']);
  });

  it('sends the DREQ handshake in two steps', async () => {
    const device = new FakeScribble(makeConfig());
    const api = new PirateMidiDeviceApi(device);

    const global = await api.requestGlobalSettings();

    expect(global.midiChannel).toBe(0);
    expect(device.written).toEqual(['DREQ~', 'globalSettings~']);
  });

  it('addresses banks zero-indexed', async () => {
    const device = new FakeScribble(makeConfig());
    const api = new PirateMidiDeviceApi(device);

    const bank = await api.requestBankSettings(3);

    expect(bank.bankId).toBe(3);
    expect(device.written).toEqual(['DREQ~', 'bankSettings,3~']);
  });

  it('reads a full config as identity + globals + one packet per bank', async () => {
    const device = new FakeScribble(makeConfig(4));
    const api = new PirateMidiDeviceApi(device);
    const progress: number[] = [];

    const config = await api.readFullConfig({ bankCount: 4, onProgress: (done) => progress.push(done) });

    expect(config.deviceSettings.deviceModel).toBe('Scribble');
    expect(config.bankSettings).toHaveLength(4);
    expect(config.bankSettings.map((b) => b.bankId)).toEqual([0, 1, 2, 3]);
    expect(progress).toEqual([1, 2, 3, 4]);
    expect(device.written.filter((p) => p.startsWith('bankSettings,'))).toHaveLength(4);
  });

  it('survives responses fragmented across reads', async () => {
    const device = new FakeScribble(makeConfig(2), 7);
    const api = new PirateMidiDeviceApi(device);

    const config = await api.readFullConfig({ bankCount: 2 });

    expect(config.bankSettings).toHaveLength(2);
    expect(config.globalSettings.deviceName).toBe('Scribble');
  });

  it('writes a full config and commits it to flash', async () => {
    const device = new FakeScribble(makeConfig(2));
    const api = new PirateMidiDeviceApi(device);

    await api.writeFullConfig(makeConfig(2), { bankCount: 2 });

    expect(device.written).toEqual([
      'DTXR~',
      'globalSettings~',
      expect.stringContaining('"deviceName":"Scribble"'),
      'DTXR~',
      'bankSettings,0~',
      expect.stringContaining('"bankId":0'),
      'DTXR~',
      'bankSettings,1~',
      expect.stringContaining('"bankId":1'),
      'CTRL~',
      '{"command":["savePresets"]}~',
    ]);
  });

  it('skips the flash commit when asked to', async () => {
    const device = new FakeScribble(makeConfig(1));
    const api = new PirateMidiDeviceApi(device);

    await api.writeFullConfig(makeConfig(1), { bankCount: 1, save: false });

    expect(device.written).not.toContain('CTRL~');
  });

  it('sends CTRL parameters as single-key objects', async () => {
    const device = new FakeScribble(makeConfig());
    const api = new PirateMidiDeviceApi(device);

    await api.goToBank(5);

    expect(device.written).toEqual(['CTRL~', '{"command":[{"goToBank":5}]}~']);
  });

  it('serialises overlapping exchanges so replies are not crossed', async () => {
    const device = new FakeScribble(makeConfig(2));
    const api = new PirateMidiDeviceApi(device);

    const [a, b] = await Promise.all([api.requestBankSettings(0), api.requestBankSettings(1)]);

    expect(a.bankId).toBe(0);
    expect(b.bankId).toBe(1);
    expect(device.written).toEqual(['DREQ~', 'bankSettings,0~', 'DREQ~', 'bankSettings,1~']);
  });

  it('times out rather than hanging on a silent device', async () => {
    const api = new PirateMidiDeviceApi(deadTransport, 20);
    await expect(api.check()).rejects.toThrow(DeviceApiError);
  });

  it('reports a non-JSON reply instead of returning garbage', async () => {
    const transport: SerialTransport = {
      async write() {},
      read: async () => 'error' + TERMINATOR,
    };
    const api = new PirateMidiDeviceApi(transport, 50);

    await expect(api.check()).rejects.toThrow(/expected JSON/);
  });

  it('stays usable after a failed exchange', async () => {
    const device = new FakeScribble(makeConfig());
    let failNextWrite = true;
    const flaky: SerialTransport = {
      write(text) {
        if (failNextWrite) {
          failNextWrite = false;
          return Promise.reject(new Error('port glitch'));
        }
        return device.write(text);
      },
      read: () => device.read(),
    };
    const api = new PirateMidiDeviceApi(flaky, 200);

    await expect(api.check()).rejects.toThrow('port glitch');
    // The internal promise chain must not stay rejected.
    expect(await api.check()).toMatchObject({ deviceModel: 'Scribble' });
  });
});
