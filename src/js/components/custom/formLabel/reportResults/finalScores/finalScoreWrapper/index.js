import { styled, media } from "~theme";

export const FinalScoreWrapper = styled("div")`
  background-color: ${({ theme }) => theme.colors.whiteDark};
  text-align: center;
  margin: 4px -16px 12px;
  ${media.md`
  margin: -0.5em -1.5em 0.5em;
`};
`;
