import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import plugin, { rules, createConfig } from '../index.js';
import { loadBaseData, resetDataCache, buildIndexes } from '../lib/data.js';
import { matchesGlob } from '../lib/glob.js';

const RULE_IDS = ['no-raw-color', 'no-raw-spacing', 'prefer-component', 'require-styles-import', 'no-deprecated-api', 'no-unknown-token'];

describe('plugin shape', () => {
  it('exposes meta, six rules and a recommended config', () => {
    assert.equal(plugin.meta.name, 'eslint-plugin-tenet-ui');
    assert.match(plugin.meta.version, /^\d+\.\d+\.\d+/);
    assert.deepEqual(Object.keys(plugin.rules).sort(), RULE_IDS.slice().sort());
    assert.equal(rules, plugin.rules);
    for (const id of RULE_IDS) {
      const r = plugin.rules[id];
      assert.ok(r.meta.docs.description, `${id} has a description`);
      assert.match(r.meta.docs.url, /^https:\/\/tenet-ui\.pages\.dev\//, `${id} links to the guidelines`);
      assert.ok(Object.keys(r.meta.messages).length > 0, `${id} has messages`);
    }
  });

  it('recommended is a flat-config object with every rule at error and JSX enabled', () => {
    const cfg = plugin.configs.recommended;
    assert.equal(cfg.plugins['tenet-ui'], plugin);
    assert.deepEqual(cfg.files, ['**/*.{js,jsx,ts,tsx}']);
    assert.equal(cfg.languageOptions.parserOptions.ecmaFeatures.jsx, true);
    assert.deepEqual(Object.keys(cfg.rules).sort(), RULE_IDS.map((id) => `tenet-ui/${id}`).sort());
    for (const v of Object.values(cfg.rules)) assert.equal(v, 'error');
  });

  it('createConfig threads options and settings through', () => {
    const cfg = createConfig({ entry: ['src/main.tsx'], exceptions: ['#000'], allow: ['a'], allowScale: true, settings: { deprecations: { deprecations: [] } }, severity: 'warn' });
    assert.deepEqual(cfg.rules['tenet-ui/require-styles-import'], ['warn', { entry: ['src/main.tsx'] }]);
    assert.deepEqual(cfg.rules['tenet-ui/no-raw-color'], ['warn', { exceptions: ['#000'] }]);
    assert.deepEqual(cfg.rules['tenet-ui/prefer-component'], ['warn', { allow: ['a'] }]);
    assert.deepEqual(cfg.rules['tenet-ui/no-raw-spacing'], ['warn', { allowScale: true }]);
    assert.equal(cfg.rules['tenet-ui/no-deprecated-api'], 'warn');
    assert.deepEqual(cfg.settings, { 'tenet-ui': { deprecations: { deprecations: [] } } });
    assert.equal(createConfig().settings, undefined);
  });
});

describe('data resolution', () => {
  const originalCwd = process.cwd();
  const scratch = join(process.env.CLAUDE_SCRATCHPAD ?? tmpdir(), `eslint-plugin-tenet-ui-${process.pid}`);

  it('prefers the consumer-installed tenet-ui package exports', () => {
    const pkgDir = join(scratch, 'consumer', 'node_modules', 'tenet-ui');
    mkdirSync(join(pkgDir, 'dist'), { recursive: true });
    mkdirSync(join(pkgDir, 'generated'), { recursive: true });
    writeFileSync(join(pkgDir, 'package.json'), JSON.stringify({
      name: 'tenet-ui', version: '9.9.9', type: 'module',
      exports: { './tokens.json': './dist/tokens.json', './generated/components.json': './generated/components.json', './generated/deprecations.json': './generated/deprecations.json' },
    }));
    writeFileSync(join(pkgDir, 'dist', 'tokens.json'), JSON.stringify({ 'space-1': { name: 'space-1', cssVar: '--space-1', type: 'dimension', value: '4px' } }));
    writeFileSync(join(pkgDir, 'generated', 'components.json'), JSON.stringify({ schemaVersion: 2, version: '9.9.9', components: { widget: { id: 'widget', name: 'Widget', props: [], subcomponents: [] } } }));
    writeFileSync(join(pkgDir, 'generated', 'deprecations.json'), JSON.stringify({ deprecations: [{ kind: 'component', component: 'Old', replacement: 'New', since: '9.9.9' }] }));
    try {
      process.chdir(join(scratch, 'consumer'));
      resetDataCache();
      const data = loadBaseData();
      assert.ok(data.sources.tokens.endsWith(join('node_modules', 'tenet-ui', 'dist', 'tokens.json')), data.sources.tokens);
      const idx = buildIndexes(data);
      assert.deepEqual([...idx.cssVars], ['--space-1']);
      assert.ok(idx.componentNames.has('Widget'));
      assert.ok(idx.deprecatedComponents.has('Old'));
    } finally {
      process.chdir(originalCwd);
      resetDataCache();
      rmSync(scratch, { recursive: true, force: true });
    }
  });

  it('falls back to the bundled data when no tenet-ui is installed', () => {
    mkdirSync(join(scratch, 'empty'), { recursive: true });
    try {
      process.chdir(join(scratch, 'empty'));
      resetDataCache();
      const data = loadBaseData();
      assert.equal(data.sources.tokens, 'bundled:data/tokens.json');
      assert.equal(data.sources.components, 'bundled:data/components.json');
      assert.equal(data.sources.deprecations, 'bundled:data/deprecations.json');
      const idx = buildIndexes(data);
      assert.ok(idx.cssVars.has('--fgColor-default'));
      assert.ok(idx.componentNames.has('Button'));
      assert.ok(idx.componentNames.has('FormControl.Label'), 'subcomponents are indexed by dotted name');
    } finally {
      process.chdir(originalCwd);
      resetDataCache();
      rmSync(scratch, { recursive: true, force: true });
    }
  });

  it('indexes colours by normalised value, semantic tokens first', () => {
    resetDataCache();
    const idx = buildIndexes(loadBaseData());
    assert.deepEqual(idx.byColor.get('#ffffff'), ['bgColor-default', 'fgColor-onEmphasis', 'base-color-white']);
    assert.deepEqual(idx.byPx.get(12), ['fontSize-0', 'space-3', 'base-size-12']);
    assert.ok(idx.deprecatedProps.has('Button.block'));
    assert.ok(idx.deprecatedComponents.has('Label'));
  });
});

describe('glob matcher', () => {
  it('handles **, braces, ? and basename patterns', () => {
    assert.ok(matchesGlob('/a/b/src/main.tsx', '**/main.{tsx,jsx,ts,js}'));
    assert.ok(matchesGlob('main.tsx', '**/main.{tsx,jsx,ts,js}'));
    assert.ok(!matchesGlob('/a/b/src/main.test.tsx', '**/main.{tsx,jsx,ts,js}'));
    assert.ok(!matchesGlob('/a/b/src/main.css', '**/main.{tsx,jsx,ts,js}'));
    assert.ok(matchesGlob('src/main.tsx', 'src/main.tsx'));
    assert.ok(!matchesGlob('src/main.tsx', 'lib/main.tsx'));
    assert.ok(matchesGlob('/x/apps/web/entry.client.tsx', '**/entry.*.tsx'));
    assert.ok(matchesGlob('/x/App.tsx', 'App.tsx'), 'a pattern without a slash matches the basename');
    assert.ok(matchesGlob('/x/a1.ts', '**/a?.ts'));
    assert.ok(!matchesGlob('/x/a12.ts', '**/a?.ts'));
  });
});
