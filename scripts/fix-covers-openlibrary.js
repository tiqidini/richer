import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COVERS_DIR = path.join(__dirname, '../public/covers');

const booksToFix = [
    { filename: 'echo_burning.jpg', url: 'https://covers.openlibrary.org/b/id/6466826-L.jpg' },
    { filename: 'worth_dying_for.jpg', url: 'https://covers.openlibrary.org/b/id/6948882-L.jpg' },
    { filename: 'night_school.jpg', url: 'https://covers.openlibrary.org/b/id/8378396-L.jpg' }
];

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
            } else if (response.statusCode === 301 || response.statusCode === 302) {
                // Follow redirect
                downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
            } else {
                fs.unlink(filepath, () => {});
                reject(new Error(`Server responded with ${response.statusCode}: ${response.statusMessage}`));
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

async function main() {
    console.log('Downloading reliable covers from Open Library...');

    for (const book of booksToFix) {
        const filepath = path.join(COVERS_DIR, book.filename);
        try {
            // Delete old file first to be sure
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
            
            await downloadFile(book.url, filepath);
            
            const stats = fs.statSync(filepath);
            console.log(`[SUCCESS] ${book.filename}: ${stats.size} bytes`);
        } catch (error) {
            console.error(`[ERROR] ${book.filename}: ${error.message}`);
        }
    }
}

main();
