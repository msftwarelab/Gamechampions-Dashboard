import { styled, media } from "~theme";

const MatchLobbyChat = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadows.primary};
  overflow: hidden;
  border-radius: 1rem;

  ${media.md`
    min-width: 26.5rem;
  `};
`;

export default MatchLobbyChat;
