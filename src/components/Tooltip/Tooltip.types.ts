import type { ReactElement, ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip text/content. */
  content: ReactNode;
  /** Side of the trigger to render on. */
  placement?: TooltipPlacement;
  /** The single trigger element (must be focusable for keyboard users). */
  children: ReactElement;
  className?: string;
}
