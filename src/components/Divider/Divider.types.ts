import type { HTMLAttributes, ReactNode } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Layout direction. */
  orientation?: DividerOrientation;
  /** Optional centered label (horizontal only). */
  children?: ReactNode;
}
