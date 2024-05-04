import React from "react";
import { Paragraph, FlexBox, Button } from "~components/atoms";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import Countdown from "../../countdown";

const TournamentSummary = ({
  totalPrize,
  dateTo,
  isOngoing,
  onSubmitChallenge,
  submitting
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <FlexBox
      width="100%"
      margin=".5rem 0"
      justifyContent={{ base: "space-between", md: "space-evenly" }}
      flexDirection={{ base: "column", md: "row" }}
    >
      <FlexBox gap={{ base: "0rem", md: "4rem" }} justifyContent="space-evenly">
        <FlexBox flexDirection="column" justifyContent="space-between">
          <Paragraph
            color={theme.colors.secondary}
            fontWeight="800"
            fontSize="1.9rem"
            lineHeight=".9"
            textAlign="center"
          >
            &#36;{totalPrize}
          </Paragraph>
          <Paragraph
            color={theme.colors.grey}
            fontWeight="400"
            fontSize="0.75rem"
            textAlign="center"
          >
            {t("TournamentCardLabel")}
          </Paragraph>
        </FlexBox>
        <FlexBox flexDirection="column" justifyContent="space-between">
          <Countdown
            dateTo={dateTo}
            isOngoing={isOngoing}
            height="3.3125rem"
            width={{ base: "2.77rem", md: "3.97rem" }}
            fontSize="1.25rem"
            gap="5px"
          />
          <Paragraph
            color={theme.colors.grey}
            fontWeight="400"
            fontSize="0.75rem"
            textAlign="center"
          >
            {t("TournamentCardCountDownLabel")}
          </Paragraph>
        </FlexBox>
      </FlexBox>
      <FlexBox flexDirection="column" justifyContent="space-between">
        <Button
          onClick={onSubmitChallenge}
          isLoading={submitting}
          isDisabled={!isOngoing}
        >
          {t("TournamentCardButton")}
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default TournamentSummary;
