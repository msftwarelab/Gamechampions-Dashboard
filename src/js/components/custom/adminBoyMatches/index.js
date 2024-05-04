import React from "react";
import { withTheme, styled } from "~theme";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Pagination, Table } from "~components/molecules";
import { Span, Section } from "~components/atoms";
import { BoyMatchState } from "~service/constants";

const AdminBoyMatchesTable = ({
  matches,
  theme,
  isLoading,
  pagination,
  isMobile,
  onChangePageClick,
  selectedLanguage,
  history
}) => {
  const { t } = useTranslation();

  const tableHeaders = [
    t("PlayerMatchTableFirstColumn"),
    t("AdminBoyMatchesTableUserName"),
    t("AdminBoyMatchesTableGameName"),
    t("AdminBoyMatchesTableBetType"),
    t("AdminBoyMatchesTableBetAmount"),
    t("AdminMatchesTableLastUpdated"),
    t("PlayerMatchTableFifthColumn")
  ];

  const icons = [
    {
      id: 1,
      label: t("PlayersMatchesTableUpdateResult"),
      icon: "pencil",
      disabled: true,
      onClick: (data = {}) => {
        history.push(
          `/${selectedLanguage}/admin-boy-matches/${data.matchId}/update-status`
        );
      }
    }
  ];

  const getMatchList = data => {
    if (!data) {
      return [];
    }
    return data.map(item => {
      const blockedIcons = [];
      if (item.state === BoyMatchState[4]) {
        blockedIcons.push(1);
      }

      return {
        id: item.id,
        userName: item.userName,
        gameName: item.gameName,
        betType: item.betType,
        betAmount: item.betAmount,
        matchId: item.matchId,
        dateUpdated: moment(item.dateUpdated).format("DD/MM/YYYY H:mm:ss"),
        state: item.state,
        blockedIcons
      };
    });
  };

  const renderCell = ({ item, itemKey, isMobile, t, theme }) => {
    if (isMobile) {
      const renderHeader = header => {
        return (
          <Span
            display="inline-block"
            fontWeight={theme.fonts.semiBold}
            minWidth="8rem"
          >
            {header}
          </Span>
        );
      };

      return (
        <>
          <Section>
            {renderHeader(t("PlayerMatchTableFirstColumn"))}
            <Span>{item.id}</Span>
          </Section>
          <Section>
            {renderHeader(t("AdminBoyMatchesTableUserNameMobile"))}
            <Span>{item.userName}</Span>
          </Section>
          <Section>
            {renderHeader(t("AdminBoyMatchesTableGameNameMobile"))}
            <Span>{item.gameName}</Span>
          </Section>
          <Section>
            {renderHeader(t("AdminBoyMatchesTableBetTypeMobile"))}
            <Span>{item.betType}</Span>
          </Section>
          <Section>
            {renderHeader(t("AdminBoyMatchesTableBetAmountMobile"))}
            <Span>{item.betAmount}</Span>
          </Section>
          <Section>
            {renderHeader(t("AdminMatchesTableLastUpdated"))}
            <Span>{item.dateUpdated}</Span>
          </Section>
          <Section>
            {renderHeader(t("PlayerMatchTableFifthColumn"))}
            <Span>{item.state}</Span>
          </Section>
        </>
      );
    }

    return <Span>{item[itemKey]}</Span>;
  };

  return (
    <AdminBoyMatchesTableStyle>
      <Table
        headers={tableHeaders}
        data={getMatchList(matches && matches.toJS())}
        excludedProps={["matchId", "blockedIcons"]}
        isLoading={isLoading}
        icons={icons}
        noResultLabel={t("TableNotFound")}
        title={t("PlayersTableTitle")}
        mobileCellIndex={1}
        urlConstructor={() => {}}
        iconProps={{
          margin: "0 0.25rem 0 0"
        }}
        cellTemplate={props => renderCell({ ...props, isMobile, t, theme })}
      />
      <Pagination
        pagination={pagination}
        onChangePageClick={onChangePageClick}
      />
    </AdminBoyMatchesTableStyle>
  );
};

const AdminBoyMatchesTableStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
`;

export default withTheme(AdminBoyMatchesTable);
