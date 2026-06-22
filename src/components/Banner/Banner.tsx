import { forwardRef } from 'react';
import type { BannerProps, BannerVariant } from './Banner.types';
import './Banner.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

const DEFAULT_ICON: Record<BannerVariant, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '!',
  danger: '✕',
};

/**
 * Tenet banner — an inline, contextual message tied to the content it sits near (form error,
 * page-level notice). Colors come from the semantic tint tokens. For transient, floating messages
 * use a toast instead; for a status word on a row, use `Label`.
 */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { variant = 'info', title, icon, hideIcon = false, onDismiss, className, children, ...rest },
  ref,
) {
  // Errors should interrupt assistive tech; lower-severity notices announce politely.
  const role = variant === 'danger' ? 'alert' : 'status';
  return (
    <div
      ref={ref}
      role={role}
      className={cx('Tenet-Banner', `Tenet-Banner--variant-${variant}`, className)}
      {...rest}
    >
      {!hideIcon && (
        <span className="Tenet-Banner__icon" aria-hidden="true">
          {icon ?? DEFAULT_ICON[variant]}
        </span>
      )}
      <div className="Tenet-Banner__content">
        {title && <p className="Tenet-Banner__title">{title}</p>}
        {children && <div className="Tenet-Banner__body">{children}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="Tenet-Banner__dismiss" aria-label="Dismiss" onClick={onDismiss}>
          ✕
        </button>
      )}
    </div>
  );
});
