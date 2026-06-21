// Small, dependency-free date helpers for Calendar / DatePicker. All operate on local time and
// treat a "date" as a calendar day (time-of-day is ignored for comparisons).

export type WeekStart = 0 | 1; // Sunday | Monday

export const startOfDay = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const startOfMonth = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), 1);
export const addDays = (d: Date, n: number): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
export const addMonths = (d: Date, n: number): Date => new Date(d.getFullYear(), d.getMonth() + n, d.getDate());

export const isSameDay = (a?: Date | null, b?: Date | null): boolean =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

/** True when `day` falls outside an optional [min, max] range (compared by calendar day). */
export const isOutOfRange = (day: Date, min?: Date | null, max?: Date | null): boolean => {
  const t = startOfDay(day).getTime();
  if (min && t < startOfDay(min).getTime()) return true;
  if (max && t > startOfDay(max).getTime()) return true;
  return false;
};

export const clampToRange = (day: Date, min?: Date | null, max?: Date | null): Date => {
  if (min && startOfDay(day).getTime() < startOfDay(min).getTime()) return startOfDay(min);
  if (max && startOfDay(day).getTime() > startOfDay(max).getTime()) return startOfDay(max);
  return day;
};

/** Stable yyyy-mm-dd key, used as a DOM attribute for roving focus. */
export const dayKey = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** The 42 days (6 weeks) covering the month that contains `month`, aligned to `weekStartsOn`. */
export function monthGrid(month: Date, weekStartsOn: WeekStart): Date[] {
  const first = startOfMonth(month);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
}

/** Localised weekday labels (narrow, e.g. S M T W T F S) ordered from `weekStartsOn`. */
export function weekdayLabels(weekStartsOn: WeekStart, locale?: string): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  // 2023-01-01 is a Sunday — a known anchor to walk from.
  const sunday = new Date(2023, 0, 1);
  return Array.from({ length: 7 }, (_, i) => fmt.format(addDays(sunday, (i + weekStartsOn) % 7)));
}

export const formatMonthYear = (d: Date, locale?: string): string =>
  new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(d);

export const formatFullDate = (d: Date, locale?: string): string =>
  new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(d);

export const formatDate = (d: Date, locale?: string): string =>
  new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
