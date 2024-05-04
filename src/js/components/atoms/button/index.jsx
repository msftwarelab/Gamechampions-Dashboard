import { Link } from "react-router-dom";
import { styled, withTheme } from "~theme";
import React from "react";
import {
  DisplayStyle,
  SpaceStyle,
  SizeStyle,
  TypographyStyle,
  ColouringStyle,
  FlexBoxStyle,
  FontSizeStyle,
  FontWeightStyle
} from "~components/styles";
import { Loader } from "~components/atoms";

const Button = ({
  isLoading,
  to,
  isDisabled,
  onClick,
  className,
  display,
  padding,
  margin,
  width,
  height,
  color,
  backgroundColor,
  visitedColor,
  hoverColor,
  hoverBackgroundColor,
  activeBackgroundColor,
  border,
  borderColor,
  borderRadius,
  alignSelf,
  boxShadow,
  children,
  fontSize,
  fontStyle,
  fontWeight,
  theme
}) => {
  const { buttonTheme } = theme;
  const { rootTheme, loaderTheme } = buttonTheme;

  if (isLoading) {
    return <Loader {...loaderTheme} />;
  }

  return (
    <ButtonStyle
      {...rootTheme}
      isDisabled={isDisabled}
      display={display || rootTheme.display}
      padding={padding || rootTheme.padding}
      margin={margin || rootTheme.margin}
      width={width || rootTheme.width}
      height={height || rootTheme.height}
      color={color || rootTheme.color}
      backgroundColor={backgroundColor || rootTheme.backgroundColor}
      visitedColor={visitedColor || rootTheme.visitedColor}
      hoverColor={hoverColor || rootTheme.hoverColor}
      activeBackgroundColor={
        activeBackgroundColor || rootTheme.activeBackgroundColor
      }
      hoverBackgroundColor={
        hoverBackgroundColor || rootTheme.hoverBackgroundColor
      }
      alignSelf={alignSelf}
      border={border || rootTheme.border}
      borderColor={borderColor || rootTheme.borderColor}
      borderRadius={borderRadius || rootTheme.borderRadius}
      boxShadow={boxShadow || rootTheme.boxShadow}
      to={to}
      onClick={onClick}
      className={className}
      fontSize={fontSize || rootTheme.fontSize}
      fontStyle={fontStyle}
      fontWeight={fontWeight || rootTheme.fontWeight}
    >
      {children}
    </ButtonStyle>
  );
};

/* eslint-disable no-unused-vars */
const ButtonStyle = styled(
  ({
    activeBackgroundColor,
    activeColor,
    alignSelf,
    boxShadow,
    borderColor,
    borderRadius,
    hoverColor,
    disabledBackgroundColor,
    backgroundColor,
    disabledColor,
    hoverBackgroundColor,
    textTransform,
    visitedColor,
    isDisabled,
    ...rest
  }) => <Link {...rest} />
)`
  ${DisplayStyle};
  ${ColouringStyle};
  ${SpaceStyle};
  ${SizeStyle};
  ${TypographyStyle};
  ${FlexBoxStyle};
  ${FontSizeStyle};
  ${FontWeightStyle};

  border: ${({ border }) => (border ? border : 0)};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : "0.8rem"};
  cursor: pointer;
  line-height: 1.5;
  text-align: center;

  &:visited {
    color: ${({ visitedColor }) => visitedColor};
  }

  &:active {
    background-color: ${({ activeBackgroundColor }) => activeBackgroundColor};
    color: ${({ activeColor }) => activeColor};
  }

  &[disabled],
  &.disabled {
    background-color: ${({ disabledBackgroundColor }) =>
      disabledBackgroundColor};
    color: ${({ disabledColor }) => disabledColor};
  }

  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
    color: ${({ hoverColor }) => hoverColor};
  }

  ${({ isDisabled, disabledBackgroundColor, disabledColor }) =>
    isDisabled &&
    `
    pointer-events: none;
    background-color: ${disabledBackgroundColor};
    color: ${disabledColor};
  `}
`;

export default withTheme(Button);
