import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import { Icon } from './Icon';
import type { IconGlyphProps } from './Icon.types';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import * as icons from '../../icons';
import {
  SearchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  PlusIcon,
  ChevronDownIcon,
  SettingsIcon,
  TrashIcon,
  MoreHorizontalIcon,
} from '../../icons';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  args: { size: 16 },
  argTypes: {
    size: { control: 'select', options: [16, 20, 24] },
    label: { control: 'text' },
    children: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: (args) => <SearchIcon {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
      <SearchIcon size={16} />
      <SearchIcon size={20} />
      <SearchIcon size={24} />
    </div>
  ),
};

/** A lone status glyph carries meaning, so it gets a `label` (role="img"). */
export const Labeled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
      <span style={{ color: 'var(--fgColor-success)' }}>
        <CheckCircleIcon label="Published" />
      </span>
      <span style={{ color: 'var(--fgColor-attention)' }}>
        <AlertTriangleIcon label="Needs review" />
      </span>
    </div>
  ),
};

const glyphs = Object.entries(icons).filter(([name]) => name !== 'Icon') as Array<
  [string, ComponentType<IconGlyphProps>]
>;

/** Every glyph in the set (from src/icons) with its component name. */
export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 'var(--space-3)',
      }}
    >
      {glyphs.map(([name, Glyph]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-3)',
            border: 'var(--borderWidth-thin) solid var(--borderColor-default)',
            borderRadius: 'var(--borderRadius-medium)',
            color: 'var(--fgColor-default)',
          }}
        >
          <Glyph size={24} />
          <code style={{ fontFamily: 'var(--fontFamily-mono)', fontSize: 'var(--fontSize-0)' }}>{name}</code>
        </div>
      ))}
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      <Button variant="primary" leadingIcon={<PlusIcon />}>
        New article
      </Button>
      <Button trailingIcon={<ChevronDownIcon />}>More actions</Button>
      <Button size="large" leadingIcon={<PlusIcon size={20} />}>
        Large with icon
      </Button>
    </div>
  ),
};

export const InIconButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
      <IconButton icon={<SettingsIcon />} aria-label="Settings" />
      <IconButton icon={<MoreHorizontalIcon />} variant="invisible" aria-label="Row actions" />
      <IconButton icon={<TrashIcon />} variant="danger" aria-label="Delete row" />
    </div>
  ),
};
