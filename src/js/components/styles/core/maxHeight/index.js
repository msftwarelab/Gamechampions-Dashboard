import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const MaxHeightStyle = css`
  ${props => getMediaStyle({ cssName: "max-height", value: props.maxHeight })};
`;
