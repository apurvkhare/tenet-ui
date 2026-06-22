export interface PaginationProps {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  /** Called with the requested page when the user navigates. */
  onPageChange: (page: number) => void;
  /** How many page numbers to show around the current page. */
  siblingCount?: number;
  /** Accessible name for the nav landmark. */
  'aria-label'?: string;
  className?: string;
}
