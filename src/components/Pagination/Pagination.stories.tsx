import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return <Pagination page={page} pageCount={10} onPageChange={setPage} />;
  },
  // Next moves the current page: aria-current="page" leaves 3 and lands on 4, and only one page
  // button carries it at a time.
  play: async ({ canvasElement }) => {
    const nav = within(within(canvasElement).getByRole('navigation', { name: 'Pagination' }));
    await expect(nav.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');

    await userEvent.click(nav.getByRole('button', { name: 'Next page' }));
    await expect(nav.getByRole('button', { name: 'Page 4' })).toHaveAttribute('aria-current', 'page');
    await expect(nav.getByRole('button', { name: 'Page 3' })).not.toHaveAttribute('aria-current');
    await expect(nav.getAllByRole('button', { current: 'page' })).toHaveLength(1);
    await expect(nav.getByRole('button', { name: 'Previous page' })).toBeEnabled();
  },
};

export const ManyPages: Story = {
  name: 'Many pages',
  render: () => {
    const [page, setPage] = useState(12);
    return <Pagination page={page} pageCount={42} onPageChange={setPage} />;
  },
};
