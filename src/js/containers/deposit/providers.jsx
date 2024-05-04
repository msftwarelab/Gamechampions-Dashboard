import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { asyncComponent } from "~hocs";
import { useTheme } from "styled-components";
import { Loader, FlexBox, Image, Paragraph, Icon } from "~components/atoms";
import IFrameProvider from "~components/custom/deposit/iFrameProvider";
import { Separator } from "~components/molecules";
import { IMAGES_STORAGE_URL } from "~service/constants";
import { PROVIDERS_CONFIGURATION, PROVIDERS_CONTENT } from "./constants";
import HostedPageProvider from "~components/custom/deposit/hostedPageProvider";

const ProviderItem = ({ provider, onClick }) => {
  const theme = useTheme();
  if (!provider) return null;
  return (
    <FlexBox
      onClick={onClick}
      cursor="pointer"
      hoverBackgroundColor={theme.colors.darkenColorLight}
      alignItems="center"
      padding=".5rem 1rem .5rem 1rem"
    >
      {provider.logo && (
        <Image
          width="120px"
          height="40px"
          src={`${IMAGES_STORAGE_URL}${provider.logo}`}
          objectFit="contain"
        />
      )}
      <Paragraph margin="0 2rem">{provider.title}</Paragraph>
      <FlexBox flex={1} justifyContent="end">
        <Icon color={theme.colors.black} scale="1.5" icon="addCircle" />
      </FlexBox>
    </FlexBox>
  );
};

const ProviderContainer = ({
  onRequestUrl,
  onDepositSessionStart,
  paymentProvider = [],
  selectedProvider,
  onSetProvider,
  providerUrl,
  displayAmount
}) => {
  const { t } = useTranslation();
  const ProviderComponent = useMemo(() => {
    const getComponent =
      PROVIDERS_CONFIGURATION[selectedProvider]?.getComponent;
    if (!getComponent) return null;
    return asyncComponent(getComponent);
  }, [selectedProvider]);

  useEffect(() => {
    const areMultipleProvidersAvailable =
      paymentProvider && paymentProvider.length > 1;
    if (paymentProvider && !areMultipleProvidersAvailable) {
      onSetProvider(paymentProvider[0]);
    }
  }, [paymentProvider]);

  if (PROVIDERS_CONFIGURATION[selectedProvider]) {
    const providerConfiguration = PROVIDERS_CONFIGURATION[selectedProvider];
    const providerProps = {
      displayAmount,
      url: providerUrl,
      onRequestUrl,
      onDepositSessionStart
    };

    if (providerConfiguration.isIFrameProvider) {
      return <IFrameProvider {...providerProps} />;
    }
    if (providerConfiguration.isHostedPage) {
      return <HostedPageProvider {...providerProps} />;
    }
    return ProviderComponent ? <ProviderComponent /> : null;
  }

  if (
    !paymentProvider ||
    !paymentProvider.length ||
    paymentProvider.length === 1
  )
    return (
      <FlexBox padding="2rem" width="100%" justifyContent="center">
        <Loader isLoading scale="5rem" />
      </FlexBox>
    );

  return (
    <FlexBox
      flexDirection="column"
      padding={{ base: "0 .5rem", md: "2rem 5rem" }}
      width="100%"
    >
      <Paragraph textAlign="center" margin="0 0 1rem 0">
        {t("SelectPaymentMethod")}
      </Paragraph>
      {paymentProvider.map(x => (
        <React.Fragment key={`payment-provider-${x}`}>
          <ProviderItem
            onClick={() => onSetProvider(x)}
            provider={PROVIDERS_CONTENT[x]}
          />
          <Separator />
        </React.Fragment>
      ))}
    </FlexBox>
  );
};

export default ProviderContainer;
