import { forwardRef, useId } from 'react';
import type { SwitchProps } from './Switch.types';
import './Switch.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet switch. A real `<input type="checkbox" role="switch">` styled as a sliding toggle —
 * use it for an immediate on/off setting (not for a value you submit on a separate save).
 * Keyboard + screen-reader behaviour comes from the native input; the track/knob are CSS.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, caption, size = 'medium', invalid = false, id, className, disabled, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : undefined;

  return (
    <span
      className={cx(
        'Tenet-Switch',
        `Tenet-Switch--size-${size}`,
        invalid && 'Tenet-Switch--invalid',
        disabled && 'Tenet-Switch--disabled',
        className,
      )}
    >
      <span className="Tenet-Switch__control">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          className="Tenet-Switch__input"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={captionId}
          {...rest}
        />
        <span className="Tenet-Switch__track" aria-hidden="true">
          <span className="Tenet-Switch__knob" />
        </span>
      </span>
      {label && (
        <span className="Tenet-Switch__text">
          <label htmlFor={inputId} className="Tenet-Switch__label">
            {label}
          </label>
          {caption && (
            <span id={captionId} className="Tenet-Switch__caption">
              {caption}
            </span>
          )}
        </span>
      )}
    </span>
  );
});
