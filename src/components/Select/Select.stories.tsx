import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
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
  // Listbox combobox: click opens role=listbox, ArrowDown moves aria-activedescendant to the next
  // option, Enter commits it and closes — the trigger then shows the new value. Listbox is portaled.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox', { name: 'Visibility' });
    await expect(trigger).toHaveTextContent('Public');
    await userEvent.click(trigger);

    const listbox = await body.findByRole('listbox');
    await expect(listbox).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(within(listbox).getByRole('option', { name: 'Public' })).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowDown}');
    const next = within(listbox).getByRole('option', { name: 'Private' });
    await waitFor(() => expect(trigger).toHaveAttribute('aria-activedescendant', next.id));

    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(body.queryByRole('listbox')).not.toBeInTheDocument());
    await expect(trigger).toHaveTextContent('Private');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toHaveFocus();
  },
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
