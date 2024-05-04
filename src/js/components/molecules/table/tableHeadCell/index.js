import React from "react";
import { styled, media, withTheme } from "~theme";

const TableHeadCell = ({ children, className, hasMobileHeaders }) => {
  return (
    <TableHeadCellStyle
      className={className}
      hasMobileHeaders={hasMobileHeaders}
    >
      {children}
    </TableHeadCellStyle>
  );
};

export default withTheme(TableHeadCell);

const TableHeadCellStyle = styled.th`
  text-align: left;
  margin-left: 0;
  display: ${({ hasMobileHeaders }) =>
    hasMobileHeaders ? "table-cell" : "none"};
  width: auto;
  padding: 0.375rem;

  ${media.md`
    display: table-cell;
    padding: 1em;
    text-align: center;
  `};
`;
