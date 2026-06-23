import { forwardRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { SegmentedControlProps } from './SegmentedControl.types';
import './SegmentedControl.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet segmented control — a compact single-choice switch between a few options (a view toggle,
 * a filter mode). Implemented as an ARIA radiogroup: arrow keys move and select (selection follows
 * focus), with a roving tab stop. For many options or free text use `Select`; for on/off use `Switch`.
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
  { options, value, defaultValue, onChange, size = 'medium', block = false, className, 'aria-label': ariaLabel, ...rest },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? options.find((o) => !o.disabled)?.value ?? '');
  const current = isControlled ? value : internal;

  const select = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  // Roving focus target: the selected segment, else the first enabled one.
  const focusValue = options.some((o) => o.value === current)
    ? current
    : options.find((o) => !o.disabled)?.value;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    const enabled = options.filter((o) => !o.disabled);
    if (enabled.length === 0) return;
    e.preventDefault();
    const idx = enabled.findIndex((o) => o.value === current);
    let next = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1 + enabled.length) % enabled.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = enabled.length - 1;
    const target = enabled[next];
    if (!target) return;
    select(target.value);
    e.currentTarget
      .querySelector<HTMLButtonElement>(`[data-value="${CSS.escape(target.value)}"]`)
      ?.focus();
  };

  return (
    <div
      {...rest}
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel}
      className={cx(
        'Tenet-SegmentedControl',
        `Tenet-SegmentedControl--size-${size}`,
        block && 'Tenet-SegmentedControl--block',
        className,
      )}
      onKeyDown={onKeyDown}
    >
      {options.map((opt) => {
        const selected = opt.value === current;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            data-value={opt.value}
            aria-checked={selected}
            disabled={opt.disabled}
            tabIndex={opt.value === focusValue ? 0 : -1}
            className={cx('Tenet-SegmentedControl__segment', selected && 'Tenet-SegmentedControl__segment--selected')}
            onClick={() => !opt.disabled && select(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
});
