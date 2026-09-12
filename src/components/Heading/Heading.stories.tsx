import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';
import { Stack } from '../Stack';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  args: { children: 'The quick brown fox jumps over the lazy dog' },
  argTypes: {
    level: { control: 'inline-radio', options: [1, 2, 3, 4] },
    as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span'] },
    truncate: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Heading>;

export const Level1: Story = { args: { level: 1 } };

export const Level2: Story = { args: { level: 2 } };

export const Level3: Story = { args: { level: 3 } };

export const Level4: Story = { args: { level: 4 } };

export const SemanticsVsSize: Story = {
  name: 'Semantics vs size (as)',
  render: () => (
    <Stack gap="condensed">
      <Heading level={1}>Page title — h1 at level 1</Heading>
      <Heading level={3} as="h2">
        Section — h2 rendered at level 3
      </Heading>
      <Heading level={1} as="p">
        Display stat — a paragraph, not a heading
      </Heading>
    </Stack>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div style={{ maxWidth: '24ch' }}>
      <Heading level={3} truncate>
        A very long headline that will not fit on a single line of this narrow container
      </Heading>
    </div>
  ),
};

export const TypeScale: Story = {
  name: 'Type scale (composed)',
  render: () => (
    <Stack gap="normal">
      <Heading level={1}>Level 1 · fontSize-5</Heading>
      <Heading level={2}>Level 2 · fontSize-4</Heading>
      <Heading level={3}>Level 3 · fontSize-3</Heading>
      <Heading level={4}>Level 4 · fontSize-2</Heading>
    </Stack>
  ),
};
