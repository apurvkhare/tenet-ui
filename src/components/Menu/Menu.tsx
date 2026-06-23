import { cloneElement, useCallback, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent as ReactMouseEvent, ReactElement, Ref } from 'react';
import { Portal, mergeRefs, useAnchoredPosition } from '../../internal/floating';
import type { MenuAction, MenuItem, MenuProps } from './Menu.types';
import './Menu.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

const isAction = (item: MenuItem): item is MenuAction => item.type !== 'separator';

/** Next selectable action index in a direction, skipping separators + disabled, with wrap. */
function nextEnabled(items: MenuItem[], from: number, dir: 1 | -1): number {
  const n = items.length;
  for (let step = 1; step <= n; step++) {
    const i = (from + dir * step + n * step) % n;
    const item = items[i];
    if (isAction(item) && !item.disabled) return i;
  }
  return from;
}
const firstEnabled = (items: MenuItem[]) => items.findIndex((it) => isAction(it) && !it.disabled);

/**
 * Tenet action menu — a button that opens a popover list of actions (ARIA menu pattern). Arrow keys
 * move, Enter/Space invoke, Escape closes and returns focus to the trigger, click-outside closes.
 * Items run their `onSelect` and the menu closes. Distinct from `Select`, which picks a value.
 */
export function Menu({ trigger, items, 'aria-label': ariaLabel, align = 'start', className }: MenuProps) {
  const reactId = useId();
  const menuId = `${reactId}-menu`;
  const triggerId = `${reactId}-trigger`;
  const itemId = (i: number) => `${reactId}-item-${i}`;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Float the list in a portal so it can't be clipped by an ancestor's overflow.
  const listStyle = useAnchoredPosition({
    open,
    anchorRef: triggerRef,
    floatingRef: listRef,
    placement: align === 'end' ? 'bottom-end' : 'bottom-start',
  });

  const openMenu = useCallback(() => {
    setActive(firstEnabled(items));
    setOpen(true);
  }, [items]);

  const closeMenu = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  // Move DOM focus to the active item while open (roving focus).
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.querySelector<HTMLButtonElement>(`#${CSS.escape(itemId(active))}`)?.focus();
  }, [open, active]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      // The list is portaled out of wrapRef, so check it explicitly too.
      if (!wrapRef.current?.contains(t) && !listRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const choose = (i: number) => {
    const item = items[i];
    if (item && isAction(item) && !item.disabled) {
      item.onSelect();
      closeMenu();
    }
  };

  const onListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((a) => nextEnabled(items, a, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((a) => nextEnabled(items, a, -1));
        break;
      case 'Home':
        e.preventDefault();
        setActive(firstEnabled(items));
        break;
      case 'End':
        e.preventDefault();
        setActive(nextEnabled(items, firstEnabled(items), -1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (active >= 0) choose(active);
        break;
      case 'Escape':
        e.preventDefault();
        closeMenu();
        break;
      case 'Tab':
        closeMenu(false);
        break;
      default:
        break;
    }
  };

  // Compose with (don't clobber) whatever the caller put on their trigger.
  const triggerNode = trigger as ReactElement<Record<string, unknown>> & { ref?: Ref<HTMLElement> };
  const triggerProps = triggerNode.props;
  const callerClick = triggerProps.onClick as ((e: ReactMouseEvent) => void) | undefined;
  const callerKeyDown = triggerProps.onKeyDown as ((e: KeyboardEvent) => void) | undefined;
  const triggerEl = cloneElement(triggerNode, {
    id: triggerId,
    ref: mergeRefs(triggerNode.ref, (node: HTMLElement | null) => {
      triggerRef.current = node;
    }),
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    'aria-controls': open ? menuId : undefined,
    onClick: (e: ReactMouseEvent) => {
      callerClick?.(e);
      if (open) closeMenu(false);
      else openMenu();
    },
    onKeyDown: (e: KeyboardEvent) => {
      callerKeyDown?.(e);
      if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        openMenu();
      }
    },
  });

  return (
    <span ref={wrapRef} className={cx('Tenet-Menu', className)}>
      {triggerEl}
      {open && (
        <Portal>
        <ul
          ref={listRef}
          id={menuId}
          role="menu"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabel ? undefined : triggerId}
          className={cx('Tenet-Menu__list', `Tenet-Menu__list--align-${align}`)}
          style={listStyle}
          onKeyDown={onListKeyDown}
        >
          {items.map((item, i) =>
            isAction(item) ? (
              <li key={i} role="none">
                <button
                  type="button"
                  id={itemId(i)}
                  role="menuitem"
                  tabIndex={i === active ? 0 : -1}
                  disabled={item.disabled}
                  className={cx(
                    'Tenet-Menu__item',
                    item.destructive && 'Tenet-Menu__item--destructive',
                  )}
                  onClick={() => choose(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  {item.icon && (
                    <span className="Tenet-Menu__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="Tenet-Menu__label">{item.label}</span>
                </button>
              </li>
            ) : (
              <li key={i} role="separator" className="Tenet-Menu__separator" />
            ),
          )}
        </ul>
        </Portal>
      )}
    </span>
  );
}
