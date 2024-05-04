import React, { useState } from "react";
import { withTheme, styled } from "~theme";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Pagination, Table } from "~components/molecules";
import { FlexBox, Span, Section } from "~components/atoms";
import { toPriceString } from "~service/adapter";
import { MatchState } from "~service/constants";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";
import ConfirmBox from "~components/molecules/confirmBox";

const AdminMatchesTable = ({
  matches,
  onUpdateAdminCancelChallenge,
  onSetSelectedMatch,
  selectedMatch,
  type,
  theme,
  isLoading,
  pagination,
  currency,
  isMobile,
  onChangePageClick,
  selectedLanguage,
  history
}) => {
  const { t } = useTranslation();
  const [isConfirmVisible, toggleConfirm] = useState(false);

  const tableHeaders = [
    t("PlayerMatchTableFirstColumn"),
    t("AdminMatchesTableChallengerName"),
    t("AdminMatchesTableDefenderName"),
    t("PlayerMatchTableThirdColumn"),
    t("PlayerMatchTableFourthColumn"),
    t("AdminMatchesTableLastUpdated"),
    t("PlayerMatchTableSixthColumn")
  ];

  const page = pagination && pagination.get("page");
  const pageSize = pagination && pagination.get("pageSize");

  const icons = [
    {
      id: 1,
      label: t("PlayersMatchesTableUpdateResult"),
      icon: "pencil",
      onClick: (data = {}) => {
        history.push({
          pathname: `/${selectedLanguage}/match-lobby/${data.id}/report-results`,
          state: {
            returnUrl: `/${selectedLanguage}/admin-matches?${PAGE_QUERY_PARAM_NAME}=${page}&${PAGE_SIZE_QUERY_PARAM_NAME}=${pageSize}`
          }
        });
      }
    },
    {
      id: 2,
      label: t("CancelMatch"),
      icon: "delete",
      onClick: (data = {}) => {
        onSetSelectedMatch(
          matches && matches.find(match => match.get("id") == data.id)
        );
        toggleConfirm(true);
      }
    }
  ];

  const getMatchList = data => {
    if (!data) {
      return [];
    }
    return data.map(item => {
      const blockedIcons = [];

      if (
        item.state == MatchState[1] ||
        item.state == MatchState[5] ||
        item.state == MatchState[8]
      ) {
        blockedIcons.push(1);
      }

      if (item.state == MatchState[5] || item.state == MatchState[8]) {
        blockedIcons.push(2);
      }

      return {
        id: item.id,
        challengerName: item.challengerName,
        defenderName: item.defenderName ? item.defenderName : "",
        gameTitle: item.gameTitle,
        prize: toPriceString(item.prize, currency),
        dateUpdated: moment(item.dateUpdated).format("DD/MM/YYYY H:mm:ss"),
        finalScore: renderFinalScore(item),
        blockedIcons,
        challengerId: item.challengerId,
        finalScoreChallenger: item.finalScoreChallenger,
        finalScoreDefender: item.finalScoreDefender
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
            {renderHeader(t("AdminMatchesTableChallengerNameMobile"))}
            <Span>{item.challengerName}</Span>
          </Section>
          <Section>
            {renderHeader(t("AdminMatchesTableDefenderNameMobile"))}
            <Span>{item.defenderName}</Span>
          </Section>
          <Section>
            {renderHeader(t("AdminMatchesTableLastUpdated"))}
            <Span>{item.dateUpdated}</Span>
          </Section>
          <FlexBox>
            {renderHeader(t("PlayerMatchTableSixthColumn"))}
            <Span>{renderFinalScore(item)}</Span>
          </FlexBox>
        </>
      );
    }

    return <Span>{item[itemKey]}</Span>;
  };

  const renderFinalScore = item => (
    <FlexBox justifyContent="center">
      <FlexBox
        color={theme.colors.secondary}
        height="1.7em"
        width={{ base: "0.5em", md: "1.5em" }}
        justifyContent="center"
      >
        {item.finalScoreChallenger}
      </FlexBox>
      <Span padding={{ base: "0 5px", md: "0" }}>-</Span>
      <FlexBox
        color={theme.colors.secondary}
        height="1.7em"
        width={{ base: "0.5em", md: "1.5em" }}
        justifyContent="center"
      >
        {item.finalScoreDefender}
      </FlexBox>
    </FlexBox>
  );

  return (
    <AdminMatchesTableStyle>
      <ConfirmBox
        isVisible={isConfirmVisible}
        title={t("SureToDeletePlayerMatch", {
          matchId: selectedMatch && selectedMatch.get("id")
        })}
        onCancel={() => {
          toggleConfirm(false);
        }}
        onConfirm={() => {
          onUpdateAdminCancelChallenge({
            matchId: selectedMatch.get("id"),
            type: type,
            page: pagination && pagination.get("page"),
            pageSize: pagination.get("pageSize")
          });
          toggleConfirm(false);
        }}
      />
      <Table
        headers={tableHeaders}
        data={getMatchList(matches && matches.toJS())}
        excludedProps={[
          "blockedIcons",
          "challengerId",
          "finalScoreChallenger",
          "finalScoreDefender"
        ]}
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
    </AdminMatchesTableStyle>
  );
};

const AdminMatchesTableStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
`;

export default withTheme(AdminMatchesTable);
