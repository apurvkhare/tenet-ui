#!/usr/bin/env node
// Copy the tenet-ui data files the rules depend on into data/ so the plugin works
// even when the consumer has no tenet-ui installed (bundled fallback).
// Run from packages/eslint-plugin: `npm run sync-data`.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(pkgDir, '..', '..');
const outDir = resolve(pkgDir, 'data');
mkdirSync(outDir, { recursive: true });

const files = [
  ['dist/tokens.json', 'tokens.json'],
  ['generated/components.json', 'components.json'],
  ['generated/deprecations.json', 'deprecations.json'],
];

let failed = false;
for (const [from, to] of files) {
  const src = resolve(repoRoot, from);
  if (!existsSync(src)) {
    console.error(`sync-data: missing ${from} (run \`npm run build\` at the repo root first)`);
    failed = true;
    continue;
  }
  copyFileSync(src, resolve(outDir, to));
  const json = JSON.parse(readFileSync(src, 'utf8'));
  const count = Array.isArray(json) ? json.length
    : json.components ? Object.keys(json.components).length
    : json.deprecations ? json.deprecations.length
    : Object.keys(json).length;
  console.log(`sync-data: ${from} -> data/${to} (${count} entries${json.version ? `, tenet-ui@${json.version}` : ''})`);
}
process.exit(failed ? 1 : 0);
