import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'muted';
export type CardPadding = 'none' | 'condensed' | 'normal' | 'spacious';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Surface style. `default` sits on the page; `muted` is a recessed/secondary surface. */
  variant?: CardVariant;
  /** Inner padding, from the `space` scale. */
  padding?: CardPadding;
  children?: ReactNode;
}
