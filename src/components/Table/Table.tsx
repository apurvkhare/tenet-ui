import { forwardRef } from 'react';
import type {
  TableActionsProps,
  TableCellProps,
  TableContainerProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
  TableSubtitleProps,
  TableTitleProps,
} from './Table.types';
import './Table.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

const sortGlyph = { ascending: '▲', descending: '▼', none: '↕' } as const;

/**
 * Acme data table. Compose with `Table.Container` (titled surface) + `Table.Head/Body/Row/
 * Header/Cell`. Styling, spacing and borders all come from tokens — never build a table out of
 * styled `<div>`s. Use real `<th scope="col">` headers for accessibility.
 */
const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(
  { density = 'normal', className, children, ...rest },
  ref,
) {
  return (
    <table ref={ref} className={cx('Acme-Table', `Acme-Table--density-${density}`, className)} {...rest}>
      {children}
    </table>
  );
});

const Container = forwardRef<HTMLDivElement, TableContainerProps>(function TableContainer(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('Acme-Table__container', className)} {...rest}>
      {children}
    </div>
  );
});

const Title = forwardRef<HTMLHeadingElement, TableTitleProps>(function TableTitle(
  { className, children, ...rest },
  ref,
) {
  return (
    <h2 ref={ref} className={cx('Acme-Table__title', className)} {...rest}>
      {children}
    </h2>
  );
});

const Subtitle = forwardRef<HTMLParagraphElement, TableSubtitleProps>(function TableSubtitle(
  { className, children, ...rest },
  ref,
) {
  return (
    <p ref={ref} className={cx('Acme-Table__subtitle', className)} {...rest}>
      {children}
    </p>
  );
});

const Actions = forwardRef<HTMLDivElement, TableActionsProps>(function TableActions(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('Acme-Table__actions', className)} {...rest}>
      {children}
    </div>
  );
});

const Head = forwardRef<HTMLTableSectionElement, TableSectionProps>(function TableHead(
  { className, children, ...rest },
  ref,
) {
  return (
    <thead ref={ref} className={cx('Acme-Table__head', className)} {...rest}>
      {children}
    </thead>
  );
});

const Body = forwardRef<HTMLTableSectionElement, TableSectionProps>(function TableBody(
  { className, children, ...rest },
  ref,
) {
  return (
    <tbody ref={ref} className={cx('Acme-Table__body', className)} {...rest}>
      {children}
    </tbody>
  );
});

const Row = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, children, ...rest },
  ref,
) {
  return (
    <tr ref={ref} className={cx('Acme-Table__row', className)} {...rest}>
      {children}
    </tr>
  );
});

const Header = forwardRef<HTMLTableCellElement, TableHeaderProps>(function TableHeader(
  { align = 'start', sortDirection, scope = 'col', className, children, ...rest },
  ref,
) {
  const sortable = sortDirection !== undefined;
  return (
    <th
      ref={ref}
      scope={scope}
      aria-sort={sortable ? sortDirection : undefined}
      className={cx('Acme-Table__header', `Acme-Table__cell--align-${align}`, sortable && 'Acme-Table__header--sortable', className)}
      {...rest}
    >
      {children}
      {sortable && (
        <span className="Acme-Table__sort" aria-hidden="true">
          {sortGlyph[sortDirection]}
        </span>
      )}
    </th>
  );
});

const Cell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { align = 'start', className, children, ...rest },
  ref,
) {
  return (
    <td ref={ref} className={cx('Acme-Table__cell', `Acme-Table__cell--align-${align}`, className)} {...rest}>
      {children}
    </td>
  );
});

export const Table = Object.assign(TableRoot, {
  Container,
  Title,
  Subtitle,
  Actions,
  Head,
  Body,
  Row,
  Header,
  Cell,
});
