import type { ButtonHTMLAttributes } from 'react';

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectOption {
  /** Value submitted / reported on change. */
  value: string;
  /** Visible option text. */
  label: string;
  /** Disable this option. */
  disabled?: boolean;
}

// Extends the trigger button's attrs so consumers can pass data-*, style, onBlur, etc.
// (value/defaultValue/onChange are re-typed for the combobox.)
export interface SelectProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'defaultValue'> {
  /** The options to choose from. */
  options: SelectOption[];
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Called with the newly selected value. */
  onChange?: (value: string) => void;
  /** Text shown when nothing is selected. */
  placeholder?: string;
  /** Control height / font scale. */
  size?: SelectSize;
  /** Stretch to fill the available width. */
  block?: boolean;
  /** Invalid state (danger border + aria-invalid). */
  invalid?: boolean;
  /** Disable the control. */
  disabled?: boolean;
  /** Required (sets aria-required; pairs with FormControl). */
  required?: boolean;
  /** Form field name — emits a hidden input so the value submits with a form. */
  name?: string;
  /** Id applied to the trigger (FormControl sets this automatically). */
  id?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}
