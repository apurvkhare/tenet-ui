import type { HTMLAttributes, ReactNode } from 'react';

export interface BreadcrumbItem {
  /** Visible label. */
  label: ReactNode;
  /** Link target. Omit for the current page (rendered as plain text). */
  href?: string;
}

export interface BreadcrumbsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Ordered trail, root first. The last item is treated as the current page. */
  items: BreadcrumbItem[];
  /**
   * Accessible name for the nav landmark.
   * @default Breadcrumb
   */
  'aria-label'?: string;
  /** Separator glyph between items. */
  separator?: ReactNode;
}
