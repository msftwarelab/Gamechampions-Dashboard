import React from "react";
import { styled, withTheme } from "~theme";
import { Heading } from "~components/atoms";
import { useTranslation } from "react-i18next";

const UrlDiv = ({ url, theme, watch, mediumQueryParamName }) => {
  const baseUrl = watch("destinationUrl");
  const medium = watch("medium");
  const source = watch("source");
  const { t } = useTranslation();

  return (
    <UrlDivStile>
      <Heading fontWeight={theme.fonts.semiBold} fontSize="1rem">
        {t("LongUrl")}
      </Heading>
      {baseUrl && source ? (
        medium ? (
          <Heading fontWeight={theme.fonts.semiBold} fontSize="1rem">
            {baseUrl + source + mediumQueryParamName + medium.toLowerCase()}
          </Heading>
        ) : (
          <Heading fontWeight={theme.fonts.semiBold} fontSize="1rem">
            {baseUrl + source}
          </Heading>
        )
      ) : (
        <Heading fontWeight={theme.fonts.semiBold} fontSize="1rem">
          {url}
        </Heading>
      )}
    </UrlDivStile>
  );
};

const UrlDivStile = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkenColor};
`;

export default withTheme(UrlDiv);
