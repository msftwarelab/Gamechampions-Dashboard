import React from "react";
import { styled, media } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import InstantMatches from "~components/custom/matchMaking/instantMatches";
import GameLobby from "~containers/gameLobby";
import GlobalChat from "~containers/globalChat/globalChat";
import Footer from "~components/custom/footer";
import { ErrorInfo } from "../errorInfo";

const MatchMaking = ({
  instantMatches,
  gameId,
  selectedLanguage,
  handlePlayNow,
  matchId,
  error,
  game,
  userId,
  profile,
  isGlobalChatEnabled,
  tournamentPointsTable,
  dashboardFooter
}) => {
  return (
    <MainWrapper>
      <GameLobby gameId={gameId} selectedLanguage={selectedLanguage} />
      {error && (
        <ErrorInfo>
          {<div dangerouslySetInnerHTML={{ __html: error }}></div>}
        </ErrorInfo>
      )}
      <ContentWrapper>
        <InstantMatches
          tournamentPointsTable={tournamentPointsTable}
          matches={instantMatches}
          handlePlayNow={handlePlayNow}
          matchId={matchId}
          gameId={gameId}
          game={game}
          userId={userId}
          profile={profile}
          selectedLanguage={selectedLanguage}
        />
        {isGlobalChatEnabled && (
          <GameLobbyChatWrapper>
            <GlobalChat
              gameId={game?.get("id")}
              gameType={game?.get("gameType")}
            />
          </GameLobbyChatWrapper>
        )}
      </ContentWrapper>
      <Footer
        dashboardFooter={dashboardFooter}
        selectedLanguage={selectedLanguage}
      />
    </MainWrapper>
  );
};
export default MatchMaking;

const ContentWrapper = styled.div`
  ${media.md`
    display: flex;
    flex: 1;
  `};
`;

const GameLobbyChatWrapper = styled.div`
  display: none;

  ${media.md`
    display: flex;
    height: 100%;
    flex: 1;
  `};
`;
