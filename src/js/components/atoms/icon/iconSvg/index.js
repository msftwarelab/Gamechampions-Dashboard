import { styled } from "~theme";

const IconSvgStyle = styled.svg`
  display: flex;
  flex-direction: column;
  width: ${({ scale }) => `${scale}rem`};
  height: ${({ scale }) => `${scale}rem`};
  transform: translate3d(0, 0, 0);
  pointer-events: none;
`;

export default IconSvgStyle;
