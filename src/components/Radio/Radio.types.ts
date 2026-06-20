import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** The value submitted when this radio is selected (required). */
  value: string;
  /** Visible label rendered next to the control. */
  label?: ReactNode;
  /** Optional helper text under the label. */
  caption?: ReactNode;
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /** Shared form field name. Auto-generated if omitted. */
  name?: string;
  /** Group label (rendered as a fieldset legend). */
  label: ReactNode;
  /** Optional helper text for the whole group. */
  caption?: ReactNode;
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial selected value. */
  defaultValue?: string;
  /** Called with the newly selected value. */
  onChange?: (value: string) => void;
  /** Mark the group required (asterisk on the legend). */
  required?: boolean;
  /** Disable every radio in the group. */
  disabled?: boolean;
  /** Radio children. */
  children?: ReactNode;
}
