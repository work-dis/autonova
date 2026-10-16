import { access, readFile, stat } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
const requiredFiles = [
  'index.html',
  'styles.css',
  'app.js',
  'assets/autonova-hero.png'
];

for (const file of requiredFiles) {
  const absolutePath = resolve(output, file);
  await access(absolutePath, constants.R_OK);
  const info = await stat(absolutePath);

  if (!info.isFile() || info.size === 0) {
    throw new Error(`Invalid build artifact: dist/${file}`);
  }
}

const html = await readFile(resolve(output, 'index.html'), 'utf8');
for (const reference of ['styles.css', 'app.js', 'assets/autonova-hero.png']) {
  if (!html.includes(reference)) {
    throw new Error(`index.html is missing required reference: ${reference}`);
  }
}

console.log('AUTONOVA static build verified: dist/ is ready to deploy.');
