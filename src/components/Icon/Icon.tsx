import { forwardRef } from 'react';
import type { IconProps } from './Icon.types';
import './Icon.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet icon primitive — the `<svg>` shell every glyph in `tenet-ui/icons` renders through. It fixes
 * the geometry (24×24 grid scaled to `size`), the Lucide stroke style (`currentColor`, round caps and
 * joins, stroke width 2) and the accessibility default: decorative (`aria-hidden`) unless you pass a
 * `label`, in which case it becomes `role="img"` with that name.
 *
 * Prefer the named glyphs (`<SearchIcon />`) over composing `Icon` directly; reach for `Icon` only to
 * wrap a one-off glyph that is not yet in the set. Color is inherited from the parent's `color`, so
 * icons follow the token the surrounding text uses.
 *
 * Stroke width is a constant 2 (Lucide's native weight) rather than thinned per size: the glyphs were
 * drawn for it, it scales optically with `size` (1.33px at 16, 2px at 24) and it matches what designers
 * see in Lucide's Figma library. Override `strokeWidth` per instance if a surface truly needs lighter.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { size = 16, label, className, children, ...rest },
  ref,
) {
  const a11y = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true as const, focusable: 'false' as const };

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx('Tenet-Icon', `Tenet-Icon--size-${size}`, className)}
      {...a11y}
      {...rest}
    >
      {children}
    </svg>
  );
});
