import React from "react";
import { styled, media, withTheme } from "~theme";
import { Table } from "~components/molecules";
import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";
import XpPoints from "~components/custom/matches/match/xpPoints";

export const getFormFields = ({ options, onSelectChange }) => [
  {
    id: 1,
    name: "search",
    options,
    componentType: FIELD_TYPES.DROP_DOWN,
    fieldProps: {
      autoComplete: "off",
      material: true,
      onChange: onSelectChange
    }
  }
];

const tableHeaders = [
  "PlayerStatsGame",
  "PlayerStatsVictory",
  "PlayerStatsDraw",
  "PlayerStatsDefeat",
  "PlayerStatsSkillLevel"
];

const tableMobileHeaders = ["PlayerStatsGame", "PlayerStatsSkillLevel"];

const MatchHistory = ({ playerStats }) => {
  let playerStatsData = playerStats?.toJS().map(d => {
    d.skillLevel = <XpPoints points={d.skillLevel} margin="0" />;
    return d;
  });

  return (
    <MatchHistoryStyle>
      {playerStats && (
        <Table
          headers={tableHeaders}
          mobileHeaders={tableMobileHeaders}
          data={playerStatsData}
          excludedProps={["id", "opponent"]}
          isLoading={false}
          noResultLabel="TableNotFound"
          title="Player Stats table"
        />
      )}
    </MatchHistoryStyle>
  );
};

export default withTheme(MatchHistory);

const MatchHistoryStyle = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: flex-start;
  padding: 1em;
  width: 100%;
  overflow: auto;

  ${media.md`
    width: auto;
    height: 100%;
    border-left: 1px solid #e1e1e1;
    border-right: 1px solid #e1e1e1;
  `};
`;
