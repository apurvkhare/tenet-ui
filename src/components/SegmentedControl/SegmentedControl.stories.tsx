import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: {
    'aria-label': 'View',
    options: [
      { value: 'list', label: 'List' },
      { value: 'board', label: 'Board' },
      { value: 'timeline', label: 'Timeline' },
    ],
  },
  argTypes: { size: { control: 'inline-radio', options: ['small', 'medium'] } },
};
export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = { args: { defaultValue: 'list' } };
export const Small: Story = { args: { size: 'small', defaultValue: 'board' } };
export const WithDisabled: Story = {
  name: 'With disabled segment',
  args: {
    defaultValue: 'list',
    options: [
      { value: 'list', label: 'List' },
      { value: 'board', label: 'Board' },
      { value: 'timeline', label: 'Timeline', disabled: true },
    ],
  },
};
