import React from "react";
import { connect } from "react-redux";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { withAuth, withPage } from "~hocs";
import {
  fetchMatchMaking,
  getInstantMatches,
  getGame,
  resetGame
} from "./actions";
import { REDUCER_NAME, INTERVAL_TIME } from "./constants";
import { selectIsLoading, selectInstantMatches, selectGame } from "./reducer";
import MatchMakingComponent from "~components/custom/matchMaking";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import {
  updateAcceptChallenge,
  resetError
} from "~containers/matchLobby/actions";
import { selectProfile } from "~containers/myaccount/reducer";
import { getTournamentPointsTable } from "~containers/games/actions";
import { selectTournamentPointsTable } from "~containers/games/reducer";
import ErrorToastNotification from "~components/custom/toastNotification/errorToastNotification";
import { selectGlobalChatConfig } from "~containers/app/reducer";
import { getDashboardFooter } from "~containers/boyGameLobby/actions";
import { selectDashboardFooter } from "~containers/boyGameLobby/reducer";

class MatchMaking extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      matchId: null,
      error: null
    };

    this.setPollingInterval = this.setPollingInterval.bind(this);
    this.handlePlayNow = this.handlePlayNow.bind(this);
    this.submitFailureCallback = this.submitFailureCallback.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.executePolling = this.executePolling.bind(this);
  }
  executePolling() {
    const { onLoadInstantMatches, match } = this.props;
    const gameId = parseInt(match.params.gameId);
    onLoadInstantMatches({ gameId });
  }

  setPollingInterval() {
    const { match } = this.props;
    const gameId = parseInt(match.params.gameId);

    if (gameId) {
      this.interval = setInterval(() => {
        this.executePolling();
      }, INTERVAL_TIME);
    }
  }

  submitFailureCallback(err = {}) {
    const { t } = this.props;
    let errorMessage = null;

    if ((err && typeof err === "string") || err instanceof String) {
      errorMessage = t(err);
    } else {
      errorMessage = t("GenericError");
    }

    this.setState({
      matchId: null
    });

    if (errorMessage === t("LowBalanceMessage")) {
      toast(
        <ErrorToastNotification
          message={errorMessage}
          action={{
            text: this.props.t("AddFunds"),
            handler: () =>
              this.props.history.push(
                `/${this.props.selectedLanguage}/deposit/choose-amount`
              )
          }}
        />,
        {
          className: "toast-custom",
          hideProgressBar: true,
          closeButton: false
        }
      );
    } else if (errorMessage === t("PlayerTagsMissing")) {
      toast(
        <ErrorToastNotification
          message={t("RequestPlayerTags")}
          action={{
            text: t("AddGamerTag"),
            handler: () =>
              this.props.history.push(
                `/${this.props.selectedLanguage}/my-account/gamer-tags`
              )
          }}
        />,
        {
          className: "toast-custom",
          autoClose: false,
          closeButton: false
        }
      );
    } else {
      toast(<ErrorToastNotification message={errorMessage} />, {
        className: "toast-custom",
        hideProgressBar: true,
        closeButton: false
      });
    }
  }

  handlePlayNow(matchId) {
    const { onUpdateAcceptChallenge, history, selectedLanguage } = this.props;
    this.setState({ matchId });
    onUpdateAcceptChallenge({ matchId })
      .then(() => history.push(`/${selectedLanguage}/match-lobby/${matchId}`))
      .catch(error => {
        this.submitFailureCallback(error);
      });
  }
  fetchData() {
    const {
      onLoadInstantMatches,
      onLoadGame,
      match,
      selectedLanguage,
      tournamentPointsTable,
      onLoadTournamentPointsTable
    } = this.props;
    const gameId = parseInt(match.params.gameId);
    onLoadGame({ gameId, language: selectedLanguage });
    onLoadInstantMatches({ gameId });
    if (!tournamentPointsTable.size) {
      onLoadTournamentPointsTable();
    }
  }
  componentDidMount() {
    this.fetchData();
    this.setPollingInterval();
    const { selectedLanguage, onGetDashboardFooter } = this.props;
    onGetDashboardFooter({ selectedLanguage });
  }
  componentDidUpdate(prevProps) {
    const { match } = this.props;
    let prevMatch = prevProps.match;
    let prevGameId = prevMatch.params && prevMatch.params.gameId;
    let { gameId } = match.params;

    if (prevGameId && prevGameId != gameId) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    this.props.onResetGame();
    this.props.onResetError(); // clean up possible API error comming from onUpdateAcceptChallenge
    clearInterval(this.interval);
  }

  render() {
    const {
      instantMatches,
      match,
      selectedLanguage,
      profile,
      game,
      globalChatConfig,
      tournamentPointsTable,
      dashboardFooter
    } = this.props;
    const { matchId, error } = this.state;

    return (
      <MatchMakingComponent
        isGlobalChatEnabled={
          globalChatConfig.get("isEnabled") &&
          globalChatConfig.get("isGameLobbyMatchesChatEnabled")
        }
        tournamentPointsTable={tournamentPointsTable}
        selectedLanguage={selectedLanguage}
        instantMatches={instantMatches}
        gameId={parseInt(match.params.gameId)}
        game={game}
        handlePlayNow={this.handlePlayNow}
        matchId={matchId}
        error={error}
        userId={profile && profile.get("id")}
        profile={profile}
        dashboardFooter={dashboardFooter}
      />
    );
  }

  static fetchData(store, { url, params, language }) {
    return store.dispatch(
      fetchMatchMaking({
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
  instantMatches: selectInstantMatches(state),
  game: selectGame(state),
  isLoading: selectIsLoading(state),
  dashboardFooter: selectDashboardFooter(state),
  selectedLanguage: selectSelectedLanguage(state),
  profile: selectProfile(state),
  tournamentPointsTable: selectTournamentPointsTable(state),
  globalChatConfig: selectGlobalChatConfig(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadInstantMatches: data => dispatch(getInstantMatches(data)),
  onLoadGame: data => dispatch(getGame(data)),
  onResetGame: () => dispatch(resetGame()),
  onUpdateAcceptChallenge: data => dispatch(updateAcceptChallenge(data)),
  onResetError: () => dispatch(resetError()),
  onGetDashboardFooter: data => dispatch(getDashboardFooter(data)),
  onLoadTournamentPointsTable: () => dispatch(getTournamentPointsTable())
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(MatchMaking), MatchMaking)),
    getPage,
    REDUCER_NAME
  )
);
