import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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
};

export const ManyPages: Story = {
  name: 'Many pages',
  render: () => {
    const [page, setPage] = useState(12);
    return <Pagination page={page} pageCount={42} onPageChange={setPage} />;
  },
};
