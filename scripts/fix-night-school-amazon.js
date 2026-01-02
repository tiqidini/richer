import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COVERS_DIR = path.join(__dirname, '../public/covers');

const target = {
    filename: 'night_school.jpg',
    url: 'https://images-na.ssl-images-amazon.com/images/P/B01C35OVVY.01.LZZZZZZZ.jpg'
};

function download(url, filepath) {
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
    console.log(`Downloading ${target.filename} from Amazon (Kindle edition)...`);
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
