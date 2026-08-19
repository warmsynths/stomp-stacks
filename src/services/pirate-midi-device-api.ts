/**
 * Pirate MIDI Device API — CDC serial protocol client.
 *
 * Reference: https://developer.piratemidi.com/ (Pirate-MIDI/Device-API-Docs)
 *
 * The protocol is plain ASCII over a USB CDC serial port. Three rules govern
 * every exchange, and breaking any one of them makes the device go silent:
 *
 *  1. Every packet ends with `~`. Nothing else — no CR, no LF, no padding.
 *  2. It is strictly lock-step. Each packet the host sends is answered by
 *     exactly one device packet (`ok~`, or `<json>~` for CHCK/DREQ) and the
 *     host must wait for it before sending the next.
 *  3. Commands are four uppercase letters: CHCK, DREQ, DTXR, CTRL.
 *
 * Reading a whole Scribble config is therefore 130 round trips: CHCK, then
 * globalSettings, then one per bank. There is no bulk export command.
 */

import type { ScribbleConfig, ScribbleDeviceSettings, ScribbleGlobalSettings, ScribbleBankSetting } from '../types/scribble.js';

/** Terminator marking the end of every packet, in both directions. */
export const TERMINATOR = '~';

/** Acknowledgement packet the device sends for commands that return no data. */
export const ACK = 'ok';

/** Banks are addressed 0-127 by the API even where the UI numbers them 1-128. */
export const BANK_COUNT = 128;

/** Spec recommends a 1-5s timeout per command. */
export const DEFAULT_TIMEOUT_MS = 5000;

export type DeviceApiCommand = 'CHCK' | 'DREQ' | 'DTXR' | 'CTRL';

/** CTRL payload entries: a bare command name, or a single-key object with a parameter. */
export type ControlCommand = string | Record<string, number>;

/**
 * Minimal serial abstraction so the protocol can be exercised without hardware.
 * `read` resolves with the next decoded chunk, or null once the stream ends.
 */
export interface SerialTransport {
  write(text: string): Promise<void>;
  read(): Promise<string | null>;
  close?(): Promise<void>;
}

export class DeviceApiError extends Error {
  readonly packet?: string;

  constructor(message: string, packet?: string) {
    super(message);
    this.name = 'DeviceApiError';
    this.packet = packet;
  }
}

/**
 * Accumulates stream chunks and yields complete `~`-terminated packets.
 *
 * A packet boundary can land anywhere inside a chunk — a 40KB bank response
 * arrives over many reads, and a small response can share a chunk with the
 * next one — so framing has to be done on the buffer, not per read.
 */
export class PacketBuffer {
  private buf = '';

  /** Appends a chunk and returns any packets it completed, terminators stripped. */
  push(chunk: string): string[] {
    this.buf += chunk;
    const packets: string[] = [];

    let idx = this.buf.indexOf(TERMINATOR);
    while (idx !== -1) {
      packets.push(this.buf.slice(0, idx));
      this.buf = this.buf.slice(idx + 1);
      idx = this.buf.indexOf(TERMINATOR);
    }

    return packets;
  }

  /** Bytes received so far that do not yet form a complete packet. */
  get pending(): string {
    return this.buf;
  }

  reset() {
    this.buf = '';
  }
}

/** Builds a wire packet from a payload. */
export function framePacket(payload: string): string {
  return payload + TERMINATOR;
}

/** True when a packet is the device's bare acknowledgement. */
export function isAck(packet: string): boolean {
  return packet.trim() === ACK;
}

function parseJsonPacket<T>(packet: string, context: string): T {
  const trimmed = packet.trim();
  try {
    return JSON.parse(trimmed) as T;
  } catch (err) {
    throw new DeviceApiError(
      `${context}: expected JSON but device sent ${trimmed.slice(0, 80) || '(empty packet)'}`,
      trimmed,
    );
  }
}

export interface ReadConfigOptions {
  /** Number of banks to pull. Defaults to all 128; lower it for a fast partial read. */
  bankCount?: number;
  /** Called after each bank so callers can drive a progress indicator. */
  onProgress?: (done: number, total: number) => void;
}

export interface WriteConfigOptions {
  bankCount?: number;
  onProgress?: (done: number, total: number) => void;
  /**
   * The Scribble keeps writes in RAM until told to commit. Leave this on or
   * changes are lost at power-off. (Bridge OS devices autosave and may reject
   * the command, hence the escape hatch.)
   */
  save?: boolean;
}

/**
 * Lock-step client for the Device API. One instance owns one open transport.
 */
export class PirateMidiDeviceApi {
  private buffer = new PacketBuffer();
  private queue: string[] = [];
  private chain: Promise<unknown> = Promise.resolve();
  private transport: SerialTransport;
  private timeoutMs: number;

  constructor(transport: SerialTransport, timeoutMs: number = DEFAULT_TIMEOUT_MS) {
    this.transport = transport;
    this.timeoutMs = timeoutMs;
  }

  /**
   * Runs a whole exchange under a lock.
   *
   * The lock has to cover the entire command sequence, not each packet: DREQ
   * and DTXR span two or three packets, and the protocol carries no request
   * IDs, so interleaving two exchanges makes the device read one command's
   * data type as the other's, and pairs every reply with the wrong caller.
   */
  private exchange<T>(fn: () => Promise<T>): Promise<T> {
    const result = this.chain.then(fn, fn);
    // Keep the chain alive after a failed exchange so later calls still run.
    this.chain = result.catch(() => undefined);
    return result;
  }

  /** Sends one packet and resolves with the device's reply. */
  private async send(payload: string): Promise<string> {
    await this.transport.write(framePacket(payload));
    return this.nextPacket(payload);
  }

  private async nextPacket(context: string): Promise<string> {
    const queued = this.queue.shift();
    if (queued !== undefined) return queued;

    const deadline = Date.now() + this.timeoutMs;

    while (Date.now() < deadline) {
      const chunk = await this.readWithTimeout(deadline - Date.now());

      if (chunk === null) {
        throw new DeviceApiError(`${context}: serial stream closed before the device replied`);
      }

      const packets = this.buffer.push(chunk);
      if (packets.length > 0) {
        this.queue.push(...packets.slice(1));
        return packets[0];
      }
    }

    throw new DeviceApiError(
      `${context}: no response within ${this.timeoutMs}ms` +
        (this.buffer.pending ? ` (partial data: ${this.buffer.pending.slice(0, 60)})` : ''),
    );
  }

  private readWithTimeout(ms: number): Promise<string | null> {
    if (ms <= 0) return Promise.resolve(null);

    return new Promise<string | null>((resolve, reject) => {
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        resolve(null);
      }, ms);

      this.transport.read().then(
        (value) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          resolve(value);
        },
        (err) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          reject(err);
        },
      );
    });
  }

  private async expectAck(payload: string, context: string): Promise<void> {
    const reply = await this.send(payload);
    if (!isAck(reply)) {
      throw new DeviceApiError(`${context}: expected "${ACK}${TERMINATOR}" but device sent "${reply}"`, reply);
    }
  }

  /** CHCK — device identity. Cheap, and the recommended way to open a session. */
  check(): Promise<ScribbleDeviceSettings> {
    return this.exchange(async () =>
      parseJsonPacket<ScribbleDeviceSettings>(await this.send('CHCK'), 'CHCK'),
    );
  }

  /** DREQ globalSettings — device-wide configuration. */
  requestGlobalSettings(): Promise<ScribbleGlobalSettings> {
    return this.exchange(async () => {
      await this.expectAck('DREQ', 'DREQ');
      const reply = await this.send('globalSettings');
      return parseJsonPacket<ScribbleGlobalSettings>(reply, 'DREQ globalSettings');
    });
  }

  /** DREQ bankSettings,n — one preset. `index` is zero-based (0-127). */
  requestBankSettings(index: number): Promise<ScribbleBankSetting> {
    return this.exchange(async () => {
      await this.expectAck('DREQ', 'DREQ');
      const reply = await this.send(`bankSettings,${index}`);
      return parseJsonPacket<ScribbleBankSetting>(reply, `DREQ bankSettings,${index}`);
    });
  }

  /** DTXR globalSettings — send device-wide configuration. */
  transferGlobalSettings(settings: ScribbleGlobalSettings): Promise<void> {
    return this.exchange(async () => {
      await this.expectAck('DTXR', 'DTXR');
      await this.expectAck('globalSettings', 'DTXR globalSettings');
      await this.expectAck(JSON.stringify(settings), 'DTXR globalSettings payload');
    });
  }

  /** DTXR bankSettings,n — send one preset. */
  transferBankSettings(index: number, bank: ScribbleBankSetting): Promise<void> {
    return this.exchange(async () => {
      await this.expectAck('DTXR', 'DTXR');
      await this.expectAck(`bankSettings,${index}`, `DTXR bankSettings,${index}`);
      await this.expectAck(JSON.stringify(bank), `DTXR bankSettings,${index} payload`);
    });
  }

  /** CTRL — run device functions, in the order given. */
  control(...commands: ControlCommand[]): Promise<void> {
    return this.exchange(async () => {
      await this.expectAck('CTRL', 'CTRL');
      await this.expectAck(JSON.stringify({ command: commands }), 'CTRL payload');
    });
  }

  /** Commits banks to flash. Required on Scribble; Bridge OS devices autosave. */
  async savePresets(): Promise<void> {
    await this.control('savePresets');
  }

  async goToBank(index: number): Promise<void> {
    await this.control({ goToBank: index });
  }

  async restart(): Promise<void> {
    await this.control('restart');
  }

  /** Pulls the full device configuration: identity, globals, and every bank. */
  async readFullConfig(options: ReadConfigOptions = {}): Promise<ScribbleConfig> {
    const total = options.bankCount ?? BANK_COUNT;

    const deviceSettings = await this.check();
    const globalSettings = await this.requestGlobalSettings();

    const bankSettings: ScribbleBankSetting[] = [];
    for (let i = 0; i < total; i++) {
      bankSettings.push(await this.requestBankSettings(i));
      options.onProgress?.(i + 1, total);
    }

    return { deviceSettings, globalSettings, bankSettings, presetSettings: bankSettings };
  }

  /** Pushes a full configuration and, unless told otherwise, commits it. */
  async writeFullConfig(config: ScribbleConfig, options: WriteConfigOptions = {}): Promise<void> {
    const banks = config.bankSettings ?? config.presetSettings ?? [];
    const total = Math.min(options.bankCount ?? banks.length, banks.length);

    await this.transferGlobalSettings(config.globalSettings);

    for (let i = 0; i < total; i++) {
      await this.transferBankSettings(i, banks[i]);
      options.onProgress?.(i + 1, total);
    }

    if (options.save !== false) {
      await this.savePresets();
    }
  }

  async close(): Promise<void> {
    await this.transport.close?.();
  }
}

/**
 * Web Serial transport.
 *
 * Holds a single reader for its lifetime — acquiring one per read drops bytes
 * that arrive between locks, which fragments large bank responses.
 */
export class WebSerialTransport implements SerialTransport {
  private reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  private decoder = new TextDecoder();
  private port: any;

  constructor(port: any) {
    this.port = port;
  }

  async write(text: string): Promise<void> {
    const writer = this.port.writable.getWriter();
    try {
      await writer.write(new TextEncoder().encode(text));
    } finally {
      writer.releaseLock();
    }
  }

  async read(): Promise<string | null> {
    if (!this.reader) {
      this.reader = this.port.readable.getReader();
    }
    const { value, done } = await this.reader!.read();
    if (done) return null;
    return this.decoder.decode(value, { stream: true });
  }

  async close(): Promise<void> {
    if (this.reader) {
      try {
        this.reader.releaseLock();
      } catch {
        // Reader already released or stream torn down.
      }
      this.reader = null;
    }
  }
}
