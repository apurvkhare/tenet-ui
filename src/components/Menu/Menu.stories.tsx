import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Menu } from './Menu';
import { Button } from '../Button';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
};
export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <Menu
      aria-label="Repository actions"
      trigger={<Button>Actions ▾</Button>}
      items={[
        { label: 'Edit', onSelect: () => {} },
        { label: 'Duplicate', onSelect: () => {} },
        { label: 'Archived', onSelect: () => {}, disabled: true },
        { type: 'separator' },
        { label: 'Delete', onSelect: () => {}, destructive: true },
      ]}
    />
  ),
  // ARIA menu pattern: click opens role=menu and focuses the first item, ArrowDown moves focus,
  // Enter invokes the item and closes the menu, focus returns to the trigger. The list is portaled.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: /Actions/ });
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await userEvent.click(trigger);

    const menu = await body.findByRole('menu', { name: 'Repository actions' });
    await expect(menu).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const items = within(menu).getAllByRole('menuitem');
    await waitFor(() => expect(items[0]).toHaveFocus());

    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(items[1]).toHaveFocus());
    await expect(items[1]).toHaveTextContent('Duplicate');

    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(body.queryByRole('menu')).not.toBeInTheDocument());
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toHaveFocus();
  },
};
