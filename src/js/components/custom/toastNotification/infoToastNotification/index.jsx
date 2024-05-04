import React from "react";
import { withTheme } from "~theme";
import { FlexBox, Icon, Paragraph } from "~components/atoms";
import { useTranslation } from "react-i18next";

const InfoToastNotification = ({ theme, message, closeToast }) => {
  const { t } = useTranslation();

  return (
    <FlexBox
      backgroundColor={theme.colors.white}
      hoverBackgroundColor={theme.colors.white}
      flexDirection="column"
      padding="0.6em"
    >
      <FlexBox alignItems="center">
        <Icon
          icon="info_icon"
          scale={2}
          color={theme.colors.greyDark}
          margin="0 1em 0 0"
        />
        <Paragraph
          fontSize="14px"
          lineHeight="24px"
          color={theme.colors.greyDark}
        >
          {message}
        </Paragraph>
      </FlexBox>
      <FlexBox
        alignItems="flex-end"
        justifyContent="flex-end"
        margin="0.6em 0 0 0"
      >
        <Paragraph
          fontSize="14px"
          fontWeight="bold"
          color={theme.colors.greyDark}
          onClick={closeToast}
        >
          {t("DismissToastText")}
        </Paragraph>
      </FlexBox>
    </FlexBox>
  );
};

export default withTheme(InfoToastNotification);
