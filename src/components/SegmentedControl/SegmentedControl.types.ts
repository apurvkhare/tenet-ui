export interface SegmentedControlOption {
  /** Value reported on change. */
  value: string;
  /** Visible label. */
  label: string;
  /** Disable this segment. */
  disabled?: boolean;
}

import type { HTMLAttributes } from 'react';

export type SegmentedControlSize = 'small' | 'medium';

// Extends the root div's attrs so consumers can pass id, data-*, style, onFocus, etc.
export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** The segments to choose from. */
  options: SegmentedControlOption[];
  /** Controlled selected value. */
  value?: string;
  /**
   * Uncontrolled initial value.
   * @default first enabled option
   */
  defaultValue?: string;
  /** Called with the newly selected value. */
  onChange?: (value: string) => void;
  /** Control height / font scale. */
  size?: SegmentedControlSize;
  /** Stretch segments to fill the available width. */
  fullWidth?: boolean;
  /**
   * Stretch segments to fill the available width.
   * @deprecated Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.6.0.
   */
  block?: boolean;
  /** Accessible name for the group (required for screen readers). */
  'aria-label'?: string;
  className?: string;
}
