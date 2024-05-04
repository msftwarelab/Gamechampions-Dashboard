import React from "react";
import { styled, withTheme } from "~theme";
import { FlexBox } from "~components/atoms";
import { BoxShadowStyle, SizeStyle, SpaceStyle } from "~components/styles";

const WidgetWrapper = ({ theme, title, children, isHalf }) => {
  return (
    <WidgetWrapperStyle
      width={{ base: "100%", md: isHalf ? "304px" : "608px" }}
      height={{ base: "unset", md: "390px" }}
      margin={{ base: "1rem", md: "0.5rem" }}
      boxShadow={theme.boxShadows.primary}
    >
      <FlexBox
        padding="0.5rem 1rem"
        backgroundColor={theme.colors.primary}
        hoverBackgroundColor={theme.colors.primary}
        color={theme.colors.white}
      >
        {title}
      </FlexBox>
      {children}
    </WidgetWrapperStyle>
  );
};

export default withTheme(WidgetWrapper);

const WidgetWrapperStyle = styled.div`
  ${BoxShadowStyle};
  ${SizeStyle};
  ${SpaceStyle};
`;
