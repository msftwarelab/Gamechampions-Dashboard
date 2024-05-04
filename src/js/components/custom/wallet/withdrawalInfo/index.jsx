import React from "react";
import { FlexBox } from "~components/atoms";
import { useTranslation } from "react-i18next";

const WithdrawalInfo = () => {
  const { t } = useTranslation();
  return (
    <FlexBox padding="2em 0">
      {t("InformationWithdrawSubmittedMessage")}
    </FlexBox>
  );
};

export default WithdrawalInfo;
