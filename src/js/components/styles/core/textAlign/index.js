import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const TextAlignStyle = css`
  ${props => getMediaStyle({ cssName: "text-align", value: props.textAlign })};
`;
