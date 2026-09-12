import { createElement, forwardRef } from 'react';
import type { HeadingProps } from './Heading.types';
import './Heading.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet heading — the display (serif) type scale with correct document semantics. `level` drives the
 * SIZE and the default element; `as` overrides the ELEMENT when semantics and size must differ (one
 * `h1` per page, then `h2`… in order — pick the look with `level`, never skip heading ranks for looks).
 * Use this instead of a raw `<h1 style={…}>`; body copy belongs in `Text`.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level = 2, as, truncate = false, className, children, ...rest },
  ref,
) {
  const element = as ?? `h${level}`;
  return createElement(
    element,
    {
      ref,
      className: cx('Tenet-Heading', `Tenet-Heading--level-${level}`, truncate && 'Tenet-Heading--truncate', className),
      ...rest,
    },
    children,
  );
});
