import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

// A small inline glyph so the stories don't depend on an icon package.
const GearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 1.5l1 1.6 1.9-.4.4 1.9 1.6 1-1.6 1 .4 1.9-1.9-.4-1 1.6-1-1.6-1.9.4-.4-1.9-1.6-1 1.6-1L4.7 2.7l1.9.4 1-1.6z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  args: { icon: <GearIcon />, 'aria-label': 'Settings' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'danger', 'invisible'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Primary: Story = { args: { variant: 'primary' } };

export const Danger: Story = { args: { variant: 'danger', 'aria-label': 'Delete' } };

export const Invisible: Story = { args: { variant: 'invisible' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      <IconButton {...args} size="small" aria-label="Settings (small)" />
      <IconButton {...args} size="medium" aria-label="Settings (medium)" />
      <IconButton {...args} size="large" aria-label="Settings (large)" />
    </div>
  ),
};
