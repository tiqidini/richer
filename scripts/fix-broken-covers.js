import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COVERS_DIR = path.join(__dirname, '../public/covers');

const brokenBooks = [
    { id: 3, filename: 'tripwire.jpg', query: 'isbn:9780515128633' }, // Tripwire
    { id: 5, filename: 'echo_burning.jpg', query: 'isbn:9780515133316' }, // Echo Burning
    { id: 8, filename: 'the_enemy.jpg', query: 'isbn:9780440241014' }, // The Enemy
    { id: 10, filename: 'the_hard_way.jpg', query: 'isbn:9780440241038' }, // The Hard Way
    { id: 15, filename: 'worth_dying_for.jpg', query: 'isbn:9780440246293' }, // Worth Dying For
    { id: 16, filename: 'the_affair.jpg', query: 'isbn:9780440246309' }, // The Affair
    { id: 17, filename: 'a_wanted_man.jpg', query: 'isbn:9780440246316' }, // A Wanted Man
    { id: 21, filename: 'night_school.jpg', query: 'isbn:9780804176673' }, // Night School
    { id: 24, filename: 'blue_moon.jpg', query: 'isbn:9780399593543' } // Blue Moon
];

// OpenLibrary Covers API is simpler and reliable for public domain/common books
// Format: https://covers.openlibrary.org/b/isbn/9780385536355-L.jpg

async function downloadCover(book) {
    // Extract ISBN from query
    const isbn = book.query.split(':')[1];
    const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
    const filepath = path.join(COVERS_DIR, book.filename);

    console.log(`Downloading ${book.filename} from OpenLibrary (ISBN: ${isbn})...`);

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                 // Follow redirect
                 downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
                 return;
            }

            if (res.statusCode === 200) {
                 const stream = fs.createWriteStream(filepath);
                 res.pipe(stream);
                 stream.on('finish', () => {
                     stream.close();
                     // Check size
                     const stats = fs.statSync(filepath);
                     if (stats.size < 1000) {
                         console.log(`  -> Warning: ${book.filename} is too small (${stats.size} bytes). Might be a 1x1 pixel image.`);
                     } else {
                        console.log(`  -> Success! Saved to ${filepath}`);
                     }
                     resolve();
                 });
            } else {
                reject(new Error(`Status: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
             const stream = fs.createWriteStream(filepath);
             res.pipe(stream);
             stream.on('finish', () => {
                 stream.close();
                 resolve();
             });
        }).on('error', reject);
    });
}

async function main() {
    for (const book of brokenBooks) {
        try {
            await downloadCover(book);
            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error(`Failed to download ${book.filename}:`, error.message);
        }
    }
}

main();
