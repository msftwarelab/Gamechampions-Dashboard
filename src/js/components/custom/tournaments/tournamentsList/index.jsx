import React from "react";
import TournamentCard from "./tournamentCard";
import { styled, media } from "~theme";

const TournamentList = ({ tournamentsList, gameId, selectedLanguage }) => {
  let tournaments = [];
  if (tournamentsList?.toJS()) tournaments = tournamentsList.toJS();
  return (
    <CardsContainerStyle>
      {tournaments.map(
        ({
          tournamentId,
          totalPrize,
          dateTo,
          numberOfFreeMatches,
          numberOfFreeMatchesPlayed,
          availableFreeMatches,
          isOngoing,
          thumbnailUrl
        }) => (
          <TournamentCard
            key={tournamentId}
            id={tournamentId}
            totalPrize={totalPrize}
            dateTo={dateTo}
            numberOfFreeMatches={numberOfFreeMatches}
            numberOfFreeMatchesPlayed={numberOfFreeMatchesPlayed}
            availableFreeMatches={availableFreeMatches}
            isOngoing={isOngoing}
            gameId={gameId}
            selectedLanguage={selectedLanguage}
            thumbnailUrl={thumbnailUrl}
          />
        )
      )}
    </CardsContainerStyle>
  );
};

const CardsContainerStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;

  ${media.md`
    padding: 15px;
  `}

  ${media.lg`
    grid-template-columns: 1fr 1fr;
  `}

  ${media.xl`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`;

export default TournamentList;
