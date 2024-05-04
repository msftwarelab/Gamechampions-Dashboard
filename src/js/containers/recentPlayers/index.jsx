import React from "react";
import { connect } from "react-redux";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";

import { withAuth, withPage } from "~hocs";
import { fetchRecentPlayers, getRecentPlayers } from "./actions";
import { REDUCER_NAME, INTERVAL_TIME } from "./constants";
import { selectIsLoading, selectRecentPlayers } from "./reducer";
import RecentPlayersComponent from "~components/custom/recentPlayers";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import {
  selectPlayerBonusCampaignStatus,
  selectProfile
} from "~containers/myaccount/reducer";
import { selectGames } from "~containers/games/reducer";
import { selectTournament } from "~containers/tournaments/reducer";
import { getTournament } from "~containers/tournaments/actions";
import { selectGlobalChatConfig } from "~containers/app/reducer";
import { getPlayerBonusCampaignStatus } from "~containers/myaccount/actions";
import { getDashboardFooter } from "~containers/boyGameLobby/actions";
import { selectDashboardFooter } from "~containers/boyGameLobby/reducer";

class RecentPlayers extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      page: 1,
      error: null,
      selectedPlayer: null
    };

    this.setPollingInterval = this.setPollingInterval.bind(this);
    this.handleSendChallenge = this.handleSendChallenge.bind(this);
  }

  setPollingInterval() {
    const { onLoadRecentPlayers, games, match, tournament } = this.props;
    const { page } = this.state;
    const tournamentId = tournament?.toJS()?.tournamentId;

    const gameId = parseInt(match.params.gameId);
    const gameType = games.toJS().find(g => g.id == match.params.gameId)
      .gameType;
    if (gameId) {
      this.interval = setInterval(() => {
        onLoadRecentPlayers({ page, gameType, tournamentId });
      }, INTERVAL_TIME);
    }
  }
  handleSendChallenge(selectedPlayer) {
    const { history, match, selectedLanguage } = this.props;
    this.setState({ selectedPlayer });
    const gameId = parseInt(match.params.gameId);
    history.push({
      pathname: `/${selectedLanguage}/player-details/${selectedPlayer}/send-challenge/${gameId}`,
      state: {
        returnUrl: `/${selectedLanguage}/game-lobby/${gameId}/recentplayers`
      }
    });
  }

  componentDidMount() {
    const {
      onLoadRecentPlayers,
      match,
      onGetPlayerBonusCampaignStatus,
      games,
      tournament,
      profile,
      selectedLanguage,
      onGetDashboardFooter,
      onLoadTournament
    } = this.props;
    const { page } = this.state;
    const tournamentId = tournament?.get("tournamentId");
    const gameId = parseInt(match.params.gameId);
    if (!tournamentId) {
      onLoadTournament({
        gameId: gameId,
        language: selectedLanguage
      }).then(response => {
        const tournamentId = response?.tournamentId;
        onLoadRecentPlayers({ page, gameType, tournamentId });
      });
    }
    const gameType = games.toJS().find(g => g.id == match.params.gameId)
      .gameType;
    onLoadRecentPlayers({ page, gameType, tournamentId });
    onGetPlayerBonusCampaignStatus({ playerId: profile.get("id") });
    onGetDashboardFooter({ selectedLanguage });
    this.setPollingInterval();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      recentPlayers,
      match,
      selectedLanguage,
      profile,
      globalChatConfig,
      playerBonusCampaignStatus,
      dashboardFooter
    } = this.props;
    const { selectedPlayer, error } = this.state;

    return (
      <RecentPlayersComponent
        playerBonusCampaignStatus={
          playerBonusCampaignStatus && playerBonusCampaignStatus.toJS()
        }
        isGlobalChatEnabled={globalChatConfig.get("isEnabled")}
        selectedLanguage={selectedLanguage}
        recentPlayers={recentPlayers}
        gameId={parseInt(match.params.gameId)}
        handleSendChallenge={this.handleSendChallenge}
        selectedPlayer={selectedPlayer}
        error={error}
        userId={profile && profile.get("id")}
        dashboardFooter={dashboardFooter}
      />
    );
  }

  static fetchData(store, { url, params, language }) {
    return store.dispatch(
      fetchRecentPlayers({
        pageData: {
          url,
          language
        },
        requestData: {
          gameId: parseInt(params.gameId)
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  recentPlayers: selectRecentPlayers(state),
  isLoading: selectIsLoading(state),
  games: selectGames(state),
  tournament: selectTournament(state),
  selectedLanguage: selectSelectedLanguage(state),
  profile: selectProfile(state),
  dashboardFooter: selectDashboardFooter(state),
  globalChatConfig: selectGlobalChatConfig(state),
  playerBonusCampaignStatus: selectPlayerBonusCampaignStatus(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadRecentPlayers: data => dispatch(getRecentPlayers(data)),
  onGetDashboardFooter: data => dispatch(getDashboardFooter(data)),
  onLoadTournament: data => dispatch(getTournament(data)),
  onGetPlayerBonusCampaignStatus: data =>
    dispatch(getPlayerBonusCampaignStatus(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(RecentPlayers), RecentPlayers)),
    getPage,
    REDUCER_NAME
  )
);
