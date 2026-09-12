import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';
import { Stack } from '../Stack';
import { Heading } from '../Heading';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  args: { children: 'Editorial Ink pairs warm paper neutrals with a terracotta accent and serif display headings.' },
  argTypes: {
    as: { control: 'select', options: ['p', 'span', 'div', 'label', 'strong', 'em'] },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    tone: { control: 'select', options: ['default', 'muted', 'accent', 'success', 'danger', 'attention'] },
    weight: { control: 'inline-radio', options: ['normal', 'medium', 'semibold'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    truncate: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'small' } };

export const Large: Story = { args: { size: 'large' } };

export const Muted: Story = { args: { tone: 'muted' } };

export const Tones: Story = {
  render: (args) => (
    <Stack gap="condensed">
      <Text {...args} tone="default">
        Default — primary copy
      </Text>
      <Text {...args} tone="muted">
        Muted — secondary copy, timestamps, helper text
      </Text>
      <Text {...args} tone="accent">
        Accent — clay emphasis, use sparingly
      </Text>
      <Text {...args} tone="success">
        Success — saved, published, passing
      </Text>
      <Text {...args} tone="danger">
        Danger — validation errors, failures
      </Text>
      <Text {...args} tone="attention">
        Attention — approaching a limit, needs review
      </Text>
    </Stack>
  ),
};

export const Weights: Story = {
  render: (args) => (
    <Stack gap="condensed">
      <Text {...args} weight="normal">
        Normal weight
      </Text>
      <Text {...args} weight="medium">
        Medium weight
      </Text>
      <Text {...args} weight="semibold">
        Semibold weight
      </Text>
    </Stack>
  ),
};

export const InlineElements: Story = {
  name: 'Inline elements (as)',
  render: () => (
    <Text>
      Body copy with{' '}
      <Text as="strong" weight="semibold">
        strong emphasis
      </Text>
      , <Text as="em">stress emphasis</Text> and an inline{' '}
      <Text as="span" tone="accent">
        accent run
      </Text>
      .
    </Text>
  ),
};

export const AsLabel: Story = {
  name: 'As label (htmlFor)',
  render: () => (
    <Stack gap="condensed" align="start">
      <Text as="label" htmlFor="text-story-email" weight="medium">
        Email address
      </Text>
      <input id="text-story-email" type="email" />
    </Stack>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div style={{ maxWidth: '28ch' }}>
      <Text truncate>A single line of body copy that is far too long for its narrow container and gets an ellipsis.</Text>
    </div>
  ),
};

export const Aligned: Story = {
  render: () => (
    <Stack gap="condensed">
      <Text align="start">Aligned to the start edge</Text>
      <Text align="center">Centered</Text>
      <Text align="end">Aligned to the end edge</Text>
    </Stack>
  ),
};

export const Composed: Story = {
  name: 'Composed (with Heading)',
  render: () => (
    <Stack gap="condensed">
      <Heading level={3}>Newsroom digest</Heading>
      <Text tone="muted" size="small">
        Published every weekday at 07:00
      </Text>
      <Text size="large">
        A short lede paragraph sets the scene for the story and invites the reader further down the page.
      </Text>
      <Text>
        Body copy continues at the default size with the default line height, wrapping comfortably across
        the measure of the column.
      </Text>
    </Stack>
  ),
};
