import type { ReactNode } from 'react';

export type DialogSize = 'small' | 'medium' | 'large';

export interface DialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the user requests close (Escape, backdrop, close button). */
  onClose: () => void;
  /** Accessible title — also the visible heading. */
  title: ReactNode;
  /** Optional supporting description under the title. */
  description?: ReactNode;
  /** Width from the scale. */
  size?: DialogSize;
  /** Footer actions (e.g. Cancel / Confirm buttons). */
  footer?: ReactNode;
  /** Allow closing by clicking the backdrop. */
  closeOnBackdrop?: boolean;
  /** Body content. */
  children?: ReactNode;
  className?: string;
}
