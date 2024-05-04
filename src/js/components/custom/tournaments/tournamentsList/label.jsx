import React from "react";
import { withTheme } from "styled-components";
import { Paragraph } from "~components/atoms";

const Label = ({ children, theme }) => (
  <Paragraph
    color={theme.colors.grey}
    fontWeight="400"
    fontSize="0.875rem"
    lineHeight="normal"
  >
    {children}
  </Paragraph>
);

export default withTheme(Label);
