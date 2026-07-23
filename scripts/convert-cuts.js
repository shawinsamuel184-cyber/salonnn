
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const cutsDir = path.resolve('public/images/cuts');
const jpgFiles = fs.readdirSync(cutsDir).filter(file => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'));

console.log(`Found ${jpgFiles.length} JPG files to convert to WebP in public/images/cuts`);

async function convertAll() {
  for (const file of jpgFiles) {
    const inputPath = path.join(cutsDir, file);
    const outputPath = path.join(cutsDir, path.basename(file, path.extname(file)) + '.webp');
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Converted ${file} → ${path.basename(outputPath)}`);
      
      // Delete original JPG after converting
      fs.unlinkSync(inputPath);
      console.log(`Deleted original JPG: ${file}`);
    } catch (error) {
      console.error(`Failed to convert ${file}:`, error);
    }
  }
  
  console.log('All cuts converted to WebP!');
}

convertAll();
