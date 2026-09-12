# eslint-plugin-tenet-ui

ESLint rules for the [tenet-ui](https://apurvkhare.github.io/tenet-ui/) design system. Six rules, all `error` in the recommended config, each carrying the guideline section it enforces:

| Rule | Catches | Guideline |
|---|---|---|
| `no-raw-color` | hex / `rgb()` / `hsl()` / named colours in styles | [Foundations › Color](https://apurvkhare.github.io/tenet-ui/foundations/color/) |
| `no-raw-spacing` | raw `px` / `rem` / `em` / bare numbers for spacing and size properties | [Foundations › Layout](https://apurvkhare.github.io/tenet-ui/foundations/layout/) |
| `prefer-component` | raw `<button>`, `<input>`, `<select>`, `<textarea>`, `<table>`, `<h1>`–`<h6>`, `<a>` where tenet-ui has a component | [Components](https://apurvkhare.github.io/tenet-ui/components/) |
| `require-styles-import` | entry files that never import `tenet-ui/styles.css` | [Getting started](https://apurvkhare.github.io/tenet-ui/getting-started/) |
| `no-deprecated-api` | deprecated props and components from the deprecation registry (props are autofixed) | [Changelog › Deprecations](https://apurvkhare.github.io/tenet-ui/changelog/#deprecations) |
| `no-unknown-token` | `var(--x)` where `--x` is not a tenet-ui token | [Tokens](https://apurvkhare.github.io/tenet-ui/tokens/) |

Every message names the fix: the exact token whose value you typed, the nearest token when nothing matches, the component to import, or the replacement prop.

## Install

```sh
npm install --save-dev eslint-plugin-tenet-ui eslint
```

Requires ESLint 9 or later (flat config) and Node 18 or later. TypeScript / TSX files need a parser that understands them (`@typescript-eslint/parser`), configured the way you already do for the rest of your lint setup.

## Usage (flat config)

```js
// eslint.config.js
import tenetUi from 'eslint-plugin-tenet-ui';

export default [
  tenetUi.configs.recommended,
];
```

`configs.recommended` applies to `**/*.{js,jsx,ts,tsx}`, registers the plugin under the `tenet-ui` namespace, turns on JSX parsing and sets every rule to `error`.

To pass options without spelling each rule out, use `createConfig`:

```js
import { createConfig } from 'eslint-plugin-tenet-ui';

export default [
  createConfig({
    entry: ['src/main.tsx'],          // files that must import tenet-ui/styles.css
    exceptions: ['transparent'],      // raw colours you accept
    allow: ['a'],                     // raw elements you accept
    allowScale: false,                // let 4px-multiples through (default false)
    severity: 'error',                // or 'warn'
  }),
];
```

Or configure rules individually:

```js
import tenetUi from 'eslint-plugin-tenet-ui';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { 'tenet-ui': tenetUi },
    rules: {
      'tenet-ui/no-raw-color': ['error', { exceptions: ['#000'] }],
      'tenet-ui/no-raw-spacing': ['error', { allowScale: true }],
      'tenet-ui/prefer-component': ['error', { allow: ['a', 'table'] }],
      'tenet-ui/require-styles-import': ['error', { entry: ['src/main.tsx'] }],
      'tenet-ui/no-deprecated-api': 'error',
      'tenet-ui/no-unknown-token': 'error',
    },
  },
];
```

## Rules

### `tenet-ui/no-raw-color`

Colours must come from tokens so light and dark both work. Reports hex (`#abc`, `#aabbcc`, `#aabbccdd`), `rgb()`/`rgba()`/`hsl()`/`hsla()` and CSS named colours found in:

- JSX `style={{ ... }}` objects, inline or via an object literal declared in the same file;
- object literals whose keys are colour properties (theme objects, `css({ ... })`, `sx`);
- `css`, `styled.*`, `keyframes`, `createGlobalStyle` tagged templates;
- `el.style.color = '...'` and `el.style.setProperty('--x', '...')`;
- strings that assign a CSS custom property (`'--accent: #c2502e'`).

The message names the token whose light value matches exactly (`#2a241b` → `var(--fgColor-default)`), preferring the family that fits the property (`color` → `--fgColor-*`, `background` → `--bgColor-*`, `border*` → `--borderColor-*`). When nothing matches it names the family to pick from. Exact matches come with editor suggestions.

Options: `{ exceptions: string[] }` — raw colour literals that are allowed as-is (`['transparent', '#000']`).

### `tenet-ui/no-raw-spacing`

Spacing and size must sit on the token scale. Checks `margin*`, `padding*`, `gap`, `rowGap`, `columnGap`, `top`/`right`/`bottom`/`left`, `inset*`, `width`/`height`/`min*`/`max*`, `borderRadius*`, `fontSize`, `border*Width` and border shorthands, in JSX style objects, CSS-property object literals, css templates and `el.style.x = ...`. `px`, `rem` and `em` literals plus bare numbers (React treats them as px) are checked; `0`, `1px` and `2px` (hairlines) are allowed.

The message names the token with that value (`12px` for `padding` → `var(--space-3)`), semantic families first (`--space-*`, `--control-*-size`, `--borderRadius-*`, `--fontSize-*`) and `--base-size-*` last; a `fontSize` token never gets suggested for a `padding`. When nothing matches it names the nearest token of the right family and the delta (`6px` → `--space-1` = 4px, +2px).

Options: `{ allowScale: boolean }` — when `true`, raw values that are multiples of 4px pass even though they are off-token. Default `false`.

### `tenet-ui/prefer-component`

Reports raw HTML elements that tenet-ui has a component for:

| Raw element | Component |
|---|---|
| `<button>` | `Button` |
| `<input>` | `TextInput` — `type="checkbox"` → `Checkbox`, `type="radio"` → `Radio`, `type="number"` → `NumberInput`, `type="date"` → `DatePicker`, `type="submit"`/`"button"`/`"reset"` → `Button` |
| `<select>` | `Select` |
| `<textarea>` | `Textarea` |
| `<table>` | `Table` |
| `<h1>`–`<h6>` | `Heading` |
| `<a>` | `Link` |

`<p>` is deliberately not reported (too noisy). An `<input>` with a dynamic `type` is not judged. A raw element is reported only when the mapped component exists **in the tenet-ui version you have installed**: on 0.3.0 `<h1>` passes because there is no `Heading`; on 0.4.0 it fires.

Options: `{ allow: string[] }` — raw element names to allow (`['a']`).

### `tenet-ui/require-styles-import`

The runtime contract: `tenet-ui/styles.css` defines every `--token` (light and dark) and the component styles. Without that one import, `var(--token)` resolves to nothing and the UI renders unstyled while the code still looks token-pure. Files matching the `entry` globs are reported at `Program` when they contain no `import 'tenet-ui/styles.css'`, `import 'tenet-ui/dist/styles.css'`, `import('tenet-ui/styles.css')` or `require('tenet-ui/styles.css')`. Comes with a suggestion that inserts the import.

Options: `{ entry: string[] }` — globs (`**`, `*`, `?`, `{a,b}`) for entry files. Default `['**/main.{tsx,jsx,ts,js}', '**/index.{tsx,jsx}', '**/App.{tsx,jsx}', '**/root.{tsx,jsx}']`.

### `tenet-ui/no-deprecated-api`

Reads the deprecation registry (`tenet-ui/generated/deprecations.json`) of the installed version and reports:

- a deprecated prop on a tenet-ui component — `<Button block>` → "`block` on `<Button>` is deprecated since tenet-ui 0.4.0; use `fullWidth`" — **autofixed** for simple renames (`block` → `fullWidth`, `block={x}` → `fullWidth={x}`);
- `import { Label } from 'tenet-ui'` where `Label` is a deprecated component (reported on the specifier, no fix — the replacement may take different props);
- JSX usage of a deprecated component.

Only identifiers imported from `'tenet-ui'` count, so your own `Button` is never touched. Aliases (`import { Button as B }`), namespaces (`import * as T`) and member expressions (`<FormControl.Label>`) resolve correctly. No options.

### `tenet-ui/no-unknown-token`

`var(--x)` in any string or template where `--x` is not a tenet-ui token: "Unknown token `--fgColor-mutted` — not a tenet-ui token; did you mean `--fgColor-muted`?", with a suggestion when a close name exists. No options.

## Where the data comes from

The rules are data-driven, so findings match **the tenet-ui version you have installed**. At load the plugin resolves, from your project root:

1. `tenet-ui/tokens.json`, `tenet-ui/generated/components.json`, `tenet-ui/generated/deprecations.json` — the package exports of your installed `tenet-ui`;
2. failing that, the copies bundled in this package's `data/` directory (tenet-ui 0.4.0).

Upgrading tenet-ui therefore changes what lints: 0.4.0 adds `Heading`, so raw `<h1>` starts firing; 0.4.0 deprecates `block`, so `<Button block>` starts firing. You can also hand the data in explicitly through ESLint settings, which is what the plugin's own tests do:

```js
{ settings: { 'tenet-ui': { tokens, components, deprecations } } }
```

Any of the three can be omitted; the rest is resolved as above.

## Demo

```sh
npm run demo        # lint fixtures/ with the recommended config, print the findings
npm run demo:json   # same, as JSON
```

`fixtures/violations.tsx` is an "existing UI" with one of everything (hex colour, off-scale px, raw `<button>` and `<h1>`, `<Button block>`, `import { Label }`, an unknown token); `fixtures/app/main.tsx` is an entry file that forgot the stylesheet.

## Maintainers

```sh
npm run sync-data   # copy ../../dist/tokens.json, ../../generated/{components,deprecations}.json into data/
npm test            # node:test + RuleTester, TSX parsed with @typescript-eslint/parser
```

Run `sync-data` after every tenet-ui build so the bundled fallback matches the release; bump this package's version with tenet-ui's.
