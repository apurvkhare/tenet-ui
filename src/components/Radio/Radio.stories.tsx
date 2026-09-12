import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup label="Visibility" name="visibility" defaultValue="public">
      <Radio value="public" label="Public" />
      <Radio value="private" label="Private" />
      <Radio value="internal" label="Internal" />
    </RadioGroup>
  ),
};

export const WithCaptions: Story = {
  name: 'With captions',
  render: () => (
    <RadioGroup label="Merge method" name="merge" defaultValue="squash" caption="How commits are added to the base branch.">
      <Radio value="merge" label="Create a merge commit" caption="All commits are added via a merge commit." />
      <Radio value="squash" label="Squash and merge" caption="Commits are combined into one." />
      <Radio value="rebase" label="Rebase and merge" caption="Commits are rebased onto the base branch." />
    </RadioGroup>
  ),
};
