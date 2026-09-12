import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  args: { 'aria-label': 'Description', placeholder: 'Describe the issue…', fullWidth: true },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Invalid: Story = {
  args: { invalid: true, defaultValue: 'too short' },
};
