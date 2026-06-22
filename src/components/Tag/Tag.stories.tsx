import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  args: { children: 'Tag' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'accent'] },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
      <Tag variant="default">default</Tag>
      <Tag variant="accent">accent</Tag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
      <Tag size="small">small</Tag>
      <Tag size="medium">medium</Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
      <Tag leadingIcon="#">design</Tag>
      <Tag variant="accent" leadingIcon="#">
        engineering
      </Tag>
    </div>
  ),
};

export const Removable: Story = {
  render: () => {
    const [tags, setTags] = useState(['Design', 'Engineering', 'Research']);
    return (
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        {tags.map((t) => (
          <Tag key={t} variant="accent" onRemove={() => setTags((cur) => cur.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
        {tags.length === 0 && <span style={{ color: 'var(--fgColor-muted)' }}>All filters cleared.</span>}
      </div>
    );
  },
};
