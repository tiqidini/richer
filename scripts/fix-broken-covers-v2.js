import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COVERS_DIR = path.join(__dirname, '../public/covers');

const brokenBooks = [
    { id: 3, title: 'Tripwire', filename: 'tripwire.jpg' },
    { id: 5, title: 'Echo Burning', filename: 'echo_burning.jpg' },
    { id: 8, title: 'The Enemy', filename: 'the_enemy.jpg' },
    { id: 10, title: 'The Hard Way', filename: 'the_hard_way.jpg' },
    { id: 15, title: 'Worth Dying For', filename: 'worth_dying_for.jpg' },
    { id: 16, title: 'The Affair', filename: 'the_affair.jpg' },
    { id: 17, title: 'A Wanted Man', filename: 'a_wanted_man.jpg' },
    { id: 21, title: 'Night School', filename: 'night_school.jpg' },
    { id: 24, title: 'Blue Moon', filename: 'blue_moon.jpg' }
];

async function fetchCoverUrl(title) {
    return new Promise((resolve, reject) => {
        const query = encodeURIComponent(`intitle:${title} inauthor:Lee Child`);
        // Use Google Books API
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.items && json.items.length > 0) {
                        const volumeInfo = json.items[0].volumeInfo;
                        const imageLinks = volumeInfo.imageLinks;
                        if (imageLinks) {
                            // Try to get the largest possible image
                            // Sometimes extraLarge or large are available but hidden in 'other' fields or need modification
                            let coverUrl = imageLinks.extraLarge || imageLinks.large || imageLinks.medium || imageLinks.thumbnail;
                            
                            if (coverUrl) {
                                // Force HTTPS and remove zoom to get larger image if possible
                                coverUrl = coverUrl.replace('http:', 'https:').replace('&edge=curl', '');
                                // Hack: Try to remove zoom parameter entirely or set to 0
                                // Google Books API often returns small thumbnails with zoom=1.
                                // Replacing with zoom=0 sometimes gives a larger raw image.
                                // But reliable way is usually just using the thumbnail provided.
                                resolve(coverUrl);
                            } else {
                                resolve(null);
                            }
                        } else {
                            resolve(null);
                        }
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function downloadImage(url, filepath) {
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
    console.log('Retrying broken covers with Google Books API...');

    for (const book of brokenBooks) {
        try {
            console.log(`Searching for ${book.title}...`);
            const url = await fetchCoverUrl(book.title);
            
            if (url) {
                console.log(`  -> Found URL: ${url}`);
                const filepath = path.join(COVERS_DIR, book.filename);
                await downloadImage(url, filepath);
                
                const stats = fs.statSync(filepath);
                console.log(`  -> Saved ${stats.size} bytes to ${book.filename}`);
            } else {
                console.log(`  -> No cover found for ${book.title}`);
            }
            
            // Random delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 800));

        } catch (error) {
            console.error(`  -> Error processing ${book.title}:`, error.message);
        }
    }
}

main();
