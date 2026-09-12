import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { name: 'Avery Kim' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large', 'xlarge'] },
    shape: { control: 'inline-radio', options: ['circle', 'rounded'] },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {};
export const Image: Story = {
  args: { src: 'https://i.pravatar.cc/96?img=12', name: 'Sam Rivera' },
};
export const Org: Story = {
  name: 'Org (rounded)',
  args: { name: 'design-tokens', shape: 'rounded' },
};
export const Large: Story = { args: { size: 'xlarge' } };
