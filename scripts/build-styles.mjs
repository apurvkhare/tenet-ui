// Merge the token theme CSS (dist/tokens.css) with the component CSS that tsup/esbuild
// extracted (dist/index.css) into a single importable stylesheet: dist/styles.css.
// Consumers then need just: import '@tenet/ds/styles.css'.
// Run after build:tokens and build:js. Run: node scripts/build-styles.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '');

const tokens = read(resolvePath(root, 'dist/tokens.css'));
const components = read(resolvePath(root, 'dist/index.css'));
if (!tokens) throw new Error('dist/tokens.css missing — run build:tokens first');

const out = `/* @tenet/ds bundled stylesheet — tokens (themes) + component styles. Import once at the app root. */\n\n${tokens}\n${components}`;
writeFileSync(resolvePath(root, 'dist/styles.css'), out);
console.log(`Built dist/styles.css (${tokens.length + components.length} bytes: tokens + components)`);
