import { Children, cloneElement, forwardRef, isValidElement, useId } from 'react';
import type { ReactElement } from 'react';
import type {
  FormControlCaptionProps,
  FormControlLabelProps,
  FormControlProps,
  FormControlValidationProps,
} from './FormControl.types';
import './FormControl.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

/** Field label. Rendered by FormControl with `htmlFor` + required state wired automatically. */
function Label({ visuallyHidden = false, required = false, className, children, ...rest }: FormControlLabelProps) {
  return (
    <label className={cx('Tenet-FormControl__label', visuallyHidden && 'Tenet-visuallyHidden', className)} {...rest}>
      {children}
      {required && (
        <span className="Tenet-FormControl__required" aria-hidden="true">
          {' '}
          *
        </span>
      )}
    </label>
  );
}

/** Helper text below the field, associated via `aria-describedby`. */
function Caption({ className, children, ...rest }: FormControlCaptionProps) {
  return (
    <span className={cx('Tenet-FormControl__caption', className)} {...rest}>
      {children}
    </span>
  );
}

/** Validation message. `variant="error"` also flips the field to its invalid state. */
function Validation({ variant = 'error', className, children, ...rest }: FormControlValidationProps) {
  return (
    <span
      role={variant === 'error' ? 'alert' : undefined}
      className={cx('Tenet-FormControl__validation', `Tenet-FormControl__validation--${variant}`, className)}
      {...rest}
    >
      {children}
    </span>
  );
}

type AnyProps = Record<string, unknown>;
const propsOf = (el: ReactElement) => el.props as AnyProps;
const join = (...parts: Array<unknown>) => parts.filter(Boolean).join(' ') || undefined;

/**
 * Tenet form field wrapper. Wrap a `FormControl.Label`, a field (`TextInput`, `Textarea`,
 * `Select`), and optional `FormControl.Caption` / `FormControl.Validation`. It generates a
 * shared id and wires `htmlFor`, `aria-describedby`, `aria-invalid`, `required` and `disabled`
 * for you — so accessibility is correct by construction, not by remembering to do it.
 */
const FormControlRoot = forwardRef<HTMLDivElement, FormControlProps>(function FormControl(
  { id: idProp, required = false, disabled = false, invalid: invalidProp, className, children, ...rest },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const captionId = `${id}-caption`;
  const validationId = `${id}-validation`;

  let hasCaption = false;
  let hasValidation = false;
  let validationVariant: string | undefined;
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === Caption) hasCaption = true;
    if (child.type === Validation) {
      hasValidation = true;
      validationVariant = propsOf(child).variant as string | undefined;
    }
  });

  const invalid = invalidProp ?? validationVariant === 'error';
  const describedBy = join(hasCaption && captionId, hasValidation && validationId);

  const mapped = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const p = propsOf(child);
    if (child.type === Label) {
      return cloneElement(child as ReactElement<FormControlLabelProps>, {
        htmlFor: (p.htmlFor as string) ?? id,
        required: (p.required as boolean) ?? required,
      });
    }
    if (child.type === Caption) {
      return cloneElement(child as ReactElement<FormControlCaptionProps>, { id: (p.id as string) ?? captionId });
    }
    if (child.type === Validation) {
      return cloneElement(child as ReactElement<FormControlValidationProps>, {
        id: (p.id as string) ?? validationId,
      });
    }
    // Otherwise this is the field — inject id + a11y wiring (caller props win).
    return cloneElement(child as ReactElement<AnyProps>, {
      id: (p.id as string) ?? id,
      'aria-describedby': join(p['aria-describedby'], describedBy),
      invalid: (p.invalid as boolean) ?? (invalid || undefined),
      required: (p.required as boolean) ?? (required || undefined),
      disabled: (p.disabled as boolean) ?? (disabled || undefined),
    });
  });

  return (
    <div ref={ref} className={cx('Tenet-FormControl', className)} {...rest}>
      {mapped}
    </div>
  );
});

export const FormControl = Object.assign(FormControlRoot, { Label, Caption, Validation });
