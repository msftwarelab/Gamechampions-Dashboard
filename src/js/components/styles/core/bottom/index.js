import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const BottomStyle = css`
  ${props => getMediaStyle({ cssName: "bottom", value: props.bottom })};
`;
