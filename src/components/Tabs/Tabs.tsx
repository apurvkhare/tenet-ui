import { createContext, useContext, useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { TabProps, TabPanelProps, TabsListProps, TabsProps } from './Tabs.types';
import './Tabs.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

interface TabsContextValue {
  value: string | undefined;
  setValue: (v: string) => void;
  baseId: string;
}
const TabsContext = createContext<TabsContextValue | null>(null);
const useTabs = (component: string) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`Tabs.${component} must be used inside <Tabs>`);
  return ctx;
};

const slug = (v: string) => v.replace(/[^a-zA-Z0-9_-]/g, '_');

/**
 * Tenet tabs — a controlled or uncontrolled tab set following the ARIA tabs pattern. Compose
 * `Tabs.List` + `Tabs.Tab` with matching `Tabs.Panel`s. Arrow keys move between tabs (selection
 * follows focus), Home/End jump to the ends; roles, ids and `aria-controls`/`aria-labelledby` are
 * wired for you.
 */
export function Tabs({ value, defaultValue, onChange, className, children }: TabsProps) {
  const baseId = useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const current = isControlled ? value : internal;

  const setValue = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ value: current, setValue, baseId }}>
      <div className={cx('Tenet-Tabs', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, children, ...rest }: TabsListProps) {
  const { setValue } = useTabs('List');
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    const tabs = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([aria-disabled="true"])'),
    );
    if (tabs.length === 0) return;
    e.preventDefault();
    const idx = tabs.indexOf(document.activeElement as HTMLButtonElement);
    let next = idx;
    if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    const target = tabs[next];
    if (!target) return;
    target.focus();
    // Drive selection directly (no synthetic .click(), so user onClick handlers don't double-fire).
    const v = target.dataset.value;
    if (v != null) setValue(v);
  };

  return (
    <div role="tablist" className={cx('Tenet-Tabs__list', className)} onKeyDown={onKeyDown} {...rest}>
      {children}
    </div>
  );
}

function Tab({ value, disabled = false, className, children, onClick, ...rest }: TabProps) {
  const { value: active, setValue, baseId } = useTabs('Tab');
  const selected = active === value;
  return (
    <button
      type="button"
      role="tab"
      data-value={value}
      id={`${baseId}-tab-${slug(value)}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${slug(value)}`}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      tabIndex={selected ? 0 : -1}
      className={cx('Tenet-Tabs__tab', selected && 'Tenet-Tabs__tab--selected', className)}
      onClick={(e) => {
        onClick?.(e);
        if (!disabled) setValue(value);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, className, children, ...rest }: TabPanelProps) {
  const { value: active, baseId } = useTabs('Panel');
  if (active !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${slug(value)}`}
      aria-labelledby={`${baseId}-tab-${slug(value)}`}
      tabIndex={0}
      className={cx('Tenet-Tabs__panel', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
