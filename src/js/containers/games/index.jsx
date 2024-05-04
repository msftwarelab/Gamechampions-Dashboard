import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { withAuth, withPage } from "~hocs";
import {
  fetchGames,
  getGames,
  setFilterFrom,
  setFilterTo,
  getRegisteredPlayerCount,
  getDepositCount,
  getDepositSum,
  getActivePlayers,
  getPlayerWins,
  getMatchesPlayed,
  getPlayerRegistrations,
  getPlayerDeposits,
  getMessagesSent,
  getInstantMatches,
  getMatchCommissions,
  getMatchPrizes,
  getTournament
} from "./actions";
import {
  REDUCER_NAME,
  PAGE_SIZE_VALUE,
  getAdminWidgetFormFields
} from "./constants";
import {
  selectGames,
  selectIsLoading,
  selectFilterFrom,
  selectFilterTo,
  selectInstantMatches,
  selectMessageSent,
  selectPlayerDeposits,
  selectPlayerRegistrations,
  selectMatchesPlayed,
  selectPlayerWins,
  selectActivePlayers,
  selectDepositCount,
  selectDepositSum,
  selectPlayerCount,
  selectMatchCommissions,
  selectMatchPrizes,
  selectTournament
} from "./reducer";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import {
  selectAuth,
  selectBrandConfig,
  selectGlobalChatConfig,
  selectIsMobile
} from "../app/reducer";
import { ROLES } from "~service/constants";
import { getParameterByName } from "../../util/util";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";
import HomeComponent from "~components/custom/games/home";
import AdminHome from "~components/custom/adminHome";
import {
  selectPlayerBonusCampaignStatus,
  selectProfile
} from "~containers/myaccount/reducer";
import { getPlayerBonusCampaignStatus } from "~containers/myaccount/actions";

class Games extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onRangeChange = this.onRangeChange.bind(this);
  }

  componentDidMount() {
    const {
      games,
      onLoadGames,
      authentication,
      onSetFilterFrom,
      onSetFilterTo,
      filterFrom,
      filterTo,
      onLoadTournament,
      selectedLanguage,
      onGetPlayerBonusCampaignStatus
    } = this.props;

    if (authentication.get("role") == ROLES.ADMIN && !filterFrom && !filterTo) {
      var end = moment();
      var start = moment().subtract(30, "days");

      const endFormatted = end.format("YYYY-MM-DD");
      const startFormatted = start.format("YYYY-MM-DD");
      onSetFilterFrom(startFormatted);
      onSetFilterTo(endFormatted);

      this.onGetStatisticData(startFormatted, endFormatted);
    }

    if (games && games.size) {
      let gameId = games.get(0).get("id");
      onLoadTournament({ gameId: gameId, language: selectedLanguage });
    }

    if (!(games && games.size)) {
      onLoadGames({
        page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
        pageSize:
          getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
          PAGE_SIZE_VALUE
      }).then(response => {
        onLoadTournament({
          gameId: response.get(0).get("id"),
          language: selectedLanguage
        });
      });
    }

    if (
      authentication.get("profileId") &&
      authentication.get("role") == ROLES.PLAYER
    ) {
      onGetPlayerBonusCampaignStatus({
        playerId: authentication.get("profileId")
      });
    }
  }

  onRangeChange({ name, value }) {
    const { onSetFilterFrom, onSetFilterTo, filterFrom, filterTo } = this.props;
    let formattedValue = null;

    if (value) {
      formattedValue = value.format("YYYY-MM-DD");
    }

    if (formattedValue) {
      if (name == "from") {
        onSetFilterFrom(formattedValue);

        if (filterTo) {
          this.onGetStatisticData(formattedValue, filterTo);
        }
      }

      if (name == "to") {
        onSetFilterTo(formattedValue);

        if (filterFrom) {
          this.onGetStatisticData(filterFrom, formattedValue);
        }
      }
    }
  }

  onGetStatisticData(filterFrom, filterTo) {
    const {
      onGetRegisteredPlayerCount,
      onGetDepositCount,
      onGetDepositSum,
      onGetActivePlayers,
      onGetPlayerWins,
      onGetMatchesPlayed,
      onGetPlayerRegistrations,
      onGetPlayerDeposits,
      onGetMessagesSent,
      onGetInstantMatches,
      onGetMatchCommissions,
      onGetMatchPrizes
    } = this.props;
    onGetRegisteredPlayerCount({ from: filterFrom, to: filterTo });
    onGetDepositCount({ from: filterFrom, to: filterTo });
    onGetDepositSum({ from: filterFrom, to: filterTo });
    onGetActivePlayers({ from: filterFrom, to: filterTo });
    onGetPlayerWins({ from: filterFrom, to: filterTo });
    onGetMatchesPlayed({ from: filterFrom, to: filterTo });
    onGetPlayerRegistrations({ from: filterFrom, to: filterTo });
    onGetPlayerDeposits({ from: filterFrom, to: filterTo });
    onGetMessagesSent({ from: filterFrom, to: filterTo });
    onGetInstantMatches({ from: filterFrom, to: filterTo });
    onGetMatchCommissions({ from: filterFrom, to: filterTo });
    onGetMatchPrizes({ from: filterFrom, to: filterTo });
  }

  render() {
    const {
      authentication,
      games,
      selectedLanguage,
      isMobile,
      filterFrom,
      filterTo,
      instantMatches,
      messageSent,
      playerDeposits,
      playerRegistrations,
      matchesPlayed,
      playerWins,
      activePlayers,
      depositCount,
      depositSum,
      playerCount,
      matchCommissions,
      matchPrizes,
      tournament,
      globalChatConfig,
      brandConfig,
      playerBonusCampaignStatus,
      location,
      profile
    } = this.props;

    return (
      <>
        {authentication.get("role") == ROLES.PLAYER && (
          <HomeComponent
            playerBonusCampaignStatus={
              playerBonusCampaignStatus && playerBonusCampaignStatus.toJS()
            }
            isGlobalChatEnabled={
              globalChatConfig.get("isEnabled") &&
              globalChatConfig.get("isHomeChatEnabled")
            }
            games={games}
            selectedLanguage={selectedLanguage}
            tournament={tournament}
            isMobile={isMobile}
            websiteUrl={brandConfig.get("websiteUrl")}
            profile={profile}
          />
        )}

        {authentication.get("role") == ROLES.ADMIN && (
          <>
            {authentication.get("role") == ROLES.ADMIN &&
            (location.pathname === `/${selectedLanguage}/` ||
              location.pathname === `/${selectedLanguage}`) ? (
              <></>
            ) : (
              <AdminHome
                isMobile={isMobile}
                formFields={getAdminWidgetFormFields({
                  onRangeChange: this.onRangeChange
                })}
                initialValues={{
                  from: filterFrom && moment(filterFrom),
                  to: filterTo && moment(filterTo)
                }}
                instantMatches={instantMatches && instantMatches.toJS()}
                messageSent={messageSent && messageSent.toJS()}
                playerDeposits={playerDeposits && playerDeposits.toJS()}
                playerRegistrations={
                  playerRegistrations && playerRegistrations.toJS()
                }
                matchesPlayed={matchesPlayed && matchesPlayed.toJS()}
                playerWins={playerWins && playerWins.toJS()}
                activePlayers={activePlayers}
                depositCount={depositCount}
                depositSum={depositSum}
                playerCount={playerCount}
                matchCommissions={matchCommissions && matchCommissions.toJS()}
                matchPrizes={matchPrizes && matchPrizes.toJS()}
              />
            )}
          </>
        )}
      </>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchGames({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  games: selectGames(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  isMobile: selectIsMobile(state),
  filterFrom: selectFilterFrom(state),
  filterTo: selectFilterTo(state),
  instantMatches: selectInstantMatches(state),
  messageSent: selectMessageSent(state),
  playerDeposits: selectPlayerDeposits(state),
  playerRegistrations: selectPlayerRegistrations(state),
  profile: selectProfile(state),
  matchesPlayed: selectMatchesPlayed(state),
  playerWins: selectPlayerWins(state),
  activePlayers: selectActivePlayers(state),
  depositCount: selectDepositCount(state),
  depositSum: selectDepositSum(state),
  playerCount: selectPlayerCount(state),
  matchCommissions: selectMatchCommissions(state),
  matchPrizes: selectMatchPrizes(state),
  tournament: selectTournament(state),
  globalChatConfig: selectGlobalChatConfig(state),
  brandConfig: selectBrandConfig(state),
  playerBonusCampaignStatus: selectPlayerBonusCampaignStatus(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadGames: data => dispatch(getGames(data)),
  onSetFilterFrom: data => dispatch(setFilterFrom(data)),
  onSetFilterTo: data => dispatch(setFilterTo(data)),
  onGetRegisteredPlayerCount: data => dispatch(getRegisteredPlayerCount(data)),
  onGetDepositCount: data => dispatch(getDepositCount(data)),
  onGetDepositSum: data => dispatch(getDepositSum(data)),
  onGetActivePlayers: data => dispatch(getActivePlayers(data)),
  onGetPlayerWins: data => dispatch(getPlayerWins(data)),
  onGetMatchesPlayed: data => dispatch(getMatchesPlayed(data)),
  onGetPlayerRegistrations: data => dispatch(getPlayerRegistrations(data)),
  onGetPlayerDeposits: data => dispatch(getPlayerDeposits(data)),
  onGetMessagesSent: data => dispatch(getMessagesSent(data)),
  onGetInstantMatches: data => dispatch(getInstantMatches(data)),
  onGetMatchCommissions: data => dispatch(getMatchCommissions(data)),
  onGetMatchPrizes: data => dispatch(getMatchPrizes(data)),
  onLoadTournament: data => dispatch(getTournament(data)),
  onGetPlayerBonusCampaignStatus: data =>
    dispatch(getPlayerBonusCampaignStatus(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(Games),
    getPage,
    REDUCER_NAME
  )
);
