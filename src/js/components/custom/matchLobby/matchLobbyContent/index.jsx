import React from "react";
import { styled, media } from "~theme";
import MatchLobbyChat from "~containers/matchLobbyChat/matchLobbyChat";

const MatchLobbyContent = ({ match, matchId }) => {
  return (
    <MatchLobbyContentStyle>
      <MatchLobbyChatWrapper>
        <MatchLobbyChat matchId={matchId} title={match && match.get("title")} />
      </MatchLobbyChatWrapper>
    </MatchLobbyContentStyle>
  );
};

export default MatchLobbyContent;

const MatchLobbyContentStyle = styled.div`
  justify-content: center;
  height: 100%;
  ${media.md`
    display: flex;
  `};
`;

const MatchLobbyChatWrapper = styled.div`
  height: 100%;
`;
