import { forwardRef, useId } from 'react';
import type { CheckboxProps } from './Checkbox.types';
import './Checkbox.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet checkbox. A real `<input type="checkbox">` tinted with the accent token, with an
 * associated label and optional caption — use it instead of a styled `<div>` toggle.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, caption, id, className, disabled, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : undefined;

  return (
    <span className={cx('Tenet-Checkbox', disabled && 'Tenet-Checkbox--disabled', className)}>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className="Tenet-Checkbox__input"
        disabled={disabled}
        aria-describedby={captionId}
        {...rest}
      />
      {label && (
        <span className="Tenet-Checkbox__text">
          <label htmlFor={inputId} className="Tenet-Checkbox__label">
            {label}
          </label>
          {caption && (
            <span id={captionId} className="Tenet-Checkbox__caption">
              {caption}
            </span>
          )}
        </span>
      )}
    </span>
  );
});
