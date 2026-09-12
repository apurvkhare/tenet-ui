import { createElement, forwardRef } from 'react';
import type { TextProps } from './Text.types';
import './Text.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet body copy — paragraphs, captions, helper text and status messages on the body (sans) scale.
 * `size` picks the scale step, `tone` the semantic color (`muted` for secondary copy, status tones for
 * messages). Use it instead of a `<p style={{ color: '#666', fontSize: 13 }}>`; titles belong in
 * `Heading`. Don't convey a status by color alone — pair a `danger`/`success` tone with words or an icon.
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as = 'p', size = 'medium', tone = 'default', weight = 'normal', truncate = false, align, className, children, ...rest },
  ref,
) {
  return createElement(
    as,
    {
      ref,
      className: cx(
        'Tenet-Text',
        `Tenet-Text--size-${size}`,
        `Tenet-Text--tone-${tone}`,
        `Tenet-Text--weight-${weight}`,
        align && `Tenet-Text--align-${align}`,
        truncate && 'Tenet-Text--truncate',
        className,
      ),
      ...rest,
    },
    children,
  );
});
