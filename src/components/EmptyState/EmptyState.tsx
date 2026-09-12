import { forwardRef } from 'react';
import type { EmptyStateProps } from './EmptyState.types';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { Stack } from '../Stack';
import './EmptyState.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet empty state — what a table, list, search or inbox shows when it has nothing to show. A centered
 * headline, an optional explanation, a decorative icon and up to two next-step actions, composed from
 * `Heading`, `Text` and `Stack`. Use it instead of an improvised centered `<div>`; keep the title
 * specific ("No results for 'budget'") and make `action` the one thing that fixes the emptiness.
 * `headingLevel` sets the title's rank in the outline; its visual size follows `size`.
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { title, description, icon, action, secondaryAction, size = 'medium', headingLevel = 3, className, ...rest },
  ref,
) {
  const hasActions = Boolean(action || secondaryAction);
  return (
    <Stack
      ref={ref}
      align="center"
      gap={size === 'large' ? 'spacious' : 'normal'}
      className={cx('Tenet-EmptyState', `Tenet-EmptyState--size-${size}`, className)}
      {...rest}
    >
      {icon && (
        <span className="Tenet-EmptyState__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <Stack align="center" gap="condensed" className="Tenet-EmptyState__body">
        <Heading level={size === 'large' ? 2 : 3} as={`h${headingLevel}`} className="Tenet-EmptyState__title">
          {title}
        </Heading>
        {description && (
          <Text
            tone="muted"
            size={size === 'large' ? 'large' : 'medium'}
            align="center"
            className="Tenet-EmptyState__description"
          >
            {description}
          </Text>
        )}
      </Stack>
      {hasActions && (
        <Stack direction="horizontal" gap="condensed" justify="center" align="center" wrap className="Tenet-EmptyState__actions">
          {action}
          {secondaryAction}
        </Stack>
      )}
    </Stack>
  );
});
