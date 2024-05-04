import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const WhiteSpaceStyle = css`
  ${props =>
    getMediaStyle({ cssName: "white-space", value: props.whiteSpace })};
`;
