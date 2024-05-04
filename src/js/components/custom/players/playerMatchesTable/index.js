import React, { useState } from "react";
import { withTheme, styled } from "~theme";
import { useTranslation } from "react-i18next";
import { Table, Pagination } from "~components/molecules";
import { FlexBox, Span, Section } from "~components/atoms";
import { toPriceString } from "~service/adapter";
import { MatchState } from "~service/constants";
import ExecutionEnvironment from "exenv";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";
import { getParameterByName } from "../../../../util/util";
import { MATCHES_PAGE_SIZE_VALUE } from "~containers/players/constants";
import ConfirmBox from "~components/molecules/confirmBox";

const PlayerMatchesTable = ({
  matches,
  onUpdateAdminCancelChallenge,
  onSetSelectedMatch,
  selectedMatch,
  theme,
  isLoading,
  match,
  games,
  pagination,
  currency,
  isMobile,
  onChangePageClick,
  selectedLanguage,
  history,
  pathname = ""
}) => {
  const { t } = useTranslation();
  const [isConfirmVisible, toggleConfirm] = useState(false);

  const tableHeaders = [
    t("PlayerMatchTableFirstColumn"),
    t("PlayerMatchTableSecondColumn"),
    t("PlayerMatchTableThirdColumn"),
    t("PlayerMatchTableFourthColumn"),
    t("PlayerMatchTableFifthColumn"),
    t("PlayerMatchTableSixthColumn")
  ];

  const page = ExecutionEnvironment.canUseDOM
    ? getParameterByName(PAGE_QUERY_PARAM_NAME)
    : 1;
  const pageSize = ExecutionEnvironment.canUseDOM
    ? getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME)
    : MATCHES_PAGE_SIZE_VALUE;
  const playerId = parseInt(match.params.playerId);

  const icons = [
    {
      id: 1,
      label: t("PlayersMatchesTableUpdateResult"),
      icon: "pencil",
      onClick: (data = {}) => {
        history.push({
          pathname: `/${selectedLanguage}/match-lobby/${data.id}/report-results`,
          state: {
            returnUrl: `${pathname}?${PAGE_QUERY_PARAM_NAME}=${page}&${PAGE_SIZE_QUERY_PARAM_NAME}=${pageSize}`
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

  const getMatchList = (data, games, currency) => {
    if (!data && !games) {
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
        opponentName:
          playerId === item.challengerId
            ? item.defenderName
            : item.challengerName,
        gameName: games.map(game => {
          if (game.get("id") === item.gameId) return game.get("title");
        }),
        prize: toPriceString(item.prize, currency),
        state: item.state,
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
            minWidth="6rem"
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
            {renderHeader(t("FullNameLabel"))}
            <Span>{item.opponentName}</Span>
          </Section>
          <Section>
            {renderHeader(t("PlayerMatchTableFifthColumn"))}
            <Span>{item.state}</Span>
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
    <FlexBox>
      <FlexBox
        color={playerId === item.challengerId ? theme.colors.secondary : null}
        height="1.7em"
        width={{ base: "0.5em", md: "1.5em" }}
        justifyContent="center"
      >
        {item.finalScoreChallenger}
      </FlexBox>
      <Span padding={{ base: "0 5px", md: "0" }}>-</Span>
      <FlexBox
        color={playerId !== item.challengerId ? theme.colors.secondary : null}
        height="1.7em"
        width={{ base: "0.5em", md: "1.5em" }}
        justifyContent="center"
      >
        {item.finalScoreDefender}
      </FlexBox>
    </FlexBox>
  );

  return (
    <PlayerMatchesTableStyle>
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
            playerId: playerId,
            page: pagination && pagination.get("page"),
            pageSize: pagination.get("pageSize")
          });
          toggleConfirm(false);
        }}
      />
      <Table
        headers={tableHeaders}
        data={getMatchList(matches && matches.toJS(), games, currency)}
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
    </PlayerMatchesTableStyle>
  );
};

const PlayerMatchesTableStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

export default withTheme(PlayerMatchesTable);
