import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import './Button.css';
import { resolveFullWidth } from '../../internal/deprecate';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet action button. Use `variant="primary"` for the single most important action on a
 * surface, `default` for secondary actions, `invisible` for tertiary, and `danger` for
 * destructive actions. All styling comes from design tokens — never hardcode colors or spacing.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'default',
    size = 'medium',
    leadingIcon,
    trailingIcon,
    fullWidth, block,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  const isFullWidth = resolveFullWidth('Button', fullWidth, block);
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'Tenet-Button',
        `Tenet-Button--variant-${variant}`,
        `Tenet-Button--size-${size}`,
        isFullWidth && 'Tenet-Button--fullWidth',
        className,
      )}
      {...rest}
    >
      {leadingIcon && (
        <span className="Tenet-Button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children && <span className="Tenet-Button__label">{children}</span>}
      {trailingIcon && (
        <span className="Tenet-Button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
});
