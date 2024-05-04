import { css } from "styled-components";
import { FontSizeStyle } from "../core/fontSize";
import { FontTextTransformStyle } from "../core/fontTextTransform";
import { FontWeightStyle } from "../core/fontWeight";
import { FontStyle } from "../core/fontStyle";
import { WhiteSpaceStyle } from "../core/whiteSpace";
import { TextAlignStyle } from "../core/textAlign";
import { LineHeightStyle } from "../core/lineHeight";
import { TextDecoration } from "../core/textDecoration";
import { TextTransform } from "../core/textTransform";
import { TextShadowStyle } from "../core/textShadow";

export const TypographyStyle = css`
  ${FontSizeStyle};
  ${FontTextTransformStyle};
  ${FontWeightStyle};
  ${FontStyle};
  ${TextShadowStyle}
  ${WhiteSpaceStyle};
  ${TextAlignStyle};
  ${LineHeightStyle};
  ${TextDecoration};
  ${TextTransform};
`;
