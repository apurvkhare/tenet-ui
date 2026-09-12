import { forwardRef, useEffect, useRef, useState } from 'react';
import type { NumberInputProps } from './NumberInput.types';
import './NumberInput.css';
import { resolveFullWidth } from '../../internal/deprecate';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

const toText = (n: number | null | undefined): string => (n == null ? '' : String(n));

const parse = (s: string): number | null => {
  const trimmed = s.trim();
  if (trimmed === '') return null;
  const n = Number(trimmed);
  return Number.isNaN(n) ? null : n;
};

const clamp = (n: number, min?: number, max?: number): number => {
  let out = n;
  if (min != null && out < min) out = min;
  if (max != null && out > max) out = max;
  return out;
};

/**
 * Tenet number field. A text input constrained to numbers, with +/- steppers and arrow-key
 * stepping that respect `min` / `max` / `step`. Reports a parsed `number | null` (not a string)
 * via `onChange`, so callers never re-parse. Always give it an accessible name.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    value,
    defaultValue,
    onChange,
    min,
    max,
    step = 1,
    size = 'medium',
    fullWidth, block,
    invalid = false,
    className,
    disabled,
    id,
    'aria-label': ariaLabel,
    ...rest
  },
  ref,
) {
  const isFullWidth = resolveFullWidth('NumberInput', fullWidth, block);
  const isControlled = value !== undefined;
  const [text, setText] = useState<string>(() => toText(isControlled ? value : defaultValue));
  const innerRef = useRef<HTMLInputElement | null>(null);

  // Keep the visible text in sync when a controlled value changes externally.
  useEffect(() => {
    if (!isControlled) return;
    if (parse(text) !== value) setText(toText(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const current = parse(text);

  const commit = (next: string) => {
    if (!isControlled) setText(next);
    onChange?.(parse(next));
  };

  const stepBy = (direction: number) => {
    const base = current ?? min ?? 0;
    const next = clamp(base + direction * step, min, max);
    commit(toText(next));
    // keep focus on the field after clicking a stepper
    innerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      stepBy(1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      stepBy(-1);
    }
  };

  const decDisabled = disabled || (min != null && current != null && current <= min);
  const incDisabled = disabled || (max != null && current != null && current >= max);

  const setRef = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
  };

  return (
    <span
      className={cx(
        'Tenet-NumberInput',
        `Tenet-NumberInput--size-${size}`,
        isFullWidth && 'Tenet-NumberInput--fullWidth',
        invalid && 'Tenet-NumberInput--invalid',
        disabled && 'Tenet-NumberInput--disabled',
        className,
      )}
    >
      <input
        ref={setRef}
        id={id}
        type="text"
        inputMode="decimal"
        role="spinbutton"
        aria-label={ariaLabel}
        aria-valuenow={current ?? undefined}
        aria-valuetext={current == null ? 'Empty' : undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-invalid={invalid || undefined}
        className="Tenet-NumberInput__input"
        value={text}
        disabled={disabled}
        onChange={(e) => commit(e.target.value)}
        onKeyDown={handleKeyDown}
        {...rest}
      />
      <span className="Tenet-NumberInput__steppers" aria-hidden="true">
        {/* Steppers are inside an aria-hidden wrapper (arrow keys are the a11y path), so no labels. */}
        <button
          type="button"
          tabIndex={-1}
          className="Tenet-NumberInput__stepper"
          disabled={incDisabled}
          onClick={() => stepBy(1)}
        >
          ▲
        </button>
        <button
          type="button"
          tabIndex={-1}
          className="Tenet-NumberInput__stepper"
          disabled={decDisabled}
          onClick={() => stepBy(-1)}
        >
          ▼
        </button>
      </span>
    </span>
  );
});
