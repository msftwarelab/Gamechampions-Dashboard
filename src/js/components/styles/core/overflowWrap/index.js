import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const OverflowWrapStyle = css`
  ${props =>
    getMediaStyle({ cssName: "overflow-wrap", value: props.overflowWrap })};
`;
