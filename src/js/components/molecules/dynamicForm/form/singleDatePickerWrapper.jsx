import React, { useState, useEffect } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import FormFieldErrorMessage from "../formFieldErrorMessage";
import { useTranslation } from "react-i18next";
import { CalendarSelectMonth } from "~components/custom/calendarSelect/calendarSelectYear";
import { CalendarSelectYear } from "~components/custom/calendarSelect/calendarSelectMonth";
import { FlexBox } from "~components/atoms";

const SingleDatePickerWrapper = ({
  register,
  watch,
  errors,
  setValue,
  name,
  initialValue,
  fieldProps = {
    material: true,
    label: "",
    className: "",
    readOnly: false
  },
  validation,
  readOnly
}) => {
  const { material, label, className, onChange } = fieldProps;
  const [date, setDatePickerValue] = useState(
    initialValue ? moment(initialValue) : null
  );
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();
  const handleDateChange = selectedDate => {
    setValue(name, selectedDate);
    setDatePickerValue(selectedDate);
    onChange && onChange({ name, value: selectedDate });
  };

  const handleFocusChange = ({ focused }) => setIsFocused(focused);

  const validationObject =
    validation && validation.watchValidate
      ? validation.watchValidate(watch)
      : validation;

  useEffect(() => {
    register({ name }, validationObject);
  }, []);

  const returnYears = () => {
    let years = [];
    for (let i = moment().year() - 50; i <= moment().year() + 20; i++) {
      years.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return years;
  };

  const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    return (
      <FlexBox justifyContent="center">
        <div>
          <CalendarSelectMonth
            value={month.month()}
            onChange={e => onMonthSelect(month, e.target.value)}
          >
            {moment.months().map((label, value) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </CalendarSelectMonth>
        </div>
        <div>
          <CalendarSelectYear
            value={month.year()}
            onChange={e => onYearSelect(month, e.target.value)}
            className="Calendar_select_year"
          >
            {returnYears()}
          </CalendarSelectYear>
        </div>
      </FlexBox>
    );
  };

  return (
    <div
      className={`form-field ${className ? `form-field--${className}` : ""}
    ${errors && errors[name] ? " form-field--invalid" : ""}
    ${material ? "form-field--material" : ""}`}
    >
      <div
        className={`form-field__input-container ${
          readOnly || fieldProps.readOnly ? " form-field--disabled" : ""
        }`}
        onClick={() =>
          readOnly || fieldProps.readOnly || setIsFocused(!isFocused)
        }
      >
        <SingleDatePicker
          renderMonthElement={renderMonthElement}
          id={name}
          withPortal={true}
          hideKeyboardShortcutsPanel={true}
          date={date}
          isOutsideRange={() => false}
          onDateChange={handleDateChange}
          displayFormat="DD/MM/YYYY"
          monthFormat={"MMMM YYYY"}
          focused={isFocused}
          onFocusChange={handleFocusChange}
          showClearDate={false}
          numberOfMonths={1}
          readOnly={true}
        />
        {label && (
          <label
            htmlFor={name}
            className="form-field__label form-field__label--date-picker"
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

export default SingleDatePickerWrapper;
