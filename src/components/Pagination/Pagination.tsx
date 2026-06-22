import { forwardRef } from 'react';
import type { PaginationProps } from './Pagination.types';
import './Pagination.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

const ELLIPSIS = 'ellipsis';

/** Page numbers to render: always first + last, a window around current, ellipses for gaps. */
function pageItems(page: number, pageCount: number, siblingCount: number): Array<number | typeof ELLIPSIS> {
  if (pageCount <= 1) return [1];
  const items: Array<number | typeof ELLIPSIS> = [1];
  const left = Math.max(2, page - siblingCount);
  const right = Math.min(pageCount - 1, page + siblingCount);
  if (left > 2) items.push(ELLIPSIS);
  for (let i = left; i <= right; i++) items.push(i);
  if (right < pageCount - 1) items.push(ELLIPSIS);
  items.push(pageCount);
  return items;
}

/**
 * Tenet pagination — navigate a paged result set. Renders a `<nav>` landmark of real `<button>`s
 * (keyboard-operable by construction), marks the current page with `aria-current="page"`, and
 * disables Previous/Next at the ends. Long ranges collapse with ellipses around a window of pages.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { page, pageCount, onPageChange, siblingCount = 1, className, 'aria-label': ariaLabel = 'Pagination' },
  ref,
) {
  const items = pageItems(page, pageCount, siblingCount);
  const go = (p: number) => {
    if (p >= 1 && p <= pageCount && p !== page) onPageChange(p);
  };

  return (
    <nav ref={ref} aria-label={ariaLabel} className={cx('Tenet-Pagination', className)}>
      <ul className="Tenet-Pagination__list">
        <li>
          <button
            type="button"
            className="Tenet-Pagination__btn Tenet-Pagination__btn--nav"
            onClick={() => go(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            ‹
          </button>
        </li>
        {items.map((item, i) =>
          item === ELLIPSIS ? (
            <li key={`e${i}`} className="Tenet-Pagination__ellipsis" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={cx('Tenet-Pagination__btn', item === page && 'Tenet-Pagination__btn--current')}
                onClick={() => go(item)}
                aria-current={item === page ? 'page' : undefined}
                aria-label={`Page ${item}`}
              >
                {item}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            className="Tenet-Pagination__btn Tenet-Pagination__btn--nav"
            onClick={() => go(page + 1)}
            disabled={page >= pageCount}
            aria-label="Next page"
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
});
