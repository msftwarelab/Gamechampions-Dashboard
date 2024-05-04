import React from "react";
import FormFieldErrorMessage from "../formFieldErrorMessage";
import { useTranslation } from "react-i18next";

const TextInput = props => {
  const {
    register,
    watch,
    errors,
    setValue,
    name,
    fieldProps = {
      type: "text",
      material: true,
      autoComplete: "off",
      min: undefined,
      max: undefined,
      maxLength: undefined,
      step: undefined,
      isAlwaysOpen: false,
      disabled: false,
      label: "",
      placeholder: "",
      className: "",
      align: "",
      border: false,
      readOnly: false,
      onChange: null,
      onKeydown: null,
      autoFocus: false,
      inputMode: false,
      inputPattern: "none"
    },
    validation,
    readOnly
  } = props;

  const {
    type,
    material,
    autoComplete,
    min,
    max,
    maxLength,
    autoFocus,
    step,
    isAlwaysOpen,
    disabled,
    label,
    placeholder,
    className,
    align,
    border,
    onChange,
    onKeydown,
    value
  } = fieldProps;
  const currentValue = name === "withdrawalAmount" ? value : watch(name);
  const validationObject =
    validation && validation.watchValidate
      ? validation.watchValidate(watch)
      : validation;
  const { t } = useTranslation();

  return (
    <div
      className={`form-field ${className ? `form-field--${className}` : ""}
        ${errors && errors[name] ? " form-field--invalid" : ""}
        ${material ? "form-field--material" : ""}`}
    >
      <div
        className={`form-field__input-container  ${
          className ? `form-field__input-container--${className}` : ""
        }`}
      >
        <input
          ref={register(validationObject)}
          type={type ? type : "text"}
          pattern={fieldProps.inputPattern}
          inputMode={fieldProps.inputMode ? fieldProps.inputMode : "text"}
          name={name}
          placeholder={t(placeholder)}
          className={`form-field__input ${
            className ? `form-field__input--${className}` : ""
          } ${
            currentValue || currentValue === 0
              ? "form-field__input--has-value"
              : ""
          } ${border ? "form-field__input--bordered" : ""} ${
            align ? `form-field__input--${align}` : ""
          }`}
          readOnly={readOnly || fieldProps.readOnly}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          min={min}
          max={max}
          value={currentValue}
          maxLength={maxLength}
          step={step}
          onChange={onChange ? e => onChange(e.target.value, setValue) : null}
          onKeyDown={onKeydown ? e => onKeydown(e, setValue) : null}
        />
        {label && (
          <label
            className={`form-field__label ${
              className ? `form-field__label--${className}` : ""
            } ${isAlwaysOpen ? "form-field__label--always-open" : ""}`}
            htmlFor={name}
          >
            <span>{t(label)}</span>
          </label>
        )}
      </div>
      {errors && errors[name] && (
        <FormFieldErrorMessage
          message={t(errors[name].message)}
        ></FormFieldErrorMessage>
      )}
    </div>
  );
};

export default TextInput;
