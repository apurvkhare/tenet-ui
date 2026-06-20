import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: { 'aria-label': 'Visibility' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args} defaultValue="public">
      <option value="public">Public</option>
      <option value="private">Private</option>
      <option value="internal">Internal</option>
    </Select>
  ),
};

export const WithPlaceholder: Story = {
  name: 'With placeholder',
  render: (args) => (
    <Select {...args} placeholder="Choose visibility…">
      <option value="public">Public</option>
      <option value="private">Private</option>
    </Select>
  ),
};
