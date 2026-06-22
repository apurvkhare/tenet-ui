import { forwardRef } from 'react';
import type { BreadcrumbsProps } from './Breadcrumbs.types';
import './Breadcrumbs.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet breadcrumbs — the path from the root to the current page. Renders a `<nav>` landmark with
 * an ordered list; the last item is the current page (`aria-current="page"`, not a link). Pass an
 * `aria-label` so multiple navs on a page are distinguishable.
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  { items, separator = '/', className, 'aria-label': ariaLabel = 'Breadcrumb', ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label={ariaLabel} className={cx('Tenet-Breadcrumbs', className)} {...rest}>
      <ol className="Tenet-Breadcrumbs__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="Tenet-Breadcrumbs__item">
              {item.href && !isLast ? (
                <a href={item.href} className="Tenet-Breadcrumbs__link">
                  {item.label}
                </a>
              ) : (
                <span className="Tenet-Breadcrumbs__current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="Tenet-Breadcrumbs__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
