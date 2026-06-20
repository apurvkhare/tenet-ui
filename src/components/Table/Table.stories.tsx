import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { Label } from '../Label';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    density: { control: 'select', options: ['condensed', 'normal', 'spacious'] },
  },
};
export default meta;

type Story = StoryObj<typeof Table>;

const rows = [
  { repo: 'web-client', status: 'success', stars: 1284, owner: 'avery' },
  { repo: 'api-gateway', status: 'danger', stars: 642, owner: 'sam' },
  { repo: 'design-tokens', status: 'default', stars: 318, owner: 'kit' },
];

const Body = () => (
  <Table.Body>
    {rows.map((r) => (
      <Table.Row key={r.repo}>
        <Table.Cell>{r.repo}</Table.Cell>
        <Table.Cell>
          <Label variant={r.status as 'success' | 'danger' | 'default'}>{r.status}</Label>
        </Table.Cell>
        <Table.Cell align="end">{r.stars.toLocaleString()}</Table.Cell>
        <Table.Cell>{r.owner}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
);

export const Basic: Story = {
  args: { density: 'normal' },
  render: (args) => (
    <Table {...args}>
      <Table.Head>
        <Table.Row>
          <Table.Header>Repository</Table.Header>
          <Table.Header>Status</Table.Header>
          <Table.Header align="end">Stars</Table.Header>
          <Table.Header>Owner</Table.Header>
        </Table.Row>
      </Table.Head>
      <Body />
    </Table>
  ),
};

export const InContainer: Story = {
  name: 'In a titled container',
  render: () => (
    <Table.Container>
      <Table.Title>Repositories</Table.Title>
      <Table.Subtitle>3 active repositories in this org</Table.Subtitle>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Repository</Table.Header>
            <Table.Header>Status</Table.Header>
            <Table.Header align="end">Stars</Table.Header>
            <Table.Header>Owner</Table.Header>
          </Table.Row>
        </Table.Head>
        <Body />
      </Table>
    </Table.Container>
  ),
};

export const Sortable: Story = {
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Repository</Table.Header>
          <Table.Header align="end" sortDirection="descending">
            Stars
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map((r) => (
          <Table.Row key={r.repo}>
            <Table.Cell>{r.repo}</Table.Cell>
            <Table.Cell align="end">{r.stars.toLocaleString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Densities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {(['condensed', 'normal', 'spacious'] as const).map((d) => (
        <Table key={d} density={d}>
          <Table.Head>
            <Table.Row>
              <Table.Header>{d}</Table.Header>
              <Table.Header align="end">Stars</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>web-client</Table.Cell>
              <Table.Cell align="end">1,284</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ))}
    </div>
  ),
};
