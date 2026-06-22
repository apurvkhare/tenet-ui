import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button';
import { Stack } from '../Stack';

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
};
export default meta;

type Story = StoryObj<typeof ToastProvider>;

function Demo() {
  const { toast } = useToast();
  return (
    <Stack direction="horizontal" gap="condensed" wrap>
      <Button onClick={() => toast({ variant: 'success', title: 'Saved', message: 'Your changes are live.' })}>
        Success
      </Button>
      <Button onClick={() => toast({ variant: 'danger', title: 'Failed', message: 'Could not save.' })}>
        Danger
      </Button>
      <Button onClick={() => toast({ variant: 'info', message: 'Heads up — new version available.' })}>
        Info
      </Button>
    </Stack>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
