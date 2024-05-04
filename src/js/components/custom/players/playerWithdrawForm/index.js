import React from "react";
import DynamicForm from "~components/molecules/dynamicForm";
import { FlexBox, Span, Gauge, Loader } from "~components/atoms";
import { useTranslation } from "react-i18next";

const getLabel = value => {
  return "$" + Math.round(value);
};

const PlayerWithdrawForm = ({
  action,
  formFields,
  returnUrl,
  selectedPlayerBalance,
  withdrawError,
  isLoading,
  onSubmit,
  onCancel
}) => {
  if (isLoading) {
    return <Loader isLoading={isLoading} margin="5rem auto" scale="6rem" />;
  }

  const { t } = useTranslation();
  const balance = selectedPlayerBalance.get("availableAmount");

  return (
    <>
      <FlexBox
        padding="0 0 0 7px"
        margin="1em 0"
        alignItems="center"
        width={{ base: "100%", lg: "50%" }}
      >
        <Span fontWeight="500">{t("PlayersWithdrawBalance")}</Span>
        <Gauge
          value={balance}
          max={500}
          label={getLabel}
          gaugeClass="match-gauge"
          dialClass="match-gauge__dial"
          valueDialClass="match-gauge__valueDial"
          valueClass="match-gauge__label"
        />
      </FlexBox>
      <DynamicForm
        action={action}
        apiErrorMessage={withdrawError}
        formFields={formFields}
        returnUrl={returnUrl}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </>
  );
};

export default PlayerWithdrawForm;
