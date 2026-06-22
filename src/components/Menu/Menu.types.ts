import type { ReactElement, ReactNode } from 'react';

export interface MenuAction {
  type?: 'item';
  /** Visible label. */
  label: ReactNode;
  /** Invoked when the item is chosen (menu then closes). */
  onSelect: () => void;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Disable this item. */
  disabled?: boolean;
  /** Render in the danger color for destructive actions. */
  destructive?: boolean;
}

export interface MenuSeparator {
  type: 'separator';
}

export type MenuItem = MenuAction | MenuSeparator;

export interface MenuProps {
  /** The trigger element (e.g. a Button). It is wired with the menu's aria + click handling. */
  trigger: ReactElement;
  /** The actions to show. */
  items: MenuItem[];
  /** Accessible name for the menu. */
  'aria-label'?: string;
  /** Menu alignment relative to the trigger. */
  align?: 'start' | 'end';
  className?: string;
}
