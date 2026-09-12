import rule from '../rules/no-raw-color.js';
import { ruleTester, settings040 } from './helpers.js';

const settings = settings040;

ruleTester.run('no-raw-color', rule, {
  valid: [
    { code: `<div style={{ color: 'var(--fgColor-default)', background: 'var(--bgColor-default)' }} />`, settings },
    { code: `const s = { color: 'var(--fgColor-default)' }; export const A = () => <div style={s} />;`, settings },
    { code: "const c = css`color: var(--fgColor-default); padding: var(--space-2);`;", settings },
    // Not styles: a colour word in copy, a hash in an href, an object whose keys are not CSS properties.
    { code: `const copy = 'white paper'; const a = <a href="#ffffff">anchor</a>;`, settings },
    { code: `const t = { name: 'white', label: '#fff' };`, settings },
    // A lone `color` key next to non-CSS keys is data (chart series), not a style object.
    { code: `const series = { name: 'Sales', color: '#c2502e' };`, settings },
    // exceptions
    { code: `<div style={{ color: '#ff0000' }} />`, options: [{ exceptions: ['#ff0000'] }], settings },
    { code: `<div style={{ color: 'red' }} />`, options: [{ exceptions: ['red'] }], settings },
    { code: `<div style={{ background: 'transparent', color: 'inherit', borderColor: 'currentColor' }} />`, settings },
  ],
  invalid: [
    {
      name: 'hex in inline style: exact token, property family first, three suggestions',
      code: `<div style={{ color: '#2a241b' }} />`,
      settings,
      errors: [{
        messageId: 'exact',
        data: { raw: '#2a241b', token: '--fgColor-default', alternatives: ' (or --fgColor-onAttention, --bgColor-emphasis)' },
        suggestions: [
          { messageId: 'useToken', data: { token: '--fgColor-default' }, output: `<div style={{ color: 'var(--fgColor-default)' }} />` },
          { messageId: 'useToken', data: { token: '--fgColor-onAttention' }, output: `<div style={{ color: 'var(--fgColor-onAttention)' }} />` },
          { messageId: 'useToken', data: { token: '--bgColor-emphasis' }, output: `<div style={{ color: 'var(--bgColor-emphasis)' }} />` },
        ],
      }],
    },
    {
      name: 'background hex prefers the bgColor family',
      code: `<div style={{ background: '#ffffff' }} />`,
      settings,
      errors: [{ messageId: 'exact', data: { raw: '#ffffff', token: '--bgColor-default', alternatives: ' (or --fgColor-onEmphasis, --base-color-white)' }, suggestions: 3 }],
    },
    {
      name: 'short hex normalises',
      code: `<div style={{ backgroundColor: '#fff' }} />`,
      settings,
      errors: [{ messageId: 'exact', data: { raw: '#fff', token: '--bgColor-default', alternatives: ' (or --fgColor-onEmphasis, --base-color-white)' }, suggestions: 3 }],
    },
    {
      name: 'rgb() resolves to the token with that value',
      code: `<div style={{ background: 'rgb(244, 238, 227)' }} />`,
      settings,
      errors: [{ messageId: 'exact', data: { raw: 'rgb(244, 238, 227)', token: '--bgColor-muted', alternatives: ' (or --base-color-neutral-100)' }, suggestions: 2 }],
    },
    {
      name: 'hsl() resolves too',
      code: `<div style={{ color: 'hsl(0, 0%, 100%)' }} />`,
      settings,
      errors: [{ messageId: 'exact', data: { raw: 'hsl(0, 0%, 100%)', token: '--fgColor-onEmphasis', alternatives: ' (or --bgColor-default, --base-color-white)' }, suggestions: 3 }],
    },
    {
      name: 'named colour with no token: names the family for the property',
      code: `<div style={{ borderColor: 'gray' }} />`,
      settings,
      errors: [{ messageId: 'family', data: { raw: 'gray', family: '--borderColor-*', example: '--borderColor-default' } }],
    },
    {
      name: 'rgba with no token in a shadow',
      code: `<div style={{ boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />`,
      settings,
      errors: [{ messageId: 'family', data: { raw: 'rgba(0,0,0,.2)', family: '--shadow-*', example: '--shadow-resting' } }],
    },
    {
      name: '8-digit hex with alpha',
      code: `<div style={{ color: '#aabbccdd' }} />`,
      settings,
      errors: [{ messageId: 'family' }],
    },
    {
      name: 'style object declared elsewhere in the file (reported once, not twice)',
      code: `const heading = { color: '#2a241b', fontWeight: 600 };\nexport const A = () => <h1 style={heading}>x</h1>;`,
      settings,
      errors: [{ messageId: 'exact', line: 1, suggestions: 3 }],
    },
    {
      name: 'both branches of a conditional',
      code: `<div style={{ color: dark ? '#f4eee3' : '#2a241b' }} />`,
      settings,
      errors: [{ messageId: 'exact', data: { raw: '#f4eee3', token: '--bgColor-muted', alternatives: ' (or --base-color-neutral-100)' }, suggestions: 2 }, { messageId: 'exact', suggestions: 3 }],
    },
    {
      name: 'styled-components template: property inferred from the declaration',
      code: "const Panel = styled.div`\n  background: #ffffff;\n  color: #2a241b;\n`;",
      settings,
      errors: [
        { messageId: 'exact', line: 2, data: { raw: '#ffffff', token: '--bgColor-default', alternatives: ' (or --fgColor-onEmphasis, --base-color-white)' }, suggestions: 3 },
        { messageId: 'exact', line: 3, data: { raw: '#2a241b', token: '--fgColor-default', alternatives: ' (or --fgColor-onAttention, --bgColor-emphasis)' }, suggestions: 3 },
      ],
    },
    {
      name: 'css`` and keyframes`` templates',
      code: "const k = keyframes`from { color: #fff } to { color: #000 }`;\nconst c = css`border: 1px solid #ddd2bf;`;",
      settings,
      errors: [{ messageId: 'exact', line: 1, suggestions: 3 }, { messageId: 'family', line: 1 }, { messageId: 'exact', line: 2, data: { raw: '#ddd2bf', token: '--borderColor-default', alternatives: ' (or --base-color-neutral-300)' }, suggestions: 2 }],
    },
    {
      name: 'CSS custom property assigned in a string',
      code: `const vars = '--accent: #c2502e; --paper: #ffffff';`,
      settings,
      errors: [{ messageId: 'exact', data: { raw: '#c2502e', token: '--bgColor-accent-emphasis', alternatives: ' (or --borderColor-accent-emphasis, --base-color-clay-500)' }, suggestions: 3 }, { messageId: 'exact', suggestions: 3 }],
    },
    {
      name: 'el.style.x = ... and el.style.setProperty',
      code: `function paint(el) {\n  el.style.color = '#2a241b';\n  el.style.setProperty('--bg', '#ffffff');\n}`,
      settings,
      errors: [{ messageId: 'exact', line: 2, data: { raw: '#2a241b', token: '--fgColor-default', alternatives: ' (or --fgColor-onAttention, --bgColor-emphasis)' }, suggestions: 3 }, { messageId: 'exact', line: 3, suggestions: 3 }],
    },
    {
      name: 'theme-like object with unambiguous CSS keys',
      code: `const theme = { background: '#ffffff', color: '#2a241b' };`,
      settings,
      errors: [{ messageId: 'exact', suggestions: 3 }, { messageId: 'exact', suggestions: 3 }],
    },
    {
      name: 'sx prop counts as a style object',
      code: `<Box sx={{ color: '#2a241b' }} />`,
      settings,
      errors: [{ messageId: 'exact', suggestions: 3 }],
    },
    {
      name: 'exceptions only cover the listed values',
      code: `<div style={{ color: '#2a241b' }} />`,
      options: [{ exceptions: ['#000'] }],
      settings,
      errors: [{ messageId: 'exact', suggestions: 3 }],
    },
  ],
});
