import { createContext, useContext, useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { AccordionItemProps, AccordionProps, AccordionType } from './Accordion.types';
import './Accordion.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

interface AccordionContextValue {
  open: string[];
  toggle: (value: string) => void;
  type: AccordionType;
  baseId: string;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);
const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion.Item must be used inside <Accordion>');
  return ctx;
};

const slug = (v: string) => v.replace(/[^a-zA-Z0-9_-]/g, '_');

/**
 * Tenet accordion — stacked disclosure sections. Each item is a header `<button aria-expanded>`
 * controlling a labelled region. `type="single"` keeps one open (collapsible), `multiple` allows
 * many. Headers are arrow-key navigable (Up/Down/Home/End). Controlled or uncontrolled.
 */
export function Accordion({
  type = 'single',
  value,
  defaultValue,
  onValueChange,
  className,
  children,
}: AccordionProps) {
  const baseId = useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>(defaultValue ?? []);
  const open = isControlled ? value : internal;

  const toggle = (v: string) => {
    let next: string[];
    if (open.includes(v)) next = open.filter((x) => x !== v);
    else next = type === 'single' ? [v] : [...open, v];
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <AccordionContext.Provider value={{ open, toggle, type, baseId }}>
      <div className={cx('Tenet-Accordion', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ value, title, disabled = false, className, children }: AccordionItemProps) {
  const { open, toggle, baseId } = useAccordion();
  const expanded = open.includes(value);
  const headerId = `${baseId}-h-${slug(value)}`;
  const panelId = `${baseId}-p-${slug(value)}`;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    const root = e.currentTarget.closest('.Tenet-Accordion');
    if (!root) return;
    const headers = Array.from(
      root.querySelectorAll<HTMLButtonElement>('.Tenet-Accordion__trigger:not([disabled])'),
    );
    if (headers.length === 0) return;
    e.preventDefault();
    const idx = headers.indexOf(e.currentTarget);
    let next = idx;
    if (e.key === 'ArrowDown') next = (idx + 1) % headers.length;
    else if (e.key === 'ArrowUp') next = (idx - 1 + headers.length) % headers.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = headers.length - 1;
    headers[next]?.focus();
  };

  return (
    <div className={cx('Tenet-Accordion__item', className)}>
      <h3 className="Tenet-Accordion__heading">
        <button
          type="button"
          id={headerId}
          className="Tenet-Accordion__trigger"
          aria-expanded={expanded}
          aria-controls={panelId}
          disabled={disabled}
          onClick={() => toggle(value)}
          onKeyDown={onKeyDown}
        >
          <span className="Tenet-Accordion__title">{title}</span>
          <span className="Tenet-Accordion__chevron" aria-hidden="true">
            ›
          </span>
        </button>
      </h3>
      <div
        role="region"
        id={panelId}
        aria-labelledby={headerId}
        className="Tenet-Accordion__panel"
        hidden={!expanded}
      >
        <div className="Tenet-Accordion__content">{children}</div>
      </div>
    </div>
  );
}

Accordion.Item = AccordionItem;
