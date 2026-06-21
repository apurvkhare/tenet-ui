import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: { 'aria-label': 'Date' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const WithValue: Story = {
  name: 'With value',
  args: { defaultValue: new Date(2026, 5, 21) },
};

export const WithRange: Story = {
  name: 'With min / max',
  args: { min: new Date(2026, 5, 5), max: new Date(2026, 5, 25), defaultValue: new Date(2026, 5, 10) },
};

export const Disabled: Story = {
  args: { defaultValue: new Date(2026, 5, 21), disabled: true },
};
