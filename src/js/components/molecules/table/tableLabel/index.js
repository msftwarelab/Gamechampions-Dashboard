import React from "react";
import { withTheme } from "~theme";

import TableRow from "../tableRow";
import TableCell from "../tableCell";
import { useTranslation } from "react-i18next";

const TableLabel = ({ label }) => {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell>{t(label)}</TableCell>
    </TableRow>
  );
};

export default withTheme(TableLabel);
