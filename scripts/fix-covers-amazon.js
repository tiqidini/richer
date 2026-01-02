import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COVERS_DIR = path.join(__dirname, '../public/covers');

const booksToFix = [
    { filename: 'worth_dying_for.jpg', url: 'https://images-na.ssl-images-amazon.com/images/P/0385344317.01.LZZZZZZZ.jpg' },
    { filename: 'night_school.jpg', url: 'https://images-na.ssl-images-amazon.com/images/P/038534435X.01.LZZZZZZZ.jpg' }
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
    console.log('Downloading Amazon covers for Lee Child books...');

    for (const book of booksToFix) {
        const filepath = path.join(COVERS_DIR, book.filename);
        try {
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
