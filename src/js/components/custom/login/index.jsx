import React from "react";
import { withTranslation } from "react-i18next";
import { withTheme } from "~theme";

import { FlexBox, Paragraph, Image } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";
import RegisterationLink from "~components/custom/login/registration";

const logo = {
  src: "/img/linear_logo.svg",
  alt: process.env.NAME,
  title: process.env.NAME
};

const LoginPage = ({
  apiErrorMessage,
  match,
  loading,
  onSubmit,
  selectedLanguage,
  t,
  formFields,
  theme
}) => {
  return (
    <>
      <FlexBox
        alignItems="center"
        justifyContent="center"
        margin={{ base: "40px 0 0", md: "0 0 1.5rem" }}
      >
        <Image
          src={logo.src}
          title={logo.title}
          alt={logo.alt}
          width={{ base: "20em", md: "32rem" }}
        />
      </FlexBox>

      <FlexBox maxWidth="48em" margin="0 auto" flexDirection="column">
        <Paragraph
          textAlign="center"
          padding=".5em 0"
          fontSize={{ base: "1.5em", md: "2em" }}
          fontStyle="italic"
          color={theme.colors.charcoalGrey}
        >
          {t("LoginFormTitle")}
        </Paragraph>
      </FlexBox>

      <DynamicForm
        action={match.url}
        formFields={formFields({ selectedLanguage })}
        apiErrorMessage={apiErrorMessage}
        loading={loading}
        onSubmit={onSubmit}
        submitButtonLabel="LoginButtonLabel"
        isRecaptched
      />

      <FlexBox
        justifyContent="center"
        alignItems="center"
        flexDirection={{ base: "column-reverse", md: "row" }}
        padding="0 .5em"
      >
        <RegisterationLink selectedLanguage={selectedLanguage} />
      </FlexBox>
    </>
  );
};

export default withTheme(withTranslation()(LoginPage));
