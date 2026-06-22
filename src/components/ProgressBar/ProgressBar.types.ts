import type { HTMLAttributes } from 'react';

export type ProgressBarSize = 'small' | 'medium';

export type ProgressBarVariant = 'accent' | 'success' | 'danger';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Current progress, from 0 to `max`. Values are clamped into range.
   * Omit (or pass `undefined`) for an INDETERMINATE bar that shows an
   * animated sweep instead of a fixed fill.
   */
  value?: number;
  /** Upper bound of the scale. Defaults to 100. */
  max?: number;
  /** Track/fill height from the size scale. Defaults to 'medium'. */
  size?: ProgressBarSize;
  /** Fill color, mapped to the matching emphasis token. Defaults to 'accent'. */
  variant?: ProgressBarVariant;
}
