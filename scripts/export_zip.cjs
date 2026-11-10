const fs = require('fs');
const path = require('path');
const { ZipArchive } = require('archiver');

const zipName = 'VizonSolar_Android_Project.zip';
const targetPath = path.join(process.cwd(), zipName);

console.log('Generating downloadable project archive...');

// Remove old zip if exists
if (fs.existsSync(targetPath)) {
  fs.unlinkSync(targetPath);
}

const output = fs.createWriteStream(targetPath);
const archive = new ZipArchive({ zlib: { level: 9 } });

output.on('close', () => {
  console.log(`\n✅ Project successfully archived (${(archive.pointer() / 1024).toFixed(1)} KB): ${zipName}`);
  console.log(`Archive location: ${targetPath}`);
});

archive.on('error', (err) => {
  console.error('Error archiving project:', err);
});

archive.pipe(output);

// Glob files excluding node_modules, dist, .aistudio, and zip files
archive.glob('**/*', {
  cwd: process.cwd(),
  ignore: [
    'node_modules/**',
    'dist/**',
    '.aistudio/**',
    '.git/**',
    '*.zip'
  ]
});

archive.finalize();
