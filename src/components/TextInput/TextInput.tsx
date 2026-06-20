import { forwardRef } from 'react';
import type { TextInputProps } from './TextInput.types';
import './TextInput.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Acme text field. Renders a real, accessible `<input>` wrapped with token-based chrome —
 * use this instead of a raw `<input>` so border, height, spacing and focus styling stay on-system.
 * Always pass an accessible name via `aria-label` or an associated `<label>`.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { size = 'medium', block = false, leadingVisual, trailingVisual, invalid = false, className, disabled, ...rest },
  ref,
) {
  return (
    <span
      className={cx(
        'Acme-TextInput',
        `Acme-TextInput--size-${size}`,
        block && 'Acme-TextInput--block',
        invalid && 'Acme-TextInput--invalid',
        disabled && 'Acme-TextInput--disabled',
        className,
      )}
    >
      {leadingVisual && (
        <span className="Acme-TextInput__visual" aria-hidden="true">
          {leadingVisual}
        </span>
      )}
      <input
        ref={ref}
        className="Acme-TextInput__input"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        {...rest}
      />
      {trailingVisual && (
        <span className="Acme-TextInput__visual" aria-hidden="true">
          {trailingVisual}
        </span>
      )}
    </span>
  );
});
