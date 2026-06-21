# Tenet Design System (`@tenet/ds`)

A small, deliberately **private** design system (design tokens + React components) built for the talk demo. The model has never seen it — so generating compliant code requires the skill, not training-data recall. "Tenet" is a placeholder brand; rebrand freely.

It ships the **same machine-readable artifact shapes a real DS does**, so the skill's `ingest` is realistic and transfers to any design system.

## Install

```bash
npm install @tenet/ds
# peer deps:
npm install react react-dom
```

## Usage

Import the stylesheet **once** at your app root, then use the components. Without the stylesheet, every component's `var(--token)` is undefined and the UI renders unstyled.

```tsx
import '@tenet/ds/styles.css';            // tokens (light + dark) + component styles
import { Button, Table, FormControl, TextInput } from '@tenet/ds';

export function Example() {
  return (
    <FormControl required>
      <FormControl.Label>Email</FormControl.Label>
      <TextInput type="email" block />
    </FormControl>
  );
}
```

### Dark mode

Tokens are CSS custom properties scoped to a `data-color-mode` attribute (light is the default). Switch the whole tree by setting it on a wrapper (or `<html>`):

```html
<html data-color-mode="dark"> … </html>
```

No component code changes for theming — the semantic tokens re-resolve.

## What's in the box

| Source | Lives in | Built artifact (what `ingest` reads) |
|--------|----------|--------------------------------------|
| **Design tokens** | `tokens/tokens.json` (source) | `dist/tokens.json` (flat, resolved light+dark) + `dist/tokens.css` (themed CSS vars) |
| **Component API** | `src/components/*/*.tsx` + `*.docs.json` | `generated/components.json` (prop catalog) |
| **Guidelines** | `guidelines/*.md` | per-component usage rules |

**Components:** Button, Stack, Card, TextInput, Textarea, Select, Checkbox, Radio/RadioGroup, Label, Table, FormControl.

## Token model

- **Base (primitive) tokens** — raw values: `base.color.*`, `base.size.*`.
- **Theme-agnostic semantics** — `space.*`, `borderWidth.*`, `borderRadius.*`, `fontSize.*`, `fontWeight.*`, `control.*`, `shadow.*`.
- **Themed semantics** (`light` / `dark`) — `fgColor.*`, `bgColor.*`, `borderColor.*`.
- CSS variable name = the token path joined with `-`, prefixed `--` (e.g. `bgColor.accent.emphasis` → `--bgColor-accent-emphasis`).

Components must only use semantic tokens — never raw hex/px. That rule is what the skill's audit enforces.

## Scripts

```bash
npm run build          # build:js (tsup) + tokens + catalog + styles -> dist/ + generated/
npm run build:tokens   # tokens/tokens.json -> dist/tokens.{json,css}
npm run build:catalog  # src/**/*.docs.json -> generated/components.json
npm run typecheck      # strict tsc over the components
```

Publishing runs `prepublishOnly` (a full build) automatically.
