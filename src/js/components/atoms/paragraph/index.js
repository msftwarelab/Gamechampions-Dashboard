import React from "react";
import { default as styled, withTheme } from "styled-components";
import {
  BoxShadowStyle,
  EllipsisStyle,
  SpaceStyle,
  FlexBoxStyle,
  ColouringStyle,
  TypographyStyle,
  DisplayStyle,
  SizeStyle
} from "~components/styles";

const Paragraph = ({
  as,
  children,
  color,
  margin,
  padding,
  lineHeight,
  justifyContent,
  fontSize,
  fontWeight,
  fontStyle,
  boxShadow,
  textAlign,
  textTransform,
  onClick,
  className,
  showEllipsis,
  display,
  width,
  theme,
  dangerouslySetInnerHTML
}) => {
  const { paragraphTheme } = theme;

  return (
    <ParagraphStyle
      {...paragraphTheme}
      as={as}
      margin={margin || "0"}
      padding={padding}
      lineHeight={lineHeight}
      color={color}
      justifyContent={justifyContent}
      fontSize={fontSize}
      showEllipsis={showEllipsis}
      fontWeight={fontWeight}
      fontStyle={fontStyle}
      boxShadow={boxShadow}
      textAlign={textAlign}
      textTransform={textTransform}
      className={className}
      onClick={onClick}
      display={display}
      width={width}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </ParagraphStyle>
  );
};

export default withTheme(Paragraph);

const ParagraphStyle = styled.p`
  ${FlexBoxStyle};
  ${ColouringStyle};
  ${BoxShadowStyle};
  ${SpaceStyle};
  ${TypographyStyle};
  ${EllipsisStyle};
  ${DisplayStyle};
  ${SizeStyle};
`;
