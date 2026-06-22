import { cloneElement, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactElement } from 'react';
import type { PopoverProps } from './Popover.types';
import './Popover.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Tenet popover — a generic floating container anchored to a trigger (the ARIA non-modal dialog
 * pattern). On open, focus moves into the surface; Escape closes and returns focus to the trigger;
 * clicking outside closes; and focus leaving the wrapper (Tab-out) closes it so it can't strand
 * open behind the page. This is **non-modal**: it does not trap focus, lock scroll, or hide the
 * background — reach for `Dialog` when you need those. Always give it an accessible name via
 * `aria-label`.
 */
export function Popover({
  trigger,
  children,
  placement = 'bottom-start',
  'aria-label': ariaLabel,
  className,
}: PopoverProps) {
  const reactId = useId();
  const dialogId = `${reactId}-dialog`;
  const triggerId = `${reactId}-trigger`;

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  // Close on outside click (mousedown so it fires before focus shifts).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Move focus into the surface on open: first focusable child, else the dialog container.
  useEffect(() => {
    if (!open) return;
    const surface = wrapRef.current?.querySelector<HTMLElement>('.Tenet-Popover__surface');
    const first = surface?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? surface)?.focus();
  }, [open]);

  const triggerEl = cloneElement(trigger as ReactElement<Record<string, unknown>>, {
    id: triggerId,
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
    },
    'aria-haspopup': 'dialog',
    'aria-expanded': open,
    'aria-controls': open ? dialogId : undefined,
    onClick: () => setOpen((o) => !o),
  });

  return (
    <span
      ref={wrapRef}
      className={cx('Tenet-Popover', className)}
      onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Escape' && open) {
          e.preventDefault();
          close();
        }
      }}
      onBlur={(e) => {
        // Focus leaving the wrapper (Tab-out) closes the popover without stealing focus back.
        if (open && !wrapRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      {triggerEl}
      {open && (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="false"
          aria-label={ariaLabel ?? 'Popover'}
          tabIndex={-1}
          className={cx('Tenet-Popover__surface', `Tenet-Popover--placement-${placement}`)}
        >
          {children}
        </div>
      )}
    </span>
  );
}
