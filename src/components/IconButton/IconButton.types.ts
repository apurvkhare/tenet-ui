import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonVariant = 'default' | 'primary' | 'danger' | 'invisible';
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The icon to render. This is the only visible content, so the button must also have an accessible name. */
  icon: ReactNode;
  /** Visual style of the button. Use `primary` for the single most important action per surface. */
  variant?: IconButtonVariant;
  /** Square control size (height = width), mapped to the control-height tokens. */
  size?: IconButtonSize;
}
