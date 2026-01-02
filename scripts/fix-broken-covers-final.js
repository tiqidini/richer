import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COVERS_DIR = path.join(__dirname, '../public/covers');

const manualCovers = [
    { 
        filename: 'echo_burning.jpg', 
        url: 'https://upload.wikimedia.org/wikipedia/en/7/7b/Echo_Burning.jpg' 
    },
    { 
        filename: 'worth_dying_for.jpg', 
        url: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Worth_Dying_For_cover.jpg' 
    },
    { 
        filename: 'night_school.jpg', 
        url: 'https://upload.wikimedia.org/wikipedia/en/8/87/Night_School_%28Child_novel%29.jpg' 
    }
];

function downloadImage(url, filepath) {
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    };

    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
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
    console.log('Downloading final missing covers from Wikipedia...');

    for (const book of manualCovers) {
        try {
            console.log(`Downloading ${book.filename}...`);
            const filepath = path.join(COVERS_DIR, book.filename);
            await downloadImage(book.url, filepath);
            const stats = fs.statSync(filepath);
            console.log(`  -> Saved ${stats.size} bytes`);
        } catch (error) {
            console.error(`  -> Error: ${error.message}`);
        }
    }
}

main();
