import { css } from "styled-components";

export const BorderStyleStyle = css`
  ${({ borderStyle }) => borderStyle && `border-style: ${borderStyle}`};
`;
