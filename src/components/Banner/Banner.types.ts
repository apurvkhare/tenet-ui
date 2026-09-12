import type { HTMLAttributes, ReactNode } from 'react';

export type BannerVariant = 'info' | 'success' | 'warning' | 'danger';

// Omit the native `title` attr so our ReactNode title prop can use the name.
export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Semantic tone. Pick by meaning, not color. */
  variant?: BannerVariant;
  /** Optional bold lead-in line. */
  title?: ReactNode;
  /**
   * Replace the default leading icon.
   * @default per variant
   */
  icon?: ReactNode;
  /** Hide the leading icon entirely. */
  hideIcon?: boolean;
  /** When provided, renders a dismiss button that calls this. */
  onDismiss?: () => void;
  /** Body content. */
  children?: ReactNode;
}
