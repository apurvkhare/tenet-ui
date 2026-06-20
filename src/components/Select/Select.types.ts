import type { SelectHTMLAttributes, ReactNode } from 'react';

export type SelectSize = 'small' | 'medium' | 'large';

// Omit native numeric `size` so our token-based scale can use the name.
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Control height / font scale. */
  size?: SelectSize;
  /** Stretch to fill the available width. */
  block?: boolean;
  /** Mark the field invalid (sets aria-invalid and a danger border). */
  invalid?: boolean;
  /** Placeholder shown as a disabled first option when no value is selected. */
  placeholder?: string;
  /** `<option>` / `<optgroup>` elements. */
  children?: ReactNode;
}
