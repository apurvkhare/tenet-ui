import type { HTMLAttributes, ReactNode } from 'react';

export type LabelVariant = 'default' | 'accent' | 'success' | 'danger' | 'muted';
export type LabelSize = 'small' | 'medium';

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color scheme. Pick by meaning (success/danger/accent), not by raw color. */
  variant?: LabelVariant;
  /** Label size. */
  size?: LabelSize;
  children?: ReactNode;
}
