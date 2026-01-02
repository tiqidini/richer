import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COVERS_DIR = path.join(__dirname, '../public/covers');

const svgContent = `
<svg width="300" height="450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
  <rect width="90%" height="90%" x="5%" y="5%" fill="none" stroke="#334155" stroke-width="2" />
  
  <text x="50%" y="30%" font-family="Arial, sans-serif" font-size="24" fill="#94a3b8" text-anchor="middle" font-weight="bold">LEE CHILD</text>
  
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="40" fill="#f8fafc" text-anchor="middle" font-weight="bold" dy="0">NIGHT</text>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="40" fill="#f8fafc" text-anchor="middle" font-weight="bold" dy="45">SCHOOL</text>
  
  <text x="50%" y="80%" font-family="Arial, sans-serif" font-size="16" fill="#22d3ee" text-anchor="middle">JACK REACHER</text>
</svg>
`;

const filepath = path.join(COVERS_DIR, 'night_school.jpg'); // Saving as .jpg but content is SVG? No, browsers might choke.
// I should save as .svg and update books.ts OR convert to JPG if I could (no sharp lib here).
// Actually, browsers render SVG as image fine if the extension matches content type, or sometimes leniently.
// But to be safe, I'll save as .svg and update books.ts.

const svgFilepath = path.join(COVERS_DIR, 'night_school.svg');
fs.writeFileSync(svgFilepath, svgContent.trim());
console.log('Created night_school.svg');
