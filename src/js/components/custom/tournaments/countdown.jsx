import React from "react";
import { FlexBox, Paragraph, Span } from "~components/atoms";
import { withTheme } from "styled-components";
import { useCountDown } from "~hooks";
import { useTranslation } from "react-i18next";

const Countdown = ({
  dateTo,
  isOngoing,
  theme,
  height = "3.3125rem",
  width = "3.97rem",
  fontSize = "1.25rem",
  gap = "5px"
}) => {
  const { days, hours, minutes, seconds } = useCountDown(isOngoing && dateTo);
  const { t } = useTranslation();

  return (
    <FlexBox
      fontSize={fontSize}
      fontWeight="700"
      gap={gap}
      color={theme.colors.greyDark}
    >
      <FlexBox
        borderRadius="5px"
        backgroundColor={theme.colors.greySoft}
        hoverBackgroundColor={theme.colors.greySoft}
        height={height}
        width={width}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <FlexBox>{days}</FlexBox>
        <FlexBox fontSize="0.875rem" fontWeight="400">
          {t("CountDownDays")}
        </FlexBox>
      </FlexBox>
      <FlexBox
        borderRadius="5px"
        backgroundColor={theme.colors.greySoft}
        hoverBackgroundColor={theme.colors.greySoft}
        height={height}
        width={width}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <FlexBox>{hours}</FlexBox>
        <FlexBox fontSize="0.875rem" fontWeight="400">
          {t("CountDownHours")}
        </FlexBox>
      </FlexBox>
      <FlexBox
        borderRadius="5px"
        backgroundColor={theme.colors.greySoft}
        hoverBackgroundColor={theme.colors.greySoft}
        height={height}
        width={width}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <FlexBox>{minutes}</FlexBox>
        <FlexBox fontSize="0.875rem" fontWeight="400">
          {t("CountDownMinutesDiminutive")}
        </FlexBox>
      </FlexBox>
      <FlexBox
        borderRadius="5px"
        backgroundColor={theme.colors.greySoft}
        hoverBackgroundColor={theme.colors.greySoft}
        height={height}
        width={width}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <FlexBox>{seconds}</FlexBox>
        <FlexBox fontSize="0.875rem" fontWeight="400">
          {t("CountDownSecondsDiminutive")}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default withTheme(Countdown);
