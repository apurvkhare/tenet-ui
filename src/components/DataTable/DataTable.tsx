import { useMemo, useState } from 'react';
import { Table } from '../Table';
import { TextInput } from '../TextInput';
import { Select } from '../Select';
import { Stack } from '../Stack';
import type { SortDirection } from '../Table/Table.types';
import type { DataTableColumn, DataTableProps } from './DataTable.types';
import './DataTable.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

function readValue<Row>(column: DataTableColumn<Row>, row: Row): unknown {
  if (column.accessor) return column.accessor(row);
  return (row as Record<string, unknown>)[column.id];
}

const toText = (value: unknown): string => (value == null ? '' : String(value));

function compare(a: unknown, b: unknown): number {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return toText(a).localeCompare(toText(b), undefined, { numeric: true });
}

interface SortState {
  columnId: string;
  direction: Exclude<SortDirection, 'none'>;
}

/**
 * Tenet data table. A higher-level table driven by `columns` + `data`: optional global search,
 * per-column dropdown filters, and client-side sort — all built on the `Table` primitives and
 * the `TextInput` / `Select` fields, so it stays on-system. For a fully custom layout, drop down
 * to `Table.*` directly.
 */
export function DataTable<Row>({
  columns,
  data,
  rowKey,
  searchable = true,
  searchPlaceholder = 'Search…',
  title,
  subtitle,
  actions,
  density = 'normal',
  emptyText = 'No matching rows.',
  className,
}: DataTableProps<Row>) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<SortState | null>(null);

  const filterableColumns = columns.filter((c) => c.filterable);

  // Distinct values per filterable column, for its dropdown.
  const filterOptions = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const column of filterableColumns) {
      const seen = new Set<string>();
      for (const row of data) {
        const text = toText(readValue(column, row));
        if (text !== '') seen.add(text);
      }
      map[column.id] = Array.from(seen).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, columns]);

  const rows = useMemo(() => {
    let result = data;

    // Per-column filters.
    for (const column of filterableColumns) {
      const active = filters[column.id];
      if (active) result = result.filter((row) => toText(readValue(column, row)) === active);
    }

    // Global search across every column.
    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter((row) =>
        columns.some((column) => toText(readValue(column, row)).toLowerCase().includes(query)),
      );
    }

    // Sort.
    if (sort) {
      const column = columns.find((c) => c.id === sort.columnId);
      if (column) {
        const sign = sort.direction === 'ascending' ? 1 : -1;
        result = [...result].sort((a, b) => sign * compare(readValue(column, a), readValue(column, b)));
      }
    }

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, columns, filters, search, sort]);

  const toggleSort = (columnId: string) => {
    setSort((prev) => {
      if (prev?.columnId !== columnId) return { columnId, direction: 'ascending' };
      if (prev.direction === 'ascending') return { columnId, direction: 'descending' };
      return null; // third click clears sorting
    });
  };

  const sortDirectionFor = (columnId: string): SortDirection =>
    sort?.columnId === columnId ? sort.direction : 'none';

  return (
    <div className={cx('Tenet-DataTable', className)}>
      <Table.Container>
        {(title || subtitle || actions) && (
          <Stack direction="horizontal" align="center" justify="between" className="Tenet-DataTable__header">
            <Stack.Item grow>
              {title && <Table.Title>{title}</Table.Title>}
              {subtitle && <Table.Subtitle>{subtitle}</Table.Subtitle>}
            </Stack.Item>
            {actions}
          </Stack>
        )}

        {(searchable || filterableColumns.length > 0) && (
          <Stack direction="horizontal" gap="condensed" align="center" wrap className="Tenet-DataTable__toolbar">
            {searchable && (
              <TextInput
                aria-label="Search"
                leadingVisual={<span aria-hidden="true">🔍</span>}
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="Tenet-DataTable__search"
              />
            )}
            {filterableColumns.map((column) => (
              <Select
                key={column.id}
                aria-label={`Filter by ${typeof column.header === 'string' ? column.header : column.id}`}
                value={filters[column.id] ?? ''}
                onChange={(value) => setFilters((prev) => ({ ...prev, [column.id]: value }))}
                options={[
                  { value: '', label: 'All' },
                  ...filterOptions[column.id].map((v) => ({ value: v, label: v })),
                ]}
              />
            ))}
          </Stack>
        )}

        <Table density={density}>
          <Table.Head>
            <Table.Row>
              {columns.map((column) => (
                <Table.Header
                  key={column.id}
                  align={column.align}
                  sortDirection={column.sortable ? sortDirectionFor(column.id) : undefined}
                  onClick={column.sortable ? () => toggleSort(column.id) : undefined}
                >
                  {column.header}
                </Table.Header>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {rows.length === 0 ? (
              <Table.Row>
                <Table.Cell align="center" colSpan={columns.length} className="Tenet-DataTable__empty">
                  {emptyText}
                </Table.Cell>
              </Table.Row>
            ) : (
              rows.map((row, index) => (
                <Table.Row key={rowKey ? rowKey(row, index) : index}>
                  {columns.map((column) => (
                    <Table.Cell key={column.id} align={column.align}>
                      {column.cell ? column.cell(row) : toText(readValue(column, row))}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </Table.Container>
    </div>
  );
}
