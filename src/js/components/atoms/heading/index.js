import React from "react";
import { default as styled } from "styled-components";
import {
  FlexBoxStyle,
  BoxShadowStyle,
  SpaceStyle,
  ColouringStyle,
  TypographyStyle,
  SizeStyle,
  DisplayStyle
} from "~components/styles";

const Heading = ({
  as,
  children,
  display,
  flexDirection,
  color,
  backgroundColor,
  margin,
  padding,
  fontSize,
  fontWeight,
  textTransform,
  boxShadow,
  alignItems,
  justifyContent,
  height,
  onClick,
  className,
  textAlign,
  flex,
  lineHeight
}) => {
  return (
    <HeadingStyle
      as={as}
      margin={margin}
      padding={padding}
      display={display}
      flexDirection={flexDirection}
      color={color}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textTransform={textTransform}
      boxShadow={boxShadow}
      alignItems={alignItems}
      justifyContent={justifyContent}
      height={height}
      textAlign={textAlign}
      flex={flex}
      className={className}
      onClick={onClick}
      lineHeight={lineHeight}
    >
      {children}
    </HeadingStyle>
  );
};

export default Heading;

const HeadingStyle = styled.h1`
  ${DisplayStyle};
  ${FlexBoxStyle};
  ${ColouringStyle};
  ${BoxShadowStyle};
  ${SpaceStyle};
  ${SizeStyle};
  ${TypographyStyle};
`;
