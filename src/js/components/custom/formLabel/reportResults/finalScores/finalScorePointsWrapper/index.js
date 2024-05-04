import { styled, media } from "~theme";

export const FinalScorePointsWrapper = styled("div")`
  display: flex;
  justify-content: space-evenly;
  margin: -25px 5px 10px;
  padding: 0.6em 9em;
  font-size: 1.5em;
  font-weight: ${({ theme }) => theme.fonts.bold};
  ${media.md`
    padding: 0.6em 13em;
`};
`;
