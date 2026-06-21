import { forwardRef } from 'react';
import type { LabelProps } from './Label.types';
import './Label.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet status label / pill. Choose a `variant` by meaning (success, danger, accent) — the colors
 * are owned by the design system, so consumers never compute their own fills or borders. This is
 * the on-system replacement for a hand-styled `<span>` with hardcoded translucent colors.
 */
export const Label = forwardRef<HTMLSpanElement, LabelProps>(function Label(
  { variant = 'default', size = 'medium', className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('Tenet-Label', `Tenet-Label--variant-${variant}`, `Tenet-Label--size-${size}`, className)}
      {...rest}
    >
      {children}
    </span>
  );
});
