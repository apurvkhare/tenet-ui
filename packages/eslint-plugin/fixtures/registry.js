// Fixture data for tests and the stage demo. The deprecation registry mirrors what
// tenet-ui 0.4.0 ships in generated/deprecations.json.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
export const bundledTokens = require('../data/tokens.json');
export const bundledComponents = require('../data/components.json');

const BLOCK_COMPONENTS = ['Button', 'TextInput', 'Textarea', 'NumberInput', 'Select', 'SegmentedControl', 'DatePicker'];

export const FIXTURE_DEPRECATIONS = {
  schemaVersion: 1,
  package: 'tenet-ui',
  version: '0.4.0',
  deprecations: [
    ...BLOCK_COMPONENTS.map((component) => ({
      kind: 'prop',
      component,
      prop: 'block',
      replacement: 'fullWidth',
      message: 'Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.5.0.',
      since: '0.4.0',
    })),
    {
      kind: 'component',
      component: 'Label',
      replacement: 'Tag',
      message: 'Use `Tag` for status pills (renamed in 0.4.0). `Label` keeps working until 0.5.0.',
      since: '0.4.0',
    },
  ],
};

/** Component catalog as tenet-ui 0.3.0 shipped it: without the five 0.4.0 additions. */
const ADDED_IN_040 = new Set(['Heading', 'Text', 'Grid', 'EmptyState', 'Icon']);
export const COMPONENTS_030 = {
  ...bundledComponents,
  version: '0.3.0',
  components: Object.fromEntries(Object.entries(bundledComponents.components).filter(([, c]) => !ADDED_IN_040.has(c.name))),
};

/** Component catalog with the 0.4.0 additions guaranteed present (in case data/ is still 0.3.0). */
export const COMPONENTS_040 = {
  ...bundledComponents,
  version: '0.4.0',
  components: {
    ...bundledComponents.components,
    ...(bundledComponents.components.heading ? {} : { heading: { id: 'heading', name: 'Heading', props: [], subcomponents: [] } }),
  },
};

export const settings040 = { 'tenet-ui': { deprecations: FIXTURE_DEPRECATIONS, components: COMPONENTS_040 } };
export const settings030 = { 'tenet-ui': { deprecations: { deprecations: [] }, components: COMPONENTS_030 } };
