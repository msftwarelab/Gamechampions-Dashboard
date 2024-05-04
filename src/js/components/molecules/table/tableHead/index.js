import React from "react";
import { styled, media, withTheme } from "~theme";
import { ColouringStyle } from "../../../styles";

const TableHead = ({ children, title, theme }) => {
  const { tableTheme } = theme;
  const { headTheme } = tableTheme;

  return (
    <TableHeadStyle {...headTheme} title={title}>
      {children}
    </TableHeadStyle>
  );
};

export default withTheme(TableHead);

const TableHeadStyle = styled.thead`
  text-transform: uppercase;

  &::before {
    ${ColouringStyle};

    display: ${({ title }) => (title ? "block" : "none")};
    box-sizing: border-box;
    padding: 1em 0.5em;
    content: attr(title);
    font-weight: bold;

    ${media.md`
      display: none;
    `};
  }
`;
