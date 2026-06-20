// Build resolved design-token artifacts from the single source of truth.
//   tokens/tokens.json  ->  dist/tokens.json (flat, resolved)  +  dist/tokens.css (CSS vars)
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

// 3. Build the flat registry (the shape the skill's `ingest` consumes).
const registry = {};
for (const [dotPath, token] of Object.entries(flat)) {
  const name = dotPath.split('.').join('-');
  registry[name] = {
    name,
    cssVar: `--${name}`,
    value: resolveValue(dotPath),
    $value: token.$value,
    type: token.$type ?? null,
    path: dotPath.split('.'),
    description: token.$description ?? '',
  };
}

// 4. Emit artifacts.
mkdirSync(resolvePath(root, 'dist'), { recursive: true });
writeFileSync(resolvePath(root, 'dist/tokens.json'), JSON.stringify(registry, null, 2) + '\n');

const cssVars = Object.values(registry)
  .map((t) => `  ${t.cssVar}: ${t.value};`)
  .join('\n');
const css = `/* AUTO-GENERATED from tokens/tokens.json by scripts/build-tokens.mjs — do not edit by hand. */\n:root {\n${cssVars}\n}\n`;
writeFileSync(resolvePath(root, 'dist/tokens.css'), css);

console.log(`Built ${Object.keys(registry).length} tokens -> dist/tokens.json + dist/tokens.css`);
