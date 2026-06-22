import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, HTMLAttributes, InputHTMLAttributes, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes, ReactElement } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type ButtonVariant = 'default' | 'primary' | 'danger' | 'invisible';
type ButtonSize = 'small' | 'medium' | 'large';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style of the button. Use `primary` for the single most important action per surface. */
    variant?: ButtonVariant;
    /** Control height / padding scale. */
    size?: ButtonSize;
    /** Icon rendered before the label. */
    leadingIcon?: ReactNode;
    /** Icon rendered after the label. */
    trailingIcon?: ReactNode;
    /** Stretch the button to fill the available width. */
    block?: boolean;
    /** Button label. */
    children?: ReactNode;
}

/**
 * Tenet action button. Use `variant="primary"` for the single most important action on a
 * surface, `default` for secondary actions, `invisible` for tertiary, and `danger` for
 * destructive actions. All styling comes from design tokens — never hardcode colors or spacing.
 */
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

type StackDirection = 'horizontal' | 'vertical';
type StackGap = 'none' | 'condensed' | 'normal' | 'spacious';
type StackAlign = 'start' | 'center' | 'end' | 'stretch';
type StackJustify = 'start' | 'center' | 'end' | 'between';
type StackPadding = 'none' | 'condensed' | 'normal' | 'spacious';
interface StackProps extends HTMLAttributes<HTMLDivElement> {
    /** Main-axis direction. */
    direction?: StackDirection;
    /** Space between children, from the `space` scale (condensed=8, normal=16, spacious=24). */
    gap?: StackGap;
    /** Cross-axis alignment (maps to `align-items`). */
    align?: StackAlign;
    /** Main-axis distribution (maps to `justify-content`). */
    justify?: StackJustify;
    /** Allow children to wrap onto multiple lines. */
    wrap?: boolean;
    /** Inner padding, from the `space` scale. */
    padding?: StackPadding;
    children?: ReactNode;
}
interface StackItemProps extends HTMLAttributes<HTMLDivElement> {
    /** Grow to fill the available space along the main axis. */
    grow?: boolean;
    children?: ReactNode;
}

declare const Stack: react.ForwardRefExoticComponent<StackProps & react.RefAttributes<HTMLDivElement>> & {
    Item: react.ForwardRefExoticComponent<StackItemProps & react.RefAttributes<HTMLDivElement>>;
};

type CardVariant = 'default' | 'muted';
type CardPadding = 'none' | 'condensed' | 'normal' | 'spacious';
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** Surface style. `default` sits on the page; `muted` is a recessed/secondary surface. */
    variant?: CardVariant;
    /** Inner padding, from the `space` scale. */
    padding?: CardPadding;
    children?: ReactNode;
}

/**
 * Tenet surface container — a bordered, rounded panel for grouping content (the design-system
 * way to make a "box"). Border, radius, background and elevation all come from tokens; never
 * hand-roll a styled `<div>` with hardcoded border/shadow values.
 */
declare const Card: react.ForwardRefExoticComponent<CardProps & react.RefAttributes<HTMLDivElement>>;

type TextInputSize = 'small' | 'medium' | 'large';
interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Control height / font scale. */
    size?: TextInputSize;
    /** Stretch the field to fill the available width. */
    block?: boolean;
    /** Element rendered before the input (e.g. a search icon). */
    leadingVisual?: ReactNode;
    /** Element rendered after the input. */
    trailingVisual?: ReactNode;
    /** Mark the field as invalid (sets `aria-invalid` and a danger border). */
    invalid?: boolean;
}

/**
 * Tenet text field. Renders a real, accessible `<input>` wrapped with token-based chrome —
 * use this instead of a raw `<input>` so border, height, spacing and focus styling stay on-system.
 * Always pass an accessible name via `aria-label` or an associated `<label>`.
 */
declare const TextInput: react.ForwardRefExoticComponent<TextInputProps & react.RefAttributes<HTMLInputElement>>;

type LabelVariant = 'default' | 'accent' | 'success' | 'danger' | 'attention' | 'muted';
type LabelSize = 'small' | 'medium';
interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
    /** Semantic color scheme. Pick by meaning (success/danger/accent), not by raw color. */
    variant?: LabelVariant;
    /** Label size. */
    size?: LabelSize;
    children?: ReactNode;
}

/**
 * Tenet status label / pill. Choose a `variant` by meaning (success, danger, accent) — the colors
 * are owned by the design system, so consumers never compute their own fills or borders. This is
 * the on-system replacement for a hand-styled `<span>` with hardcoded translucent colors.
 */
declare const Label$1: react.ForwardRefExoticComponent<LabelProps & react.RefAttributes<HTMLSpanElement>>;

type TableDensity = 'condensed' | 'normal' | 'spacious';
type CellAlign = 'start' | 'center' | 'end';
type SortDirection = 'ascending' | 'descending' | 'none';
interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    /** Row height / cell padding scale. */
    density?: TableDensity;
    children?: ReactNode;
}
interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
interface TableTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
}
interface TableSubtitleProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: ReactNode;
}
interface TableActionsProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
interface TableSectionProps extends HTMLAttributes<HTMLTableSectionElement> {
    children?: ReactNode;
}
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    children?: ReactNode;
}
interface TableHeaderProps extends Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align'> {
    /** Text alignment within the header cell. */
    align?: CellAlign;
    /** When set, renders a sort indicator and exposes `aria-sort`. Combine with `onClick`. */
    sortDirection?: SortDirection;
    children?: ReactNode;
}
interface TableCellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'> {
    /** Text alignment within the cell. */
    align?: CellAlign;
    children?: ReactNode;
}

declare const Table: react.ForwardRefExoticComponent<TableProps & react.RefAttributes<HTMLTableElement>> & {
    Container: react.ForwardRefExoticComponent<TableContainerProps & react.RefAttributes<HTMLDivElement>>;
    Title: react.ForwardRefExoticComponent<TableTitleProps & react.RefAttributes<HTMLHeadingElement>>;
    Subtitle: react.ForwardRefExoticComponent<TableSubtitleProps & react.RefAttributes<HTMLParagraphElement>>;
    Actions: react.ForwardRefExoticComponent<TableActionsProps & react.RefAttributes<HTMLDivElement>>;
    Head: react.ForwardRefExoticComponent<TableSectionProps & react.RefAttributes<HTMLTableSectionElement>>;
    Body: react.ForwardRefExoticComponent<TableSectionProps & react.RefAttributes<HTMLTableSectionElement>>;
    Row: react.ForwardRefExoticComponent<TableRowProps & react.RefAttributes<HTMLTableRowElement>>;
    Header: react.ForwardRefExoticComponent<TableHeaderProps & react.RefAttributes<HTMLTableCellElement>>;
    Cell: react.ForwardRefExoticComponent<TableCellProps & react.RefAttributes<HTMLTableCellElement>>;
};

type ValidationVariant = 'error' | 'success';
interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
    /** Override the generated id shared by the label and field. */
    id?: string;
    /** Marks the field required (asterisk on the label + `required` on the input). */
    required?: boolean;
    /** Disables the field. */
    disabled?: boolean;
    /** Force the invalid state. Otherwise inferred from a `FormControl.Validation variant="error"`. */
    invalid?: boolean;
    children?: ReactNode;
}
interface FormControlLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    /** Visually hide the label but keep it for screen readers. */
    visuallyHidden?: boolean;
    /** Injected by FormControl — renders the required asterisk. */
    required?: boolean;
    children?: ReactNode;
}
interface FormControlCaptionProps extends HTMLAttributes<HTMLSpanElement> {
    children?: ReactNode;
}
interface FormControlValidationProps extends HTMLAttributes<HTMLSpanElement> {
    /** Tone of the message. `error` also drives the field's invalid state. */
    variant?: ValidationVariant;
    children?: ReactNode;
}

/** Field label. Rendered by FormControl with `htmlFor` + required state wired automatically. */
declare function Label({ visuallyHidden, required, className, children, ...rest }: FormControlLabelProps): react_jsx_runtime.JSX.Element;
/** Helper text below the field, associated via `aria-describedby`. */
declare function Caption({ className, children, ...rest }: FormControlCaptionProps): react_jsx_runtime.JSX.Element;
/** Validation message. `variant="error"` also flips the field to its invalid state. */
declare function Validation({ variant, className, children, ...rest }: FormControlValidationProps): react_jsx_runtime.JSX.Element;
declare const FormControl: react.ForwardRefExoticComponent<FormControlProps & react.RefAttributes<HTMLDivElement>> & {
    Label: typeof Label;
    Caption: typeof Caption;
    Validation: typeof Validation;
};

type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Stretch to fill the available width. */
    block?: boolean;
    /** Mark the field invalid (sets aria-invalid and a danger border). */
    invalid?: boolean;
    /** Which directions the user may resize. */
    resize?: TextareaResize;
}

/**
 * Tenet multi-line text field. A real, accessible `<textarea>` with token-based chrome — use it
 * instead of a raw `<textarea>`. Always give it an accessible name via FormControl or `aria-label`.
 */
declare const Textarea: react.ForwardRefExoticComponent<TextareaProps & react.RefAttributes<HTMLTextAreaElement>>;

type SelectSize = 'small' | 'medium' | 'large';
interface SelectOption {
    /** Value submitted / reported on change. */
    value: string;
    /** Visible option text. */
    label: string;
    /** Disable this option. */
    disabled?: boolean;
}
interface SelectProps {
    /** The options to choose from. */
    options: SelectOption[];
    /** Controlled selected value. */
    value?: string;
    /** Uncontrolled initial value. */
    defaultValue?: string;
    /** Called with the newly selected value. */
    onChange?: (value: string) => void;
    /** Text shown when nothing is selected. */
    placeholder?: string;
    /** Control height / font scale. */
    size?: SelectSize;
    /** Stretch to fill the available width. */
    block?: boolean;
    /** Invalid state (danger border + aria-invalid). */
    invalid?: boolean;
    /** Disable the control. */
    disabled?: boolean;
    /** Required (sets aria-required; pairs with FormControl). */
    required?: boolean;
    /** Form field name — emits a hidden input so the value submits with a form. */
    name?: string;
    /** Id applied to the trigger (FormControl sets this automatically). */
    id?: string;
    className?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
}

/**
 * Tenet select — a real ARIA listbox combobox (not a native `<select>`). Styled menu, full
 * keyboard support (↑/↓/Home/End/Enter/Esc), typeahead, `aria-activedescendant`, click-outside,
 * controlled or uncontrolled. Token-styled, theme-aware, and FormControl-compatible. Always give
 * it an accessible name via FormControl or `aria-label`.
 */
declare const Select: react.ForwardRefExoticComponent<SelectProps & react.RefAttributes<HTMLButtonElement>>;

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Visible label rendered next to the box. */
    label?: ReactNode;
    /** Optional helper text under the label. */
    caption?: ReactNode;
}

/**
 * Tenet checkbox. A real `<input type="checkbox">` tinted with the accent token, with an
 * associated label and optional caption — use it instead of a styled `<div>` toggle.
 */
declare const Checkbox: react.ForwardRefExoticComponent<CheckboxProps & react.RefAttributes<HTMLInputElement>>;

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** The value submitted when this radio is selected (required). */
    value: string;
    /** Visible label rendered next to the control. */
    label?: ReactNode;
    /** Optional helper text under the label. */
    caption?: ReactNode;
}
interface RadioGroupProps extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
    /** Shared form field name. Auto-generated if omitted. */
    name?: string;
    /** Group label (rendered as a fieldset legend). */
    label: ReactNode;
    /** Optional helper text for the whole group. */
    caption?: ReactNode;
    /** Controlled selected value. */
    value?: string;
    /** Uncontrolled initial selected value. */
    defaultValue?: string;
    /** Called with the newly selected value. */
    onChange?: (value: string) => void;
    /** Mark the group required (asterisk on the legend). */
    required?: boolean;
    /** Disable every radio in the group. */
    disabled?: boolean;
    /** Radio children. */
    children?: ReactNode;
}

/**
 * Tenet radio. A real `<input type="radio">` tinted with the accent token. Use inside a
 * `RadioGroup`, which wires the shared `name` and selection for you.
 */
declare const Radio: react.ForwardRefExoticComponent<RadioProps & react.RefAttributes<HTMLInputElement>>;
/**
 * Tenet radio group. Renders a `<fieldset>`/`<legend>` and shares `name` + selection with its
 * `Radio` children via context — so grouping and accessibility are correct without prop drilling.
 */
declare const RadioGroup: react.ForwardRefExoticComponent<RadioGroupProps & react.RefAttributes<HTMLFieldSetElement>>;

type SwitchSize = 'small' | 'medium';
interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Visible label rendered next to the switch. */
    label?: ReactNode;
    /** Optional helper text under the label. */
    caption?: ReactNode;
    /** Control track / knob scale. */
    size?: SwitchSize;
    /** Mark the field as invalid (sets `aria-invalid` and a danger border). */
    invalid?: boolean;
}

/**
 * Tenet switch. A real `<input type="checkbox" role="switch">` styled as a sliding toggle —
 * use it for an immediate on/off setting (not for a value you submit on a separate save).
 * Keyboard + screen-reader behaviour comes from the native input; the track/knob are CSS.
 */
declare const Switch: react.ForwardRefExoticComponent<SwitchProps & react.RefAttributes<HTMLInputElement>>;

type NumberInputSize = 'small' | 'medium' | 'large';
interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange'> {
    /** Controlled value. Use `null`/`undefined` for an empty field. */
    value?: number | null;
    /** Uncontrolled initial value. */
    defaultValue?: number | null;
    /** Called with the parsed numeric value (or `null` when the field is cleared). */
    onChange?: (value: number | null) => void;
    /** Smallest allowed value. Stepping/clamping respects it. */
    min?: number;
    /** Largest allowed value. Stepping/clamping respects it. */
    max?: number;
    /** Increment applied by the steppers and arrow keys. */
    step?: number;
    /** Control height / font scale. */
    size?: NumberInputSize;
    /** Stretch the field to fill the available width. */
    block?: boolean;
    /** Mark the field as invalid (sets `aria-invalid` and a danger border). */
    invalid?: boolean;
}

/**
 * Tenet number field. A text input constrained to numbers, with +/- steppers and arrow-key
 * stepping that respect `min` / `max` / `step`. Reports a parsed `number | null` (not a string)
 * via `onChange`, so callers never re-parse. Always give it an accessible name.
 */
declare const NumberInput: react.ForwardRefExoticComponent<NumberInputProps & react.RefAttributes<HTMLInputElement>>;

interface DataTableColumn<Row> {
    /** Stable key — also used to read the cell value when `accessor` is omitted. */
    id: string;
    /** Column heading text. */
    header: ReactNode;
    /** Read the raw value for a row. Defaults to `row[id]`. Used for sorting + filtering. */
    accessor?: (row: Row) => unknown;
    /** Custom cell renderer. Defaults to rendering the accessor value as text. */
    cell?: (row: Row) => ReactNode;
    /** Cell + header alignment. */
    align?: CellAlign;
    /** Allow clicking the header to sort by this column. */
    sortable?: boolean;
    /** Show a per-column dropdown filter built from the distinct values in the data. */
    filterable?: boolean;
}
interface DataTableProps<Row> {
    /** Column definitions, left to right. */
    columns: DataTableColumn<Row>[];
    /** The rows to render. */
    data: Row[];
    /** Stable React key for a row. Defaults to the row index. */
    rowKey?: (row: Row, index: number) => string | number;
    /** Show the global search box. */
    searchable?: boolean;
    /** Placeholder for the global search box. */
    searchPlaceholder?: string;
    /** Optional surface title (rendered in a `Table.Container`). */
    title?: ReactNode;
    /** Optional surface subtitle. */
    subtitle?: ReactNode;
    /** Actions rendered at the top-right of the toolbar (e.g. a "New" button). */
    actions?: ReactNode;
    /** Row height / cell padding scale. */
    density?: TableDensity;
    /** Message shown when no rows match the active filters. */
    emptyText?: ReactNode;
    className?: string;
}

/**
 * Tenet data table. A higher-level table driven by `columns` + `data`: optional global search,
 * per-column dropdown filters, and client-side sort — all built on the `Table` primitives and
 * the `TextInput` / `Select` fields, so it stays on-system. For a fully custom layout, drop down
 * to `Table.*` directly.
 */
declare function DataTable<Row>({ columns, data, rowKey, searchable, searchPlaceholder, title, subtitle, actions, density, emptyText, className, }: DataTableProps<Row>): react_jsx_runtime.JSX.Element;

type WeekStart = 0 | 1;

interface CalendarProps {
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

/**
 * Tenet calendar — a month-grid date picker surface. Full keyboard support (arrows move by day/
 * week, Home/End jump within the week, PageUp/PageDown change month, Enter/Space select), a roving
 * tab stop, and the ARIA grid pattern. Use it inline, or let `DatePicker` host it in a popover.
 */
declare function Calendar({ value, defaultValue, onChange, month, defaultMonth, onMonthChange, min, max, weekStartsOn, locale, className, 'aria-label': ariaLabel, }: CalendarProps): react_jsx_runtime.JSX.Element;

type DatePickerSize = 'small' | 'medium' | 'large';
interface DatePickerProps {
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

/**
 * Tenet date picker — a token-styled field that opens a `Calendar` popover. Selecting a day (mouse
 * or keyboard) commits the value and closes the menu; Escape closes; clicking outside closes. The
 * trigger carries the ARIA combobox/dialog wiring, the Calendar carries the grid + keyboard model.
 * Controlled or uncontrolled, FormControl-compatible, and emits a hidden yyyy-mm-dd input when
 * given a `name`. Always give it an accessible name via FormControl or `aria-label`.
 */
declare const DatePicker: react.ForwardRefExoticComponent<DatePickerProps & react.RefAttributes<HTMLButtonElement>>;

type BannerVariant = 'info' | 'success' | 'warning' | 'danger';
interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Semantic tone. Pick by meaning, not color. */
    variant?: BannerVariant;
    /** Optional bold lead-in line. */
    title?: ReactNode;
    /** Replace the default leading icon. */
    icon?: ReactNode;
    /** Hide the leading icon entirely. */
    hideIcon?: boolean;
    /** When provided, renders a dismiss button that calls this. */
    onDismiss?: () => void;
    /** Body content. */
    children?: ReactNode;
}

/**
 * Tenet banner — an inline, contextual message tied to the content it sits near (form error,
 * page-level notice). Colors come from the semantic tint tokens. For transient, floating messages
 * use a toast instead; for a status word on a row, use `Label`.
 */
declare const Banner: react.ForwardRefExoticComponent<BannerProps & react.RefAttributes<HTMLDivElement>>;

type BadgeVariant = 'default' | 'accent' | 'success' | 'danger' | 'attention';
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /** Semantic color scheme. */
    variant?: BadgeVariant;
    /** Numeric count. Rendered with a `max+` overflow when above `max`. */
    count?: number;
    /** Overflow threshold for `count` (e.g. 99 -> "99+"). */
    max?: number;
    /** Render a bare status dot (no text). */
    dot?: boolean;
    /** Custom content (overrides count). */
    children?: ReactNode;
}

/**
 * Tenet badge — a small count or status dot, typically anchored to an icon or nav item. Use it for
 * quantities ("3 unread") or presence dots. For a labelled status word (passing/failing) use
 * `Label` instead.
 */
declare const Badge: react.ForwardRefExoticComponent<BadgeProps & react.RefAttributes<HTMLSpanElement>>;

type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
type AvatarShape = 'circle' | 'rounded';
interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Image URL. When omitted (or it fails to load), initials from `name` are shown. */
    src?: string;
    /** Person/entity name — used for initials and as the accessible label. */
    name: string;
    /** Size from the scale. */
    size?: AvatarSize;
    /** Circle (people) or rounded square (orgs/repos). */
    shape?: AvatarShape;
}

/**
 * Tenet avatar — an image, or initials derived from `name` when there is no image (or it fails to
 * load). Always pass `name`: it drives the initials and the accessible label, so an avatar is never
 * an unlabelled blob to assistive tech.
 */
declare const Avatar: react.ForwardRefExoticComponent<AvatarProps & react.RefAttributes<HTMLSpanElement>>;

type SpinnerSize = 'small' | 'medium' | 'large';
interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    /** Size from the scale. */
    size?: SpinnerSize;
    /** Accessible label announced to assistive tech (visually hidden). */
    label?: string;
}

/**
 * Tenet spinner — an indeterminate loading indicator. Renders `role="status"` with a visually
 * hidden label so screen readers announce the loading state. Inherits `currentColor`, so it tints
 * to whatever text color it sits in.
 */
declare const Spinner: react.ForwardRefExoticComponent<SpinnerProps & react.RefAttributes<HTMLSpanElement>>;

type DividerOrientation = 'horizontal' | 'vertical';
interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    /** Layout direction. */
    orientation?: DividerOrientation;
    /** Optional centered label (horizontal only). */
    children?: ReactNode;
}

/**
 * Tenet divider — a hairline separator. Vertical or horizontal; horizontal optionally carries a
 * centered label ("OR"). Exposes `role="separator"` with the right orientation so it's a real
 * landmark, not a styled border.
 */
declare const Divider: react.ForwardRefExoticComponent<DividerProps & react.RefAttributes<HTMLDivElement>>;

interface TabsProps {
    /** Controlled active tab value. */
    value?: string;
    /** Uncontrolled initial active tab value. */
    defaultValue?: string;
    /** Called when the active tab changes. */
    onChange?: (value: string) => void;
    children?: ReactNode;
    className?: string;
}
interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
    /** Accessible name for the tablist. */
    'aria-label'?: string;
    children?: ReactNode;
}
interface TabProps {
    /** Value this tab selects — must match a `Tabs.Panel` value. */
    value: string;
    /** Disable this tab. */
    disabled?: boolean;
    children?: ReactNode;
    className?: string;
}
interface TabPanelProps {
    /** Value this panel is shown for. */
    value: string;
    children?: ReactNode;
    className?: string;
}

/**
 * Tenet tabs — a controlled or uncontrolled tab set following the ARIA tabs pattern. Compose
 * `Tabs.List` + `Tabs.Tab` with matching `Tabs.Panel`s. Arrow keys move between tabs (selection
 * follows focus), Home/End jump to the ends; roles, ids and `aria-controls`/`aria-labelledby` are
 * wired for you.
 */
declare function Tabs({ value, defaultValue, onChange, className, children }: TabsProps): react_jsx_runtime.JSX.Element;
declare namespace Tabs {
    var List: typeof TabsList;
    var Tab: ({ value, disabled, className, children }: TabProps) => react_jsx_runtime.JSX.Element;
    var Panel: typeof TabPanel;
}
declare function TabsList({ className, children, ...rest }: TabsListProps): react_jsx_runtime.JSX.Element;
declare function TabPanel({ value, className, children }: TabPanelProps): react_jsx_runtime.JSX.Element | null;

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
interface TooltipProps {
    /** Tooltip text/content. */
    content: ReactNode;
    /** Side of the trigger to render on. */
    placement?: TooltipPlacement;
    /** The single trigger element (must be focusable for keyboard users). */
    children: ReactElement;
    className?: string;
}

/**
 * Tenet tooltip — a small text hint shown on hover and on keyboard focus (not hover-only, so it's
 * reachable without a mouse). The trigger is described by the tooltip via `aria-describedby`; the
 * bubble stays mounted and toggles visibility so that association is always valid. The trigger must
 * be a single focusable element. Never put essential-only info in a tooltip.
 */
declare function Tooltip({ content, placement, children, className }: TooltipProps): react_jsx_runtime.JSX.Element;

type DialogSize = 'small' | 'medium' | 'large';
interface DialogProps {
    /** Whether the dialog is open. */
    open: boolean;
    /** Called when the user requests close (Escape, backdrop, close button). */
    onClose: () => void;
    /** Accessible title — also the visible heading. */
    title: ReactNode;
    /** Optional supporting description under the title. */
    description?: ReactNode;
    /** Width from the scale. */
    size?: DialogSize;
    /** Footer actions (e.g. Cancel / Confirm buttons). */
    footer?: ReactNode;
    /** Allow closing by clicking the backdrop. */
    closeOnBackdrop?: boolean;
    /** Body content. */
    children?: ReactNode;
    className?: string;
}

/**
 * Tenet dialog — a modal overlay rendered in a portal. Handles the things hand-rolled modals get
 * wrong: focus moves in on open and is restored on close, Tab is trapped inside, Escape and the
 * backdrop close it, body scroll is locked, and it's wired as `role="dialog" aria-modal` with the
 * title/description as its accessible name. Reach for it for focused tasks and confirmations.
 */
declare function Dialog({ open, onClose, title, description, size, footer, closeOnBackdrop, className, children, }: DialogProps): react.ReactPortal | null;

export { Avatar, type AvatarProps, type AvatarShape, type AvatarSize, Badge, type BadgeProps, type BadgeVariant, Banner, type BannerProps, type BannerVariant, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Calendar, type CalendarProps, Card, type CardPadding, type CardProps, type CardVariant, type CellAlign, Checkbox, type CheckboxProps, DataTable, type DataTableColumn, type DataTableProps, DatePicker, type DatePickerProps, type DatePickerSize, Dialog, type DialogProps, type DialogSize, Divider, type DividerOrientation, type DividerProps, FormControl, type FormControlCaptionProps, type FormControlLabelProps, type FormControlProps, type FormControlValidationProps, Label$1 as Label, type LabelProps, type LabelSize, type LabelVariant, NumberInput, type NumberInputProps, type NumberInputSize, Radio, RadioGroup, type RadioGroupProps, type RadioProps, Select, type SelectOption, type SelectProps, type SelectSize, type SortDirection, Spinner, type SpinnerProps, type SpinnerSize, Stack, type StackAlign, type StackDirection, type StackGap, type StackItemProps, type StackJustify, type StackPadding, type StackProps, Switch, type SwitchProps, type SwitchSize, type TabPanelProps, type TabProps, Table, type TableActionsProps, type TableCellProps, type TableContainerProps, type TableDensity, type TableHeaderProps, type TableProps, type TableRowProps, type TableSectionProps, type TableSubtitleProps, type TableTitleProps, Tabs, type TabsListProps, type TabsProps, TextInput, type TextInputProps, type TextInputSize, Textarea, type TextareaProps, type TextareaResize, Tooltip, type TooltipPlacement, type TooltipProps, type ValidationVariant, type WeekStart };
