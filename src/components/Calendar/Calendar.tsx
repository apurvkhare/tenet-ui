import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { CalendarProps } from './Calendar.types';
import {
  addDays,
  addMonths,
  clampToRange,
  dayKey,
  formatFullDate,
  formatMonthYear,
  isOutOfRange,
  isSameDay,
  isSameMonth,
  monthGrid,
  startOfDay,
  startOfMonth,
  weekdayLabels,
} from './dateUtils';
import './Calendar.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet calendar — a month-grid date picker surface. Full keyboard support (arrows move by day/
 * week, Home/End jump within the week, PageUp/PageDown change month, Enter/Space select), a roving
 * tab stop, and the ARIA grid pattern. Use it inline, or let `DatePicker` host it in a popover.
 */
export function Calendar({
  value,
  defaultValue,
  onChange,
  month,
  defaultMonth,
  onMonthChange,
  min,
  max,
  weekStartsOn = 0,
  locale,
  className,
  'aria-label': ariaLabel,
}: CalendarProps) {
  const today = startOfDay(new Date());

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internal;

  const monthControlled = month !== undefined;
  const [internalMonth, setInternalMonth] = useState<Date>(() =>
    startOfMonth(defaultMonth ?? selected ?? today),
  );
  const visibleMonth = monthControlled ? startOfMonth(month as Date) : internalMonth;

  // Roving focus target within the grid.
  const [focused, setFocused] = useState<Date>(() => clampToRange(selected ?? today, min, max));
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);

  // After a keyboard move, pull DOM focus onto the newly-focused day.
  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${dayKey(focused)}"]`)?.focus();
  }, [focused]);

  const setMonth = (next: Date) => {
    const m = startOfMonth(next);
    if (!monthControlled) setInternalMonth(m);
    onMonthChange?.(m);
  };

  const select = (day: Date) => {
    if (isOutOfRange(day, min, max)) return;
    if (!isControlled) setInternal(day);
    onChange?.(day);
    if (!isSameMonth(day, visibleMonth)) setMonth(day);
  };

  const moveFocus = (next: Date) => {
    const clamped = clampToRange(next, min, max);
    setFocused(clamped);
    shouldFocus.current = true;
    if (!isSameMonth(clamped, visibleMonth)) setMonth(clamped);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        moveFocus(addDays(focused, -1));
        break;
      case 'ArrowRight':
        e.preventDefault();
        moveFocus(addDays(focused, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveFocus(addDays(focused, -7));
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveFocus(addDays(focused, 7));
        break;
      case 'Home':
        e.preventDefault();
        moveFocus(addDays(focused, -((focused.getDay() - weekStartsOn + 7) % 7)));
        break;
      case 'End':
        e.preventDefault();
        moveFocus(addDays(focused, 6 - ((focused.getDay() - weekStartsOn + 7) % 7)));
        break;
      case 'PageUp':
        e.preventDefault();
        moveFocus(addMonths(focused, -1));
        break;
      case 'PageDown':
        e.preventDefault();
        moveFocus(addMonths(focused, 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        select(focused);
        break;
      default:
        break;
    }
  };

  const weekdays = weekdayLabels(weekStartsOn, locale);
  const days = monthGrid(visibleMonth, weekStartsOn);
  const weeks = Array.from({ length: 6 }, (_, w) => days.slice(w * 7, w * 7 + 7));

  const prevDisabled = !!min && startOfMonth(visibleMonth).getTime() <= startOfMonth(min).getTime();
  const nextDisabled = !!max && startOfMonth(visibleMonth).getTime() >= startOfMonth(max).getTime();

  return (
    <div className={cx('Tenet-Calendar', className)} role="group" aria-label={ariaLabel ?? 'Calendar'}>
      <div className="Tenet-Calendar__header">
        <button
          type="button"
          className="Tenet-Calendar__nav"
          aria-label="Previous month"
          disabled={prevDisabled}
          onClick={() => setMonth(addMonths(visibleMonth, -1))}
        >
          ‹
        </button>
        <div className="Tenet-Calendar__heading" aria-live="polite">
          {formatMonthYear(visibleMonth, locale)}
        </div>
        <button
          type="button"
          className="Tenet-Calendar__nav"
          aria-label="Next month"
          disabled={nextDisabled}
          onClick={() => setMonth(addMonths(visibleMonth, 1))}
        >
          ›
        </button>
      </div>

      <div ref={gridRef} className="Tenet-Calendar__grid" role="grid" aria-label={formatMonthYear(visibleMonth, locale)} onKeyDown={onKeyDown}>
        <div className="Tenet-Calendar__weekrow" role="row">
          {weekdays.map((label, i) => (
            <span key={i} role="columnheader" className="Tenet-Calendar__weekday" aria-label={label}>
              {label.slice(0, 2)}
            </span>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="Tenet-Calendar__weekrow" role="row">
            {week.map((day) => {
              const inMonth = isSameMonth(day, visibleMonth);
              const disabled = isOutOfRange(day, min, max);
              const isSelected = isSameDay(day, selected);
              const isToday = isSameDay(day, today);
              const isFocusTarget = isSameDay(day, focused);
              return (
                <div key={dayKey(day)} role="gridcell" aria-selected={isSelected} className="Tenet-Calendar__cell">
                  <button
                    type="button"
                    data-day={dayKey(day)}
                    tabIndex={isFocusTarget ? 0 : -1}
                    disabled={disabled}
                    aria-label={formatFullDate(day, locale)}
                    aria-current={isToday ? 'date' : undefined}
                    className={cx(
                      'Tenet-Calendar__day',
                      !inMonth && 'Tenet-Calendar__day--outside',
                      isSelected && 'Tenet-Calendar__day--selected',
                      isToday && !isSelected && 'Tenet-Calendar__day--today',
                    )}
                    onClick={() => select(day)}
                    onFocus={() => setFocused(day)}
                  >
                    {day.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
