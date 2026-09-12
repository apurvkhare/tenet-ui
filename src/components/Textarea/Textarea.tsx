import { forwardRef } from 'react';
import type { TextareaProps } from './Textarea.types';
import './Textarea.css';
import { resolveFullWidth } from '../../internal/deprecate';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/**
 * Tenet multi-line text field. A real, accessible `<textarea>` with token-based chrome — use it
 * instead of a raw `<textarea>`. Always give it an accessible name via FormControl or `aria-label`.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { fullWidth, block, invalid = false, resize = 'vertical', size = 'medium', rows = 4, className, ...rest },
  ref,
) {
  const isFullWidth = resolveFullWidth('Textarea', fullWidth, block);
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cx(
        'Tenet-Textarea',
        `Tenet-Textarea--size-${size}`,
        isFullWidth && 'Tenet-Textarea--fullWidth',
        invalid && 'Tenet-Textarea--invalid',
        `Tenet-Textarea--resize-${resize}`,
        className,
      )}
      {...rest}
    />
  );
});
