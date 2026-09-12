// CSS property tables + tiny declaration parser for css`` template literals.
const SPACING_PROPS_CAMEL = [
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginBlock', 'marginBlockStart', 'marginBlockEnd',
  'marginInline', 'marginInlineStart', 'marginInlineEnd',
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingBlock', 'paddingBlockStart',
  'paddingBlockEnd', 'paddingInline', 'paddingInlineStart', 'paddingInlineEnd',
  'gap', 'rowGap', 'columnGap', 'gridGap', 'gridRowGap', 'gridColumnGap',
  'top', 'right', 'bottom', 'left', 'inset', 'insetBlock', 'insetBlockStart', 'insetBlockEnd', 'insetInline',
  'insetInlineStart', 'insetInlineEnd',
  'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'inlineSize', 'blockSize', 'minInlineSize',
  'minBlockSize', 'maxInlineSize', 'maxBlockSize', 'flexBasis',
  'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
  'borderStartStartRadius', 'borderStartEndRadius', 'borderEndStartRadius', 'borderEndEndRadius',
  'fontSize',
  'borderWidth', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'outlineWidth', 'outlineOffset',
];
export const toCamel = (p) => String(p).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
export const toKebab = (p) => String(p).replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
export const SPACING_PROPS = new Set(SPACING_PROPS_CAMEL);
export const isSpacingProp = (p) => SPACING_PROPS.has(toCamel(p));

/** Which token family fits a spacing/size property best (semantic first, base last). */
export function spacingFamilyFor(prop) {
  const p = toCamel(prop);
  if (/^fontSize$/.test(p)) return ['fontSize-', 'base-size-'];
  if (/Radius$/.test(p)) return ['borderRadius-'];
  if (/^(border|outline).*Width$|^outlineOffset$/.test(p)) return ['borderWidth-'];
  if (/^(border|outline)(Top|Right|Bottom|Left|Block|Inline)?$/.test(p)) return ['borderWidth-']; // `border: 3px solid`
  if (/^(min|max)?(Width|Height|width|height|inlineSize|blockSize|InlineSize|BlockSize|flexBasis)/.test(p)) return ['control-', 'space-', 'base-size-'];
  return ['space-', 'base-size-']; // margin / padding / gap / inset
}

const COLOR_PROPS = new Set([
  'color', 'background', 'backgroundColor', 'backgroundImage', 'border', 'borderColor', 'borderTop', 'borderRight',
  'borderBottom', 'borderLeft', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
  'borderBlockColor', 'borderInlineColor', 'outline', 'outlineColor', 'boxShadow', 'textShadow', 'fill', 'stroke',
  'caretColor', 'accentColor', 'textDecorationColor', 'textEmphasisColor', 'columnRuleColor', 'columnRule',
]);
export const isColorProp = (p) => COLOR_PROPS.has(toCamel(p));

/** Any key that is plausibly a CSS property (camelCase or kebab-case, or a `--custom` property). */
export const isCssLikeKey = (k) => isColorProp(k) || isSpacingProp(k) || /^--/.test(k);

/**
 * Parse `prop: value;` declarations out of a css template quasi (or any CSS-ish string).
 * Returns [{ prop, value, valueIndex }] with valueIndex relative to `text`.
 * Interpolation boundaries are not visible here; callers pass one quasi at a time.
 */
export function parseDeclarations(text) {
  const out = [];
  const re = /(^|[;{\s])(-{0,2}[a-zA-Z][\w-]*)\s*:\s*([^;{}]+?)(?=\s*(?:[;}]|$))/gm;
  for (const m of text.matchAll(re)) {
    const prop = m[2];
    // Skip pseudo selectors like `&:hover` / `a:focus` (preceded by a non-space char) and URLs.
    if (/^https?$/.test(prop)) continue;
    const valueIndex = m.index + m[0].length - m[3].length;
    out.push({ prop, value: m[3], valueIndex });
  }
  return out;
}

const LENGTH = /(?<![\w.-])(-?\d*\.?\d+)(px|rem|em)(?![\w%])/g;
/** Find length literals (`12px`, `.5rem`) in a value string. */
export function findLengths(value) {
  return [...value.matchAll(LENGTH)].map((m) => ({ raw: m[0], index: m.index, n: parseFloat(m[1]), unit: m[2] }));
}

export const toPx = (n, unit) => (unit === 'px' ? n : n * 16);
