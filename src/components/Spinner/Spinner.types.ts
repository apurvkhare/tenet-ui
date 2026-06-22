import type { HTMLAttributes } from 'react';

export type SpinnerSize = 'small' | 'medium' | 'large';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size from the scale. */
  size?: SpinnerSize;
  /** Accessible label announced to assistive tech (visually hidden). */
  label?: string;
}
