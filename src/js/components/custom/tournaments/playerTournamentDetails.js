import React from "react";
import { useTranslation } from "react-i18next";
import { styled, media, withTheme } from "~theme";
import { FlexBox, Span, Thumbnail } from "~components/atoms";

const playerRanking = (ranking, user) => {
  if (ranking && ranking.length > 0 && user) {
    const userRankingData = ranking.find(
      rank => rank.player.email == user.email
    );
    return userRankingData;
  }
  return null;
};

const getDailyMatchesPipeWidth = (numberOfmatches, maxNumberOfFreeMatches) => {
  if (numberOfmatches && maxNumberOfFreeMatches > 0) {
    let numberOfPlayedMatches = numberOfmatches;
    if (numberOfmatches > maxNumberOfFreeMatches) {
      numberOfPlayedMatches = maxNumberOfFreeMatches;
    }
    return Math.round((numberOfPlayedMatches / maxNumberOfFreeMatches) * 100);
  }
  return 0;
};

const PlayerTournamentDetails = ({ ranking, theme, tournament, user }) => {
  const { t } = useTranslation();

  let playerRankingData = playerRanking(
    ranking && ranking.toJS(),
    user && user.toJS()
  );

  let maxNumberOfMatches =
    (tournament && tournament.get("numberOfFreeMatches")) || "0";

  let numberOfFreeMatchesPlayed =
    (playerRankingData && playerRankingData.numberOfFreeMatchesPlayed) || "0";

  return (
    <FlexBox
      margin="0"
      justifyContent="space-around"
      align-items="center"
      color={theme.colors.black}
      backgroundColor={theme.colors.inputDisabledBackgroundColor}
      hoverBackgroundColor={theme.colors.inputDisabledBackgroundColor}
      borderRadius="9px"
      minHeight="6em"
      fontSize={{ base: "10px", md: "14px" }}
    >
      <FlexBox flexDirection="row" alignItems="center">
        <Thumbnail
          src={user && user.get("profileImage")}
          alt="profileImage"
          title={user && user.get("profileImage")}
          height="30px"
          width="30px"
          margin="0.5rem 0.5rem 0.5rem 0"
        ></Thumbnail>
        <Span fontSize={{ base: "16px", md: "20px" }}>
          {user && `${user.get("userName")}`}
        </Span>
      </FlexBox>
      <FlexBox
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="0.3em"
      >
        <Span>{t("TournamentsFreeMatchPlayed")}</Span>
        <PipeBarWraper>
          <PipeBarText>
            {`${
              numberOfFreeMatchesPlayed > maxNumberOfMatches
                ? maxNumberOfMatches
                : numberOfFreeMatchesPlayed
            }/${maxNumberOfMatches}`}
          </PipeBarText>
          <PipeBarColor
            backgroundColor={theme.colors.secondary}
            borderRadius="5px"
            textAlign="center"
            height="2em"
            width={`${
              maxNumberOfMatches && numberOfFreeMatchesPlayed
                ? getDailyMatchesPipeWidth(
                    numberOfFreeMatchesPlayed,
                    maxNumberOfMatches
                  )
                : 0
            }%`}
          ></PipeBarColor>
        </PipeBarWraper>
      </FlexBox>
      <FlexBox
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Span>{t("TournamnetPoints")}</Span>
        <Span fontSize={theme.fonts.large} fontWeight={theme.fonts.bold}>
          {ranking && user && playerRanking(ranking.toJS(), user.toJS())
            ? `${playerRanking(ranking.toJS(), user.toJS()).totalPoints}`
            : "0"}
        </Span>
      </FlexBox>
      <FlexBox
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Span>{t("TournamnetMultipliers")}</Span>
        <Span fontSize={theme.fonts.large} fontWeight={theme.fonts.bold}>
          {tournament && `X${tournament.get("globalMultiplier")}`}
        </Span>
      </FlexBox>
    </FlexBox>
  );
};

export default withTheme(PlayerTournamentDetails);

const PipeBarWraper = styled.div`
  background-color: ${({ theme }) => theme.colors.grey};
  width: 100%;
  border-radius: 5px;
  min-width: 9em;
  position: relative;
  height: 2em;

  ${media.md`
  min-width: 12em;
`};
`;

const PipeBarColor = styled(FlexBox)`
  z-index: 1;
`;

const PipeBarText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  position: absolute;
  text-align: center;
  z-index: 2;
`;
