import React from "react";
import { withTheme } from "~theme";
import { Button, FlexBox, Icon, Paragraph } from "~components/atoms";
import { useTranslation } from "react-i18next";

const ErrorToastNotification = ({ theme, message, action, closeToast }) => {
  const { t } = useTranslation();

  return (
    <FlexBox
      backgroundColor={theme.colors.indianRed}
      flexDirection="column"
      padding="0.6em"
    >
      <FlexBox alignItems="center">
        <Icon
          icon="alert_icon"
          scale={2}
          color={theme.colors.white}
          margin="0 1em 0 0"
        />
        <Paragraph fontSize="14px" lineHeight="20px" color={theme.colors.white}>
          {message}
        </Paragraph>
      </FlexBox>
      <FlexBox
        alignItems="flex-end"
        justifyContent="flex-end"
        margin="0.6em 0 0 0"
      >
        <Button
          backgroundColor="none"
          hoverBackgroundColor="none"
          activeBackgroundColor="none"
          boxShadow="none"
          padding="0"
          color={theme.colors.white}
          onClick={closeToast}
        >
          {t("DismissToastText")}
        </Button>
        {action !== undefined && (
          <Button
            to="#"
            backgroundColor="none"
            hoverBackgroundColor="none"
            boxShadow="none"
            padding="0"
            margin="0 0 0 2em"
            color={theme.colors.white}
            onClick={action.handler}
          >
            {action.text.toUpperCase()}
          </Button>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default withTheme(ErrorToastNotification);
