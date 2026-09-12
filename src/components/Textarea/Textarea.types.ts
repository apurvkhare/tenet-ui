import type { TextareaHTMLAttributes } from 'react';

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';
export type TextareaSize = 'small' | 'medium' | 'large';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Stretch to fill the available width. */
  fullWidth?: boolean;
  /**
   * Stretch to fill the available width.
   * @deprecated Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.5.0.
   */
  block?: boolean;
  /** Mark the field invalid (sets aria-invalid and a danger border). */
  invalid?: boolean;
  /** Which directions the user may resize. */
  resize?: TextareaResize;
  /** Padding / font scale — matches TextInput so fields line up in a form. */
  size?: TextareaSize;
}
