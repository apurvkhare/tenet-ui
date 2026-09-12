import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
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

export const Default: Story = {
  args: { defaultValue: 'list' },
  // Radiogroup: clicking a segment moves aria-checked; ArrowRight moves focus and selection.
  play: async ({ canvasElement }) => {
    const group = within(within(canvasElement).getByRole('radiogroup', { name: 'View' }));
    const list = group.getByRole('radio', { name: 'List' });
    const board = group.getByRole('radio', { name: 'Board' });
    const timeline = group.getByRole('radio', { name: 'Timeline' });
    await expect(list).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(board);
    await expect(board).toHaveAttribute('aria-checked', 'true');
    await expect(list).toHaveAttribute('aria-checked', 'false');

    await userEvent.keyboard('{ArrowRight}');
    await expect(timeline).toHaveAttribute('aria-checked', 'true');
    await expect(timeline).toHaveFocus();
    await expect(group.getAllByRole('radio', { checked: true })).toHaveLength(1);
  },
};
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
