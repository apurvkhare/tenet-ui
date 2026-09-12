import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  render: () => (
    <Accordion type="single" defaultValue={['a']}>
      <Accordion.Item value="a" title="What is a design token?">
        A named, themeable value (color, space, radius) — the single source of truth for styling.
      </Accordion.Item>
      <Accordion.Item value="b" title="Why not hardcode colors?">
        Hardcoded values can't be themed or audited and drift out of sync across the app.
      </Accordion.Item>
      <Accordion.Item value="c" title="Disabled section" disabled>
        Not available.
      </Accordion.Item>
    </Accordion>
  ),
  // Disclosure: clicking a collapsed header sets aria-expanded=true and reveals its labelled
  // region; with type="single" the previously open item collapses.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('button', { name: 'What is a design token?' });
    const second = canvas.getByRole('button', { name: 'Why not hardcode colors?' });
    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await expect(second).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(second);
    await expect(second).toHaveAttribute('aria-expanded', 'true');
    const panel = canvas.getByRole('region', { name: 'Why not hardcode colors?' });
    await expect(panel).toBeVisible();
    await expect(panel).toHaveTextContent(/drift out of sync/);
    await expect(first).toHaveAttribute('aria-expanded', 'false');
    await expect(canvas.queryByRole('region', { name: 'What is a design token?' })).not.toBeInTheDocument();
  },
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['a', 'b']}>
      <Accordion.Item value="a" title="First">First content.</Accordion.Item>
      <Accordion.Item value="b" title="Second">Second content.</Accordion.Item>
    </Accordion>
  ),
};
