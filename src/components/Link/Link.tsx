import { forwardRef } from 'react';
import type { LinkProps } from './Link.types';
import './Link.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet link — an inline navigational anchor. Renders a real `<a>` (forwards its ref) so it keeps
 * native keyboard + activation behavior; style it with `muted` and `underline` instead of writing
 * raw anchor CSS. Always give it meaningful link text (not "click here"). For an off-site link pass
 * `external` so it opens in a new tab AND warns screen-reader users it does so.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { muted = false, underline = 'hover', external = false, className, children, ...rest },
  ref,
) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      ref={ref}
      className={cx(
        'Tenet-Link',
        muted && 'Tenet-Link--muted',
        `Tenet-Link--underline-${underline}`,
        className,
      )}
      {...externalProps}
      {...rest}
    >
      {children}
      {external && (
        <>
          <span className="Tenet-Link__externalIcon" aria-hidden="true">
            ↗
          </span>
          <span className="Tenet-visuallyHidden"> (opens in new tab)</span>
        </>
      )}
    </a>
  );
});
