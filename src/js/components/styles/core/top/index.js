import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const TopStyle = css`
  ${props => getMediaStyle({ cssName: "top", value: props.top })};
`;
