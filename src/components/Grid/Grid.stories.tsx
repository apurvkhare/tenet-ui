import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';
import { Card } from '../Card';
import { Heading } from '../Heading';
import { Text } from '../Text';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  argTypes: {
    gap: { control: 'select', options: ['none', 'condensed', 'normal', 'spacious'] },
    rowGap: { control: 'select', options: [undefined, 'none', 'condensed', 'normal', 'spacious'] },
    align: { control: 'select', options: [undefined, 'start', 'center', 'end', 'stretch'] },
  },
};
export default meta;

type Story = StoryObj<typeof Grid>;

const Box = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      background: 'var(--bgColor-muted)',
      border: 'var(--borderWidth-thin) solid var(--borderColor-default)',
      borderRadius: 'var(--borderRadius-medium)',
      padding: 'var(--space-3)',
      fontFamily: 'var(--fontFamily-body)',
      fontSize: 'var(--fontSize-1)',
      color: 'var(--fgColor-default)',
    }}
  >
    {children}
  </div>
);

const boxes = (n: number) => Array.from({ length: n }, (_, i) => <Box key={i}>Item {i + 1}</Box>);

export const FixedColumns: Story = {
  name: 'Fixed columns',
  args: { columns: 3, gap: 'normal' },
  render: (args) => <Grid {...args}>{boxes(6)}</Grid>,
};

export const ResponsiveColumns: Story = {
  name: 'Responsive columns',
  args: { columns: { base: 1, sm: 2, md: 3, lg: 4 }, gap: 'normal' },
  render: (args) => <Grid {...args}>{boxes(8)}</Grid>,
};

export const Gaps: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
      <Grid columns={4} gap="none">
        {boxes(4)}
      </Grid>
      <Grid columns={4} gap="condensed">
        {boxes(4)}
      </Grid>
      <Grid columns={4} gap="normal">
        {boxes(4)}
      </Grid>
      <Grid columns={4} gap="spacious">
        {boxes(4)}
      </Grid>
    </div>
  ),
};

export const RowGapOverride: Story = {
  name: 'Row gap override',
  args: { columns: 3, gap: 'condensed', rowGap: 'spacious' },
  render: (args) => <Grid {...args}>{boxes(6)}</Grid>,
};

export const Align: Story = {
  args: { columns: 3, gap: 'normal', align: 'center' },
  render: (args) => (
    <Grid {...args}>
      <Box>Short</Box>
      <Box>
        A taller item with
        <br />
        two lines
        <br />
        and a third
      </Box>
      <Box>Short</Box>
    </Grid>
  ),
};

export const ItemSpan: Story = {
  name: 'Grid.Item span',
  render: () => (
    <Grid columns={{ base: 1, md: 3 }} gap="normal">
      <Grid.Item span={{ base: 1, md: 2 }}>
        <Box>Main — spans 2 of 3 columns from md up</Box>
      </Grid.Item>
      <Box>Sidebar</Box>
      <Grid.Item span={{ base: 1, md: 3 }}>
        <Box>Footer — full width</Box>
      </Grid.Item>
    </Grid>
  ),
};

export const StatCards: Story = {
  name: 'Stat cards (composed)',
  render: () => (
    <Grid columns={{ base: 1, sm: 2, lg: 4 }} gap="normal" align="stretch">
      {[
        ['Published', '128'],
        ['In review', '14'],
        ['Drafts', '37'],
        ['Scheduled', '9'],
      ].map(([label, value]) => (
        <Card key={label}>
          <Text tone="muted" size="small" weight="medium">
            {label}
          </Text>
          <Heading level={2} as="p">
            {value}
          </Heading>
        </Card>
      ))}
    </Grid>
  ),
};
