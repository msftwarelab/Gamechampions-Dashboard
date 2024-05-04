import React from "react";
import { Link, FlexBox, Span } from "~components/atoms";
import { withTheme } from "styled-components";
import { useTranslation } from "react-i18next";

const RegisterationLink = ({ theme, selectedLanguage }) => {
  const { t } = useTranslation();
  return (
    <FlexBox
      margin="-1em 0"
      padding="1em 0.5em"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
      gap=".7em"
    >
      <FlexBox display={{ base: "flex", md: "none" }}>
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
      <FlexBox>
        <Span fontSize="1rem">
          {t("LoginNotRegister")}
          &nbsp;
        </Span>
        <Link
          to={{
            pathname: `/${selectedLanguage}/registration`,
            state: { returnUrl: `/${selectedLanguage}/login` }
          }}
          color={theme.colors.secondary}
          justifyContent={{ base: "center", md: "left" }}
          fontSize="1rem"
        >
          {t("LoginRegister")}
        </Link>
      </FlexBox>
    </FlexBox>
  );
};

export default withTheme(RegisterationLink);
