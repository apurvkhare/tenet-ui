import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';
import { Card } from '../Card';
import { Heading } from '../Heading';
import { Stack } from '../Stack';

import { InboxIcon, SearchIcon } from '../../icons';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  args: {
    title: 'No stories yet',
    description: 'Stories you create or are assigned to will appear here.',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['medium', 'large'] },
    headingLevel: { control: 'inline-radio', options: [2, 3, 4] },
    icon: { control: false },
    action: { control: false },
    secondaryAction: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};

export const TitleOnly: Story = {
  name: 'Title only',
  args: { title: "You're all caught up", description: undefined },
};

export const WithIcon: Story = {
  name: 'With icon',
  args: { icon: <InboxIcon size={24} /> },
};

export const WithActions: Story = {
  name: 'With actions',
  args: {
    icon: <InboxIcon size={24} />,
    action: <Button variant="primary">Create story</Button>,
    secondaryAction: <Button variant="invisible">Import from CMS</Button>,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    headingLevel: 2,
    icon: <InboxIcon size={24} />,
    action: <Button variant="primary" size="large">
      Create your first story
    </Button>,
  },
};

export const SearchResults: Story = {
  name: 'Search results (composed)',
  render: () => (
    <Stack gap="normal">
      <Heading level={2}>Stories</Heading>
      <Card padding="none">
        <EmptyState
          headingLevel={3}
          icon={<SearchIcon size={24} />}
          title="No results for “budget”"
          description="Try a different spelling, or clear the filters to see every story."
          action={<Button>Clear filters</Button>}
        />
      </Card>
    </Stack>
  ),
};
