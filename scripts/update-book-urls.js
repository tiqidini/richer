
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const booksFilePath = path.join(projectRoot, 'src', 'data', 'books.ts');

const sanitizeFilename = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');
};

const main = () => {
    if (!fs.existsSync(booksFilePath)) {
        console.error(`File not found: ${booksFilePath}`);
        process.exit(1);
    }

    let content = fs.readFileSync(booksFilePath, 'utf-8');

    // Regex to capture the block and extract originalTitle to generate the new URL
    // Group 1: Prefix up to originalTitle value
    // Group 2: originalTitle value
    // Group 3: Middle part up to coverUrl value
    // Group 4: Old coverUrl value
    // Group 5: Suffix (closing quote)
    const regex = /({\s*id:\s*\d+,[\s\S]*?originalTitle:\s*")([^"]+)("[\s\S]*?coverUrl:\s*")([^"]+)(")/g;

    let updatedCount = 0;

    const newContent = content.replace(regex, (match, p1, originalTitle, p3, oldUrl, p5) => {
        const newFilename = `${sanitizeFilename(originalTitle)}.jpg`;
        const newUrl = `/covers/${newFilename}`;

        if (oldUrl === newUrl) {
            return match;
        }

        updatedCount++;
        console.log(`Updating "${originalTitle}": \n  Old: ${oldUrl}\n  New: ${newUrl}`);
        return `${p1}${originalTitle}${p3}${newUrl}${p5}`;
    });

    if (updatedCount > 0) {
        fs.writeFileSync(booksFilePath, newContent, 'utf-8');
        console.log(`\nSuccessfully updated ${updatedCount} book(s) in books.ts`);
    } else {
        console.log('\nNo changes needed. All URLs are already up to date.');
    }
};

main();
