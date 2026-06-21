import { forwardRef } from 'react';
import type { StackItemProps, StackProps } from './Stack.types';
import './Stack.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet layout primitive. Composes children along one axis with token-based spacing —
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
        'Tenet-Stack',
        `Tenet-Stack--direction-${direction}`,
        `Tenet-Stack--gap-${gap}`,
        align && `Tenet-Stack--align-${align}`,
        justify && `Tenet-Stack--justify-${justify}`,
        wrap && 'Tenet-Stack--wrap',
        padding && `Tenet-Stack--padding-${padding}`,
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
    <div ref={ref} className={cx('Tenet-Stack__item', grow && 'Tenet-Stack__item--grow', className)} {...rest}>
      {children}
    </div>
  );
});

export const Stack = Object.assign(StackRoot, { Item: StackItem });
