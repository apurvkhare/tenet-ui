import { cloneElement, useId, useRef, useState } from 'react';
import type { ReactElement, Ref } from 'react';
import { Portal, mergeRefs, useAnchoredPosition } from '../../internal/floating';
import type { TooltipProps } from './Tooltip.types';
import './Tooltip.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet tooltip — a small text hint shown on hover and on keyboard focus (not hover-only, so it's
 * reachable without a mouse). The trigger is described by the tooltip via `aria-describedby` (merged
 * with any the caller already set, not replaced); the bubble stays mounted so that association is
 * always valid. The bubble renders in a portal and is positioned to the viewport, so it can't be
 * clipped by an `overflow:hidden` ancestor or run off the screen near an edge. The trigger must be a
 * single focusable element. Never put essential-only info in a tooltip.
 */
export function Tooltip({ content, placement = 'top', children, className }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);

  const bubbleStyle = useAnchoredPosition({ open, anchorRef: triggerRef, floatingRef: bubbleRef, placement, gap: 8 });

  const child = children as ReactElement<{ 'aria-describedby'?: string; tabIndex?: number; disabled?: boolean }> & {
    ref?: Ref<HTMLElement>;
  };

  const nodeEnv = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV;
  if (nodeEnv !== 'production') {
    const type = (child as ReactElement).type;
    const focusableTags = ['button', 'a', 'input', 'select', 'textarea'];
    const looksFocusable =
      (typeof type === 'string' && focusableTags.includes(type)) ||
      typeof type !== 'string' ||
      child.props?.tabIndex != null;
    if (typeof type === 'string' && !looksFocusable) {
      // eslint-disable-next-line no-console
      console.warn(
        `Tooltip: trigger <${type}> is not focusable, so keyboard users can't reveal the tooltip. ` +
          `Use a focusable element (button/link/input) or add tabIndex={0}.`,
      );
    }
  }

  // Merge (don't clobber) the trigger's existing aria-describedby + ref.
  const describedBy = [child.props['aria-describedby'], id].filter(Boolean).join(' ');
  const trigger = cloneElement(child as ReactElement<Record<string, unknown>>, {
    'aria-describedby': describedBy,
    ref: mergeRefs(child.ref, (node: HTMLElement | null) => {
      triggerRef.current = node;
    }),
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
      <Portal>
        <span
          ref={bubbleRef}
          role="tooltip"
          id={id}
          style={bubbleStyle}
          className={cx('Tenet-Tooltip__bubble', open && 'Tenet-Tooltip__bubble--open')}
        >
          {content}
        </span>
      </Portal>
    </span>
  );
}
