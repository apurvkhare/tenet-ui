import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  args: { title: 'Heads up', children: 'This is an inline contextual message.' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] },
  },
};
export default meta;

type Story = StoryObj<typeof Banner>;

export const Info: Story = { args: { variant: 'info' } };
export const Success: Story = { args: { variant: 'success', title: 'Saved', children: 'Your changes are live.' } };
export const Warning: Story = { args: { variant: 'warning', title: 'Approaching limit' } };
export const Danger: Story = { args: { variant: 'danger', title: 'Build failed', children: '3 tests are failing.' } };
export const Dismissible: Story = {
  args: { variant: 'info', onDismiss: () => {} },
};
