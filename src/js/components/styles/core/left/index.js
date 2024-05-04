import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const LeftStyle = css`
  ${props => getMediaStyle({ cssName: "left", value: props.left })};
`;
