import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  render: () => (
    <Accordion type="single" defaultValue={['a']}>
      <Accordion.Item value="a" title="What is a design token?">
        A named, themeable value (color, space, radius) — the single source of truth for styling.
      </Accordion.Item>
      <Accordion.Item value="b" title="Why not hardcode colors?">
        Hardcoded values can't be themed or audited and drift out of sync across the app.
      </Accordion.Item>
      <Accordion.Item value="c" title="Disabled section" disabled>
        Not available.
      </Accordion.Item>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['a', 'b']}>
      <Accordion.Item value="a" title="First">First content.</Accordion.Item>
      <Accordion.Item value="b" title="Second">Second content.</Accordion.Item>
    </Accordion>
  ),
};
