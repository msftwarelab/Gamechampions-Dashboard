import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const FontTextTransformStyle = css`
  ${props =>
    getMediaStyle({
      cssName: "text-transform",
      value: props.textTransform
    })};
`;
