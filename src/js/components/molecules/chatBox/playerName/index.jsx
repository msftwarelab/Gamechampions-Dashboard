import { styled } from "~theme";

const PlayerName = styled.div`
  color: ${({ theme }) => theme.colors.black};
  padding: 0 1em;
  font-size: 0.8em;
  ${({ isFromSender }) =>
    isFromSender
      ? `
      text-align: right;
  `
      : `
      text-align: left;
  `}
`;

export default PlayerName;
