import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const FontWeightStyle = css`
  ${props =>
    getMediaStyle({ cssName: "font-weight", value: props.fontWeight })};
`;
