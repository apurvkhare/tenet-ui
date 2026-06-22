import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import type { SkeletonProps } from './Skeleton.types';
import './Skeleton.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

const toDimension = (value: string | number | undefined): string | undefined =>
  typeof value === 'number' ? `${value}px` : value;

/**
 * Tenet skeleton — a decorative loading placeholder that shimmers while content streams in.
 * It is `aria-hidden`: announce the wait on the surrounding region with `aria-busy="true"`
 * (and a visually-hidden status / Spinner label), not on each skeleton block.
 * Use `text` for lines of copy, `circle` for an avatar, `rect` for a media/card block.
 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { variant = 'text', width, height, radius, className, style, ...rest },
  ref,
) {
  const isCircle = variant === 'circle';
  const w = toDimension(width);
  const h = toDimension(height);
  const inlineStyle: CSSProperties = {
    ...style,
    ...(w !== undefined ? { width: w } : null),
    // A circle stays square: height follows width unless explicitly overridden.
    ...(h !== undefined ? { height: h } : isCircle && w !== undefined ? { height: w } : null),
  };

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cx(
        'Tenet-Skeleton',
        `Tenet-Skeleton--variant-${variant}`,
        radius && `Tenet-Skeleton--radius-${radius}`,
        className,
      )}
      style={inlineStyle}
      {...rest}
    />
  );
});
