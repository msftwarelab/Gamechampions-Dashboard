import React from "react";
import { styled, withTheme } from "~theme";
import { ColouringStyle, TypographyStyle } from "../../../styles";

const TableHeadRow = ({ children, theme, fontSize }) => {
  const { tableTheme } = theme;
  const { headRowTheme } = tableTheme;

  return (
    <TableHeadRowStyle {...headRowTheme} fontSize={fontSize}>
      {children}
    </TableHeadRowStyle>
  );
};

export default withTheme(TableHeadRow);

const TableHeadRowStyle = styled.tr`
  ${ColouringStyle};
  ${TypographyStyle};

  position: relative;
  display: table-row;
  pointer-events: none;
`;
