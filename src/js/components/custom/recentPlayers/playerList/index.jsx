import React from "react";
import { styled, media, withTheme } from "~theme";
import { Loader } from "~components/atoms";
import Player from "./players";

const PlayerList = ({
  players,
  handleSendChallenge,
  selectedPlayer,
  userId,
  gameId,
  selectedLanguage
}) => {
  return (
    <PlayerListStyle>
      <PlayerListWrapper>
        {players && players.size > 0 ? (
          players.map(n => (
            <Player
              key={n.get("id")}
              player={n}
              handleSendChallenge={handleSendChallenge}
              isButtonClick={n.get("id") === selectedPlayer}
              isSubmit={!!selectedPlayer}
              userId={userId}
              gameId={gameId}
              selectedLanguage={selectedLanguage}
            />
          ))
        ) : (
          <Loader isLoading={true} margin="5rem auto" scale="6rem" />
        )}
      </PlayerListWrapper>
    </PlayerListStyle>
  );
};

export default withTheme(PlayerList);

const PlayerListStyle = styled.div`
  flex: 2;

  ${media.md`
    margin: 0 0.5rem 1rem 0;
  `};
`;

const PlayerListWrapper = styled.ul`
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${media.md`
    color: ${({ theme }) => theme.colors.blackTransparent};
    height: calc(100% - 1rem);
  `};
`;
