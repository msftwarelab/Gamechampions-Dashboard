import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const RightStyle = css`
  ${props => getMediaStyle({ cssName: "right", value: props.right })};
`;
