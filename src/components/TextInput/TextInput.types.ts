import type { InputHTMLAttributes, ReactNode } from 'react';

export type TextInputSize = 'small' | 'medium' | 'large';

// Omit the native numeric `size` attribute so our token-based size scale can use the name.
export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Control height / font scale. */
  size?: TextInputSize;
  /** Stretch the field to fill the available width. */
  block?: boolean;
  /** Element rendered before the input (e.g. a search icon). */
  leadingVisual?: ReactNode;
  /** Element rendered after the input. */
  trailingVisual?: ReactNode;
  /** Mark the field as invalid (sets `aria-invalid` and a danger border). */
  invalid?: boolean;
}
