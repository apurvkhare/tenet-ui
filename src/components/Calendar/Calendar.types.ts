import type { WeekStart } from './dateUtils';

export type { WeekStart };

export interface CalendarProps {
  /** Controlled selected date (null = nothing selected). */
  value?: Date | null;
  /** Uncontrolled initial selected date. */
  defaultValue?: Date | null;
  /** Called with the chosen date. */
  onChange?: (date: Date) => void;
  /** Controlled visible month (any day within the month). */
  month?: Date;
  /** Uncontrolled initial visible month. Defaults to the selected date's month, else today. */
  defaultMonth?: Date;
  /** Called when the visible month changes (nav buttons / keyboard paging). */
  onMonthChange?: (month: Date) => void;
  /** Earliest selectable day (inclusive). */
  min?: Date;
  /** Latest selectable day (inclusive). */
  max?: Date;
  /** First day of the week: 0 = Sunday (default), 1 = Monday. */
  weekStartsOn?: WeekStart;
  /** BCP-47 locale for month / weekday formatting. Defaults to the runtime locale. */
  locale?: string;
  className?: string;
  'aria-label'?: string;
}
