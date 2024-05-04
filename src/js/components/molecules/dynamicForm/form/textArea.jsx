import React, { useRef } from "react";
import FormFieldErrorMessage from "../formFieldErrorMessage";
import { useTranslation } from "react-i18next";

const TextArea = ({
  register,
  watch,
  errors,
  name,
  fieldProps = {
    material: true,
    rows: 2,
    autoComplete: "off",
    disabled: false,
    label: "",
    className: "",
    border: false,
    readOnly: false
  },
  validation,
  readOnly
}) => {
  const {
    material,
    rows,
    autoComplete,
    disabled,
    label,
    className,
    border
  } = fieldProps;
  const currentValue = watch(name);
  const labelRef = useRef(null);
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
        <textarea
          ref={register(validationObject)}
          name={name}
          className={`form-field__input ${
            className ? `form-field__input--${className}` : ""
          } ${
            currentValue || currentValue === 0
              ? "form-field__input--has-value"
              : ""
          } ${border ? "form-field__input--bordered" : ""}`}
          readOnly={readOnly || fieldProps.readOnly}
          disabled={disabled}
          autoComplete={autoComplete}
          rows={rows}
          onScroll={e => {
            if (e.currentTarget.scrollTop > 10) {
              labelRef.current.style.visibility = "hidden";
            } else {
              labelRef.current.style.visibility = "visible";
            }
          }}
        />
        <span className="bar" />
        <label ref={labelRef} className="form-field__label" htmlFor={name}>
          <span>{t(label)}</span>
        </label>
      </div>
      {errors && errors[name] && (
        <FormFieldErrorMessage
          message={t(errors[name].message)}
        ></FormFieldErrorMessage>
      )}
    </div>
  );
};

export default TextArea;
