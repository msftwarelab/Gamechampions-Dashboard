import { styled, media } from "~theme";

export const DropDownList = styled("ul")`
  z-index: 997;
  position: absolute;
  padding: 0;
  margin: 0;
  background: ${({ theme }) => theme.colors.white};
  right: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  border-radius: 3px 3px 0px 0px;

  ${media.md`
  width: 23em;
  right: 1em;
  top:unset;
  height:unset
`};
`;
