import React from "react";
import { styled, withTheme } from "~theme";

const ProgressBar = ({ value }) => {
  return (
    <Container>
      <Bar width={value} />
    </Container>
  );
};

const Container = styled("div")`
  width: 100%;
  height: 20px;
  margin-right: 1em;
  background-color: ${({ theme }) => theme.colors.gainsboro};

  box-shadow: inset 0px 4px 5px 0px
    ${({ theme }) => theme.colors.disabledBackgroundColor};

  position: relative;
  overflow: clip;

  transform-origin: bottom left;
  transform: skew(-20deg, 0deg);
`;

const Bar = styled("div")`
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: ${({ width }) => width || "0"}%;

    background: ${({ theme }) => theme.colors.brightGreen};
    background: -moz-linear-gradient(left, ${({ theme }) =>
      theme.colors.brightGreen} 0%, ${({ theme }) =>
  theme.colors.secondary} 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, ${({
      theme
    }) => theme.colors.brightGreen}), color-stop(100%, ${({ theme }) =>
  theme.colors.secondary}));
    background: -webkit-linear-gradient(left, ${({ theme }) =>
      theme.colors.brightGreen} 0%, ${({ theme }) =>
  theme.colors.secondary} 100%);
    background: -o-linear-gradient(left, ${({ theme }) =>
      theme.colors.brightGreen} 0%, ${({ theme }) =>
  theme.colors.secondary} 100%);
    background: -ms-linear-gradient(left, ${({ theme }) =>
      theme.colors.brightGreen} 0%, ${({ theme }) =>
  theme.colors.secondary} 100%);
    background: linear-gradient(to right, ${({ theme }) =>
      theme.colors.brightGreen} 0%, ${({ theme }) =>
  theme.colors.secondary} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${({
      theme
    }) => theme.colors.brightGreen}', endColorstr='${({ theme }) =>
  theme.colors.secondary}', GradientType=1 );
`;

export default withTheme(ProgressBar);
