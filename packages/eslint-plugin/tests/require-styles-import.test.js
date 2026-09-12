import { join } from 'node:path';
import rule from '../rules/require-styles-import.js';
import { ruleTester } from './helpers.js';

const MISSING = `import React from 'react';\nimport { Button } from 'tenet-ui';\n`;

ruleTester.run('require-styles-import', rule, {
  valid: [
    { code: `import 'tenet-ui/styles.css';\nimport React from 'react';`, filename: '/proj/src/main.tsx' },
    { code: `import 'tenet-ui/dist/styles.css';`, filename: '/proj/src/main.tsx' },
    { code: `require('tenet-ui/styles.css');`, filename: '/proj/src/main.js' },
    { code: `import('tenet-ui/styles.css');`, filename: '/proj/src/index.jsx' },
    // Not an entry file: nothing to say.
    { code: MISSING, filename: '/proj/src/components/Button.tsx' },
    { code: MISSING, filename: '/proj/src/main.test.tsx' },
    // Custom entry globs replace the defaults.
    { code: MISSING, filename: '/proj/src/main.tsx', options: [{ entry: ['src/bootstrap.tsx'] }] },
    { code: `import 'tenet-ui/styles.css';`, filename: join(process.cwd(), 'src/bootstrap.tsx'), options: [{ entry: ['src/bootstrap.tsx'] }] },
  ],
  invalid: [
    {
      name: 'entry file without the stylesheet: reported at 1:1 with an insert suggestion after the last import',
      code: MISSING,
      filename: '/proj/src/main.tsx',
      errors: [{
        messageId: 'missing',
        line: 1,
        column: 1,
        suggestions: [{ messageId: 'addImport', output: `import React from 'react';\nimport { Button } from 'tenet-ui';\nimport 'tenet-ui/styles.css';\n` }],
      }],
    },
    {
      name: 'no imports at all: suggestion inserts at the top',
      code: `console.log('hello');`,
      filename: '/proj/app/root.tsx',
      errors: [{ messageId: 'missing', suggestions: [{ messageId: 'addImport', output: `import 'tenet-ui/styles.css';\nconsole.log('hello');` }] }],
    },
    { name: 'tokens.css alone is not the runtime contract', code: `import 'tenet-ui/tokens.css';`, filename: '/proj/src/main.tsx', errors: [{ messageId: 'missing', suggestions: 1 }] },
    { name: 'default globs: App.tsx', code: MISSING, filename: '/proj/src/App.tsx', errors: [{ messageId: 'missing', suggestions: 1 }] },
    { name: 'default globs: index.jsx', code: MISSING, filename: '/proj/src/index.jsx', errors: [{ messageId: 'missing', suggestions: 1 }] },
    { name: 'default globs: main.ts', code: `import { mount } from './mount';`, filename: '/proj/src/main.ts', errors: [{ messageId: 'missing', suggestions: 1 }] },
    { name: 'custom entry glob relative to the project root matches an absolute filename', code: MISSING, filename: join(process.cwd(), 'src/bootstrap.tsx'), options: [{ entry: ['src/bootstrap.tsx'] }], errors: [{ messageId: 'missing', suggestions: 1 }] },
    { name: 'custom entry glob with **', code: MISSING, filename: '/proj/apps/web/entry.client.tsx', options: [{ entry: ['**/entry.*.tsx'] }], errors: [{ messageId: 'missing', suggestions: 1 }] },
  ],
});
