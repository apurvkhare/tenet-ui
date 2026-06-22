import { forwardRef } from 'react';
import type { IconButtonProps } from './IconButton.types';
import './IconButton.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet icon-only button — a square control whose only visible content is an icon. Use it for
 * compact actions in toolbars, table rows, and dialog corners where a text label won't fit. For
 * anything with room for a label, prefer `Button` (a labelled button is always clearer).
 *
 * Because there is no visible text, an IconButton MUST be given an accessible name via `aria-label`
 * (or `aria-labelledby`) — otherwise screen-reader users hear nothing. The icon itself is rendered
 * `aria-hidden`, so the name has to come from the prop.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon,
    variant = 'default',
    size = 'medium',
    type = 'button',
    className,
    ...rest
  },
  ref,
) {
  const nodeEnv = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV;
  if (nodeEnv !== 'production') {
    const hasName = Boolean(rest['aria-label'] || rest['aria-labelledby']);
    if (!hasName) {
      // eslint-disable-next-line no-console
      console.warn(
        'IconButton: no accessible name. An icon-only button needs aria-label (or aria-labelledby) ' +
          'so screen-reader users know what it does.',
      );
    }
  }

  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'Tenet-IconButton',
        `Tenet-IconButton--variant-${variant}`,
        `Tenet-IconButton--size-${size}`,
        className,
      )}
      {...rest}
    >
      <span className="Tenet-IconButton__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
});
