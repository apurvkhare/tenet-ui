import type { Meta, StoryObj } from '@storybook/react';
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
};
