import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import type { GridItemProps, GridProps, GridResponsiveValue } from './Grid.types';
import './Grid.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

const BREAKPOINTS = ['base', 'sm', 'md', 'lg'] as const;

/** Custom properties the Grid CSS reads: `--Tenet-Grid-columns-{bp}` on the root, `--Tenet-Grid-Item-span-{bp}` on items. */
type GridCSSVars = Record<`--Tenet-Grid-${string}`, number>;

/**
 * Turns `3` or `{ base: 1, md: 3 }` into the per-breakpoint custom properties the stylesheet cascades
 * (lg → md → sm → base). A plain number sets only `base`; missing breakpoints are simply not set.
 */
function responsiveVars(prefix: `--Tenet-Grid-${string}`, value: GridResponsiveValue | undefined): GridCSSVars {
  const vars: GridCSSVars = {};
  if (value === undefined) return vars;
  if (typeof value === 'number') {
    vars[`${prefix}-base`] = value;
    return vars;
  }
  for (const bp of BREAKPOINTS) {
    const v = value[bp];
    if (v !== undefined) vars[`${prefix}-${bp}`] = v;
  }
  return vars;
}

/**
 * Tenet two-dimensional layout primitive — the CSS-grid sibling of `Stack`. `columns` sets equal-width
 * tracks (fixed, or per breakpoint: `{ base: 1, sm: 2, lg: 4 }`), `gap` comes from the `space` scale,
 * and `Grid.Item span` lets one child cover several columns. Use it instead of hand-written
 * `display: grid` with pixel gaps or ad-hoc media queries; for a single row or column use `Stack`.
 */
const GridRoot = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns = 1, gap = 'normal', rowGap, align, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'Tenet-Grid',
        `Tenet-Grid--gap-${gap}`,
        rowGap && `Tenet-Grid--rowGap-${rowGap}`,
        align && `Tenet-Grid--align-${align}`,
        className,
      )}
      style={{ ...responsiveVars('--Tenet-Grid-columns', columns), ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
});

/** A child of `Grid` that spans more than one column (`span`, fixed or per breakpoint). */
const GridItem = forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
  { span, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('Tenet-Grid__item', span !== undefined && 'Tenet-Grid__item--span', className)}
      style={{ ...responsiveVars('--Tenet-Grid-Item-span', span), ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
});

export const Grid = Object.assign(GridRoot, { Item: GridItem });
