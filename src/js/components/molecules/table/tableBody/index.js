import React from "react";
import { styled, withTheme } from "~theme";

import TableLabel from "../tableLabel";

const getBodyChild = ({
  children,
  isLoading,
  noResultFound,
  noResultLabel
}) => {
  if (isLoading) {
    return <TableLabel label="TableLoading" />;
  } else if (noResultFound) {
    return <TableLabel label={noResultLabel} />;
  } else {
    return children;
  }
};

const TableBody = ({ children, isLoading, noResultFound, noResultLabel }) => {
  return (
    <TableBodyStyle>
      {getBodyChild({ children, isLoading, noResultFound, noResultLabel })}
    </TableBodyStyle>
  );
};

export default withTheme(TableBody);

const TableBodyStyle = styled.tbody``;
