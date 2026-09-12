import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Enable notifications' },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const WithCaption: Story = {
  name: 'With caption',
  args: { label: 'Watch this repository', caption: 'Get notified of all activity.' },
};

export const Checked: Story = {
  args: { defaultChecked: true },
};
