import { getData, GUIDELINE } from '../lib/data.js';
import { findColors, colorFamilyFor, normalizeColor } from '../lib/colors.js';
import { isColorProp, isCssLikeKey } from '../lib/css.js';
import {
  isCssTaggedTemplate, styleAssignmentProp, setPropertyCall, resolveObjectLiteral, stringPartsOf, walkStyleObject, propertyKeyName,
  looksLikeStyleObject, STYLE_ATTRS,
} from '../lib/style-contexts.js';

const TAIL = ` Guideline: ${GUIDELINE.color.label}.`;

/** Nearest `prop:` before `index` inside a CSS-ish string, or null. */
function propertyAt(text, index) {
  const before = text.slice(0, index);
  const cut = Math.max(before.lastIndexOf(';'), before.lastIndexOf('{'), before.lastIndexOf('}'));
  const m = /(-{0,2}[a-zA-Z][\w-]*)\s*:\s*[^:]*$/.exec(before.slice(cut + 1));
  return m ? m[1] : null;
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow raw colours (hex, rgb()/hsl(), named) in styles; colours must come from tenet-ui colour tokens so light and dark themes both work.',
      url: GUIDELINE.color.url,
      recommended: true,
    },
    hasSuggestions: true,
    schema: [
      {
        type: 'object',
        properties: {
          exceptions: { type: 'array', items: { type: 'string' }, description: 'Literal colour values that are allowed as-is.' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      exact: `Raw colour {{raw}} is the value of {{token}} — use var({{token}}){{alternatives}} so it follows the theme.${TAIL}`,
      family: `Raw colour {{raw}} — no tenet-ui token has this value; pick a {{family}} token (e.g. var({{example}})).${TAIL}`,
      generic: `Raw colour {{raw}} — use a --fgColor-*/--bgColor-*/--borderColor-* token.${TAIL}`,
      useToken: 'Replace with var({{token}})',
    },
  },

  create(context) {
    const data = getData(context);
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    const options = context.options[0] || {};
    const exceptions = new Set((options.exceptions || []).map((v) => normalizeColor(v)));
    const reported = new Set();
    const handledObjects = new WeakSet();

    const exampleFor = (family) => {
      const t = data.tokens.find((x) => x.name.startsWith(`${family}-`));
      return t ? t.cssVar : `--${family}-default`;
    };

    function report(part, color, prop) {
      if (exceptions.has(color.key) || exceptions.has(normalizeColor(color.raw))) return;
      const hasOffset = part.offset != null;
      const start = hasOffset ? part.offset + color.index : part.node.range[0];
      const end = hasOffset ? start + color.raw.length : part.node.range[1];
      const dedupeKey = `${start}:${color.raw}`;
      if (reported.has(dedupeKey)) return;
      reported.add(dedupeKey);

      const family = colorFamilyFor(prop);
      const familyFirst = (a, b) => Number(!a.startsWith(`${family}-`)) - Number(!b.startsWith(`${family}-`));
      const matches = (data.byColor.get(color.key) || []).slice().sort(family ? familyFirst : () => 0);
      const loc = hasOffset
        ? { start: sourceCode.getLocFromIndex(start), end: sourceCode.getLocFromIndex(end) }
        : part.node.loc;

      if (matches.length) {
        const [first, ...rest] = matches.map((n) => `--${n}`);
        context.report({
          loc,
          messageId: 'exact',
          data: { raw: color.raw, token: first, alternatives: rest.length ? ` (or ${rest.slice(0, 2).join(', ')})` : '' },
          suggest: hasOffset
            ? matches.slice(0, 3).map((n) => ({
                messageId: 'useToken',
                data: { token: `--${n}` },
                fix: (fixer) => fixer.replaceTextRange([start, end], `var(--${n})`),
              }))
            : [],
        });
        return;
      }
      if (family) {
        context.report({ loc, messageId: 'family', data: { raw: color.raw, family: `--${family}-*`, example: exampleFor(family) } });
      } else {
        context.report({ loc, messageId: 'generic', data: { raw: color.raw } });
      }
    }

    function checkText(part, prop, { inferProp = false } = {}) {
      for (const color of findColors(part.text)) {
        const p = prop ?? (inferProp ? propertyAt(part.text, color.index) : null);
        report(part, color, p);
      }
    }

    function checkValue(valueNode, prop) {
      for (const part of stringPartsOf(valueNode, sourceCode)) {
        if (part.kind === 'number') continue;
        checkText(part, prop, { inferProp: /^--/.test(prop || '') || prop == null });
      }
    }

    function checkStyleObject(obj) {
      if (!obj || handledObjects.has(obj)) return;
      handledObjects.add(obj);
      walkStyleObject(obj, (key, valueNode) => checkValue(valueNode, key));
    }

    return {
      // <div style={{ color: '#fff' }}> and <div style={styles}> where styles is an object literal.
      JSXAttribute(node) {
        if (node.name.type !== 'JSXIdentifier' || !STYLE_ATTRS.has(node.name.name) || !node.value) return;
        if (node.value.type === 'Literal') {
          // style="color: #fff" (string style attributes)
          for (const part of stringPartsOf(node.value, sourceCode)) checkText(part, null, { inferProp: true });
          return;
        }
        if (node.value.type !== 'JSXExpressionContainer') return;
        const obj = resolveObjectLiteral(context, node.value.expression);
        if (obj) checkStyleObject(obj);
      },

      // Object literals that look like styles (theme objects, css({ ... })): colour-bearing keys only.
      // A lone `color` key next to non-CSS keys is data (a chart series), not a style — see looksLikeStyleObject.
      ObjectExpression(node) {
        if (handledObjects.has(node) || !looksLikeStyleObject(node, isCssLikeKey)) return;
        for (const p of node.properties) {
          if (p.type !== 'Property') continue;
          const key = propertyKeyName(p);
          if (!key) continue;
          if (isColorProp(key) || /^--/.test(key)) checkValue(p.value, key);
        }
      },

      // css`...`, styled.div`...`, keyframes`...`
      TaggedTemplateExpression(node) {
        if (!isCssTaggedTemplate(node)) return;
        for (const part of stringPartsOf(node.quasi, sourceCode)) checkText(part, null, { inferProp: true });
      },

      // el.style.color = '#fff'
      AssignmentExpression(node) {
        const prop = styleAssignmentProp(node);
        if (prop) checkValue(node.right, prop);
      },

      // el.style.setProperty('--accent', '#fff')
      CallExpression(node) {
        const sp = setPropertyCall(node);
        if (sp) checkValue(sp.valueNode, sp.prop);
      },

      // Custom property assignments inside plain strings: '--accent: #c2502e'
      Literal(node) {
        if (typeof node.value !== 'string' || !/--[\w-]+\s*:/.test(node.value)) return;
        for (const part of stringPartsOf(node, sourceCode)) checkText(part, null, { inferProp: true });
      },
      TemplateLiteral(node) {
        if (node.parent && node.parent.type === 'TaggedTemplateExpression') return;
        if (!node.quasis.some((q) => /--[\w-]+\s*:/.test(q.value.raw))) return;
        for (const part of stringPartsOf(node, sourceCode)) checkText(part, null, { inferProp: true });
      },
    };
  },
};
