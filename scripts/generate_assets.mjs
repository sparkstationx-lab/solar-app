import fs from 'fs';
import path from 'path';

// Minimal 1x1 valid PNG Base64 transparent pixel buffer
const minimalPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
const pngBuffer = Buffer.from(minimalPngBase64, 'base64');

const assetsDir = path.join(process.cwd(), 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const assetFiles = ['icon.png', 'adaptive-icon.png', 'splash.png', 'favicon.png'];

assetFiles.forEach(file => {
  const filePath = path.join(assetsDir, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, pngBuffer);
    console.log(`Created placeholder asset: ${filePath}`);
  }
});
