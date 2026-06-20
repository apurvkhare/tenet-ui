import type {
  HTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
  ReactNode,
} from 'react';

export type TableDensity = 'condensed' | 'normal' | 'spacious';
export type CellAlign = 'start' | 'center' | 'end';
export type SortDirection = 'ascending' | 'descending' | 'none';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Row height / cell padding scale. */
  density?: TableDensity;
  children?: ReactNode;
}

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface TableTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export interface TableSubtitleProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export interface TableActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface TableSectionProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
}

export interface TableHeaderProps extends Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align'> {
  /** Text alignment within the header cell. */
  align?: CellAlign;
  /** When set, renders a sort indicator and exposes `aria-sort`. Combine with `onClick`. */
  sortDirection?: SortDirection;
  children?: ReactNode;
}

export interface TableCellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
  /** Text alignment within the cell. */
  align?: CellAlign;
  children?: ReactNode;
}
