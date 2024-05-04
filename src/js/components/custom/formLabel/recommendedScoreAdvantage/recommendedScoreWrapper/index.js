import { styled, media } from "~theme";

export const RecommendedScoreWrapper = styled("div")`
  display: flex;
  justify-content: space-evenly;
  margin: -25px 5px 10px;
  padding: 0.6em 9em;
  font-weight: ${({ theme }) => theme.fonts.bold};
  ${media.md`
    margin: -1.5em 15em 0;
    padding: 0.6em 6em;
`};
`;
