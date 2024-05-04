import React from "react";
import { withTheme } from "~theme";
import { FlexBox, Span, Icon } from "~components/atoms";

const RankChange = ({ color, icon, rankDifference }) => {
  return (
    <FlexBox flexDirection="row" justifyContent="center" alignItems="center">
      <Icon
        viewBox="0 0 32 32"
        scale="1"
        color={color}
        icon={icon}
        margin="0"
      />
      <Span color={color}>{rankDifference}</Span>
    </FlexBox>
  );
};

export default withTheme(RankChange);
