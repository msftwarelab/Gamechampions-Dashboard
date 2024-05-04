import React from "react";
import { withTheme } from "~theme";
import { useTranslation } from "react-i18next";
import { FlexBox, Icon, Paragraph } from "~components/atoms";
import { toPriceString } from "~service/adapter";

const MoneyDetails = ({
  bonusMoney,
  availableAmount,
  inPlayBalance,
  currency,
  selectedLanguage,
  theme,
  history
}) => {
  const { t } = useTranslation();
  return (
    <FlexBox
      padding="0.75rem 1.25rem 1.75rem"
      borderRadius="1.25rem"
      backgroundColor={theme.colors.tealBlue}
      hoverBackgroundColor={theme.colors.tealBlue}
      flexDirection="column"
    >
      <FlexBox width="100%" margin="0 0 0.25rem">
        <Paragraph fontSize={theme.fonts.small} color={theme.colors.white}>
          {t("WalletTotalBalance")}
        </Paragraph>
      </FlexBox>
      <FlexBox width="100%" justifyContent="space-between" alignItems="center">
        <Paragraph
          fontSize={theme.fonts.x3Large}
          fontWeight={theme.fonts.bold}
          color={theme.colors.white}
        >
          {toPriceString(availableAmount + inPlayBalance, currency)}
        </Paragraph>
        <FlexBox
          width="7.5rem"
          justifyContent="space-between"
          alignItems="center"
          padding="0.5rem 0.875rem"
          backgroundColor={theme.colors.turquoiseFilled}
          hoverBackgroundColor={theme.colors.turquoiseFilled}
          borderRadius="100px"
          cursor="pointer"
          onClick={() => {
            history.push(`/${selectedLanguage}/my-account/bonus-promotions`);
          }}
        >
          <Icon
            viewBox="0 0 16 16"
            scale="1"
            icon="gift"
            color={theme.colors.white}
          />
          <Paragraph
            fontSize={theme.fonts.fontSizeNormal}
            fontWeight={theme.fonts.semiBold}
            color={theme.colors.white}
            margin="0 0.5rem 0 0"
          >
            {toPriceString(bonusMoney, currency)}
          </Paragraph>
        </FlexBox>
      </FlexBox>
      <FlexBox
        width="100%"
        height="1px"
        backgroundColor={theme.colors.white}
        hoverBackgroundColor={theme.colors.white}
        margin="1.75rem 0 1.25rem 0"
      />
      <FlexBox width="100%" justifyContent="space-between" alignItems="center">
        <FlexBox flexDirection="column" gap="0.25rem">
          <Paragraph fontSize={theme.fonts.small} color={theme.colors.white}>
            {t("WalletAvailable")}
          </Paragraph>
          <Paragraph
            fontSize={theme.fonts.large}
            color={theme.colors.white}
            fontWeight={theme.fonts.bold}
          >
            {toPriceString(availableAmount, currency)}
          </Paragraph>
        </FlexBox>
        <FlexBox width="7.5rem" flexDirection="column" gap="0.25rem">
          <Paragraph fontSize={theme.fonts.small} color={theme.colors.white}>
            {t("WalletInPlay")}
          </Paragraph>
          <Paragraph
            fontSize={theme.fonts.large}
            color={theme.colors.white}
            fontWeight={theme.fonts.bold}
          >
            {toPriceString(inPlayBalance, currency)}
          </Paragraph>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default withTheme(MoneyDetails);
