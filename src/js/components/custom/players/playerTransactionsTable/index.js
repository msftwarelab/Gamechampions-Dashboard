import React from "react";
import { withTheme, styled } from "~theme";
import { useTranslation } from "react-i18next";
import { Table, Pagination } from "~components/molecules";
import { TransactionState } from "~service/constants";

const PlayerTransactionsTable = ({
  transactions,
  isLoading,
  pagination,
  onChangePageClick,
  onCompleteTransaction,
  playerId
}) => {
  const { t } = useTranslation();

  const icons = [
    {
      id: 1,
      label: t("PlayersTransactionTableConfirmLabel"),
      icon: "done",
      onClick: (data = {}) => {
        const result = confirm(t("PlayersTransactionTableConfirm"));

        if (result) {
          onCompleteTransaction({
            id: playerId,
            txnId: data.id
          });
        }
      }
    }
  ];

  const getTransactionData = () => {
    return transactions.toJS().map(item => {
      const blockedIcons = [];

      if (item.state !== TransactionState[1]) {
        blockedIcons.push(1);
      }

      return {
        ...item,
        blockedIcons
      };
    });
  };

  const tableHeaders = [
    t("PlayerTransactionTableFirstColumn"),
    t("PlayerTransactionTableSecondColumn"),
    t("PlayerTransactionTableThirdColumn"),
    t("PlayerTransactionTableFourthColumn"),
    t("PlayerTransactionTableFifthColumn")
  ];

  return (
    <PlayerTransactionsTableStyle>
      <Table
        headers={tableHeaders}
        data={getTransactionData()}
        excludedProps={["id", "blockedIcons"]}
        isLoading={isLoading}
        noResultLabel={t("TableNotFound")}
        title={t("PlayersTableTitle")}
        mobileCellIndex={1}
        urlConstructor={() => {}}
        icons={icons}
      />
      <Pagination
        pagination={pagination}
        onChangePageClick={onChangePageClick}
      />
    </PlayerTransactionsTableStyle>
  );
};

const PlayerTransactionsTableStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

export default withTheme(PlayerTransactionsTable);
