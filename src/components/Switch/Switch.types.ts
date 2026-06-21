import type { InputHTMLAttributes, ReactNode } from 'react';

export type SwitchSize = 'small' | 'medium';

// Omit the native numeric `size` attribute so our token-based size scale can use the name.
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label rendered next to the switch. */
  label?: ReactNode;
  /** Optional helper text under the label. */
  caption?: ReactNode;
  /** Control track / knob scale. */
  size?: SwitchSize;
  /** Mark the field as invalid (sets `aria-invalid` and a danger border). */
  invalid?: boolean;
}
