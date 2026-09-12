import type { HTMLAttributes, ReactNode } from 'react';

/** Space between tracks, from the `space` scale (condensed=8, normal=16, spacious=24). */
export type GridGap = 'none' | 'condensed' | 'normal' | 'spacious';
/** Block-axis alignment of items inside their row (maps to `align-items`). */
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';

/**
 * A value per breakpoint. `base` applies from 0 up; `sm`/`md`/`lg` apply from `breakpoint-sm` (640),
 * `breakpoint-md` (960) and `breakpoint-lg` (1280) upward. Missing steps inherit the previous one
 * (lg → md → sm → base).
 */
export interface GridResponsive {
  /** Value from 0 up (mobile-first). */
  base?: number;
  /** Value from `breakpoint-sm` (640px) up. */
  sm?: number;
  /** Value from `breakpoint-md` (960px) up. */
  md?: number;
  /** Value from `breakpoint-lg` (1280px) up. */
  lg?: number;
}

/** A single number (all breakpoints) or a per-breakpoint object. */
export type GridResponsiveValue = number | GridResponsive;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Number of equal-width columns, either fixed or per breakpoint, e.g. `{ base: 1, sm: 2, lg: 4 }`.
   * Each column is `minmax(0, 1fr)` so long content can't blow the track out.
   */
  columns?: GridResponsiveValue;
  /** Space between rows and columns, from the `space` scale (condensed=8, normal=16, spacious=24). */
  gap?: GridGap;
  /** Overrides the row spacing only, from the same scale; defaults to `gap`. */
  rowGap?: GridGap;
  /** Block-axis alignment of items within their row (maps to `align-items`). */
  align?: GridAlign;
  children?: ReactNode;
}

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns this item spans (`grid-column: span N`), fixed or per breakpoint. */
  span?: GridResponsiveValue;
  children?: ReactNode;
}
