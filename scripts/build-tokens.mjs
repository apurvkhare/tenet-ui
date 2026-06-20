// Build resolved design-token artifacts from the single source of truth.
//   tokens/tokens.json  ->  dist/tokens.json (flat registry, light+dark)  +  dist/tokens.css (themed CSS vars)
//
// Theming model (mirrors how real systems like Primer ship):
//   - base.* and the theme-agnostic semantics (space, borderRadius, fontSize, control, …) -> :root
//   - themes.light.* / themes.dark.* color tokens -> :root (light default) + [data-color-mode="…"] scopes
// CSS var name strips the "themes.<theme>" prefix, so both themes define the same --fgColor-* names.
//
// Plain Node, no dependencies. Run with: node scripts/build-tokens.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(readFileSync(resolvePath(root, 'tokens/tokens.json'), 'utf8'));

// 1. Flatten the nested source into { "dot.path": tokenNode } for every leaf with a $value.
const flat = {};
(function walk(node, path) {
  if (node && typeof node === 'object' && '$value' in node) {
    flat[path.join('.')] = node;
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (child && typeof child === 'object') walk(child, [...path, key]);
  }
})(source, []);

// 2. Resolve "{a.b.c}" references (recursively, with cycle detection).
const REFERENCE = /^\{([^}]+)\}$/;
const resolved = {};
function resolveValue(dotPath, seen = new Set()) {
  if (dotPath in resolved) return resolved[dotPath];
  const token = flat[dotPath];
  if (!token) throw new Error(`Unknown token reference: ${dotPath}`);
  let value = token.$value;
  const match = typeof value === 'string' && value.match(REFERENCE);
  if (match) {
    if (seen.has(dotPath)) throw new Error(`Circular token reference at ${dotPath}`);
    value = resolveValue(match[1], new Set(seen).add(dotPath));
  }
  resolved[dotPath] = value;
  return value;
}

// 3. Build the registry + per-theme CSS var lists.
//    cssName strips the themes.<theme> prefix so both themes share the same --token names.
const THEMES = Object.keys(source.themes || {});
const cssNameOf = (dotPath) => {
  const parts = dotPath.split('.');
  return (parts[0] === 'themes' ? parts.slice(2) : parts).join('-');
};

const registry = {};
const sharedVars = []; // { cssVar, value }
const themeVars = Object.fromEntries(THEMES.map((t) => [t, []])); // theme -> [{ cssVar, value }]

for (const [dotPath, token] of Object.entries(flat)) {
  const parts = dotPath.split('.');
  const name = cssNameOf(dotPath);
  const cssVar = `--${name}`;
  const value = resolveValue(dotPath);

  if (parts[0] === 'themes') {
    const theme = parts[1];
    themeVars[theme].push({ cssVar, value });
    const entry = (registry[name] ||= {
      name,
      cssVar,
      type: token.$type ?? null,
      path: parts.slice(2),
      description: token.$description ?? '',
      themed: true,
    });
    entry[theme] = value; // e.g. entry.light / entry.dark
  } else {
    sharedVars.push({ cssVar, value });
    registry[name] = {
      name,
      cssVar,
      value,
      type: token.$type ?? null,
      path: parts,
      description: token.$description ?? '',
    };
  }
}

// 4. Emit artifacts.
mkdirSync(resolvePath(root, 'dist'), { recursive: true });
writeFileSync(resolvePath(root, 'dist/tokens.json'), JSON.stringify(registry, null, 2) + '\n');

const block = (vars) => vars.map((t) => `  ${t.cssVar}: ${t.value};`).join('\n');
const defaultTheme = THEMES.includes('light') ? 'light' : THEMES[0];

const sections = [
  `/* AUTO-GENERATED from tokens/tokens.json by scripts/build-tokens.mjs — do not edit by hand. */`,
  // :root = theme-agnostic tokens + the default theme's colors (so unscoped apps still get colors)
  `:root {\n${block(sharedVars)}\n${block(themeVars[defaultTheme])}\n}`,
  // Each theme also scoped to [data-color-mode] so consumers can switch.
  ...THEMES.map((t) => `[data-color-mode="${t}"] {\n${block(themeVars[t])}\n}`),
];
writeFileSync(resolvePath(root, 'dist/tokens.css'), sections.join('\n\n') + '\n');

const themedCount = Object.values(registry).filter((t) => t.themed).length;
console.log(
  `Built ${Object.keys(registry).length} tokens (${themedCount} themed × ${THEMES.length} themes: ${THEMES.join(', ')})`,
);
console.log(`-> dist/tokens.json + dist/tokens.css`);
