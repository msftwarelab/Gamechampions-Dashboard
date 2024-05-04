import React from "react";
import { useTranslation } from "react-i18next";
import { withTheme, styled } from "~theme";
import { FlexBox, Span } from "~components/atoms";
import { ACTIVE_COMPONENT } from "~containers/tournaments/constants";

const TableSelector = ({ theme, active, setActive, isMobile }) => {
  const { t } = useTranslation();

  return (
    <FlexBox
      flexDirection="row"
      alignItems="center"
      backgroundColor={theme.colors.primary}
      hoverBackgroundColor={theme.colors.primary}
      color={theme.colors.white}
      justifyContent={`${isMobile ? "space-between" : "unset"}`}
    >
      <RankingTab
        alignItems={{ base: "unset", md: "center" }}
        padding="0.5em 1em"
        onClick={() => setActive(ACTIVE_COMPONENT.CURRENT)}
        borderColor={`${active == 3 ? theme.colors.secondary : "none"}`}
        borderWidth={`${active == 3 ? "0 0 3px 0" : "none"}`}
        borderStyle={`${active == 3 ? "solid" : "none"}`}
      >
        <Span>{t("TournamentsCurrentRanking")}</Span>
      </RankingTab>
      <RankingTab
        alignItems={{ base: "unset", md: "center" }}
        padding="0.5em 1em"
        onClick={() => setActive(ACTIVE_COMPONENT.LAST_SEVEN_DAYS)}
        borderColor={`${active == 2 ? theme.colors.secondary : "none"}`}
        borderWidth={`${active == 2 ? "0 0 3px 0" : "none"}`}
        borderStyle={`${active == 2 ? "solid" : "none"}`}
      >
        <Span>{t("TournamentsLastSevenDays")}</Span>
      </RankingTab>
      <RankingTab
        alignItems={{ base: "unset", md: "center" }}
        padding="0.5em 1em"
        onClick={() => setActive(ACTIVE_COMPONENT.TOP_HUNDRED)}
        borderColor={`${active == 1 ? theme.colors.secondary : "none"}`}
        borderWidth={`${active == 1 ? "0 0 3px 0" : "none"}`}
        borderStyle={`${active == 1 ? "solid" : "none"}`}
      >
        <Span>{t("TournamentsTopHundred")}</Span>
      </RankingTab>
      {!isMobile && (
        <FlexBox
          alignItems={{ base: "unset", md: "center" }}
          padding="0.5em"
          flex="5"
          justifyContent="flex-end"
        >
          <Span>{`${
            active == 1
              ? t("TournamnetShowingTopHundred")
              : active == 2
              ? t("TournamentsShowingLastSevenDays")
              : t("ShowingTournamentsCurrent")
          }`}</Span>
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default withTheme(TableSelector);

const RankingTab = styled(FlexBox)`
  cursor: pointer;
`;
