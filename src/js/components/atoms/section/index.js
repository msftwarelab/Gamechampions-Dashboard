import React from "react";
import { default as styled, withTheme } from "styled-components";
import {
  SpaceStyle,
  SizeStyle,
  ColouringStyle,
  TypographyStyle
} from "~components/styles";

const Section = ({
  children,
  margin,
  padding,
  color,
  fontSize,
  fontWeight,
  dangerouslySetInnerHTML,
  onClick,
  className,
  width,
  heigth,
  theme
}) => {
  const { sectionTheme } = theme;

  return (
    <SectionStyle
      {...sectionTheme}
      margin={margin}
      padding={padding}
      width={width}
      heigth={heigth}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      className={className}
      onClick={onClick}
    >
      {children}
    </SectionStyle>
  );
};

export default withTheme(Section);

const SectionStyle = styled.section`
  ${SpaceStyle};
  ${SizeStyle};
  ${ColouringStyle};
  ${TypographyStyle};
`;
