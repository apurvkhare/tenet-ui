import { describe, it } from 'node:test';
import { RuleTester } from 'eslint';
import tsParser from '@typescript-eslint/parser';

// Route RuleTester's describe/it through node:test so `node --test` reports each case.
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

export const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

export * from '../fixtures/registry.js';
