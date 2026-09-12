import { getData, GUIDELINE } from '../lib/data.js';

const TAIL = ` Guideline: ${GUIDELINE.components.label}.`;

const RAW_MAP = {
  button: 'Button',
  textarea: 'Textarea',
  select: 'Select',
  table: 'Table',
  a: 'Link',
  h1: 'Heading', h2: 'Heading', h3: 'Heading', h4: 'Heading', h5: 'Heading', h6: 'Heading',
};
const INPUT_TYPES = {
  checkbox: 'Checkbox',
  radio: 'Radio',
  number: 'NumberInput',
  submit: 'Button',
  button: 'Button',
  reset: 'Button',
  date: 'DatePicker',
};
// Input types tenet-ui has no component for (yet): leave them alone.
const INPUT_SKIP = new Set(['hidden', 'file', 'range', 'color', 'image', 'time', 'week', 'month', 'datetime-local']);

function literalAttr(opening, name) {
  for (const a of opening.attributes) {
    if (a.type !== 'JSXAttribute' || a.name.type !== 'JSXIdentifier' || a.name.name !== name) continue;
    if (!a.value) return true;
    if (a.value.type === 'Literal') return a.value.value;
    if (a.value.type === 'JSXExpressionContainer' && a.value.expression.type === 'Literal') return a.value.expression.value;
    return undefined; // dynamic
  }
  return null; // absent
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow raw HTML elements (button, input, select, textarea, table, h1-h6, a) where the installed tenet-ui provides a component.',
      url: GUIDELINE.components.url,
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          allow: { type: 'array', items: { type: 'string' }, description: 'Raw element names to allow (e.g. ["a"]).' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      raw: `Raw <{{tag}}> where tenet-ui provides <{{component}}>. import { {{importName}} } from 'tenet-ui'.${TAIL}`,
    },
  },

  create(context) {
    const data = getData(context);
    const allow = new Set((context.options[0] || {}).allow || []);

    function targetFor(opening) {
      const tag = opening.name.name;
      if (tag === 'input') {
        const type = literalAttr(opening, 'type');
        if (type === undefined) return null; // dynamic type: cannot judge honestly
        const t = typeof type === 'string' ? type.toLowerCase() : null;
        if (t && INPUT_SKIP.has(t)) return null;
        return { component: (t && INPUT_TYPES[t]) || 'TextInput', label: t ? `input type="${t}"` : 'input' };
      }
      const component = RAW_MAP[tag];
      return component ? { component, label: tag } : null;
    }

    return {
      JSXOpeningElement(node) {
        if (node.name.type !== 'JSXIdentifier') return;
        const tag = node.name.name;
        if (!/^[a-z]/.test(tag) || allow.has(tag)) return;
        const target = targetFor(node);
        if (!target) return;
        // Only fire when the mapped component exists in the installed tenet-ui version.
        const entry = data.componentByName.get(target.component);
        if (!entry) return;
        // `FormControl.Label` is reached through its parent's import; a dotless subcomponent (`Radio`) is its own export.
        const importName = target.component.includes('.') && entry.parent ? entry.parent : target.component.split('.')[0];
        context.report({
          node: node.name,
          messageId: 'raw',
          data: { tag: target.label, component: target.component, importName },
        });
      },
    };
  },
};
