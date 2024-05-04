import React from "react";
import { styled, media, withTheme } from "~theme";
import { Pagination, Table } from "~components/molecules";
import { toPriceString } from "~service/adapter";
import { useTranslation } from "react-i18next";
import { FlexBox, Paragraph } from "~components/atoms";

const BonusTransactionHistory = ({
  data,
  currency,
  selectedLanguage,
  bonusMoney,
  isLoading,
  pagination,
  onChangePageClick
}) => {
  const tableHeaders = [
    "TransactionHistoryTypeTitle",
    "TransactionHistoryDateTableTitle",
    "TransactionHistoryTransactionIdTableTitle",
    "TransactionHistoryAmountTableTitle",
    ""
  ];

  const newData = data.map(element => {
    const newBalance = toPriceString(element.get("balance"), currency);
    const newAmount = toPriceString(element.get("amount"), currency);
    return element.set("amount", newAmount).set("balance", newBalance);
  });
  const { t } = useTranslation();
  return (
    <BonusTransactionHistoryDiv>
      <h2>{t("BonusTransactionHistoryTitle")}</h2>
      <HeaderStyled>
        <FlexBox
          margin="-1em 1em"
          justifyContent="center"
          alignItems="center"
          padding={{ base: "2em", md: "1em" }}
        >
          <Paragraph>{t("AccountBalancesParagraph")}:</Paragraph>
          <Paragraph fontWeight="bold">
            &nbsp;{toPriceString(bonusMoney, currency)}
          </Paragraph>
        </FlexBox>
      </HeaderStyled>
      {newData && (
        <Table
          headers={tableHeaders}
          data={newData.toJS()}
          excludedProps={["id"]}
          isLoading={isLoading}
          noResultLabel="NoDataFound"
          title="Bonus Transaction History"
          urlConstructor={item => {
            return `/${selectedLanguage}/bonus-transaction-details/${item.id}/`;
          }}
        />
      )}
      <Pagination
        pagination={pagination}
        onChangePageClick={onChangePageClick}
      />
    </BonusTransactionHistoryDiv>
  );
};

export default withTheme(BonusTransactionHistory);

export const BonusTransactionHistoryDiv = styled("div")`
  overflow: auto;
  padding: 0 1rem;
`;

export const HeaderStyled = styled("div")`
  display: block;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.darkenFontColorLight};
  margin: 3% auto;
  width: 100%;
  height: 4em;
  ${media.md`
    display: flex;
  `};
`;
