#!/usr/bin/env node
// Lint the fixtures with the recommended config and print the findings (the on-stage demo).
// Usage: node scripts/demo.mjs <file...> [--with-fixture-deprecations] [--json]
import { ESLint } from 'eslint';
import tsParser from '@typescript-eslint/parser';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import plugin, { dataSources } from '../index.js';
import { FIXTURE_DEPRECATIONS } from '../fixtures/registry.js';

const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const withFixtureDeprecations = args.includes('--with-fixture-deprecations');
const asJson = args.includes('--json');
const files = args.filter((a) => !a.startsWith('--'));
if (!files.length) files.push('fixtures/violations.tsx', 'fixtures/app/main.tsx');

const settings = withFixtureDeprecations ? { 'tenet-ui': { deprecations: FIXTURE_DEPRECATIONS } } : {};

const eslint = new ESLint({
  cwd: pkgDir,
  overrideConfigFile: true,
  overrideConfig: [
    plugin.configs.recommended,
    { files: ['**/*.{ts,tsx}'], languageOptions: { parser: tsParser } },
    { settings },
  ],
});

const results = await eslint.lintFiles(files);
const ruleMeta = eslint.getRulesMetaForResults(results);

if (asJson) {
  console.log(JSON.stringify(results.map((r) => ({ file: relative(pkgDir, r.filePath), messages: r.messages })), null, 2));
  process.exit(results.some((r) => r.errorCount) ? 1 : 0);
}

const sources = dataSources();
const short = (s) => (s.startsWith('bundled:') ? s : relative(pkgDir, s));
console.log('\neslint-plugin-tenet-ui demo');
console.log(`data: tokens ${short(sources.tokens)} | components ${short(sources.components)} | deprecations ${withFixtureDeprecations ? 'fixtures/registry.js (0.4.0 fixture)' : short(sources.deprecations)}`);

let total = 0;
const perRule = {};
for (const r of results) {
  if (!r.messages.length) continue;
  console.log(`\n${relative(pkgDir, r.filePath)}`);
  for (const m of r.messages) {
    total += 1;
    perRule[m.ruleId] = (perRule[m.ruleId] || 0) + 1;
    const fixable = m.fix ? ' [fixable]' : m.suggestions?.length ? ' [suggestion]' : '';
    console.log(`  ${String(m.line).padStart(3)}:${String(m.column).padEnd(3)} ${(m.ruleId || 'parse').padEnd(31)} ${m.message}${fixable}`);
  }
}

console.log('\nby rule');
for (const [id, n] of Object.entries(perRule).sort()) {
  const url = ruleMeta[id]?.docs?.url || '';
  console.log(`  ${String(n).padStart(3)}  ${id.padEnd(31)} ${url}`);
}
console.log(`\n${total} findings in ${results.length} file(s).` + (total ? ' NOT tenet-ui compliant.' : ' Compliant.'));
process.exit(total ? 1 : 0);
