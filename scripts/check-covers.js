import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COVERS_DIR = path.join(__dirname, '../public/covers');

const files = fs.readdirSync(COVERS_DIR);

console.log('Checking file sizes in public/covers:');
files.forEach(file => {
    const filePath = path.join(COVERS_DIR, file);
    const stats = fs.statSync(filePath);
    if (stats.size < 1000) { // Less than 1KB is suspicious for an image
        console.log(`[WARNING] ${file}: ${stats.size} bytes (Likely broken/empty)`);
    } else {
        // console.log(`[OK] ${file}: ${stats.size} bytes`);
    }
});
