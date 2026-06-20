import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import './Button.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Acme action button. Use `variant="primary"` for the single most important action on a
 * surface, `default` for secondary actions, `invisible` for tertiary, and `danger` for
 * destructive actions. All styling comes from design tokens — never hardcode colors or spacing.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'default',
    size = 'medium',
    leadingIcon,
    trailingIcon,
    block = false,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'Acme-Button',
        `Acme-Button--variant-${variant}`,
        `Acme-Button--size-${size}`,
        block && 'Acme-Button--block',
        className,
      )}
      {...rest}
    >
      {leadingIcon && (
        <span className="Acme-Button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children && <span className="Acme-Button__label">{children}</span>}
      {trailingIcon && (
        <span className="Acme-Button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
});
