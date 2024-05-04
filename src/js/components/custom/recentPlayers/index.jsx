import React from "react";
import { styled, media } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import GameLobby from "~containers/gameLobby";
import { ErrorInfo } from "../errorInfo";
import PlayerList from "./playerList";
import { FlexBox } from "~components/atoms";
import BonusCashNavProgress from "../bonusPromotions/bonusCashNavProgress";
import WidgetBot from "@widgetbot/react-embed";
import Footer from "~components/custom/footer";

const RecentPlayers = ({
  recentPlayers,
  gameId,
  selectedLanguage,
  handleSendChallenge,
  error,
  userId,
  selectedPlayer,
  isGlobalChatEnabled,
  playerBonusCampaignStatus,
  dashboardFooter
}) => (
  <MainWrapper>
    {playerBonusCampaignStatus && (
      <FlexBox
        display={{ base: "flex", lg: "none" }}
        margin="0.5em 0 1em 0"
        width="100%"
        justifyContent="center"
      >
        <BonusCashNavProgress
          selectedLanguage={selectedLanguage}
          currentBonusBets={playerBonusCampaignStatus.currentBonusBets}
          targetBonusBets={playerBonusCampaignStatus.targetBonusBets}
          bonusAmount={playerBonusCampaignStatus.bonusAmount}
        />
      </FlexBox>
    )}
    <GameLobby gameId={gameId} selectedLanguage={selectedLanguage} />
    {error && (
      <ErrorInfo>
        {<div dangerouslySetInnerHTML={{ __html: error }}></div>}
      </ErrorInfo>
    )}
    <ContentWrapper>
      <PlayerList
        players={recentPlayers}
        handleSendChallenge={handleSendChallenge}
        userId={userId}
        gameId={gameId}
        selectedPlayer={selectedPlayer}
        selectedLanguage={selectedLanguage}
      />
      {isGlobalChatEnabled && (
        <GameLobbyChatWrapper>
          <WidgetBot
            width={"100%"}
            server="872485620772134922"
            channel="872937450752843797"
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

export default RecentPlayers;

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
