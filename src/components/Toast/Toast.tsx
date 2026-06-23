import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ToastContextValue, ToastEntry, ToastOptions, ToastProviderProps, ToastVariant } from './Toast.types';
import './Toast.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

const DEFAULT_ICON: Record<ToastVariant, string> = { info: 'ℹ', success: '✓', warning: '!', danger: '✕' };

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Hook to show toasts. Must be used under a `ToastProvider`.
 *   const { toast } = useToast();
 *   toast({ variant: 'success', title: 'Saved', message: 'Your changes are live.' });
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside a <ToastProvider>');
  return ctx;
}

function ToastItem({
  toast,
  onDismiss,
  defaultDuration,
}: {
  toast: ToastEntry;
  onDismiss: (id: string) => void;
  defaultDuration: number;
}) {
  const variant = toast.variant ?? 'info';
  const duration = toast.duration ?? defaultDuration;

  useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(t);
  }, [toast.id, duration, onDismiss]);

  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={cx('Tenet-Toast', `Tenet-Toast--variant-${variant}`)}
    >
      <span className="Tenet-Toast__icon" aria-hidden="true">
        {DEFAULT_ICON[variant]}
      </span>
      <div className="Tenet-Toast__content">
        {toast.title && <p className="Tenet-Toast__title">{toast.title}</p>}
        <div className="Tenet-Toast__message">{toast.message}</div>
      </div>
      <button
        type="button"
        className="Tenet-Toast__dismiss"
        aria-label="Dismiss"
        onClick={() => onDismiss(toast.id)}
      >
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
}

/**
 * Tenet toast provider — mounts a portalled, live-region viewport and exposes `useToast()` to any
 * descendant. Toasts auto-dismiss (configurable), can be dismissed manually, and are announced to
 * assistive tech (danger = assertive alert, others = polite status). Use toasts for transient,
 * non-blocking feedback; for inline contextual messages use `Banner`, for blocking flows `Dialog`.
 */
export function ToastProvider({ duration = 5000, placement = 'bottom-right', children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    idRef.current += 1;
    const id = String(idRef.current);
    setToasts((list) => [...list, { ...options, id }]);
    return id;
  }, []);

  const canPortal = typeof document !== 'undefined';

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {canPortal &&
        createPortal(
          <div
            className={cx('Tenet-Toast__viewport', `Tenet-Toast__viewport--${placement}`)}
            role="region"
            aria-label="Notifications"
            // Toasts sit above modals (z-index) and must stay announced while a Dialog is open;
            // this marks the layer so Dialog's aria-hidden sweep skips it. See Dialog.tsx.
            data-tenet-layer="toast"
          >
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onDismiss={dismiss} defaultDuration={duration} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
