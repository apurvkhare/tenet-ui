// Aggregate every component's *.docs.json into generated/components.json — the prop catalog
// the design-system skill ingests (same shape as Primer's generated/components.json).
// Run: node scripts/build-catalog.mjs
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = resolvePath(root, 'src/components');

const components = {};
for (const name of readdirSync(componentsDir)) {
  const dir = join(componentsDir, name);
  if (!statSync(dir).isDirectory()) continue;
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.docs.json')) continue;
    const docs = JSON.parse(readFileSync(join(dir, file), 'utf8'));
    components[docs.id] = docs;
  }
}

mkdirSync(resolvePath(root, 'generated'), { recursive: true });
const out = {
  schemaVersion: 1,
  generatedFrom: 'src/components/**/*.docs.json',
  components,
};
writeFileSync(resolvePath(root, 'generated/components.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`Built catalog: ${Object.keys(components).length} components -> generated/components.json`);
