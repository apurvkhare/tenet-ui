# Tenet UI (`tenet-ui`)

The Tenet design system: design tokens, React components, and icons for the **Editorial Ink** identity (warm paper neutrals, terracotta accent, serif display headings). Small, real, and machine-readable: every artifact a design-system tool needs — types, stories, tokens, guidelines, icon manifest, deprecation registry, lint rules — is generated from this repo and shipped in the npm package.

- Docs: https://apurvkhare.github.io/tenet-ui/ (with `llms.txt`)
- Storybook: https://apurvkhare.github.io/tenet-ui/storybook/
- npm: [`tenet-ui`](https://www.npmjs.com/package/tenet-ui) · [`eslint-plugin-tenet-ui`](packages/eslint-plugin)

## Install

```bash
npm install tenet-ui react react-dom
```

## Use

Import the stylesheet **once** at the app root, then use the components. This is the whole runtime contract: without the stylesheet every `var(--token)` is undefined and the UI renders unstyled.

```tsx
import 'tenet-ui/styles.css'; // tokens (light + dark) + component styles — once, at the root
import { Button, FormControl, Heading, Stack, TextInput } from 'tenet-ui';
import { SearchIcon } from 'tenet-ui/icons';

export function Example() {
  return (
    <Stack gap="normal">
      <Heading level={1}>Articles</Heading>
      <FormControl required>
        <FormControl.Label>Search</FormControl.Label>
        <TextInput type="search" leadingVisual={<SearchIcon />} fullWidth />
      </FormControl>
      <Button variant="primary">Save changes</Button>
    </Stack>
  );
}
```

### Dark mode

Tokens are CSS custom properties scoped to `data-color-mode` (light is the default). Set it on `<html>` so portaled layers (menus, selects, popovers) theme too:

```html
<html data-color-mode="dark">
```

## What ships in the package

| Artifact | Path in the tarball | Source of truth |
|---|---|---|
| Components (ESM + CJS + `.d.ts`) | `dist/index.*` | `src/components/*/` |
| Icons | `dist/icons.*` (`tenet-ui/icons`) | `icons/manifest.json` → `scripts/build-icons.mjs` |
| Stylesheet | `dist/styles.css` (`tenet-ui/styles.css`) | tokens + each component's CSS |
| Tokens | `dist/tokens.json`, `dist/tokens.css` | `tokens/tokens.json` (DTCG; `$extensions.tenet.contrast` holds the AA pairs) |
| Component catalog | `generated/components.json` | derived from `*.types.ts` + `*.meta.json` + `*.stories.tsx` |
| Deprecation registry | `generated/deprecations.json` | `@deprecated` JSDoc tags |
| Icon manifest | `generated/icons.json` | `icons/manifest.json` |
| Guidelines | `generated/guidelines/*.md`, `generated/guidelines/system/*.md` | `src/components/*/*.guidelines.md`, `guidelines/system/` |
| Changelog | `CHANGELOG.md` | hand-written |

Story baselines (per-story screenshots, light and dark) are attached to each GitHub release, not the tarball.

## Repository layout

```
src/components/<Name>/   Name.tsx · Name.types.ts · Name.css · Name.stories.tsx · Name.guidelines.md · Name.meta.json · index.ts
src/icons/               generated icon components (+ LICENSE-lucide.txt)
src/internal/            floating layer + deprecation helpers
tokens/tokens.json       DTCG tokens, light + dark
guidelines/system/       foundations & patterns (color, typography, layout, forms, feedback, data display, iconography, accessibility, content)
icons/manifest.json      the curated icon list
scripts/                 build-icons · build-tokens · build-catalog · build-styles · build-baselines · check-a11y · check-story-ids
.storybook/              Storybook (React + Vite), light/dark toolbar
docs/                    Astro Starlight docs site (standalone npm project)
packages/eslint-plugin/  eslint-plugin-tenet-ui (standalone npm project)
.github/workflows/       ci · release (npm publish with provenance) · pages (docs + Storybook)
```

One component is one folder and one PR. Types are the truth: props, defaults and deprecations in the catalog come from the `.types.ts` / `.tsx` files; only `status`, `a11yReviewed`, the subcomponent→interface mapping and `related` are kept by hand in `meta.json`.

## Rules the system is judged by

1. **Tokens only.** Every colour, space, radius, font, shadow and border width in component CSS is a `var(--token)`. No hex, no raw px, no font stacks.
2. **Accessibility is the contract.** Correct roles and states, full keyboard paths, an accessible name for every interactive element, visible focus, decorative glyphs `aria-hidden`, `prefers-reduced-motion` honoured. Every story is checked with axe in light **and** dark.
3. **Consistent API.** `forwardRef` to the real element, `...rest` forwarded, `className` accepted, controlled and uncontrolled where a value exists, compound parts via `Object.assign`.
4. **Honest types and docs.** Strict `tsc`, JSDoc on every prop, `@default` where the default is not a literal, `@deprecated` with the replacement in backticks.

## Scripts

```bash
npm run build            # icons → js (tsup) → tokens (+ contrast verification) → catalog → styles
npm run typecheck        # strict tsc over the components
npm run storybook        # dev Storybook
npm run build-storybook  # static Storybook → storybook-static/
npm run check:story-ids  # catalog story ids == Storybook index
npm run check:a11y       # axe over every story, light + dark (needs a Playwright browser)
npm run build:baselines  # per-story screenshots at 1280, light + dark → baselines/
```

Docs site: `cd docs && npm ci && npm run build`. ESLint plugin: `cd packages/eslint-plugin && npm ci && npm test`.

## Releasing

1. Update `CHANGELOG.md` and bump `version` in `package.json`.
2. `npm run build` and commit the generated output (CI fails on drift).
3. Tag `vX.Y.Z` and push the tag. The release workflow typechecks, builds, runs the story checks, publishes to npm with provenance (needs `NPM_TOKEN` or npm Trusted Publishing), attaches the baselines to the GitHub release, and notifies the design-system MCP server if its webhook secrets are set.

## License

MIT. Icons are derived from [Lucide](https://lucide.dev) (ISC); see `src/icons/LICENSE-lucide.txt`.
