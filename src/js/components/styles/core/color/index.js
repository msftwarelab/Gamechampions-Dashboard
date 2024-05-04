import { css } from "styled-components";

export const ColorStyle = css`
  ${({ color }) => color && `color: ${color}`};
`;
