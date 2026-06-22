import { forwardRef } from 'react';
import type { ProgressBarProps } from './ProgressBar.types';
import './ProgressBar.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

const clamp = (n: number, min: number, max: number): number => Math.min(Math.max(n, min), max);

/**
 * Tenet progress bar — a `role="progressbar"` feedback indicator for the progress of a task.
 *
 * Determinate (a `value` is given): shows a fixed fill and reports `aria-valuenow` plus a readable
 * `aria-valuetext` (e.g. "42%"). Omit `value` for an INDETERMINATE bar (unknown duration) that runs
 * an animated sweep and omits `aria-valuenow`.
 *
 * The one rule people get wrong: a progressbar has no inherent label, so you MUST pass an accessible
 * name via `aria-label` or `aria-labelledby` — otherwise screen readers announce it nameless.
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value, max = 100, size = 'medium', variant = 'accent', className, style, ...rest },
  ref,
) {
  const isIndeterminate = value === undefined;
  const safeMax = max > 0 ? max : 100;
  const clamped = isIndeterminate ? undefined : clamp(value, 0, safeMax);
  const percent = clamped === undefined ? undefined : Math.round((clamped / safeMax) * 100);

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={isIndeterminate ? undefined : clamped}
      aria-valuetext={isIndeterminate ? undefined : `${percent}%`}
      className={cx(
        'Tenet-ProgressBar',
        `Tenet-ProgressBar--size-${size}`,
        `Tenet-ProgressBar--variant-${variant}`,
        isIndeterminate && 'Tenet-ProgressBar--indeterminate',
        className,
      )}
      style={style}
      {...rest}
    >
      <div
        className="Tenet-ProgressBar__fill"
        style={isIndeterminate ? undefined : { width: `${percent}%` }}
      />
    </div>
  );
});
