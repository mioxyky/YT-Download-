import { copyFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { deflateSync } from "node:zlib";

const root = resolve(process.cwd());
const extensionDir = resolve(root, "extension");
const iconsDir = resolve(extensionDir, "icons");
const output = resolve(extensionDir, "dist", "yt-download-plus-extension.zip");
const publicOutput = resolve(root, "apps", "web", "public", "extension", "yt-download-plus-extension.zip");

function pngChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type), data])), 0);
  return Buffer.concat([length, Buffer.from(type), data, crc]);
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function rgbaForPixel(x, y, size) {
  const isBlueCorner = x > size * 0.72 && y < size * 0.28;
  const triangleStart = size * 0.36;
  const isPlayTriangle = x > triangleStart && x < size * 0.72 && Math.abs(y - size / 2) < (x - triangleStart) * 0.58;

  if (isPlayTriangle) {
    return [255, 255, 255, 255];
  }

  return isBlueCorner ? [47, 128, 237, 255] : [255, 0, 51, 255];
}

function writePngIcon(size) {
  const scanlines = [];
  for (let y = 0; y < size; y += 1) {
    const row = [0];
    for (let x = 0; x < size; x += 1) {
      row.push(...rgbaForPixel(x, y, size));
    }
    scanlines.push(Buffer.from(row));
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(Buffer.concat(scanlines), { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0))
  ]);

  writeFileSync(resolve(iconsDir, `icon-${size}.png`), png);
}

function generateIcons() {
  mkdirSync(iconsDir, { recursive: true });
  for (const size of [16, 48, 128]) {
    writePngIcon(size);
  }
}

mkdirSync(dirname(output), { recursive: true });
mkdirSync(dirname(publicOutput), { recursive: true });
rmSync(output, { force: true });
rmSync(publicOutput, { force: true });
generateIcons();

execFileSync(
  "zip",
  [
    "-r",
    output,
    "manifest.json",
    "src",
    "icons",
    "README.md",
    "-x",
    "dist/*"
  ],
  { cwd: extensionDir, stdio: "inherit" }
);

copyFileSync(output, publicOutput);
console.log(`Icônes générées dans : ${iconsDir}`);
console.log(`Extension ZIP créée : ${output}`);
console.log(`Copie publique créée : ${publicOutput}`);
