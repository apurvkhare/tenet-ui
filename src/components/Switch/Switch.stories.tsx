import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  args: { label: 'Enable notifications' },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium'] },
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const On: Story = {
  args: { defaultChecked: true },
};

export const WithCaption: Story = {
  name: 'With caption',
  args: { caption: 'Send me an email when something happens.' },
};

export const Small: Story = {
  args: { size: 'small', defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
};
