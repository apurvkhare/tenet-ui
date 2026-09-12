import rule from '../rules/no-raw-spacing.js';
import { ruleTester, settings040 } from './helpers.js';

const settings = settings040;

ruleTester.run('no-raw-spacing', rule, {
  valid: [
    { code: `<div style={{ padding: 'var(--space-2)', margin: 0, borderWidth: 1, gap: '2px', width: '100%', height: 'auto' }} />`, settings },
    // Not spacing/size properties.
    { code: `<div style={{ opacity: 0.5, zIndex: 10, lineHeight: 1.5, flex: 1, fontWeight: 600 }} />`, settings },
    { code: "const c = css`padding: var(--space-2); margin: 0; border: 1px solid var(--borderColor-default);`;", settings },
    // Data, not styles: image dimensions, a position, a number in copy, JSX size attributes.
    { code: `const img = { width: 320, height: 200 }; const pos = { top: 10, left: 20 };`, settings },
    { code: `const copy = 'Ships in 12px boxes'; const el = <img width={320} height={200} alt="" />;`, settings },
    // allowScale lets 4px multiples through.
    { code: `<div style={{ padding: 20, margin: '40px' }} />`, options: [{ allowScale: true }], settings },
  ],
  invalid: [
    {
      name: 'bare number in a style object: exact token, semantic first, base-size as alternative, suggestions quote the value',
      code: `<div style={{ padding: 12 }} />`,
      settings,
      errors: [{
        messageId: 'useToken',
        data: { raw: '12', prop: 'padding', token: '--space-3', alternatives: ' (or --base-size-12)' },
        suggestions: [
          { messageId: 'useTokenFix', data: { token: '--space-3' }, output: `<div style={{ padding: 'var(--space-3)' }} />` },
          { messageId: 'useTokenFix', data: { token: '--base-size-12' }, output: `<div style={{ padding: 'var(--base-size-12)' }} />` },
        ],
      }],
    },
    {
      name: 'px string: suggestion replaces just the length',
      code: `<div style={{ padding: '12px' }} />`,
      settings,
      errors: [{
        messageId: 'useToken',
        data: { raw: '12px', prop: 'padding', token: '--space-3', alternatives: ' (or --base-size-12)' },
        suggestions: [
          { messageId: 'useTokenFix', data: { token: '--space-3' }, output: `<div style={{ padding: 'var(--space-3)' }} />` },
          { messageId: 'useTokenFix', data: { token: '--base-size-12' }, output: `<div style={{ padding: 'var(--base-size-12)' }} />` },
        ],
      }],
    },
    {
      name: 'off-scale lengths in a shorthand: nearest token and delta, one report per length',
      code: `<div style={{ padding: '6px 10px' }} />`,
      settings,
      errors: [
        { messageId: 'offScale', data: { raw: '6px', prop: 'padding', token: '--space-1', tokenValue: '4px', delta: '+2px' } },
        { messageId: 'offScale', data: { raw: '10px', prop: 'padding', token: '--space-2', tokenValue: '8px', delta: '+2px' } },
      ],
    },
    {
      name: 'on the 4px scale but no space token: a fontSize token of the same value is not offered for padding',
      code: `<div style={{ padding: 20 }} />`,
      settings,
      errors: [{ messageId: 'noToken', data: { raw: '20', prop: 'padding', token: '--space-4', tokenValue: '16px', delta: '+4px' } }],
    },
    {
      name: 'fontSize off scale',
      code: `<div style={{ fontSize: '22px' }} />`,
      settings,
      errors: [{ messageId: 'offScale', data: { raw: '22px', prop: 'fontSize', token: '--fontSize-3', tokenValue: '20px', delta: '+2px' } }],
    },
    {
      name: 'fontSize exact',
      code: `<div style={{ fontSize: 14 }} />`,
      settings,
      errors: [{ messageId: 'useToken', data: { raw: '14', prop: 'fontSize', token: '--fontSize-1', alternatives: '' }, suggestions: 1 }],
    },
    {
      name: 'borderRadius off scale',
      code: `<div style={{ borderRadius: 6 }} />`,
      settings,
      errors: [{ messageId: 'offScale', data: { raw: '6', prop: 'borderRadius', token: '--borderRadius-medium', tokenValue: '5px', delta: '+1px' } }],
    },
    {
      name: 'width prefers control sizes',
      code: `<div style={{ width: 32 }} />`,
      settings,
      errors: [{ messageId: 'useToken', data: { raw: '32', prop: 'width', token: '--control-medium-size', alternatives: ' (or --space-6, --base-size-32)' }, suggestions: 3 }],
    },
    {
      name: 'rem and em convert at 16px',
      code: `<div style={{ margin: '1rem', gap: '1.5em' }} />`,
      settings,
      errors: [
        { messageId: 'useToken', data: { raw: '1rem', prop: 'margin', token: '--space-4', alternatives: ' (or --base-size-16)' }, suggestions: 2 },
        { messageId: 'useToken', data: { raw: '1.5em', prop: 'gap', token: '--space-5', alternatives: ' (or --base-size-24)' }, suggestions: 2 },
      ],
    },
    {
      name: 'allowScale does not excuse off-scale values',
      code: `<div style={{ padding: 10 }} />`,
      options: [{ allowScale: true }],
      settings,
      errors: [{ messageId: 'offScale' }],
    },
    {
      name: 'styled-components template',
      code: "const Panel = styled.div`\n  padding: 20px;\n  border-radius: 6px;\n`;",
      settings,
      errors: [
        { messageId: 'noToken', line: 2, data: { raw: '20px', prop: 'padding', token: '--space-4', tokenValue: '16px', delta: '+4px' } },
        { messageId: 'offScale', line: 3, data: { raw: '6px', prop: 'border-radius', token: '--borderRadius-medium', tokenValue: '5px', delta: '+1px' } },
      ],
    },
    {
      name: 'css template with an exact match: suggestion edits inside the template',
      code: "const c = css`margin: 8px;`;",
      settings,
      errors: [{
        messageId: 'useToken',
        data: { raw: '8px', prop: 'margin', token: '--space-2', alternatives: ' (or --base-size-8)' },
        suggestions: [
          { messageId: 'useTokenFix', data: { token: '--space-2' }, output: "const c = css`margin: var(--space-2);`;" },
          { messageId: 'useTokenFix', data: { token: '--base-size-8' }, output: "const c = css`margin: var(--base-size-8);`;" },
        ],
      }],
    },
    {
      name: 'style object declared elsewhere, reported once',
      code: `const s = { marginBottom: 12 };\nexport const A = () => <div style={s} />;`,
      settings,
      errors: [{ messageId: 'useToken', line: 1, suggestions: 2 }],
    },
    {
      name: 'el.style.x assignment',
      code: `function f(el) { el.style.padding = '12px'; }`,
      settings,
      errors: [{ messageId: 'useToken', data: { raw: '12px', prop: 'padding', token: '--space-3', alternatives: ' (or --base-size-12)' }, suggestions: 2 }],
    },
    {
      name: 'border shorthand: the length is a border width',
      code: `<div style={{ border: '3px solid var(--borderColor-default)' }} />`,
      settings,
      errors: [{ messageId: 'offScale', data: { raw: '3px', prop: 'border', token: '--borderWidth-thick', tokenValue: '2px', delta: '+1px' } }],
    },
    {
      name: 'negative offsets match on magnitude and suggest calc(-1 * var(--x))',
      code: `<div style={{ marginTop: -12 }} />`,
      settings,
      errors: [{
        messageId: 'useToken',
        data: { raw: '-12', prop: 'marginTop', token: '--space-3', alternatives: ' (or --base-size-12)' },
        suggestions: [
          { messageId: 'useTokenFix', data: { token: '--space-3' }, output: `<div style={{ marginTop: 'calc(-1 * var(--space-3))' }} />` },
          { messageId: 'useTokenFix', data: { token: '--base-size-12' }, output: `<div style={{ marginTop: 'calc(-1 * var(--base-size-12))' }} />` },
        ],
      }],
    },
    { name: 'sx prop is a style object', code: `<Box sx={{ padding: 12 }} />`, settings, errors: [{ messageId: 'useToken', suggestions: 2 }] },
    { name: 'theme-like object with unambiguous CSS keys', code: `const theme = { padding: 12, fontSize: 14 };`, settings, errors: [{ messageId: 'useToken', suggestions: 2 }, { messageId: 'useToken', suggestions: 1 }] },
  ],
});
