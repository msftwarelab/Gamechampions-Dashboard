import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const FontStyle = css`
  ${props => getMediaStyle({ cssName: "font-style", value: props.fontStyle })};
`;
