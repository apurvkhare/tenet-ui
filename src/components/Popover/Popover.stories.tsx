import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './Popover';
import { Button } from '../Button';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover aria-label="Filters" trigger={<Button>Filters ▾</Button>}>
      <p style={{ margin: 0 }}>Tweak how results are shown.</p>
      <Button>Apply</Button>
    </Popover>
  ),
};

export const TopEnd: Story = {
  render: () => (
    <div style={{ marginTop: 240 }}>
      <Popover aria-label="Account" placement="top-end" trigger={<Button>Account ▾</Button>}>
        <p style={{ margin: 0 }}>Signed in as editor.</p>
        <Button variant="invisible">Sign out</Button>
      </Popover>
    </div>
  ),
};
