import { css } from "styled-components";

export const BorderWidthStyle = css`
  ${({ borderWidth }) => borderWidth && `border-width: ${borderWidth}`};
`;
