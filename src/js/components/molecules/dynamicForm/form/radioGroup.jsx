import React from "react";
import FormFieldErrorMessage from "../formFieldErrorMessage";
import { useTranslation } from "react-i18next";

const RadioGroup = ({
  register,
  watch,
  validation,
  errors,
  setValue,
  name,
  options,
  initialValue,
  fieldProps = {
    material: true,
    disabled: false,
    className: "",
    readOnly: false,
    onChange: null,
    getLabel: null
  },
  readOnly
}) => {
  const { material, disabled, className, onChange, getLabel } = fieldProps;
  const validationObject =
    validation && validation.watchValidate
      ? validation.watchValidate(watch)
      : validation;
  const { t } = useTranslation();

  return (
    <div
      className={`form-field  ${className ? `form-field--${className}` : ""} ${
        material ? "form-field--material" : ""
      }`}
    >
      <div className="radio-group">
        {options &&
          options.map(option => (
            <div key={option.id} className="radio-group__item">
              <input
                ref={register(validationObject)}
                type="radio"
                name={name}
                value={option.value}
                defaultChecked={initialValue === option.value}
                id={`${name}-${option.id}`}
                className="form-field__checkbox__input"
                disabled={readOnly || fieldProps.readOnly || disabled}
                onChange={
                  onChange ? e => onChange(e.target.value, setValue) : null
                }
              />
              <label
                className="form-field__checkbox__label"
                htmlFor={`${name}-${option.id}`}
              >
                <span className="form-field__checkbox__label__span">
                  {getLabel ? getLabel(option) : t(option.label)}
                </span>
              </label>
            </div>
          ))}
      </div>
      {errors && errors[name] && (
        <FormFieldErrorMessage
          message={t(errors[name].message)}
        ></FormFieldErrorMessage>
      )}
    </div>
  );
};

export default RadioGroup;
