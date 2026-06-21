import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  args: { 'aria-label': 'Quantity' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};
export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: { defaultValue: 1 },
};

export const WithRange: Story = {
  name: 'With min / max / step',
  args: { defaultValue: 10, min: 0, max: 100, step: 5 },
};

export const Empty: Story = {
  args: { placeholder: '0' },
};

export const Disabled: Story = {
  args: { defaultValue: 42, disabled: true },
};
