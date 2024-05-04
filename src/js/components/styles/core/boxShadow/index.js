import { css } from "styled-components";

export const BoxShadowStyle = css`
  ${props => {
    const { boxShadow } = props;

    return css`
      ${boxShadow && `box-shadow: ${boxShadow}`};
    `;
  }};
`;
