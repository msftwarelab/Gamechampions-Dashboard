import React from "react";
import FormFieldErrorMessage from "../formFieldErrorMessage";
import { useTranslation } from "react-i18next";
import ChevronDown from "./chevronDown";

const DropDown = ({
  register,
  watch,
  errors,
  setValue,
  name,
  options,
  initialValue,
  fieldProps = {
    material: true,
    disabled: false,
    label: "",
    className: "",
    position: "",
    readOnly: false,
    onChange: null
  },
  validation,
  readOnly
}) => {
  const {
    material,
    disabled,
    label,
    className,
    onChange,
    position
  } = fieldProps;
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
      <div className="form-field__input-container">
        <select
          ref={register(validationObject)}
          name={name}
          dir={position}
          defaultValue={initialValue}
          className="form-field__input"
          disabled={readOnly || fieldProps.readOnly || disabled}
          onChange={onChange ? e => onChange(e.target.value, setValue) : null}
        >
          {label && material && (
            <option key="-1" value="" className="form-field__input">
              {t(label)}
            </option>
          )}
          {options &&
            options.map(n => {
              return (
                <option key={n.id} value={n.id} selected={n.selected}>
                  {n.title}
                </option>
              );
            })}
        </select>
        {label && !material && (
          <label className="form-field__label" htmlFor={name}>
            <span>{t(label)}</span>
          </label>
        )}
        <ChevronDown />
      </div>
      {errors && errors[name] && (
        <FormFieldErrorMessage
          message={t(errors[name].message)}
        ></FormFieldErrorMessage>
      )}
    </div>
  );
};

export default DropDown;
