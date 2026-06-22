import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: { content: 'Saves and publishes immediately' },
  argTypes: { placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] } },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Publish</Button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: { placement: 'bottom' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="primary">Hover or focus me</Button>
    </Tooltip>
  ),
};
