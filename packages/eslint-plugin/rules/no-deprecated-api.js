import { getData, GUIDELINE } from '../lib/data.js';
import { createImportTracker } from '../lib/imports.js';

const TAIL = ` Guideline: ${GUIDELINE.migration.label}.`;
const IDENT = /^[A-Za-z_$][\w$]*$/;

function replacementText(d) {
  return d.replacement ? `; use \`${d.replacement}\`` : '';
}
function detail(d) {
  return d.message ? ` ${String(d.message).replace(/\s+/g, ' ').trim()}` : '';
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow deprecated tenet-ui props and components, using the deprecation registry of the installed version; renames are autofixed.',
      url: GUIDELINE.migration.url,
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      prop: `\`{{prop}}\` on <{{component}}> is deprecated since tenet-ui {{since}}{{replacement}}.{{detail}}${TAIL}`,
      componentImport: `<{{component}}> is deprecated since tenet-ui {{since}}{{replacement}}.{{detail}}${TAIL}`,
      componentUse: `<{{component}}> is deprecated since tenet-ui {{since}}{{replacement}}.{{detail}}${TAIL}`,
    },
  },

  create(context) {
    const data = getData(context);
    if (data.deprecatedProps.size === 0 && data.deprecatedComponents.size === 0) return {};
    const tracker = createImportTracker();

    const dataFor = (d, extra = {}) => ({
      component: d.component,
      since: d.since || '?',
      replacement: replacementText(d),
      detail: detail(d),
      ...extra,
    });

    return {
      ImportDeclaration(node) {
        tracker.visitImport(node);
        if (node.source.value !== 'tenet-ui') return;
        for (const spec of node.specifiers) {
          if (spec.type !== 'ImportSpecifier') continue;
          const imported = spec.imported.type === 'Identifier' ? spec.imported.name : String(spec.imported.value);
          const d = data.deprecatedComponents.get(imported);
          if (d) context.report({ node: spec, messageId: 'componentImport', data: dataFor(d) });
        }
      },
      VariableDeclarator(node) {
        tracker.visitDeclarator(node);
      },
      JSXOpeningElement(node) {
        const name = tracker.resolveJsxName(node.name);
        if (!name) return;

        const dc = data.deprecatedComponents.get(name);
        if (dc) context.report({ node: node.name, messageId: 'componentUse', data: dataFor(dc) });

        const present = new Set();
        for (const a of node.attributes) if (a.type === 'JSXAttribute' && a.name.type === 'JSXIdentifier') present.add(a.name.name);

        for (const attr of node.attributes) {
          if (attr.type !== 'JSXAttribute' || attr.name.type !== 'JSXIdentifier') continue;
          const prop = attr.name.name;
          const d = data.deprecatedProps.get(`${name}.${prop}`);
          if (!d) continue;
          const canFix = d.replacement && IDENT.test(d.replacement) && !present.has(d.replacement);
          context.report({
            node: attr.name,
            messageId: 'prop',
            data: dataFor(d, { prop }),
            fix: canFix ? (fixer) => fixer.replaceText(attr.name, d.replacement) : null,
          });
        }
      },
    };
  },
};
