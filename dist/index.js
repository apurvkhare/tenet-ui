import { forwardRef, createElement, useId, Children, isValidElement, cloneElement, useState, useRef, useCallback, useEffect, createContext, useContext, useLayoutEffect, useMemo } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

// src/components/Button/Button.tsx

// src/internal/deprecate.ts
var warned = /* @__PURE__ */ new Set();
var isDev = () => {
  const nodeEnv = globalThis.process?.env?.NODE_ENV;
  return nodeEnv !== "production";
};
function warnDeprecated(key, message) {
  if (!isDev() || warned.has(key)) return;
  warned.add(key);
  console.warn(`tenet-ui: ${message}`);
}
function resolveFullWidth(component, fullWidth, block) {
  if (block !== void 0) {
    warnDeprecated(`${component}.block`, `<${component} block> is deprecated since 0.4.0 \u2014 use <${component} fullWidth> instead. \`block\` will be removed in 0.5.0.`);
  }
  return fullWidth ?? block ?? false;
}
var cx = (...parts) => parts.filter(Boolean).join(" ");
var Button = forwardRef(function Button2({
  variant = "default",
  size = "medium",
  leadingIcon,
  trailingIcon,
  fullWidth,
  block,
  type = "button",
  className,
  children,
  ...rest
}, ref) {
  const isFullWidth = resolveFullWidth("Button", fullWidth, block);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      type,
      className: cx(
        "Tenet-Button",
        `Tenet-Button--variant-${variant}`,
        `Tenet-Button--size-${size}`,
        isFullWidth && "Tenet-Button--fullWidth",
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
var Heading = forwardRef(function Heading2({ level = 2, as, truncate = false, className, children, ...rest }, ref) {
  const element = as ?? `h${level}`;
  return createElement(
    element,
    {
      ref,
      className: cx2("Tenet-Heading", `Tenet-Heading--level-${level}`, truncate && "Tenet-Heading--truncate", className),
      ...rest
    },
    children
  );
});
var cx3 = (...parts) => parts.filter(Boolean).join(" ");
var Text = forwardRef(function Text2({ as = "p", size = "medium", tone = "default", weight = "normal", truncate = false, align, className, children, ...rest }, ref) {
  return createElement(
    as,
    {
      ref,
      className: cx3(
        "Tenet-Text",
        `Tenet-Text--size-${size}`,
        `Tenet-Text--tone-${tone}`,
        `Tenet-Text--weight-${weight}`,
        align && `Tenet-Text--align-${align}`,
        truncate && "Tenet-Text--truncate",
        className
      ),
      ...rest
    },
    children
  );
});
var cx4 = (...parts) => parts.filter(Boolean).join(" ");
var StackRoot = forwardRef(function Stack({ direction = "vertical", gap = "normal", align, justify, wrap = false, padding, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx4(
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
  return /* @__PURE__ */ jsx("div", { ref, className: cx4("Tenet-Stack__item", grow && "Tenet-Stack__item--grow", className), ...rest, children });
});
var Stack2 = Object.assign(StackRoot, { Item: StackItem });
var cx5 = (...parts) => parts.filter(Boolean).join(" ");
var BREAKPOINTS = ["base", "sm", "md", "lg"];
function responsiveVars(prefix, value) {
  const vars = {};
  if (value === void 0) return vars;
  if (typeof value === "number") {
    vars[`${prefix}-base`] = value;
    return vars;
  }
  for (const bp of BREAKPOINTS) {
    const v = value[bp];
    if (v !== void 0) vars[`${prefix}-${bp}`] = v;
  }
  return vars;
}
var GridRoot = forwardRef(function Grid({ columns = 1, gap = "normal", rowGap, align, className, style, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx5(
        "Tenet-Grid",
        `Tenet-Grid--gap-${gap}`,
        rowGap && `Tenet-Grid--rowGap-${rowGap}`,
        align && `Tenet-Grid--align-${align}`,
        className
      ),
      style: { ...responsiveVars("--Tenet-Grid-columns", columns), ...style },
      ...rest,
      children
    }
  );
});
var GridItem = forwardRef(function GridItem2({ span, className, style, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx5("Tenet-Grid__item", span !== void 0 && "Tenet-Grid__item--span", className),
      style: { ...responsiveVars("--Tenet-Grid-Item-span", span), ...style },
      ...rest,
      children
    }
  );
});
var Grid2 = Object.assign(GridRoot, { Item: GridItem });
var cx6 = (...parts) => parts.filter(Boolean).join(" ");
var Card = forwardRef(function Card2({ variant = "default", padding = "normal", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx6("Tenet-Card", `Tenet-Card--variant-${variant}`, `Tenet-Card--padding-${padding}`, className),
      ...rest,
      children
    }
  );
});
var cx7 = (...parts) => parts.filter(Boolean).join(" ");
var TextInput = forwardRef(function TextInput2({ size = "medium", fullWidth, block, leadingVisual, trailingVisual, invalid = false, className, disabled, ...rest }, ref) {
  const isFullWidth = resolveFullWidth("TextInput", fullWidth, block);
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cx7(
        "Tenet-TextInput",
        `Tenet-TextInput--size-${size}`,
        isFullWidth && "Tenet-TextInput--fullWidth",
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
var cx8 = (...parts) => parts.filter(Boolean).join(" ");
var Label = forwardRef(function Label2({ variant = "default", size = "medium", className, children, ...rest }, ref) {
  warnDeprecated("Label", '<Label> is deprecated since 0.4.0 \u2014 use <Tag variant="\u2026"> instead (same variants; read-only without onRemove). Label will be removed in 0.5.0.');
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cx8("Tenet-Label", `Tenet-Label--variant-${variant}`, `Tenet-Label--size-${size}`, className),
      ...rest,
      children
    }
  );
});
var cx9 = (...parts) => parts.filter(Boolean).join(" ");
var sortGlyph = { ascending: "\u25B2", descending: "\u25BC", none: "\u2195" };
var TableRoot = forwardRef(function Table({ density = "normal", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { className: "Tenet-Table__scroll", children: /* @__PURE__ */ jsx("table", { ref, className: cx9("Tenet-Table", `Tenet-Table--density-${density}`, className), ...rest, children }) });
});
var Container = forwardRef(function TableContainer({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { ref, className: cx9("Tenet-Table__container", className), ...rest, children });
});
var Title = forwardRef(function TableTitle({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("h2", { ref, className: cx9("Tenet-Table__title", className), ...rest, children });
});
var Subtitle = forwardRef(function TableSubtitle({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("p", { ref, className: cx9("Tenet-Table__subtitle", className), ...rest, children });
});
var Actions = forwardRef(function TableActions({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { ref, className: cx9("Tenet-Table__actions", className), ...rest, children });
});
var Head = forwardRef(function TableHead({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("thead", { ref, className: cx9("Tenet-Table__head", className), ...rest, children });
});
var Body = forwardRef(function TableBody({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("tbody", { ref, className: cx9("Tenet-Table__body", className), ...rest, children });
});
var Row = forwardRef(function TableRow({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("tr", { ref, className: cx9("Tenet-Table__row", className), ...rest, children });
});
var Header = forwardRef(function TableHeader({ align = "start", sortDirection, scope = "col", className, children, onClick, ...rest }, ref) {
  const sortable = sortDirection !== void 0;
  return /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      scope,
      "aria-sort": sortable && sortDirection !== "none" ? sortDirection : void 0,
      className: cx9("Tenet-Table__header", `Tenet-Table__cell--align-${align}`, sortable && "Tenet-Table__header--sortable", className),
      ...rest,
      children: sortable ? (
        // A real button so sorting is reachable & operable by keyboard, not click-only.
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "Tenet-Table__sortButton",
            onClick,
            children: [
              children,
              /* @__PURE__ */ jsx("span", { className: "Tenet-Table__sort", "aria-hidden": "true", children: sortGlyph[sortDirection] })
            ]
          }
        )
      ) : children
    }
  );
});
var Cell = forwardRef(function TableCell({ align = "start", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("td", { ref, className: cx9("Tenet-Table__cell", `Tenet-Table__cell--align-${align}`, className), ...rest, children });
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
var cx10 = (...parts) => parts.filter(Boolean).join(" ");
function Label3({ visuallyHidden = false, required = false, className, children, ...rest }) {
  return /* @__PURE__ */ jsxs("label", { className: cx10("Tenet-FormControl__label", visuallyHidden && "Tenet-visuallyHidden", className), ...rest, children: [
    children,
    required && /* @__PURE__ */ jsxs("span", { className: "Tenet-FormControl__required", "aria-hidden": "true", children: [
      " ",
      "*"
    ] })
  ] });
}
function Caption({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx("span", { className: cx10("Tenet-FormControl__caption", className), ...rest, children });
}
function Validation({ variant = "error", className, children, ...rest }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      role: variant === "error" ? "alert" : void 0,
      className: cx10("Tenet-FormControl__validation", `Tenet-FormControl__validation--${variant}`, className),
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
  return /* @__PURE__ */ jsx("div", { ref, className: cx10("Tenet-FormControl", className), ...rest, children: mapped });
});
var FormControl2 = Object.assign(FormControlRoot, { Label: Label3, Caption, Validation });
var cx11 = (...parts) => parts.filter(Boolean).join(" ");
var Textarea = forwardRef(function Textarea2({ fullWidth, block, invalid = false, resize = "vertical", size = "medium", rows = 4, className, ...rest }, ref) {
  const isFullWidth = resolveFullWidth("Textarea", fullWidth, block);
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      ref,
      rows,
      "aria-invalid": invalid || void 0,
      className: cx11(
        "Tenet-Textarea",
        `Tenet-Textarea--size-${size}`,
        isFullWidth && "Tenet-Textarea--fullWidth",
        invalid && "Tenet-Textarea--invalid",
        `Tenet-Textarea--resize-${resize}`,
        className
      ),
      ...rest
    }
  );
});
var useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
function Portal({ children }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}
var clamp = (v, min, max) => Math.max(min, Math.min(v, Math.max(min, max)));
var FLOATING_HIDDEN = {
  position: "fixed",
  top: 0,
  left: -9999,
  margin: 0
};
function useAnchoredPosition({
  open,
  anchorRef,
  floatingRef,
  placement = "bottom-start",
  matchWidth = false,
  gap = 6
}) {
  const [style, setStyle] = useState(null);
  useIsoLayoutEffect(() => {
    if (!open) {
      setStyle(null);
      return;
    }
    const anchor = anchorRef.current;
    const floating = floatingRef.current;
    if (!anchor || !floating) return;
    const compute = () => {
      const a = anchor.getBoundingClientRect();
      const f = floating.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
      let top;
      let left;
      if (placement === "left" || placement === "right") {
        const placeLeft = placement === "left" ? !(a.left < f.width + gap && vw - a.right > a.left) : vw - a.right < f.width + gap && a.left > vw - a.right;
        left = placeLeft ? a.left - gap - f.width : a.right + gap;
        top = a.top + a.height / 2 - f.height / 2;
      } else {
        const wantTop = placement.startsWith("top");
        const spaceBelow = vh - a.bottom;
        const spaceAbove = a.top;
        const placeTop = wantTop ? !(spaceAbove < f.height + gap && spaceBelow > spaceAbove) : spaceBelow < f.height + gap && spaceAbove > spaceBelow;
        top = placeTop ? a.top - gap - f.height : a.bottom + gap;
        if (placement.endsWith("end")) left = a.right - f.width;
        else if (placement.endsWith("start")) left = a.left;
        else left = a.left + a.width / 2 - f.width / 2;
      }
      top = clamp(top, gap, vh - f.height - gap);
      left = clamp(left, gap, vw - f.width - gap);
      const next = { position: "fixed", top: Math.round(top), left: Math.round(left), margin: 0 };
      if (matchWidth) next.minWidth = Math.round(a.width);
      setStyle(next);
    };
    compute();
    const onChange = () => compute();
    window.addEventListener("scroll", onChange, true);
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("scroll", onChange, true);
      window.removeEventListener("resize", onChange);
    };
  }, [open, placement, matchWidth, gap, anchorRef, floatingRef]);
  return style ?? FLOATING_HIDDEN;
}
function mergeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else ref.current = node;
    }
  };
}
var cx12 = (...parts) => parts.filter(Boolean).join(" ");
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
  fullWidth,
  block,
  invalid = false,
  disabled = false,
  required = false,
  name,
  id,
  className,
  "aria-label": ariaLabel,
  "aria-describedby": describedBy,
  ...rest
}, ref) {
  const isFullWidth = resolveFullWidth("Select", fullWidth, block);
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
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const typeahead = useRef({ buf: "", t: null });
  const listStyle = useAnchoredPosition({ open, anchorRef: triggerRef, floatingRef: listRef, matchWidth: true });
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
      const t = e.target;
      if (!wrapRef.current?.contains(t) && !listRef.current?.contains(t)) setOpen(false);
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
      className: cx12(
        "Tenet-Select",
        `Tenet-Select--size-${size}`,
        isFullWidth && "Tenet-Select--fullWidth",
        invalid && "Tenet-Select--invalid",
        disabled && "Tenet-Select--disabled",
        open && "Tenet-Select--open",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            ...rest,
            ref: mergeRefs(ref, triggerRef),
            type: "button",
            id: triggerId,
            role: "combobox",
            "aria-haspopup": "listbox",
            "aria-expanded": open,
            "aria-controls": open ? listboxId : void 0,
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
              /* @__PURE__ */ jsx("span", { className: cx12("Tenet-Select__value", !selected && "Tenet-Select__value--placeholder"), children: selected ? selected.label : placeholder }),
              /* @__PURE__ */ jsx("span", { className: "Tenet-Select__caret", "aria-hidden": "true", children: "\u25BE" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx("ul", { ref: listRef, id: listboxId, role: "listbox", className: "Tenet-Select__listbox", style: listStyle, tabIndex: -1, children: options.map((opt, i) => {
          const isSelected = opt.value === current;
          return /* @__PURE__ */ jsxs(
            "li",
            {
              id: optionId(i),
              role: "option",
              "aria-selected": isSelected,
              "aria-disabled": opt.disabled || void 0,
              className: cx12(
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
                /* @__PURE__ */ jsx("span", { className: "Tenet-Select__optionLabel", children: opt.label })
              ]
            },
            opt.value
          );
        }) }) }),
        name && /* @__PURE__ */ jsx("input", { type: "hidden", name, value: current })
      ]
    }
  );
});
var cx13 = (...parts) => parts.filter(Boolean).join(" ");
var Checkbox = forwardRef(function Checkbox2({ label, caption, id, className, disabled, invalid = false, indeterminate = false, "aria-describedby": ariaDescribedby, ...rest }, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : void 0;
  const describedBy = [captionId, ariaDescribedby].filter(Boolean).join(" ") || void 0;
  const innerRef = useRef(null);
  const setRef = (node) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return /* @__PURE__ */ jsxs("span", { className: cx13("Tenet-Checkbox", disabled && "Tenet-Checkbox--disabled", className), children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: setRef,
        id: inputId,
        type: "checkbox",
        className: "Tenet-Checkbox__input",
        disabled,
        "aria-invalid": invalid || void 0,
        "aria-describedby": describedBy,
        ...rest
      }
    ),
    label && /* @__PURE__ */ jsxs("span", { className: "Tenet-Checkbox__text", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: inputId, className: "Tenet-Checkbox__label", children: label }),
      caption && /* @__PURE__ */ jsx("span", { id: captionId, className: "Tenet-Checkbox__caption", children: caption })
    ] })
  ] });
});
var cx14 = (...parts) => parts.filter(Boolean).join(" ");
var RadioGroupContext = createContext(null);
var Radio = forwardRef(function Radio2({ value, label, caption, id, name, checked, defaultChecked, disabled, onChange, className, "aria-describedby": ariaDescribedby, ...rest }, ref) {
  const ctx = useContext(RadioGroupContext);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : void 0;
  const describedBy = [captionId, ariaDescribedby].filter(Boolean).join(" ") || void 0;
  const controlled = ctx?.value !== void 0;
  const resolvedChecked = controlled ? ctx?.value === value : checked;
  const resolvedDefault = !controlled ? ctx?.defaultValue !== void 0 ? ctx.defaultValue === value : defaultChecked : void 0;
  const resolvedName = ctx?.name ?? name;
  const resolvedDisabled = disabled ?? ctx?.disabled;
  const handleChange = (event) => {
    onChange?.(event);
    ctx?.onChange?.(value);
  };
  return /* @__PURE__ */ jsxs("span", { className: cx14("Tenet-Radio", resolvedDisabled && "Tenet-Radio--disabled", className), children: [
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
        "aria-describedby": describedBy,
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
var RadioGroup = forwardRef(function RadioGroup2({ name, label, caption, value, defaultValue, onChange, required = false, disabled = false, className, children, "aria-describedby": ariaDescribedby, ...rest }, ref) {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const captionId = caption ? `${groupName}-caption` : void 0;
  const describedBy = [captionId, ariaDescribedby].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs(
    "fieldset",
    {
      ref,
      className: cx14("Tenet-RadioGroup", className),
      "aria-describedby": describedBy,
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
var cx15 = (...parts) => parts.filter(Boolean).join(" ");
var Switch = forwardRef(function Switch2({ label, caption, size = "medium", invalid = false, id, className, disabled, "aria-describedby": ariaDescribedby, ...rest }, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : void 0;
  const describedBy = [captionId, ariaDescribedby].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cx15(
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
              "aria-describedby": describedBy,
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
var cx16 = (...parts) => parts.filter(Boolean).join(" ");
var toText = (n) => n == null ? "" : String(n);
var parse = (s) => {
  const trimmed = s.trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  return Number.isNaN(n) ? null : n;
};
var clamp2 = (n, min, max) => {
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
  fullWidth,
  block,
  invalid = false,
  className,
  disabled,
  id,
  "aria-label": ariaLabel,
  ...rest
}, ref) {
  const isFullWidth = resolveFullWidth("NumberInput", fullWidth, block);
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
    const next = clamp2(base + direction * step, min, max);
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
      className: cx16(
        "Tenet-NumberInput",
        `Tenet-NumberInput--size-${size}`,
        isFullWidth && "Tenet-NumberInput--fullWidth",
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
            "aria-valuetext": current == null ? "Empty" : void 0,
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
              onClick: () => stepBy(-1),
              children: "\u25BC"
            }
          )
        ] })
      ]
    }
  );
});
var cx17 = (...parts) => parts.filter(Boolean).join(" ");
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
  return /* @__PURE__ */ jsx("div", { className: cx17("Tenet-DataTable", className), children: /* @__PURE__ */ jsxs(Table2.Container, { children: [
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
          "aria-label": `Filter by ${typeof column.header === "string" ? column.header : column.id}`,
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
var cx18 = (...parts) => parts.filter(Boolean).join(" ");
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
  return /* @__PURE__ */ jsxs("div", { className: cx18("Tenet-Calendar", className), role: "group", "aria-label": ariaLabel ?? "Calendar", children: [
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
      /* @__PURE__ */ jsx("div", { className: "Tenet-Calendar__heading", children: formatMonthYear(visibleMonth, locale) }),
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
            className: cx18(
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
var cx19 = (...parts) => parts.filter(Boolean).join(" ");
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
  fullWidth,
  block,
  invalid = false,
  disabled = false,
  required = false,
  name,
  id,
  className,
  "aria-label": ariaLabel,
  "aria-describedby": describedBy
}, ref) {
  const isFullWidth = resolveFullWidth("DatePicker", fullWidth, block);
  const reactId = useId();
  const triggerId = id ?? `${reactId}-trigger`;
  const dialogId = `${reactId}-dialog`;
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internal;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const popoverStyle = useAnchoredPosition({ open, anchorRef: triggerRef, floatingRef: popoverRef });
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const t = e.target;
      if (!wrapRef.current?.contains(t) && !popoverRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const el = popoverRef.current?.querySelector('.Tenet-Calendar__day[tabindex="0"]') ?? popoverRef.current;
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
      className: cx19(
        "Tenet-DatePicker",
        `Tenet-DatePicker--size-${size}`,
        isFullWidth && "Tenet-DatePicker--fullWidth",
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
      onBlur: (e) => {
        const rt = e.relatedTarget;
        if (open && !wrapRef.current?.contains(rt) && !popoverRef.current?.contains(rt)) setOpen(false);
      },
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            ref: mergeRefs(ref, triggerRef),
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
              /* @__PURE__ */ jsx("span", { className: cx19("Tenet-DatePicker__value", !selected && "Tenet-DatePicker__value--placeholder"), children: selected ? formatDate(selected, locale) : placeholder })
            ]
          }
        ),
        open && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx("div", { ref: popoverRef, id: dialogId, role: "dialog", "aria-modal": "false", "aria-label": ariaLabel ?? "Choose date", tabIndex: -1, style: popoverStyle, className: "Tenet-DatePicker__popover", children: /* @__PURE__ */ jsx(
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
        ) }) }),
        name && /* @__PURE__ */ jsx("input", { type: "hidden", name, value: selected ? dayKey(selected) : "" })
      ]
    }
  );
});
var cx20 = (...parts) => parts.filter(Boolean).join(" ");
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
      className: cx20("Tenet-Banner", `Tenet-Banner--variant-${variant}`, className),
      ...rest,
      children: [
        !hideIcon && /* @__PURE__ */ jsx("span", { className: "Tenet-Banner__icon", "aria-hidden": "true", children: icon ?? DEFAULT_ICON[variant] }),
        /* @__PURE__ */ jsxs("div", { className: "Tenet-Banner__content", children: [
          title && /* @__PURE__ */ jsx("p", { className: "Tenet-Banner__title", children: title }),
          children && /* @__PURE__ */ jsx("div", { className: "Tenet-Banner__body", children })
        ] }),
        onDismiss && /* @__PURE__ */ jsx("button", { type: "button", className: "Tenet-Banner__dismiss", "aria-label": "Dismiss", onClick: onDismiss, children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u2715" }) })
      ]
    }
  );
});
var cx21 = (...parts) => parts.filter(Boolean).join(" ");
var Badge = forwardRef(function Badge2({ variant = "default", count, max = 99, dot = false, className, children, ...rest }, ref) {
  const content = children ?? (count != null ? count > max ? `${max}+` : String(count) : void 0);
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      "aria-hidden": dot ? true : void 0,
      className: cx21("Tenet-Badge", `Tenet-Badge--variant-${variant}`, dot && "Tenet-Badge--dot", className),
      ...rest,
      children: !dot && content
    }
  );
});
var cx22 = (...parts) => parts.filter(Boolean).join(" ");
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
      className: cx22("Tenet-Avatar", `Tenet-Avatar--size-${size}`, `Tenet-Avatar--shape-${shape}`, className),
      ...rest,
      children: showImage ? /* @__PURE__ */ jsx("img", { src, alt: "", className: "Tenet-Avatar__img", onError: () => setFailed(true) }) : /* @__PURE__ */ jsx("span", { className: "Tenet-Avatar__initials", "aria-hidden": "true", children: initialsOf(name) })
    }
  );
});
var cx23 = (...parts) => parts.filter(Boolean).join(" ");
var Spinner = forwardRef(function Spinner2({ size = "medium", label = "Loading", className, ...rest }, ref) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref,
      role: "status",
      className: cx23("Tenet-Spinner", `Tenet-Spinner--size-${size}`, className),
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "Tenet-Spinner__circle", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("span", { className: "Tenet-visuallyHidden", children: label })
      ]
    }
  );
});
var cx24 = (...parts) => parts.filter(Boolean).join(" ");
var Divider = forwardRef(function Divider2({ orientation = "horizontal", className, children, ...rest }, ref) {
  const labelled = orientation === "horizontal" && children != null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "separator",
      "aria-orientation": orientation,
      className: cx24(
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
var cx25 = (...parts) => parts.filter(Boolean).join(" ");
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
  return /* @__PURE__ */ jsx(TabsContext.Provider, { value: { value: current, setValue, baseId }, children: /* @__PURE__ */ jsx("div", { className: cx25("Tenet-Tabs", className), children }) });
}
function TabsList({ className, children, ...rest }) {
  const { setValue } = useTabs("List");
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
    const target = tabs[next];
    if (!target) return;
    target.focus();
    const v = target.dataset.value;
    if (v != null) setValue(v);
  };
  return /* @__PURE__ */ jsx("div", { role: "tablist", className: cx25("Tenet-Tabs__list", className), onKeyDown, ...rest, children });
}
function Tab({ value, disabled = false, className, children, onClick, ...rest }) {
  const { value: active, setValue, baseId } = useTabs("Tab");
  const selected = active === value;
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      role: "tab",
      "data-value": value,
      id: `${baseId}-tab-${slug(value)}`,
      "aria-selected": selected,
      "aria-controls": `${baseId}-panel-${slug(value)}`,
      "aria-disabled": disabled || void 0,
      disabled,
      tabIndex: selected ? 0 : -1,
      className: cx25("Tenet-Tabs__tab", selected && "Tenet-Tabs__tab--selected", className),
      onClick: (e) => {
        onClick?.(e);
        if (!disabled) setValue(value);
      },
      ...rest,
      children
    }
  );
}
function TabPanel({ value, className, children, ...rest }) {
  const { value: active, baseId } = useTabs("Panel");
  if (active !== value) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "tabpanel",
      id: `${baseId}-panel-${slug(value)}`,
      "aria-labelledby": `${baseId}-tab-${slug(value)}`,
      tabIndex: 0,
      className: cx25("Tenet-Tabs__panel", className),
      ...rest,
      children
    }
  );
}
Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
var cx26 = (...parts) => parts.filter(Boolean).join(" ");
function Tooltip({ content, placement = "top", children, className }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const bubbleRef = useRef(null);
  const bubbleStyle = useAnchoredPosition({ open, anchorRef: triggerRef, floatingRef: bubbleRef, placement, gap: 8 });
  const child = children;
  const nodeEnv = globalThis.process?.env?.NODE_ENV;
  if (nodeEnv !== "production") {
    const type = child.type;
    const focusableTags = ["button", "a", "input", "select", "textarea"];
    const looksFocusable = typeof type === "string" && focusableTags.includes(type) || typeof type !== "string" || child.props?.tabIndex != null;
    if (typeof type === "string" && !looksFocusable) {
      console.warn(
        `Tooltip: trigger <${type}> is not focusable, so keyboard users can't reveal the tooltip. Use a focusable element (button/link/input) or add tabIndex={0}.`
      );
    }
  }
  const describedBy = [child.props["aria-describedby"], id].filter(Boolean).join(" ");
  const trigger = cloneElement(child, {
    "aria-describedby": describedBy,
    ref: mergeRefs(child.ref, (node) => {
      triggerRef.current = node;
    })
  });
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cx26("Tenet-Tooltip", className),
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      onFocus: () => setOpen(true),
      onBlur: () => setOpen(false),
      onKeyDown: (e) => e.key === "Escape" && setOpen(false),
      children: [
        trigger,
        /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(
          "span",
          {
            ref: bubbleRef,
            role: "tooltip",
            id,
            style: bubbleStyle,
            className: cx26("Tenet-Tooltip__bubble", open && "Tenet-Tooltip__bubble--open"),
            children: content
          }
        ) })
      ]
    }
  );
}
var cx27 = (...parts) => parts.filter(Boolean).join(" ");
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
    panel?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const backdrop = panel?.parentElement;
    const siblings = Array.from(document.body.children).filter(
      (el) => el !== backdrop && !el.hasAttribute("data-tenet-layer")
    );
    const prevHidden = siblings.map((el) => el.getAttribute("aria-hidden"));
    siblings.forEach((el) => el.setAttribute("aria-hidden", "true"));
    return () => {
      document.body.style.overflow = prevOverflow;
      siblings.forEach((el, i) => {
        const prev = prevHidden[i];
        if (prev === null) el.removeAttribute("aria-hidden");
        else el.setAttribute("aria-hidden", prev);
      });
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
    if (!active || !panel.contains(active)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && active === first) {
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
            className: cx27("Tenet-Dialog", `Tenet-Dialog--size-${size}`, className),
            onKeyDown,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "Tenet-Dialog__header", children: [
                /* @__PURE__ */ jsxs("div", { className: "Tenet-Dialog__headings", children: [
                  /* @__PURE__ */ jsx("h2", { id: titleId, className: "Tenet-Dialog__title", children: title }),
                  description && /* @__PURE__ */ jsx("p", { id: descId, className: "Tenet-Dialog__description", children: description })
                ] }),
                /* @__PURE__ */ jsx("button", { type: "button", className: "Tenet-Dialog__close", "aria-label": "Close", onClick: onClose, children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u2715" }) })
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
var cx28 = (...parts) => parts.filter(Boolean).join(" ");
var Breadcrumbs = forwardRef(function Breadcrumbs2({ items, separator = "/", className, "aria-label": ariaLabel = "Breadcrumb", ...rest }, ref) {
  return /* @__PURE__ */ jsx("nav", { ref, "aria-label": ariaLabel, className: cx28("Tenet-Breadcrumbs", className), ...rest, children: /* @__PURE__ */ jsx("ol", { className: "Tenet-Breadcrumbs__list", children: items.map((item, i) => {
    const isLast = i === items.length - 1;
    return /* @__PURE__ */ jsxs("li", { className: "Tenet-Breadcrumbs__item", children: [
      item.href && !isLast ? /* @__PURE__ */ jsx("a", { href: item.href, className: "Tenet-Breadcrumbs__link", children: item.label }) : /* @__PURE__ */ jsx("span", { className: "Tenet-Breadcrumbs__current", "aria-current": isLast ? "page" : void 0, children: item.label }),
      !isLast && /* @__PURE__ */ jsx("span", { className: "Tenet-Breadcrumbs__separator", "aria-hidden": "true", children: separator })
    ] }, i);
  }) }) });
});
var cx29 = (...parts) => parts.filter(Boolean).join(" ");
var ELLIPSIS = "ellipsis";
function pageItems(page, pageCount, siblingCount) {
  if (pageCount <= 1) return [1];
  const items = [1];
  const left = Math.max(2, page - siblingCount);
  const right = Math.min(pageCount - 1, page + siblingCount);
  if (left > 2) items.push(ELLIPSIS);
  for (let i = left; i <= right; i++) items.push(i);
  if (right < pageCount - 1) items.push(ELLIPSIS);
  items.push(pageCount);
  return items;
}
var Pagination = forwardRef(function Pagination2({ page, pageCount, onPageChange, siblingCount = 1, className, "aria-label": ariaLabel = "Pagination" }, ref) {
  const items = pageItems(page, pageCount, siblingCount);
  const go = (p) => {
    if (p >= 1 && p <= pageCount && p !== page) onPageChange(p);
  };
  return /* @__PURE__ */ jsx("nav", { ref, "aria-label": ariaLabel, className: cx29("Tenet-Pagination", className), children: /* @__PURE__ */ jsxs("ul", { className: "Tenet-Pagination__list", children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "Tenet-Pagination__btn Tenet-Pagination__btn--nav",
        onClick: () => go(page - 1),
        disabled: page <= 1,
        "aria-label": "Previous page",
        children: "\u2039"
      }
    ) }),
    items.map(
      (item, i) => item === ELLIPSIS ? /* @__PURE__ */ jsx("li", { className: "Tenet-Pagination__ellipsis", "aria-hidden": "true", children: "\u2026" }, `e${i}`) : /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: cx29("Tenet-Pagination__btn", item === page && "Tenet-Pagination__btn--current"),
          onClick: () => go(item),
          "aria-current": item === page ? "page" : void 0,
          "aria-label": `Page ${item}`,
          children: item
        }
      ) }, item)
    ),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "Tenet-Pagination__btn Tenet-Pagination__btn--nav",
        onClick: () => go(page + 1),
        disabled: page >= pageCount,
        "aria-label": "Next page",
        children: "\u203A"
      }
    ) })
  ] }) });
});
var cx30 = (...parts) => parts.filter(Boolean).join(" ");
var AccordionContext = createContext(null);
var useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion.Item must be used inside <Accordion>");
  return ctx;
};
var slug2 = (v) => v.replace(/[^a-zA-Z0-9_-]/g, "_");
function Accordion({
  type = "single",
  value,
  defaultValue,
  onValueChange,
  className,
  children
}) {
  const baseId = useId();
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState(defaultValue ?? []);
  const open = isControlled ? value : internal;
  const toggle = (v) => {
    let next;
    if (open.includes(v)) next = open.filter((x) => x !== v);
    else next = type === "single" ? [v] : [...open, v];
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };
  return /* @__PURE__ */ jsx(AccordionContext.Provider, { value: { open, toggle, type, baseId }, children: /* @__PURE__ */ jsx("div", { className: cx30("Tenet-Accordion", className), children }) });
}
function AccordionItem({ value, title, disabled = false, className, children }) {
  const { open, toggle, baseId } = useAccordion();
  const expanded = open.includes(value);
  const headerId = `${baseId}-h-${slug2(value)}`;
  const panelId = `${baseId}-p-${slug2(value)}`;
  const onKeyDown = (e) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const root = e.currentTarget.closest(".Tenet-Accordion");
    if (!root) return;
    const headers = Array.from(
      root.querySelectorAll(".Tenet-Accordion__trigger:not([disabled])")
    );
    if (headers.length === 0) return;
    e.preventDefault();
    const idx = headers.indexOf(e.currentTarget);
    let next = idx;
    if (e.key === "ArrowDown") next = (idx + 1) % headers.length;
    else if (e.key === "ArrowUp") next = (idx - 1 + headers.length) % headers.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = headers.length - 1;
    headers[next]?.focus();
  };
  return /* @__PURE__ */ jsxs("div", { className: cx30("Tenet-Accordion__item", className), children: [
    /* @__PURE__ */ jsx("h3", { className: "Tenet-Accordion__heading", children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        id: headerId,
        className: "Tenet-Accordion__trigger",
        "aria-expanded": expanded,
        "aria-controls": panelId,
        disabled,
        onClick: () => toggle(value),
        onKeyDown,
        children: [
          /* @__PURE__ */ jsx("span", { className: "Tenet-Accordion__title", children: title }),
          /* @__PURE__ */ jsx("span", { className: "Tenet-Accordion__chevron", "aria-hidden": "true", children: "\u203A" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        role: "region",
        id: panelId,
        "aria-labelledby": headerId,
        className: "Tenet-Accordion__panel",
        hidden: !expanded,
        children: /* @__PURE__ */ jsx("div", { className: "Tenet-Accordion__content", children })
      }
    )
  ] });
}
Accordion.Item = AccordionItem;
var cx31 = (...parts) => parts.filter(Boolean).join(" ");
var SegmentedControl = forwardRef(function SegmentedControl2({ options, value, defaultValue, onChange, size = "medium", fullWidth, block, className, "aria-label": ariaLabel, ...rest }, ref) {
  const isFullWidth = resolveFullWidth("SegmentedControl", fullWidth, block);
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState(defaultValue ?? options.find((o) => !o.disabled)?.value ?? "");
  const current = isControlled ? value : internal;
  const select = (v) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };
  const focusValue = options.some((o) => o.value === current) ? current : options.find((o) => !o.disabled)?.value;
  const onKeyDown = (e) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const enabled = options.filter((o) => !o.disabled);
    if (enabled.length === 0) return;
    e.preventDefault();
    const idx = enabled.findIndex((o) => o.value === current);
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1 + enabled.length) % enabled.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + enabled.length) % enabled.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = enabled.length - 1;
    const target = enabled[next];
    if (!target) return;
    select(target.value);
    e.currentTarget.querySelector(`[data-value="${CSS.escape(target.value)}"]`)?.focus();
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      ref,
      role: "radiogroup",
      "aria-label": ariaLabel,
      className: cx31(
        "Tenet-SegmentedControl",
        `Tenet-SegmentedControl--size-${size}`,
        isFullWidth && "Tenet-SegmentedControl--fullWidth",
        className
      ),
      onKeyDown,
      children: options.map((opt) => {
        const selected = opt.value === current;
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            role: "radio",
            "data-value": opt.value,
            "aria-checked": selected,
            disabled: opt.disabled,
            tabIndex: opt.value === focusValue ? 0 : -1,
            className: cx31("Tenet-SegmentedControl__segment", selected && "Tenet-SegmentedControl__segment--selected"),
            onClick: () => !opt.disabled && select(opt.value),
            children: opt.label
          },
          opt.value
        );
      })
    }
  );
});
var cx32 = (...parts) => parts.filter(Boolean).join(" ");
var isAction = (item) => item.type !== "separator";
function nextEnabled2(items, from, dir) {
  const n = items.length;
  for (let step = 1; step <= n; step++) {
    const i = (from + dir * step + n * step) % n;
    const item = items[i];
    if (isAction(item) && !item.disabled) return i;
  }
  return from;
}
var firstEnabled2 = (items) => items.findIndex((it) => isAction(it) && !it.disabled);
function Menu({ trigger, items, "aria-label": ariaLabel, align = "start", className }) {
  const reactId = useId();
  const menuId = `${reactId}-menu`;
  const triggerId = `${reactId}-trigger`;
  const itemId = (i) => `${reactId}-item-${i}`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const listStyle = useAnchoredPosition({
    open,
    anchorRef: triggerRef,
    floatingRef: listRef,
    placement: align === "end" ? "bottom-end" : "bottom-start"
  });
  const openMenu = useCallback(() => {
    setActive(firstEnabled2(items));
    setOpen(true);
  }, [items]);
  const closeMenu = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.querySelector(`#${CSS.escape(itemId(active))}`)?.focus();
  }, [open, active]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const t = e.target;
      if (!wrapRef.current?.contains(t) && !listRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  const choose = (i) => {
    const item = items[i];
    if (item && isAction(item) && !item.disabled) {
      item.onSelect();
      closeMenu();
    }
  };
  const onListKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => nextEnabled2(items, a, 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => nextEnabled2(items, a, -1));
        break;
      case "Home":
        e.preventDefault();
        setActive(firstEnabled2(items));
        break;
      case "End":
        e.preventDefault();
        setActive(nextEnabled2(items, firstEnabled2(items), -1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (active >= 0) choose(active);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Tab":
        closeMenu(false);
        break;
    }
  };
  const triggerNode = trigger;
  const triggerProps = triggerNode.props;
  const callerClick = triggerProps.onClick;
  const callerKeyDown = triggerProps.onKeyDown;
  const triggerEl = cloneElement(triggerNode, {
    id: triggerId,
    ref: mergeRefs(triggerNode.ref, (node) => {
      triggerRef.current = node;
    }),
    "aria-haspopup": "menu",
    "aria-expanded": open,
    "aria-controls": open ? menuId : void 0,
    onClick: (e) => {
      callerClick?.(e);
      if (open) closeMenu(false);
      else openMenu();
    },
    onKeyDown: (e) => {
      callerKeyDown?.(e);
      if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        openMenu();
      }
    }
  });
  return /* @__PURE__ */ jsxs("span", { ref: wrapRef, className: cx32("Tenet-Menu", className), children: [
    triggerEl,
    open && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(
      "ul",
      {
        ref: listRef,
        id: menuId,
        role: "menu",
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabel ? void 0 : triggerId,
        className: cx32("Tenet-Menu__list", `Tenet-Menu__list--align-${align}`),
        style: listStyle,
        onKeyDown: onListKeyDown,
        children: items.map(
          (item, i) => isAction(item) ? /* @__PURE__ */ jsx("li", { role: "none", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              id: itemId(i),
              role: "menuitem",
              tabIndex: i === active ? 0 : -1,
              disabled: item.disabled,
              className: cx32(
                "Tenet-Menu__item",
                item.destructive && "Tenet-Menu__item--destructive"
              ),
              onClick: () => choose(i),
              onMouseEnter: () => setActive(i),
              children: [
                item.icon && /* @__PURE__ */ jsx("span", { className: "Tenet-Menu__icon", "aria-hidden": "true", children: item.icon }),
                /* @__PURE__ */ jsx("span", { className: "Tenet-Menu__label", children: item.label })
              ]
            }
          ) }, i) : /* @__PURE__ */ jsx("li", { role: "separator", className: "Tenet-Menu__separator" }, i)
        )
      }
    ) })
  ] });
}
var cx33 = (...parts) => parts.filter(Boolean).join(" ");
var DEFAULT_ICON2 = { info: "\u2139", success: "\u2713", warning: "!", danger: "\u2715" };
var ToastContext = createContext(null);
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside a <ToastProvider>");
  return ctx;
}
function ToastItem({
  toast,
  onDismiss,
  defaultDuration
}) {
  const variant = toast.variant ?? "info";
  const duration = toast.duration ?? defaultDuration;
  useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(t);
  }, [toast.id, duration, onDismiss]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: variant === "danger" ? "alert" : "status",
      className: cx33("Tenet-Toast", `Tenet-Toast--variant-${variant}`),
      children: [
        /* @__PURE__ */ jsx("span", { className: "Tenet-Toast__icon", "aria-hidden": "true", children: DEFAULT_ICON2[variant] }),
        /* @__PURE__ */ jsxs("div", { className: "Tenet-Toast__content", children: [
          toast.title && /* @__PURE__ */ jsx("p", { className: "Tenet-Toast__title", children: toast.title }),
          /* @__PURE__ */ jsx("div", { className: "Tenet-Toast__message", children: toast.message })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "Tenet-Toast__dismiss",
            "aria-label": "Dismiss",
            onClick: () => onDismiss(toast.id),
            children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u2715" })
          }
        )
      ]
    }
  );
}
function ToastProvider({ duration = 5e3, placement = "bottom-right", children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);
  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);
  const toast = useCallback((options) => {
    idRef.current += 1;
    const id = String(idRef.current);
    setToasts((list) => [...list, { ...options, id }]);
    return id;
  }, []);
  const canPortal = typeof document !== "undefined";
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { toast, dismiss }, children: [
    children,
    canPortal && createPortal(
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cx33("Tenet-Toast__viewport", `Tenet-Toast__viewport--${placement}`),
          role: "region",
          "aria-label": "Notifications",
          "data-tenet-layer": "toast",
          children: toasts.map((t) => /* @__PURE__ */ jsx(ToastItem, { toast: t, onDismiss: dismiss, defaultDuration: duration }, t.id))
        }
      ),
      document.body
    )
  ] });
}
var cx34 = (...parts) => parts.filter(Boolean).join(" ");
var IconButton = forwardRef(function IconButton2({
  icon,
  variant = "default",
  size = "medium",
  type = "button",
  className,
  ...rest
}, ref) {
  const nodeEnv = globalThis.process?.env?.NODE_ENV;
  if (nodeEnv !== "production") {
    const hasName = Boolean(rest["aria-label"] || rest["aria-labelledby"]);
    if (!hasName) {
      console.warn(
        "IconButton: no accessible name. An icon-only button needs aria-label (or aria-labelledby) so screen-reader users know what it does."
      );
    }
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type,
      className: cx34(
        "Tenet-IconButton",
        `Tenet-IconButton--variant-${variant}`,
        `Tenet-IconButton--size-${size}`,
        className
      ),
      ...rest,
      children: /* @__PURE__ */ jsx("span", { className: "Tenet-IconButton__icon", "aria-hidden": "true", children: icon })
    }
  );
});
var cx35 = (...parts) => parts.filter(Boolean).join(" ");
var Icon = forwardRef(function Icon2({ size = 16, label, className, children, ...rest }, ref) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true, focusable: "false" };
  return /* @__PURE__ */ jsx(
    "svg",
    {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: cx35("Tenet-Icon", `Tenet-Icon--size-${size}`, className),
      ...a11y,
      ...rest,
      children
    }
  );
});
var cx36 = (...parts) => parts.filter(Boolean).join(" ");
var Tag = forwardRef(function Tag2({ variant = "default", size = "medium", leadingIcon, onRemove, removeLabel, className, children, ...rest }, ref) {
  const label = typeof children === "string" && children.length > 0 ? children : removeLabel && removeLabel.length > 0 ? removeLabel : "Remove";
  const removeAriaLabel = removeLabel && removeLabel.length > 0 ? removeLabel : `Remove ${label}`;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref,
      className: cx36(
        "Tenet-Tag",
        `Tenet-Tag--variant-${variant}`,
        `Tenet-Tag--size-${size}`,
        onRemove && "Tenet-Tag--removable",
        className
      ),
      ...rest,
      children: [
        leadingIcon != null && /* @__PURE__ */ jsx("span", { className: "Tenet-Tag__icon", "aria-hidden": "true", children: leadingIcon }),
        /* @__PURE__ */ jsx("span", { className: "Tenet-Tag__label", children }),
        onRemove && /* @__PURE__ */ jsx("button", { type: "button", className: "Tenet-Tag__remove", "aria-label": removeAriaLabel, onClick: onRemove, children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u2715" }) })
      ]
    }
  );
});
var cx37 = (...parts) => parts.filter(Boolean).join(" ");
var toDimension = (value) => typeof value === "number" ? `${value}px` : value;
var Skeleton = forwardRef(function Skeleton2({ variant = "text", width, height, radius, className, style, ...rest }, ref) {
  const isCircle = variant === "circle";
  const w = toDimension(width);
  const h = toDimension(height);
  const inlineStyle = {
    ...style,
    ...w !== void 0 ? { width: w } : null,
    // A circle stays square: height follows width unless explicitly overridden.
    ...h !== void 0 ? { height: h } : isCircle && w !== void 0 ? { height: w } : null
  };
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      "aria-hidden": "true",
      className: cx37(
        "Tenet-Skeleton",
        `Tenet-Skeleton--variant-${variant}`,
        radius && `Tenet-Skeleton--radius-${radius}`,
        className
      ),
      style: inlineStyle,
      ...rest
    }
  );
});
var cx38 = (...parts) => parts.filter(Boolean).join(" ");
var clamp3 = (n, min, max) => Math.min(Math.max(n, min), max);
var ProgressBar = forwardRef(function ProgressBar2({ value, max = 100, size = "medium", variant = "accent", className, style, ...rest }, ref) {
  const isIndeterminate = value === void 0;
  const safeMax = max > 0 ? max : 100;
  const clamped = isIndeterminate ? void 0 : clamp3(value, 0, safeMax);
  const percent = clamped === void 0 ? void 0 : Math.round(clamped / safeMax * 100);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": safeMax,
      "aria-valuenow": isIndeterminate ? void 0 : clamped,
      "aria-valuetext": isIndeterminate ? void 0 : `${percent}%`,
      className: cx38(
        "Tenet-ProgressBar",
        `Tenet-ProgressBar--size-${size}`,
        `Tenet-ProgressBar--variant-${variant}`,
        isIndeterminate && "Tenet-ProgressBar--indeterminate",
        className
      ),
      style,
      ...rest,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "Tenet-ProgressBar__fill",
          style: isIndeterminate ? void 0 : { width: `${percent}%` }
        }
      )
    }
  );
});
var cx39 = (...parts) => parts.filter(Boolean).join(" ");
var Link = forwardRef(function Link2({ muted = false, underline = "hover", external = false, className, children, ...rest }, ref) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return /* @__PURE__ */ jsxs(
    "a",
    {
      ref,
      className: cx39(
        "Tenet-Link",
        muted && "Tenet-Link--muted",
        `Tenet-Link--underline-${underline}`,
        className
      ),
      ...externalProps,
      ...rest,
      children: [
        children,
        external && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "Tenet-Link__externalIcon", "aria-hidden": "true", children: "\u2197" }),
          /* @__PURE__ */ jsx("span", { className: "Tenet-visuallyHidden", children: " (opens in new tab)" })
        ] })
      ]
    }
  );
});
var cx40 = (...parts) => parts.filter(Boolean).join(" ");
var FOCUSABLE2 = 'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
function Popover({
  trigger,
  children,
  placement = "bottom-start",
  "aria-label": ariaLabel,
  className
}) {
  const reactId = useId();
  const dialogId = `${reactId}-dialog`;
  const triggerId = `${reactId}-trigger`;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const surfaceRef = useRef(null);
  const surfaceStyle = useAnchoredPosition({ open, anchorRef: triggerRef, floatingRef: surfaceRef, placement });
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const t = e.target;
      if (!wrapRef.current?.contains(t) && !surfaceRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const surface = surfaceRef.current;
    const first = surface?.querySelector(FOCUSABLE2);
    (first ?? surface)?.focus();
  }, [open]);
  const triggerNode = trigger;
  const callerClick = triggerNode.props.onClick;
  const triggerEl = cloneElement(triggerNode, {
    id: triggerId,
    ref: mergeRefs(triggerNode.ref, (node) => {
      triggerRef.current = node;
    }),
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": open ? dialogId : void 0,
    onClick: (e) => {
      callerClick?.(e);
      setOpen((o) => !o);
    }
  });
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref: wrapRef,
      className: cx40("Tenet-Popover", className),
      onKeyDown: (e) => {
        if (e.key === "Escape" && open) {
          e.preventDefault();
          close();
        }
      },
      onBlur: (e) => {
        const rt = e.relatedTarget;
        if (open && !wrapRef.current?.contains(rt) && !surfaceRef.current?.contains(rt)) setOpen(false);
      },
      children: [
        triggerEl,
        open && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(
          "div",
          {
            ref: surfaceRef,
            id: dialogId,
            role: "dialog",
            "aria-modal": "false",
            "aria-label": ariaLabel ?? "Popover",
            tabIndex: -1,
            style: surfaceStyle,
            className: cx40("Tenet-Popover__surface", `Tenet-Popover--placement-${placement}`),
            children
          }
        ) })
      ]
    }
  );
}
var cx41 = (...parts) => parts.filter(Boolean).join(" ");
var EmptyState = forwardRef(function EmptyState2({ title, description, icon, action, secondaryAction, size = "medium", headingLevel = 3, className, ...rest }, ref) {
  const hasActions = Boolean(action || secondaryAction);
  return /* @__PURE__ */ jsxs(
    Stack2,
    {
      ref,
      align: "center",
      gap: size === "large" ? "spacious" : "normal",
      className: cx41("Tenet-EmptyState", `Tenet-EmptyState--size-${size}`, className),
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: "Tenet-EmptyState__icon", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsxs(Stack2, { align: "center", gap: "condensed", className: "Tenet-EmptyState__body", children: [
          /* @__PURE__ */ jsx(Heading, { level: size === "large" ? 2 : 3, as: `h${headingLevel}`, className: "Tenet-EmptyState__title", children: title }),
          description && /* @__PURE__ */ jsx(
            Text,
            {
              tone: "muted",
              size: size === "large" ? "large" : "medium",
              align: "center",
              className: "Tenet-EmptyState__description",
              children: description
            }
          )
        ] }),
        hasActions && /* @__PURE__ */ jsxs(Stack2, { direction: "horizontal", gap: "condensed", justify: "center", align: "center", wrap: true, className: "Tenet-EmptyState__actions", children: [
          action,
          secondaryAction
        ] })
      ]
    }
  );
});

export { Accordion, Avatar, Badge, Banner, Breadcrumbs, Button, Calendar, Card, Checkbox, DataTable, DatePicker, Dialog, Divider, EmptyState, FormControl2 as FormControl, Grid2 as Grid, Heading, Icon, IconButton, Label, Link, Menu, NumberInput, Pagination, Popover, ProgressBar, Radio, RadioGroup, SegmentedControl, Select, Skeleton, Spinner, Stack2 as Stack, Switch, Table2 as Table, Tabs, Tag, Text, TextInput, Textarea, ToastProvider, Tooltip, useToast };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map