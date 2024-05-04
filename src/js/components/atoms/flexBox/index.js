import React from "react";
import { default as styled } from "styled-components";
import {
  BoxShadowStyle,
  SpaceStyle,
  ColouringStyle,
  TypographyStyle,
  FlexBoxStyle,
  SizeStyle,
  DisplayStyle,
  PositioningStyle,
  BorderingStyle,
  OverflowStyle
} from "~components/styles";

const FlexBox = ({
  as,
  children,
  flexDirection,
  alignItems,
  justifyContent,
  alignContent,
  flex,
  flexWrap,
  alignSelf,
  width,
  maxWidth,
  minWidth,
  margin,
  padding,
  color,
  backgroundColor,
  fontSize,
  fontWeight,
  fontStyle,
  textShadow,
  textTransform,
  textAlign,
  boxShadow,
  onClick,
  maxHeight,
  height,
  className,
  cursor,
  hoverBackgroundColor,
  opacity,
  dangerouslySetInnerHTML,
  display,
  gap,
  position,
  borderRadius,
  borderColor,
  borderWidth,
  borderStyle,
  minHeight,
  top,
  bottom,
  left,
  right,
  lineHeight,
  zIndex,
  overflow
}) => {
  return (
    <FlexBoxStyled
      cursor={cursor}
      as={as}
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      alignContent={alignContent}
      flex={flex}
      flexWrap={flexWrap}
      alignSelf={alignSelf}
      textAlign={textAlign}
      width={width}
      height={height}
      maxWidth={maxWidth}
      minWidth={minWidth}
      maxHeight={maxHeight}
      margin={margin}
      padding={padding}
      color={color}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontStyle={fontStyle}
      textShadow={textShadow}
      textTransform={textTransform}
      boxShadow={boxShadow}
      className={className}
      onClick={onClick}
      hoverBackgroundColor={hoverBackgroundColor}
      opacity={opacity}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      display={display}
      gap={gap}
      position={position}
      borderRadius={borderRadius}
      minHeight={minHeight}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderStyle={borderStyle}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      lineHeight={lineHeight}
      zIndex={zIndex}
      overflow={overflow}
    >
      {children}
    </FlexBoxStyled>
  );
};

export default FlexBox;

const FlexBoxStyled = styled.div`
  display: flex;
  cursor: ${({ cursor }) => (cursor ? cursor : "unset")};
  opacity: ${({ opacity }) => opacity};
  ${DisplayStyle};
  ${FlexBoxStyle};
  ${ColouringStyle};
  ${BoxShadowStyle};
  ${SpaceStyle};
  ${SizeStyle};
  ${TypographyStyle};
  ${PositioningStyle};
  ${BorderingStyle};
  ${OverflowStyle}

  &:hover {
    background-color: ${({ hoverBackgroundColor }) =>
      hoverBackgroundColor ? hoverBackgroundColor : "unset"};
  }
`;
