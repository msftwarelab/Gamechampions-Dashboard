import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const FontSizeStyle = css`
  ${props => getMediaStyle({ cssName: "font-size", value: props.fontSize })};
`;
