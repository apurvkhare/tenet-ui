import { forwardRef } from 'react';
import type { CardProps } from './Card.types';
import './Card.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet surface container — a bordered, rounded panel for grouping content (the design-system
 * way to make a "box"). Border, radius, background and elevation all come from tokens; never
 * hand-roll a styled `<div>` with hardcoded border/shadow values.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', padding = 'normal', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('Tenet-Card', `Tenet-Card--variant-${variant}`, `Tenet-Card--padding-${padding}`, className)}
      {...rest}
    >
      {children}
    </div>
  );
});
