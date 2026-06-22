import { cloneElement, useId, useState } from 'react';
import type { ReactElement } from 'react';
import type { TooltipProps } from './Tooltip.types';
import './Tooltip.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet tooltip — a small text hint shown on hover and on keyboard focus (not hover-only, so it's
 * reachable without a mouse). The trigger is described by the tooltip via `aria-describedby`; the
 * bubble stays mounted and toggles visibility so that association is always valid. The trigger must
 * be a single focusable element. Never put essential-only info in a tooltip.
 */
export function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  const nodeEnv = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV;
  if (nodeEnv !== 'production') {
    const type = (children as ReactElement).type;
    const focusableTags = ['button', 'a', 'input', 'select', 'textarea'];
    const props = (children as ReactElement<{ tabIndex?: number; disabled?: boolean }>).props;
    const looksFocusable =
      (typeof type === 'string' && focusableTags.includes(type)) ||
      typeof type !== 'string' || // custom component — assume it forwards focus
      props?.tabIndex != null;
    if (typeof type === 'string' && !looksFocusable) {
      // eslint-disable-next-line no-console
      console.warn(
        `Tooltip: trigger <${type}> is not focusable, so keyboard users can't reveal the tooltip. ` +
          `Use a focusable element (button/link/input) or add tabIndex={0}.`,
      );
    }
  }

  const trigger = cloneElement(children as ReactElement<{ 'aria-describedby'?: string }>, {
    'aria-describedby': id,
  });

  return (
    <span
      className={cx('Tenet-Tooltip', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      {trigger}
      <span
        role="tooltip"
        id={id}
        className={cx('Tenet-Tooltip__bubble', `Tenet-Tooltip__bubble--${placement}`, open && 'Tenet-Tooltip__bubble--open')}
      >
        {content}
      </span>
    </span>
  );
}
