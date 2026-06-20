import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'default' | 'primary' | 'danger' | 'invisible';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. Use `primary` for the single most important action per surface. */
  variant?: ButtonVariant;
  /** Control height / padding scale. */
  size?: ButtonSize;
  /** Icon rendered before the label. */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: ReactNode;
  /** Stretch the button to fill the available width. */
  block?: boolean;
  /** Button label. */
  children?: ReactNode;
}
