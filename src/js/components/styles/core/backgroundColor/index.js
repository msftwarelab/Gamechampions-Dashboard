import { css } from "styled-components";

export const BackgroundColorStyle = css`
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor}`};
`;
