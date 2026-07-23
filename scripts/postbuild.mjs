// Copies the entire build output into /docs for GitHub Pages (branch: main, folder: /docs).

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const distDir = resolve(projectRoot, "dist");
const docsDir = resolve(projectRoot, "docs");
const publicImages = resolve(projectRoot, "public", "images");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".bmp"]);

const srcIndex = resolve(distDir, "index.html");

if (!existsSync(srcIndex)) {
  console.error("[postbuild] dist/index.html not found. Run `npm run build` first.");
  process.exit(1);
}

// Clear out docs dir and copy everything from dist
rmSync(docsDir, { recursive: true, force: true });
mkdirSync(docsDir, { recursive: true });

// Copy entire dist folder contents
function copyAll(src, dest) {
  function walk(relDir) {
    const abs = join(src, relDir);
    if (!existsSync(abs)) return;

    for (const entry of readdirSync(abs, { withFileTypes: true })) {
      const rel = relDir ? join(relDir, entry.name) : entry.name;
      const from = join(src, rel);
      const to = join(dest, rel);

      if (entry.isDirectory()) {
        mkdirSync(to, { recursive: true });
        walk(rel);
      } else {
        copyFileSync(from, to);
      }
    }
  }
  walk("");
}

copyAll(distDir, docsDir);

// Also copy images from public/images to docs/images to ensure they're present
if (existsSync(publicImages)) {
  // First, remove existing images (from dist might not have all public/images)
  const docsImages = resolve(docsDir, "images");
  rmSync(docsImages, { recursive: true, force: true });
  function copyImagesOnly(src, dest) {
    mkdirSync(dest, { recursive: true });
    function walk(relDir) {
      const abs = join(src, relDir);
      if (!existsSync(abs)) return;
      for (const entry of readdirSync(abs, { withFileTypes: true })) {
        const rel = relDir ? join(relDir, entry.name) : entry.name;
        const from = join(src, rel);
        const to = join(dest, rel);
        if (entry.isDirectory()) {
          mkdirSync(to, { recursive: true });
          walk(rel);
        } else if (IMAGE_EXT.has(extname(entry.name).toLowerCase())) {
          mkdirSync(dirname(to), { recursive: true });
          copyFileSync(from, to);
        }
      }
    }
    walk("");
  }
  copyImagesOnly(publicImages, docsImages);
  const count = walkCount(docsImages);
  const bytes = folderSize(docsImages);
  console.log(`  - docs/images/ (${count} photos, ${Math.round(bytes / 1024 / 1024 * 100) / 100}MB)`);
}

writeFileSync(resolve(docsDir, ".nojekyll"), "");

function walkCount(dir) {
  if (!existsSync(dir)) return 0;
  let n = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) n += walkCount(p);
    else if (IMAGE_EXT.has(extname(entry.name).toLowerCase())) n++;
  }
  return n;
}

function folderSize(dir) {
  if (!existsSync(dir)) return 0;
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) total += folderSize(p);
    else total += statSync(p).size;
  }
  return total;
}

console.log("[postbuild] Copied all dist/ → docs/");
console.log("\nPush to main, then GitHub Pages → branch main, folder /docs");
console.log("(Run npm run build before pushing so docs/ is generated)");
