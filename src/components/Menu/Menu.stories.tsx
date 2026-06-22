import type { Meta, StoryObj } from '@storybook/react';
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
};
