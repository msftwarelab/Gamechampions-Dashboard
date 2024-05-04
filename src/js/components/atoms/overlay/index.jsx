import { styled } from "~theme";

const Overlay = styled.div`
  position: absolute;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : "0")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme, light }) =>
    light ? theme.colors.white : theme.colors.black};
  opacity: ${({ opacity }) => (opacity ? opacity : ".5")};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius}` : ""};
`;

export default Overlay;
