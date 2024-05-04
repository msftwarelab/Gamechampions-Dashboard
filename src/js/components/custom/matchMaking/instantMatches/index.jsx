import React from "react";
import { styled, media, withTheme } from "~theme";
import { FlexBox, Button } from "~components/atoms";
import Match from "./match";
import { useTranslation } from "react-i18next";

const InstantMatches = ({
  matches,
  theme,
  handlePlayNow,
  matchId,
  gameId,
  game,
  userId,
  profile,
  selectedLanguage,
  tournamentPointsTable
}) => {
  const { t } = useTranslation();
  return (
    <InstantMatchesStyle>
      <MatchesList>
        {matches && matches.size > 0 ? (
          matches.map(n => (
            <Match
              key={n.get("id")}
              margin="0 0 0.5em"
              borderWidth="1px"
              match={n}
              game={game}
              handlePlayNow={handlePlayNow}
              isButtonClick={n.get("id") == matchId}
              isSubmit={matchId != null}
              userId={userId}
              profile={profile}
              selectedLanguage={selectedLanguage}
              tournamentPointsTable={tournamentPointsTable}
            />
          ))
        ) : (
          <FlexBox width="100%" flexDirection="column" alignItems="center">
            <FlexBox margin="1em 0" color={theme.colors.black}>
              {t("ThereAreNoInstantMatches")}
            </FlexBox>

            <Button
              to={`/${selectedLanguage}/create-challenge/${gameId}`}
              margin={{ base: "1.5em 0 1.5em 0", md: "0 1rem 0.5em 0" }}
              padding={{ base: "1.33em 1.66em", md: "1em 1.66em" }}
              width={{ base: "100%", md: "auto" }}
            >
              {t("CreateChallengeButton")}
            </Button>
          </FlexBox>
        )}
      </MatchesList>
    </InstantMatchesStyle>
  );
};

export default withTheme(InstantMatches);

const InstantMatchesStyle = styled.div`
  flex: 2;

  ${media.md`
    margin: 1rem 0.5rem 1rem 1rem;
  `};
`;

const MatchesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${media.md`
    color: ${({ theme }) => theme.colors.blackTransparent};
    max-height: calc(100% - 1rem);
  `};
`;
