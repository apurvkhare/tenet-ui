import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormControl } from './FormControl';
import { TextInput } from '../TextInput';

const meta: Meta<typeof FormControl> = {
  title: 'Components/FormControl',
  component: FormControl,
};
export default meta;

type Story = StoryObj<typeof FormControl>;

export const TextField: Story = {
  render: () => (
    <FormControl>
      <FormControl.Label>Repository name</FormControl.Label>
      <TextInput placeholder="my-project" />
    </FormControl>
  ),
};

export const RequiredWithCaption: Story = {
  name: 'Required with caption',
  render: () => (
    <FormControl required>
      <FormControl.Label>Email</FormControl.Label>
      <TextInput type="email" placeholder="you@example.com" />
      <FormControl.Caption>We'll only use this for security notifications.</FormControl.Caption>
    </FormControl>
  ),
};

export const WithError: Story = {
  name: 'With error',
  render: () => (
    <FormControl required>
      <FormControl.Label>Email</FormControl.Label>
      <TextInput type="email" defaultValue="not-an-email" />
      <FormControl.Validation variant="error">Enter a valid email address.</FormControl.Validation>
    </FormControl>
  ),
};
