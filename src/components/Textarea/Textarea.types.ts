import type { TextareaHTMLAttributes } from 'react';

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Stretch to fill the available width. */
  block?: boolean;
  /** Mark the field invalid (sets aria-invalid and a danger border). */
  invalid?: boolean;
  /** Which directions the user may resize. */
  resize?: TextareaResize;
}
