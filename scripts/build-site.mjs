// Assemble the deployable static site: the docs at / and the static Storybook at /storybook/.
//   SITE_URL   public origin (default https://tenet-ui.pages.dev) — baked into the docs (sitemap,
//              llms.txt absolute links) and into every Storybook link the docs render.
//   Output: _site/  (deployed by `npm run deploy` → Cloudflare Pages, or by CI)
// Run: node scripts/build-site.mjs [--skip-storybook] [--skip-docs]
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolvePath(dirname(fileURLToPath(import.meta.url)), '..');
const args = new Set(process.argv.slice(2));
const siteUrl = (process.env.SITE_URL ?? 'https://tenet-ui.pages.dev').replace(/\/$/, '');
const run = (cmd, cwd = root, env = {}) => {
  console.log(`\n$ ${cmd}${cwd !== root ? `  (in ${cwd.replace(root, '.')})` : ''}`);
  execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, ...env } });
};

if (!existsSync(resolvePath(root, 'dist/styles.css'))) run('npm run build');
if (!args.has('--skip-storybook')) run('npx storybook build --quiet');
if (!args.has('--skip-docs')) {
  const docs = resolvePath(root, 'docs');
  if (!existsSync(resolvePath(docs, 'node_modules'))) run('npm ci', docs);
  run('npm run build', docs, { SITE_URL: siteUrl, DOCS_BASE: '/', STORYBOOK_URL: `${siteUrl}/storybook` });
}

const out = resolvePath(root, '_site');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(resolvePath(root, 'docs/dist'), out, { recursive: true });
cpSync(resolvePath(root, 'storybook-static'), resolvePath(out, 'storybook'), { recursive: true });
// Cloudflare Pages: long cache for hashed assets, plain-text llms files, no directory listings needed.
writeFileSync(
  resolvePath(out, '_headers'),
  [
    '/_astro/*',
    '  Cache-Control: public, max-age=31536000, immutable',
    '/storybook/assets/*',
    '  Cache-Control: public, max-age=31536000, immutable',
    '/llms*.txt',
    '  Content-Type: text/plain; charset=utf-8',
    '',
  ].join('\n'),
);
console.log(`\nAssembled _site/ for ${siteUrl}  (docs at /, Storybook at /storybook/)`);
