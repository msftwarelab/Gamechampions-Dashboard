import React from "react";
import { styled, media, withTheme } from "~theme";

const TableRow = ({
  children,
  theme,
  hasMobileHeaders,
  disabled,
  hasSeparator
}) => {
  const { tableTheme } = theme;
  const { rowTheme } = tableTheme;
  return (
    <TableRowStyle
      {...rowTheme}
      disabled={disabled}
      hasMobileHeaders={hasMobileHeaders}
      hasSeparator={hasSeparator}
    >
      {children}
    </TableRowStyle>
  );
};

export default withTheme(TableRow);

const TableRowStyle = styled.tr`
  position: relative;
  display: ${({ hasMobileHeaders }) =>
    hasMobileHeaders ? "table-row" : "block"};
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.disabledColor : theme.colors.black};
  &:nth-child(2n) {
    background-color: ${({ secondBackgroundColor }) =>
      secondBackgroundColor || ""};
  }

  ${media.md`
    display: table-row;

    &:hover,
    &:active {
      background-color: ${({ hoverBackgroundColor }) =>
        hoverBackgroundColor || ""};
    }
  `};

  ${({ hasSeparator, theme }) =>
    hasSeparator
      ? `border: 1px solid ${theme.colors.secondary}; border-width: 0 0 4px 0;
         box-shadow: 0px 15px 34px -10px rgba(0,0,0,0.75); `
      : ""};
`;
