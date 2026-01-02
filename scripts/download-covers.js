import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import books data
// Since we are in a ESM script, we might need to adjust how we import TS files
// But for simplicity, I'll define the slugs here or extract titles from the existing file if possible.
// Actually, let's read the books.ts content and extract what we need.

const BOOKS_PATH = path.join(__dirname, '../src/data/books.ts');
const COVERS_DIR = path.join(__dirname, '../public/covers');

if (!fs.existsSync(COVERS_DIR)) {
    fs.mkdirSync(COVERS_DIR, { recursive: true });
}

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '_')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                res.consume();
                reject(new Error(`Request Failed With Status Code: ${res.statusCode}`));
            }
        });
    });
}

// Map from cover-urls.js and books.ts (manual extraction for reliability in script)
const coverMapping = {
    1: { title: "Killing Floor", url: "https://books.google.com/books/content?id=xbA4gFJBZ_UC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    2: { title: "Die Trying", url: "https://books.google.com/books/content?id=IaOL_j36Z14C&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    3: { title: "Tripwire", url: "https://books.google.com/books/content?id=_duwAAAAIAAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
    4: { title: "Running Blind", url: "https://books.google.com/books/content?id=r0hw66pmL8wC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    5: { title: "Echo Burning", url: "https://books.google.com/books/publisher/content?id=KimuEAAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
    6: { title: "Without Fail", url: "https://books.google.com/books/content?id=niTmWRSlDjMC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    7: { title: "Persuader", url: "https://books.google.com/books/content?id=mEbzPpHiKKAC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    8: { title: "The Enemy", url: "https://books.google.com/books/content?id=DmJaAAAAMAAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
    9: { title: "One Shot", url: "https://books.google.com/books/content?id=rgei2uosFwMC&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
    10: { title: "The Hard Way", url: "https://books.google.com/books/content?id=qc9lAAAAMAAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
    11: { title: "Bad Luck and Trouble", url: "https://books.google.com/books/content?id=edQprHSGEkIC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    12: { title: "Nothing to Lose", url: "https://books.google.com/books/content?id=T5q_Z5RWLDIC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    13: { title: "Gone Tomorrow", url: "https://books.google.com/books/content?id=y22OLzMUWYIC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    14: { title: "61 Hours", url: "https://books.google.com/books/content?id=-Fd3RY1sO_QC&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
    15: { title: "Worth Dying For", url: "https://books.google.com/books/publisher/content?id=y5xGEAAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
    16: { title: "The Affair", url: "https://books.google.com/books/content?id=0LaPEAAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
    17: { title: "A Wanted Man", url: "https://books.google.com/books/content?id=lwKNEAAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
    18: { title: "Never Go Back", url: "https://books.google.com/books/content?id=-YQrSpGawW4C&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    19: { title: "Personal", url: "https://books.google.com/books/content?id=p3JNEQAAQBAJ&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    20: { title: "Make Me", url: "https://books.google.com/books/content?id=nTGiBQAAQBAJ&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    21: { title: "Night School", url: "https://books.google.com/books/publisher/content?id=jkhTDwAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
    23: { title: "Past Tense", url: "https://books.google.com/books/content?id=eH5LDwAAQBAJ&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    24: { title: "Blue Moon", url: "https://books.google.com/books/publisher/content?id=wcKMDwAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api" },
    25: { title: "The Sentinel", url: "https://books.google.com/books/content?id=k7fNDwAAQBAJ&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    26: { title: "Better Off Dead", url: "https://books.google.com/books/content?id=tYMSEAAAQBAJ&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" },
    27: { title: "No Plan B", url: "https://books.google.com/books/content?id=vn9XEAAAQBAJ&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" }
};

async function main() {
    console.log('Starting cover downloads...');

    for (const [id, data] of Object.entries(coverMapping)) {
        const filename = `${slugify(data.title)}.jpg`;
        const filepath = path.join(COVERS_DIR, filename);

        if (fs.existsSync(filepath)) {
            console.log(`Skipping ${data.title} (already exists)`);
            continue;
        }

        try {
            console.log(`Downloading ${data.title}...`);
            await downloadImage(data.url, filepath);
            console.log(`Saved to ${filename}`);
            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error(`Failed to download ${data.title}:`, error.message);
        }
    }

    console.log('All downloads finished.');
}

main();
