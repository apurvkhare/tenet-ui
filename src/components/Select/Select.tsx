import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { SelectOption, SelectProps } from './Select.types';
import './Select.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/** Index of the next selectable option in `dir` (+1/-1), skipping disabled ones; wraps. */
function nextEnabled(options: SelectOption[], from: number, dir: 1 | -1): number {
  const n = options.length;
  for (let step = 1; step <= n; step++) {
    const i = (from + dir * step + n * step) % n;
    if (!options[i]?.disabled) return i;
  }
  return from;
}
const firstEnabled = (o: SelectOption[]) => o.findIndex((x) => !x.disabled);
const lastEnabled = (o: SelectOption[]) => {
  for (let i = o.length - 1; i >= 0; i--) if (!o[i].disabled) return i;
  return -1;
};

/**
 * Tenet select — a real ARIA listbox combobox (not a native `<select>`). Styled menu, full
 * keyboard support (↑/↓/Home/End/Enter/Esc), typeahead, `aria-activedescendant`, click-outside,
 * controlled or uncontrolled. Token-styled, theme-aware, and FormControl-compatible. Always give
 * it an accessible name via FormControl or `aria-label`.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    options,
    value,
    defaultValue,
    onChange,
    placeholder = 'Select…',
    size = 'medium',
    block = false,
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
  const reactId = useId();
  const triggerId = id ?? `${reactId}-trigger`;
  const listboxId = `${reactId}-listbox`;
  const optionId = (i: number) => `${reactId}-opt-${i}`;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? '');
  const current = isControlled ? value : internal;
  const selectedIndex = options.findIndex((o) => o.value === current);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const wrapRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef<{ buf: string; t: ReturnType<typeof setTimeout> | null }>({ buf: '', t: null });

  const commit = useCallback(
    (i: number) => {
      const opt = options[i];
      if (!opt || opt.disabled) return;
      if (!isControlled) setInternal(opt.value);
      onChange?.(opt.value);
    },
    [options, isControlled, onChange],
  );

  const openMenu = useCallback(() => {
    if (disabled) return;
    setActive(selectedIndex >= 0 ? selectedIndex : firstEnabled(options));
    setOpen(true);
  }, [disabled, selectedIndex, options]);

  const closeMenu = useCallback(() => setOpen(false), []);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open || active < 0 || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`#${CSS.escape(optionId(active))}`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, active]); // eslint-disable-line react-hooks/exhaustive-deps

  const runTypeahead = useCallback(
    (ch: string) => {
      const ta = typeahead.current;
      if (ta.t) clearTimeout(ta.t);
      ta.buf += ch.toLowerCase();
      ta.t = setTimeout(() => (ta.buf = ''), 500);
      const match = options.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(ta.buf));
      if (match >= 0) {
        if (open) setActive(match);
        else commit(match);
      }
    },
    [options, open, commit],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const key = e.key;
    if (!open) {
      if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ') {
        e.preventDefault();
        openMenu();
        return;
      }
      if (key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) runTypeahead(key);
      return;
    }
    switch (key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((a) => nextEnabled(options, a < 0 ? -1 : a, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((a) => nextEnabled(options, a < 0 ? 0 : a, -1));
        break;
      case 'Home':
        e.preventDefault();
        setActive(firstEnabled(options));
        break;
      case 'End':
        e.preventDefault();
        setActive(lastEnabled(options));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (active >= 0) {
          commit(active);
          setOpen(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
      case 'Tab':
        setOpen(false);
        break;
      default:
        if (key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          runTypeahead(key);
        }
    }
  };

  return (
    <span
      ref={wrapRef}
      className={cx(
        'Tenet-Select',
        `Tenet-Select--size-${size}`,
        block && 'Tenet-Select--block',
        invalid && 'Tenet-Select--invalid',
        disabled && 'Tenet-Select--disabled',
        open && 'Tenet-Select--open',
        className,
      )}
    >
      <button
        ref={ref}
        type="button"
        id={triggerId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy}
        disabled={disabled}
        className="Tenet-Select__trigger"
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onKeyDown}
      >
        <span className={cx('Tenet-Select__value', !selected && 'Tenet-Select__value--placeholder')}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="Tenet-Select__caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul ref={listRef} id={listboxId} role="listbox" className="Tenet-Select__listbox" tabIndex={-1}>
          {options.map((opt, i) => {
            const isSelected = opt.value === current;
            return (
              <li
                key={opt.value}
                id={optionId(i)}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled || undefined}
                className={cx(
                  'Tenet-Select__option',
                  i === active && 'Tenet-Select__option--active',
                  isSelected && 'Tenet-Select__option--selected',
                  opt.disabled && 'Tenet-Select__option--disabled',
                )}
                onMouseEnter={() => !opt.disabled && setActive(i)}
                onMouseDown={(e) => e.preventDefault()} // keep focus on the trigger
                onClick={() => {
                  if (opt.disabled) return;
                  commit(i);
                  setOpen(false);
                }}
              >
                <span className="Tenet-Select__check" aria-hidden="true">
                  {isSelected ? '✓' : ''}
                </span>
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}

      {name && <input type="hidden" name={name} value={current} />}
    </span>
  );
});
