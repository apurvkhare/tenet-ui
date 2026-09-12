import type { HTMLAttributes, ReactNode } from 'react';

/** Overall scale: `medium` for an empty table/list region, `large` for a whole-page or first-run state. */
export type EmptyStateSize = 'medium' | 'large';
/** Heading rank of the title in the document outline. */
export type EmptyStateHeadingLevel = 2 | 3 | 4;

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Short, specific headline — say what is empty ("No stories yet"), not just "Nothing here". */
  title: string;
  /** One or two sentences: why it is empty and what to do next. Inline content (rendered in a muted `Text`). */
  description?: ReactNode;
  /** Decorative illustration or icon; wrapped `aria-hidden` — the title carries the meaning. */
  icon?: ReactNode;
  /** The primary next step, usually a `Button variant="primary"`. */
  action?: ReactNode;
  /** An optional secondary step next to `action` (a default/invisible `Button` or a `Link`). */
  secondaryAction?: ReactNode;
  /** Overall scale: `medium` for a region inside a page, `large` for a whole-page/first-run state. */
  size?: EmptyStateSize;
  /**
   * Semantic heading rank of the title (`h2`/`h3`/`h4`) so it fits the surrounding outline. The visual
   * size follows `size`, not this prop.
   */
  headingLevel?: EmptyStateHeadingLevel;
}
