// Tracks what a file imports from 'tenet-ui' and resolves JSX element names back to
// the tenet-ui component name (handles aliases, namespaces and member expressions).
const TENET_SOURCES = new Set(['tenet-ui', 'tenet-ui/dist/index.js', 'tenet-ui/dist/index.cjs']);
export const isTenetSource = (s) => TENET_SOURCES.has(s);

export function createImportTracker() {
  const named = new Map(); // local -> imported component name
  const namespaces = new Set(); // local names of `import * as T` / default imports

  return {
    /** Call on ImportDeclaration. */
    visitImport(node) {
      if (!isTenetSource(node.source.value)) return;
      for (const spec of node.specifiers) {
        if (spec.type === 'ImportSpecifier') {
          const imported = spec.imported.type === 'Identifier' ? spec.imported.name : String(spec.imported.value);
          named.set(spec.local.name, imported);
        } else if (spec.type === 'ImportNamespaceSpecifier' || spec.type === 'ImportDefaultSpecifier') {
          namespaces.add(spec.local.name);
        }
      }
    },
    /** Call on VariableDeclarator: `const { Button: B } = require('tenet-ui')`. */
    visitDeclarator(node) {
      const init = node.init;
      if (!init || init.type !== 'CallExpression' || init.callee.type !== 'Identifier' || init.callee.name !== 'require') return;
      const arg = init.arguments[0];
      if (!arg || arg.type !== 'Literal' || !isTenetSource(arg.value)) return;
      if (node.id.type === 'Identifier') namespaces.add(node.id.name);
      else if (node.id.type === 'ObjectPattern') {
        for (const p of node.id.properties) {
          if (p.type === 'Property' && p.key.type === 'Identifier' && p.value.type === 'Identifier') named.set(p.value.name, p.key.name);
        }
      }
    },
    /**
     * Resolve a JSX element name node to the tenet-ui component name, e.g.
     * `<B>` (import { Button as B }) -> 'Button'; `<FormControl.Label>` -> 'FormControl.Label';
     * `<T.Button>` (import * as T) -> 'Button'. Returns null when not from tenet-ui.
     */
    resolveJsxName(nameNode) {
      const parts = [];
      let cur = nameNode;
      while (cur && cur.type === 'JSXMemberExpression') {
        parts.unshift(cur.property.name);
        cur = cur.object;
      }
      if (!cur || cur.type !== 'JSXIdentifier') return null;
      const root = cur.name;
      if (named.has(root)) return [named.get(root), ...parts].join('.');
      if (namespaces.has(root) && parts.length) return parts.join('.');
      return null;
    },
    importedNameOf(local) {
      return named.get(local) ?? null;
    },
    hasAny() {
      return named.size > 0 || namespaces.size > 0;
    },
  };
}
