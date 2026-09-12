// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import starlightLlmsTxt from 'starlight-llms-txt';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const DOCS = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(DOCS, '..'); // the tenet-ui repo (also what `tenet-ui` resolves to via file:..)

// GitHub Pages serves under /tenet-ui; Vercel or a custom domain sets DOCS_BASE=/.
const base = process.env.DOCS_BASE ?? '/tenet-ui';
const REPO_URL = 'https://github.com/apurvkhare/tenet-ui';
const STORYBOOK_URL = process.env.STORYBOOK_URL ?? 'https://apurvkhare.github.io/tenet-ui/storybook';

/** Rehype plugin: prefix root-relative links/srcs in Markdown content with `base` so GitHub Pages works. */
function rehypeBaseLinks() {
  const prefix = base.replace(/\/$/, '');
  if (!prefix) return () => {};
  const visit = (node) => {
    if (node.type === 'element' && node.properties) {
      for (const attr of ['href', 'src']) {
        const v = node.properties[attr];
        if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(prefix + '/') && v !== prefix) {
          node.properties[attr] = prefix + v;
        }
      }
    }
    for (const child of node.children ?? []) visit(child);
  };
  return (tree) => visit(tree);
}

export default defineConfig({
  site: 'https://apurvkhare.github.io',
  base,
  trailingSlash: 'always',
  markdown: { rehypePlugins: [rehypeBaseLinks] },
  integrations: [
    react(),
    starlight({
      title: 'Tenet UI',
      description:
        'Tenet UI is a React design system: semantic design tokens, accessible components and an icon set, shipped as the tenet-ui npm package with a single stylesheet.',
      social: [
        { icon: 'github', label: 'GitHub', href: REPO_URL },
        { icon: 'open-book', label: 'Storybook', href: STORYBOOK_URL },
      ],
      editLink: { baseUrl: `${REPO_URL}/edit/main/` },
      lastUpdated: true,
      customCss: ['tenet-ui/styles.css', './src/styles/tenet-docs.css'],
      components: {
        Head: './src/components/overrides/Head.astro',
        LastUpdated: './src/components/overrides/LastUpdated.astro',
      },
      sidebar: [
        { label: 'Getting started', link: '/getting-started/' },
        { label: 'Foundations', items: [{ autogenerate: { directory: 'foundations' } }] },
        { label: 'Components', items: [{ autogenerate: { directory: 'components' } }] },
        { label: 'Icons', link: '/icons/' },
        { label: 'Tokens', link: '/tokens/' },
        { label: 'Changelog', link: '/changelog/' },
      ],
      plugins: [
        starlightLlmsTxt({
          projectName: 'Tenet UI (tenet-ui)',
          description:
            'Documentation for tenet-ui, a React design system. Components import from `tenet-ui`, icons from `tenet-ui/icons`, and every app must import `tenet-ui/styles.css` once; theming is `data-color-mode="light|dark"` on <html>. Component pages carry the usage guidelines, the type-derived props table (deprecated props name their replacement) and the story list; the Tokens page lists every CSS variable with light/dark values.',
          details:
            '- Prefer semantic tokens (`--fgColor-*`, `--bgColor-*`, `--borderColor-*`, `--space-*`) over raw values; the `base-*` palette is not for direct use.\n- Use the component for the job (Button, IconButton, Heading, Text, Table…) instead of raw HTML elements.\n- The deprecations registry on the Changelog page is the migration source between versions.',
          optionalLinks: [
            { label: 'Storybook (full story matrix)', url: STORYBOOK_URL },
            { label: 'GitHub repository', url: REPO_URL },
          ],
          customSets: [
            { label: 'Components', description: 'One page per component: guidelines, props, examples.', paths: ['components/**'] },
            { label: 'Foundations & patterns', description: 'System-level guidance.', paths: ['foundations/**'] },
          ],
          promote: ['index*', 'getting-started*', 'foundations/**'],
          demote: ['changelog*'],
        }),
      ],
    }),
  ],
  vite: {
    resolve: {
      // Story modules live in ../src and import `react` from the repo root's node_modules;
      // dedupe forces one React copy (the docs' own) into every island.
      dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
      alias: {
        // composeStories() for live examples — resolved from the repo root so docs/ does not need
        // its own Storybook install.
        '@storybook/react-vite': resolve(ROOT, 'node_modules/@storybook/react-vite'),
      },
    },
    server: { fs: { allow: [ROOT] } },
  },
});
