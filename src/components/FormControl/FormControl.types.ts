import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';

export type ValidationVariant = 'error' | 'success';

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  /** Override the generated id shared by the label and field. */
  id?: string;
  /** Marks the field required (asterisk on the label + `required` on the input). */
  required?: boolean;
  /** Disables the field. */
  disabled?: boolean;
  /** Force the invalid state. Otherwise inferred from a `FormControl.Validation variant="error"`. */
  invalid?: boolean;
  children?: ReactNode;
}

export interface FormControlLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Visually hide the label but keep it for screen readers. */
  visuallyHidden?: boolean;
  /** Injected by FormControl — renders the required asterisk. */
  required?: boolean;
  children?: ReactNode;
}

export interface FormControlCaptionProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export interface FormControlValidationProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tone of the message. `error` also drives the field's invalid state. */
  variant?: ValidationVariant;
  children?: ReactNode;
}
