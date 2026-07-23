
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const srcDir = path.resolve('public/images');
const destDir = path.resolve('docs/images');

console.log('Syncing public/images to docs/images exactly...');

// Clean destination dir (delete everything in docs/images)
if (fs.existsSync(destDir)) {
  console.log('Deleting existing docs/images contents...');
  const items = fs.readdirSync(destDir);
  for (const item of items) {
    const itemPath = path.join(destDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      fs.rmSync(itemPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(itemPath);
    }
  }
} else {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy all files from srcDir to destDir using cp (Windows compatible via child_process)
console.log('Copying public/images to docs/images...');

if (process.platform === 'win32') {
  // Windows: use robocopy (robocopy src dest /E /IS /IT)
  // /E copies all subdirs, /IS copies same files, /IT copies tweaked files
  try {
    execSync(`robocopy "${srcDir}" "${destDir}" /E /IS /IT /NFL /NDL /NJH /NJS`, { stdio: 'inherit' });
  } catch (error) {
    // Robocopy exits 0-8; 0-7 are ok, >=8 is error!
    if (error.status && error.status >= 8) {
      throw error;
    }
    // Else ignore, it's a robocopy success status!
  }
} else {
  // Unix: use cp -r
  execSync(`cp -r "${srcDir}/"* "${destDir}/"`, { stdio: 'inherit' });
}

console.log('Successfully synced docs/images to match public/images exactly!');
