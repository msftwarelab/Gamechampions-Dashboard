import { css } from "styled-components";
import { getMediaStyle } from "../media";

export const PositionStyle = css`
  ${props => getMediaStyle({ cssName: "position", value: props.position })};
`;
