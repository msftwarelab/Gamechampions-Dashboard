import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const TextDecoration = css`
  ${props =>
    getMediaStyle({ cssName: "text-decoration", value: props.textDecoration })};
`;
