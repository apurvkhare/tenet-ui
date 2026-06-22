import { forwardRef } from 'react';
import type { SpinnerProps } from './Spinner.types';
import './Spinner.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet spinner — an indeterminate loading indicator. Renders `role="status"` with a visually
 * hidden label so screen readers announce the loading state. Inherits `currentColor`, so it tints
 * to whatever text color it sits in.
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'medium', label = 'Loading', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      className={cx('Tenet-Spinner', `Tenet-Spinner--size-${size}`, className)}
      {...rest}
    >
      <span className="Tenet-Spinner__circle" aria-hidden="true" />
      <span className="Tenet-visuallyHidden">{label}</span>
    </span>
  );
});
