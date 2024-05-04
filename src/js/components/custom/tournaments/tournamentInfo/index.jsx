import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import MainWrapper from "~components/custom/mainWrapper";
import Modal from "~components/modal/modal";
import { Paragraph, Image, FlexBox } from "~components/atoms";
import LeaderBoard from "./leaderBoard";
import Results from "./results";
import Card from "~components/card/card";
import TournamentSummary from "./summary";
import ScrollableTabs from "~components/tabs";
import { useTranslation } from "react-i18next";

const TournamentInfo = ({
  history,
  match,
  ranking,
  profile,
  selectedLanguage,
  tournamentsList,
  tournamentResults,
  onSubmitChallenge,
  onLoadTournamentResults,
  onLoadTournamentRanking,
  onSetSelectedTournament,
  submitting,
  isLoading
  // isMobile
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const gameId = match.params.gameId;
  const tournamentId = match.params.tournamentId;
  const returnUrl = `/${selectedLanguage}/game-lobby/${gameId}/tournaments`;
  const tournamentUrl = `/${selectedLanguage}/game-lobby/${gameId}/tournaments/leaderboard/${tournamentId}`;
  const resultsUrl = `/${selectedLanguage}/game-lobby/${gameId}/tournaments/results/${tournamentId}`;
  const [tournament, setTornament] = useState(null);

  const elementArray = [
    {
      id: 0,
      title: t("Leaderboards"),
      url: tournamentUrl,
      element: (
        <LeaderBoard
          ranking={ranking}
          profile={profile}
          selectedLanguage={selectedLanguage}
          isLoading={isLoading}
          tournamentUrl={tournamentUrl}
          onLoadTournamentRanking={onLoadTournamentRanking}
        />
      )
    },
    {
      id: 1,
      title: t("Results"),
      url: resultsUrl,
      element: (
        <Results
          ranking={ranking}
          profile={profile}
          tournamentId={tournamentId}
          isLoading={isLoading}
          tournamentResults={tournamentResults}
          onLoadTournamentResults={onLoadTournamentResults}
        />
      )
    }
  ];

  useEffect(() => {
    if (tournamentsList) {
      const tournament = tournamentsList
        .toJS()
        .find(t => t.tournamentId.toString() === tournamentId);
      setTornament(tournament);
      onSetSelectedTournament(tournament);
    }
  }, [tournamentsList]);

  return (
    <MainWrapper>
      {tournament && (
        <Modal
          onClick={() => history.push(returnUrl)}
          modalClassName="height_90"
        >
          <Card closeUrl={returnUrl}>
            <Paragraph
              fontSize="1.4rem"
              fontWeight="800"
              fontStyle="italic"
              color={theme.colors.greyDark}
            >
              {tournament.title}
            </Paragraph>
            <Image
              src={tournament.thumbnailUrl}
              width="100%"
              maxHeight={"14rem"}
              margin=".5rem 0"
            />
            <TournamentSummary
              totalPrize={tournament.totalPrize}
              dateTo={tournament.dateTo}
              isOngoing={tournament.isOngoing}
              availableFreeMatches={tournament.availableFreeMatches}
              numberOfFreeMatchesPlayed={tournament.numberOfFreeMatchesPlayed}
              onSubmitChallenge={onSubmitChallenge}
              submitting={submitting}
            />
            {tournament.summary && (
              <FlexBox flexDirection="column" margin=".5rem 0">
                <FlexBox
                  backgroundColor={theme.colors.greySoft}
                  hoverBackgroundColor={theme.colors.greySoft}
                  padding=".8rem"
                  borderRadius="5px"
                >
                  <Paragraph
                    color={theme.colors.grey}
                    fontSize="0.8rem"
                    dangerouslySetInnerHTML={{
                      __html: tournament.summary
                    }}
                  />
                </FlexBox>
              </FlexBox>
            )}
            <ScrollableTabs tabs={elementArray} match={match} />
          </Card>
        </Modal>
      )}
    </MainWrapper>
  );
};

export default TournamentInfo;
