import React, { useState, useEffect } from "react";
import moment from "moment";
import "react-dates/initialize";
import FormFieldErrorMessage from "../formFieldErrorMessage";
import { useTranslation } from "react-i18next";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";
import ChevronDown from "./chevronDown";

const DropdownDatePickerWrapper = ({
  register,
  watch,
  errors,
  name,
  setValue,
  initialValue,
  fieldProps = {
    material: true,
    label: "",
    className: "",
    readOnly: false,
    disabled: false
  },
  validation,
  readOnly
}) => {
  const { material, label, className, disabled } = fieldProps;
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [date, setDate] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    setValue(
      name,
      year !== undefined &&
        year !== "" &&
        year !== null &&
        year !== -1 &&
        year !== "-1" &&
        month !== undefined &&
        month !== "" &&
        month !== null &&
        month !== -1 &&
        month !== "-1" &&
        date !== undefined &&
        date !== "" &&
        date !== null &&
        date !== -1 &&
        date !== "-1"
        ? moment(new Date(year, month, date))
        : undefined
    );
  }, [year, month, date]);

  const validationObject =
    validation && validation.watchValidate
      ? validation.watchValidate(watch)
      : validation;

  useEffect(() => {
    register({ name }, validationObject);
  }, []);

  useEffect(() => {
    if (initialValue) {
      setYear(moment(initialValue).year());
      setMonth(moment(initialValue).month());
      setDate(moment(initialValue).date());
    }
  }, [initialValue]);

  return (
    <div
      className={`form-field ${className ? `form-field--${className}` : ""}
      ${errors && errors[name] ? " form-field--invalid" : ""}
      ${material ? "form-field--material" : ""}`}
    >
      <input
        type="hidden"
        value={moment(new Date(year, month, date))}
        name={name}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gap: "0.5rem"
        }}
      >
        <div
          className={`form-field__input-container ${
            readOnly || fieldProps.readOnly ? " form-field--disabled" : ""
          }`}
        >
          <DayPicker
            year={year}
            month={month}
            endYearGiven={true}
            disabled={readOnly || fieldProps.readOnly || disabled}
            value={date}
            onChange={setDate}
            id={"form-label-date"}
            name={"form-label-date"}
            classes={`form-field__input form-field__input__dropdown__datepicker ${
              date !== undefined &&
              date !== "" &&
              date !== null &&
              date !== -1 &&
              date !== "-1"
                ? "form-field__input--has-value"
                : ""
            }`}
            optionClasses={"form-field__input"}
          />
          {label && material && (
            <label
              className="form-field__label form-field__label__dropdown__datepicker"
              htmlFor={"FormLabelDate"}
            >
              <span>{t("FormLabelDate")}</span>
            </label>
          )}
          <ChevronDown />
        </div>
        <div
          className={`form-field__input-container ${
            readOnly || fieldProps.readOnly ? " form-field--disabled" : ""
          }`}
        >
          <MonthPicker
            numeric={true}
            year={year}
            endYearGiven={true}
            value={month}
            disabled={readOnly || fieldProps.readOnly || disabled}
            onChange={setMonth}
            id={"form-label-month"}
            name={"form-label-month"}
            classes={`form-field__input form-field__input__dropdown__datepicker ${
              month !== undefined &&
              month !== "" &&
              month !== null &&
              month !== -1 &&
              month !== "-1"
                ? "form-field__input--has-value"
                : ""
            }`}
            optionClasses={"form-field__input"}
          />
          {label && material && (
            <label
              className="form-field__label form-field__label__dropdown__datepicker"
              htmlFor={"FormLabelMonth"}
            >
              <span>{t("FormLabelMonth")}</span>
            </label>
          )}
          <ChevronDown />
        </div>
        <div
          className={`form-field__input-container ${
            readOnly || fieldProps.readOnly ? " form-field--disabled" : ""
          }`}
        >
          <YearPicker
            reverse={true}
            value={year}
            start={moment().year() - 50}
            end={moment().year()}
            disabled={readOnly || fieldProps.readOnly || disabled}
            onChange={setYear}
            id={"form-label-year"}
            name={"form-label-year"}
            classes={`form-field__input form-field__input__dropdown__datepicker ${
              year !== undefined &&
              year !== "" &&
              year !== null &&
              year !== -1 &&
              year !== "-1"
                ? "form-field__input--has-value"
                : ""
            }`}
            optionClasses={"form-field__input"}
          />
          {label && material && (
            <label
              className="form-field__label form-field__label__dropdown__datepicker"
              htmlFor={"FormLabelYear"}
            >
              <span>{t("FormLabelYear")}</span>
            </label>
          )}
          <ChevronDown />
        </div>
      </div>
      {errors && errors[name] && (
        <FormFieldErrorMessage
          message={t(errors[name].message)}
        ></FormFieldErrorMessage>
      )}
    </div>
  );
};

export default DropdownDatePickerWrapper;
