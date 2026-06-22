import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {};
export const Labelled: Story = { args: { children: 'or' } };
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: 40, alignItems: 'center', gap: 12 }}>
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>
    ),
  ],
};
