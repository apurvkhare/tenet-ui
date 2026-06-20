import { createContext, forwardRef, useContext, useId } from 'react';
import type { ChangeEvent } from 'react';
import type { RadioGroupProps, RadioProps } from './Radio.types';
import './Radio.css';

const cx = (...parts: Array<string | false | undefined>): string => parts.filter(Boolean).join(' ');

interface RadioGroupContextValue {
  name: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/**
 * Acme radio. A real `<input type="radio">` tinted with the accent token. Use inside a
 * `RadioGroup`, which wires the shared `name` and selection for you.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, caption, id, name, checked, defaultChecked, disabled, onChange, className, ...rest },
  ref,
) {
  const ctx = useContext(RadioGroupContext);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const captionId = caption ? `${inputId}-caption` : undefined;

  const controlled = ctx?.value !== undefined;
  const resolvedChecked = controlled ? ctx?.value === value : checked;
  const resolvedDefault = !controlled
    ? ctx?.defaultValue !== undefined
      ? ctx.defaultValue === value
      : defaultChecked
    : undefined;
  const resolvedName = ctx?.name ?? name;
  const resolvedDisabled = disabled ?? ctx?.disabled;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    ctx?.onChange?.(value);
  };

  return (
    <span className={cx('Acme-Radio', resolvedDisabled && 'Acme-Radio--disabled', className)}>
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className="Acme-Radio__input"
        name={resolvedName}
        value={value}
        checked={resolvedChecked}
        defaultChecked={resolvedDefault}
        disabled={resolvedDisabled}
        aria-describedby={captionId}
        onChange={handleChange}
        {...rest}
      />
      {label && (
        <span className="Acme-Radio__text">
          <label htmlFor={inputId} className="Acme-Radio__label">
            {label}
          </label>
          {caption && (
            <span id={captionId} className="Acme-Radio__caption">
              {caption}
            </span>
          )}
        </span>
      )}
    </span>
  );
});

/**
 * Acme radio group. Renders a `<fieldset>`/`<legend>` and shares `name` + selection with its
 * `Radio` children via context — so grouping and accessibility are correct without prop drilling.
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  { name, label, caption, value, defaultValue, onChange, required = false, disabled = false, className, children, ...rest },
  ref,
) {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const captionId = caption ? `${groupName}-caption` : undefined;

  return (
    <fieldset
      ref={ref}
      className={cx('Acme-RadioGroup', className)}
      aria-describedby={captionId}
      {...rest}
    >
      <legend className="Acme-RadioGroup__legend">
        {label}
        {required && (
          <span className="Acme-RadioGroup__required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </legend>
      {caption && (
        <span id={captionId} className="Acme-RadioGroup__caption">
          {caption}
        </span>
      )}
      <div className="Acme-RadioGroup__options">
        <RadioGroupContext.Provider value={{ name: groupName, value, defaultValue, disabled, onChange }}>
          {children}
        </RadioGroupContext.Provider>
      </div>
    </fieldset>
  );
});
