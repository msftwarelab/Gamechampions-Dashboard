import { css } from "styled-components";

export const BorderColorStyle = css`
  ${({ borderColor }) => borderColor && `border-color: ${borderColor}`};
`;
