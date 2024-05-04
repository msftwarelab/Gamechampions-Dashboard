import { css } from "styled-components";

import { BorderColorStyle } from "../core/borderColor";
import { BorderWidthStyle } from "../core/borderWidth";
import { BorderStyleStyle } from "../core/borderStyle";
import { BorderRadiusStyle } from "../core/borderRadius";

export const BorderingStyle = css`
  ${BorderColorStyle};
  ${BorderWidthStyle};
  ${BorderStyleStyle};
  ${BorderRadiusStyle};
`;
