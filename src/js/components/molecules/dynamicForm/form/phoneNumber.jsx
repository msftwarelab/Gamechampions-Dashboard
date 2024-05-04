import React, { useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { useTranslation } from "react-i18next";
import { styled } from "~theme";
import { SpaceStyle } from "~components/styles";
import FormFieldErrorMessage from "../formFieldErrorMessage";

function PhoneNumber({
  className,
  material,
  register,
  watch,
  setValue,
  name,
  validation,
  errors,
  placeholder,
  countryCode = null
}) {
  const { t } = useTranslation();

  const validationObject =
    validation && validation.watchValidate
      ? validation.watchValidate(watch)
      : validation;

  useEffect(() => {
    register({ name }, validationObject);
  }, []);

  const currentValue = watch(name);
  return (
    <CustomeFieldStyle
      className={`form-field ${className ? `form-field--${className}` : ""}
    ${material ? "form-field--material" : ""}`}
    >
      <PhoneInput
        defaultCountry={countryCode ? countryCode : undefined}
        placeholder={t(placeholder)}
        onChange={e => {
          setValue(name, e);
        }}
        value={currentValue}
        // `value` will be the parsed phone number in E.164 format.
        // Example: "+12133734253".
      />
      {errors && errors[name] && (
        <FormFieldErrorMessage
          message={t(errors[name].message)}
        ></FormFieldErrorMessage>
      )}
    </CustomeFieldStyle>
  );
}

const CustomeFieldStyle = styled.div`
  ${SpaceStyle};
`;

export default PhoneNumber;
