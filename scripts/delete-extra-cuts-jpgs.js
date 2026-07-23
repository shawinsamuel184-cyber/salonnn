
import fs from 'fs';
import path from 'path';

const cutsDir = path.resolve('public/images/cuts');
const allFiles = fs.readdirSync(cutsDir);

const jpgFilesToDelete = allFiles.filter(file => 
  (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) && 
  file !== "g (17).jpg"
);

console.log('Deleting these extra cut JPGs: ', jpgFilesToDelete);

for (const file of jpgFilesToDelete) {
  try {
    fs.unlinkSync(path.join(cutsDir, file));
    console.log('Deleted:', file);
  } catch (err) {
    console.error('Error deleting', file, err);
  }
}
console.log('Done deleting extra cut JPGs (kept g (17).jpg)');
