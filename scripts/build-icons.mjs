// Build the tenet-ui icon set from icons/manifest.json + the Lucide (ISC) source package.
//
//   icons/manifest.json                      -> the curated list (tenet name, component, lucide source, category, keywords)
//   node_modules/lucide-static/icon-nodes.json -> each glyph's SVG shape nodes ([tag, attrs][])
//
// Emits (all committed; CI re-runs this script and fails on drift):
//   src/icons/<Component>.tsx    one forwardRef glyph per icon, rendered through the generic <Icon>
//   src/icons/index.ts           every glyph + Icon re-exports (the `tenet-ui/icons` entry)
//   src/icons/LICENSE-lucide.txt Lucide's ISC notice
//   generated/icons.json         the manifest the MCP server indexes (search_icons) and the docs gallery renders
//
// Deterministic and idempotent: sorted output, no timestamps, stale glyph files are removed.
// Run: node scripts/build-icons.mjs   (plain Node >= 18, no dependencies)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync, existsSync } from 'node:fs';
import { dirname, join, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), '..');
const lucideDir = resolvePath(root, 'node_modules/lucide-static');
const manifestPath = resolvePath(root, 'icons/manifest.json');
const iconsOut = resolvePath(root, 'src/icons');
const generatedOut = resolvePath(root, 'generated');

const CATEGORIES = new Set(['actions', 'navigation', 'status', 'objects', 'editorial', 'communication', 'data', 'media']);
const SIZES = [16, 20, 24];

// ---------------------------------------------------------------------------------------------
// 1. Read + validate inputs.
// ---------------------------------------------------------------------------------------------
if (!existsSync(lucideDir)) {
  console.error('lucide-static is not installed (devDependency). Run npm install first.');
  process.exit(1);
}
const lucidePkg = JSON.parse(readFileSync(join(lucideDir, 'package.json'), 'utf8'));
const iconNodes = JSON.parse(readFileSync(join(lucideDir, 'icon-nodes.json'), 'utf8'));
const lucideLicense = readFileSync(join(lucideDir, 'LICENSE'), 'utf8');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const problems = [];
const seenNames = new Set();
const seenComponents = new Set();
const toComponent = (name) => name.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'Icon';

const icons = [];
for (const entry of manifest.icons) {
  const { name, component, source, category, keywords } = entry;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name ?? '')) problems.push(`"${name}": name must be kebab-case`);
  if (seenNames.has(name)) problems.push(`"${name}": duplicate name`);
  seenNames.add(name);
  const expectedComponent = toComponent(name);
  if (component !== expectedComponent) problems.push(`"${name}": component should be ${expectedComponent}, got ${component}`);
  if (seenComponents.has(component)) problems.push(`"${name}": duplicate component ${component}`);
  seenComponents.add(component);
  if (!CATEGORIES.has(category)) problems.push(`"${name}": unknown category "${category}"`);
  if (!Array.isArray(keywords) || keywords.length === 0) problems.push(`"${name}": keywords must be a non-empty array`);
  const m = /^lucide:([a-z0-9-]+)$/.exec(source ?? '');
  if (!m) {
    problems.push(`"${name}": source must look like "lucide:<icon-name>", got ${source}`);
    continue;
  }
  const lucideName = m[1];
  const nodes = iconNodes[lucideName];
  if (!nodes) {
    problems.push(`"${name}": lucide:${lucideName} not found in icon-nodes.json (aliases such as "edit" or "home" are SVG-only; use the canonical name)`);
    continue;
  }
  if (!existsSync(join(lucideDir, 'icons', `${lucideName}.svg`))) problems.push(`"${name}": icons/${lucideName}.svg missing`);
  icons.push({ name, component, source, category, keywords: [...keywords], nodes });
}
if (problems.length) {
  console.error(`icons/manifest.json has ${problems.length} problem(s):\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}
icons.sort((a, b) => a.name.localeCompare(b.name));

// ---------------------------------------------------------------------------------------------
// 2. SVG -> JSX.
// ---------------------------------------------------------------------------------------------
// Lucide's node attributes are all plain today (d, cx, cy, r, x, y, width, height, rx, ry, x1, y1, x2, y2, points, fill);
// hyphenated names are converted so a future stroke-width/fill-rule/stroke-linecap survives too.
const REACT_ATTR = {
  class: 'className',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-miterlimit': 'strokeMiterlimit',
  'fill-opacity': 'fillOpacity',
  'stroke-opacity': 'strokeOpacity',
  'clip-path': 'clipPath',
};
const toReactAttr = (attr) => REACT_ATTR[attr] ?? (attr.includes('-') ? attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) : attr);
const escapeAttr = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function nodeToJsx([tag, attrs]) {
  const parts = Object.entries(attrs)
    .map(([k, v]) => `${toReactAttr(k)}="${escapeAttr(v)}"`)
    .join(' ');
  return `<${tag}${parts ? ' ' + parts : ''} />`;
}

const HEADER = '// AUTO-GENERATED by scripts/build-icons.mjs from Lucide (ISC) — do not edit\n';

function glyphSource({ component, nodes, source }) {
  const body = nodes.map((n) => `      ${nodeToJsx(n)}`).join('\n');
  return (
    HEADER +
    `// Source: ${source}\n` +
    `import { forwardRef } from 'react';\n` +
    `import { Icon } from '../components/Icon';\n` +
    `import type { IconGlyphProps } from '../components/Icon';\n\n` +
    `export const ${component} = forwardRef<SVGSVGElement, IconGlyphProps>(function ${component}(props, ref) {\n` +
    `  return (\n` +
    `    <Icon ref={ref} {...props}>\n` +
    `${body}\n` +
    `    </Icon>\n` +
    `  );\n` +
    `});\n`
  );
}

// ---------------------------------------------------------------------------------------------
// 3. Emit (write only when content changed so mtimes stay stable; remove stale glyphs).
// ---------------------------------------------------------------------------------------------
mkdirSync(iconsOut, { recursive: true });
mkdirSync(generatedOut, { recursive: true });

let written = 0;
let unchanged = 0;
function emit(path, content) {
  if (existsSync(path) && readFileSync(path, 'utf8') === content) {
    unchanged++;
    return;
  }
  writeFileSync(path, content);
  written++;
}

const expectedFiles = new Set(['index.ts', 'LICENSE-lucide.txt']);
for (const icon of icons) {
  const file = `${icon.component}.tsx`;
  expectedFiles.add(file);
  emit(join(iconsOut, file), glyphSource(icon));
}

let removed = 0;
for (const f of readdirSync(iconsOut)) {
  if (expectedFiles.has(f)) continue;
  const path = join(iconsOut, f);
  // Only delete files this script owns (generated glyphs); leave anything hand-written alone.
  if (f.endsWith('.tsx') && readFileSync(path, 'utf8').startsWith(HEADER)) {
    unlinkSync(path);
    removed++;
  } else {
    console.warn(`warning: unexpected file in src/icons/: ${f} (not generated by this script, left in place)`);
  }
}

emit(
  join(iconsOut, 'index.ts'),
  HEADER +
    `// Public entry for \`tenet-ui/icons\`: ${icons.length} glyphs + the generic Icon. Import the app stylesheet\n` +
    `// (\`tenet-ui/styles.css\`) once at the root as usual; icons are colored by currentColor.\n` +
    icons.map((i) => `export { ${i.component} } from './${i.component}';`).join('\n') +
    `\n\nexport { Icon } from '../components/Icon';\n` +
    `export type { IconProps, IconGlyphProps, IconSize } from '../components/Icon';\n`,
);

emit(
  join(iconsOut, 'LICENSE-lucide.txt'),
  `The glyphs in this directory are generated from lucide-static@${lucidePkg.version} (https://lucide.dev)\n` +
    `and redistributed under the ISC license below. tenet-ui's own code is MIT (see /LICENSE).\n\n` +
    lucideLicense,
);

emit(
  join(generatedOut, 'icons.json'),
  JSON.stringify(
    {
      schemaVersion: 1,
      source: `lucide-static@${lucidePkg.version}`,
      importPath: 'tenet-ui/icons',
      sizes: SIZES,
      icons: icons.map(({ name, component, source, category, keywords }) => ({ name, component, source, category, keywords })),
    },
    null,
    2,
  ) + '\n',
);

const byCategory = {};
for (const i of icons) byCategory[i.category] = (byCategory[i.category] ?? 0) + 1;
console.log(
  `Built ${icons.length} icons from lucide-static@${lucidePkg.version} -> src/icons/ + generated/icons.json ` +
    `(${written} file(s) written, ${unchanged} unchanged, ${removed} stale removed)`,
);
console.log(
  'Categories: ' +
    Object.entries(byCategory)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([c, n]) => `${c} ${n}`)
      .join(', '),
);
