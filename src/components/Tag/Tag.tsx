import { forwardRef } from 'react';
import type { TagProps } from './Tag.types';
import './Tag.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet Tag — a removable chip for filter tokens and multi-select selections. Use it for
 * user-applied tokens the user can dismiss (e.g. active filters, selected recipients). For a
 * non-interactive status pill (passing/failing), use `Label` instead; for a count/dot, use `Badge`.
 *
 * The one rule people get wrong: Tag is stateless. Setting `onRemove` renders a real <button>, but
 * the parent owns the collection — your handler must drop the item, Tag won't remove itself.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { variant = 'default', size = 'medium', leadingIcon, onRemove, removeLabel, className, children, ...rest },
  ref,
) {
  // Derive an accessible label for the remove control.
  const label =
    typeof children === 'string' && children.length > 0
      ? children
      : removeLabel && removeLabel.length > 0
        ? removeLabel
        : 'Remove';
  const removeAriaLabel = removeLabel && removeLabel.length > 0 ? removeLabel : `Remove ${label}`;

  return (
    <span
      ref={ref}
      className={cx(
        'Tenet-Tag',
        `Tenet-Tag--variant-${variant}`,
        `Tenet-Tag--size-${size}`,
        onRemove && 'Tenet-Tag--removable',
        className,
      )}
      {...rest}
    >
      {leadingIcon != null && (
        <span className="Tenet-Tag__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className="Tenet-Tag__label">{children}</span>
      {onRemove && (
        <button type="button" className="Tenet-Tag__remove" aria-label={removeAriaLabel} onClick={onRemove}>
          <span aria-hidden="true">✕</span>
        </button>
      )}
    </span>
  );
});
