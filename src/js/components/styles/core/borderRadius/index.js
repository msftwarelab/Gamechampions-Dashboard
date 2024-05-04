import { css } from "styled-components";

export const BorderRadiusStyle = css`
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
`;
