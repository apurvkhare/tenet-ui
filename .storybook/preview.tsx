import type { Preview } from '@storybook/react-vite';

// Runtime contract, exactly as a consumer wires it: the theme variables + the base reset. We do NOT
// import dist/styles.css here — every component already imports its own .css, so styles.css would
// load the component rules twice.
import '../dist/tokens.css';
import '../src/base.css';
import './preview.css';

type ColorMode = 'light' | 'dark';

/**
 * Consumers theme by setting `data-color-mode="light|dark"` on <html>; tokens.css switches the
 * semantic variables off that attribute. Putting it on <html> (not the story root) is what makes
 * portaled overlays (Menu, Select, Popover, DatePicker, Dialog, Toast render into <body>) pick up
 * the theme too. The baselines and a11y scripts drive this via `?globals=colorMode:dark`.
 */
const applyColorMode = (mode: ColorMode) => {
  document.documentElement.dataset.colorMode = mode;
};

const preview: Preview = {
  globalTypes: {
    colorMode: {
      description: 'tenet-ui color mode (sets data-color-mode on <html>)',
      toolbar: {
        title: 'Color mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { colorMode: 'light' },
  decorators: [
    (Story, context) => {
      const mode = (context.globals.colorMode as ColorMode) ?? 'light';
      // Applied synchronously (not in an effect) so the first paint — and the a11y/baseline
      // scripts, which wait for a stable frame — never see the wrong theme.
      applyColorMode(mode);
      return <Story />;
    },
  ],
  parameters: {
    layout: 'padded',
    a11y: {
      // Report violations in the panel; the CI gate is scripts/check-a11y.mjs (serious+critical).
      test: 'todo',
      options: { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } },
    },
    controls: { expanded: false },
  },
};

export default preview;
