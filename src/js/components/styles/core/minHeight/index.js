import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const MinHeightStyle = css`
  ${props => getMediaStyle({ cssName: "min-height", value: props.minHeight })};
`;
