import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface TabsProps {
  /** Controlled active tab value. */
  value?: string;
  /** Uncontrolled initial active tab value. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onChange?: (value: string) => void;
  children?: ReactNode;
  className?: string;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the tablist. */
  'aria-label'?: string;
  children?: ReactNode;
}

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Value this tab selects — must match a `Tabs.Panel` value. */
  value: string;
  /** Disable this tab. */
  disabled?: boolean;
  children?: ReactNode;
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Value this panel is shown for. */
  value: string;
  children?: ReactNode;
}
