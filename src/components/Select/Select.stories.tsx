import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const visibility = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'internal', label: 'Internal' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: { 'aria-label': 'Visibility', options: visibility },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { defaultValue: 'public' },
};

export const WithPlaceholder: Story = {
  name: 'With placeholder',
  args: { placeholder: 'Choose visibility…' },
};

export const WithDisabledOption: Story = {
  name: 'With disabled option',
  args: {
    placeholder: 'Choose a plan…',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise (contact sales)', disabled: true },
    ],
  },
};
