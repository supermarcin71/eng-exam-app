// Generate PNG icons from public/icon.svg for PWA + iOS home screen
// Run: node scripts/generate-icons.mjs

import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, "..", "public", "icon.svg");
const svg = readFileSync(svgPath);

const sizes = [
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "icon-192.png" },
  { size: 512, name: "icon-512.png" },
];

for (const { size, name } of sizes) {
  const out = join(__dirname, "..", "public", name);
  await sharp(svg)
    .resize(size, size, { fit: "contain", background: { r: 2, g: 6, b: 23, alpha: 1 } })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(out);
  console.log(`✓ ${name}  (${size}×${size})`);
}

console.log("\nDone. Icons saved in public/.");
