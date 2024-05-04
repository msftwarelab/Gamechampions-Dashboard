import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Section } from "~components/atoms";

import InputButton from "../../buttons/inputButton";
import DynamicFormField from "./dynamicFormField";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";

const DynamicForm = ({
  action = "/",
  method = "post",
  mode = "create",
  formFields,
  formWrapperProps = {},
  initialValues = {},
  onSubmit = null,
  onButtonClick = null,
  loading = false,
  returnUrl = "",
  onCancel = null,
  apiErrorMessage = "",
  className = "",
  displayButtons = true,
  submitButtonDisabled = false,
  submitButtonLabel = "ButtonDynamicFormSubmit",
  submitButtonIcon = null,
  cancelLabel,
  extraLinks,
  separators,
  extraContents,
  isRecaptched = false,
  gameId = null
}) => {
  let isReadOnly = true;
  let buttonLabel = "";

  switch (mode) {
    case "edit":
      buttonLabel = submitButtonLabel || "ButtonDynamicFormSave";
      isReadOnly = false;
      break;
    case "create":
      buttonLabel = submitButtonLabel;
      isReadOnly = false;
      break;
    case "delete":
      buttonLabel = "ButtonDynamicFormDelete";
      break;
    default:
      buttonLabel = submitButtonLabel;
  }

  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    formState,
    reset
  } = useForm({ defaultValues: initialValues });

  const recaptchaRef = React.useRef(null);

  const { t } = useTranslation();

  const { isSubmitting } = formState;

  const handleRecaptcha = data => {
    recaptchaRef.current
      .executeAsync()
      .then(() => {
        onSubmit(data);
      })
      .finally(() => recaptchaRef.current.reset());
  };

  return (
    <Section
      {...formWrapperProps}
      className={`dynamic-form ${
        className ? `dynamic-form--${className}` : ""
      }`}
    >
      <form
        action={action}
        method={method}
        onSubmit={handleSubmit(isRecaptched ? handleRecaptcha : onSubmit)}
        className={`form ${className ? `form--${className}` : ""}`}
      >
        <div
          className={`form__section ${
            className ? `form__section--${className}` : ""
          }`}
        >
          {formFields &&
            formFields.length &&
            formFields.map(item => (
              <DynamicFormField
                key={item.id}
                item={item}
                initialValue={
                  initialValues && initialValues[item.name]
                    ? initialValues[item.name]
                    : undefined
                }
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
                isReadOnly={isReadOnly}
                reset={reset}
              />
            ))}
        </div>

        {isRecaptched && (
          <ReCAPTCHA
            sitekey={process.env.RECAPTCHA_SITE_KEY}
            ref={recaptchaRef}
            size="invisible"
            badge="bottomleft"
          />
        )}

        {displayButtons && (
          <div
            className={`form__buttons ${
              className ? `form__buttons--${className}` : ""
            } form__buttons--right form__buttons--order`}
          >
            {returnUrl && (
              <Link
                to={returnUrl}
                className={
                  className
                    ? `button form__buttons__button form__buttons__button--cancel button--cancel-${className}`
                    : "button form__buttons__button form__buttons__button--cancel"
                }
                title="Cancel"
                onClick={onCancel}
              >
                {t(cancelLabel || "ButtonDynamicFormCancel")}
              </Link>
            )}

            {!isReadOnly && (
              <>
                <InputButton
                  type="submit"
                  loading={loading}
                  value={t(buttonLabel)}
                  className={`form__buttons__button  ${
                    className ? `form__buttons__button--${className}` : ""
                  }`}
                  disabled={loading || isSubmitting || submitButtonDisabled}
                  icon={submitButtonIcon}
                />
                {buttonLabel == "Unverify" && gameId == 1 && (
                  <InputButton
                    type="button"
                    loading={loading}
                    value={`Brute ${t(buttonLabel)}`}
                    className={`form__buttons__button form__buttons__button--unverify`}
                    disabled={loading || isSubmitting || submitButtonDisabled}
                    icon={submitButtonIcon}
                    onButtonClick={onButtonClick}
                  />
                )}
              </>
            )}
          </div>
        )}
        {apiErrorMessage && (
          <div
            className={`form__error ${
              className ? `form__error--${className}` : ""
            }`}
          >
            <div
              className={`form__error__message ${
                className ? `form__error__message--${className}` : ""
              }`}
              dangerouslySetInnerHTML={{ __html: apiErrorMessage }}
            />
          </div>
        )}
        {extraLinks}
        {separators}
        {extraContents}
      </form>
    </Section>
  );
};

export default DynamicForm;
