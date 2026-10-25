import { forwardRef } from 'react';
import type { LabelProps } from './Label.types';
import './Label.css';
import { warnDeprecated } from '../../internal/deprecate';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet status label / pill. Choose a `variant` by meaning (success, danger, accent) — the colors
 * are owned by the design system, so consumers never compute their own fills or borders. This is
 * the on-system replacement for a hand-styled `<span>` with hardcoded translucent colors.
 *
 * @deprecated Use `Tag` instead (since 0.4.0). `Tag` now carries the same status variants
 * (`success` / `danger` / `attention` / `muted` / `accent`) and is read-only when `onRemove` is
 * absent, so one pill component covers both status words and removable chips — and the name no
 * longer collides with `FormControl.Label`. `Label` keeps rendering until 0.6.0.
 */
export const Label = forwardRef<HTMLSpanElement, LabelProps>(function Label(
  { variant = 'default', size = 'medium', className, children, ...rest },
  ref,
) {
  warnDeprecated('Label', '<Label> is deprecated since 0.4.0 — use <Tag variant="…"> instead (same variants; read-only without onRemove). Label will be removed in 0.6.0.');
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
