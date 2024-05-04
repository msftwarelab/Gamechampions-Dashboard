import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { default as styled, withTheme } from "styled-components";
import {
  ColouringStyle,
  TypographyStyle,
  FlexBoxStyle,
  PaddingStyle,
  SizeStyle,
  DisplayStyle
} from "../../styles";

const Link = ({
  to,
  target = null,
  rel = null,
  children,
  color,
  fontSize,
  textTransform,
  margin,
  padding,
  width,
  onClick,
  display,
  alignItems,
  justifyContent,
  className,
  theme
}) => {
  const { linkTheme } = theme;

  return (
    <LinkStyle
      {...linkTheme}
      to={to}
      target={target}
      rel={rel}
      onClick={onClick}
      color={color || linkTheme.color}
      display={display || linkTheme.display}
      alignItems={alignItems || linkTheme.alignItems}
      justifyContent={justifyContent || linkTheme.justifyContent}
      margin={margin || linkTheme.margin}
      padding={padding || linkTheme.padding}
      width={width || linkTheme.width}
      fontSize={fontSize}
      textTransform={textTransform}
      className={className}
    >
      {children}
    </LinkStyle>
  );
};

/* eslint-disable no-unused-vars */
const LinkStyle = styled(
  ({ alignItems, textTransform, justifyContent, ...rest }) => (
    <RouterLink {...rest} />
  )
)`
  ${DisplayStyle};
  ${FlexBoxStyle};
  ${ColouringStyle};
  ${TypographyStyle};
  ${PaddingStyle}
  ${SizeStyle};
  &:visited,
  &:hover,
  &:active {
    ${ColouringStyle};
  }
`;

export default withTheme(Link);
