import type { ReactNode } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastOptions {
  /** Semantic tone. */
  variant?: ToastVariant;
  /** Optional bold lead-in line. */
  title?: ReactNode;
  /** Main message. */
  message: ReactNode;
  /** Auto-dismiss after N ms. 0 keeps it until dismissed. */
  duration?: number;
}

export interface ToastEntry extends ToastOptions {
  id: string;
}

export interface ToastContextValue {
  /** Show a toast; returns its id. */
  toast: (options: ToastOptions) => string;
  /** Dismiss a toast by id. */
  dismiss: (id: string) => void;
}

export interface ToastProviderProps {
  /** Default auto-dismiss duration (ms) when an individual toast doesn't set one. */
  duration?: number;
  /** Viewport corner. */
  placement?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  children?: ReactNode;
}
