import type { TextareaHTMLAttributes } from 'react';

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';
export type TextareaSize = 'small' | 'medium' | 'large';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Stretch to fill the available width. */
  block?: boolean;
  /** Mark the field invalid (sets aria-invalid and a danger border). */
  invalid?: boolean;
  /** Which directions the user may resize. */
  resize?: TextareaResize;
  /** Padding / font scale — matches TextInput so fields line up in a form. */
  size?: TextareaSize;
}
