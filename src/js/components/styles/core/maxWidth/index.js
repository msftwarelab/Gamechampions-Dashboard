import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const MaxWidthStyle = css`
  ${props => getMediaStyle({ cssName: "max-width", value: props.maxWidth })};
`;
