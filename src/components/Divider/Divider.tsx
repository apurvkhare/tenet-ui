import { forwardRef } from 'react';
import type { DividerProps } from './Divider.types';
import './Divider.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet divider — a hairline separator. Vertical or horizontal; horizontal optionally carries a
 * centered label ("OR"). Exposes `role="separator"` with the right orientation so it's a real
 * landmark, not a styled border.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = 'horizontal', className, children, ...rest },
  ref,
) {
  const labelled = orientation === 'horizontal' && children != null;
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cx(
        'Tenet-Divider',
        `Tenet-Divider--${orientation}`,
        labelled && 'Tenet-Divider--labelled',
        className,
      )}
      {...rest}
    >
      {labelled && <span className="Tenet-Divider__label">{children}</span>}
    </div>
  );
});
