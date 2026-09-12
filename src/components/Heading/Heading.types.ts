import type { HTMLAttributes, ReactNode } from 'react';

/** Visual size step on the display type scale (1 is the largest). */
export type HeadingLevel = 1 | 2 | 3 | 4;

/** Element rendered. Defaults to the `<h{level}>` matching `level`; pass a different tag when semantics and size differ. */
export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Visual size on the type scale: 1 → `fontSize-5` (36), 2 → `fontSize-4` (28), 3 → `fontSize-3` (20),
   * 4 → `fontSize-2` (16). Also picks the default element (`h1`…`h4`).
   */
  level?: HeadingLevel;
  /**
   * Element to render, so document semantics and visual size can differ (e.g. a level-1 look on an `h2`
   * in a page that already has an `h1`).
   * @default `h${level}`
   */
  as?: HeadingElement;
  /** Clip overflowing text to a single line with an ellipsis. */
  truncate?: boolean;
  /** Heading text. */
  children?: ReactNode;
}
