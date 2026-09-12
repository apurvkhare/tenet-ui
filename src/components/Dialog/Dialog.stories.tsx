import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Dialog } from './Dialog';
import { Button } from '../Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Delete repository</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Delete repository?"
          description="This action cannot be undone."
          footer={
            <>
              <Button variant="invisible" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          This will permanently delete <strong>web-client</strong> and all of its history.
        </Dialog>
      </>
    );
  },
  // Open via the trigger → modal dialog is visible with focus trapped inside → Escape closes it and
  // returns focus to the trigger. The Dialog portals to <body>, so query the document, not the canvas.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Delete repository' });
    await userEvent.click(trigger);

    const dialog = await body.findByRole('dialog', { name: 'Delete repository?' });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await waitFor(() => expect(dialog.contains(canvasElement.ownerDocument.activeElement)).toBe(true));

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
  },
};
