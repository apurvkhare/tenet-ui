import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: { control: 'select', options: ['default', 'accent', 'success', 'danger', 'attention'] },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Count: Story = { args: { count: 3, variant: 'accent' } };
export const Overflow: Story = { args: { count: 128, max: 99, variant: 'danger' } };
export const Dot: Story = { args: { dot: true, variant: 'success' } };
export const Default: Story = { args: { count: 12 } };
