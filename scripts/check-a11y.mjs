#!/usr/bin/env node
// Accessibility gate over the built Storybook: axe-core on every story, light AND dark.
//
//   node scripts/check-a11y.mjs [--filter <substring>] [--concurrency N] [--impact serious,critical]
//
// Same driving as build-baselines.mjs (static server + Playwright Chromium + `globals=colorMode`),
// but instead of a screenshot it injects node_modules/axe-core/axe.min.js into the story frame and
// runs the WCAG 2.0/2.1 A+AA rule set. Both themes matter: color-contrast is the rule most likely to
// pass in light and fail in dark (or vice versa). Prints one row per offending node and exits 1 if
// any violation at or above the impact threshold is found (default: serious + critical).
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { CAPTURE_ERRORS_INIT, launchBrowser, loadStories, openStory, runPool, serveStatic } from './build-baselines.mjs';

const arg = (flag, dflt) => {
  const i = process.argv.indexOf(flag);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
};
const FILTER = arg('--filter', '').toLowerCase();
const CONCURRENCY = Number(arg('--concurrency', '4'));
const IMPACTS = new Set(arg('--impact', 'serious,critical').split(',').map((s) => s.trim()).filter(Boolean));
const STATIC_DIR = resolve(arg('--static', 'storybook-static'));
const THEMES = ['light', 'dark'];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa'];
const AXE_PATH = resolve('node_modules/axe-core/axe.min.js');

if (!existsSync(join(STATIC_DIR, 'index.json'))) {
  console.error(`check-a11y: ${STATIC_DIR}/index.json not found — run \`npm run build-storybook\` first.`);
  process.exit(2);
}
if (!existsSync(AXE_PATH)) {
  console.error(`check-a11y: ${AXE_PATH} not found — axe-core is a devDependency, run \`npm install\`.`);
  process.exit(2);
}
const AXE_SOURCE = readFileSync(AXE_PATH, 'utf8');

/** Run axe inside the story frame; returns violations flattened to one row per node. */
async function auditStory(page, theme, story) {
  await page.addScriptTag({ content: AXE_SOURCE });
  const results = await page.evaluate(
    (tags) => window.axe.run(document, { runOnly: { type: 'tag', values: tags }, resultTypes: ['violations'] }),
    TAGS,
  );
  return results.violations.flatMap((v) =>
    v.nodes.map((n) => ({
      story: story.id,
      theme,
      rule: v.id,
      impact: v.impact ?? 'unknown',
      target: n.target.join(' '),
      help: v.helpUrl,
      summary: (n.failureSummary ?? '').split('\n').slice(1).join(' ').trim(),
    })),
  );
}

async function main() {
  const stories = loadStories(STATIC_DIR, FILTER);
  if (!stories.length) {
    console.error(`check-a11y: no stories match --filter "${FILTER}"`);
    process.exit(1);
  }
  const { server, url } = await serveStatic(STATIC_DIR);
  const browser = await launchBrowser();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  await context.addInitScript(CAPTURE_ERRORS_INIT);

  const rows = [];
  const failures = [];
  const t0 = Date.now();
  await runPool(stories.flatMap((s) => THEMES.map((theme) => ({ story: s, theme }))), CONCURRENCY, async ({ story, theme }) => {
    const page = await context.newPage();
    try {
      const state = await openStory(page, url, story.id, theme);
      if (state.phase === 'errored' || state.errorDisplay || state.errors.length) {
        failures.push(`${story.id} [${theme}] did not render: ${state.errorDisplay ?? state.errors[0] ?? state.phase}`);
        return;
      }
      rows.push(...(await auditStory(page, theme, story)).filter((r) => IMPACTS.has(r.impact)));
    } catch (err) {
      failures.push(`${story.id} [${theme}] ${String(err.message).split('\n')[0]}`);
    } finally {
      await page.close();
    }
  });
  await browser.close();
  server.close();

  rows.sort((a, b) => a.story.localeCompare(b.story) || a.theme.localeCompare(b.theme) || a.rule.localeCompare(b.rule));
  if (rows.length) {
    const cols = ['story', 'theme', 'rule', 'impact', 'target', 'help'];
    const width = Object.fromEntries(cols.map((c) => [c, Math.max(c.length, ...rows.map((r) => String(r[c]).length))]));
    const line = (r) => cols.map((c) => String(r[c]).padEnd(width[c])).join('  ');
    console.log(line(Object.fromEntries(cols.map((c) => [c, c]))));
    console.log(cols.map((c) => '-'.repeat(width[c])).join('  '));
    for (const r of rows) console.log(line(r));
  }
  const checked = stories.length * THEMES.length - failures.length;
  console.log(
    `\ncheck-a11y: ${rows.length} violation(s) [${[...IMPACTS].join('|')}] across ${checked} story×theme renders (${stories.length} stories × ${THEMES.length} themes) in ${((Date.now() - t0) / 1000).toFixed(1)}s`,
  );
  if (failures.length) {
    console.error(`\n${failures.length} story render(s) could not be audited:`);
    for (const f of failures) console.error(`  ✗ ${f}`);
  }
  process.exit(rows.length || failures.length ? 1 : 0);
}

main();
