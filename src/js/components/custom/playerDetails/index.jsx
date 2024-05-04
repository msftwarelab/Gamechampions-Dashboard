import React from "react";
import { styled, media } from "~theme";
import ResponsiveWrapper from "~components/atoms/responsiveWrapper";
import PersonalDetails from "./personalDetails";
import MatchHistory from "./matchHistory";
import MainWrapper from "../mainWrapper";

const PlayerDetails = ({
  matches,
  personalDetails,
  statistics,
  currency,
  games,
  playerStats,
  onLoadMatches,
  playerId,
  selectedLanguage,
  onChatOpen,
  stars,
  onLoadXPPoints
}) => (
  <MainWrapper>
    <PlayerDetailsStyle>
      <PersonalDetails
        selectedLanguage={selectedLanguage}
        personalDetails={personalDetails}
        playerId={playerId}
        onChatOpen={onChatOpen}
      />
      <ResponsiveWrapper>
        <MatchHistory
          matches={matches}
          currency={currency}
          statistics={statistics}
          games={games}
          playerStats={playerStats}
          onLoadMatches={onLoadMatches}
          playerId={playerId}
          selectedLanguage={selectedLanguage}
          onLoadXPPoints={onLoadXPPoints}
          stars={stars}
        />
      </ResponsiveWrapper>
    </PlayerDetailsStyle>
  </MainWrapper>
);

export default PlayerDetails;

const PlayerDetailsStyle = styled.div`
  display: flex;
  flex-direction: column;

  ${media.md`
    height: 100%;
`};
`;
