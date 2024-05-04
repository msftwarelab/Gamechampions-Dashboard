import React from "react";
import { default as styled, withTheme } from "styled-components";
import {
  ColouringStyle,
  SpaceStyle,
  SizeStyle,
  TypographyStyle,
  DisplayStyle,
  PositioningStyle,
  BorderingStyle,
  OverflowWrapStyle
} from "~components/styles";

const Span = ({
  children,
  className,
  padding,
  color,
  theme,
  fontSize,
  fontWeight,
  textTransform,
  margin,
  minWidth,
  display,
  lineHeight,
  top,
  right,
  left,
  borderWidth,
  borderRadius,
  width,
  height,
  position,
  backgroundColor,
  textDecoration,
  overflowWrap,
  textAlign,
  fontStyle
}) => {
  const { spanTheme } = theme;

  return (
    <SpanStyle
      {...spanTheme}
      className={className}
      padding={padding}
      color={color}
      fontSize={fontSize}
      textTransform={textTransform}
      margin={margin}
      fontWeight={fontWeight}
      minWidth={minWidth}
      display={display}
      lineHeight={lineHeight}
      top={top}
      right={right}
      left={left}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      height={height}
      position={position}
      backgroundColor={backgroundColor}
      textDecoration={textDecoration}
      overflowWrap={overflowWrap}
      textAlign={textAlign}
      fontStyle={fontStyle}
    >
      {children}
    </SpanStyle>
  );
};

export default withTheme(Span);

const SpanStyle = styled.span`
  ${ColouringStyle};
  ${SpaceStyle};
  ${SizeStyle};
  ${TypographyStyle};
  ${DisplayStyle};
  ${PositioningStyle};
  ${BorderingStyle};
  ${OverflowWrapStyle};
`;
