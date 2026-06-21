import type { InputHTMLAttributes } from 'react';

export type NumberInputSize = 'small' | 'medium' | 'large';

// Omit native `size` (token scale), plus value/onChange (we expose number-typed versions).
export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange'> {
  /** Controlled value. Use `null`/`undefined` for an empty field. */
  value?: number | null;
  /** Uncontrolled initial value. */
  defaultValue?: number | null;
  /** Called with the parsed numeric value (or `null` when the field is cleared). */
  onChange?: (value: number | null) => void;
  /** Smallest allowed value. Stepping/clamping respects it. */
  min?: number;
  /** Largest allowed value. Stepping/clamping respects it. */
  max?: number;
  /** Increment applied by the steppers and arrow keys. */
  step?: number;
  /** Control height / font scale. */
  size?: NumberInputSize;
  /** Stretch the field to fill the available width. */
  block?: boolean;
  /** Mark the field as invalid (sets `aria-invalid` and a danger border). */
  invalid?: boolean;
}
