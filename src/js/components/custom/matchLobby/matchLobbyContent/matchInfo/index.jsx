import React from "react";
import { styled, media, withTheme } from "~theme";
import { Heading, FlexBox, Gauge, Icon, Span } from "~components/atoms";
import { useTranslation } from "react-i18next";

const getLabel = value => {
  return "$" + value.toFixed(2);
};
const MatchInfo = ({ match, theme, tournament, tournamentPointsTable }) => {
  const { t } = useTranslation();
  return (
    <MatchInfoStyle>
      <Heading
        color={theme.colors.white}
        backgroundColor={theme.colors.tertiary}
        margin="0"
        padding="0 0 0 0.5em"
        fontSize={theme.fonts.fontSizeNormal}
        fontWeight={theme.fonts.semiBold}
        textTransform="uppercase"
        display="flex"
        alignItems="center"
        height="2rem"
      >
        {t("MatchLobbyMatchDetail")}
      </Heading>
      <FlexBox padding="0.5em" color={theme.colors.fontColor} flexWrap="wrap">
        <FlexBox
          margin="0.5em  0"
          alignItems="center"
          width={{ base: "100%", lg: "50%" }}
        >
          <Icon
            viewBox="0 0 32 32"
            scale="2"
            color={theme.colors.tertiary}
            icon="platform"
            margin="0 0.5em 0 0"
          />
          {`${t("MatchLobbyMatchDetailGame")} ${match.get(
            "gameTitle"
          )} ${match.get("platform")}`}
        </FlexBox>
        <FlexBox
          margin="0.5em  0"
          alignItems="center"
          width={{ base: "100%", lg: "50%" }}
        >
          <Icon
            viewBox="0 0 32 32"
            scale="2"
            color={theme.colors.tertiary}
            icon="format"
            margin="0 0.5em 0 0"
          />
          {`Format: ${match.get("format")}`}
        </FlexBox>
        <FlexBox
          margin=".5em  0"
          alignItems={match.get("betAmount") > 0 ? "center" : "flex-start"}
          width={{ base: "100%", lg: "50%" }}
        >
          <Icon
            viewBox="0 0 32 32"
            scale="2"
            color={theme.colors.tertiary}
            icon="bet"
            margin="0 0.5em 0 0"
          />
          {`${t("MatchLobbyMatchDetailBetAmount")} ${getLabel(
            match.get("betAmount")
          )}`}
        </FlexBox>
        {match.get("betAmount") > 0 && (
          <FlexBox
            margin="0.5em 0"
            alignItems="center"
            width={{ base: "100%", lg: "50%" }}
          >
            <Icon
              viewBox="0 0 32 32"
              scale="2"
              color={theme.colors.tertiary}
              icon="prize"
              margin="0 0.5em 0 0"
            />
            {t("MatchLobbyMatchDetailPrize")}
            <Gauge
              value={match && match.get("prize")}
              max={200}
              label={getLabel}
              gaugeClass="match-gauge"
              dialClass="match-gauge__dial"
              valueDialClass="match-gauge__valueDial"
              valueClass="match-gauge__label"
            />
          </FlexBox>
        )}
        {tournament && tournamentPointsTable && (
          <FlexBox
            margin=".5em 0"
            alignItems="flex-start"
            width={{ base: "100%", lg: "50%" }}
          >
            <Icon
              viewBox="2 2 22 22"
              scale="2"
              color={theme.colors.tertiary}
              icon="star_in_circle"
              margin="0 0.5em 0 0"
            />
            <FlexBox
              alignItems="left"
              width={{ base: "100%", lg: "50%" }}
              flexDirection="column"
            >
              {<Span>{t("MatchInfoTournamnetPoints")}</Span>}
              <MatchUlStyle>
                <li>
                  {
                    <Span color={theme.colors.secondary}>{`${t(
                      "MatchInfoTournamnetWin"
                    )}: +${tournamentPointsTable.win}`}</Span>
                  }
                </li>
                <li>
                  {
                    <Span color={theme.colors.black}>{`${t(
                      "MatchInfoTournamnetDraw"
                    )}: +${tournamentPointsTable.draw}`}</Span>
                  }
                </li>
                <li>
                  {
                    <Span color={theme.colors.indianRed}>{`${t(
                      "MatchInfoTournamnetLoss"
                    )}: +${tournamentPointsTable.loss}`}</Span>
                  }
                </li>
              </MatchUlStyle>
            </FlexBox>
          </FlexBox>
        )}
      </FlexBox>
    </MatchInfoStyle>
  );
};

export default withTheme(MatchInfo);

const MatchInfoStyle = styled.div`
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadows.primary};

  ${media.md`
    margin: 0 0.5rem 1rem 1rem;
  `};
`;

const MatchUlStyle = styled.ul`
  list-style-type: disc;
  margin: 0;
  padding-left: 1.2em;
`;
