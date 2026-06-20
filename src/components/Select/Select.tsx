import { forwardRef } from 'react';
import type { SelectProps } from './Select.types';
import './Select.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Acme select. A real, accessible `<select>` with token-based chrome and a custom caret — use it
 * instead of a raw `<select>` or a div-based dropdown. Give it an accessible name via FormControl
 * or `aria-label`.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = 'medium', block = false, invalid = false, placeholder, disabled, className, children, defaultValue, value, ...rest },
  ref,
) {
  // Only force the placeholder selection in uncontrolled mode (no value/defaultValue given).
  const uncontrolledDefault = value === undefined && defaultValue === undefined && placeholder ? '' : defaultValue;

  return (
    <span
      className={cx(
        'Acme-Select',
        `Acme-Select--size-${size}`,
        block && 'Acme-Select--block',
        invalid && 'Acme-Select--invalid',
        disabled && 'Acme-Select--disabled',
        className,
      )}
    >
      <select
        ref={ref}
        className="Acme-Select__input"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        value={value}
        defaultValue={uncontrolledDefault}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <span className="Acme-Select__caret" aria-hidden="true">
        ▾
      </span>
    </span>
  );
});
