import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  args: { children: 'Label' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'accent', 'success', 'danger', 'muted'] },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
      <Label variant="default">default</Label>
      <Label variant="accent">accent</Label>
      <Label variant="success">success</Label>
      <Label variant="danger">danger</Label>
      <Label variant="muted">muted</Label>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
      <Label size="small">small</Label>
      <Label size="medium">medium</Label>
    </div>
  ),
};
