import React from "react";
import { FlexBox, Wrapper, Span, Heading, Gauge } from "~components/atoms";
import { withTheme } from "~theme";
import { useTranslation } from "react-i18next";

const getLabel = value => {
  return "$" + Math.round(value);
};

const TemporalyWithdraw = ({ accountBalance, theme }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <FlexBox padding="1em 0 0 0" margin="auto 9px">
        {t("InformationWithdrawMessage")}
      </FlexBox>
      <FlexBox
        padding="0 0 0 7px"
        margin="1em 0"
        alignItems="center"
        width={{ base: "100%", lg: "50%" }}
      >
        <Span fontWeight="500">{t("AccountBalanceParagraph")}</Span>
        <Gauge
          value={accountBalance}
          max={accountBalance}
          label={getLabel}
          gaugeClass="match-gauge"
          dialClass="match-gauge__dial"
          valueDialClass="match-gauge__valueDial"
          valueClass="match-gauge__label"
        />
      </FlexBox>
      <Heading
        as="h2"
        margin="0 0 0 0.5em"
        color={theme.colors.fontColor}
        fontSize={theme.fonts.small}
        fontWeight={theme.fonts.semiBold}
      >
        {t("InputDesiredAmount")}
      </Heading>
    </Wrapper>
  );
};

export default withTheme(TemporalyWithdraw);
