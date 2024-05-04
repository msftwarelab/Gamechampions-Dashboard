import React from "react";
import DynamicForm from "~components/molecules/dynamicForm";
import { Gauge, Loader, Span } from "~components/atoms";
import { useTranslation } from "react-i18next";
const PlayerCreditForm = ({
  action,
  formFields,
  returnUrl,
  error,
  isLoading,
  onSubmit,
  bonusBalance,
  onCancel
}) => {
  const { t } = useTranslation();
  if (isLoading) {
    return <Loader isLoading={isLoading} margin="5rem auto" scale="6rem" />;
  }

  return (
    <>
      <Span fontWeight="500">{t("AccountBalancesParagraph")}</Span>
      <Gauge
        value={bonusBalance}
        max={bonusBalance}
        label={v => "$" + Math.round(v)}
        gaugeClass="match-gauge"
        dialClass="match-gauge__dial"
        valueDialClass="match-gauge__valueDial"
        valueClass="match-gauge__label"
      />
      <DynamicForm
        action={action}
        apiErrorMessage={error}
        formFields={formFields}
        returnUrl={returnUrl}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </>
  );
};

export default PlayerCreditForm;
