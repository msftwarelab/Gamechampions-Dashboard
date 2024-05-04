import React from "react";
import { connect } from "react-redux";
import { withAuth, withPage } from "~hocs";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import {
  selectAuth,
  selectBrandConfig,
  selectGlobalChatConfig,
  selectIsMobile
} from "~containers/app/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import {
  selectPlayerBonusCampaignStatus,
  selectProfile
} from "~containers/myaccount/reducer";
import {
  fetchUPlayGames,
  getDashboardFooter,
  getUplayGames,
  getUplayQuickLinks
} from "~containers/boyGameLobby/actions";
import { getPage } from "~containers/page/actions";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME,
  ROLES
} from "~service/constants";
import { FlexBox, Loader } from "~components/atoms";
import {
  selectIsLoading,
  selectUPlayGames,
  selectUPlayQuickLinks,
  selectDashboardFooter
} from "~containers/boyGameLobby/reducer";
import UPlayHome from "~components/custom/uplay/uplayHome";
import AdminHome from "~components/custom/adminHome";
import {
  getAdminWidgetFormFields,
  PAGE_SIZE_VALUE,
  REDUCER_NAME
} from "~containers/games/constants";
import moment from "moment";
import {
  selectActivePlayers,
  selectDepositCount,
  selectDepositSum,
  selectFilterFrom,
  selectFilterTo,
  selectInstantMatches,
  selectMatchCommissions,
  selectMatchesPlayed,
  selectMatchPrizes,
  selectMessageSent,
  selectPlayerCount,
  selectPlayerDeposits,
  selectPlayerRegistrations,
  selectPlayerWins,
  selectTournament
} from "~containers/games/reducer";
import {
  fetchGames,
  getActivePlayers,
  getDepositCount,
  getDepositSum,
  getGames,
  getInstantMatches,
  getMatchCommissions,
  getMatchesPlayed,
  getMatchPrizes,
  getMessagesSent,
  getPlayerDeposits,
  getPlayerRegistrations,
  getPlayerWins,
  getRegisteredPlayerCount,
  getTournament,
  setFilterFrom,
  setFilterTo
} from "~containers/games/actions";
import { getPlayerBonusCampaignStatus } from "~containers/myaccount/actions";
import { getParameterByName } from "../../util/util";

class Home extends React.PureComponent {
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
      onGetUPlayGames,
      onGetUPlayQuickLinks,
      onGetDashboardFooter,
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
          gameId: response?.data[0]?.id,
          language: selectedLanguage
        });
      });
    }

    if (
      authentication.get("profileId") &&
      authentication.get("role") == ROLES.PLAYER
    ) {
      onGetUPlayGames({ selectedLanguage });
      onGetUPlayQuickLinks({ selectedLanguage });
      onGetDashboardFooter({ selectedLanguage });
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
      profile,
      authentication,
      uPlayGames,
      uPlayQuickLinks,
      dashboardFooter,
      isLoading,
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
      location,
      t
    } = this.props;

    if (isLoading) {
      return (
        <FlexBox
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Loader
            isLoading={true}
            height="4em"
            alignItems="center"
            scale="6rem"
          />
        </FlexBox>
      );
    }

    return (
      <>
        {authentication.get("role") === ROLES.PLAYER && (
          <UPlayHome
            uPlayGames={uPlayGames}
            uPlayQuickLinks={uPlayQuickLinks}
            dashboardFooter={dashboardFooter}
            selectedLanguage={selectedLanguage}
            profile={profile}
            t={t}
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

  static fetchData(store, { url, language, authentication }) {
    if (authentication.role === ROLES.PLAYER) {
      return store.dispatch(
        fetchUPlayGames({
          pageData: {
            url
          },
          requestData: {
            selectedLanguage: language
          }
        })
      );
    } else {
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
}

const mapStateToProps = state => ({
  profile: selectProfile(state),
  authentication: selectAuth(state),
  selectedLanguage: selectSelectedLanguage(state),
  isLoading: selectIsLoading(state),
  uPlayGames: selectUPlayGames(state),
  uPlayQuickLinks: selectUPlayQuickLinks(state),
  dashboardFooter: selectDashboardFooter(state),
  isMobile: selectIsMobile(state),
  filterFrom: selectFilterFrom(state),
  filterTo: selectFilterTo(state),
  instantMatches: selectInstantMatches(state),
  messageSent: selectMessageSent(state),
  playerDeposits: selectPlayerDeposits(state),
  playerRegistrations: selectPlayerRegistrations(state),
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
  onGetUPlayGames: data => dispatch(getUplayGames(data)),
  onGetUPlayQuickLinks: data => dispatch(getUplayQuickLinks(data)),
  onGetDashboardFooter: data => dispatch(getDashboardFooter(data)),
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
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(Home), Home)),
    getPage,
    REDUCER_NAME
  )
);
