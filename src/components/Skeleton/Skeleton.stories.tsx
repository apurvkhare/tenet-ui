import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: { control: 'inline-radio', options: ['text', 'rect', 'circle'] },
    radius: { control: 'inline-radio', options: ['small', 'medium', 'large', 'full'] },
  },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Text: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 280 }}>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  ),
};

export const Rect: Story = { args: { variant: 'rect', width: 280, height: 120 } };

export const Circle: Story = { args: { variant: 'circle', width: 48 } };

export const Card: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, width: 320, alignItems: 'center' }}>
      <Skeleton variant="circle" width={48} />
      <div style={{ display: 'grid', gap: 8, flex: 1 }}>
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  ),
};
