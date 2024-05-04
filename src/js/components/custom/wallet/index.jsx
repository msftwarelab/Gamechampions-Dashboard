import React from "react";
import { Link } from "react-router-dom";
import { styled, media } from "~theme";
import { FlexBox } from "~components/atoms";
import { useTranslation } from "react-i18next";

const Wallet = ({
  amount,
  tabs,
  transactionType,
  transactionStep,
  selectedLanguage,
  steps,
  isLoading
}) => {
  const active = tabs.find(n => n.transactionStep === transactionStep);
  const { t } = useTranslation();

  const isTabDisabled = item => {
    if (isLoading) {
      return true;
    }

    // amount is active restrict, payment and complete steps
    if (active.transactionStep === steps.CHOOSE_AMOUNT) {
      if (
        (item.transactionStep == steps.PAYMENT_METHOD && !amount) ||
        item.transactionStep == steps.COMPLETED
      ) {
        return true;
      }
    } else if (active.transactionStep === steps.PAYMENT_METHOD) {
      if (item.transactionStep == steps.COMPLETED) {
        return true;
      }
    } else if (active.transactionStep === steps.COMPLETED) {
      if (item.transactionStep == steps.PAYMENT_METHOD) {
        return true;
      }
    }
  };

  return (
    <FlexBox flexDirection="column">
      {active && (
        <FlexBox
          width="100%"
          padding={{ base: "0 1rem 1rem 1rem", md: "0 1rem" }}
        >
          {active.component}
        </FlexBox>
      )}
      <TabsWrapper>
        {tabs.map(item => (
          <StyledLink
            key={item.transactionStep}
            to={`/${selectedLanguage}/${transactionType}/${item.transactionStep}`}
            title={item.title}
            selected={item.transactionStep === transactionStep}
            disabled={isTabDisabled(item)}
          >
            {t(item.title)}
          </StyledLink>
        ))}
      </TabsWrapper>
    </FlexBox>
  );
};

export default Wallet;

const TabsWrapper = styled("div")`
  display: flex;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  ${media.md`
    background-color: ${({ theme }) => theme.colors.primary};
  `};
`;

const StyledLink = styled(Link)`
  flex: 1 1 0;
  padding: 1em 0.3em;
  text-align: center;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fonts.xSmall};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.black : theme.colors.darkenColorDark};

  pointer-events: ${({ disabled }) => (disabled ? "none" : "unset")};

  &:visited {
    color: ${({ selected, theme }) =>
      selected ? theme.colors.black : theme.colors.darkenColorDark};
  }

  ${media.md`
    color: ${({ selected, theme }) =>
      selected ? theme.colors.white : theme.colors.lightenColor};

    &:visited {
      color: ${({ selected, theme }) =>
        selected ? theme.colors.white : theme.colors.lightenColor};
    }

    &:hover {
      color: ${({ selected, theme }) =>
        selected ? theme.colors.white : theme.colors.lightenColor};
      background-color: ${({ selected, theme }) =>
        selected ? theme.colors.primary : theme.colors.secondary};  
    }
  `};
`;
