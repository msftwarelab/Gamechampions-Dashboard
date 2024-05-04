import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const LineHeightStyle = css`
  ${props =>
    getMediaStyle({ cssName: "line-height", value: props.lineHeight })};
`;
