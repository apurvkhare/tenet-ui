import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  args: { 'aria-label': 'Select a date' },
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};

export const WithSelection: Story = {
  name: 'With selection',
  args: { defaultValue: new Date(2026, 5, 21), defaultMonth: new Date(2026, 5, 1) },
};

export const MondayStart: Story = {
  name: 'Week starts Monday',
  args: { weekStartsOn: 1 },
};

export const WithRange: Story = {
  name: 'With min / max',
  args: {
    defaultMonth: new Date(2026, 5, 1),
    min: new Date(2026, 5, 5),
    max: new Date(2026, 5, 25),
  },
};
