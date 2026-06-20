import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  args: { 'aria-label': 'Example field', placeholder: 'Type here…' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const WithLeadingVisual: Story = {
  name: 'With leading visual',
  args: { leadingVisual: '🔍', 'aria-label': 'Search', defaultValue: 'is:issue state:open' },
};

export const Invalid: Story = {
  args: { invalid: true, defaultValue: 'not-an-email' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <TextInput {...args} size="small" placeholder="Small" />
      <TextInput {...args} size="medium" placeholder="Medium" />
      <TextInput {...args} size="large" placeholder="Large" />
    </div>
  ),
};
