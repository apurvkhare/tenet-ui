import { forwardRef, useId, Children, isValidElement, cloneElement, createContext, useContext } from 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

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
        "Acme-Button",
        `Acme-Button--variant-${variant}`,
        `Acme-Button--size-${size}`,
        block && "Acme-Button--block",
        className
      ),
      ...rest,
      children: [
        leadingIcon && /* @__PURE__ */ jsx("span", { className: "Acme-Button__icon", "aria-hidden": "true", children: leadingIcon }),
        children && /* @__PURE__ */ jsx("span", { className: "Acme-Button__label", children }),
        trailingIcon && /* @__PURE__ */ jsx("span", { className: "Acme-Button__icon", "aria-hidden": "true", children: trailingIcon })
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
        "Acme-Stack",
        `Acme-Stack--direction-${direction}`,
        `Acme-Stack--gap-${gap}`,
        align && `Acme-Stack--align-${align}`,
        justify && `Acme-Stack--justify-${justify}`,
        wrap && "Acme-Stack--wrap",
        padding && `Acme-Stack--padding-${padding}`,
        className
      ),
      ...rest,
      children
    }
  );
});
var StackItem = forwardRef(function StackItem2({ grow = false, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { ref, className: cx2("Acme-Stack__item", grow && "Acme-Stack__item--grow", className), ...rest, children });
});
var Stack2 = Object.assign(StackRoot, { Item: StackItem });
var cx3 = (...parts) => parts.filter(Boolean).join(" ");
var Card = forwardRef(function Card2({ variant = "default", padding = "normal", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx3("Acme-Card", `Acme-Card--variant-${variant}`, `Acme-Card--padding-${padding}`, className),
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
        "Acme-TextInput",
        `Acme-TextInput--size-${size}`,
        block && "Acme-TextInput--block",
        invalid && "Acme-TextInput--invalid",
        disabled && "Acme-TextInput--disabled",
        className
      ),
      children: [
        leadingVisual && /* @__PURE__ */ jsx("span", { className: "Acme-TextInput__visual", "aria-hidden": "true", children: leadingVisual }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            className: "Acme-TextInput__input",
            disabled,
            "aria-invalid": invalid || void 0,
            ...rest
          }
        ),
        trailingVisual && /* @__PURE__ */ jsx("span", { className: "Acme-TextInput__visual", "aria-hidden": "true", children: trailingVisual })
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
      className: cx5("Acme-Label", `Acme-Label--variant-${variant}`, `Acme-Label--size-${size}`, className),
      ...rest,
      children
    }
  );
});
var cx6 = (...parts) => parts.filter(Boolean).join(" ");
var sortGlyph = { ascending: "\u25B2", descending: "\u25BC", none: "\u2195" };
var TableRoot = forwardRef(function Table({ density = "normal", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("table", { ref, className: cx6("Acme-Table", `Acme-Table--density-${density}`, className), ...rest, children });
});
var Container = forwardRef(function TableContainer({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { ref, className: cx6("Acme-Table__container", className), ...rest, children });
});
var Title = forwardRef(function TableTitle({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("h2", { ref, className: cx6("Acme-Table__title", className), ...rest, children });
});
var Subtitle = forwardRef(function TableSubtitle({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("p", { ref, className: cx6("Acme-Table__subtitle", className), ...rest, children });
});
var Actions = forwardRef(function TableActions({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("div", { ref, className: cx6("Acme-Table__actions", className), ...rest, children });
});
var Head = forwardRef(function TableHead({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("thead", { ref, className: cx6("Acme-Table__head", className), ...rest, children });
});
var Body = forwardRef(function TableBody({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("tbody", { ref, className: cx6("Acme-Table__body", className), ...rest, children });
});
var Row = forwardRef(function TableRow({ className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("tr", { ref, className: cx6("Acme-Table__row", className), ...rest, children });
});
var Header = forwardRef(function TableHeader({ align = "start", sortDirection, scope = "col", className, children, ...rest }, ref) {
  const sortable = sortDirection !== void 0;
  return /* @__PURE__ */ jsxs(
    "th",
    {
      ref,
      scope,
      "aria-sort": sortable ? sortDirection : void 0,
      className: cx6("Acme-Table__header", `Acme-Table__cell--align-${align}`, sortable && "Acme-Table__header--sortable", className),
      ...rest,
      children: [
        children,
        sortable && /* @__PURE__ */ jsx("span", { className: "Acme-Table__sort", "aria-hidden": "true", children: sortGlyph[sortDirection] })
      ]
    }
  );
});
var Cell = forwardRef(function TableCell({ align = "start", className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("td", { ref, className: cx6("Acme-Table__cell", `Acme-Table__cell--align-${align}`, className), ...rest, children });
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
  return /* @__PURE__ */ jsxs("label", { className: cx7("Acme-FormControl__label", visuallyHidden && "Acme-visuallyHidden", className), ...rest, children: [
    children,
    required && /* @__PURE__ */ jsxs("span", { className: "Acme-FormControl__required", "aria-hidden": "true", children: [
      " ",
      "*"
    ] })
  ] });
}
function Caption({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx("span", { className: cx7("Acme-FormControl__caption", className), ...rest, children });
}
function Validation({ variant = "error", className, children, ...rest }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      role: variant === "error" ? "alert" : void 0,
      className: cx7("Acme-FormControl__validation", `Acme-FormControl__validation--${variant}`, className),
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
  return /* @__PURE__ */ jsx("div", { ref, className: cx7("Acme-FormControl", className), ...rest, children: mapped });
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
        "Acme-Textarea",
        block && "Acme-Textarea--block",
        invalid && "Acme-Textarea--invalid",
        `Acme-Textarea--resize-${resize}`,
        className
      ),
      ...rest
    }
  );
});
var cx9 = (...parts) => parts.filter(Boolean).join(" ");
var Select = forwardRef(function Select2({ size = "medium", block = false, invalid = false, placeholder, disabled, className, children, defaultValue, value, ...rest }, ref) {
  const uncontrolledDefault = value === void 0 && defaultValue === void 0 && placeholder ? "" : defaultValue;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cx9(
        "Acme-Select",
        `Acme-Select--size-${size}`,
        block && "Acme-Select--block",
        invalid && "Acme-Select--invalid",
        disabled && "Acme-Select--disabled",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "select",
          {
            ref,
            className: "Acme-Select__input",
            disabled,
            "aria-invalid": invalid || void 0,
            value,
            defaultValue: uncontrolledDefault,
            ...rest,
            children: [
              placeholder && /* @__PURE__ */ jsx("option", { value: "", disabled: true, hidden: true, children: placeholder }),
              children
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "Acme-Select__caret", "aria-hidden": "true", children: "\u25BE" })
      ]
    }
  );
});
var cx10 = (...parts) => parts.filter(Boolean).join(" ");
var Checkbox = forwardRef(function Checkbox2({ label, caption, id, className, disabled, ...rest }, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : void 0;
  return /* @__PURE__ */ jsxs("span", { className: cx10("Acme-Checkbox", disabled && "Acme-Checkbox--disabled", className), children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        id: inputId,
        type: "checkbox",
        className: "Acme-Checkbox__input",
        disabled,
        "aria-describedby": captionId,
        ...rest
      }
    ),
    label && /* @__PURE__ */ jsxs("span", { className: "Acme-Checkbox__text", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: inputId, className: "Acme-Checkbox__label", children: label }),
      caption && /* @__PURE__ */ jsx("span", { id: captionId, className: "Acme-Checkbox__caption", children: caption })
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
  return /* @__PURE__ */ jsxs("span", { className: cx11("Acme-Radio", resolvedDisabled && "Acme-Radio--disabled", className), children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        id: inputId,
        type: "radio",
        className: "Acme-Radio__input",
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
    label && /* @__PURE__ */ jsxs("span", { className: "Acme-Radio__text", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: inputId, className: "Acme-Radio__label", children: label }),
      caption && /* @__PURE__ */ jsx("span", { id: captionId, className: "Acme-Radio__caption", children: caption })
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
      className: cx11("Acme-RadioGroup", className),
      "aria-describedby": captionId,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs("legend", { className: "Acme-RadioGroup__legend", children: [
          label,
          required && /* @__PURE__ */ jsxs("span", { className: "Acme-RadioGroup__required", "aria-hidden": "true", children: [
            " ",
            "*"
          ] })
        ] }),
        caption && /* @__PURE__ */ jsx("span", { id: captionId, className: "Acme-RadioGroup__caption", children: caption }),
        /* @__PURE__ */ jsx("div", { className: "Acme-RadioGroup__options", children: /* @__PURE__ */ jsx(RadioGroupContext.Provider, { value: { name: groupName, value, defaultValue, disabled, onChange }, children }) })
      ]
    }
  );
});

export { Button, Card, Checkbox, FormControl2 as FormControl, Label, Radio, RadioGroup, Select, Stack2 as Stack, Table2 as Table, TextInput, Textarea };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map