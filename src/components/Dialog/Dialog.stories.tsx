import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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
};
