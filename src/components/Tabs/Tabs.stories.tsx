import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <Tabs.List aria-label="Repository sections">
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="issues">Issues</Tabs.Tab>
        <Tabs.Tab value="pulls">Pull requests</Tabs.Tab>
        <Tabs.Tab value="settings" disabled>
          Settings
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">The project overview lives here.</Tabs.Panel>
      <Tabs.Panel value="issues">42 open issues.</Tabs.Panel>
      <Tabs.Panel value="pulls">3 open pull requests.</Tabs.Panel>
      <Tabs.Panel value="settings">Settings.</Tabs.Panel>
    </Tabs>
  ),
  // ARIA tabs: click the second tab → aria-selected moves and its panel renders; ArrowRight moves
  // focus AND selection (selection follows focus) to the next enabled tab.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const overview = canvas.getByRole('tab', { name: 'Overview' });
    const issues = canvas.getByRole('tab', { name: 'Issues' });
    await expect(overview).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(issues);
    await expect(issues).toHaveAttribute('aria-selected', 'true');
    await expect(overview).toHaveAttribute('aria-selected', 'false');
    const panel = canvas.getByRole('tabpanel');
    await expect(panel).toBeVisible();
    await expect(panel).toHaveTextContent('42 open issues.');
    await expect(panel).toHaveAttribute('aria-labelledby', issues.id);

    await userEvent.keyboard('{ArrowRight}');
    const pulls = canvas.getByRole('tab', { name: 'Pull requests' });
    await expect(pulls).toHaveFocus();
    await expect(pulls).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('3 open pull requests.');
  },
};
