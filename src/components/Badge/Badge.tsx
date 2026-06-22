import { forwardRef } from 'react';
import type { BadgeProps } from './Badge.types';
import './Badge.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet badge — a small count or status dot, typically anchored to an icon or nav item. Use it for
 * quantities ("3 unread") or presence dots. For a labelled status word (passing/failing) use
 * `Label` instead.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', count, max = 99, dot = false, className, children, ...rest },
  ref,
) {
  const content =
    children ?? (count != null ? (count > max ? `${max}+` : String(count)) : undefined);

  return (
    <span
      ref={ref}
      // A bare dot is decorative; meaning must come from the labelled control it sits on.
      aria-hidden={dot ? true : undefined}
      className={cx('Tenet-Badge', `Tenet-Badge--variant-${variant}`, dot && 'Tenet-Badge--dot', className)}
      {...rest}
    >
      {!dot && content}
    </span>
  );
});
