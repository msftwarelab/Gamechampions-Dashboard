import React from "react";
import FormFieldErrorMessage from "../formFieldErrorMessage";
import { useTranslation } from "react-i18next";

const CheckBox = ({
  register,
  watch,
  validation,
  errors,
  name,
  initialValue,
  fieldProps = {
    material: true,
    disabled: false,
    label: "",
    readOnly: false,
    className: ""
  },
  readOnly
}) => {
  const { material, disabled, label, onClick, className, child } = fieldProps;
  const validationObject =
    validation && validation.watchValidate
      ? validation.watchValidate(watch)
      : validation;
  const { t } = useTranslation();

  return (
    <div
      className={`form-field ${className ? `form-field--${className}` : ""} ${
        material ? "form-field--material" : ""
      }`}
    >
      <div className="form-field__checkbox checkbox">
        <input
          ref={register(validationObject)}
          type="checkbox"
          name={name}
          defaultChecked={initialValue}
          id={name}
          className="form-field__checkbox__input"
          disabled={readOnly || fieldProps.readOnly || disabled}
          onClick={
            onClick ? e => onClick(e.target.value, e.target.checked) : null
          }
        />
        <label className="form-field__checkbox__label" htmlFor={name}>
          <span className="form-field__checkbox__label__span">
            {child ? child() : t(label)}
          </span>
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

export default CheckBox;
