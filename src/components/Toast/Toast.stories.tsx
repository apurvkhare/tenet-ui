import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
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
  // Clicking a trigger enqueues a toast in the portaled live region: a polite role=status carrying
  // the title and message (danger toasts use role=alert instead).
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Success' }));

    const toast = await body.findByRole('status');
    // The toast animates in from opacity 0 (Tenet-Toast-in, 160ms); wait for it to settle.
    await waitFor(() => expect(toast).toBeVisible());
    await expect(toast).toHaveTextContent('Saved');
    await expect(toast).toHaveTextContent('Your changes are live.');
    await expect(body.getByRole('region', { name: 'Notifications' })).toContainElement(toast);
    await expect(within(toast).getByRole('button', { name: 'Dismiss' })).toBeVisible();
  },
};
