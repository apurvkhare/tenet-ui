import type { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visible label rendered next to the box. */
  label?: ReactNode;
  /** Optional helper text under the label. */
  caption?: ReactNode;
}
