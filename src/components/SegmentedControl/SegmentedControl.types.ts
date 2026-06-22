export interface SegmentedControlOption {
  /** Value reported on change. */
  value: string;
  /** Visible label. */
  label: string;
  /** Disable this segment. */
  disabled?: boolean;
}

export type SegmentedControlSize = 'small' | 'medium';

export interface SegmentedControlProps {
  /** The segments to choose from. */
  options: SegmentedControlOption[];
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Called with the newly selected value. */
  onChange?: (value: string) => void;
  /** Control height / font scale. */
  size?: SegmentedControlSize;
  /** Stretch segments to fill the available width. */
  block?: boolean;
  /** Accessible name for the group (required for screen readers). */
  'aria-label'?: string;
  className?: string;
}
