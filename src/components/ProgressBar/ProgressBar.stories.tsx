import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: { 'aria-label': 'Upload progress' },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    variant: { control: 'inline-radio', options: ['accent', 'success', 'danger'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = { args: { value: 42 } };

export const Indeterminate: Story = {
  args: { value: undefined, 'aria-label': 'Loading' },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <ProgressBar {...args} variant="accent" value={60} aria-label="Accent progress" />
      <ProgressBar {...args} variant="success" value={100} aria-label="Success progress" />
      <ProgressBar {...args} variant="danger" value={30} aria-label="Danger progress" />
    </div>
  ),
};

export const Small: Story = { args: { value: 70, size: 'small' } };
