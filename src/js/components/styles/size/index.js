import { css } from "styled-components";
import { WidthStyle } from "../core/width";
import { MinWidthStyle } from "../core/minWidth";
import { MaxWidthStyle } from "../core/maxWidth";
import { HeightStyle } from "../core/height";
import { MinHeightStyle } from "../core/minHeight";
import { MaxHeightStyle } from "../core/maxHeight";

export const SizeStyle = css`
  ${WidthStyle};
  ${MinWidthStyle};
  ${MaxWidthStyle};
  ${HeightStyle};
  ${MinHeightStyle};
  ${MaxHeightStyle};
`;
