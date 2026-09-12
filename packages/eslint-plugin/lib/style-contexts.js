// Shared discovery of "places where CSS values live" in a JS/TSX AST:
//  - JSX `style={{ ... }}` objects (inline, or via an identifier bound to an object literal)
//  - object literal properties whose key is a CSS property (theme / sx / css({}) objects)
//  - css`` / styled.x`` / keyframes`` / createGlobalStyle`` tagged templates
//  - `el.style.color = '...'` assignments
//  - string literals that assign a CSS custom property (`--foo: #fff`)
const CSS_TAGS = new Set(['css', 'styled', 'keyframes', 'createGlobalStyle', 'injectGlobal', 'sx', 'cx']);

export function isCssTaggedTemplate(node) {
  const tag = node.tag;
  if (!tag) return false;
  if (tag.type === 'Identifier') return CSS_TAGS.has(tag.name);
  // styled.div`...`, styled(Button)`...`, styled.div.attrs(...)`...`, css.global`...`
  if (tag.type === 'MemberExpression') {
    const root = rootIdentifier(tag);
    return root ? CSS_TAGS.has(root) : false;
  }
  if (tag.type === 'CallExpression') {
    const root = rootIdentifier(tag.callee);
    return root ? CSS_TAGS.has(root) : false;
  }
  return false;
}

function rootIdentifier(node) {
  let cur = node;
  while (cur) {
    if (cur.type === 'Identifier') return cur.name;
    if (cur.type === 'MemberExpression') cur = cur.object;
    else if (cur.type === 'CallExpression') cur = cur.callee;
    else return null;
  }
  return null;
}

/** `el.style.color = ...` / `el.style['color'] = ...`  → 'color' or null */
export function styleAssignmentProp(assignNode) {
  const left = assignNode.left;
  if (!left || left.type !== 'MemberExpression') return null;
  const obj = left.object;
  if (!obj || obj.type !== 'MemberExpression') return null;
  const isStyle = (obj.property.type === 'Identifier' && !obj.computed && obj.property.name === 'style')
    || (obj.computed && obj.property.type === 'Literal' && obj.property.value === 'style');
  if (!isStyle) return null;
  if (!left.computed && left.property.type === 'Identifier') return left.property.name;
  if (left.computed && left.property.type === 'Literal') return String(left.property.value);
  return null;
}

/** `el.style.setProperty('--x', '#fff')` → the value node, or null */
export function setPropertyCall(callNode) {
  const c = callNode.callee;
  if (!c || c.type !== 'MemberExpression' || c.computed || c.property.name !== 'setProperty') return null;
  const obj = c.object;
  if (!obj || obj.type !== 'MemberExpression' || obj.computed || obj.property.name !== 'style') return null;
  const [nameArg, valueArg] = callNode.arguments;
  if (!valueArg) return null;
  const prop = nameArg && nameArg.type === 'Literal' ? String(nameArg.value) : null;
  return { prop, valueNode: valueArg };
}

export function propertyKeyName(prop) {
  if (prop.type !== 'Property') return null;
  if (!prop.computed && prop.key.type === 'Identifier') return prop.key.name;
  if (prop.key.type === 'Literal') return String(prop.key.value);
  return null;
}

/** Resolve an Identifier to its `const x = {...}` object literal initialiser, if any. */
export function resolveObjectLiteral(context, node) {
  if (!node) return null;
  if (node.type === 'ObjectExpression') return node;
  if (node.type === 'TSAsExpression' || node.type === 'TSSatisfiesExpression') return resolveObjectLiteral(context, node.expression);
  if (node.type !== 'Identifier') return null;
  const scope = context.sourceCode.getScope(node);
  let s = scope;
  while (s) {
    const v = s.set.get(node.name);
    if (v) {
      const def = v.defs[0];
      if (def && def.type === 'Variable' && def.node.init) {
        const init = def.node.init;
        if (init.type === 'ObjectExpression') return init;
        if ((init.type === 'TSAsExpression' || init.type === 'TSSatisfiesExpression') && init.expression.type === 'ObjectExpression') return init.expression;
      }
      return null;
    }
    s = s.upper;
  }
  return null;
}

/**
 * Iterate the string-bearing value nodes of a style value node:
 * Literal strings, template quasis, and (for conditional/logical expressions) each branch.
 * Yields { node, text, offset } where offset is the index in the source where `text` starts.
 */
export function* stringPartsOf(node, sourceCode) {
  if (!node) return;
  switch (node.type) {
    case 'Literal':
      if (typeof node.value === 'string') {
        const raw = sourceCode.getText(node);
        // Only map back into source when the raw text contains the value verbatim (no escapes).
        const at = raw.indexOf(node.value);
        yield { node, text: node.value, offset: at >= 0 ? node.range[0] + at : null, kind: 'string' };
      } else if (typeof node.value === 'number') {
        yield { node, text: String(node.value), offset: node.range[0], kind: 'number', number: node.value };
      }
      return;
    case 'TemplateLiteral':
      for (const q of node.quasis) yield { node: q, text: q.value.raw, offset: q.range[0] + 1, kind: 'quasi' };
      return;
    case 'JSXExpressionContainer':
      yield* stringPartsOf(node.expression, sourceCode);
      return;
    case 'ConditionalExpression':
      yield* stringPartsOf(node.consequent, sourceCode);
      yield* stringPartsOf(node.alternate, sourceCode);
      return;
    case 'LogicalExpression':
      yield* stringPartsOf(node.left, sourceCode);
      yield* stringPartsOf(node.right, sourceCode);
      return;
    case 'TSAsExpression':
    case 'TSSatisfiesExpression':
    case 'TSNonNullExpression':
      yield* stringPartsOf(node.expression, sourceCode);
      return;
    case 'UnaryExpression':
      if (node.operator === '-' && node.argument.type === 'Literal' && typeof node.argument.value === 'number') {
        yield { node, text: `-${node.argument.value}`, offset: node.range[0], kind: 'number', number: -node.argument.value };
      }
      return;
    default:
      return;
  }
}

/**
 * Walk the properties of an object literal (recursing into nested objects, e.g.
 * `{ '&:hover': { color: '#fff' } }`) and call `visit(propName, valueNode)`.
 */
export function walkStyleObject(obj, visit, depth = 0) {
  if (!obj || obj.type !== 'ObjectExpression' || depth > 4) return;
  for (const p of obj.properties) {
    if (p.type !== 'Property') continue;
    const key = propertyKeyName(p);
    if (p.value.type === 'ObjectExpression') {
      walkStyleObject(p.value, visit, depth + 1);
      continue;
    }
    visit(key, p.value, p);
  }
}

/** JSX attributes whose value is a style object. */
export const STYLE_ATTRS = new Set(['style', 'sx', 'css']);

// Keys that are plausibly non-CSS data (image dims, popover position, chart series colour).
const AMBIGUOUS_KEYS = new Set([
  'color', 'fill', 'stroke', 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
  'top', 'right', 'bottom', 'left', 'inlineSize', 'blockSize', 'flexBasis',
]);

/**
 * Does a bare object literal (not reached via style={...}) look like a style object?
 * Yes when it has an unambiguous CSS key (padding, margin, gap, borderRadius, fontSize, background,
 * a --custom property, a kebab-case property, a nested selector) or at least three CSS-like keys.
 * `{ name: 'Sales', color: '#c2502e' }` and `{ width: 320, height: 200 }` are data, not styles.
 */
export function looksLikeStyleObject(obj, isCssLikeKey) {
  if (!obj || obj.type !== 'ObjectExpression') return false;
  let cssLike = 0;
  for (const p of obj.properties) {
    if (p.type !== 'Property') continue;
    const key = propertyKeyName(p);
    if (!key) continue;
    if (/^--/.test(key) || /^[&@:]/.test(key) || (/-/.test(key) && isCssLikeKey(key))) return true;
    if (isCssLikeKey(key)) {
      if (!AMBIGUOUS_KEYS.has(key)) return true;
      cssLike += 1;
    }
  }
  return cssLike >= 3;
}
