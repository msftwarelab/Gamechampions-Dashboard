import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const HeightStyle = css`
  ${props => getMediaStyle({ cssName: "height", value: props.height })};
`;
