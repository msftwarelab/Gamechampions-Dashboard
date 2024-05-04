import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const WidthStyle = css`
  ${props => getMediaStyle({ cssName: "width", value: props.width })};
`;
