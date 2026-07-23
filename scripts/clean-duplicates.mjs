
import { existsSync, readdirSync, unlinkSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(__dirname, "..");
const publicImages = resolve(projectRoot, "public", "images");
const docsImages = resolve(projectRoot, "docs", "images");
const EXTS_PRIORITY = [".webp", ".jpg", ".jpeg", ".png"];
const FORCE_KEEP_JPG = ["g (17).jpg", "work-studio.jpg"];

function cleanDirectory(dir) {
  if (!existsSync(dir)) return;
  // Group files by name without extension
  const fileGroups = {};
  function walk(relPath) {
    const abs = join(dir, relPath);
    for (const entry of readdirSync(abs, { withFileTypes: true })) {
      const entryRel = join(relPath, entry.name);
      const entryAbs = join(abs, entry.name);
      if (entry.isDirectory()) {
        walk(entryRel);
        continue;
      }
      const ext = extname(entry.name).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;
      const baseName = entry.name.slice(0, -ext.length);
      const key = join(relPath, baseName);
      if (!fileGroups[key]) fileGroups[key] = [];
      fileGroups[key].push({ name: entry.name, ext, path: entryAbs, relPath: entryRel });
    }
  }
  walk("");

  // Process each group
  for (const [key, files] of Object.entries(fileGroups)) {
    if (files.length === 1) continue; // No duplicates
    console.log(`Duplicate group: ${key}`);
    // Check for force keep JPG
    const forceKeep = files.find((f) => FORCE_KEEP_JPG.includes(f.name));
    if (forceKeep) {
      console.log(`  Force keeping: ${forceKeep.name}`);
      files.forEach((f) => {
        if (f !== forceKeep) {
          console.log(`  Deleting: ${f.relPath}`);
          unlinkSync(f.path);
        }
      });
      continue;
    }
    // Find highest priority extension
    let keepFile;
    for (const ext of EXTS_PRIORITY) {
      keepFile = files.find((f) => f.ext === ext);
      if (keepFile) break;
    }
    if (keepFile) {
      console.log(`  Keeping: ${keepFile.name}`);
      files.forEach((f) => {
        if (f !== keepFile) {
          console.log(`  Deleting: ${f.relPath}`);
          unlinkSync(f.path);
        }
      });
    }
  }
}

console.log("Cleaning public/images...");
cleanDirectory(publicImages);
console.log("\nCleaning docs/images...");
cleanDirectory(docsImages);
console.log("\nDone!");
