import type { StorybookConfig } from '@storybook/react-vite';

// Storybook is the usage source (stories) and the baseline source (screenshots) for tenet-ui.
// Story ids computed here must match generated/components.json — see scripts/check-story-ids.mjs.
const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/components/**/*.stories.tsx'],
  addons: ['@storybook/addon-a11y'],
  docs: { defaultName: 'Docs' },
  core: { disableTelemetry: true },
  // Components import their own .css next to the .tsx; Vite handles those natively, so no extra
  // config is needed. We only pin the base so the static build works from any deploy path.
  viteFinal: async (viteConfig) => ({ ...viteConfig, base: viteConfig.base ?? './' }),
};

export default config;
