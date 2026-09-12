import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './DataTable';
import { Label } from '../Label';
import type { DataTableColumn } from './DataTable.types';

interface Repo {
  repo: string;
  status: 'success' | 'danger' | 'default';
  statusText: string;
  stars: number;
  owner: string;
}

const data: Repo[] = [
  { repo: 'web-client', status: 'success', statusText: 'passing', stars: 1284, owner: 'avery' },
  { repo: 'api-gateway', status: 'danger', statusText: 'failing', stars: 642, owner: 'sam' },
  { repo: 'design-tokens', status: 'default', statusText: 'no runs', stars: 318, owner: 'kit' },
  { repo: 'docs-site', status: 'success', statusText: 'passing', stars: 91, owner: 'avery' },
];

const columns: DataTableColumn<Repo>[] = [
  { id: 'repo', header: 'Repository', sortable: true },
  {
    id: 'statusText',
    header: 'CI status',
    filterable: true,
    cell: (row) => <Label variant={row.status}>{row.statusText}</Label>,
  },
  { id: 'stars', header: 'Stars', align: 'end', sortable: true },
  { id: 'owner', header: 'Owner', filterable: true, sortable: true },
];

const meta: Meta<typeof DataTable<Repo>> = {
  title: 'Components/DataTable',
  component: DataTable,
  args: {
    columns,
    data,
    title: 'Repositories',
    subtitle: `${data.length} repositories`,
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<Repo>>;

export const Default: Story = {};

export const SearchOnly: Story = {
  name: 'Search only',
  args: { columns: columns.map((c) => ({ ...c, filterable: false })) },
};
