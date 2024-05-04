import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const DisplayStyle = css`
  ${props => getMediaStyle({ cssName: "display", value: props.display })};
`;
