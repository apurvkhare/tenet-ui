// eslint-plugin-tenet-ui — ESLint (flat config) rules for the tenet-ui design system.
import { createRequire } from 'node:module';
import noRawColor from './rules/no-raw-color.js';
import noRawSpacing from './rules/no-raw-spacing.js';
import preferComponent from './rules/prefer-component.js';
import requireStylesImport from './rules/require-styles-import.js';
import noDeprecatedApi from './rules/no-deprecated-api.js';
import noUnknownToken from './rules/no-unknown-token.js';
import { loadBaseData } from './lib/data.js';

const pkg = createRequire(import.meta.url)('./package.json');

export const rules = {
  'no-raw-color': noRawColor,
  'no-raw-spacing': noRawSpacing,
  'prefer-component': preferComponent,
  'require-styles-import': requireStylesImport,
  'no-deprecated-api': noDeprecatedApi,
  'no-unknown-token': noUnknownToken,
};

const plugin = {
  meta: { name: pkg.name, version: pkg.version },
  rules,
  configs: {},
};

/**
 * Build the recommended flat-config object with per-project options.
 * @param {object} [opts]
 * @param {string[]} [opts.entry]       globs of entry files that must import 'tenet-ui/styles.css'
 * @param {string[]} [opts.exceptions]  raw colour literals that are allowed
 * @param {string[]} [opts.allow]       raw elements to allow for prefer-component (e.g. ['a'])
 * @param {boolean}  [opts.allowScale]  let no-raw-spacing accept on-4px-scale raw values
 * @param {string[]} [opts.files]       file globs the config applies to
 * @param {object}   [opts.settings]    `settings['tenet-ui']` overrides: { tokens, components, deprecations }
 * @param {'error'|'warn'} [opts.severity]
 */
export function createConfig(opts = {}) {
  const { entry, exceptions, allow, allowScale, files, settings, severity = 'error' } = opts;
  const withOpts = (o) => (o && Object.keys(o).length ? [severity, o] : severity);
  return {
    name: 'tenet-ui/recommended',
    files: files ?? ['**/*.{js,jsx,ts,tsx}'],
    plugins: { 'tenet-ui': plugin },
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    ...(settings ? { settings: { 'tenet-ui': settings } } : {}),
    rules: {
      'tenet-ui/no-raw-color': withOpts(exceptions ? { exceptions } : null),
      'tenet-ui/no-raw-spacing': withOpts(allowScale ? { allowScale } : null),
      'tenet-ui/prefer-component': withOpts(allow ? { allow } : null),
      'tenet-ui/require-styles-import': withOpts(entry ? { entry } : null),
      'tenet-ui/no-deprecated-api': severity,
      'tenet-ui/no-unknown-token': severity,
    },
  };
}

plugin.configs.recommended = createConfig();

/** Where the rules read their data from (installed tenet-ui vs bundled fallback). */
export function dataSources() {
  return loadBaseData().sources;
}

export { noRawColor, noRawSpacing, preferComponent, requireStylesImport, noDeprecatedApi, noUnknownToken };
export default plugin;
