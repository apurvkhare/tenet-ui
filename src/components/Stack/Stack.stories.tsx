import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Components/Stack',
  component: Stack,
  argTypes: {
    direction: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    gap: { control: 'select', options: ['none', 'condensed', 'normal', 'spacious'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between'] },
  },
};
export default meta;

type Story = StoryObj<typeof Stack>;

const Box = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      background: 'var(--bgColor-muted)',
      border: '1px solid var(--borderColor-default)',
      borderRadius: 'var(--borderRadius-medium)',
      padding: 'var(--space-3)',
    }}
  >
    {children}
  </div>
);

export const Vertical: Story = {
  args: { direction: 'vertical', gap: 'normal' },
  render: (args) => (
    <Stack {...args}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
};

export const Horizontal: Story = {
  args: { direction: 'horizontal', gap: 'condensed', align: 'center' },
  render: (args) => (
    <Stack {...args}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
};

export const Toolbar: Story = {
  name: 'Toolbar (Stack.Item grow)',
  render: () => (
    <Stack direction="horizontal" gap="condensed" align="center">
      <Stack.Item grow>
        <Box>Grows to fill</Box>
      </Stack.Item>
      <Box>Labels</Box>
      <Box>New</Box>
    </Stack>
  ),
};
