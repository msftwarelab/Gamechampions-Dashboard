import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { default as styled } from "styled-components";
import { FlexBox, Loader, Paragraph } from "~components/atoms";

const HostedPageProvider = ({ url, onRequestUrl, onDepositSessionStart }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const { t } = useTranslation();
  useEffect(() => {
    onDepositSessionStart({ isNewCard: false });
    onRequestUrl();
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft => (timeLeft > 0 ? --timeLeft : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (url && timeLeft < 1) {
      window.location.href = url;
    }
  }, [url, timeLeft]);

  return (
    <FlexBox
      padding="2rem"
      width="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Paragraph margin="1rem 0">
        {t("YouWillBeRedirected", { timeLeft })}
      </Paragraph>
      <Loader isLoading scale="5rem" />
    </FlexBox>
  );
};

export default HostedPageProvider;

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
