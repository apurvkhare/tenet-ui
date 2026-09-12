// Build generated/components.json (+ deprecations.json, + generated/guidelines/) with TYPES AS THE TRUTH.
//
//   src/components/<Name>/<Name>.types.ts   -> props (name, type, required, default, description, deprecated)
//   src/components/<Name>/<Name>.tsx        -> default values (from the destructured parameter) + component-level @deprecated
//   src/components/<Name>/<Name>.stories.tsx-> story ids (Storybook's toId(title, exportName) algorithm)
//   src/components/<Name>/<Name>.meta.json  -> the little that types cannot say: id, status, a11yReviewed,
//                                              which interface belongs to which (sub)component, related components
//   src/components/<Name>/<Name>.guidelines.md + guidelines/system/*.md -> copied to generated/guidelines/
//
// Nothing about props is hand-maintained any more; the 0.3.0 catalog drift cannot recur.
// Run: node scripts/build-catalog.mjs   (uses the TypeScript compiler API; typescript is a devDependency)
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync, copyFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve as resolvePath, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = resolvePath(root, 'src/components');
const pkg = JSON.parse(readFileSync(resolvePath(root, 'package.json'), 'utf8'));

// ---------------------------------------------------------------------------------------------
// 1. One TypeScript program over every component source file.
// ---------------------------------------------------------------------------------------------
const componentDirs = readdirSync(componentsDir).filter((n) => statSync(join(componentsDir, n)).isDirectory());
const sourceFiles = [];
for (const name of componentDirs) {
  for (const f of readdirSync(join(componentsDir, name))) {
    if (/\.(ts|tsx)$/.test(f) && !f.endsWith('.d.ts')) sourceFiles.push(join(componentsDir, name, f));
  }
}
const tsconfig = ts.readConfigFile(resolvePath(root, 'tsconfig.json'), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, root);
const program = ts.createProgram(sourceFiles, { ...parsed.options, noEmit: true });
const checker = program.getTypeChecker();

const isOurs = (sf) => sf && !sf.fileName.includes('node_modules');

// JSDoc helpers -------------------------------------------------------------------------------
const commentText = (c) => (typeof c === 'string' ? c : ts.displayPartsToString(c ?? [])) ?? '';
function jsdocOf(node) {
  const docs = ts.getJSDocCommentsAndTags(node);
  let description = '';
  const tags = {};
  for (const d of docs) {
    if (ts.isJSDoc(d)) {
      if (d.comment) description += (description ? '\n' : '') + commentText(d.comment);
      for (const t of d.tags ?? []) tags[t.tagName.text] = commentText(t.comment).trim();
    } else if (ts.isJSDocTag(d)) {
      tags[d.tagName.text] = commentText(d.comment).trim();
    }
  }
  return { description: description.trim().replace(/\s+/g, ' '), tags };
}

// Type printing: expand our own union aliases ('default' | 'primary' …), keep foreign aliases (ReactNode).
function printType(typeNode) {
  if (!typeNode) return 'unknown';
  if (ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName)) {
    const sym = checker.getSymbolAtLocation(typeNode.typeName);
    const decl = sym?.declarations?.[0];
    if (decl && ts.isTypeAliasDeclaration(decl) && isOurs(decl.getSourceFile()) && ts.isUnionTypeNode(decl.type)) {
      return decl.type.types.map((t) => t.getText()).join(' | ');
    }
  }
  return typeNode.getText().replace(/\s+/g, ' ');
}

// Interfaces: own members + members inherited from OUR interfaces (never from React's HTMLAttributes).
const interfaces = new Map(); // name -> { node, sourceFile }
for (const sf of program.getSourceFiles()) {
  if (!isOurs(sf)) continue;
  ts.forEachChild(sf, (node) => {
    if (ts.isInterfaceDeclaration(node)) interfaces.set(node.name.text, node);
  });
}
function propsOfInterface(name, seen = new Set()) {
  const node = interfaces.get(name);
  if (!node || seen.has(name)) return [];
  seen.add(name);
  const props = [];
  for (const clause of node.heritageClauses ?? []) {
    for (const t of clause.types) {
      const base = t.expression.getText();
      if (interfaces.has(base)) props.push(...propsOfInterface(base, seen));
    }
  }
  for (const m of node.members) {
    if (!ts.isPropertySignature(m) || !m.name) continue;
    const { description, tags } = jsdocOf(m);
    const prop = {
      name: m.name.getText().replace(/^['"]|['"]$/g, ''),
      type: printType(m.type),
      required: !m.questionToken,
      defaultValue: tags.default ?? '',
      description,
    };
    if (ts.isTypeReferenceNode(m.type ?? {}) && ts.isIdentifier(m.type.typeName) && interfaces.has(m.type.typeName.text) === false) {
      const alias = m.type.typeName.text;
      if (alias !== prop.type) prop.typeRef = alias;
    }
    if ('deprecated' in tags) prop.deprecated = tags.deprecated || true;
    props.push(prop);
  }
  return props;
}

// Default values: `function Button({ variant = 'default', … })` — read the first parameter's binding pattern.
function defaultsIn(sourceFile) {
  const byFn = new Map(); // fnName -> { prop: defaultText }
  const record = (name, params) => {
    const p = params[0];
    if (!p || !ts.isObjectBindingPattern(p.name)) return;
    const defaults = {};
    for (const el of p.name.elements) {
      if (!el.initializer) continue;
      const key = (el.propertyName ?? el.name).getText();
      defaults[key] = el.initializer.getText().replace(/^['"`]|['"`]$/g, '');
    }
    byFn.set(name, defaults);
  };
  const visit = (node) => {
    if (ts.isFunctionDeclaration(node) && node.name) record(node.name.text, node.parameters);
    else if ((ts.isFunctionExpression(node) || ts.isArrowFunction(node)) && node.parameters.length) {
      const name = node.name?.text ?? (ts.isVariableDeclaration(node.parent) ? node.parent.name.getText() : undefined);
      if (name) record(name, node.parameters);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return byFn;
}

// Component-level @deprecated: JSDoc on `export const X = …` or `export function X`.
function componentDeprecations(sourceFile) {
  const out = {};
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isVariableStatement(node)) {
      const { tags } = jsdocOf(node);
      if ('deprecated' in tags) for (const d of node.declarationList.declarations) out[d.name.getText()] = tags.deprecated || true;
    } else if (ts.isFunctionDeclaration(node) && node.name) {
      const { tags } = jsdocOf(node);
      if ('deprecated' in tags) out[node.name.text] = tags.deprecated || true;
    }
  });
  return out;
}

// Stories: Storybook's id algorithm — toId(sanitize(title), sanitize(storyNameFromExport(exportName))).
const sanitize = (s) =>
  s.toLowerCase().replace(/[ ’–—]/g, '-').replace(/[^a-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
const storyNameFromExport = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/_/g, ' ')
    .trim();
function storiesIn(sourceFile) {
  if (!sourceFile) return [];
  let title;
  const exportsList = [];
  const visit = (node) => {
    if (ts.isPropertyAssignment(node) && node.name.getText() === 'title' && ts.isStringLiteralLike(node.initializer) && !title) {
      title = node.initializer.text;
    }
    if (ts.isVariableStatement(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const d of node.declarationList.declarations) {
        const typeText = d.type?.getText() ?? '';
        if (/Story\b/.test(typeText) || (d.initializer && /StoryObj/.test(typeText))) exportsList.push(d.name.getText());
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  if (!title) return [];
  return exportsList.map((exp) => {
    const name = storyNameFromExport(exp);
    return { id: `${sanitize(title)}--${sanitize(name)}`, name, exportName: exp };
  });
}

// ---------------------------------------------------------------------------------------------
// 2. Assemble the catalog, one component per folder.
// ---------------------------------------------------------------------------------------------
const components = {};
const deprecations = [];
const problems = [];
const sourceFor = (path) => program.getSourceFile(path);

for (const name of componentDirs) {
  const dir = join(componentsDir, name);
  const metaPath = join(dir, `${name}.meta.json`);
  if (!existsSync(metaPath)) {
    problems.push(`${name}: missing ${name}.meta.json`);
    continue;
  }
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  const typesPath = join(dir, `${name}.types.ts`);
  const tsxPath = join(dir, `${name}.tsx`);
  const storiesPath = join(dir, `${name}.stories.tsx`);
  const guidelinesPath = join(dir, `${name}.guidelines.md`);

  const defaults = existsSync(tsxPath) ? defaultsIn(sourceFor(tsxPath)) : new Map();
  const compDeprecations = existsSync(tsxPath) ? componentDeprecations(sourceFor(tsxPath)) : {};

  const withDefaults = (props, fnCandidates) => {
    const fn = fnCandidates.find((c) => defaults.has(c));
    const d = fn ? defaults.get(fn) : {};
    return props.map((p) => (p.defaultValue === '' && p.name in d ? { ...p, defaultValue: d[p.name] } : p));
  };
  const rootIface = meta.props ?? `${meta.name}Props`;
  if (!interfaces.has(rootIface)) problems.push(`${name}: props interface ${rootIface} not found`);
  const rootProps = withDefaults(propsOfInterface(rootIface), [meta.fn, meta.name, rootIface.replace(/Props$/, '')].filter(Boolean));
  // Foreign bases (React's HTMLAttributes etc.) are not expanded into props; record them so readers know
  // that native attributes (disabled, checked, rows, aria-*) pass through.
  const extendsOf = (iface) =>
    (interfaces.get(iface)?.heritageClauses ?? [])
      .flatMap((c) => c.types.map((t) => t.getText().replace(/\s+/g, ' ')))
      .filter((t) => !interfaces.has(t.replace(/<.*$/, '')));

  const subcomponents = (meta.subcomponents ?? []).map((sub) => {
    const entry = { id: sanitize(sub.name.replace('.', '-')), name: sub.name };
    if (sub.kind) entry.kind = sub.kind;
    if (sub.props) {
      if (!interfaces.has(sub.props)) problems.push(`${name}: subcomponent ${sub.name} props interface ${sub.props} not found`);
      const [a, b] = sub.name.split('.');
      entry.props = withDefaults(propsOfInterface(sub.props), [sub.fn, sub.props.replace(/Props$/, ''), b ? `${a}${b}` : a, b].filter(Boolean));
    } else entry.props = [];
    const localName = sub.name.includes('.') ? sub.name.split('.').join('') : sub.name;
    if (compDeprecations[localName]) entry.deprecated = compDeprecations[localName];
    return entry;
  });

  // Related types exported from the types file that are not props interfaces (DataTableColumn, MenuAction…).
  const claimed = new Set([rootIface, ...subcomponents.map((s) => (meta.subcomponents.find((m) => m.name === s.name) || {}).props)]);
  const types = [];
  const typesSf = sourceFor(typesPath);
  if (typesSf) {
    ts.forEachChild(typesSf, (node) => {
      if (ts.isInterfaceDeclaration(node) && !claimed.has(node.name.text) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
        types.push({ name: node.name.text, description: jsdocOf(node).description, members: propsOfInterface(node.name.text) });
      }
    });
  }

  const stories = storiesIn(sourceFor(storiesPath));
  const guidelines = existsSync(guidelinesPath) ? `generated/guidelines/${meta.id}.md` : null;
  if (!guidelines) problems.push(`${name}: missing ${name}.guidelines.md`);
  if (!stories.length) problems.push(`${name}: no stories found`);

  const entry = {
    id: meta.id,
    name: meta.name,
    status: meta.status,
    a11yReviewed: Boolean(meta.a11yReviewed),
    importPath: meta.importPath ?? 'tenet-ui',
    source: relative(root, tsxPath),
    types: relative(root, typesPath),
    guidelines,
    extends: extendsOf(rootIface),
    props: rootProps,
    subcomponents,
    relatedTypes: types,
    stories,
    related: meta.related ?? [],
  };
  if (compDeprecations[meta.name]) entry.deprecated = compDeprecations[meta.name];
  components[meta.id] = entry;

  // Deprecation registry — the migration source for the deprecations check.
  const firstBacktick = (text) => (typeof text === 'string' && text.match(/`([^`]+)`/)?.[1]) || null;
  if (entry.deprecated) deprecations.push({ kind: 'component', component: meta.name, replacement: firstBacktick(entry.deprecated), message: entry.deprecated, since: pkg.version });
  for (const p of rootProps) if (p.deprecated) deprecations.push({ kind: 'prop', component: meta.name, prop: p.name, replacement: firstBacktick(p.deprecated), message: p.deprecated, since: pkg.version });
  for (const s of subcomponents) {
    if (s.deprecated) deprecations.push({ kind: 'component', component: s.name, replacement: firstBacktick(s.deprecated), message: s.deprecated, since: pkg.version });
    for (const p of s.props ?? []) if (p.deprecated) deprecations.push({ kind: 'prop', component: s.name, prop: p.name, replacement: firstBacktick(p.deprecated), message: p.deprecated, since: pkg.version });
  }
}

// ---------------------------------------------------------------------------------------------
// 3. Emit: components.json, deprecations.json, generated/guidelines/.
// ---------------------------------------------------------------------------------------------
const generated = resolvePath(root, 'generated');
mkdirSync(generated, { recursive: true });
const sorted = Object.fromEntries(Object.entries(components).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(
  resolvePath(generated, 'components.json'),
  JSON.stringify(
    {
      schemaVersion: 2,
      package: pkg.name,
      version: pkg.version,
      generatedFrom: 'src/components/**/*.types.ts (props) + *.tsx (defaults) + *.stories.tsx (story ids) + *.meta.json',
      components: sorted,
    },
    null,
    2,
  ) + '\n',
);
writeFileSync(
  resolvePath(generated, 'deprecations.json'),
  JSON.stringify({ schemaVersion: 1, package: pkg.name, version: pkg.version, deprecations }, null, 2) + '\n',
);

const guidelinesOut = resolvePath(generated, 'guidelines');
rmSync(guidelinesOut, { recursive: true, force: true });
mkdirSync(join(guidelinesOut, 'system'), { recursive: true });
let guidelineCount = 0;
for (const c of Object.values(components)) {
  const src = join(componentsDir, c.name, `${c.name}.guidelines.md`);
  if (existsSync(src)) {
    copyFileSync(src, join(guidelinesOut, `${c.id}.md`));
    guidelineCount++;
  }
}
const systemDir = resolvePath(root, 'guidelines/system');
let systemCount = 0;
if (existsSync(systemDir)) {
  for (const f of readdirSync(systemDir).filter((f) => f.endsWith('.md'))) {
    copyFileSync(join(systemDir, f), join(guidelinesOut, 'system', f));
    systemCount++;
  }
}

const propCount = Object.values(components).reduce((n, c) => n + c.props.length + c.subcomponents.reduce((m, s) => m + (s.props?.length ?? 0), 0), 0);
console.log(
  `Built catalog: ${Object.keys(components).length} components, ${propCount} props (from types), ` +
    `${Object.values(components).reduce((n, c) => n + c.stories.length, 0)} stories, ${deprecations.length} deprecations -> generated/`,
);
console.log(`Guidelines: ${guidelineCount} component + ${systemCount} system pages -> generated/guidelines/`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}
