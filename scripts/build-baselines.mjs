#!/usr/bin/env node
// Visual baselines from the built Storybook: every story x {light, dark} at 1280px wide.
//
//   node scripts/build-baselines.mjs [--filter <substring>] [--concurrency N] [--out baselines]
//
// Serves storybook-static/ on a free port, drives headless Chromium via Playwright, opens each
// story's iframe with `globals=colorMode:<theme>` (the same toolbar global consumers' theming maps
// to — see .storybook/preview.tsx), waits for the story (and its play function) to finish, freezes
// animations, and writes baselines/<storyId>.<theme>.png plus baselines/manifest.json. baselines/
// is gitignored: it ships as a release asset, not in the npm tarball.
//
// Browser: uses Playwright's bundled chromium-headless-shell; set TENET_BROWSER_CHANNEL=chrome to
// drive an installed Google Chrome instead (or when the bundled build is missing).
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

// ---- CLI -----------------------------------------------------------------------------------
const arg = (flag, dflt) => {
  const i = process.argv.indexOf(flag);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
};
const FILTER = arg('--filter', '').toLowerCase();
const CONCURRENCY = Number(arg('--concurrency', '4'));
const STATIC_DIR = resolve(arg('--static', 'storybook-static'));
const OUT_DIR = resolve(arg('--out', 'baselines'));
const THEMES = ['light', 'dark'];
const VIEWPORT = { width: 1280, height: 800 };

if (!existsSync(join(STATIC_DIR, 'index.json'))) {
  console.error(`build-baselines: ${STATIC_DIR}/index.json not found — run \`npm run build-storybook\` first.`);
  process.exit(2);
}

// ---- Tiny static server (no deps) ---------------------------------------------------------
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.ico': 'image/x-icon', '.map': 'application/json', '.txt': 'text/plain',
};
export function serveStatic(dir) {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = resolve(dir, '.' + (path === '/' ? '/index.html' : path));
    if (!file.startsWith(dir)) return void res.writeHead(403).end();
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' }).end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok({ server, url: `http://127.0.0.1:${server.address().port}` })));
}

// ---- Browser launch with channel fallback -------------------------------------------------
export async function launchBrowser() {
  const channel = process.env.TENET_BROWSER_CHANNEL;
  try {
    return await chromium.launch({ headless: true, ...(channel ? { channel } : {}) });
  } catch (err) {
    if (channel) throw err;
    console.warn(`bundled chromium unavailable (${String(err.message).split('\n')[0]}); falling back to channel "chrome". Run \`npx playwright install chromium-headless-shell\` to use the pinned build.`);
    return chromium.launch({ headless: true, channel: 'chrome' });
  }
}

// ---- Story driving --------------------------------------------------------------------------
/** Records play/render errors from the preview channel onto window.__tenetStoryErrors. */
export const CAPTURE_ERRORS_INIT = `
  window.__tenetStoryErrors = [];
  const hook = () => {
    const ch = window.__STORYBOOK_ADDONS_CHANNEL__;
    if (!ch) return setTimeout(hook, 10);
    for (const ev of ['playFunctionThrewException', 'storyThrewException', 'storyErrored', 'unhandledErrorsWhilePlaying'])
      ch.on(ev, (e) => window.__tenetStoryErrors.push(ev + ': ' + (e?.message ?? e?.error?.message ?? e?.title ?? JSON.stringify(e)).split('\\n')[0]));
  };
  hook();`;

/** Open one story in one theme; resolve once the render + play function have settled. */
export async function openStory(page, baseUrl, storyId, theme) {
  await page.goto(`${baseUrl}/iframe.html?id=${storyId}&viewMode=story&globals=colorMode:${theme}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(
    (id) => {
      const render = window.__STORYBOOK_PREVIEW__?.storyRenders?.find((r) => r.id === id);
      return ['finished', 'completed', 'errored', 'aborted'].includes(render?.phase) || document.body.classList.contains('sb-show-errordisplay');
    },
    storyId,
    { timeout: 30_000 },
  );
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }' });
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))); // one stable frame
  return page.evaluate((id) => ({
    phase: window.__STORYBOOK_PREVIEW__?.storyRenders?.find((r) => r.id === id)?.phase,
    errors: window.__tenetStoryErrors ?? [],
    errorDisplay: document.body.classList.contains('sb-show-errordisplay') ? document.querySelector('#error-message')?.textContent?.trim().split('\n')[0] : undefined,
    colorMode: document.documentElement.dataset.colorMode,
  }), storyId);
}

export function loadStories(staticDir, filter) {
  const index = JSON.parse(readFileSync(join(staticDir, 'index.json'), 'utf8'));
  return Object.values(index.entries)
    .filter((e) => e.type === 'story')
    .filter((e) => !filter || `${e.id} ${e.title}`.toLowerCase().includes(filter))
    .sort((a, b) => a.id.localeCompare(b.id));
}

/** Run `fn(job)` over jobs with at most `n` in flight. */
export async function runPool(jobs, n, fn) {
  const queue = [...jobs];
  await Promise.all(Array.from({ length: Math.max(1, n) }, async () => {
    for (let job = queue.shift(); job; job = queue.shift()) await fn(job);
  }));
}

// ---- Main -----------------------------------------------------------------------------------
async function main() {
  const stories = loadStories(STATIC_DIR, FILTER);
  if (!stories.length) {
    console.error(`build-baselines: no stories match --filter "${FILTER}"`);
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });
  const { server, url } = await serveStatic(STATIC_DIR);
  const browser = await launchBrowser();
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: 'light' });
  await context.addInitScript(CAPTURE_ERRORS_INIT);

  const entries = [];
  const failures = [];
  const jobs = stories.flatMap((s) => THEMES.map((theme) => ({ story: s, theme })));
  const t0 = Date.now();
  await runPool(jobs, CONCURRENCY, async ({ story, theme }) => {
    const page = await context.newPage();
    try {
      const state = await openStory(page, url, story.id, theme);
      if (state.phase === 'errored' || state.errorDisplay || state.errors.length) {
        failures.push(`${story.id} [${theme}] ${state.errorDisplay ?? state.errors[0] ?? state.phase}`);
        return;
      }
      if (state.colorMode !== theme) failures.push(`${story.id} [${theme}] data-color-mode is "${state.colorMode}"`);
      const file = `${story.id}.${theme}.png`;
      const png = await page.screenshot({ path: join(OUT_DIR, file), fullPage: true, animations: 'disabled' });
      entries.push({ storyId: story.id, component: story.title, name: story.name, importPath: story.importPath, theme, file, sha256: createHash('sha256').update(png).digest('hex'), hasPlay: story.tags?.includes('play-fn') ?? false });
      console.log(`  ✓ ${file}`);
    } catch (err) {
      failures.push(`${story.id} [${theme}] ${String(err.message).split('\n')[0]}`);
    } finally {
      await page.close();
    }
  });

  await browser.close();
  server.close();

  const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf8'));
  const sbPkg = JSON.parse(readFileSync(resolve('node_modules/storybook/package.json'), 'utf8'));
  entries.sort((a, b) => a.storyId.localeCompare(b.storyId) || a.theme.localeCompare(b.theme));
  const manifest = { storybookVersion: sbPkg.version, dsVersion: pkg.version, viewport: VIEWPORT, themes: THEMES, generatedAt: new Date().toISOString(), filter: FILTER || undefined, entries };
  writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\nbuild-baselines: ${entries.length} screenshots for ${stories.length} stories in ${((Date.now() - t0) / 1000).toFixed(1)}s -> ${OUT_DIR}/manifest.json`);

  if (failures.length) {
    console.error(`\n${failures.length} story render(s) failed (no baseline written):`);
    for (const f of failures) console.error(`  ✗ ${f}`);
    process.exit(1);
  }
}

// Only run when executed directly (check-a11y.mjs imports the helpers above).
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
