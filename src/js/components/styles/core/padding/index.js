import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const PaddingStyle = css`
  ${props => getMediaStyle({ cssName: "padding", value: props.padding })};
`;
