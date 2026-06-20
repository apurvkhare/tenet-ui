import { forwardRef } from 'react';
import type { StackItemProps, StackProps } from './Stack.types';
import './Stack.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Acme layout primitive. Composes children along one axis with token-based spacing —
 * use this instead of hand-rolling `display: flex` with hardcoded gaps. All spacing comes
 * from the `space` scale; never inline pixel gaps or margins.
 */
const StackRoot = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { direction = 'vertical', gap = 'normal', align, justify, wrap = false, padding, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'Acme-Stack',
        `Acme-Stack--direction-${direction}`,
        `Acme-Stack--gap-${gap}`,
        align && `Acme-Stack--align-${align}`,
        justify && `Acme-Stack--justify-${justify}`,
        wrap && 'Acme-Stack--wrap',
        padding && `Acme-Stack--padding-${padding}`,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

/** A child of `Stack` that can grow to fill the available space (e.g. a search field in a toolbar). */
const StackItem = forwardRef<HTMLDivElement, StackItemProps>(function StackItem(
  { grow = false, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('Acme-Stack__item', grow && 'Acme-Stack__item--grow', className)} {...rest}>
      {children}
    </div>
  );
});

export const Stack = Object.assign(StackRoot, { Item: StackItem });
