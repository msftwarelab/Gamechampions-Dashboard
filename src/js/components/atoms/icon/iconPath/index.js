import { styled } from "~theme";

const IconPathStyle = styled.path`
  stroke-width: 0;
  pointer-events: none;
  ${({ color }) =>
    color
      ? `
      fill: ${color};
      stroke: ${color};
    `
      : `
      fill: currentColor;
      stroke: currentColor;
  `};
`;

export default IconPathStyle;
