import React from "react";
import { styled, media, withTheme } from "~theme";
import { Pagination, Table } from "~components/molecules";
import { Paragraph, Button, Icon, FlexBox } from "~components/atoms";
import Link from "~components/atoms/link";
import { toPriceString } from "~service/adapter";
import { useTranslation } from "react-i18next";

const TransactionHistory = ({
  data,
  availableAmount,
  currency,
  theme,
  selectedLanguage,
  isLoading,
  pagination,
  onChangePageClick
}) => {
  const tableHeaders = [
    "TransactionHistoryTypeTitle",
    "TransactionHistoryDateTableTitle",
    "TransactionHistoryBalanceTableTitle",
    "TransactionHistoryAmountTableTitle",
    "TransactionHistoryStatusTableTitle"
  ];

  const newData = data.map(element => {
    const newBalance = toPriceString(element.get("balance"), currency);
    const newAmount = toPriceString(element.get("amount"), currency);
    return element.set("amount", newAmount).set("balance", newBalance);
  });

  const { t } = useTranslation();
  return (
    <TransactionHistoryDiv>
      <h2>{t("TransactionHistoryTitle")}</h2>
      <HeaderStyled>
        <FlexBox
          margin="-1em 1em"
          justifyContent="center"
          alignItems="center"
          padding={{ base: "2em", md: "1em" }}
        >
          <Paragraph>
            {t("TransactionHistoryAccountBalancesParagraph")}
          </Paragraph>
          <Paragraph fontWeight="bold">
            &nbsp;{toPriceString(availableAmount, currency)}
          </Paragraph>
        </FlexBox>
        <FlexBox
          flexDirection={{
            base: "column",
            md: "row"
          }}
        >
          <Button
            to={{
              pathname: `/${selectedLanguage}/deposit/choose-amount`,
              state: {
                returnUrl: `/${selectedLanguage}/my-account/transaction-history`
              }
            }}
            padding="0.5rem 1rem"
            margin="1em auto"
          >
            {t("AddMoneyParagraph")}
          </Button>
          <Link
            to={{
              pathname: `/${selectedLanguage}/withdrawal/choose-amount`,
              state: {
                returnUrl: `/${selectedLanguage}/my-account/transaction-history`
              }
            }}
            padding="1.3em 1em"
          >
            <FlexBox justifyContent="center">
              <Icon color={theme.colors.darkenColorDark} icon="download" />
              <Paragraph
                fontSize={theme.fonts.small}
                fontWeight={theme.fonts.semiBold}
              >
                {t("WithdrawParagraph")}
              </Paragraph>
            </FlexBox>
          </Link>
        </FlexBox>
      </HeaderStyled>
      {newData && (
        <Table
          headers={tableHeaders}
          data={newData.toJS()}
          excludedProps={["id", "transactionId"]}
          isLoading={isLoading}
          noResultLabel="NoDataFound"
          title="Transaction History"
          urlConstructor={item => {
            return `/${selectedLanguage}/transaction-details/${item.id}/view`;
          }}
        />
      )}
      <Pagination
        pagination={pagination}
        onChangePageClick={onChangePageClick}
      />
    </TransactionHistoryDiv>
  );
};

export default withTheme(TransactionHistory);

export const TransactionHistoryDiv = styled("div")`
  overflow: auto;
  padding: 0 1rem;
`;

export const HeaderStyled = styled("div")`
  display: block;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.darkenFontColorLight};
  margin: 3% auto;
  width: 100%;
  ${media.md`
    display: flex;
  `};
`;
