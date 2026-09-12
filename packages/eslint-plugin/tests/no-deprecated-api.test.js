import rule from '../rules/no-deprecated-api.js';
import { ruleTester, settings040, settings030 } from './helpers.js';

const settings = settings040;
const BUTTON_BLOCK_MESSAGE =
  '`block` on <Button> is deprecated since tenet-ui 0.4.0; use `fullWidth`. Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.5.0. Guideline: Changelog > Deprecations.';

ruleTester.run('no-deprecated-api', rule, {
  valid: [
    { code: `import { Button } from 'tenet-ui';\nexport const A = () => <Button fullWidth>Go</Button>;`, settings },
    // Not tenet-ui's Button.
    { code: `import { Button } from './Button';\nexport const A = () => <Button block>Go</Button>;`, settings },
    // No deprecation for this component / prop.
    { code: `import { Card } from 'tenet-ui';\nexport const A = () => <Card block />;`, settings },
    // FormControl.Label is a different component from the deprecated Label.
    { code: `import { FormControl } from 'tenet-ui';\nexport const A = () => <FormControl.Label>Name</FormControl.Label>;`, settings },
    { code: `const Label = () => null;\nexport const A = () => <Label />;`, settings },
    // On a version with an empty registry nothing is deprecated.
    { code: `import { Button, Label } from 'tenet-ui';\nexport const A = () => <><Button block /><Label /></>;`, settings: settings030 },
  ],
  invalid: [
    {
      name: 'boolean prop rename is autofixed, message carries replacement, since and registry text',
      code: `import { Button } from 'tenet-ui';\nexport const A = () => <Button block>Go</Button>;`,
      output: `import { Button } from 'tenet-ui';\nexport const A = () => <Button fullWidth>Go</Button>;`,
      settings,
      errors: [{ message: BUTTON_BLOCK_MESSAGE, line: 2 }],
    },
    {
      name: 'prop with a value keeps the value',
      code: `import { TextInput } from 'tenet-ui';\nexport const A = () => <TextInput block={wide} placeholder="x" />;`,
      output: `import { TextInput } from 'tenet-ui';\nexport const A = () => <TextInput fullWidth={wide} placeholder="x" />;`,
      settings,
      errors: [{ messageId: 'prop', data: { prop: 'block', component: 'TextInput', since: '0.4.0', replacement: '; use `fullWidth`', detail: ' Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.5.0.' } }],
    },
    {
      name: 'aliased import',
      code: `import { Button as B } from 'tenet-ui';\nexport const A = () => <B block />;`,
      output: `import { Button as B } from 'tenet-ui';\nexport const A = () => <B fullWidth />;`,
      settings,
      errors: [{ messageId: 'prop' }],
    },
    {
      name: 'namespace import',
      code: `import * as T from 'tenet-ui';\nexport const A = () => <T.Select block />;`,
      output: `import * as T from 'tenet-ui';\nexport const A = () => <T.Select fullWidth />;`,
      settings,
      errors: [{ messageId: 'prop' }],
    },
    {
      name: 'require() destructuring',
      code: `const { NumberInput } = require('tenet-ui');\nconst a = <NumberInput block />;`,
      output: `const { NumberInput } = require('tenet-ui');\nconst a = <NumberInput fullWidth />;`,
      settings,
      errors: [{ messageId: 'prop' }],
    },
    {
      name: 'replacement already present: report, no fix',
      code: `import { Button } from 'tenet-ui';\nexport const A = () => <Button block fullWidth />;`,
      output: null,
      settings,
      errors: [{ messageId: 'prop' }],
    },
    {
      name: 'deprecated component: reported on the import specifier and on each use, never fixed',
      code: `import { Label, Button } from 'tenet-ui';\nexport const A = () => <><Label>Draft</Label><Label /></>;`,
      output: null,
      settings,
      errors: [
        { messageId: 'componentImport', line: 1, column: 10, endColumn: 15 },
        { messageId: 'componentUse', line: 2 },
        { messageId: 'componentUse', line: 2 },
      ],
    },
    {
      name: 'deprecated component behind an alias',
      code: `import { Label as Pill } from 'tenet-ui';\nexport const A = () => <Pill />;`,
      output: null,
      settings,
      errors: [{ messageId: 'componentImport' }, { messageId: 'componentUse' }],
    },
    {
      name: 'several deprecations in one element list',
      code: `import { Button, Textarea, SegmentedControl, DatePicker } from 'tenet-ui';\nexport const A = () => <><Button block /><Textarea block /><SegmentedControl block /><DatePicker block /></>;`,
      output: `import { Button, Textarea, SegmentedControl, DatePicker } from 'tenet-ui';\nexport const A = () => <><Button fullWidth /><Textarea fullWidth /><SegmentedControl fullWidth /><DatePicker fullWidth /></>;`,
      settings,
      errors: [{ messageId: 'prop' }, { messageId: 'prop' }, { messageId: 'prop' }, { messageId: 'prop' }],
    },
  ],
});
