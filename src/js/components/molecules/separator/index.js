import React from "react";
import { styled, withTheme } from "~theme";
import { Heading } from "~components/atoms";
import { withTranslation } from "react-i18next";

const Separator = ({ heading, theme, t }) => {
  return (
    <SeparatorStyle>
      {heading && (
        <Heading fontWeight={theme.fonts.semiBold} fontSize="1rem">
          {t(heading)}
        </Heading>
      )}
    </SeparatorStyle>
  );
};

const SeparatorStyle = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkenColor};
`;

export default withTheme(withTranslation()(Separator));
