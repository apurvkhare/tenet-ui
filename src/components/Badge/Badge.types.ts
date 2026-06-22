import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'default' | 'accent' | 'success' | 'danger' | 'attention';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color scheme. */
  variant?: BadgeVariant;
  /** Numeric count. Rendered with a `max+` overflow when above `max`. */
  count?: number;
  /** Overflow threshold for `count` (e.g. 99 -> "99+"). */
  max?: number;
  /** Render a bare status dot (no text). */
  dot?: boolean;
  /** Custom content (overrides count). */
  children?: ReactNode;
}
