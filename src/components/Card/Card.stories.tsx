import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'muted'] },
    padding: { control: 'select', options: ['none', 'condensed', 'normal', 'spacious'] },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { variant: 'default', padding: 'normal' },
  render: (args) => <Card {...args}>A simple surface for grouping content.</Card>,
};

export const Muted: Story = {
  args: { variant: 'muted', padding: 'normal' },
  render: (args) => <Card {...args}>A recessed, secondary surface.</Card>,
};
