import { css } from "styled-components";
import { PositionStyle } from "../core/position";
import { TopStyle } from "../core/top";
import { BottomStyle } from "../core/bottom";
import { RightStyle } from "../core/right";
import { LeftStyle } from "../core/left";

export const PositioningStyle = css`
  ${PositionStyle};
  ${TopStyle};
  ${BottomStyle};
  ${RightStyle};
  ${LeftStyle};
`;
