import React from "react";
import { styled, media, withTheme } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import { Table } from "~components/molecules";
import GameLobby from "~containers/gameLobby";
import { toPriceString } from "~service/adapter";
import { Icon } from "~components/atoms";
import { useTranslation } from "react-i18next";

const renderStars = (starsCount, color, inactive) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (starsCount >= i + 1) {
      stars.push(<Icon key={i} scale={1.5} color={color} icon="stars" />);
    } else {
      stars.push(
        <Icon key={i} scale={1.5} color={inactive} icon="stars_outline" />
      );
    }
  }
  return stars;
};

const getLeaderBoardsList = (isMobile, data, currency, active, inactive) => {
  if (!data) {
    return [];
  }
  if (isMobile)
    return data.map(item => ({
      id: item.id,
      rank: item.rank,
      userName: item.userName,
      xp: renderStars(item.stars, active, inactive),
      earnings: toPriceString(item.earnings, currency)
    }));

  return data.map(item => ({
    id: item.id,
    rank: item.rank,
    userName: item.userName,
    matches: item.matches,
    wins: item.wins,
    draws: item.draws,
    losses: item.losses,
    xp: renderStars(item.stars, active, inactive),
    earnings: toPriceString(item.earnings, currency)
  }));
};

const tableHeaders = [
  "LeaderboardsTableFirstColumn",
  "LeaderboardsTableSecondColumn",
  "LeaderboardsTableThirdColumn",
  "LeaderboardsTableFourthColumn",
  "LeaderboardsTableFifthColumn",
  "LeaderboardsTableSixthColumn",
  "LeaderboardsTableSeventhColumn",
  "LeaderboardsTableEighthColumn"
];
const tableMobileHeaders = [
  "LeaderboardsTableFirstColumn",
  "LeaderboardsTableSecondColumn",
  "LeaderboardsTableSeventhColumn",
  "LeaderboardsTableEighthColumn"
];

const LeaderBoards = ({
  leaderBoards,
  gameId,
  isLoading,
  currency,
  selectedLanguage,
  isMobile,
  theme
}) => {
  const { t } = useTranslation();

  return (
    <MainWrapper>
      <GameLobby gameId={gameId} selectedLanguage={selectedLanguage} />
      <ContentWrapper>
        {leaderBoards && (
          <TableWrapper>
            <Table
              isMobile={isMobile}
              headers={tableHeaders}
              mobileHeaders={tableMobileHeaders}
              data={getLeaderBoardsList(
                isMobile,
                leaderBoards.toJS(),
                currency,
                theme.colors.starActive,
                theme.colors.starInactive
              )}
              excludedProps={["id"]}
              isLoading={isLoading}
              noResultLabel="TableNotFound"
              title={t("LeaderboardsTableTitle")}
              urlConstructor={item => {
                return `/${selectedLanguage}/player-details/${item.id}`;
              }}
            />
          </TableWrapper>
        )}
      </ContentWrapper>
    </MainWrapper>
  );
};

export default withTheme(LeaderBoards);

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;

  ${media.md`
    flex: 1;
    overflow: hidden;
    padding: 1rem;
`};
`;

const TableWrapper = styled.div`
  flex: 1;
  overflow: auto;
`;
