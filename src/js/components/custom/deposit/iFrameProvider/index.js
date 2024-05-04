import React, { useEffect } from "react";
import { default as styled, useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { FlexBox, Heading, Loader, Paragraph } from "~components/atoms";

const IFrameProvider = ({
  displayAmount,
  url,
  onRequestUrl,
  onDepositSessionStart
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  useEffect(() => {
    onDepositSessionStart({ isNewCard: false });
    onRequestUrl();
  }, []);
  return (
    <Wrapper>
      <FlexBox height="100%" flexDirection="column" justifyContent="center">
        <HeaderContainer>
          <Paragraph padding="0" margin="0" color={theme.colors.black}>
            {t("DepositAmount")}
          </Paragraph>
          <Heading margin="0" color={theme.colors.black}>
            {"$" + parseFloat(displayAmount).toFixed(2)}
          </Heading>
        </HeaderContainer>
        <FlexBox
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          {url ? (
            <iframe src={url} width="100%" height="100%" frameBorder="0" />
          ) : (
            <Loader isLoading scale="5rem" />
          )}
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default IFrameProvider;

export const Wrapper = styled.div`
  width: 100%;
  min-height: 40rem;
  margin-top: 0.5em;
`;

export const HeaderContainer = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.gainsboro};
  padding: 1em;
`;
