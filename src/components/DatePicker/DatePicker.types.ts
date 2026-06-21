import type { WeekStart } from '../Calendar/dateUtils';

export type DatePickerSize = 'small' | 'medium' | 'large';

export interface DatePickerProps {
  /** Controlled selected date (null = empty). */
  value?: Date | null;
  /** Uncontrolled initial selected date. */
  defaultValue?: Date | null;
  /** Called with the chosen date. */
  onChange?: (date: Date) => void;
  /** Earliest selectable day (inclusive). */
  min?: Date;
  /** Latest selectable day (inclusive). */
  max?: Date;
  /** First day of the week: 0 = Sunday (default), 1 = Monday. */
  weekStartsOn?: WeekStart;
  /** BCP-47 locale for the displayed date + calendar. Defaults to the runtime locale. */
  locale?: string;
  /** Text shown in the trigger when no date is selected. */
  placeholder?: string;
  /** Control height / font scale. */
  size?: DatePickerSize;
  /** Stretch the trigger to fill the available width. */
  block?: boolean;
  /** Invalid state (danger border + aria-invalid). */
  invalid?: boolean;
  /** Disable the control. */
  disabled?: boolean;
  /** Required (sets aria-required; pairs with FormControl). */
  required?: boolean;
  /** Form field name — emits a hidden input (yyyy-mm-dd) so the value submits with a form. */
  name?: string;
  /** Id applied to the trigger (FormControl sets this automatically). */
  id?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}
