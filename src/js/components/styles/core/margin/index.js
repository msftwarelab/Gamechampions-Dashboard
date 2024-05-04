import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const MarginStyle = css`
  ${props => getMediaStyle({ cssName: "margin", value: props.margin })};
`;
