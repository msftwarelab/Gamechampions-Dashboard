import React, { useState } from "react";
import { withTheme, styled } from "~theme";
import MainWrapper from "~components/custom/mainWrapper";
import { useTranslation } from "react-i18next";
import { Table, Pagination } from "~components/molecules";
import TableWrapper from "./tableWrapper";
import { FlexBox } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";
import { getFormFields } from "~containers/players/constants";
import ConfirmBox from "~components/molecules/confirmBox";

const getPlayerList = data => {
  if (!data) {
    return [];
  }

  return data.map(item => {
    return {
      id: item.id,
      userName: item.userName,
      email: item.email,
      dateOfBirth: item.dateOfBirth,
      country: item.country,
      numberOfTransactions: item.numberOfTransactions,
      isBlocked: item.isBlocked,
      isMuted: item.isMuted
    };
  });
};

const PlayersTable = ({
  players,
  isLoading,
  pagination,
  onChangePageClick,
  onSetSelectedPlayer,
  selectedLanguage,
  history,
  onSearchChange,
  theme,
  unblockPlayer,
  selectedPlayer,
  mutePlayer,
  unMutePlayer
}) => {
  const { t } = useTranslation();
  const [isConfirmVisible, toggleConfirm] = useState(false);
  const [isMuteConfirmVisible, toggleMuteConfirm] = useState(false);

  const icons = [
    {
      label: t("PlayerBoyProfile"),
      icon: "people",
      onClick: (data = {}) => {
        onSetSelectedPlayer(players.find(player => player.id == data.id));
        history.push(`/${selectedLanguage}/all-players/${data.id}/boy-profile`);
      }
    },
    {
      label: t("PlayerXpPoints"),
      icon: "stars",
      onClick: (data = {}) => {
        onSetSelectedPlayer(players.find(player => player.id == data.id));
        history.push(`/${selectedLanguage}/all-players/${data.id}/player-xp`);
      }
    },
    {
      label: t("PlayersTableCreditBonus"),
      icon: "reedem",
      onClick: (data = {}) => {
        onSetSelectedPlayer(players.find(player => player.id == data.id));
        history.push(
          `/${selectedLanguage}/all-players/${data.id}/credit-bonus`
        );
      }
    },
    {
      label: t("BonusTransactionHistoryTabTitle"),
      icon: "style",
      onClick: (data = {}) => {
        onSetSelectedPlayer(players.find(player => player.id == data.id));
        history.push(
          `/${selectedLanguage}/all-players/${data.id}/bonus-transactions`
        );
      }
    },
    {
      label: t("PlayersTableCredit"),
      icon: "payments",
      onClick: (data = {}) => {
        onSetSelectedPlayer(players.find(player => player.id == data.id));
        history.push(`/${selectedLanguage}/all-players/${data.id}/credit`);
      }
    },
    {
      label: t("PlayersTableCreditEnergy"),
      icon: "energy_icon",
      onClick: (data = {}) => {
        onSetSelectedPlayer(players.find(player => player.id === data.id));
        history.push(
          `/${selectedLanguage}/all-players/${data.id}/credit-energy`
        );
      }
    },
    {
      label: t("PlayersTableWithdraw"),
      icon: "payment",
      onClick: (data = {}) => {
        onSetSelectedPlayer(players.find(player => player.id == data.id));
        history.push(`/${selectedLanguage}/all-players/${data.id}/withdraw`);
      }
    },
    {
      label: t("PlayersTableTransactions"),
      color: (data = {}) =>
        data.numberOfTransactions > 0 ? theme.colors.green : null,
      icon: "euro",
      onClick: (data = {}) => {
        onSetSelectedPlayer(players.find(player => player.id == data.id));
        history.push(
          `/${selectedLanguage}/all-players/${data.id}/transactions`
        );
      }
    },
    {
      label: t("PlayersTableMatches"),
      icon: "list",
      onClick: (data = {}) => {
        onSetSelectedPlayer(players.find(player => player.id == data.id));
        history.push(`/${selectedLanguage}/all-players/${data.id}/matches`);
      }
    },
    {
      label: t("PlayersTableMute"),
      icon: "mute",
      color: (data = {}) =>
        data.isMuted ? theme.colors.errorColor : theme.colors.secondary,
      onClick: (data = {}) => {
        onSetSelectedPlayer(players.find(player => player.id == data.id));
        toggleMuteConfirm(true);
      }
    },
    {
      label: t("PlayersTableBlock"),
      icon: "block",
      color: (data = {}) =>
        data.isBlocked ? theme.colors.errorColor : theme.colors.secondary,
      onClick: (data = {}) => {
        if (data.isBlocked) {
          onSetSelectedPlayer(players.find(player => player.id == data.id));
          toggleConfirm(true);
        } else {
          onSetSelectedPlayer(players.find(player => player.id == data.id));
          history.push(`/${selectedLanguage}/all-players/${data.id}/block`);
        }
      }
    }
  ];

  const tableHeaders = [
    t("PlayersTableFirstColumn"),
    t("PlayersTableSecondColumn"),
    t("PlayersTableThirdColumn"),
    t("PlayersTableFourthColumn")
  ];

  return (
    <MainWrapper>
      <ConfirmBox
        isVisible={isConfirmVisible}
        title={t("SureToUnBlockPlayer")}
        onCancel={() => {
          toggleConfirm(false);
        }}
        onConfirm={() => {
          unblockPlayer({
            playerId: selectedPlayer && selectedPlayer.get("id")
          });
          toggleConfirm(false);
        }}
      />
      <ConfirmBox
        isVisible={isMuteConfirmVisible}
        title={t("SureToMutePlayer", {
          mute: selectedPlayer?.get("isMuted") ? "unmute" : "mute"
        })}
        onCancel={() => {
          toggleMuteConfirm(false);
        }}
        onConfirm={() => {
          if (selectedPlayer?.get("isMuted")) {
            unMutePlayer({
              playerId: selectedPlayer && selectedPlayer.get("id"),
              barringEndDate: "2023-12-05T15:55:12.009Z",
              barringType: 3
            });
          } else {
            mutePlayer({
              playerId: selectedPlayer && selectedPlayer.get("id"),
              barringEndDate: "2023-12-05T15:55:12.009Z",
              barringType: 3
            });
          }
          toggleMuteConfirm(false);
        }}
      />
      <PlayersTableStyle>
        <FlexBox flexDirection={{ md: "row-reverse", base: "column" }}>
          <DynamicForm
            formFields={getFormFields({
              onSearchChange: onSearchChange
            })}
            displayButtons={false}
            className="games-search__form"
          />
        </FlexBox>
        <TableWrapper>
          <Table
            headers={tableHeaders}
            data={getPlayerList(players)}
            excludedProps={["id", "numberOfTransactions", "isBlocked"]}
            isLoading={isLoading}
            icons={icons}
            noResultLabel="TableNotFound"
            title={t("PlayersTableTitle")}
            mobileCellIndex={1}
            urlConstructor={item => {
              return `/${selectedLanguage}/all-players/${item.id}`;
            }}
            iconProps={{
              margin: "0 0 0 1rem"
            }}
            onCellClick={data => {
              onSetSelectedPlayer(players.find(player => player.id == data.id));
            }}
          />
        </TableWrapper>
        <Pagination
          pagination={pagination}
          onChangePageClick={onChangePageClick}
        />
      </PlayersTableStyle>
    </MainWrapper>
  );
};

const PlayersTableStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default withTheme(PlayersTable);
