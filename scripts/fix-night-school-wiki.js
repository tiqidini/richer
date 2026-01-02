import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COVERS_DIR = path.join(__dirname, '../public/covers');

const target = {
    filename: 'night_school.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/8/87/Night_School_%28Child_novel%29.jpg'
};

function download(url, filepath) {
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
    console.log(`Downloading ${target.filename} from Wikipedia...`);
    const filepath = path.join(COVERS_DIR, target.filename);
    
    try {
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        await download(target.url, filepath);
        const stats = fs.statSync(filepath);
        console.log(`Success! Size: ${stats.size} bytes`);
    } catch (e) {
        console.error(`Error: ${e.message}`);
    }
}

main();
