import React from "react";
import { Paragraph } from "~components/atoms";
import { withTheme } from "~theme";
import Link from "~components/atoms/link";
import { useTranslation } from "react-i18next";

const ViewTransactionHistory = ({ theme, returnUrl }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={{ pathname: returnUrl }}
      alignItems="center"
      justifyContent="center"
    >
      <Paragraph
        fontSize={theme.fonts.small}
        fontWeight={theme.fonts.semiBold}
        color={theme.colors.greyLight}
      >
        {t("WalletTransactionsLink")} {">"}
      </Paragraph>
    </Link>
  );
};

export default withTheme(ViewTransactionHistory);
