import rule from '../rules/no-unknown-token.js';
import { ruleTester, settings040 } from './helpers.js';

const settings = settings040;

ruleTester.run('no-unknown-token', rule, {
  valid: [
    { code: `<div style={{ color: 'var(--fgColor-default)', padding: 'var(--space-2)' }} />`, settings },
    { code: "const c = css`box-shadow: var(--shadow-resting); gap: var(--space-3, 12px);`;", settings },
    { code: `const notCss = 'variable(--x)'; const obj = { '--fgColor-default': 1 };`, settings },
    { code: `const s = \`\${x} var(--bgColor-accent-emphasis)\`;`, settings },
  ],
  invalid: [
    {
      name: 'typo with a near match: hint + suggestion',
      code: `<div style={{ color: 'var(--fgColor-mutted)' }} />`,
      settings,
      errors: [{
        messageId: 'unknown',
        data: { name: '--fgColor-mutted', hint: '; did you mean --fgColor-muted?' },
        suggestions: [{ messageId: 'useToken', data: { token: '--fgColor-muted' }, output: `<div style={{ color: 'var(--fgColor-muted)' }} />` }],
      }],
    },
    {
      name: 'invented token, nothing close',
      code: `<div style={{ background: 'var(--brand-primary-500)' }} />`,
      settings,
      errors: [{ messageId: 'unknown', data: { name: '--brand-primary-500', hint: '' } }],
    },
    {
      name: 'two unknown tokens in one value',
      code: `const s = 'var(--a) var(--b)';`,
      settings,
      errors: [{ messageId: 'unknown', data: { name: '--a', hint: '' } }, { messageId: 'unknown', data: { name: '--b', hint: '' } }],
    },
    {
      name: 'inside a css template',
      code: "const c = css`\n  color: var(--fgColor-mutted);\n  padding: var(--space-2);\n`;",
      settings,
      errors: [{ messageId: 'unknown', line: 2, column: 14, endColumn: 30, suggestions: 1 }],
    },
    {
      name: 'a real token in a fallback does not excuse the unknown one',
      code: `const s = 'var(--space-7, var(--space-6))';`,
      settings,
      errors: [{ messageId: 'unknown', data: { name: '--space-7', hint: '; did you mean --space-1?' }, suggestions: 1 }],
    },
  ],
});
