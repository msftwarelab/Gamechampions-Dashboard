import { css } from "styled-components";

export const EllipsisStyle = css`
  ${({ showEllipsis }) =>
    showEllipsis &&
    `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`};
`;
