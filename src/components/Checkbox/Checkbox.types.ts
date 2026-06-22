import type { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visible label rendered next to the box. */
  label?: ReactNode;
  /** Optional helper text under the label. */
  caption?: ReactNode;
  /** Mark the field as invalid (sets `aria-invalid`). */
  invalid?: boolean;
  /** Tri-state "partially checked" visual (mixed); also sets `aria-checked="mixed"`. */
  indeterminate?: boolean;
}
