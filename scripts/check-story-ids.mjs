#!/usr/bin/env node
// Cross-check the type-derived catalog against the built Storybook index.
//
//   generated/components.json  ->  components[*].stories[*].id   (computed with Storybook's toId)
//   storybook-static/index.json ->  entries[*] (type 'story')     (what Storybook actually built)
//
// Fails when a catalog story id is missing from the index (dead reference the server would serve),
// or when the index has a story for a component that IS in the catalog but the catalog doesn't
// know that id (catalog is stale — run `npm run build:catalog`). Stories for components not yet in
// the catalog are ignored: new components land in the catalog on their own build step.
//
// Usage: node scripts/check-story-ids.mjs [--catalog path] [--index path]
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const arg = (flag, dflt) => {
  const i = process.argv.indexOf(flag);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
};
const catalogPath = resolve(arg('--catalog', 'generated/components.json'));
const indexPath = resolve(arg('--index', 'storybook-static/index.json'));

for (const p of [catalogPath, indexPath]) {
  if (!existsSync(p)) {
    console.error(`check-story-ids: missing ${p}${p === indexPath ? ' (run `npm run build-storybook` first)' : ''}`);
    process.exit(2);
  }
}

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const index = JSON.parse(readFileSync(indexPath, 'utf8'));

const components = Array.isArray(catalog.components) ? catalog.components : Object.values(catalog.components ?? {});
const indexStories = Object.values(index.entries ?? {}).filter((e) => e.type === 'story');

// Story ids are `<sanitized title>--<sanitized name>`; the prefix before `--` identifies the
// component (its Storybook title), which is how we scope the "unknown to catalog" check.
const titleKey = (id) => id.split('--')[0];

const catalogIds = new Set();
const catalogTitleKeys = new Set();
for (const c of components) {
  for (const s of c.stories ?? []) {
    catalogIds.add(s.id);
    catalogTitleKeys.add(titleKey(s.id));
  }
}
const indexIds = new Set(indexStories.map((e) => e.id));

const missingFromIndex = [...catalogIds].filter((id) => !indexIds.has(id)).sort();
const missingFromCatalog = indexStories
  .filter((e) => catalogTitleKeys.has(titleKey(e.id)) && !catalogIds.has(e.id))
  .map((e) => `${e.id}  (${e.importPath})`)
  .sort();

let failed = false;
if (missingFromIndex.length) {
  failed = true;
  console.error(`\n${missingFromIndex.length} catalog story id(s) not in storybook-static/index.json:`);
  for (const id of missingFromIndex) console.error(`  - ${id}`);
}
if (missingFromCatalog.length) {
  failed = true;
  console.error(`\n${missingFromCatalog.length} built story id(s) unknown to the catalog (run \`npm run build:catalog\`):`);
  for (const line of missingFromCatalog) console.error(`  - ${line}`);
}

const uncatalogued = new Set(indexStories.map((e) => titleKey(e.id)).filter((k) => !catalogTitleKeys.has(k)));
if (uncatalogued.size) {
  console.log(`note: ${uncatalogued.size} component title(s) in the index but not yet in the catalog (ignored): ${[...uncatalogued].join(', ')}`);
}

if (failed) process.exit(1);
console.log(
  `check-story-ids: OK — ${catalogIds.size} catalog story ids across ${components.length} components all present in the index (${indexIds.size} stories built).`,
);
