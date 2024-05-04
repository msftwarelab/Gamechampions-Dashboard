import React from "react";
import { withTheme } from "~theme";
import { FlexBox, Link } from "~components/atoms";
import { useTranslation } from "react-i18next";

const ForgotPassword = ({ selectedLanguage, theme }) => {
  const { t } = useTranslation();
  return (
    <FlexBox display={{ base: "none", md: "flex" }} justifyContent="flex-end">
      <Link
        to={{
          pathname: `/${selectedLanguage}/forgot-password`,
          state: { returnUrl: `/${selectedLanguage}/login` }
        }}
        color={theme.colors.secondary}
      >
        {t("ForgotPasswordLink")}
      </Link>
    </FlexBox>
  );
};

export default withTheme(ForgotPassword);
