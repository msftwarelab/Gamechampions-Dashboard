import { styled, media } from "~theme";

export const ChatWrapper = styled("div")`
  display: flex;
  position: fixed;
  z-index: 999999;
  top: 50%;
  left: 50%;
  flex-direction: column;
  width: 100%;
  max-width: 48em;
  height: 100%;
  transform: translate3d(-50%, -50%, 0);
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadows.primary};
  overflow: hidden;

  ${media.md`
  max-width: 16em;
  top : unset; 
  right: 18em;
  bottom: 0;
  left : unset;
  width: 16em;
  height: ${props => (props.isVisible ? "20em" : "2.6em")};
  transform: unset
`};
`;
