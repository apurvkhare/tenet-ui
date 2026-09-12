import { forwardRef } from 'react';
import type { TextInputProps } from './TextInput.types';
import './TextInput.css';
import { resolveFullWidth } from '../../internal/deprecate';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet text field. Renders a real, accessible `<input>` wrapped with token-based chrome —
 * use this instead of a raw `<input>` so border, height, spacing and focus styling stay on-system.
 * Always pass an accessible name via `aria-label` or an associated `<label>`.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { size = 'medium', fullWidth, block, leadingVisual, trailingVisual, invalid = false, className, disabled, ...rest },
  ref,
) {
  const isFullWidth = resolveFullWidth('TextInput', fullWidth, block);
  return (
    <span
      className={cx(
        'Tenet-TextInput',
        `Tenet-TextInput--size-${size}`,
        isFullWidth && 'Tenet-TextInput--fullWidth',
        invalid && 'Tenet-TextInput--invalid',
        disabled && 'Tenet-TextInput--disabled',
        className,
      )}
    >
      {leadingVisual && (
        <span className="Tenet-TextInput__visual" aria-hidden="true">
          {leadingVisual}
        </span>
      )}
      <input
        ref={ref}
        className="Tenet-TextInput__input"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        {...rest}
      />
      {trailingVisual && (
        <span className="Tenet-TextInput__visual" aria-hidden="true">
          {trailingVisual}
        </span>
      )}
    </span>
  );
});
