import { css } from "styled-components";
import { getMediaStyle } from "../core/media";

export const FlexDirectionStyle = css`
  ${props =>
    getMediaStyle({ cssName: "flex-direction", value: props.flexDirection })};
`;

export const AlignItemsStyle = css`
  ${props =>
    getMediaStyle({ cssName: "align-items", value: props.alignItems })};
`;

export const JustifyContentStyle = css`
  ${props =>
    getMediaStyle({ cssName: "justify-content", value: props.justifyContent })};
`;

export const FlexStyle = css`
  ${props => getMediaStyle({ cssName: "flex", value: props.flex })};
`;

export const FlexWrapStyle = css`
  ${props => getMediaStyle({ cssName: "flex-wrap", value: props.flexWrap })};
`;

export const AlignSelfStyle = css`
  ${props => getMediaStyle({ cssName: "align-self", value: props.alignSelf })};
`;

export const GapStyle = css`
  ${props => getMediaStyle({ cssName: "gap", value: props.gap })};
`;

export const AlignContentStyle = css`
  ${props =>
    getMediaStyle({ cssName: "align-content", value: props.alignContent })};
`;

export const ZIndexStyle = css`
  ${props => getMediaStyle({ cssName: "z-index", value: props.zIndex })};
`;

export const FlexBoxStyle = css`
  ${FlexDirectionStyle};
  ${AlignItemsStyle};
  ${JustifyContentStyle};
  ${AlignContentStyle};
  ${FlexStyle};
  ${FlexWrapStyle};
  ${AlignSelfStyle};
  ${GapStyle};
  ${ZIndexStyle}
`;
