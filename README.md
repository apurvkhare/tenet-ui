# Acme Design System (`@acme/ds`)

A small, deliberately **private** design system built for the talk demo. The model has never seen it — so generating compliant code requires the skill, not training-data recall. "Acme" is a placeholder brand; rebrand freely for the final slides.

It is built to ship the **same machine-readable artifact shapes a real DS does**, so the skill's `ingest` is realistic and transfers to any DS:

| Source | Lives in | Built artifact (what `ingest` reads) |
|--------|----------|--------------------------------------|
| **Design tokens** | `tokens/tokens.json` (source) | `dist/tokens.json` (flat, resolved) + `dist/tokens.css` (CSS vars) |
| **Component API** | `src/components/*/*.tsx` + `*.docs.json` | `generated/components.json` (prop catalog) |
| **Guidelines + Storybook** | `guidelines/*.md` + `*.stories.tsx` | Storybook `index.json` (when running) |

## Token model

- **Base (primitive) tokens** — raw values: `base.color.*`, `base.size.*`.
- **Functional (semantic) tokens** — reference base tokens: `fgColor.*`, `bgColor.*`, `borderColor.*`, `space.*`, `borderRadius.*`, `fontSize.*`, `fontWeight.*`, `control.*`, `shadow.*`.
- CSS variable name = the token path joined with `-`, prefixed `--` (e.g. `bgColor.accent.emphasis` → `--bgColor-accent-emphasis`).

Components must only use functional tokens — never raw hex/px. That rule is what the skill's audit enforces.

## Scripts

```bash
npm run build:tokens   # tokens/tokens.json -> dist/tokens.json + dist/tokens.css
```
