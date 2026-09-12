import type { ReactElement, ReactNode } from 'react';

export type PopoverPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface PopoverProps {
  /**
   * The trigger element (e.g. a Button). It is cloned and wired with
   * `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`, an onClick toggle,
   * and a ref so focus can be restored to it on close.
   */
  trigger: ReactElement;
  /** The floating content rendered inside the popover surface. */
  children: ReactNode;
  /** Where the surface is anchored relative to the trigger. */
  placement?: PopoverPlacement;
  /**
   * Accessible name for the popover dialog (falls back to "Popover").
   * @default Popover
   */
  'aria-label'?: string;
  className?: string;
}
