import { styled } from "~theme";

const GameCaption = styled.div`
  display: flex;
  height: 2.75em;
  align-items: center;
  justify-content: center;
  padding: 0 0.5em;
  border-top: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0px 0px 3px 3px;
`;

export default GameCaption;
