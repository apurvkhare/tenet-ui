import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, HTMLAttributes, InputHTMLAttributes, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes, ReactElement, AnchorHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
export { a as Icon, I as IconGlyphProps, b as IconProps, c as IconSize } from './Icon-CmPZjl_z.cjs';

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
    fullWidth?: boolean;
    /**
     * Stretch the button to fill the available width.
     * @deprecated Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.5.0.
     */
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

/** Visual size step on the display type scale (1 is the largest). */
type HeadingLevel = 1 | 2 | 3 | 4;
/** Element rendered. Defaults to the `<h{level}>` matching `level`; pass a different tag when semantics and size differ. */
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    /**
     * Visual size on the type scale: 1 → `fontSize-5` (36), 2 → `fontSize-4` (28), 3 → `fontSize-3` (20),
     * 4 → `fontSize-2` (16). Also picks the default element (`h1`…`h4`).
     */
    level?: HeadingLevel;
    /**
     * Element to render, so document semantics and visual size can differ (e.g. a level-1 look on an `h2`
     * in a page that already has an `h1`).
     * @default `h${level}`
     */
    as?: HeadingElement;
    /** Clip overflowing text to a single line with an ellipsis. */
    truncate?: boolean;
    /** Heading text. */
    children?: ReactNode;
}

/**
 * Tenet heading — the display (serif) type scale with correct document semantics. `level` drives the
 * SIZE and the default element; `as` overrides the ELEMENT when semantics and size must differ (one
 * `h1` per page, then `h2`… in order — pick the look with `level`, never skip heading ranks for looks).
 * Use this instead of a raw `<h1 style={…}>`; body copy belongs in `Text`.
 */
declare const Heading: react.ForwardRefExoticComponent<HeadingProps & react.RefAttributes<HTMLHeadingElement>>;

/** Element rendered. Block copy is a `p`; inline runs are `span`/`strong`/`em`; `label` for form captions. */
type TextElement = 'p' | 'span' | 'div' | 'label' | 'strong' | 'em';
/** Body type scale: small → `fontSize-0` (12), medium → `fontSize-1` (14), large → `fontSize-2` (16). */
type TextSize = 'small' | 'medium' | 'large';
/** Semantic color, mapped to the `fgColor-*` tokens. */
type TextTone = 'default' | 'muted' | 'accent' | 'success' | 'danger' | 'attention';
type TextWeight = 'normal' | 'medium' | 'semibold';
type TextAlign = 'start' | 'center' | 'end';
interface TextProps extends HTMLAttributes<HTMLElement> {
    /** Element to render. */
    as?: TextElement;
    /** Size on the body type scale (small=12, medium=14, large=16). */
    size?: TextSize;
    /** Semantic color: `muted` for secondary copy, status tones for validation and state messages. */
    tone?: TextTone;
    /** Font weight. */
    weight?: TextWeight;
    /** Clip overflowing text to a single line with an ellipsis. */
    truncate?: boolean;
    /** Horizontal text alignment (logical: `start`/`end` follow writing direction). */
    align?: TextAlign;
    /** Associates the text with a form control; only meaningful with `as="label"`. */
    htmlFor?: string;
    /** Text content. */
    children?: ReactNode;
}

/**
 * Tenet body copy — paragraphs, captions, helper text and status messages on the body (sans) scale.
 * `size` picks the scale step, `tone` the semantic color (`muted` for secondary copy, status tones for
 * messages). Use it instead of a `<p style={{ color: '#666', fontSize: 13 }}>`; titles belong in
 * `Heading`. Don't convey a status by color alone — pair a `danger`/`success` tone with words or an icon.
 */
declare const Text: react.ForwardRefExoticComponent<TextProps & react.RefAttributes<HTMLElement>>;

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

/** Space between tracks, from the `space` scale (condensed=8, normal=16, spacious=24). */
type GridGap = 'none' | 'condensed' | 'normal' | 'spacious';
/** Block-axis alignment of items inside their row (maps to `align-items`). */
type GridAlign = 'start' | 'center' | 'end' | 'stretch';
/**
 * A value per breakpoint. `base` applies from 0 up; `sm`/`md`/`lg` apply from `breakpoint-sm` (640),
 * `breakpoint-md` (960) and `breakpoint-lg` (1280) upward. Missing steps inherit the previous one
 * (lg → md → sm → base).
 */
interface GridResponsive {
    /** Value from 0 up (mobile-first). */
    base?: number;
    /** Value from `breakpoint-sm` (640px) up. */
    sm?: number;
    /** Value from `breakpoint-md` (960px) up. */
    md?: number;
    /** Value from `breakpoint-lg` (1280px) up. */
    lg?: number;
}
/** A single number (all breakpoints) or a per-breakpoint object. */
type GridResponsiveValue = number | GridResponsive;
interface GridProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Number of equal-width columns, either fixed or per breakpoint, e.g. `{ base: 1, sm: 2, lg: 4 }`.
     * Each column is `minmax(0, 1fr)` so long content can't blow the track out.
     */
    columns?: GridResponsiveValue;
    /** Space between rows and columns, from the `space` scale (condensed=8, normal=16, spacious=24). */
    gap?: GridGap;
    /** Overrides the row spacing only, from the same scale; defaults to `gap`. */
    rowGap?: GridGap;
    /** Block-axis alignment of items within their row (maps to `align-items`). */
    align?: GridAlign;
    children?: ReactNode;
}
interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
    /** Number of columns this item spans (`grid-column: span N`), fixed or per breakpoint. */
    span?: GridResponsiveValue;
    children?: ReactNode;
}

declare const Grid: react.ForwardRefExoticComponent<GridProps & react.RefAttributes<HTMLDivElement>> & {
    Item: react.ForwardRefExoticComponent<GridItemProps & react.RefAttributes<HTMLDivElement>>;
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
    fullWidth?: boolean;
    /**
     * Stretch the field to fill the available width.
     * @deprecated Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.5.0.
     */
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
 *
 * @deprecated Use `Tag` instead (since 0.4.0). `Tag` now carries the same status variants
 * (`success` / `danger` / `attention` / `muted` / `accent`) and is read-only when `onRemove` is
 * absent, so one pill component covers both status words and removable chips — and the name no
 * longer collides with `FormControl.Label`. `Label` keeps rendering until 0.5.0.
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
type TextareaSize = 'small' | 'medium' | 'large';
interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    /** Stretch to fill the available width. */
    fullWidth?: boolean;
    /**
     * Stretch to fill the available width.
     * @deprecated Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.5.0.
     */
    block?: boolean;
    /** Mark the field invalid (sets aria-invalid and a danger border). */
    invalid?: boolean;
    /** Which directions the user may resize. */
    resize?: TextareaResize;
    /** Padding / font scale — matches TextInput so fields line up in a form. */
    size?: TextareaSize;
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
interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'defaultValue'> {
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
    fullWidth?: boolean;
    /**
     * Stretch to fill the available width.
     * @deprecated Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.5.0.
     */
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
    /** Mark the field as invalid (sets `aria-invalid`). */
    invalid?: boolean;
    /** Tri-state "partially checked" visual (mixed); also sets `aria-checked="mixed"`. */
    indeterminate?: boolean;
}

/**
 * Tenet checkbox. A real `<input type="checkbox">` tinted with the accent token, with an
 * associated label and optional caption — use it instead of a styled `<div>` toggle. Supports an
 * `indeterminate` (mixed) state for "select all" parents.
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
    fullWidth?: boolean;
    /**
     * Stretch the field to fill the available width.
     * @deprecated Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.5.0.
     */
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
    /**
     * Stable React key for a row. Defaults to the row index.
     * @default index
     */
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
    /**
     * Uncontrolled initial visible month. Defaults to the selected date's month, else today.
     * @default selected | today
     */
    defaultMonth?: Date;
    /** Called when the visible month changes (nav buttons / keyboard paging). */
    onMonthChange?: (month: Date) => void;
    /** Earliest selectable day (inclusive). */
    min?: Date;
    /** Latest selectable day (inclusive). */
    max?: Date;
    /** First day of the week: 0 = Sunday (default), 1 = Monday. */
    weekStartsOn?: WeekStart;
    /**
     * BCP-47 locale for month / weekday formatting. Defaults to the runtime locale.
     * @default runtime locale
     */
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
    /**
     * BCP-47 locale for the displayed date + calendar. Defaults to the runtime locale.
     * @default runtime locale
     */
    locale?: string;
    /** Text shown in the trigger when no date is selected. */
    placeholder?: string;
    /** Control height / font scale. */
    size?: DatePickerSize;
    /** Stretch the trigger to fill the available width. */
    fullWidth?: boolean;
    /**
     * Stretch the trigger to fill the available width.
     * @deprecated Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.5.0.
     */
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
    /**
     * Replace the default leading icon.
     * @default per variant
     */
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
interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
    /** Value this tab selects — must match a `Tabs.Panel` value. */
    value: string;
    /** Disable this tab. */
    disabled?: boolean;
    children?: ReactNode;
}
interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
    /** Value this panel is shown for. */
    value: string;
    children?: ReactNode;
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
    var Tab: ({ value, disabled, className, children, onClick, ...rest }: TabProps) => react_jsx_runtime.JSX.Element;
    var Panel: typeof TabPanel;
}
declare function TabsList({ className, children, ...rest }: TabsListProps): react_jsx_runtime.JSX.Element;
declare function TabPanel({ value, className, children, ...rest }: TabPanelProps): react_jsx_runtime.JSX.Element | null;

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
 * reachable without a mouse). The trigger is described by the tooltip via `aria-describedby` (merged
 * with any the caller already set, not replaced); the bubble stays mounted so that association is
 * always valid. The bubble renders in a portal and is positioned to the viewport, so it can't be
 * clipped by an `overflow:hidden` ancestor or run off the screen near an edge. The trigger must be a
 * single focusable element. Never put essential-only info in a tooltip.
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

interface BreadcrumbItem {
    /** Visible label. */
    label: ReactNode;
    /** Link target. Omit for the current page (rendered as plain text). */
    href?: string;
}
interface BreadcrumbsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    /** Ordered trail, root first. The last item is treated as the current page. */
    items: BreadcrumbItem[];
    /**
     * Accessible name for the nav landmark.
     * @default Breadcrumb
     */
    'aria-label'?: string;
    /** Separator glyph between items. */
    separator?: ReactNode;
}

/**
 * Tenet breadcrumbs — the path from the root to the current page. Renders a `<nav>` landmark with
 * an ordered list; the last item is the current page (`aria-current="page"`, not a link). Pass an
 * `aria-label` so multiple navs on a page are distinguishable.
 */
declare const Breadcrumbs: react.ForwardRefExoticComponent<BreadcrumbsProps & react.RefAttributes<HTMLElement>>;

interface PaginationProps {
    /** Current page (1-based). */
    page: number;
    /** Total number of pages. */
    pageCount: number;
    /** Called with the requested page when the user navigates. */
    onPageChange: (page: number) => void;
    /** How many page numbers to show around the current page. */
    siblingCount?: number;
    /**
     * Accessible name for the nav landmark.
     * @default Pagination
     */
    'aria-label'?: string;
    className?: string;
}

/**
 * Tenet pagination — navigate a paged result set. Renders a `<nav>` landmark of real `<button>`s
 * (keyboard-operable by construction), marks the current page with `aria-current="page"`, and
 * disables Previous/Next at the ends. Long ranges collapse with ellipses around a window of pages.
 */
declare const Pagination: react.ForwardRefExoticComponent<PaginationProps & react.RefAttributes<HTMLElement>>;

type AccordionType = 'single' | 'multiple';
interface AccordionProps {
    /** `single` allows one open item (collapsible); `multiple` allows many. */
    type?: AccordionType;
    /** Controlled set of open item values. */
    value?: string[];
    /**
     * Uncontrolled initial open item values.
     * @default []
     */
    defaultValue?: string[];
    /** Called with the new set of open values. */
    onValueChange?: (value: string[]) => void;
    children?: ReactNode;
    className?: string;
}
interface AccordionItemProps {
    /** Unique value identifying this item. */
    value: string;
    /** Header text shown on the trigger button. */
    title: ReactNode;
    /** Disable this item. */
    disabled?: boolean;
    children?: ReactNode;
    className?: string;
}

/**
 * Tenet accordion — stacked disclosure sections. Each item is a header `<button aria-expanded>`
 * controlling a labelled region. `type="single"` keeps one open (collapsible), `multiple` allows
 * many. Headers are arrow-key navigable (Up/Down/Home/End). Controlled or uncontrolled.
 */
declare function Accordion({ type, value, defaultValue, onValueChange, className, children, }: AccordionProps): react_jsx_runtime.JSX.Element;
declare namespace Accordion {
    var Item: typeof AccordionItem;
}
declare function AccordionItem({ value, title, disabled, className, children }: AccordionItemProps): react_jsx_runtime.JSX.Element;

interface SegmentedControlOption {
    /** Value reported on change. */
    value: string;
    /** Visible label. */
    label: string;
    /** Disable this segment. */
    disabled?: boolean;
}

type SegmentedControlSize = 'small' | 'medium';
interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
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
     * @deprecated Use `fullWidth` instead (renamed in 0.4.0). `block` keeps working until 0.5.0.
     */
    block?: boolean;
    /** Accessible name for the group (required for screen readers). */
    'aria-label'?: string;
    className?: string;
}

/**
 * Tenet segmented control — a compact single-choice switch between a few options (a view toggle,
 * a filter mode). Implemented as an ARIA radiogroup: arrow keys move and select (selection follows
 * focus), with a roving tab stop. For many options or free text use `Select`; for on/off use `Switch`.
 */
declare const SegmentedControl: react.ForwardRefExoticComponent<SegmentedControlProps & react.RefAttributes<HTMLDivElement>>;

interface MenuAction {
    type?: 'item';
    /** Visible label. */
    label: ReactNode;
    /** Invoked when the item is chosen (menu then closes). */
    onSelect: () => void;
    /** Optional leading icon. */
    icon?: ReactNode;
    /** Disable this item. */
    disabled?: boolean;
    /** Render in the danger color for destructive actions. */
    destructive?: boolean;
}
interface MenuSeparator {
    type: 'separator';
}
type MenuItem = MenuAction | MenuSeparator;
interface MenuProps {
    /** The trigger element (e.g. a Button). It is wired with the menu's aria + click handling. */
    trigger: ReactElement;
    /** The actions to show. */
    items: MenuItem[];
    /**
     * Accessible name for the menu.
     * @default trigger label
     */
    'aria-label'?: string;
    /** Menu alignment relative to the trigger. */
    align?: 'start' | 'end';
    className?: string;
}

/**
 * Tenet action menu — a button that opens a popover list of actions (ARIA menu pattern). Arrow keys
 * move, Enter/Space invoke, Escape closes and returns focus to the trigger, click-outside closes.
 * Items run their `onSelect` and the menu closes. Distinct from `Select`, which picks a value.
 */
declare function Menu({ trigger, items, 'aria-label': ariaLabel, align, className }: MenuProps): react_jsx_runtime.JSX.Element;

type ToastVariant = 'info' | 'success' | 'warning' | 'danger';
interface ToastOptions {
    /** Semantic tone. */
    variant?: ToastVariant;
    /** Optional bold lead-in line. */
    title?: ReactNode;
    /** Main message. */
    message: ReactNode;
    /** Auto-dismiss after N ms. 0 keeps it until dismissed. */
    duration?: number;
}
interface ToastEntry extends ToastOptions {
    id: string;
}
interface ToastContextValue {
    /** Show a toast; returns its id. */
    toast: (options: ToastOptions) => string;
    /** Dismiss a toast by id. */
    dismiss: (id: string) => void;
}
interface ToastProviderProps {
    /** Default auto-dismiss duration (ms) when an individual toast doesn't set one. */
    duration?: number;
    /** Viewport corner. */
    placement?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    children?: ReactNode;
}

/**
 * Hook to show toasts. Must be used under a `ToastProvider`.
 *   const { toast } = useToast();
 *   toast({ variant: 'success', title: 'Saved', message: 'Your changes are live.' });
 */
declare function useToast(): ToastContextValue;
/**
 * Tenet toast provider — mounts a portalled, live-region viewport and exposes `useToast()` to any
 * descendant. Toasts auto-dismiss (configurable), can be dismissed manually, and are announced to
 * assistive tech (danger = assertive alert, others = polite status). Use toasts for transient,
 * non-blocking feedback; for inline contextual messages use `Banner`, for blocking flows `Dialog`.
 */
declare function ToastProvider({ duration, placement, children }: ToastProviderProps): react_jsx_runtime.JSX.Element;

type IconButtonVariant = 'default' | 'primary' | 'danger' | 'invisible';
type IconButtonSize = 'small' | 'medium' | 'large';
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** The icon to render. This is the only visible content, so the button must also have an accessible name. */
    icon: ReactNode;
    /** Visual style of the button. Use `primary` for the single most important action per surface. */
    variant?: IconButtonVariant;
    /** Square control size (height = width), mapped to the control-height tokens. */
    size?: IconButtonSize;
}

/**
 * Tenet icon-only button — a square control whose only visible content is an icon. Use it for
 * compact actions in toolbars, table rows, and dialog corners where a text label won't fit. For
 * anything with room for a label, prefer `Button` (a labelled button is always clearer).
 *
 * Because there is no visible text, an IconButton MUST be given an accessible name via `aria-label`
 * (or `aria-labelledby`) — otherwise screen-reader users hear nothing. The icon itself is rendered
 * `aria-hidden`, so the name has to come from the prop.
 */
declare const IconButton: react.ForwardRefExoticComponent<IconButtonProps & react.RefAttributes<HTMLButtonElement>>;

type TagVariant = 'default' | 'accent' | 'success' | 'danger' | 'attention' | 'muted';
type TagSize = 'small' | 'medium';
interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Semantic color scheme. Pick by meaning, never by raw color: `accent` for an active/selected token,
     * `success` / `danger` / `attention` for status words, `muted` for a quiet neutral, `default` otherwise.
     */
    variant?: TagVariant;
    /** Tag size. */
    size?: TagSize;
    /** Optional leading icon rendered before the label; decorative (aria-hidden). */
    leadingIcon?: ReactNode;
    /** The tag label content. */
    children?: ReactNode;
    /**
     * When provided, renders a real remove button. Wire it to drop the tag from your collection.
     * Tag does not remove itself — it has no internal state.
     */
    onRemove?: () => void;
    /**
     * Accessible label for the remove button when `children` is not a plain string.
     * Falls back to the string children, otherwise "Remove".
     */
    removeLabel?: string;
}

/**
 * Tenet Tag — the system's pill. Without `onRemove` it is a read-only word attached to an item
 * (a status such as "Published", a category, a keyword) coloured by `variant`. With `onRemove` it
 * becomes a removable chip for user-applied tokens (active filters, selected recipients). For a
 * count or presence dot use `Badge`. (Replaces the deprecated `Label` since 0.4.0.)
 *
 * The one rule people get wrong: Tag is stateless. Setting `onRemove` renders a real <button>, but
 * the parent owns the collection — your handler must drop the item, Tag won't remove itself.
 */
declare const Tag: react.ForwardRefExoticComponent<TagProps & react.RefAttributes<HTMLSpanElement>>;

type SkeletonVariant = 'text' | 'rect' | 'circle';
type SkeletonRadius = 'small' | 'medium' | 'large' | 'full';
interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
    /** Shape of the placeholder. `text` mimics a line of copy, `rect` a block, `circle` an avatar/icon. */
    variant?: SkeletonVariant;
    /** Width applied inline (number → px, string → as-is, e.g. '60%'). */
    width?: string | number;
    /** Height applied inline (number → px, string → as-is). For `circle` it mirrors width. */
    height?: string | number;
    /** Corner radius token. `circle` always renders as `full` regardless of this prop. */
    radius?: SkeletonRadius;
}

/**
 * Tenet skeleton — a decorative loading placeholder that shimmers while content streams in.
 * It is `aria-hidden`: announce the wait on the surrounding region with `aria-busy="true"`
 * (and a visually-hidden status / Spinner label), not on each skeleton block.
 * Use `text` for lines of copy, `circle` for an avatar, `rect` for a media/card block.
 */
declare const Skeleton: react.ForwardRefExoticComponent<SkeletonProps & react.RefAttributes<HTMLSpanElement>>;

type ProgressBarSize = 'small' | 'medium';
type ProgressBarVariant = 'accent' | 'success' | 'danger';
interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Current progress, from 0 to `max`. Values are clamped into range.
     * Omit (or pass `undefined`) for an INDETERMINATE bar that shows an
     * animated sweep instead of a fixed fill.
     */
    value?: number;
    /** Upper bound of the scale. Defaults to 100. */
    max?: number;
    /** Track/fill height from the size scale. Defaults to 'medium'. */
    size?: ProgressBarSize;
    /** Fill color, mapped to the matching emphasis token. Defaults to 'accent'. */
    variant?: ProgressBarVariant;
}

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
declare const ProgressBar: react.ForwardRefExoticComponent<ProgressBarProps & react.RefAttributes<HTMLDivElement>>;

type LinkUnderline = 'hover' | 'always' | 'none';
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Use the muted foreground color instead of the accent color. */
    muted?: boolean;
    /** When the underline is shown. */
    underline?: LinkUnderline;
    /**
     * Marks the link as leading off-site: sets `target="_blank"` +
     * `rel="noopener noreferrer"` and appends a visually-hidden " (opens in new tab)"
     * warning for screen-reader users.
     */
    external?: boolean;
}

/**
 * Tenet link — an inline navigational anchor. Renders a real `<a>` (forwards its ref) so it keeps
 * native keyboard + activation behavior; style it with `muted` and `underline` instead of writing
 * raw anchor CSS. Always give it meaningful link text (not "click here"). For an off-site link pass
 * `external` so it opens in a new tab AND warns screen-reader users it does so.
 */
declare const Link: react.ForwardRefExoticComponent<LinkProps & react.RefAttributes<HTMLAnchorElement>>;

type PopoverPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
interface PopoverProps {
    /**
     * The trigger element (e.g. a Button). It is cloned and wired with
     * `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`, an onClick toggle,
     * and a ref so focus can be restored to it on close.
     */
    trigger: ReactElement;
    /** The floating content rendered inside the popover surface. */
    children: ReactNode;
    /** Where the surface is anchored relative to the trigger. */
    placement?: PopoverPlacement;
    /**
     * Accessible name for the popover dialog (falls back to "Popover").
     * @default Popover
     */
    'aria-label'?: string;
    className?: string;
}

/**
 * Tenet popover — a generic floating container anchored to a trigger (the ARIA non-modal dialog
 * pattern). On open, focus moves into the surface; Escape closes and returns focus to the trigger;
 * clicking outside closes; and focus leaving the wrapper (Tab-out) closes it so it can't strand
 * open behind the page. This is **non-modal**: it does not trap focus, lock scroll, or hide the
 * background — reach for `Dialog` when you need those. Always give it an accessible name via
 * `aria-label`.
 */
declare function Popover({ trigger, children, placement, 'aria-label': ariaLabel, className, }: PopoverProps): react_jsx_runtime.JSX.Element;

/** Overall scale: `medium` for an empty table/list region, `large` for a whole-page or first-run state. */
type EmptyStateSize = 'medium' | 'large';
/** Heading rank of the title in the document outline. */
type EmptyStateHeadingLevel = 2 | 3 | 4;
interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Short, specific headline — say what is empty ("No stories yet"), not just "Nothing here". */
    title: string;
    /** One or two sentences: why it is empty and what to do next. Inline content (rendered in a muted `Text`). */
    description?: ReactNode;
    /** Decorative illustration or icon; wrapped `aria-hidden` — the title carries the meaning. */
    icon?: ReactNode;
    /** The primary next step, usually a `Button variant="primary"`. */
    action?: ReactNode;
    /** An optional secondary step next to `action` (a default/invisible `Button` or a `Link`). */
    secondaryAction?: ReactNode;
    /** Overall scale: `medium` for a region inside a page, `large` for a whole-page/first-run state. */
    size?: EmptyStateSize;
    /**
     * Semantic heading rank of the title (`h2`/`h3`/`h4`) so it fits the surrounding outline. The visual
     * size follows `size`, not this prop.
     */
    headingLevel?: EmptyStateHeadingLevel;
}

/**
 * Tenet empty state — what a table, list, search or inbox shows when it has nothing to show. A centered
 * headline, an optional explanation, a decorative icon and up to two next-step actions, composed from
 * `Heading`, `Text` and `Stack`. Use it instead of an improvised centered `<div>`; keep the title
 * specific ("No results for 'budget'") and make `action` the one thing that fixes the emptiness.
 * `headingLevel` sets the title's rank in the outline; its visual size follows `size`.
 */
declare const EmptyState: react.ForwardRefExoticComponent<EmptyStateProps & react.RefAttributes<HTMLDivElement>>;

export { Accordion, type AccordionItemProps, type AccordionProps, type AccordionType, Avatar, type AvatarProps, type AvatarShape, type AvatarSize, Badge, type BadgeProps, type BadgeVariant, Banner, type BannerProps, type BannerVariant, type BreadcrumbItem, Breadcrumbs, type BreadcrumbsProps, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Calendar, type CalendarProps, Card, type CardPadding, type CardProps, type CardVariant, type CellAlign, Checkbox, type CheckboxProps, DataTable, type DataTableColumn, type DataTableProps, DatePicker, type DatePickerProps, type DatePickerSize, Dialog, type DialogProps, type DialogSize, Divider, type DividerOrientation, type DividerProps, EmptyState, type EmptyStateHeadingLevel, type EmptyStateProps, type EmptyStateSize, FormControl, type FormControlCaptionProps, type FormControlLabelProps, type FormControlProps, type FormControlValidationProps, Grid, type GridAlign, type GridGap, type GridItemProps, type GridProps, type GridResponsive, type GridResponsiveValue, Heading, type HeadingElement, type HeadingLevel, type HeadingProps, IconButton, type IconButtonProps, type IconButtonSize, type IconButtonVariant, Label$1 as Label, type LabelProps, type LabelSize, type LabelVariant, Link, type LinkProps, type LinkUnderline, Menu, type MenuAction, type MenuItem, type MenuProps, type MenuSeparator, NumberInput, type NumberInputProps, type NumberInputSize, Pagination, type PaginationProps, Popover, type PopoverPlacement, type PopoverProps, ProgressBar, type ProgressBarProps, type ProgressBarSize, type ProgressBarVariant, Radio, RadioGroup, type RadioGroupProps, type RadioProps, SegmentedControl, type SegmentedControlOption, type SegmentedControlProps, type SegmentedControlSize, Select, type SelectOption, type SelectProps, type SelectSize, Skeleton, type SkeletonProps, type SkeletonRadius, type SkeletonVariant, type SortDirection, Spinner, type SpinnerProps, type SpinnerSize, Stack, type StackAlign, type StackDirection, type StackGap, type StackItemProps, type StackJustify, type StackPadding, type StackProps, Switch, type SwitchProps, type SwitchSize, type TabPanelProps, type TabProps, Table, type TableActionsProps, type TableCellProps, type TableContainerProps, type TableDensity, type TableHeaderProps, type TableProps, type TableRowProps, type TableSectionProps, type TableSubtitleProps, type TableTitleProps, Tabs, type TabsListProps, type TabsProps, Tag, type TagProps, type TagSize, type TagVariant, Text, type TextAlign, type TextElement, TextInput, type TextInputProps, type TextInputSize, type TextProps, type TextSize, type TextTone, type TextWeight, Textarea, type TextareaProps, type TextareaResize, type ToastContextValue, type ToastEntry, type ToastOptions, ToastProvider, type ToastProviderProps, type ToastVariant, Tooltip, type TooltipPlacement, type TooltipProps, type ValidationVariant, type WeekStart, useToast };
