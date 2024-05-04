import React from "react";
import { withTheme } from "~theme";
import { Heading } from "~components/atoms";
import { useTranslation } from "react-i18next";
import { SeparatorStyle } from "./separatorStyle";

const Separator = ({ theme }) => {
  const { t } = useTranslation();
  return (
    <>
      <SeparatorStyle>{t("WalletSeparatorTitle")}</SeparatorStyle>
      <Heading
        as="h2"
        margin="0 0 0 0.5em"
        color="rgba(0, 0, 0, 0.87)"
        fontSize={theme.fonts.small}
        fontWeight={theme.fonts.semiBold}
      >
        {t("InputDesiredAmount")}
      </Heading>
    </>
  );
};

export default withTheme(Separator);
