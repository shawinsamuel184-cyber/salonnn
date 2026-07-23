
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirsToProcess = [
  path.resolve('public/images/about'),
  path.resolve('public/images/hero')
];

const excludeFiles = ['g (17).jpg'];

async function convertAll() {
  for (const dir of dirsToProcess) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(file => {
      if (excludeFiles.includes(file)) return false;
      return (
        file.toLowerCase().endsWith('.jpg') ||
        file.toLowerCase().endsWith('.jpeg') ||
        file.toLowerCase().endsWith('.png')
      );
    });
    console.log(`Found ${files.length} to convert in ${dir}`);
    for (const file of files) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, path.basename(file, path.extname(file)) + '.webp');
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log('Converted:', file);
        fs.unlinkSync(inputPath);
      } catch (err) {
        console.error('Error converting', file, err);
      }
    }
  }
  console.log('Done!');
}

convertAll();
