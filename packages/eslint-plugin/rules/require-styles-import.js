import { relative, isAbsolute } from 'node:path';
import { GUIDELINE } from '../lib/data.js';
import { matchesAny } from '../lib/glob.js';

const TAIL = ` Guideline: ${GUIDELINE.gettingStarted.label}.`;
export const DEFAULT_ENTRY = ['**/main.{tsx,jsx,ts,js}', '**/index.{tsx,jsx}', '**/App.{tsx,jsx}', '**/root.{tsx,jsx}'];
const STYLE_SPECS = new Set(['tenet-ui/styles.css', 'tenet-ui/dist/styles.css']);

export default {
  meta: {
    type: 'problem',
    docs: {
      description: "Require the app entry file to import 'tenet-ui/styles.css' — without it every var(--token) is undefined and the UI renders unstyled.",
      url: GUIDELINE.gettingStarted.url,
      recommended: true,
    },
    hasSuggestions: true,
    schema: [
      {
        type: 'object',
        properties: {
          entry: { type: 'array', items: { type: 'string' }, description: 'Globs for entry files that must import the stylesheet.' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missing: `Entry file does not import 'tenet-ui/styles.css'. The stylesheet defines every --token (light and dark) and the component styles; without it var(--token) resolves to nothing and tenet-ui renders unstyled. Add \`import 'tenet-ui/styles.css';\` once, in the app entry.${TAIL}`,
      addImport: "Add import 'tenet-ui/styles.css'",
    },
  },

  create(context) {
    const entry = (context.options[0] || {}).entry || DEFAULT_ENTRY;
    const filename = context.filename ?? context.getFilename();
    if (!filename || filename === '<input>' || filename === '<text>') return {};
    // ESLint hands rules absolute paths; let `entry` be written relative to the project root too.
    const cwd = context.cwd ?? process.cwd();
    const rel = isAbsolute(filename) ? relative(cwd, filename) : filename;
    if (!matchesAny(filename, entry) && !matchesAny(rel, entry)) return {};

    let found = false;
    let lastImport = null;
    const isStyles = (v) => typeof v === 'string' && STYLE_SPECS.has(v);

    return {
      ImportDeclaration(node) {
        lastImport = node;
        if (isStyles(node.source.value)) found = true;
      },
      ImportExpression(node) {
        if (node.source.type === 'Literal' && isStyles(node.source.value)) found = true;
      },
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'require' && node.arguments[0]?.type === 'Literal' && isStyles(node.arguments[0].value)) found = true;
      },
      'Program:exit'(node) {
        if (found) return;
        context.report({
          node,
          loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 0 } },
          messageId: 'missing',
          suggest: [
            {
              messageId: 'addImport',
              fix: (fixer) =>
                lastImport
                  ? fixer.insertTextAfter(lastImport, "\nimport 'tenet-ui/styles.css';")
                  : fixer.insertTextBeforeRange([0, 0], "import 'tenet-ui/styles.css';\n"),
            },
          ],
        });
      },
    };
  },
};
