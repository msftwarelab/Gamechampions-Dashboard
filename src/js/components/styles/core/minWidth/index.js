import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const MinWidthStyle = css`
  ${props => getMediaStyle({ cssName: "min-width", value: props.minWidth })};
`;
