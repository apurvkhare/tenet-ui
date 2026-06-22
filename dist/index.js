import { forwardRef, useId, Children, isValidElement, cloneElement, useState, useRef, useCallback, useEffect, createContext, useContext, useMemo } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

// src/components/Button/Button.tsx
var cx = (...parts) => parts.filter(Boolean).join(" ");
var Button = forwardRef(function Button2({
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
  return /* @__PURE__ */ jsxs(
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
        leadingIcon && /* @__PURE__ */ jsx("span", { className: "Tenet-Button__icon", "aria-hidden": "true", children: leadingIcon }),
        children && /* @__PURE__ */ jsx("span", { className: "Tenet-Button__label", children }),
        trailingIcon && /* @__PURE__ */ jsx("span", { className: "Tenet-Button__icon", "aria-hidden": "true", children: trailingIcon })
      ]
    }
  );
});
var cx2 = (...parts) => parts.filter(Boolean).join(" ");
var StackRoot = forwardRef(function Stack({ direction = "vertical", gap = "normal", align, justify, wrap = false, padding, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
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
var StackItem = forwardRef(function StackItem2({ grow = false, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { ref, className: cx2("Tenet-Stack__item", grow && "Tenet-Stack__item--grow", className), ...rest, children });
});
var Stack2 = Object.assign(StackRoot, { Item: StackItem });
var cx3 = (...parts) => parts.filter(Boolean).join(" ");
var Card = forwardRef(function Card2({ variant = "default", padding = "normal", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
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
var TextInput = forwardRef(function TextInput2({ size = "medium", block = false, leadingVisual, trailingVisual, invalid = false, className, disabled, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
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
        leadingVisual && /* @__PURE__ */ jsx("span", { className: "Tenet-TextInput__visual", "aria-hidden": "true", children: leadingVisual }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            className: "Tenet-TextInput__input",
            disabled,
            "aria-invalid": invalid || void 0,
            ...rest
          }
        ),
        trailingVisual && /* @__PURE__ */ jsx("span", { className: "Tenet-TextInput__visual", "aria-hidden": "true", children: trailingVisual })
      ]
    }
  );
});
var cx5 = (...parts) => parts.filter(Boolean).join(" ");
var Label = forwardRef(function Label2({ variant = "default", size = "medium", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
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
var TableRoot = forwardRef(function Table({ density = "normal", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("table", { ref, className: cx6("Tenet-Table", `Tenet-Table--density-${density}`, className), ...rest, children });
});
var Container = forwardRef(function TableContainer({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { ref, className: cx6("Tenet-Table__container", className), ...rest, children });
});
var Title = forwardRef(function TableTitle({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("h2", { ref, className: cx6("Tenet-Table__title", className), ...rest, children });
});
var Subtitle = forwardRef(function TableSubtitle({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("p", { ref, className: cx6("Tenet-Table__subtitle", className), ...rest, children });
});
var Actions = forwardRef(function TableActions({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { ref, className: cx6("Tenet-Table__actions", className), ...rest, children });
});
var Head = forwardRef(function TableHead({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("thead", { ref, className: cx6("Tenet-Table__head", className), ...rest, children });
});
var Body = forwardRef(function TableBody({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("tbody", { ref, className: cx6("Tenet-Table__body", className), ...rest, children });
});
var Row = forwardRef(function TableRow({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("tr", { ref, className: cx6("Tenet-Table__row", className), ...rest, children });
});
var Header = forwardRef(function TableHeader({ align = "start", sortDirection, scope = "col", className, children, ...rest }, ref) {
  const sortable = sortDirection !== void 0;
  return /* @__PURE__ */ jsxs(
    "th",
    {
      ref,
      scope,
      "aria-sort": sortable ? sortDirection : void 0,
      className: cx6("Tenet-Table__header", `Tenet-Table__cell--align-${align}`, sortable && "Tenet-Table__header--sortable", className),
      ...rest,
      children: [
        children,
        sortable && /* @__PURE__ */ jsx("span", { className: "Tenet-Table__sort", "aria-hidden": "true", children: sortGlyph[sortDirection] })
      ]
    }
  );
});
var Cell = forwardRef(function TableCell({ align = "start", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("td", { ref, className: cx6("Tenet-Table__cell", `Tenet-Table__cell--align-${align}`, className), ...rest, children });
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
  return /* @__PURE__ */ jsxs("label", { className: cx7("Tenet-FormControl__label", visuallyHidden && "Tenet-visuallyHidden", className), ...rest, children: [
    children,
    required && /* @__PURE__ */ jsxs("span", { className: "Tenet-FormControl__required", "aria-hidden": "true", children: [
      " ",
      "*"
    ] })
  ] });
}
function Caption({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx("span", { className: cx7("Tenet-FormControl__caption", className), ...rest, children });
}
function Validation({ variant = "error", className, children, ...rest }) {
  return /* @__PURE__ */ jsx(
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
var FormControlRoot = forwardRef(function FormControl({ id: idProp, required = false, disabled = false, invalid: invalidProp, className, children, ...rest }, ref) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const captionId = `${id}-caption`;
  const validationId = `${id}-validation`;
  let hasCaption = false;
  let hasValidation = false;
  let validationVariant;
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === Caption) hasCaption = true;
    if (child.type === Validation) {
      hasValidation = true;
      validationVariant = propsOf(child).variant;
    }
  });
  const invalid = invalidProp ?? validationVariant === "error";
  const describedBy = join(hasCaption && captionId, hasValidation && validationId);
  const mapped = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const p = propsOf(child);
    if (child.type === Label3) {
      return cloneElement(child, {
        htmlFor: p.htmlFor ?? id,
        required: p.required ?? required
      });
    }
    if (child.type === Caption) {
      return cloneElement(child, { id: p.id ?? captionId });
    }
    if (child.type === Validation) {
      return cloneElement(child, {
        id: p.id ?? validationId
      });
    }
    return cloneElement(child, {
      id: p.id ?? id,
      "aria-describedby": join(p["aria-describedby"], describedBy),
      invalid: p.invalid ?? (invalid || void 0),
      required: p.required ?? (required || void 0),
      disabled: p.disabled ?? (disabled || void 0)
    });
  });
  return /* @__PURE__ */ jsx("div", { ref, className: cx7("Tenet-FormControl", className), ...rest, children: mapped });
});
var FormControl2 = Object.assign(FormControlRoot, { Label: Label3, Caption, Validation });
var cx8 = (...parts) => parts.filter(Boolean).join(" ");
var Textarea = forwardRef(function Textarea2({ block = false, invalid = false, resize = "vertical", rows = 4, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
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
var Select = forwardRef(function Select2({
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
  const reactId = useId();
  const triggerId = id ?? `${reactId}-trigger`;
  const listboxId = `${reactId}-listbox`;
  const optionId = (i) => `${reactId}-opt-${i}`;
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = isControlled ? value : internal;
  const selectedIndex = options.findIndex((o) => o.value === current);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : void 0;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);
  const listRef = useRef(null);
  const typeahead = useRef({ buf: "", t: null });
  const commit = useCallback(
    (i) => {
      const opt = options[i];
      if (!opt || opt.disabled) return;
      if (!isControlled) setInternal(opt.value);
      onChange?.(opt.value);
    },
    [options, isControlled, onChange]
  );
  const openMenu = useCallback(() => {
    if (disabled) return;
    setActive(selectedIndex >= 0 ? selectedIndex : firstEnabled(options));
    setOpen(true);
  }, [disabled, selectedIndex, options]);
  const closeMenu = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  useEffect(() => {
    if (!open || active < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`#${CSS.escape(optionId(active))}`);
    el?.scrollIntoView({ block: "nearest" });
  }, [open, active]);
  const runTypeahead = useCallback(
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
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsxs(
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
              /* @__PURE__ */ jsx("span", { className: cx9("Tenet-Select__value", !selected && "Tenet-Select__value--placeholder"), children: selected ? selected.label : placeholder }),
              /* @__PURE__ */ jsx("span", { className: "Tenet-Select__caret", "aria-hidden": "true", children: "\u25BE" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsx("ul", { ref: listRef, id: listboxId, role: "listbox", className: "Tenet-Select__listbox", tabIndex: -1, children: options.map((opt, i) => {
          const isSelected = opt.value === current;
          return /* @__PURE__ */ jsxs(
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
                /* @__PURE__ */ jsx("span", { className: "Tenet-Select__check", "aria-hidden": "true", children: isSelected ? "\u2713" : "" }),
                opt.label
              ]
            },
            opt.value
          );
        }) }),
        name && /* @__PURE__ */ jsx("input", { type: "hidden", name, value: current })
      ]
    }
  );
});
var cx10 = (...parts) => parts.filter(Boolean).join(" ");
var Checkbox = forwardRef(function Checkbox2({ label, caption, id, className, disabled, ...rest }, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : void 0;
  return /* @__PURE__ */ jsxs("span", { className: cx10("Tenet-Checkbox", disabled && "Tenet-Checkbox--disabled", className), children: [
    /* @__PURE__ */ jsx(
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
    label && /* @__PURE__ */ jsxs("span", { className: "Tenet-Checkbox__text", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: inputId, className: "Tenet-Checkbox__label", children: label }),
      caption && /* @__PURE__ */ jsx("span", { id: captionId, className: "Tenet-Checkbox__caption", children: caption })
    ] })
  ] });
});
var cx11 = (...parts) => parts.filter(Boolean).join(" ");
var RadioGroupContext = createContext(null);
var Radio = forwardRef(function Radio2({ value, label, caption, id, name, checked, defaultChecked, disabled, onChange, className, ...rest }, ref) {
  const ctx = useContext(RadioGroupContext);
  const generatedId = useId();
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
  return /* @__PURE__ */ jsxs("span", { className: cx11("Tenet-Radio", resolvedDisabled && "Tenet-Radio--disabled", className), children: [
    /* @__PURE__ */ jsx(
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
    label && /* @__PURE__ */ jsxs("span", { className: "Tenet-Radio__text", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: inputId, className: "Tenet-Radio__label", children: label }),
      caption && /* @__PURE__ */ jsx("span", { id: captionId, className: "Tenet-Radio__caption", children: caption })
    ] })
  ] });
});
var RadioGroup = forwardRef(function RadioGroup2({ name, label, caption, value, defaultValue, onChange, required = false, disabled = false, className, children, ...rest }, ref) {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const captionId = caption ? `${groupName}-caption` : void 0;
  return /* @__PURE__ */ jsxs(
    "fieldset",
    {
      ref,
      className: cx11("Tenet-RadioGroup", className),
      "aria-describedby": captionId,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs("legend", { className: "Tenet-RadioGroup__legend", children: [
          label,
          required && /* @__PURE__ */ jsxs("span", { className: "Tenet-RadioGroup__required", "aria-hidden": "true", children: [
            " ",
            "*"
          ] })
        ] }),
        caption && /* @__PURE__ */ jsx("span", { id: captionId, className: "Tenet-RadioGroup__caption", children: caption }),
        /* @__PURE__ */ jsx("div", { className: "Tenet-RadioGroup__options", children: /* @__PURE__ */ jsx(RadioGroupContext.Provider, { value: { name: groupName, value, defaultValue, disabled, onChange }, children }) })
      ]
    }
  );
});
var cx12 = (...parts) => parts.filter(Boolean).join(" ");
var Switch = forwardRef(function Switch2({ label, caption, size = "medium", invalid = false, id, className, disabled, ...rest }, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : void 0;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cx12(
        "Tenet-Switch",
        `Tenet-Switch--size-${size}`,
        invalid && "Tenet-Switch--invalid",
        disabled && "Tenet-Switch--disabled",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("span", { className: "Tenet-Switch__control", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref,
              id: inputId,
              type: "checkbox",
              role: "switch",
              className: "Tenet-Switch__input",
              disabled,
              "aria-invalid": invalid || void 0,
              "aria-describedby": captionId,
              ...rest
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "Tenet-Switch__track", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "Tenet-Switch__knob" }) })
        ] }),
        label && /* @__PURE__ */ jsxs("span", { className: "Tenet-Switch__text", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: inputId, className: "Tenet-Switch__label", children: label }),
          caption && /* @__PURE__ */ jsx("span", { id: captionId, className: "Tenet-Switch__caption", children: caption })
        ] })
      ]
    }
  );
});
var cx13 = (...parts) => parts.filter(Boolean).join(" ");
var toText = (n) => n == null ? "" : String(n);
var parse = (s) => {
  const trimmed = s.trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  return Number.isNaN(n) ? null : n;
};
var clamp = (n, min, max) => {
  let out = n;
  if (min != null && out < min) out = min;
  if (max != null && out > max) out = max;
  return out;
};
var NumberInput = forwardRef(function NumberInput2({
  value,
  defaultValue,
  onChange,
  min,
  max,
  step = 1,
  size = "medium",
  block = false,
  invalid = false,
  className,
  disabled,
  id,
  "aria-label": ariaLabel,
  ...rest
}, ref) {
  const isControlled = value !== void 0;
  const [text, setText] = useState(() => toText(isControlled ? value : defaultValue));
  const innerRef = useRef(null);
  useEffect(() => {
    if (!isControlled) return;
    if (parse(text) !== value) setText(toText(value));
  }, [value]);
  const current = parse(text);
  const commit = (next) => {
    if (!isControlled) setText(next);
    onChange?.(parse(next));
  };
  const stepBy = (direction) => {
    const base = current ?? min ?? 0;
    const next = clamp(base + direction * step, min, max);
    commit(toText(next));
    innerRef.current?.focus();
  };
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      stepBy(1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      stepBy(-1);
    }
  };
  const decDisabled = disabled || min != null && current != null && current <= min;
  const incDisabled = disabled || max != null && current != null && current >= max;
  const setRef = (node) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cx13(
        "Tenet-NumberInput",
        `Tenet-NumberInput--size-${size}`,
        block && "Tenet-NumberInput--block",
        invalid && "Tenet-NumberInput--invalid",
        disabled && "Tenet-NumberInput--disabled",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: setRef,
            id,
            type: "text",
            inputMode: "decimal",
            role: "spinbutton",
            "aria-label": ariaLabel,
            "aria-valuenow": current ?? void 0,
            "aria-valuemin": min,
            "aria-valuemax": max,
            "aria-invalid": invalid || void 0,
            className: "Tenet-NumberInput__input",
            value: text,
            disabled,
            onChange: (e) => commit(e.target.value),
            onKeyDown: handleKeyDown,
            ...rest
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "Tenet-NumberInput__steppers", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              tabIndex: -1,
              className: "Tenet-NumberInput__stepper",
              disabled: incDisabled,
              "aria-label": "Increment",
              onClick: () => stepBy(1),
              children: "\u25B2"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              tabIndex: -1,
              className: "Tenet-NumberInput__stepper",
              disabled: decDisabled,
              "aria-label": "Decrement",
              onClick: () => stepBy(-1),
              children: "\u25BC"
            }
          )
        ] })
      ]
    }
  );
});
var cx14 = (...parts) => parts.filter(Boolean).join(" ");
function readValue(column, row) {
  if (column.accessor) return column.accessor(row);
  return row[column.id];
}
var toText2 = (value) => value == null ? "" : String(value);
function compare(a, b) {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return toText2(a).localeCompare(toText2(b), void 0, { numeric: true });
}
function DataTable({
  columns,
  data,
  rowKey,
  searchable = true,
  searchPlaceholder = "Search\u2026",
  title,
  subtitle,
  actions,
  density = "normal",
  emptyText = "No matching rows.",
  className
}) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const filterableColumns = columns.filter((c) => c.filterable);
  const filterOptions = useMemo(() => {
    const map = {};
    for (const column of filterableColumns) {
      const seen = /* @__PURE__ */ new Set();
      for (const row of data) {
        const text = toText2(readValue(column, row));
        if (text !== "") seen.add(text);
      }
      map[column.id] = Array.from(seen).sort((a, b) => a.localeCompare(b, void 0, { numeric: true }));
    }
    return map;
  }, [data, columns]);
  const rows = useMemo(() => {
    let result = data;
    for (const column of filterableColumns) {
      const active = filters[column.id];
      if (active) result = result.filter((row) => toText2(readValue(column, row)) === active);
    }
    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (row) => columns.some((column) => toText2(readValue(column, row)).toLowerCase().includes(query))
      );
    }
    if (sort) {
      const column = columns.find((c) => c.id === sort.columnId);
      if (column) {
        const sign = sort.direction === "ascending" ? 1 : -1;
        result = [...result].sort((a, b) => sign * compare(readValue(column, a), readValue(column, b)));
      }
    }
    return result;
  }, [data, columns, filters, search, sort]);
  const toggleSort = (columnId) => {
    setSort((prev) => {
      if (prev?.columnId !== columnId) return { columnId, direction: "ascending" };
      if (prev.direction === "ascending") return { columnId, direction: "descending" };
      return null;
    });
  };
  const sortDirectionFor = (columnId) => sort?.columnId === columnId ? sort.direction : "none";
  return /* @__PURE__ */ jsx("div", { className: cx14("Tenet-DataTable", className), children: /* @__PURE__ */ jsxs(Table2.Container, { children: [
    (title || subtitle || actions) && /* @__PURE__ */ jsxs(Stack2, { direction: "horizontal", align: "center", justify: "between", className: "Tenet-DataTable__header", children: [
      /* @__PURE__ */ jsxs(Stack2.Item, { grow: true, children: [
        title && /* @__PURE__ */ jsx(Table2.Title, { children: title }),
        subtitle && /* @__PURE__ */ jsx(Table2.Subtitle, { children: subtitle })
      ] }),
      actions
    ] }),
    (searchable || filterableColumns.length > 0) && /* @__PURE__ */ jsxs(Stack2, { direction: "horizontal", gap: "condensed", align: "center", wrap: true, className: "Tenet-DataTable__toolbar", children: [
      searchable && /* @__PURE__ */ jsx(
        TextInput,
        {
          "aria-label": "Search",
          leadingVisual: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u{1F50D}" }),
          placeholder: searchPlaceholder,
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "Tenet-DataTable__search"
        }
      ),
      filterableColumns.map((column) => /* @__PURE__ */ jsx(
        Select,
        {
          "aria-label": `Filter by ${column.id}`,
          value: filters[column.id] ?? "",
          onChange: (value) => setFilters((prev) => ({ ...prev, [column.id]: value })),
          options: [
            { value: "", label: "All" },
            ...filterOptions[column.id].map((v) => ({ value: v, label: v }))
          ]
        },
        column.id
      ))
    ] }),
    /* @__PURE__ */ jsxs(Table2, { density, children: [
      /* @__PURE__ */ jsx(Table2.Head, { children: /* @__PURE__ */ jsx(Table2.Row, { children: columns.map((column) => /* @__PURE__ */ jsx(
        Table2.Header,
        {
          align: column.align,
          sortDirection: column.sortable ? sortDirectionFor(column.id) : void 0,
          onClick: column.sortable ? () => toggleSort(column.id) : void 0,
          children: column.header
        },
        column.id
      )) }) }),
      /* @__PURE__ */ jsx(Table2.Body, { children: rows.length === 0 ? /* @__PURE__ */ jsx(Table2.Row, { children: /* @__PURE__ */ jsx(Table2.Cell, { align: "center", colSpan: columns.length, className: "Tenet-DataTable__empty", children: emptyText }) }) : rows.map((row, index) => /* @__PURE__ */ jsx(Table2.Row, { children: columns.map((column) => /* @__PURE__ */ jsx(Table2.Cell, { align: column.align, children: column.cell ? column.cell(row) : toText2(readValue(column, row)) }, column.id)) }, rowKey ? rowKey(row, index) : index)) })
    ] })
  ] }) });
}

// src/components/Calendar/dateUtils.ts
var startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
var startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
var addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
var addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, d.getDate());
var isSameDay = (a, b) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
var isSameMonth = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
var isOutOfRange = (day, min, max) => {
  const t = startOfDay(day).getTime();
  if (min && t < startOfDay(min).getTime()) return true;
  if (max && t > startOfDay(max).getTime()) return true;
  return false;
};
var clampToRange = (day, min, max) => {
  if (min && startOfDay(day).getTime() < startOfDay(min).getTime()) return startOfDay(min);
  if (max && startOfDay(day).getTime() > startOfDay(max).getTime()) return startOfDay(max);
  return day;
};
var dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function monthGrid(month, weekStartsOn) {
  const first = startOfMonth(month);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
}
function weekdayLabels(weekStartsOn, locale) {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const sunday = new Date(2023, 0, 1);
  return Array.from({ length: 7 }, (_, i) => fmt.format(addDays(sunday, (i + weekStartsOn) % 7)));
}
var formatMonthYear = (d, locale) => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(d);
var formatFullDate = (d, locale) => new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(d);
var formatDate = (d, locale) => new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(d);
var cx15 = (...parts) => parts.filter(Boolean).join(" ");
function Calendar({
  value,
  defaultValue,
  onChange,
  month,
  defaultMonth,
  onMonthChange,
  min,
  max,
  weekStartsOn = 0,
  locale,
  className,
  "aria-label": ariaLabel
}) {
  const today = startOfDay(/* @__PURE__ */ new Date());
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internal;
  const monthControlled = month !== void 0;
  const [internalMonth, setInternalMonth] = useState(
    () => startOfMonth(defaultMonth ?? selected ?? today)
  );
  const visibleMonth = monthControlled ? startOfMonth(month) : internalMonth;
  const [focused, setFocused] = useState(() => clampToRange(selected ?? today, min, max));
  const gridRef = useRef(null);
  const shouldFocus = useRef(false);
  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    gridRef.current?.querySelector(`[data-day="${dayKey(focused)}"]`)?.focus();
  }, [focused]);
  const setMonth = (next) => {
    const m = startOfMonth(next);
    if (!monthControlled) setInternalMonth(m);
    onMonthChange?.(m);
  };
  const select = (day) => {
    if (isOutOfRange(day, min, max)) return;
    if (!isControlled) setInternal(day);
    onChange?.(day);
    if (!isSameMonth(day, visibleMonth)) setMonth(day);
  };
  const moveFocus = (next) => {
    const clamped = clampToRange(next, min, max);
    setFocused(clamped);
    shouldFocus.current = true;
    if (!isSameMonth(clamped, visibleMonth)) setMonth(clamped);
  };
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        moveFocus(addDays(focused, -1));
        break;
      case "ArrowRight":
        e.preventDefault();
        moveFocus(addDays(focused, 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        moveFocus(addDays(focused, -7));
        break;
      case "ArrowDown":
        e.preventDefault();
        moveFocus(addDays(focused, 7));
        break;
      case "Home":
        e.preventDefault();
        moveFocus(addDays(focused, -((focused.getDay() - weekStartsOn + 7) % 7)));
        break;
      case "End":
        e.preventDefault();
        moveFocus(addDays(focused, 6 - (focused.getDay() - weekStartsOn + 7) % 7));
        break;
      case "PageUp":
        e.preventDefault();
        moveFocus(addMonths(focused, -1));
        break;
      case "PageDown":
        e.preventDefault();
        moveFocus(addMonths(focused, 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        select(focused);
        break;
    }
  };
  const weekdays = weekdayLabels(weekStartsOn, locale);
  const days = monthGrid(visibleMonth, weekStartsOn);
  const weeks = Array.from({ length: 6 }, (_, w) => days.slice(w * 7, w * 7 + 7));
  const prevDisabled = !!min && startOfMonth(visibleMonth).getTime() <= startOfMonth(min).getTime();
  const nextDisabled = !!max && startOfMonth(visibleMonth).getTime() >= startOfMonth(max).getTime();
  return /* @__PURE__ */ jsxs("div", { className: cx15("Tenet-Calendar", className), role: "group", "aria-label": ariaLabel ?? "Calendar", children: [
    /* @__PURE__ */ jsxs("div", { className: "Tenet-Calendar__header", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "Tenet-Calendar__nav",
          "aria-label": "Previous month",
          disabled: prevDisabled,
          onClick: () => setMonth(addMonths(visibleMonth, -1)),
          children: "\u2039"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "Tenet-Calendar__heading", "aria-live": "polite", children: formatMonthYear(visibleMonth, locale) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "Tenet-Calendar__nav",
          "aria-label": "Next month",
          disabled: nextDisabled,
          onClick: () => setMonth(addMonths(visibleMonth, 1)),
          children: "\u203A"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { ref: gridRef, className: "Tenet-Calendar__grid", role: "grid", "aria-label": formatMonthYear(visibleMonth, locale), onKeyDown, children: [
      /* @__PURE__ */ jsx("div", { className: "Tenet-Calendar__weekrow", role: "row", children: weekdays.map((label, i) => /* @__PURE__ */ jsx("span", { role: "columnheader", className: "Tenet-Calendar__weekday", "aria-label": label, children: label.slice(0, 2) }, i)) }),
      weeks.map((week, wi) => /* @__PURE__ */ jsx("div", { className: "Tenet-Calendar__weekrow", role: "row", children: week.map((day) => {
        const inMonth = isSameMonth(day, visibleMonth);
        const disabled = isOutOfRange(day, min, max);
        const isSelected = isSameDay(day, selected);
        const isToday = isSameDay(day, today);
        const isFocusTarget = isSameDay(day, focused);
        return /* @__PURE__ */ jsx("div", { role: "gridcell", "aria-selected": isSelected, className: "Tenet-Calendar__cell", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "data-day": dayKey(day),
            tabIndex: isFocusTarget ? 0 : -1,
            disabled,
            "aria-label": formatFullDate(day, locale),
            "aria-current": isToday ? "date" : void 0,
            className: cx15(
              "Tenet-Calendar__day",
              !inMonth && "Tenet-Calendar__day--outside",
              isSelected && "Tenet-Calendar__day--selected",
              isToday && !isSelected && "Tenet-Calendar__day--today"
            ),
            onClick: () => select(day),
            onFocus: () => setFocused(day),
            children: day.getDate()
          }
        ) }, dayKey(day));
      }) }, wi))
    ] })
  ] });
}
var cx16 = (...parts) => parts.filter(Boolean).join(" ");
var DatePicker = forwardRef(function DatePicker2({
  value,
  defaultValue,
  onChange,
  min,
  max,
  weekStartsOn = 0,
  locale,
  placeholder = "Select a date\u2026",
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
  const reactId = useId();
  const triggerId = id ?? `${reactId}-trigger`;
  const dialogId = `${reactId}-dialog`;
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internal;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) wrapRef.current?.querySelector(".Tenet-DatePicker__trigger")?.focus();
  };
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const el = wrapRef.current?.querySelector('.Tenet-Calendar__day[tabindex="0"]');
    el?.focus();
  }, [open]);
  const handleSelect = (date) => {
    if (!isControlled) setInternal(date);
    onChange?.(date);
    close();
  };
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref: wrapRef,
      className: cx16(
        "Tenet-DatePicker",
        `Tenet-DatePicker--size-${size}`,
        block && "Tenet-DatePicker--block",
        invalid && "Tenet-DatePicker--invalid",
        disabled && "Tenet-DatePicker--disabled",
        className
      ),
      onKeyDown: (e) => {
        if (e.key === "Escape" && open) {
          e.preventDefault();
          close();
        }
      },
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            ref,
            type: "button",
            id: triggerId,
            "aria-haspopup": "dialog",
            "aria-expanded": open,
            "aria-controls": open ? dialogId : void 0,
            "aria-label": ariaLabel,
            "aria-invalid": invalid || void 0,
            "aria-required": required || void 0,
            "aria-describedby": describedBy,
            disabled,
            className: "Tenet-DatePicker__trigger",
            onClick: () => !disabled && setOpen((o) => !o),
            children: [
              /* @__PURE__ */ jsx("span", { className: "Tenet-DatePicker__icon", "aria-hidden": "true", children: "\u{1F4C5}" }),
              /* @__PURE__ */ jsx("span", { className: cx16("Tenet-DatePicker__value", !selected && "Tenet-DatePicker__value--placeholder"), children: selected ? formatDate(selected, locale) : placeholder })
            ]
          }
        ),
        open && /* @__PURE__ */ jsx("div", { id: dialogId, role: "dialog", "aria-modal": "false", "aria-label": ariaLabel ?? "Choose date", className: "Tenet-DatePicker__popover", children: /* @__PURE__ */ jsx(
          Calendar,
          {
            value: selected,
            defaultMonth: selected ?? void 0,
            onChange: handleSelect,
            min,
            max,
            weekStartsOn,
            locale,
            "aria-label": ariaLabel ?? "Choose date",
            className: "Tenet-DatePicker__calendar"
          }
        ) }),
        name && /* @__PURE__ */ jsx("input", { type: "hidden", name, value: selected ? dayKey(selected) : "" })
      ]
    }
  );
});
var cx17 = (...parts) => parts.filter(Boolean).join(" ");
var DEFAULT_ICON = {
  info: "\u2139",
  success: "\u2713",
  warning: "!",
  danger: "\u2715"
};
var Banner = forwardRef(function Banner2({ variant = "info", title, icon, hideIcon = false, onDismiss, className, children, ...rest }, ref) {
  const role = variant === "danger" ? "alert" : "status";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      role,
      className: cx17("Tenet-Banner", `Tenet-Banner--variant-${variant}`, className),
      ...rest,
      children: [
        !hideIcon && /* @__PURE__ */ jsx("span", { className: "Tenet-Banner__icon", "aria-hidden": "true", children: icon ?? DEFAULT_ICON[variant] }),
        /* @__PURE__ */ jsxs("div", { className: "Tenet-Banner__content", children: [
          title && /* @__PURE__ */ jsx("p", { className: "Tenet-Banner__title", children: title }),
          children && /* @__PURE__ */ jsx("div", { className: "Tenet-Banner__body", children })
        ] }),
        onDismiss && /* @__PURE__ */ jsx("button", { type: "button", className: "Tenet-Banner__dismiss", "aria-label": "Dismiss", onClick: onDismiss, children: "\u2715" })
      ]
    }
  );
});
var cx18 = (...parts) => parts.filter(Boolean).join(" ");
var Badge = forwardRef(function Badge2({ variant = "default", count, max = 99, dot = false, className, children, ...rest }, ref) {
  const content = children ?? (count != null ? count > max ? `${max}+` : String(count) : void 0);
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cx18("Tenet-Badge", `Tenet-Badge--variant-${variant}`, dot && "Tenet-Badge--dot", className),
      ...rest,
      children: !dot && content
    }
  );
});
var cx19 = (...parts) => parts.filter(Boolean).join(" ");
function initialsOf(name) {
  const words = name.trim().split(/[\s-_]+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
var Avatar = forwardRef(function Avatar2({ src, name, size = "medium", shape = "circle", className, ...rest }, ref) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      role: "img",
      "aria-label": name,
      title: name,
      className: cx19("Tenet-Avatar", `Tenet-Avatar--size-${size}`, `Tenet-Avatar--shape-${shape}`, className),
      ...rest,
      children: showImage ? /* @__PURE__ */ jsx("img", { src, alt: "", className: "Tenet-Avatar__img", onError: () => setFailed(true) }) : /* @__PURE__ */ jsx("span", { className: "Tenet-Avatar__initials", "aria-hidden": "true", children: initialsOf(name) })
    }
  );
});
var cx20 = (...parts) => parts.filter(Boolean).join(" ");
var Spinner = forwardRef(function Spinner2({ size = "medium", label = "Loading", className, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref,
      role: "status",
      className: cx20("Tenet-Spinner", `Tenet-Spinner--size-${size}`, className),
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "Tenet-Spinner__circle", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("span", { className: "Tenet-visuallyHidden", children: label })
      ]
    }
  );
});
var cx21 = (...parts) => parts.filter(Boolean).join(" ");
var Divider = forwardRef(function Divider2({ orientation = "horizontal", className, children, ...rest }, ref) {
  const labelled = orientation === "horizontal" && children != null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "separator",
      "aria-orientation": orientation,
      className: cx21(
        "Tenet-Divider",
        `Tenet-Divider--${orientation}`,
        labelled && "Tenet-Divider--labelled",
        className
      ),
      ...rest,
      children: labelled && /* @__PURE__ */ jsx("span", { className: "Tenet-Divider__label", children })
    }
  );
});
var cx22 = (...parts) => parts.filter(Boolean).join(" ");
var TabsContext = createContext(null);
var useTabs = (component) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`Tabs.${component} must be used inside <Tabs>`);
  return ctx;
};
var slug = (v) => v.replace(/[^a-zA-Z0-9_-]/g, "_");
function Tabs({ value, defaultValue, onChange, className, children }) {
  const baseId = useId();
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value : internal;
  const setValue = (v) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };
  return /* @__PURE__ */ jsx(TabsContext.Provider, { value: { value: current, setValue, baseId }, children: /* @__PURE__ */ jsx("div", { className: cx22("Tenet-Tabs", className), children }) });
}
function TabsList({ className, children, ...rest }) {
  const onKeyDown = (e) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const tabs = Array.from(
      e.currentTarget.querySelectorAll('[role="tab"]:not([aria-disabled="true"])')
    );
    if (tabs.length === 0) return;
    e.preventDefault();
    const idx = tabs.indexOf(document.activeElement);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    tabs[next]?.focus();
    tabs[next]?.click();
  };
  return /* @__PURE__ */ jsx("div", { role: "tablist", className: cx22("Tenet-Tabs__list", className), onKeyDown, ...rest, children });
}
function Tab({ value, disabled = false, className, children }) {
  const { value: active, setValue, baseId } = useTabs("Tab");
  const selected = active === value;
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      role: "tab",
      id: `${baseId}-tab-${slug(value)}`,
      "aria-selected": selected,
      "aria-controls": `${baseId}-panel-${slug(value)}`,
      "aria-disabled": disabled || void 0,
      disabled,
      tabIndex: selected ? 0 : -1,
      className: cx22("Tenet-Tabs__tab", selected && "Tenet-Tabs__tab--selected", className),
      onClick: () => !disabled && setValue(value),
      children
    }
  );
}
function TabPanel({ value, className, children }) {
  const { value: active, baseId } = useTabs("Panel");
  if (active !== value) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "tabpanel",
      id: `${baseId}-panel-${slug(value)}`,
      "aria-labelledby": `${baseId}-tab-${slug(value)}`,
      tabIndex: 0,
      className: cx22("Tenet-Tabs__panel", className),
      children
    }
  );
}
Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
var cx23 = (...parts) => parts.filter(Boolean).join(" ");
function Tooltip({ content, placement = "top", children, className }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const trigger = cloneElement(children, {
    "aria-describedby": id
  });
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cx23("Tenet-Tooltip", className),
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      onFocus: () => setOpen(true),
      onBlur: () => setOpen(false),
      onKeyDown: (e) => e.key === "Escape" && setOpen(false),
      children: [
        trigger,
        /* @__PURE__ */ jsx(
          "span",
          {
            role: "tooltip",
            id,
            className: cx23("Tenet-Tooltip__bubble", `Tenet-Tooltip__bubble--${placement}`, open && "Tenet-Tooltip__bubble--open"),
            children: content
          }
        )
      ]
    }
  );
}
var cx24 = (...parts) => parts.filter(Boolean).join(" ");
var FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Dialog({
  open,
  onClose,
  title,
  description,
  size = "medium",
  footer,
  closeOnBackdrop = true,
  className,
  children
}) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef(null);
  const lastFocused = useRef(null);
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    const panel = panelRef.current;
    const first = panel?.querySelector(FOCUSABLE);
    (first ?? panel)?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus?.();
    };
  }, [open]);
  if (!open) return null;
  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const items = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null
    );
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "Tenet-Dialog__backdrop",
        onMouseDown: (e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) onClose();
        },
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            ref: panelRef,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": titleId,
            "aria-describedby": description ? descId : void 0,
            tabIndex: -1,
            className: cx24("Tenet-Dialog", `Tenet-Dialog--size-${size}`, className),
            onKeyDown,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "Tenet-Dialog__header", children: [
                /* @__PURE__ */ jsxs("div", { className: "Tenet-Dialog__headings", children: [
                  /* @__PURE__ */ jsx("h2", { id: titleId, className: "Tenet-Dialog__title", children: title }),
                  description && /* @__PURE__ */ jsx("p", { id: descId, className: "Tenet-Dialog__description", children: description })
                ] }),
                /* @__PURE__ */ jsx("button", { type: "button", className: "Tenet-Dialog__close", "aria-label": "Close", onClick: onClose, children: "\u2715" })
              ] }),
              children && /* @__PURE__ */ jsx("div", { className: "Tenet-Dialog__body", children }),
              footer && /* @__PURE__ */ jsx("div", { className: "Tenet-Dialog__footer", children: footer })
            ]
          }
        )
      }
    ),
    document.body
  );
}

export { Avatar, Badge, Banner, Button, Calendar, Card, Checkbox, DataTable, DatePicker, Dialog, Divider, FormControl2 as FormControl, Label, NumberInput, Radio, RadioGroup, Select, Spinner, Stack2 as Stack, Switch, Table2 as Table, Tabs, TextInput, Textarea, Tooltip };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map