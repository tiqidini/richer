import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COVERS_DIR = path.join(__dirname, '../public/covers');

const bookToFix = { 
    filename: 'night_school.jpg', 
    // Direct high-res link from Goodreads
    url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1460927778i/28677701.jpg' 
};

function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                fs.unlink(filepath, () => {});
                reject(new Error(`Server responded with ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

async function main() {
    console.log(`Fixing ${bookToFix.filename}...`);
    const filepath = path.join(COVERS_DIR, bookToFix.filename);
    
    try {
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        
        await downloadFile(bookToFix.url, filepath);
        
        const stats = fs.statSync(filepath);
        console.log(`[SUCCESS] Saved ${stats.size} bytes`);
    } catch (error) {
        console.error(`[ERROR] ${error.message}`);
    }
}

main();
