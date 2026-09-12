import rule from '../rules/prefer-component.js';
import { ruleTester, settings040, settings030 } from './helpers.js';

const settings = settings040;

ruleTester.run('prefer-component', rule, {
  valid: [
    { code: `<Button>Go</Button>`, settings },
    // Elements with no tenet-ui equivalent (p is deliberately skipped).
    { code: `<div><span /><p>text</p><label htmlFor="x" /><ul><li /></ul></div>`, settings },
    // On 0.3.0 there is no Heading, so h1 is not reported.
    { code: `<h1>Title</h1>`, settings: settings030 },
    { code: `<a href="/x">x</a>`, options: [{ allow: ['a'] }], settings },
    // Dynamic input type cannot be judged; input types without a component are skipped.
    { code: `<input type={kind} />`, settings },
    { code: `<><input type="hidden" /><input type="file" /><input type="range" /></>`, settings },
  ],
  invalid: [
    {
      code: `<button onClick={f}>Save</button>`,
      settings,
      errors: [{ messageId: 'raw', data: { tag: 'button', component: 'Button', importName: 'Button' }, line: 1, column: 2, endColumn: 8 }],
    },
    {
      name: 'h1 fires on 0.4.0 where Heading exists',
      code: `<h1>Title</h1>`,
      settings,
      errors: [{ messageId: 'raw', data: { tag: 'h1', component: 'Heading', importName: 'Heading' } }],
    },
    { code: `<h3>Sub</h3>`, settings, errors: [{ messageId: 'raw', data: { tag: 'h3', component: 'Heading', importName: 'Heading' } }] },
    { code: `<input placeholder="x" />`, settings, errors: [{ messageId: 'raw', data: { tag: 'input', component: 'TextInput', importName: 'TextInput' } }] },
    { code: `<input type="text" />`, settings, errors: [{ messageId: 'raw', data: { tag: 'input type="text"', component: 'TextInput', importName: 'TextInput' } }] },
    { code: `<input type="checkbox" />`, settings, errors: [{ messageId: 'raw', data: { tag: 'input type="checkbox"', component: 'Checkbox', importName: 'Checkbox' } }] },
    { code: `<input type="number" />`, settings, errors: [{ messageId: 'raw', data: { tag: 'input type="number"', component: 'NumberInput', importName: 'NumberInput' } }] },
    { code: `<input type="date" />`, settings, errors: [{ messageId: 'raw', data: { tag: 'input type="date"', component: 'DatePicker', importName: 'DatePicker' } }] },
    { code: `<input type="submit" />`, settings, errors: [{ messageId: 'raw', data: { tag: 'input type="submit"', component: 'Button', importName: 'Button' } }] },
    { code: `<input type={'radio'} />`, settings, errors: [{ messageId: 'raw', data: { tag: 'input type="radio"', component: 'Radio', importName: 'Radio' } }] },
    { code: `<select><option>a</option></select>`, settings, errors: [{ messageId: 'raw', data: { tag: 'select', component: 'Select', importName: 'Select' } }] },
    { code: `<textarea />`, settings, errors: [{ messageId: 'raw', data: { tag: 'textarea', component: 'Textarea', importName: 'Textarea' } }] },
    { code: `<table><tbody><tr><td /></tr></tbody></table>`, settings, errors: [{ messageId: 'raw', data: { tag: 'table', component: 'Table', importName: 'Table' } }] },
    { code: `<a href="/x">x</a>`, settings, errors: [{ messageId: 'raw', data: { tag: 'a', component: 'Link', importName: 'Link' } }] },
    { code: `<form><h2>x</h2><button /></form>`, settings, errors: [{ messageId: 'raw' }, { messageId: 'raw' }] },
    { name: 'allow covers only the listed elements', code: `<><a /><button /></>`, options: [{ allow: ['a'] }], settings, errors: [{ messageId: 'raw', data: { tag: 'button', component: 'Button', importName: 'Button' } }] },
    { name: 'button fires on 0.3.0 too (Button exists there)', code: `<button />`, settings: settings030, errors: [{ messageId: 'raw' }] },
  ],
});
