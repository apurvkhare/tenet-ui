import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
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

export const Default: Story = {
  // Open the calendar popover (role=dialog containing role=grid), pick a day → the value commits,
  // the popover closes, focus returns to the trigger and it displays the chosen date.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Date' });
    await expect(trigger).toHaveTextContent('Select a date…');
    await userEvent.click(trigger);

    const grid = await body.findByRole('grid');
    await expect(grid).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // The 15th is always inside the visible month (adjacent-month filler never reaches it).
    const day = within(grid)
      .getAllByRole('button')
      .find((b) => b.textContent === '15' && !b.className.includes('--outside'));
    await expect(day).toBeDefined();
    await userEvent.click(day!);

    await waitFor(() => expect(body.queryByRole('grid')).not.toBeInTheDocument());
    await expect(trigger).not.toHaveTextContent('Select a date…');
    await expect(trigger).toHaveTextContent(/\b15\b/);
    await expect(trigger).toHaveFocus();
  },
};

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
