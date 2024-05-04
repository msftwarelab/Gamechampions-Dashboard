import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const TextShadowStyle = css`
  ${props =>
    getMediaStyle({ cssName: "text-shadow", value: props.textShadow })};
`;
