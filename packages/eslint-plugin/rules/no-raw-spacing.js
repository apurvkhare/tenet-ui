import { getData, GUIDELINE, semanticRank } from '../lib/data.js';
import { isSpacingProp, spacingFamilyFor, parseDeclarations, findLengths, toPx, toCamel, isCssLikeKey } from '../lib/css.js';
import {
  isCssTaggedTemplate, styleAssignmentProp, resolveObjectLiteral, stringPartsOf, walkStyleObject, propertyKeyName,
  looksLikeStyleObject, STYLE_ATTRS,
} from '../lib/style-contexts.js';

const TAIL = ` Guideline: ${GUIDELINE.spacing.label}.`;
// Shorthands whose length is a border width (`border: 3px solid`).
const BORDER_SHORTHANDS = new Set(['border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderBlock', 'borderInline', 'outline']);
const isSizeProp = (p) => isSpacingProp(p) || BORDER_SHORTHANDS.has(toCamel(p));

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow raw px/rem/em (and unitless numeric) spacing and size values; use the 4px-scale tokens (--space-*, --control-*-size, --borderRadius-*, --fontSize-*).',
      url: GUIDELINE.spacing.url,
      recommended: true,
    },
    hasSuggestions: true,
    schema: [
      {
        type: 'object',
        properties: {
          allowScale: { type: 'boolean', description: 'Allow raw values that sit on the 4px scale (still off-token). Default false.' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      useToken: `Raw {{raw}} for \`{{prop}}\` is the value of {{token}} — use var({{token}}){{alternatives}}.${TAIL}`,
      offScale: `Raw {{raw}} for \`{{prop}}\` is off the 4px scale and matches no tenet-ui token; nearest is var({{token}}) = {{tokenValue}} ({{delta}}).${TAIL}`,
      noToken: `Raw {{raw}} for \`{{prop}}\` matches no tenet-ui token; nearest is var({{token}}) = {{tokenValue}} ({{delta}}).${TAIL}`,
      useTokenFix: 'Replace with var({{token}})',
    },
  },

  create(context) {
    const data = getData(context);
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    const options = context.options[0] || {};
    const allowScale = options.allowScale === true;
    const reported = new Set();
    const handledObjects = new WeakSet();

    const familyRank = (name, families) => {
      const i = families.findIndex((f) => name.startsWith(f));
      return (i === -1 ? 9 : i) * 10 + semanticRank(name);
    };

    function tokensFor(px, prop) {
      const families = spacingFamilyFor(prop);
      const inFamily = (name) => families.some((f) => name.startsWith(f));
      const exact = (data.byPx.get(px) || []).filter(inFamily).sort((a, b) => familyRank(a, families) - familyRank(b, families));
      if (exact.length) return { exact };
      // No token of a fitting family has this value (a fontSize token that happens to equal a padding
      // does not make the padding on-token). Point at the nearest token of the right family instead.
      const candidates = data.dimensionTokens.filter((t) => t.px < 1000 && inFamily(t.name));
      const pool = candidates.length ? candidates : data.dimensionTokens.filter((t) => t.px < 1000);
      let best = null;
      for (const t of pool) {
        const d = Math.abs(t.px - px);
        if (!best || d < best.d || (d === best.d && familyRank(t.name, families) < familyRank(best.t.name, families))) best = { t, d };
      }
      return { nearest: best ? best.t : null };
    }

    function reportLength({ raw, px: signedPx, prop, start, end, loc, replaceRange }) {
      const key = `${start}:${raw}`;
      if (reported.has(key)) return;
      reported.add(key);
      // Negative offsets (`marginTop: -12`) are matched on magnitude and suggested as calc(-1 * var(--x)).
      const px = Math.abs(signedPx);
      const asVar = (n) => (signedPx < 0 ? `calc(-1 * var(--${n}))` : `var(--${n})`);
      const onScale = px % 4 === 0;
      if (onScale && allowScale) return;
      const { exact, nearest } = tokensFor(px, prop);
      if (exact) {
        const [first, ...rest] = exact.map((n) => `--${n}`);
        context.report({
          loc,
          messageId: 'useToken',
          data: { raw, prop, token: first, alternatives: rest.length ? ` (or ${rest.slice(0, 2).join(', ')})` : '' },
          suggest: replaceRange
            ? exact.slice(0, 3).map((n) => ({
                messageId: 'useTokenFix',
                data: { token: `--${n}` },
                fix: (fixer) => fixer.replaceTextRange(replaceRange.range, replaceRange.wrap(asVar(n))),
              }))
            : [],
        });
        return;
      }
      const delta = nearest ? `${px - nearest.px > 0 ? '+' : ''}${px - nearest.px}px` : '';
      context.report({
        loc,
        messageId: onScale ? 'noToken' : 'offScale',
        data: { raw, prop, token: nearest ? `--${nearest.name}` : '--space-*', tokenValue: nearest ? `${nearest.px}px` : '', delta },
      });
    }

    function checkLengthsInText(part, prop) {
      for (const len of findLengths(part.text)) {
        if (len.n === 0) continue;
        if (len.unit === 'px' && (len.n === 1 || len.n === 2)) continue; // hairlines
        const px = toPx(len.n, len.unit);
        const hasOffset = part.offset != null;
        const start = hasOffset ? part.offset + len.index : part.node.range[0];
        const end = hasOffset ? start + len.raw.length : part.node.range[1];
        reportLength({
          raw: len.raw,
          px,
          prop,
          start,
          end,
          loc: hasOffset ? { start: sourceCode.getLocFromIndex(start), end: sourceCode.getLocFromIndex(end) } : part.node.loc,
          replaceRange: hasOffset ? { range: [start, end], wrap: (s) => s } : null,
        });
      }
    }

    function checkValue(valueNode, prop) {
      for (const part of stringPartsOf(valueNode, sourceCode)) {
        if (part.kind === 'number') {
          const n = part.number;
          if (n === 0 || n === 1 || n === 2) continue;
          // Unitless numbers are px in React style objects, except for borderRadius/fontSize-less props like flexBasis? Treat all as px.
          reportLength({
            raw: String(n),
            px: n,
            prop,
            start: part.node.range[0],
            end: part.node.range[1],
            loc: part.node.loc,
            replaceRange: { range: part.node.range, wrap: (s) => `'${s}'` },
          });
          continue;
        }
        checkLengthsInText(part, prop);
      }
    }

    function checkStyleObject(obj) {
      if (!obj || handledObjects.has(obj)) return;
      handledObjects.add(obj);
      walkStyleObject(obj, (key, valueNode) => {
        if (key && isSizeProp(key)) checkValue(valueNode, key);
      });
    }

    function checkCssText(part) {
      for (const decl of parseDeclarations(part.text)) {
        if (!isSizeProp(decl.prop)) continue;
        const sub = { ...part, text: decl.value, offset: part.offset != null ? part.offset + decl.valueIndex : null };
        checkLengthsInText(sub, decl.prop);
      }
    }

    return {
      JSXAttribute(node) {
        if (node.name.type !== 'JSXIdentifier' || !STYLE_ATTRS.has(node.name.name) || !node.value) return;
        if (node.value.type === 'Literal') {
          for (const part of stringPartsOf(node.value, sourceCode)) checkCssText(part);
          return;
        }
        if (node.value.type !== 'JSXExpressionContainer') return;
        const obj = resolveObjectLiteral(context, node.value.expression);
        if (obj) checkStyleObject(obj);
      },
      // Bare object literals that look like styles; `{ width: 320, height: 200 }` alone is data (see looksLikeStyleObject).
      ObjectExpression(node) {
        if (handledObjects.has(node) || !looksLikeStyleObject(node, isCssLikeKey)) return;
        for (const p of node.properties) {
          if (p.type !== 'Property') continue;
          const key = propertyKeyName(p);
          if (key && isSizeProp(key)) checkValue(p.value, key);
        }
      },
      TaggedTemplateExpression(node) {
        if (!isCssTaggedTemplate(node)) return;
        for (const part of stringPartsOf(node.quasi, sourceCode)) checkCssText(part);
      },
      AssignmentExpression(node) {
        const prop = styleAssignmentProp(node);
        if (prop && isSizeProp(prop)) checkValue(node.right, prop);
      },
    };
  },
};
