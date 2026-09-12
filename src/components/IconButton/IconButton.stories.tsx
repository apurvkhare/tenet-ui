import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import { SettingsIcon, TrashIcon } from '../../icons';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  args: { icon: <SettingsIcon />, 'aria-label': 'Settings' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'danger', 'invisible'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Primary: Story = { args: { variant: 'primary' } };

export const Danger: Story = { args: { variant: 'danger', icon: <TrashIcon />, 'aria-label': 'Delete' } };

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
