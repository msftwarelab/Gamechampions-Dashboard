import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const OverflowStyle = css`
  ${props => getMediaStyle({ cssName: "overflow", value: props.overflow })};
`;
