import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'danger', 'invisible'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Primary: Story = { args: { variant: 'primary', children: 'Save changes' } };

export const Danger: Story = { args: { variant: 'danger', children: 'Delete' } };

export const Invisible: Story = { args: { variant: 'invisible', children: 'Cancel' } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      <Button {...args} size="small">
        Small
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
    </div>
  ),
};
