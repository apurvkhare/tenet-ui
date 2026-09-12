import type { ReactNode } from 'react';
import type { CellAlign, TableDensity } from '../Table/Table.types';

export interface DataTableColumn<Row> {
  /** Stable key — also used to read the cell value when `accessor` is omitted. */
  id: string;
  /** Column heading text. */
  header: ReactNode;
  /** Read the raw value for a row. Defaults to `row[id]`. Used for sorting + filtering. */
  accessor?: (row: Row) => unknown;
  /** Custom cell renderer. Defaults to rendering the accessor value as text. */
  cell?: (row: Row) => ReactNode;
  /** Cell + header alignment. */
  align?: CellAlign;
  /** Allow clicking the header to sort by this column. */
  sortable?: boolean;
  /** Show a per-column dropdown filter built from the distinct values in the data. */
  filterable?: boolean;
}

export interface DataTableProps<Row> {
  /** Column definitions, left to right. */
  columns: DataTableColumn<Row>[];
  /** The rows to render. */
  data: Row[];
  /**
   * Stable React key for a row. Defaults to the row index.
   * @default index
   */
  rowKey?: (row: Row, index: number) => string | number;
  /** Show the global search box. */
  searchable?: boolean;
  /** Placeholder for the global search box. */
  searchPlaceholder?: string;
  /** Optional surface title (rendered in a `Table.Container`). */
  title?: ReactNode;
  /** Optional surface subtitle. */
  subtitle?: ReactNode;
  /** Actions rendered at the top-right of the toolbar (e.g. a "New" button). */
  actions?: ReactNode;
  /** Row height / cell padding scale. */
  density?: TableDensity;
  /** Message shown when no rows match the active filters. */
  emptyText?: ReactNode;
  className?: string;
}
