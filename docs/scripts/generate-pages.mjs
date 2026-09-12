// Generates the docs content from the repo at build time. Runs as `prebuild` / `predev`.
//
// Inputs (all read-only, all outside docs/):
//   ../generated/components.json        component catalog (schemaVersion 2)
//   ../generated/guidelines/<id>.md     per-component usage guidelines
//   ../generated/guidelines/system/*.md foundations & patterns
//   ../generated/deprecations.json      deprecation registry
//   ../generated/icons.json             icon manifest (optional)
//   ../dist/tokens.json                 flat token registry
//   ../CHANGELOG.md
//   ../src/components/<Name>/<Name>.stories.tsx  story modules (for live examples + hashing)
//
// Outputs (all gitignored, see docs/.gitignore):
//   src/content/docs/components/*.mdx, foundations/*.mdx, tokens.mdx, icons.mdx, changelog.mdx
//   src/generated/*.json (normalized copies the Astro components import), src/generated/examples/*.tsx
//
// Nothing here is authored twice: the MDX only carries frontmatter + markdown bodies copied from the
// repo, and delegates tables/examples to Astro/React components that read src/generated/*.json.

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const here = dirname(fileURLToPath(import.meta.url));
const DOCS = resolve(here, '..');
const ROOT = resolve(DOCS, '..');
const CONTENT = join(DOCS, 'src/content/docs');
const GEN = join(DOCS, 'src/generated');

const STORYBOOK_URL = process.env.STORYBOOK_URL ?? 'https://tenet-ui.pages.dev/storybook';
const BUILD_DATE = new Date();

// ---------------------------------------------------------------- helpers
const sha256 = (...parts) => {
  const h = createHash('sha256');
  for (const p of parts) h.update(typeof p === 'string' ? p : JSON.stringify(p));
  return h.digest('hex');
};
const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : undefined);
const readJson = (p, fallback) => {
  const raw = read(p);
  if (raw === undefined) return fallback;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`[docs] ${p} is not valid JSON (${e.message}); treating as absent`);
    return fallback;
  }
};
const write = (p, content) => {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
};
const isoDate = (d) => d.toISOString().slice(0, 10);

/** Last commit date (ISO yyyy-mm-dd) of a repo path, or undefined if untracked / no git. */
function gitDate(relPath) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', relPath], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return out ? isoDate(new Date(out)) : undefined;
  } catch {
    return undefined;
  }
}

/** Normalise a frontmatter `updated` value (Date or string) to yyyy-mm-dd. */
function normDate(v) {
  if (!v) return undefined;
  const d = v instanceof Date ? v : new Date(String(v));
  return Number.isNaN(d.getTime()) ? undefined : isoDate(d);
}

const yamlStr = (s) => JSON.stringify(String(s ?? ''));

/**
 * Make repo markdown safe to embed in MDX: outside fenced code blocks and inline code spans,
 * escape `{`, `}` (MDX expressions) and `<` (MDX/JSX). Code stays verbatim.
 */
function escapeMdx(md) {
  const out = [];
  let inFence = false;
  let fenceMarker = '';
  for (const line of md.split('\n')) {
    const fence = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fence[1][0];
      } else if (fence[1][0] === fenceMarker) {
        inFence = false;
      }
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    // Escape outside inline code spans.
    out.push(
      line
        .split(/(`+[^`]*`+)/g)
        .map((seg, i) => (i % 2 === 1 ? seg : seg.replace(/[{}<]/g, (c) => `\\${c}`)))
        .join(''),
    );
  }
  return out.join('\n');
}

/** Strip the first H1 (Starlight renders the frontmatter title) and surrounding blank lines. */
function stripH1(md) {
  return md.replace(/^\s*#\s[^\n]*\n+/, '').trimEnd() + '\n';
}

/** First paragraph, plain text, for the page <meta name=description>. */
function firstParagraph(md, fallback) {
  const body = stripH1(md)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#') && !p.startsWith('```') && !p.startsWith('|'));
  if (!body) return fallback;
  return body
    .replace(/[*_`>#]/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .slice(0, 160);
}

// ---------------------------------------------------------------- inputs
const pkg = readJson(join(ROOT, 'package.json'), { name: 'tenet-ui', version: '0.0.0', exports: {} });
const catalog = readJson(join(ROOT, 'generated/components.json'), { schemaVersion: 2, components: {} });
const components = Object.values(catalog.components ?? {}).sort((a, b) => a.name.localeCompare(b.name));
const tokensRaw = readJson(join(ROOT, 'dist/tokens.json'), {});
const tokens = Array.isArray(tokensRaw) ? tokensRaw : Object.values(tokensRaw);
const deprecations = readJson(join(ROOT, 'generated/deprecations.json'), { deprecations: [] });
const iconsManifest = readJson(join(ROOT, 'generated/icons.json'), undefined);
const changelog = read(join(ROOT, 'CHANGELOG.md')) ?? '# Changelog\n\nNo changelog published yet.\n';

// Fresh output dirs.
for (const dir of [join(CONTENT, 'components'), join(CONTENT, 'foundations'), GEN]) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

// ---------------------------------------------------------------- normalized data for components
write(join(GEN, 'components.json'), JSON.stringify(catalog, null, 2));
write(join(GEN, 'tokens.json'), JSON.stringify(tokens, null, 2));
write(join(GEN, 'deprecations.json'), JSON.stringify(deprecations, null, 2));
write(
  join(GEN, 'meta.json'),
  JSON.stringify(
    {
      package: pkg.name,
      version: pkg.version,
      storybookUrl: STORYBOOK_URL,
      repoUrl: 'https://github.com/apurvkhare/tenet-ui',
      buildDate: BUILD_DATE.toISOString(),
      catalogVersion: catalog.version ?? pkg.version,
    },
    null,
    2,
  ),
);

// ---------------------------------------------------------------- component pages
const summary = { components: 0, examples: 0, foundations: 0, icons: 0, missingGuidelines: [], missingStories: [] };

for (const c of components) {
  const guidelinePath = c.guidelines ? join(ROOT, c.guidelines) : join(ROOT, 'generated/guidelines', `${c.id}.md`);
  const guidelineRaw = read(guidelinePath);
  const guideline = guidelineRaw ? matter(guidelineRaw) : undefined;
  if (!guideline) summary.missingGuidelines.push(c.id);

  // Story module: derive from `source` (src/components/<Name>/<Name>.tsx).
  const storyRel = c.source ? c.source.replace(/\.tsx?$/, '.stories.tsx') : undefined;
  const storyAbs = storyRel ? join(ROOT, storyRel) : undefined;
  const hasStoryModule = Boolean(storyAbs && existsSync(storyAbs));
  const stories = Array.isArray(c.stories) ? c.stories : [];
  const hasExamples = hasStoryModule && stories.length > 0;
  if (!hasExamples) summary.missingStories.push(c.id);
  else summary.examples += stories.length;

  const compDeprecations = (deprecations.deprecations ?? []).filter(
    (d) => d.component === c.name || (c.subcomponents ?? []).some((s) => s.name === d.component),
  );
  const hash = sha256(
    c,
    guidelineRaw ?? 'no-guideline',
    hasStoryModule ? readFileSync(storyAbs, 'utf8') : 'no-stories',
    compDeprecations,
  );
  const updated =
    normDate(guideline?.data?.updated) ?? (c.source && gitDate(c.source)) ?? (c.guidelines && gitDate(c.guidelines)) ?? isoDate(BUILD_DATE);

  // Live-example island module (one per component so the story module is statically imported).
  if (hasExamples) {
    const relStories = `../../../../${storyRel.replace(/\.tsx$/, '')}`;
    write(
      join(GEN, 'examples', `${c.id}.tsx`),
      `// GENERATED by docs/scripts/generate-pages.mjs — do not edit.
import * as stories from '${relStories}';
import { StoryExamples } from '../../components/StoryExamples';
import type { CatalogStory } from '../../components/StoryExamples';

const catalog: CatalogStory[] = ${JSON.stringify(stories)};

export default function Examples() {
  return <StoryExamples component=${JSON.stringify(c.name)} stories={stories} catalog={catalog} storybookUrl=${JSON.stringify(STORYBOOK_URL)} />;
}
`,
    );
    // Astro wrapper: emits the island only inside a real Starlight page. starlight-llms-txt renders
    // every page through an AstroContainer that has no React renderer, so the island is skipped there
    // and <StoryLinks /> carries the story list into llms*.txt.
    write(
      join(GEN, 'examples', `${c.id}.astro`),
      `---
// GENERATED by docs/scripts/generate-pages.mjs — do not edit.
import Examples from './${c.id}';
import { isStarlightPage } from '../../lib/is-page';
const live = isStarlightPage(Astro.locals);
---

{live && <Examples client:only="react" />}
`,
    );
  }

  const description = guideline
    ? firstParagraph(guideline.content, `${c.name} component API, usage guidelines and live examples.`)
    : `${c.name} component API and live examples.`;

  const badge = c.deprecated
    ? `\n  badge: { text: "Deprecated", variant: caution }`
    : c.status && c.status !== 'stable'
      ? `\n  badge: { text: ${yamlStr(c.status)}, variant: note }`
      : '';

  const guidelineBody = guideline
    ? escapeMdx(stripH1(guideline.content))
    : `:::note[Not published yet]\nUsage guidelines for **${c.name}** have not been published yet. The props table below is generated from the component's TypeScript types and is authoritative.\n:::\n`;

  const examplesBlock = hasExamples
    ? `import Examples from '../../../generated/examples/${c.id}.astro';\n`
    : '';

  const mdx = `---
title: ${yamlStr(c.name)}
description: ${yamlStr(description)}
lastUpdated: ${updated}
contentHash: ${hash}
sidebar:
  label: ${yamlStr(c.name)}${badge}
---
{/* GENERATED by docs/scripts/generate-pages.mjs from generated/components.json + ${c.guidelines ?? 'generated/guidelines/' + c.id + '.md'} — do not edit. */}
import ComponentHeader from '../../../components/ComponentHeader.astro';
import PropsTable from '../../../components/PropsTable.astro';
import RelatedTypes from '../../../components/RelatedTypes.astro';
import RelatedComponents from '../../../components/RelatedComponents.astro';
import StoryLinks from '../../../components/StoryLinks.astro';
${examplesBlock}
<ComponentHeader id=${JSON.stringify(c.id)} />

## Usage guidelines

${guidelineBody}

## Examples

${
  hasExamples
    ? `<Examples />\n\n<StoryLinks id=${JSON.stringify(c.id)} />`
    : `:::note[Not published yet]\nNo stories are registered for **${c.name}** yet, so there are no live examples on this page.\n:::`
}

## Props

<PropsTable id=${JSON.stringify(c.id)} />

<RelatedTypes id=${JSON.stringify(c.id)} />

<RelatedComponents id=${JSON.stringify(c.id)} />
`;
  write(join(CONTENT, 'components', `${c.id}.mdx`), mdx);
  summary.components++;
}

// Components overview (index of the autogenerated sidebar group).
{
  const rows = components
    .map((c) => {
      const status = c.deprecated ? 'deprecated' : c.status ?? 'stable';
      const a11y = c.a11yReviewed ? 'yes' : 'no';
      return `| [${c.name}](/components/${c.id}/) | ${status} | ${a11y} | ${(c.subcomponents ?? []).length} | ${(c.stories ?? []).length} |`;
    })
    .join('\n');
  const body = components.length
    ? `| Component | Status | A11y reviewed | Subcomponents | Stories |\n|---|---|---|---|---|\n${rows}`
    : `:::note[Not published yet]\nThe component catalog (\`generated/components.json\`) is empty. Run \`npm run build:catalog\` in the repo root.\n:::`;
  write(
    join(CONTENT, 'components', 'index.mdx'),
    `---
title: Components
description: "Every tenet-ui component: status, accessibility review state, and links to API, guidelines and live examples."
lastUpdated: ${gitDate('generated/components.json') ?? isoDate(BUILD_DATE)}
contentHash: ${sha256(components.map((c) => [c.id, c.status, c.deprecated ?? null, c.a11yReviewed]))}
sidebar:
  label: Overview
  order: 0
---
{/* GENERATED by docs/scripts/generate-pages.mjs — do not edit. */}

${components.length} components ship in \`${pkg.name}@${pkg.version}\`. Every component imports from \`tenet-ui\` and needs the single stylesheet import described in [Getting started](/getting-started/).

${body}
`,
  );
}

// ---------------------------------------------------------------- foundations (system pages)
const SYSTEM_ORDER = ['color', 'typography', 'layout', 'forms', 'feedback', 'data-display', 'iconography', 'accessibility', 'content'];
const systemDir = join(ROOT, 'generated/guidelines/system');
const systemFiles = existsSync(systemDir) ? readdirSync(systemDir).filter((f) => f.endsWith('.md')) : [];
const systemPages = [];
for (const file of systemFiles) {
  const id = file.replace(/\.md$/, '');
  const raw = readFileSync(join(systemDir, file), 'utf8');
  const fm = matter(raw);
  const title = fm.data.title ?? fm.content.match(/^#\s+(.+)$/m)?.[1] ?? id;
  const updated = normDate(fm.data.updated) ?? gitDate(`generated/guidelines/system/${file}`) ?? isoDate(BUILD_DATE);
  const orderIdx = SYSTEM_ORDER.indexOf(id);
  const order = orderIdx === -1 ? 100 + systemPages.length : orderIdx + 1;
  const related = Array.isArray(fm.data.related) ? fm.data.related : [];
  systemPages.push({ id, title, updated, order });
  write(
    join(CONTENT, 'foundations', `${id}.mdx`),
    `---
title: ${yamlStr(title)}
description: ${yamlStr(firstParagraph(fm.content, `${title} — tenet-ui foundations.`))}
lastUpdated: ${updated}
contentHash: ${sha256(raw)}
sidebar:
  order: ${order}
---
{/* GENERATED by docs/scripts/generate-pages.mjs from generated/guidelines/system/${file} — do not edit. */}
import RelatedList from '../../../components/RelatedList.astro';

${escapeMdx(stripH1(fm.content))}

<RelatedList related={${JSON.stringify(related)}} />
`,
  );
  summary.foundations++;
}
systemPages.sort((a, b) => a.order - b.order);
write(
  join(CONTENT, 'foundations', 'index.mdx'),
  `---
title: Foundations & patterns
description: "System-level guidance for tenet-ui: color, typography, layout, forms, feedback, data display, iconography, accessibility and content."
lastUpdated: ${systemPages.map((p) => p.updated).sort().at(-1) ?? isoDate(BUILD_DATE)}
contentHash: ${sha256(systemPages)}
sidebar:
  label: Overview
  order: 0
---
{/* GENERATED by docs/scripts/generate-pages.mjs from generated/guidelines/system/ — do not edit. */}

Foundations describe the decisions that every component inherits; patterns describe how components combine. These pages are the same markdown the design-system MCP server reads.

${
  systemPages.length
    ? systemPages.map((p) => `- [${p.title}](/foundations/${p.id}/) — updated ${p.updated}`).join('\n')
    : `:::note[Not published yet]\nNo foundations pages have been published yet (\`generated/guidelines/system/\` is empty). They appear here automatically once written.\n:::`
}
`,
);

// ---------------------------------------------------------------- tokens
const TOKEN_GROUP_ORDER = [
  'fontFamily',
  'space',
  'borderWidth',
  'borderRadius',
  'fontSize',
  'lineHeight',
  'fontWeight',
  'letterSpacing',
  'control',
  'shadow',
  'breakpoint',
  'fgColor',
  'bgColor',
  'borderColor',
  'base',
];
const groupOf = (t) => (Array.isArray(t.path) && t.path[0]) || String(t.name).split(/[-.]/)[0];
const groupsPresent = [...new Set(tokens.map(groupOf))];
const groups = [...TOKEN_GROUP_ORDER.filter((g) => groupsPresent.includes(g)), ...groupsPresent.filter((g) => !TOKEN_GROUP_ORDER.includes(g))];
const GROUP_BLURB = {
  fontFamily: 'Type faces. The serif display face is the editorial signature; body and mono cover everything else.',
  space: 'The spacing scale. Every gap, padding and margin in the system is one of these steps.',
  borderWidth: 'Border widths.',
  borderRadius: 'Corner radii.',
  fontSize: 'The type scale.',
  lineHeight: 'Line heights.',
  fontWeight: 'Font weights.',
  letterSpacing: 'Letter spacing (tracking).',
  control: 'Control heights for small / medium / large interactive elements.',
  shadow: 'Elevation shadows.',
  breakpoint: 'Layout breakpoints. `@media` cannot read `var()`, so components hardcode the same values with a comment.',
  fgColor: 'Foreground (text and icon) colors, themed. The AA column lists the `bgColor` tokens each is rated on.',
  bgColor: 'Background colors, themed.',
  borderColor: 'Border colors, themed.',
  base: 'Primitive palette and size values. Components never use these directly — they reference the semantic tokens above.',
};
write(
  join(CONTENT, 'tokens.mdx'),
  `---
title: Tokens
description: "Every design token in tenet-ui: CSS variable, light and dark values, and where it is safe to use."
lastUpdated: ${gitDate('tokens') ?? gitDate('dist/tokens.json') ?? isoDate(BUILD_DATE)}
contentHash: ${sha256(tokens)}
tableOfContents:
  maxHeadingLevel: 2
---
{/* GENERATED by docs/scripts/generate-pages.mjs from dist/tokens.json — do not edit. */}
import TokenTable from '../../components/TokenTable.astro';

Tokens are CSS custom properties shipped in \`tenet-ui/styles.css\`. Theme-agnostic tokens live on \`:root\`; themed tokens (\`fgColor\`, \`bgColor\`, \`borderColor\`) switch on \`[data-color-mode="light" | "dark"]\`. Components reference **semantic** tokens only — the \`base\` palette at the bottom exists to be aliased, not used.

${tokens.length} tokens · ${groups.length} groups · \`${pkg.name}@${pkg.version}\`

${
  tokens.length
    ? groups
        .map(
          (g) => `## ${g}

${GROUP_BLURB[g] ?? ''}

<TokenTable group=${JSON.stringify(g)} />`,
        )
        .join('\n\n')
    : `:::note[Not published yet]\n\`dist/tokens.json\` is missing or empty. Run \`npm run build:tokens\` in the repo root.\n:::`
}
`,
);

// ---------------------------------------------------------------- icons
{
  let icons = [];
  let glyphMode = 'none';
  let note;
  if (!iconsManifest) {
    note = 'The icon manifest (`generated/icons.json`) has not been generated yet. The gallery appears here automatically once it exists.';
  } else {
    const list = Array.isArray(iconsManifest.icons) ? iconsManifest.icons : [];
    const iconsEntry = pkg.exports?.['./icons'];
    const hasPackageIcons = Boolean(iconsEntry) && existsSync(join(ROOT, 'dist/icons.js'));
    glyphMode = hasPackageIcons ? 'package' : 'svg';
    const lucideDir = join(ROOT, 'node_modules/lucide-static/icons');
    icons = list.map((i) => {
      const entry = {
        name: i.name,
        component: i.component,
        source: i.source,
        category: i.category ?? 'uncategorised',
        keywords: Array.isArray(i.keywords) ? i.keywords : [],
      };
      if (!hasPackageIcons) {
        // Inline the source SVG at build time (lucide-static ships one file per icon).
        const candidates = [i.source, i.name].filter(Boolean).map((n) => join(lucideDir, `${String(n).replace(/^lucide:/, '')}.svg`));
        const file = candidates.find((p) => existsSync(p));
        entry.svg = file ? readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '').trim() : undefined;
      }
      return entry;
    });
    summary.icons = icons.length;
    if (!icons.length) note = 'The icon manifest exists but lists no icons yet.';
  }
  write(
    join(GEN, 'icons.json'),
    JSON.stringify(
      {
        schemaVersion: iconsManifest?.schemaVersion ?? null,
        source: iconsManifest?.source ?? null,
        importPath: iconsManifest?.importPath ?? 'tenet-ui/icons',
        sizes: iconsManifest?.sizes ?? null,
        glyphMode,
        icons,
      },
      null,
      2,
    ),
  );
  // Glyph provider: import the real components when the package ships them, else the inlined SVGs.
  write(
    join(GEN, 'icon-glyphs.ts'),
    glyphMode === 'package'
      ? `// GENERATED — icons come from the package's icons entry.\nimport * as Icons from 'tenet-ui/icons';\nexport const icons: Record<string, unknown> = Icons as Record<string, unknown>;\nexport const mode = 'package' as const;\n`
      : `// GENERATED — no dist/icons.js yet; glyphs are inlined SVG from lucide-static.\nexport const icons: Record<string, unknown> = {};\nexport const mode = ${JSON.stringify(glyphMode)} as const;\n`,
  );
  const categories = [...new Set(icons.map((i) => i.category))].sort();
  write(
    join(CONTENT, 'icons.mdx'),
    `---
title: Icons
description: "The tenet-ui icon set: searchable by name, keyword and category, with the import for each glyph."
lastUpdated: ${gitDate('generated/icons.json') ?? gitDate('icons') ?? isoDate(BUILD_DATE)}
contentHash: ${sha256(iconsManifest ?? 'no-icons')}
---
{/* GENERATED by docs/scripts/generate-pages.mjs from generated/icons.json — do not edit. */}
import IconGallery from '../../components/IconGalleryIsland.astro';
import IconIndex from '../../components/IconIndex.astro';

${
  icons.length
    ? `Icons are React components exported from \`${iconsManifest?.importPath ?? 'tenet-ui/icons'}\`${iconsManifest?.source ? ` (sourced from ${iconsManifest.source})` : ''}. ${icons.length} icons in ${categories.length} categories${iconsManifest?.sizes ? `; sizes: ${(Array.isArray(iconsManifest.sizes) ? iconsManifest.sizes : Object.keys(iconsManifest.sizes)).join(', ')}` : ''}. Pass icons to \`Button\`'s \`leadingIcon\`/\`trailingIcon\` or \`IconButton\`'s \`icon\` prop; decorative icons are \`aria-hidden\` by default, so name the control, not the glyph.

\`\`\`tsx
import { ${icons[0].component ?? 'SearchIcon'} } from '${iconsManifest?.importPath ?? 'tenet-ui/icons'}';

<IconButton icon={<${icons[0].component ?? 'SearchIcon'} />} aria-label="Search" />
\`\`\`

<IconGallery />

<IconIndex />`
    : `:::note[Not published yet]\n${note}\n:::`
}
`,
  );
}

// ---------------------------------------------------------------- changelog
write(
  join(CONTENT, 'changelog.mdx'),
  `---
title: Changelog
description: "Release notes for tenet-ui and the deprecation registry (what was renamed or removed, and what replaces it)."
lastUpdated: ${gitDate('CHANGELOG.md') ?? isoDate(BUILD_DATE)}
contentHash: ${sha256(changelog, deprecations)}
tableOfContents:
  maxHeadingLevel: 2
---
{/* GENERATED by docs/scripts/generate-pages.mjs from CHANGELOG.md + generated/deprecations.json — do not edit. */}
import Deprecations from '../../components/Deprecations.astro';

## Deprecations

<Deprecations />

${escapeMdx(stripH1(changelog))}
`,
);

// ---------------------------------------------------------------- report
console.log(
  `[docs] generated ${summary.components} component pages (${summary.examples} live examples), ${summary.foundations} foundations pages, ${groups.length} token groups (${tokens.length} tokens), ${summary.icons} icons, changelog (${(deprecations.deprecations ?? []).length} deprecations)`,
);
if (summary.missingGuidelines.length) console.log(`[docs] no guidelines yet: ${summary.missingGuidelines.join(', ')}`);
if (summary.missingStories.length) console.log(`[docs] no stories yet: ${summary.missingStories.join(', ')}`);
