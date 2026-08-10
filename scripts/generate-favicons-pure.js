import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

// Create PNG buffer from RGBA pixel data using Node built-in zlib
function createPNG(width, height, rgbaBuffer) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type 6 (RGBA)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = createChunk('IHDR', ihdr);

  // IDAT chunk
  const scanlines = [];
  for (let y = 0; y < height; y++) {
    scanlines.push(0); // filter type 0 (none)
    const start = y * width * 4;
    for (let i = 0; i < width * 4; i++) {
      scanlines.push(rgbaBuffer[start + i]);
    }
  }
  const compressed = zlib.deflateSync(Buffer.from(scanlines));
  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 4 + 4 + len));
  buf.writeUInt32BE(crc >>> 0, 4 + 4 + len);
  return buf;
}

// CRC32 implementation
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) {
    c = (c >>> 8) ^ crcTable[(c ^ buf[i]) & 0xff];
  }
  return c ^ -1;
}

// Distance from point (px, py) to line segment (x1, y1)-(x2, y2)
function distToSegment(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
}

// Distance to rounded rectangle (squircle)
function distToRoundedRect(px, py, x, y, width, height, radius) {
  const dx = Math.max(Math.abs(px - (x + width / 2)) - (width / 2 - radius), 0);
  const dy = Math.max(Math.abs(py - (y + height / 2)) - (height / 2 - radius), 0);
  return Math.hypot(dx, dy) - radius;
}

// Sample points along bezier curve for fine distance evaluation
function sampleBezier(p0, p1, p2, p3, numSamples = 40) {
  const points = [];
  for (let i = 0; i <= numSamples; i++) {
    const t = i / numSamples;
    const mt = 1 - t;
    const x = mt ** 3 * p0[0] + 3 * mt ** 2 * t * p1[0] + 3 * mt * t ** 2 * p2[0] + t ** 3 * p3[0];
    const y = mt ** 3 * p0[1] + 3 * mt ** 2 * t * p1[1] + 3 * mt * t ** 2 * p2[1] + t ** 3 * p3[1];
    points.push([x, y]);
  }
  return points;
}

// Generate S curve points
const sCurvePoints = [
  ...sampleBezier([0.66, 0.355], [0.66, 0.27], [0.58, 0.23], [0.50, 0.23]),
  ...sampleBezier([0.50, 0.23], [0.40, 0.23], [0.34, 0.29], [0.34, 0.37]),
  ...sampleBezier([0.34, 0.37], [0.34, 0.47], [0.42, 0.49], [0.52, 0.52]),
  ...sampleBezier([0.52, 0.52], [0.62, 0.55], [0.67, 0.58], [0.67, 0.67]),
  ...sampleBezier([0.67, 0.67], [0.67, 0.76], [0.59, 0.82], [0.50, 0.82]),
  ...sampleBezier([0.50, 0.82], [0.39, 0.82], [0.32, 0.76], [0.32, 0.66]),
];

function renderLogo(width, height) {
  const rgba = new Uint8Array(width * height * 4);

  const rectX = width * 0.0625;
  const rectY = height * 0.0625;
  const rectW = width * 0.875;
  const rectH = height * 0.875;
  const rectR = width * 0.25;
  const strokeW = width * 0.07;
  const sStrokeW = width * 0.133;

  // Colors
  const mustard = [247, 201, 72, 255];
  const ink = [22, 50, 61, 255];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const px = x + 0.5;
      const py = y + 0.5;

      // Distance to squircle boundary
      const sqDist = distToRoundedRect(px, py, rectX, rectY, rectW, rectH, rectR);

      // Distance to S curve
      let sDist = Infinity;
      const nx = px / width;
      const ny = py / height;
      for (let i = 0; i < sCurvePoints.length - 1; i++) {
        const d = distToSegment(nx, ny, sCurvePoints[i][0], sCurvePoints[i][1], sCurvePoints[i + 1][0], sCurvePoints[i + 1][1]) * width;
        if (d < sDist) sDist = d;
      }

      // Anti-aliasing factor
      const aa = 1.0;

      // Outside squircle border
      if (sqDist > strokeW / 2 + aa) {
        rgba[idx] = 0;
        rgba[idx + 1] = 0;
        rgba[idx + 2] = 0;
        rgba[idx + 3] = 0; // transparent
        continue;
      }

      // Border region
      let borderAlpha = Math.max(0, Math.min(1, (strokeW / 2 + aa - Math.abs(sqDist)) / aa));
      if (sqDist > -strokeW / 2) {
        // Border pixel
        const alpha = Math.max(0, Math.min(1, (strokeW / 2 + aa - sqDist) / aa)) * Math.max(0, Math.min(1, (sqDist + strokeW / 2 + aa) / aa));
        rgba[idx] = ink[0];
        rgba[idx + 1] = ink[1];
        rgba[idx + 2] = ink[2];
        rgba[idx + 3] = Math.round(alpha * 255);
        continue;
      }

      // Inside squircle
      let sAlpha = Math.max(0, Math.min(1, (sStrokeW / 2 + aa / 2 - sDist) / (aa / 2)));
      if (sAlpha > 0) {
        // Blend ink S over mustard background
        rgba[idx] = Math.round(ink[0] * sAlpha + mustard[0] * (1 - sAlpha));
        rgba[idx + 1] = Math.round(ink[1] * sAlpha + mustard[1] * (1 - sAlpha));
        rgba[idx + 2] = Math.round(ink[2] * sAlpha + mustard[2] * (1 - sAlpha));
        rgba[idx + 3] = 255;
      } else {
        rgba[idx] = mustard[0];
        rgba[idx + 1] = mustard[1];
        rgba[idx + 2] = mustard[2];
        rgba[idx + 3] = 255;
      }
    }
  }

  return createPNG(width, height, rgba);
}

function createICO(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + count * 16;

  for (const { width, height, buffer } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width === 256 ? 0 : width, 0);
    entry.writeUInt8(height === 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

const targets = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

const generated = {};

for (const { name, size } of targets) {
  const pngBuf = renderLogo(size, size);
  generated[name] = pngBuf;
  fs.writeFileSync(path.join(publicDir, name), pngBuf);
  console.log(`Generated ${name} (${size}x${size})`);
}

const icoBuf = createICO([
  { width: 32, height: 32, buffer: generated['favicon-32x32.png'] },
  { width: 16, height: 16, buffer: generated['favicon-16x16.png'] },
]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
console.log('Generated favicon.ico (multi-resolution 32x32 + 16x16)');

