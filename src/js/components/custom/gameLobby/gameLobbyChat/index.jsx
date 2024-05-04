import { styled, media } from "~theme";

const GameLobbyChat = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadows.primary};
  overflow: hidden;

  ${media.md`
    min-width: 280px;
    width: 100%
  `};
`;

export default GameLobbyChat;
