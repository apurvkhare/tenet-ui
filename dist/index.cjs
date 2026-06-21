'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/components/Button/Button.tsx
var cx = (...parts) => parts.filter(Boolean).join(" ");
var Button = react.forwardRef(function Button2({
  variant = "default",
  size = "medium",
  leadingIcon,
  trailingIcon,
  block = false,
  type = "button",
  className,
  children,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      ref,
      type,
      className: cx(
        "Tenet-Button",
        `Tenet-Button--variant-${variant}`,
        `Tenet-Button--size-${size}`,
        block && "Tenet-Button--block",
        className
      ),
      ...rest,
      children: [
        leadingIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "Tenet-Button__icon", "aria-hidden": "true", children: leadingIcon }),
        children && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "Tenet-Button__label", children }),
        trailingIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "Tenet-Button__icon", "aria-hidden": "true", children: trailingIcon })
      ]
    }
  );
});
var cx2 = (...parts) => parts.filter(Boolean).join(" ");
var StackRoot = react.forwardRef(function Stack({ direction = "vertical", gap = "normal", align, justify, wrap = false, padding, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: cx2(
        "Tenet-Stack",
        `Tenet-Stack--direction-${direction}`,
        `Tenet-Stack--gap-${gap}`,
        align && `Tenet-Stack--align-${align}`,
        justify && `Tenet-Stack--justify-${justify}`,
        wrap && "Tenet-Stack--wrap",
        padding && `Tenet-Stack--padding-${padding}`,
        className
      ),
      ...rest,
      children
    }
  );
});
var StackItem = react.forwardRef(function StackItem2({ grow = false, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cx2("Tenet-Stack__item", grow && "Tenet-Stack__item--grow", className), ...rest, children });
});
var Stack2 = Object.assign(StackRoot, { Item: StackItem });
var cx3 = (...parts) => parts.filter(Boolean).join(" ");
var Card = react.forwardRef(function Card2({ variant = "default", padding = "normal", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: cx3("Tenet-Card", `Tenet-Card--variant-${variant}`, `Tenet-Card--padding-${padding}`, className),
      ...rest,
      children
    }
  );
});
var cx4 = (...parts) => parts.filter(Boolean).join(" ");
var TextInput = react.forwardRef(function TextInput2({ size = "medium", block = false, leadingVisual, trailingVisual, invalid = false, className, disabled, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      className: cx4(
        "Tenet-TextInput",
        `Tenet-TextInput--size-${size}`,
        block && "Tenet-TextInput--block",
        invalid && "Tenet-TextInput--invalid",
        disabled && "Tenet-TextInput--disabled",
        className
      ),
      children: [
        leadingVisual && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "Tenet-TextInput__visual", "aria-hidden": "true", children: leadingVisual }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref,
            className: "Tenet-TextInput__input",
            disabled,
            "aria-invalid": invalid || void 0,
            ...rest
          }
        ),
        trailingVisual && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "Tenet-TextInput__visual", "aria-hidden": "true", children: trailingVisual })
      ]
    }
  );
});
var cx5 = (...parts) => parts.filter(Boolean).join(" ");
var Label = react.forwardRef(function Label2({ variant = "default", size = "medium", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref,
      className: cx5("Tenet-Label", `Tenet-Label--variant-${variant}`, `Tenet-Label--size-${size}`, className),
      ...rest,
      children
    }
  );
});
var cx6 = (...parts) => parts.filter(Boolean).join(" ");
var sortGlyph = { ascending: "\u25B2", descending: "\u25BC", none: "\u2195" };
var TableRoot = react.forwardRef(function Table({ density = "normal", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx("table", { ref, className: cx6("Tenet-Table", `Tenet-Table--density-${density}`, className), ...rest, children });
});
var Container = react.forwardRef(function TableContainer({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cx6("Tenet-Table__container", className), ...rest, children });
});
var Title = react.forwardRef(function TableTitle({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx("h2", { ref, className: cx6("Tenet-Table__title", className), ...rest, children });
});
var Subtitle = react.forwardRef(function TableSubtitle({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx("p", { ref, className: cx6("Tenet-Table__subtitle", className), ...rest, children });
});
var Actions = react.forwardRef(function TableActions({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cx6("Tenet-Table__actions", className), ...rest, children });
});
var Head = react.forwardRef(function TableHead({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx("thead", { ref, className: cx6("Tenet-Table__head", className), ...rest, children });
});
var Body = react.forwardRef(function TableBody({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx("tbody", { ref, className: cx6("Tenet-Table__body", className), ...rest, children });
});
var Row = react.forwardRef(function TableRow({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx("tr", { ref, className: cx6("Tenet-Table__row", className), ...rest, children });
});
var Header = react.forwardRef(function TableHeader({ align = "start", sortDirection, scope = "col", className, children, ...rest }, ref) {
  const sortable = sortDirection !== void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "th",
    {
      ref,
      scope,
      "aria-sort": sortable ? sortDirection : void 0,
      className: cx6("Tenet-Table__header", `Tenet-Table__cell--align-${align}`, sortable && "Tenet-Table__header--sortable", className),
      ...rest,
      children: [
        children,
        sortable && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "Tenet-Table__sort", "aria-hidden": "true", children: sortGlyph[sortDirection] })
      ]
    }
  );
});
var Cell = react.forwardRef(function TableCell({ align = "start", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx("td", { ref, className: cx6("Tenet-Table__cell", `Tenet-Table__cell--align-${align}`, className), ...rest, children });
});
var Table2 = Object.assign(TableRoot, {
  Container,
  Title,
  Subtitle,
  Actions,
  Head,
  Body,
  Row,
  Header,
  Cell
});
var cx7 = (...parts) => parts.filter(Boolean).join(" ");
function Label3({ visuallyHidden = false, required = false, className, children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("label", { className: cx7("Tenet-FormControl__label", visuallyHidden && "Tenet-visuallyHidden", className), ...rest, children: [
    children,
    required && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "Tenet-FormControl__required", "aria-hidden": "true", children: [
      " ",
      "*"
    ] })
  ] });
}
function Caption({ className, children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: cx7("Tenet-FormControl__caption", className), ...rest, children });
}
function Validation({ variant = "error", className, children, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      role: variant === "error" ? "alert" : void 0,
      className: cx7("Tenet-FormControl__validation", `Tenet-FormControl__validation--${variant}`, className),
      ...rest,
      children
    }
  );
}
var propsOf = (el) => el.props;
var join = (...parts) => parts.filter(Boolean).join(" ") || void 0;
var FormControlRoot = react.forwardRef(function FormControl({ id: idProp, required = false, disabled = false, invalid: invalidProp, className, children, ...rest }, ref) {
  const generatedId = react.useId();
  const id = idProp ?? generatedId;
  const captionId = `${id}-caption`;
  const validationId = `${id}-validation`;
  let hasCaption = false;
  let hasValidation = false;
  let validationVariant;
  react.Children.forEach(children, (child) => {
    if (!react.isValidElement(child)) return;
    if (child.type === Caption) hasCaption = true;
    if (child.type === Validation) {
      hasValidation = true;
      validationVariant = propsOf(child).variant;
    }
  });
  const invalid = invalidProp ?? validationVariant === "error";
  const describedBy = join(hasCaption && captionId, hasValidation && validationId);
  const mapped = react.Children.map(children, (child) => {
    if (!react.isValidElement(child)) return child;
    const p = propsOf(child);
    if (child.type === Label3) {
      return react.cloneElement(child, {
        htmlFor: p.htmlFor ?? id,
        required: p.required ?? required
      });
    }
    if (child.type === Caption) {
      return react.cloneElement(child, { id: p.id ?? captionId });
    }
    if (child.type === Validation) {
      return react.cloneElement(child, {
        id: p.id ?? validationId
      });
    }
    return react.cloneElement(child, {
      id: p.id ?? id,
      "aria-describedby": join(p["aria-describedby"], describedBy),
      invalid: p.invalid ?? (invalid || void 0),
      required: p.required ?? (required || void 0),
      disabled: p.disabled ?? (disabled || void 0)
    });
  });
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cx7("Tenet-FormControl", className), ...rest, children: mapped });
});
var FormControl2 = Object.assign(FormControlRoot, { Label: Label3, Caption, Validation });
var cx8 = (...parts) => parts.filter(Boolean).join(" ");
var Textarea = react.forwardRef(function Textarea2({ block = false, invalid = false, resize = "vertical", rows = 4, className, ...rest }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "textarea",
    {
      ref,
      rows,
      "aria-invalid": invalid || void 0,
      className: cx8(
        "Tenet-Textarea",
        block && "Tenet-Textarea--block",
        invalid && "Tenet-Textarea--invalid",
        `Tenet-Textarea--resize-${resize}`,
        className
      ),
      ...rest
    }
  );
});
var cx9 = (...parts) => parts.filter(Boolean).join(" ");
function nextEnabled(options, from, dir) {
  const n = options.length;
  for (let step = 1; step <= n; step++) {
    const i = (from + dir * step + n * step) % n;
    if (!options[i]?.disabled) return i;
  }
  return from;
}
var firstEnabled = (o) => o.findIndex((x) => !x.disabled);
var lastEnabled = (o) => {
  for (let i = o.length - 1; i >= 0; i--) if (!o[i].disabled) return i;
  return -1;
};
var Select = react.forwardRef(function Select2({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select\u2026",
  size = "medium",
  block = false,
  invalid = false,
  disabled = false,
  required = false,
  name,
  id,
  className,
  "aria-label": ariaLabel,
  "aria-describedby": describedBy
}, ref) {
  const reactId = react.useId();
  const triggerId = id ?? `${reactId}-trigger`;
  const listboxId = `${reactId}-listbox`;
  const optionId = (i) => `${reactId}-opt-${i}`;
  const isControlled = value !== void 0;
  const [internal, setInternal] = react.useState(defaultValue ?? "");
  const current = isControlled ? value : internal;
  const selectedIndex = options.findIndex((o) => o.value === current);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : void 0;
  const [open, setOpen] = react.useState(false);
  const [active, setActive] = react.useState(-1);
  const wrapRef = react.useRef(null);
  const listRef = react.useRef(null);
  const typeahead = react.useRef({ buf: "", t: null });
  const commit = react.useCallback(
    (i) => {
      const opt = options[i];
      if (!opt || opt.disabled) return;
      if (!isControlled) setInternal(opt.value);
      onChange?.(opt.value);
    },
    [options, isControlled, onChange]
  );
  const openMenu = react.useCallback(() => {
    if (disabled) return;
    setActive(selectedIndex >= 0 ? selectedIndex : firstEnabled(options));
    setOpen(true);
  }, [disabled, selectedIndex, options]);
  const closeMenu = react.useCallback(() => setOpen(false), []);
  react.useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  react.useEffect(() => {
    if (!open || active < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`#${CSS.escape(optionId(active))}`);
    el?.scrollIntoView({ block: "nearest" });
  }, [open, active]);
  const runTypeahead = react.useCallback(
    (ch) => {
      const ta = typeahead.current;
      if (ta.t) clearTimeout(ta.t);
      ta.buf += ch.toLowerCase();
      ta.t = setTimeout(() => ta.buf = "", 500);
      const match = options.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(ta.buf));
      if (match >= 0) {
        if (open) setActive(match);
        else commit(match);
      }
    },
    [options, open, commit]
  );
  const onKeyDown = (e) => {
    if (disabled) return;
    const key = e.key;
    if (!open) {
      if (key === "ArrowDown" || key === "ArrowUp" || key === "Enter" || key === " ") {
        e.preventDefault();
        openMenu();
        return;
      }
      if (key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) runTypeahead(key);
      return;
    }
    switch (key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => nextEnabled(options, a < 0 ? -1 : a, 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => nextEnabled(options, a < 0 ? 0 : a, -1));
        break;
      case "Home":
        e.preventDefault();
        setActive(firstEnabled(options));
        break;
      case "End":
        e.preventDefault();
        setActive(lastEnabled(options));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (active >= 0) {
          commit(active);
          setOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        if (key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          runTypeahead(key);
        }
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      ref: wrapRef,
      className: cx9(
        "Tenet-Select",
        `Tenet-Select--size-${size}`,
        block && "Tenet-Select--block",
        invalid && "Tenet-Select--invalid",
        disabled && "Tenet-Select--disabled",
        open && "Tenet-Select--open",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            ref,
            type: "button",
            id: triggerId,
            role: "combobox",
            "aria-haspopup": "listbox",
            "aria-expanded": open,
            "aria-controls": listboxId,
            "aria-activedescendant": open && active >= 0 ? optionId(active) : void 0,
            "aria-label": ariaLabel,
            "aria-invalid": invalid || void 0,
            "aria-required": required || void 0,
            "aria-describedby": describedBy,
            disabled,
            className: "Tenet-Select__trigger",
            onClick: () => open ? closeMenu() : openMenu(),
            onKeyDown,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: cx9("Tenet-Select__value", !selected && "Tenet-Select__value--placeholder"), children: selected ? selected.label : placeholder }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "Tenet-Select__caret", "aria-hidden": "true", children: "\u25BE" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntime.jsx("ul", { ref: listRef, id: listboxId, role: "listbox", className: "Tenet-Select__listbox", tabIndex: -1, children: options.map((opt, i) => {
          const isSelected = opt.value === current;
          return /* @__PURE__ */ jsxRuntime.jsxs(
            "li",
            {
              id: optionId(i),
              role: "option",
              "aria-selected": isSelected,
              "aria-disabled": opt.disabled || void 0,
              className: cx9(
                "Tenet-Select__option",
                i === active && "Tenet-Select__option--active",
                isSelected && "Tenet-Select__option--selected",
                opt.disabled && "Tenet-Select__option--disabled"
              ),
              onMouseEnter: () => !opt.disabled && setActive(i),
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => {
                if (opt.disabled) return;
                commit(i);
                setOpen(false);
              },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "Tenet-Select__check", "aria-hidden": "true", children: isSelected ? "\u2713" : "" }),
                opt.label
              ]
            },
            opt.value
          );
        }) }),
        name && /* @__PURE__ */ jsxRuntime.jsx("input", { type: "hidden", name, value: current })
      ]
    }
  );
});
var cx10 = (...parts) => parts.filter(Boolean).join(" ");
var Checkbox = react.forwardRef(function Checkbox2({ label, caption, id, className, disabled, ...rest }, ref) {
  const generatedId = react.useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs("span", { className: cx10("Tenet-Checkbox", disabled && "Tenet-Checkbox--disabled", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ref,
        id: inputId,
        type: "checkbox",
        className: "Tenet-Checkbox__input",
        disabled,
        "aria-describedby": captionId,
        ...rest
      }
    ),
    label && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "Tenet-Checkbox__text", children: [
      /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: inputId, className: "Tenet-Checkbox__label", children: label }),
      caption && /* @__PURE__ */ jsxRuntime.jsx("span", { id: captionId, className: "Tenet-Checkbox__caption", children: caption })
    ] })
  ] });
});
var cx11 = (...parts) => parts.filter(Boolean).join(" ");
var RadioGroupContext = react.createContext(null);
var Radio = react.forwardRef(function Radio2({ value, label, caption, id, name, checked, defaultChecked, disabled, onChange, className, ...rest }, ref) {
  const ctx = react.useContext(RadioGroupContext);
  const generatedId = react.useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : void 0;
  const controlled = ctx?.value !== void 0;
  const resolvedChecked = controlled ? ctx?.value === value : checked;
  const resolvedDefault = !controlled ? ctx?.defaultValue !== void 0 ? ctx.defaultValue === value : defaultChecked : void 0;
  const resolvedName = ctx?.name ?? name;
  const resolvedDisabled = disabled ?? ctx?.disabled;
  const handleChange = (event) => {
    onChange?.(event);
    ctx?.onChange?.(value);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("span", { className: cx11("Tenet-Radio", resolvedDisabled && "Tenet-Radio--disabled", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ref,
        id: inputId,
        type: "radio",
        className: "Tenet-Radio__input",
        name: resolvedName,
        value,
        checked: resolvedChecked,
        defaultChecked: resolvedDefault,
        disabled: resolvedDisabled,
        "aria-describedby": captionId,
        onChange: handleChange,
        ...rest
      }
    ),
    label && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "Tenet-Radio__text", children: [
      /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: inputId, className: "Tenet-Radio__label", children: label }),
      caption && /* @__PURE__ */ jsxRuntime.jsx("span", { id: captionId, className: "Tenet-Radio__caption", children: caption })
    ] })
  ] });
});
var RadioGroup = react.forwardRef(function RadioGroup2({ name, label, caption, value, defaultValue, onChange, required = false, disabled = false, className, children, ...rest }, ref) {
  const generatedName = react.useId();
  const groupName = name ?? generatedName;
  const captionId = caption ? `${groupName}-caption` : void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "fieldset",
    {
      ref,
      className: cx11("Tenet-RadioGroup", className),
      "aria-describedby": captionId,
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("legend", { className: "Tenet-RadioGroup__legend", children: [
          label,
          required && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "Tenet-RadioGroup__required", "aria-hidden": "true", children: [
            " ",
            "*"
          ] })
        ] }),
        caption && /* @__PURE__ */ jsxRuntime.jsx("span", { id: captionId, className: "Tenet-RadioGroup__caption", children: caption }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "Tenet-RadioGroup__options", children: /* @__PURE__ */ jsxRuntime.jsx(RadioGroupContext.Provider, { value: { name: groupName, value, defaultValue, disabled, onChange }, children }) })
      ]
    }
  );
});

exports.Button = Button;
exports.Card = Card;
exports.Checkbox = Checkbox;
exports.FormControl = FormControl2;
exports.Label = Label;
exports.Radio = Radio;
exports.RadioGroup = RadioGroup;
exports.Select = Select;
exports.Stack = Stack2;
exports.Table = Table2;
exports.TextInput = TextInput;
exports.Textarea = Textarea;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map