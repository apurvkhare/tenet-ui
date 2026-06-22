import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { DialogProps } from './Dialog.types';
import './Dialog.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Tenet dialog — a modal overlay rendered in a portal. Handles the things hand-rolled modals get
 * wrong: focus moves in on open and is restored on close, Tab is trapped inside, Escape and the
 * backdrop close it, body scroll is locked, and it's wired as `role="dialog" aria-modal` with the
 * title/description as its accessible name. Reach for it for focused tasks and confirmations.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  size = 'medium',
  footer,
  closeOnBackdrop = true,
  className,
  children,
}: DialogProps) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const panel = panelRef.current;
    if (!panel) return;
    const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null,
    );
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div
      className="Tenet-Dialog__backdrop"
      onMouseDown={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cx('Tenet-Dialog', `Tenet-Dialog--size-${size}`, className)}
        onKeyDown={onKeyDown}
      >
        <div className="Tenet-Dialog__header">
          <div className="Tenet-Dialog__headings">
            <h2 id={titleId} className="Tenet-Dialog__title">
              {title}
            </h2>
            {description && (
              <p id={descId} className="Tenet-Dialog__description">
                {description}
              </p>
            )}
          </div>
          <button type="button" className="Tenet-Dialog__close" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>
        {children && <div className="Tenet-Dialog__body">{children}</div>}
        {footer && <div className="Tenet-Dialog__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
