import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { Calendar } from '../Calendar';
import { dayKey, formatDate } from '../Calendar/dateUtils';
import { Portal, mergeRefs, useAnchoredPosition } from '../../internal/floating';
import type { DatePickerProps } from './DatePicker.types';
import './DatePicker.css';
import { resolveFullWidth } from '../../internal/deprecate';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet date picker — a token-styled field that opens a `Calendar` popover. Selecting a day (mouse
 * or keyboard) commits the value and closes the menu; Escape closes; clicking outside closes. The
 * trigger carries the ARIA combobox/dialog wiring, the Calendar carries the grid + keyboard model.
 * Controlled or uncontrolled, FormControl-compatible, and emits a hidden yyyy-mm-dd input when
 * given a `name`. Always give it an accessible name via FormControl or `aria-label`.
 */
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(
  {
    value,
    defaultValue,
    onChange,
    min,
    max,
    weekStartsOn = 0,
    locale,
    placeholder = 'Select a date…',
    size = 'medium',
    fullWidth, block,
    invalid = false,
    disabled = false,
    required = false,
    name,
    id,
    className,
    'aria-label': ariaLabel,
    'aria-describedby': describedBy,
  },
  ref,
) {
  const isFullWidth = resolveFullWidth('DatePicker', fullWidth, block);
  const reactId = useId();
  const triggerId = id ?? `${reactId}-trigger`;
  const dialogId = `${reactId}-dialog`;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internal;

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Float the calendar popover in a portal so it can't be clipped by an ancestor's overflow.
  const popoverStyle = useAnchoredPosition({ open, anchorRef: triggerRef, floatingRef: popoverRef });

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      // The popover is portaled out of wrapRef, so check it explicitly too.
      if (!wrapRef.current?.contains(t) && !popoverRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Move focus into the calendar grid when it opens (fall back to the dialog container).
  useEffect(() => {
    if (!open) return;
    const el =
      popoverRef.current?.querySelector<HTMLElement>('.Tenet-Calendar__day[tabindex="0"]') ??
      popoverRef.current;
    el?.focus();
  }, [open]);

  const handleSelect = (date: Date) => {
    if (!isControlled) setInternal(date);
    onChange?.(date);
    close();
  };

  return (
    <span
      ref={wrapRef}
      className={cx(
        'Tenet-DatePicker',
        `Tenet-DatePicker--size-${size}`,
        isFullWidth && 'Tenet-DatePicker--fullWidth',
        invalid && 'Tenet-DatePicker--invalid',
        disabled && 'Tenet-DatePicker--disabled',
        className,
      )}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          e.preventDefault();
          close();
        }
      }}
      onBlur={(e) => {
        // Tabbing out (focus leaving the wrapper) closes it without stealing focus. The popover is
        // portaled, so focus moving into it is NOT "leaving" — exclude it.
        const rt = e.relatedTarget as Node | null;
        if (open && !wrapRef.current?.contains(rt) && !popoverRef.current?.contains(rt)) setOpen(false);
      }}
    >
      <button
        ref={mergeRefs(ref, triggerRef)}
        type="button"
        id={triggerId}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        disabled={disabled}
        className="Tenet-DatePicker__trigger"
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        <span className="Tenet-DatePicker__icon" aria-hidden="true">
          📅
        </span>
        <span className={cx('Tenet-DatePicker__value', !selected && 'Tenet-DatePicker__value--placeholder')}>
          {selected ? formatDate(selected, locale) : placeholder}
        </span>
      </button>

      {open && (
        <Portal>
        <div ref={popoverRef} id={dialogId} role="dialog" aria-modal="false" aria-label={ariaLabel ?? 'Choose date'} tabIndex={-1} style={popoverStyle} className="Tenet-DatePicker__popover">
          <Calendar
            value={selected}
            defaultMonth={selected ?? undefined}
            onChange={handleSelect}
            min={min}
            max={max}
            weekStartsOn={weekStartsOn}
            locale={locale}
            aria-label={ariaLabel ?? 'Choose date'}
            className="Tenet-DatePicker__calendar"
          />
        </div>
        </Portal>
      )}

      {name && <input type="hidden" name={name} value={selected ? dayKey(selected) : ''} />}
    </span>
  );
});
