import React from "react";
import { styled, media, withTheme } from "~theme";
import { TypographyStyle } from "../../../styles";

import Link from "~components/atoms/link";

const TableCell = ({
  children,
  className,
  url,
  fontSize,
  mobileCellIndex = 1,
  onClick,
  hasMobileHeaders,
  theme,
  isHighlighted
}) => {
  return (
    <TableCellStyle
      className={className}
      fontSize={fontSize}
      mobileCellIndex={mobileCellIndex}
      hasMobileHeaders={hasMobileHeaders}
    >
      {url ? (
        <Link
          color={isHighlighted ? theme.colors.secondary : theme.colors.black}
          to={url}
          onClick={onClick}
        >
          {children}
        </Link>
      ) : (
        children
      )}
    </TableCellStyle>
  );
};

export default withTheme(TableCell);

const TableCellStyle = styled.td`
  ${TypographyStyle};
  width: ${({ hasMobileHeaders }) => (hasMobileHeaders ? "auto" : "100%")};
  padding: 0.375em;
  margin-left: 0;
  text-align: left;
  display: ${({ hasMobileHeaders }) =>
    hasMobileHeaders ? "table-cell" : "none"};

  ${media.md`
  
    padding: 1em;
    display: table-cell;
    text-align: center;
  `};

  &:nth-child(${({ mobileCellIndex }) => mobileCellIndex}) {
    display: table-cell;
  }

  &.table__more {
    display: table-cell;

    ${media.md`
      display: none;
    `};
  }

  &.table__icons {
    text-align: right;
  }

  ${media.md`
    width: auto;
  `};
`;
