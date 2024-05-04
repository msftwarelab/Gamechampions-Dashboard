import React from "react";
import { styled, withTheme } from "~theme";
import { FontSizeStyle, DisplayStyle, FlexBoxStyle } from "~components/styles";
import { Span, Image } from "~components/atoms";

const GamerTag = ({ tag }) => (
  <GamerTagStyle fontSize="1rem" display="flex" alignItems="center">
    <Image src={tag.get("iconUrl")} width="20px" margin="0 0.5em 0 0" />
    <Span color="black">{tag.get("title")}</Span>
  </GamerTagStyle>
);

const GamerTagStyle = styled.li`
  ${FontSizeStyle};
  ${DisplayStyle};
  ${FlexBoxStyle};
`;

export default withTheme(GamerTag);
