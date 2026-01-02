import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COVERS_DIR = path.join(__dirname, '../public/covers');

const missing = [
    { title: 'Echo Burning', filename: 'echo_burning.jpg', isbn: '0515133310' },
    { title: 'Worth Dying For', filename: 'worth_dying_for.jpg', isbn: '044024629X' },
    { title: 'Night School', filename: 'night_school.jpg', isbn: '0804176670' }
];

async function download(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const stream = fs.createWriteStream(filepath);
                res.pipe(stream);
                stream.on('finish', () => {
                    stream.close();
                    resolve();
                });
            } else {
                reject(new Error(`Status ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

async function main() {
    // Fallback URLs (found manually to ensure they work)
    const manualUrls = {
        'Echo Burning': 'https://books.google.com/books/content?id=KimuEAAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api',
        'Worth Dying For': 'https://books.google.com/books/content?id=y5xGEAAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api',
        'Night School': 'https://books.google.com/books/content?id=jkhTDwAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api'
    };

    for (const book of missing) {
        console.log(`Downloading ${book.title}...`);
        try {
            const url = manualUrls[book.title];
            const filepath = path.join(COVERS_DIR, book.filename);
            await download(url, filepath);
            const stats = fs.statSync(filepath);
            console.log(`  -> Success! ${stats.size} bytes`);
        } catch (e) {
            console.error(`  -> Failed: ${e.message}`);
        }
    }
}

main();
