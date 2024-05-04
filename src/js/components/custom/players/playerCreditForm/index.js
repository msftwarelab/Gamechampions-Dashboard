import React from "react";
import DynamicForm from "~components/molecules/dynamicForm";
import { Loader } from "~components/atoms";
const PlayerCreditForm = ({
  action,
  formFields,
  returnUrl,
  error,
  isLoading,
  onSubmit,
  onCancel
}) => {
  if (isLoading) {
    return <Loader isLoading={isLoading} margin="5rem auto" scale="6rem" />;
  }
  return (
    <DynamicForm
      action={action}
      apiErrorMessage={error}
      formFields={formFields}
      returnUrl={returnUrl}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default PlayerCreditForm;
