import { forwardRef, useEffect, useId, useRef } from 'react';
import type { CheckboxProps } from './Checkbox.types';
import './Checkbox.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet checkbox. A real `<input type="checkbox">` tinted with the accent token, with an
 * associated label and optional caption — use it instead of a styled `<div>` toggle. Supports an
 * `indeterminate` (mixed) state for "select all" parents.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, caption, id, className, disabled, invalid = false, indeterminate = false, 'aria-describedby': ariaDescribedby, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : undefined;
  // Merge our caption id with any caller-supplied describedby instead of overwriting it.
  const describedBy = [captionId, ariaDescribedby].filter(Boolean).join(' ') || undefined;

  // `indeterminate` is a DOM property, not an attribute — set it on the element via a ref.
  const innerRef = useRef<HTMLInputElement | null>(null);
  const setRef = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
  };
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <span className={cx('Tenet-Checkbox', disabled && 'Tenet-Checkbox--disabled', className)}>
      <input
        ref={setRef}
        id={inputId}
        type="checkbox"
        className="Tenet-Checkbox__input"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
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
