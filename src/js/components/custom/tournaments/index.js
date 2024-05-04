import React from "react";
import { withTheme } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import GameLobby from "~containers/gameLobby";
import Footer from "~components/custom/footer";
import TournamentList from "./tournamentsList";

const Tournaments = ({
  selectedLanguage,
  gameId,
  tournamentsList,
  dashboardFooter
}) => {
  return (
    <MainWrapper>
      <GameLobby
        gameId={gameId}
        selectedLanguage={selectedLanguage}
        isTournament={true}
      />

      <TournamentList
        tournamentsList={tournamentsList}
        selectedLanguage={selectedLanguage}
        gameId={gameId}
      />

      <Footer
        dashboardFooter={dashboardFooter}
        selectedLanguage={selectedLanguage}
      />
    </MainWrapper>
  );
};

export default withTheme(Tournaments);
