import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  args: {
    href: '#',
    children: 'View the documentation',
  },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const Muted: Story = {
  args: { muted: true },
};

export const AlwaysUnderlined: Story = {
  name: 'Always underlined',
  args: { underline: 'always' },
};

export const NoUnderline: Story = {
  name: 'No underline',
  args: { underline: 'none' },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    children: 'Open the changelog',
  },
};
