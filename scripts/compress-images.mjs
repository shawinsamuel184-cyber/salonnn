/**
 * Compresses images in public/images/ for GitHub (smaller repo, faster Pages).
 * Skips files already under the size budget.
 */

import { existsSync, readdirSync, renameSync, statSync, unlinkSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesRoot = resolve(__dirname, "../public/images");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".bmp"]);

/** Max width + JPEG quality per folder (more aggressive for faster loads). */
const PROFILES = {
  cuts: { maxWidth: 250, quality: 45, maxBytes: 15 * 1024, preferWebp: true },
  services: { maxWidth: 400, quality: 55, maxBytes: 50 * 1024, preferWebp: true },
  about: { maxWidth: 500, quality: 55, maxBytes: 50 * 1024, preferWebp: true },
  hero: { maxWidth: 700, quality: 60, maxBytes: 80 * 1024, preferWebp: true },
  work: { maxWidth: 400, quality: 55, maxBytes: 50 * 1024, preferWebp: true },
};

const DEFAULT_PROFILE = { maxWidth: 800, quality: 80, maxBytes: 120 * 1024 };

function profileFor(relPath) {
  const folder = relPath.split(/[/\\]/)[0];
  return PROFILES[folder] ?? DEFAULT_PROFILE;
}

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (IMAGE_EXT.has(extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

async function compressOne(filePath) {
  const rel = filePath.slice(imagesRoot.length + 1);
  const profile = profileFor(rel);
  
  try {
    const before = statSync(filePath).size;

    if (before <= profile.maxBytes && extname(filePath).toLowerCase() === ".webp") {
      return { rel, before, after: before, skipped: true };
    }

    const tmpPath = `${filePath}.tmp`;
    const webpPath = filePath.replace(/\.[^.]+$/, ".webp");

    let pipeline = sharp(filePath).rotate().resize({
      width: profile.maxWidth,
      withoutEnlargement: true,
    }).webp({ quality: profile.quality });

    await pipeline.toFile(tmpPath);
    
    // Delete original file and any old versions
    try {
      if (existsSync(filePath)) unlinkSync(filePath);
    } catch (e) {
      // Ignore deletion errors if file is busy
    }
    try {
      if (filePath !== webpPath && existsSync(webpPath)) unlinkSync(webpPath);
    } catch (e) {
      // Ignore deletion errors if file is busy
    }
    
    renameSync(tmpPath, webpPath);
    const after = statSync(webpPath).size;
    return { rel, before, after, skipped: false, out: webpPath };
  } catch (e) {
    console.log(`[compress-images] Skipping ${rel}: ${e.message}`);
    return { rel, before: 0, after: 0, skipped: true, error: e };
  }
}

if (!existsSync(imagesRoot)) {
  console.log("[compress-images] No public/images folder — skipping.");
  process.exit(0);
}

const files = walk(imagesRoot);
if (!files.length) {
  console.log("[compress-images] No images found.");
  process.exit(0);
}

let saved = 0;
let processed = 0;

console.log(`[compress-images] Checking ${files.length} images…`);

for (const file of files) {
  const result = await compressOne(file);
  if (!result.skipped) {
    processed++;
    saved += result.before - result.after;
    console.log(
      `  ✓ ${result.rel}: ${Math.round(result.before / 1024)}KB → ${Math.round(result.after / 1024)}KB`
    );
  }
}

const total = walk(imagesRoot).reduce((sum, f) => sum + statSync(f).size, 0);
console.log(
  `[compress-images] Done. Compressed ${processed} file(s), saved ${Math.round(saved / 1024)}KB. Total images: ${Math.round(total / 1024 / 1024 * 100) / 100}MB`
);
