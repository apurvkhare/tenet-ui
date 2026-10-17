# tenet-ui gap analysis: design-system fundamentals

Audit of `tenet-ui@0.4.0` (branch `main` at `a162ad9`) against the fundamentals taught in the React India talk "Design to Code: Building a Design System MCP Server", and against the research in `mcp-masterclass/research/design-system-fundamentals/REPORT.md` (Adobe Spectrum, Atlassian, AWS Cloudscape and GitHub Primer, cross-checked with Material 3, Carbon, Fluent 2 and DTCG 2025.10).

Audited 2026-10-17. Every claim below points at a file in this repo or a section of the spec. Status values:

- **done**: the fundamental is present and the docs describe it accurately.
- **partial**: present in code or data, but undocumented, mislabelled, or incomplete.
- **missing**: not present.

## Summary

| # | Area | Status |
|---|---|---|
| 1 | Docs site structure | partial |
| 2 | Foundations pages | partial |
| 3 | Token tiers and naming | partial |
| 4 | DTCG 2025.10 conformance | partial |
| 5 | Theming | partial |
| 6 | Patterns | partial |
| 7 | Voice and tone | partial |
| 8 | Accessibility statement and WCAG level | partial |
| 9 | Component lifecycle labels | partial |
| 10 | Deprecation policy, changelog and migration guides | partial |
| 11 | Docs accuracy and house style | partial |

### Status after branch `claude/beautiful-stonebraker-3b2821`

Approved fixes A1 to A8 and B1, B2 (proposal in the session; B3 and A9 not taken).

| # | Area | Before | After | What changed, and what is left |
|---|---|---|---|---|
| 1 | Docs site structure | partial | done | Sidebar grouped by layer: Foundations, Components, Patterns, Guidelines, Releases. Pages routed by a `layer:` frontmatter field; old URLs redirect. |
| 2 | Foundations pages | partial | done | New Motion, Design tokens and Theming pages. Spacing stays inside Layout. Elevation and shape pages (optional) not added. |
| 3 | Token tiers and naming | partial | done | `$extensions.tenet.tier` on every token (39 base, 61 semantic, 4 component), a Tier column on the token reference, a naming table, and the inaccurate "semantic only" claims corrected. Components still use `--base-size-*`; now documented as the one exception. |
| 4 | DTCG 2025.10 conformance | partial | done | All values in 2025.10 formats, validated by the build. `shadow.focus` is themed. Recommendations not adopted: Resolver module, reverse-domain `$extensions` key, `.tokens.json` extension. |
| 5 | Theming | partial | done | Theming page. High-contrast themes and forced-colors support are still missing, and are stated as not supported. |
| 6 | Patterns | partial | partial | Patterns now have their own section. Empty-state, destructive-confirmation and loading pattern pages are still missing. |
| 7 | Voice and tone | partial | done | Voice attributes, a tone-by-situation table and inclusive-language rules (16 to 18) in Content. |
| 8 | Accessibility statement and WCAG level | partial | done | WCAG 2.2 AA stated as a target, how it is tested, known limitations. The limitations themselves (forced colors, RTL, Switch motion) remain. |
| 9 | Component lifecycle labels | partial | done | Status vocabulary defined in Versioning. |
| 10 | Deprecation policy, changelog, migration guides | partial | done | Versioning page (one-minor window), Migrating to 0.5, an Unreleased changelog section. |
| 11 | Docs accuracy and house style | partial | partial | Claims fixed. Em dashes remain in the 41 component guideline files and the 0.4.0 changelog entry. |

tenet-ui already has the hard parts: a single token source, semantic colour tokens with build-verified contrast pairs, type-derived component docs, a deprecation registry, an ESLint plugin, and llms.txt. Most gaps are in how the docs **name and group** what exists, plus a handful of claims that the code does not back up. Very few gaps need code.

### What the user's starting facts got right and wrong

| Fact as given | Verified |
|---|---|
| `tokens/tokens.json` uses `$value` / `$type` with `{alias}` references | True. |
| `base` holds raw values; `themes.light` / `themes.dark` hold semantic `fgColor` / `bgColor` / `borderColor`; `control` holds component-ish sizes | True. |
| 41 components | True: 40 `stable`, 1 `deprecated` (`Label`). `generated/components.json`. |
| 65 semantic tokens (104 total) | 104 total is true. 65 is "everything outside `base`", and 28 of those 65 hold raw literals (see §3). Truly semantic: 28 themed colour names, plus `space` (6) and arguably `control` (3). |
| Tokens are px, not rem | True. No `rem` anywhere in `tokens/` or component CSS. |
| No RTL | True. No `dir`, `:dir()` or logical inset properties; 15 physical `left` / `right` / `margin-left` style declarations in component CSS. |
| No forced-colors / high-contrast | True. No `forced-colors` or `prefers-contrast` query anywhere. |
| Has `:focus-visible` styles and `prefers-reduced-motion` rules | True, with gaps: 21 CSS files use `:focus-visible`; 6 have reduced-motion rules. `Switch` animates its thumb with `transform` and has no reduced-motion rule. |
| Themes via `[data-color-mode="light\|dark"]` | True. Light is also the `:root` default. |
| Ships an ESLint plugin, Storybook, a docs site and llms.txt | True. |

---

## 1. Docs site structure: partial

**What the systems do.** Spectrum: Getting started, Foundations, Content, Components. Atlassian: Foundations (with Accessibility and Content under "Guidelines"), Components, Release phases. Cloudscape: Foundation, Components, Patterns. Primer: Foundations, Components, UI Patterns, Accessibility as its own top-level site.

**What tenet-ui has** (`docs/astro.config.mjs`, sidebar):

```
Getting started
Foundations      (autogenerated: color, typography, layout, forms, feedback,
                  data-display, iconography, accessibility, content)
Components       (41 + overview)
Icons
Tokens
Changelog
```

**Gaps**

- **Patterns are filed as foundations.** `forms.md`, `feedback.md` and `data-display.md` describe how components combine (decision tables, "which one"). By the research's own definition ("Patterns are reusable combinations of components that solve common user problems", Cloudscape) they are patterns. The overview page is titled "Foundations & patterns", which admits the mix without separating it.
- **Accessibility and Content sit inside Foundations.** That matches Atlassian, so it is defensible, but the talk teaches them as guidelines that cut across every layer. A top-level "Guidelines" group (Accessibility, Content) would make the slide and the site match.
- **Tokens and Icons are top-level, beside Foundations.** Spectrum and Atlassian put design tokens under Foundations; iconography is already a foundation page here, and the Icons gallery is its reference.
- **No Versions / Releases section.** The Changelog exists, but there is no lifecycle or deprecation policy page (see §9 and §10).

**Constraint.** Page URLs (`/foundations/forms/` etc.) can stay unchanged: Starlight sidebar groups can link any page, so regrouping does not need to move files. See the URL impact note in "tenet-ui-mcp impact" below.

## 2. Foundations pages: partial

| Foundation (talk) | Page | Status | Notes |
|---|---|---|---|
| Colour | `guidelines/system/color.md` | done | Semantic-only rule, AA pair table, do / don't. |
| Typography | `guidelines/system/typography.md` | done | Scale table with the job of each step. |
| Spacing | none | partial | The space scale is documented inside `layout.md` rules 2 to 4 and on the Tokens page. No page of its own, unlike Spectrum, Atlassian and Cloudscape. |
| Layout | `guidelines/system/layout.md` | done | Stack / Grid, page skeleton, Card vs section. |
| Iconography | `guidelines/system/iconography.md` + `/icons/` | done | |
| Motion | none | missing | No page and no motion tokens. Durations are hardcoded in component CSS (`0.12s` in Button, `0.16s` in Switch, `1.2s` Spinner, `1.6s` Skeleton). The reduced-motion contract lives only in `accessibility.md` rule 7. |
| Elevation / shadow | none | missing (optional) | Three `shadow.*` tokens exist. The research marks elevation as "less uniform", so this is optional. |
| Shape / radius | none | missing (optional) | Four `borderRadius.*` tokens exist. Also "less uniform". |
| Design tokens (as a foundation) | `/tokens/` | partial | The reference table is generated and complete. There is no explanation of the tiers, the naming grammar, or how themes swap values (see §3 and §5). |

## 3. Token tiers and naming: partial

**The three tiers the talk teaches**, mapped onto the 104 tokens in `dist/tokens.json`:

| Tier | Talk name | tenet-ui group | Count | Holds |
|---|---|---|---|---|
| 1 | Raw value | `base.color.*`, `base.size.*` | 39 | Literals. |
| 2 | Meaning (semantic) | `fgColor`, `bgColor`, `borderColor` (themed) | 28 names × 2 themes | Mostly aliases to `base.color.*`, but 9 light and 12 dark values are literals that skip tier 1 (the `*.muted` tints, the backdrops, and the dark surfaces, e.g. `bgColor.accent.muted: #f5e4db`). |
| 2 | Meaning (semantic) | `space.1` to `space.6` | 6 | Aliases to `base.size.*`. |
| 3 | Component | `control.{small,medium,large}.size` | 3 | Aliases to `base.size.*`. Same idea as Primer's `control-*` component/pattern tier. |
| 3 | Component | `letterSpacing.tag` | 1 | Literal `0.04em`. Named after Tag but used by `Divider`, `Label` and `Table`. |
| ? | Unclear | `fontSize`, `fontWeight`, `fontFamily`, `lineHeight`, `borderRadius`, `borderWidth`, `shadow`, `breakpoint` | 27 | **Literals that live outside `base`.** By the tier definition they are raw values, but they sit beside the semantic groups and have scale-style names (`fontSize.3`). |

So the starting fact "65 semantic tokens" counts every non-`base` token, but 28 of the 65 (the unclear row plus `letterSpacing.tag`) hold literals and would sit on tier 1 if the tiers were applied strictly.

**What is done well**

- Theme-independent names: `cssNameOf` in `scripts/build-tokens.mjs` strips `themes.<theme>`, so `--fgColor-default` is the same name in both themes. This is exactly "themes swap values, not names".
- Semantic colour naming follows Primer's functional grammar: `{property}.{role}.{emphasis}` (`bgColor.danger.emphasis`, `borderColor.accent.muted`).
- `fgColor.*` carry machine-readable contrast pairs in `$extensions.tenet.contrast`, verified at build time (fails the build if a documented pair drops below 4.5:1 or 3:1). None of the four primary systems publish this as data.

**Gaps**

- **The tiers are not named anywhere.** Neither the source, the Tokens page, nor any guideline says "tier 1 / 2 / 3" or "raw / semantic / component". A teaching example should state the tier of every token.
- **The docs overstate tier discipline.** The Tokens page says "Components reference **semantic** tokens only", and the `base` blurb says "Components never use these directly" (`docs/scripts/generate-pages.mjs`). The CSS disagrees: 22 component stylesheets reference `--base-size-*` 86 times (icon boxes, avatar sizes, switch track), and `Switch.css:43` uses `--base-color-white`. `color.md` rule 1 (app code never uses `--base-color-*`) is still true for app code; the component claim is not.
- **No tier is machine-readable.** An MCP server or lint rule has to infer the tier from the group name. Primer and Spectrum document the tier per token.
- **Naming grammar is undocumented.** `fgColor`/`bgColor`/`borderColor` follow one grammar, the scales use numeric steps (`space.4`, `fontSize.2`), and the sizes use t-shirt steps (`control.medium.size`, `borderRadius.medium`). That is fine, but nothing explains it.

## 4. DTCG 2025.10 conformance: partial

Checked against the Format module (https://www.designtokens.org/tr/2025.10/format/) and Color module (https://www.designtokens.org/tr/2025.10/color/). 2025.10 changed several value formats from earlier drafts to structured objects; `tokens/tokens.json` uses the older string forms throughout.

| Requirement (2025.10) | Spec | tenet-ui | Status |
|---|---|---|---|
| `$value` / `$type` / `$description` | Format §5 | Used on every token. | done |
| Curly-brace aliases `{group.token}` | Format §7.1.1 | `{base.size.16}`, `{base.color.clay.600}`. Resolved with cycle detection. | done |
| Token names must not start with `$` or contain `{`, `}`, `.` | Format §5.1.1 | All names comply. | done |
| `$extensions` vendor data; reverse-domain key recommended | Format §5.2.3 | Key is `tenet`, not reverse-domain. Recommendation, not a requirement. | partial |
| **Color**: object `{ colorSpace, components, alpha?, hex? }` | Color §4.1 | Hex strings (`"#ffffff"`), and `rgba(...)` strings for the two backdrops and inside shadows. A plain hex string is not a valid 2025.10 colour value. | missing |
| **Dimension**: object `{ value: number, unit: "px" \| "rem" }` | Format §8.2 | Strings (`"16px"`). `letterSpacing.tag` is `"0.04em"`; `em` is not an allowed unit. | missing |
| **Number**: a JSON number | Format §8.7 | `lineHeight` values are strings (`"1.5"`). | missing |
| **fontWeight**: number 1 to 1000 or a named keyword | Format §8.4 | Strings (`"400"`). A numeric string is invalid. | missing |
| **fontFamily**: one name, or an array of names | Format §8.3 | One comma-separated string, which the spec reads as a single family name. | partial |
| **shadow**: object `{ color, offsetX, offsetY, blur, spread, inset? }` or an array of them | Format §9.6 | CSS shorthand strings. `shadow.focus` embeds `var(--bgColor-accent-muted)`, a CSS reference that no DTCG tool can resolve. | missing |
| `duration` / `cubicBezier` for motion | Format §8.5, §8.6 | No motion tokens (see §2). | missing |
| Themes | Resolver module | In-file `themes.light` / `themes.dark` groups. The 2025.10 Resolver module models this as a `theme` modifier with `light` and `dark` contexts in a separate `.resolver.json`. The Resolver is not required for Format conformance. | partial |
| File extension `.tokens` / `.tokens.json`, media type `application/design-tokens+json` | Format §4.1, §4.2 | `tokens.json`. Recommendation only. | partial |
| `$deprecated` on tokens and groups | Format §5.2.4 | Not used; no token is deprecated yet. Available for the future token-deprecation policy. | n/a |

**What this means.** The file is "DTCG-style": the structure, aliasing and metadata are right, the value formats predate 2025.10. A 2025.10-strict parser (for example a recent Style Dictionary or Tokens Studio import) would reject or misread the colour, dimension, number, fontWeight and shadow values.

**Why it is not a quick fix.** `scripts/build-tokens.mjs` writes `$value` straight into `dist/tokens.css` and `dist/tokens.json`. Object values would need a small serializer in the build script (object to CSS string) to keep `dist/` byte-identical. See the proposal for the trade-off.

## 5. Theming: partial

**Done**

- Light and dark themes, switched by `[data-color-mode]` on any ancestor; light also on `:root` so an unscoped app still gets colours (`dist/tokens.css`).
- Same 28 CSS variable names in both themes; only values change.
- Contrast pairs are verified per theme at build time.
- Storybook has a light / dark toolbar; `scripts/check-a11y.mjs` runs axe over every story in both themes.

**Gaps**

- **No theming page.** The mechanism is described in the README "Dark mode" section and one sentence on the Tokens page. The talk's key line, "themes swap values, not names", has no page to point at.
- **No OS-preference default.** `dist/tokens.css` has no `@media (prefers-color-scheme: dark)` block; the app must set the attribute itself. That is a valid choice (Spectrum's Provider defaults to the OS preference; tenet-ui leaves it to the app), but it is not stated. The docs site does follow the OS preference in `docs/src/components/overrides/Head.astro`.
- **No high-contrast theme and no forced-colors support.** Primer ships light and dark high-contrast themes; Fluent and Atlassian name high contrast; Spectrum says Windows high contrast mode "should be supported". tenet-ui has neither, and should say so rather than imply it.
- **No density modes.** Cloudscape and Primer have them. Not needed for the talk; worth listing as "not supported".

## 6. Patterns: partial

**Done.** Pattern-level guidance exists and is good: `forms.md` (field anatomy, validation timing), `feedback.md` (a decision table: Toast vs Banner vs inline vs Dialog), `data-display.md` (Table vs DataTable vs list vs Card), and the page skeleton in `layout.md`.

**Gaps**

- Not labelled or grouped as patterns (see §1).
- Patterns that the guidelines describe but no page owns: **empty states** (`content.md` rule 4 plus the `EmptyState` component), **destructive confirmation** (`content.md` rule 3 plus `Dialog`), **loading** (`Skeleton` / `Spinner` / `aria-busy`, spread across `accessibility.md` rule 12 and component guidelines).

## 7. Voice and tone: partial

**Done.** `guidelines/system/content.md` is a strong content guide: 15 numbered rules covering capitalisation, button labels, destructive actions, empty states, errors, success messages, help text, placeholders, dates, numbers, proper nouns, address ("you", never "we") and link text, plus do / don't. In the research's terms that is Spectrum's "Grammar and mechanics" and "Writing for errors" combined.

**Gaps**

- **Voice is one sentence** ("reads like a newsroom, not a dashboard"). There is no named set of voice attributes (for example plain, calm, exact) that stays constant.
- **Tone is implicit.** How the voice adjusts by situation (error, success, empty, destructive, onboarding) is spread over rules 3 to 7. Spectrum, Atlassian and Primer all have an explicit voice-and-tone section; a "tone by situation" table would make the voice / tone distinction teachable.
- **No inclusive-language guidance.** Spectrum ("Language and inclusivity") and Atlassian ("inclusive language") both have it.

## 8. Accessibility statement and WCAG level: partial

**Done**

- `guidelines/system/accessibility.md`: 15 rules and a keyboard contract per component family.
- Per-component `a11yReviewed` flag, shown as a badge on every component page.
- Automated checks: axe over every story in both themes (`scripts/check-a11y.mjs`), contrast pairs verified in the token build.
- Control sizes: the smallest control is 28px (`control.small.size`), above the WCAG 2.2 AA target-size minimum of 24px (SC 2.5.8).

**Gaps**

- **No stated conformance target.** The only WCAG mention is `color.md` ("passes WCAG AA"), with no version. Primer states "WCAG 2.2 AA"; Atlassian states AA (2.1 AA in its llms.txt). tenet-ui should name a target and say it is a target, not a certified conformance claim.
- **No accessibility statement page**: target, what the components guarantee, what app code must do, how it is tested, and known limitations.
- **Known limitations that a statement must list honestly:**
  - No forced-colors (Windows High Contrast) support. Field focus is `border-color` plus `box-shadow: var(--shadow-focus)` (`TextInput.css:16-18`, same pattern on the other fields); forced-colors mode removes box shadows and overrides border colours, so the field focus indicator is likely to disappear there. Not tested.
  - No RTL support.
  - Sizes are in px. Browser zoom scales them, so SC 1.4.4 (resize text) is met by zoom, but text does not follow a user's default font-size setting.
  - `Switch` slides its thumb (`transition: transform 0.16s`, `Switch.css:45`) with no `prefers-reduced-motion` rule. `accessibility.md` rule 7 is accurate (it lists the six components that do reduce motion), but the gap is not stated anywhere.

## 9. Component lifecycle labels: partial

**Done.** Every component has `status` in its `<Name>.meta.json`, carried into `generated/components.json`. Values in use: `stable` (40), `deprecated` (1). The docs show a status badge on every component page (`ComponentHeader.astro`), a sidebar badge for non-stable components, and a status column on the Components overview. Prop-level deprecation is also tracked.

**Gaps**

- **The vocabulary is not defined.** No page says what `stable` promises, or which other values exist. Primer defines Experimental / Ready / Deprecated with what each guarantees; Atlassian defines Early Access / Beta / GA plus Intent to Deprecate / Deprecated, and promises that no GA feature is removed without an announced deprecation period.
- **Only two of the usual states are in use.** The docs generator already handles any non-`stable` value with a "note" badge, so adding `experimental` later needs no code.

## 10. Deprecation policy, changelog and migration guides: partial

**Done**

- `CHANGELOG.md`: per-release Added / Changed / Deprecated sections; states SemVer and that pre-1.0 minors may break.
- `generated/deprecations.json`: machine-readable registry (kind, component, prop, replacement, message, `since`), shown on the Changelog page and enforced by the ESLint rule `no-deprecated-api`.
- The 0.4.0 deprecations say when removal happens: "keeps working until 0.5.0".

**Gaps**

- **No written deprecation policy.** How long a deprecation lasts, how it is announced (changelog, JSDoc `@deprecated`, registry, lint warning, docs badge), and when removal may land (next minor pre-1.0, next major after 1.0).
- **No migration guide.** The 0.4 to 0.5 path (`block` to `fullWidth` on five components, `Label` to `Tag`) exists only as registry messages. Spectrum, Cloudscape and Primer publish before / after migration pages.
- **No token change policy.** Cloudscape promises token names do not change within a minor. tenet-ui's token names are a public API (tenet-ui-mcp and the ESLint plugin read them) but nothing says so. DTCG `$deprecated` is the obvious mechanism.

## 11. Docs accuracy and house style: partial

- **Claims the code does not back up**: the two "components use only semantic tokens" sentences (§3). Everything else checked was accurate.
- **Em dashes in rendered content.** The rule for new content is no em dashes. Existing rendered content has them: 203 in per-component guidelines (`src/components/*/*.guidelines.md`), 11 in token `$description`s (shown in the Tokens table), 15 in strings emitted by `docs/scripts/generate-pages.mjs`, 9 in `CHANGELOG.md`, 1 in `generated/deprecations.json`. The system guidelines (`guidelines/system/`) have none.

---

## tenet-ui-mcp impact

What tenet-ui-mcp reads, and therefore what must not change shape without a coordinated update. From a read-only survey of `~/Developer/repos/tenet-ui-mcp` on 2026-10-17.

**Nothing in this repo reaches the MCP until a release.** tenet-ui-mcp never reads this repository. It ingests the **published npm tarball** (`src/ingest/tarball.ts`), plus `https://tenet-ui.pages.dev/llms.txt`, `llms-full.txt`, the Storybook `index.json` and the `baselines-v<ver>.tgz` release asset. It writes committed snapshots under `snapshots/<version>/`, and the server and tests read only those.

**The contract, by file in the tarball**

| File | What the MCP depends on | Safe changes | Breaking changes |
|---|---|---|---|
| `dist/tokens.json` | Per record: `name`, `cssVar`, `type`, `path[0]` as the group, `description`, `value` or `themed` + `light` + `dark` as **CSS strings**, `contrast`. Group names `fgColor`, `bgColor`, `borderColor`, `space`, `fontSize`, `borderRadius`, `borderWidth`, `fontWeight`, `lineHeight`, `shadow`, `fontFamily`, `letterSpacing`, `base` are hardcoded (`src/design/resolve.ts`). | New `extensions` data; new `description` text; new groups (colour tokens in a new group would compete in colour matching). | Object `value`s (DTCG 2025.10 colour or dimension objects) reaching `dist/`; renamed groups or tokens; a non-token key at the top level of `dist/tokens.json`; `type: null` on a colour. |
| `generated/components.json` | `id`, `name`, `status` (free string; `deprecated` lowers search rank), `a11yReviewed`, `importPath`, `subcomponents`, `stories`, `related`, `props[].deprecated`. | New fields (they are dropped); new `status` values such as `experimental`. | Renamed ids or names. |
| `generated/deprecations.json` | `kind`, `component`, `prop`, `replacement`, `message`, `since`. | New entries. | Shape changes. |
| `generated/guidelines/*.md`, `generated/guidelines/system/*.md` | Page id is the filename; title is the first `# ` heading; frontmatter `updated`, `related`. System ids `color`, `layout`, `typography`, `accessibility`, `iconography` are hardcoded; `feedback` and `data-display` are alias targets. Other subfolders are ignored. | **New** system pages (ingested as new `ds://.../guidelines/<id>` pages); edited text. | Renaming or moving a system page (dangling hints); **fewer** pages than the last release (ingest refuses without `--allow-fewer-guidelines`). |
| `CHANGELOG.md` | Headings matching `## [x.y.z] ... YYYY-MM-DD` (brackets optional, any text between). | Editing text, replacing the em dash in headings. | Dropping the version or date from a heading. |
| `llms.txt` on the docs site | Must exist at the site root. Hashed and line-counted only. | Any content change. | Removing it. |

**Docs page URLs are not referenced** by the MCP, so regrouping the docs sidebar is safe. System guideline **files** must stay in `guidelines/system/` with their current names.

**Existing MCP fragility, independent of this work.** Five tenet-ui-mcp tests fail on *any* new ingest, whatever it contains, because they pin `latest` to `0.4.0`: `store.test.ts:8-9`, `http.test.ts:136`, `catalog-tools.test.ts:42` and `:57-59`. The next tenet-ui release, even a docs-only patch, needs those assertions loosened. Worth knowing before any release ahead of the talk.
