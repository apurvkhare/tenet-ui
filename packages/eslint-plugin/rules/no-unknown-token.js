import { getData, GUIDELINE } from '../lib/data.js';

const TAIL = ` Guideline: ${GUIDELINE.tokens.label}.`;
const VAR_REF = /var\(\s*(--[\w-]+)/g;

function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow var(--x) references to CSS custom properties that are not tenet-ui tokens.',
      url: GUIDELINE.tokens.url,
      recommended: true,
    },
    hasSuggestions: true,
    schema: [],
    messages: {
      unknown: `Unknown token {{name}} — not a tenet-ui token{{hint}}.${TAIL}`,
      useToken: 'Replace with {{token}}',
    },
  },

  create(context) {
    const data = getData(context);
    if (!data.cssVars.size) return {};
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    const vars = [...data.cssVars];

    function nearest(name) {
      let best = null;
      for (const v of vars) {
        const d = levenshtein(name, v);
        if (!best || d < best.d) best = { v, d };
      }
      return best && best.d <= Math.max(3, Math.floor(name.length / 4)) ? best.v : null;
    }

    function check(text, baseOffset, node) {
      for (const m of text.matchAll(VAR_REF)) {
        const name = m[1];
        if (data.cssVars.has(name)) continue;
        const start = baseOffset != null ? baseOffset + m.index + m[0].indexOf(name) : null;
        const end = start != null ? start + name.length : null;
        const near = nearest(name);
        context.report({
          loc: start != null ? { start: sourceCode.getLocFromIndex(start), end: sourceCode.getLocFromIndex(end) } : node.loc,
          messageId: 'unknown',
          data: { name, hint: near ? `; did you mean ${near}?` : '' },
          suggest: near && start != null
            ? [{ messageId: 'useToken', data: { token: near }, fix: (fixer) => fixer.replaceTextRange([start, end], near) }]
            : [],
        });
      }
    }

    return {
      Literal(node) {
        if (typeof node.value !== 'string' || !node.value.includes('var(')) return;
        const raw = sourceCode.getText(node);
        const at = raw.indexOf(node.value);
        check(node.value, at >= 0 ? node.range[0] + at : null, node);
      },
      TemplateElement(node) {
        if (!node.value.raw.includes('var(')) return;
        check(node.value.raw, node.range[0] + 1, node);
      },
    };
  },
};
