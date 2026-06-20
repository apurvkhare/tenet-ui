# Select — usage guidelines

**When to use:** choosing one option from a short, known list. Use `Select` (a real `<select>`) inside a `FormControl`; for long/searchable lists use an autocomplete instead.

## Rules

- Give it an accessible name via `FormControl.Label` or `aria-label`.
- Pass real `<option>` elements as children; use `placeholder` for an unselected prompt (it renders a disabled first option).
- Use `size` / `block` from the scale; use `invalid` for validation.
- **Never** build a div-based dropdown or hardcode the caret/border colors — the component owns them.

## Do / Don't

- ✅ `<Select placeholder="Choose…"><option value="public">Public</option></Select>`
- ❌ `<div className="dropdown" onClick={…}>` — not a select, not keyboard-accessible.
