import { forwardRef } from 'react';
import type { CardProps } from './Card.types';
import './Card.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Acme surface container — a bordered, rounded panel for grouping content (the design-system
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
      className={cx('Acme-Card', `Acme-Card--variant-${variant}`, `Acme-Card--padding-${padding}`, className)}
      {...rest}
    >
      {children}
    </div>
  );
});
