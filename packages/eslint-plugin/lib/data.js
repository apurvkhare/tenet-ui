// Data resolution for the rules.
//
// Order: 1) `settings['tenet-ui'].{tokens,components,deprecations}` (tests / overrides),
//        2) the CONSUMER's installed tenet-ui (so findings match the version they are on),
//        3) the bundled copies in data/ (kept fresh with `npm run sync-data`).
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeColor } from './colors.js';

const here = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(here, '..', 'data');

const CONSUMER_SPECS = {
  tokens: 'tenet-ui/tokens.json',
  components: 'tenet-ui/generated/components.json',
  deprecations: 'tenet-ui/generated/deprecations.json',
};

function loadBundled(name) {
  try {
    return JSON.parse(readFileSync(join(DATA_DIR, `${name}.json`), 'utf8'));
  } catch {
    return null;
  }
}

function loadConsumer(spec) {
  try {
    const req = createRequire(join(process.cwd(), '/'));
    return { data: req(spec), from: req.resolve(spec) };
  } catch {
    return null;
  }
}

let baseCache = null;
/** Raw data (before indexing) with provenance, resolved once per process. */
export function loadBaseData() {
  if (baseCache) return baseCache;
  const out = { sources: {} };
  for (const [key, spec] of Object.entries(CONSUMER_SPECS)) {
    const consumer = loadConsumer(spec);
    if (consumer) {
      out[key] = consumer.data;
      out.sources[key] = consumer.from;
    } else {
      out[key] = loadBundled(key);
      out.sources[key] = `bundled:data/${key}.json`;
    }
  }
  baseCache = out;
  return out;
}

/** @internal test hook */
export function resetDataCache() {
  baseCache = null;
  indexCache = new WeakMap();
}

// ---------------------------------------------------------------------------
// Normalisation: accept the shapes tenet-ui emits today and a few lenient variants.
// ---------------------------------------------------------------------------
export function tokenList(tokens) {
  if (!tokens) return [];
  if (Array.isArray(tokens)) return tokens;
  if (tokens.tokens && (Array.isArray(tokens.tokens) || typeof tokens.tokens === 'object')) return tokenList(tokens.tokens);
  return Object.values(tokens).filter((t) => t && typeof t === 'object' && t.cssVar);
}

export function componentList(components) {
  if (!components) return [];
  if (Array.isArray(components)) return components;
  if (components.components) return componentList(components.components);
  return Object.values(components).filter((c) => c && typeof c === 'object' && c.name);
}

export function deprecationList(deprecations) {
  if (!deprecations) return [];
  if (Array.isArray(deprecations)) return deprecations;
  if (Array.isArray(deprecations.deprecations)) return deprecations.deprecations;
  return [];
}

// ---------------------------------------------------------------------------
// Indexes
// ---------------------------------------------------------------------------
const SEMANTIC_RANK = [
  [/^(fgColor|bgColor|borderColor)-/, 0],
  [/^(space|control|borderRadius|fontSize|fontWeight|borderWidth|shadow)-/, 0],
  [/^base-/, 2],
];
export function semanticRank(name) {
  for (const [re, rank] of SEMANTIC_RANK) if (re.test(name)) return rank;
  return 1;
}

/** Light-mode resolved value of a token, as a string. */
export function resolvedValue(t) {
  const v = t.light ?? t.value ?? '';
  return typeof v === 'string' ? v : String(v);
}

export function buildIndexes(data) {
  const tokens = tokenList(data.tokens);
  const components = componentList(data.components);
  const deprecations = deprecationList(data.deprecations);

  const cssVars = new Set();
  const byColor = new Map(); // normalized color -> token names
  const byPx = new Map(); // px number -> token names
  const dimensionTokens = []; // { name, px }
  for (const t of tokens) {
    cssVars.add(t.cssVar);
    const v = resolvedValue(t);
    if (t.type === 'color' || /^#|^rgba?\(|^hsla?\(/.test(v)) {
      const key = normalizeColor(v);
      if (!byColor.has(key)) byColor.set(key, []);
      byColor.get(key).push(t.name);
    }
    const px = /^(-?\d+(?:\.\d+)?)px$/.exec(v.trim());
    if (px) {
      const n = parseFloat(px[1]);
      if (!byPx.has(n)) byPx.set(n, []);
      byPx.get(n).push(t.name);
      dimensionTokens.push({ name: t.name, px: n });
    }
  }
  const sortSemantic = (names) => names.slice().sort((a, b) => semanticRank(a) - semanticRank(b) || a.localeCompare(b));
  for (const [k, v] of byColor) byColor.set(k, sortSemantic(v));
  for (const [k, v] of byPx) byPx.set(k, sortSemantic(v));

  const componentNames = new Set();
  const componentByName = new Map();
  for (const c of components) {
    componentNames.add(c.name);
    componentByName.set(c.name, c);
    for (const sub of c.subcomponents || []) {
      const name = typeof sub === 'string' ? sub : sub?.name;
      if (name) {
        componentNames.add(name);
        componentByName.set(name, { ...(typeof sub === 'object' ? sub : { name }), parent: c.name });
      }
    }
  }

  const deprecatedProps = new Map(); // `${component}.${prop}` -> entry
  const deprecatedComponents = new Map(); // component -> entry
  for (const d of deprecations) {
    if (!d || !d.component) continue;
    if (d.kind === 'prop' && d.prop) deprecatedProps.set(`${d.component}.${d.prop}`, d);
    else if (d.kind === 'component') deprecatedComponents.set(d.component, d);
  }

  return {
    tokens,
    components,
    deprecations,
    cssVars,
    byColor,
    byPx,
    dimensionTokens,
    componentNames,
    componentByName,
    deprecatedProps,
    deprecatedComponents,
    sources: data.sources || {},
  };
}

let indexCache = new WeakMap();
/** Indexed data for a rule, honouring `settings['tenet-ui']` overrides. */
export function getData(context) {
  const settings = context.settings?.['tenet-ui'];
  const base = loadBaseData();
  const key = settings && typeof settings === 'object' ? settings : base;
  let idx = indexCache.get(key);
  if (idx) return idx;
  const merged = key === base
    ? base
    : {
        tokens: settings.tokens ?? base.tokens,
        components: settings.components ?? base.components,
        deprecations: settings.deprecations ?? base.deprecations,
        sources: {
          tokens: settings.tokens ? 'settings' : base.sources.tokens,
          components: settings.components ? 'settings' : base.sources.components,
          deprecations: settings.deprecations ? 'settings' : base.sources.deprecations,
        },
      };
  idx = buildIndexes(merged);
  indexCache.set(key, idx);
  return idx;
}

export const DOCS = 'https://tenet-ui.pages.dev/';
export const GUIDELINE = {
  color: { url: `${DOCS}foundations/color/`, label: 'Foundations > Color' },
  spacing: { url: `${DOCS}foundations/layout/`, label: 'Foundations > Layout (space scale)' },
  tokens: { url: `${DOCS}tokens/`, label: 'Tokens' },
  components: { url: `${DOCS}components/`, label: 'Components' },
  gettingStarted: { url: `${DOCS}getting-started/`, label: 'Getting started (runtime contract)' },
  migration: { url: `${DOCS}changelog/#deprecations`, label: 'Changelog > Deprecations' },
};
