import { styled, media } from "~theme";

export const ChatMinimiseButton = styled.div`
  display: none;
  ${media.md`
  display : block;
  padding: 3px 0 0 0;
`};
`;
