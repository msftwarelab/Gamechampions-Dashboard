import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { withAuth, withPage } from "~hocs";
import {
  fetchMatchLobby,
  getMatch,
  getTeams,
  updateStartMatch,
  updateAcceptChallenge,
  updateRefuseChallenge,
  updateCancelChallenge,
  resetMatchData,
  resetError
} from "./actions";
import {
  REDUCER_NAME,
  POLLING_INTERVAL_TIME,
  TIMER_INTERVAL_TIME,
  MATCH_STATUS,
  MATCHTYPE
} from "./constants";
import {
  selectIsLoading,
  selectMatch,
  selectMatchStatus,
  selectChallengerStars,
  selectChallengeeStars,
  selectTeams,
  selectError
} from "./reducer";
import MatchLobbyComponent from "~components/custom/matchLobby";
import { getPage } from "~containers/page/actions";
import { selectProfile } from "~containers/myaccount/reducer";
import { selectReferrerId } from "~containers/addFriend/reducer";
import { getReferrerId } from "~containers/addFriend/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import {
  selectGames,
  selectTournamentPointsTable
} from "~containers/games/reducer";
import { getGames, getTournamentPointsTable } from "~containers/games/actions";
import { getProfile } from "~containers/myaccount/actions";
import { getWalletAmount } from "~containers/wallet/actions";
import { selectAvailableAmount } from "~containers/wallet/reducer";
import { getGamerTag } from "~service/matches/adapter";
import { selectTournament } from "~containers/createChallenge/reducer";
import { getTournament } from "~containers/createChallenge/actions";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";
import moment from "moment";
import { toSelectedTournamentPrizeRange } from "~service/games/adapter";
import ErrorToastNotification from "~components/custom/toastNotification/errorToastNotification";
import { getDashboardFooter } from "~containers/boyGameLobby/actions";
import { selectDashboardFooter } from "~containers/boyGameLobby/reducer";

class MatchLobby extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      lowBalance: false,
      showPlatformError: false,
      isLoading: null,
      showTeams: false,
      reportResultRemainingTime: null,
      autoValidationRemainingTime: null,
      rivalMatchRemainingTime: null
    };

    this.timerInterval = null;
    this.setPollingInterval = this.setPollingInterval.bind(this);
    this.onUpdateLoading = this.onUpdateLoading.bind(this);
    this.getTournamentPoints = this.getTournamentPoints.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleRivalMatchCountdownChange = this.handleRivalMatchCountdownChange.bind(
      this
    );
    this.handleAutoVerificationTimeChange = this.handleAutoVerificationTimeChange.bind(
      this
    );
  }

  setPollingInterval() {
    const { onLoadMatch, match, profile, games } = this.props;
    const matchId = match.params.matchId;
    let userId = profile && profile.get("id");
    if (userId) {
      onLoadMatch({ matchId, games: games.toJS(), userId });
    }
  }

  componentDidMount() {
    const {
      games,
      matchData,
      onLoadMatch,
      match,
      onLoadReferrerId,
      onLoadGames,
      onLoadProfile,
      onLoadWallet,
      profile,
      onGetTeams,
      onGetTournament,
      tournamentPointsTable,
      onLoadTournamentPointsTable,
      onGetDashboardFooter,
      selectedLanguage
    } = this.props;
    const matchId = match.params.matchId;
    let userId = profile && profile.get("id");

    if (!tournamentPointsTable.size) {
      onLoadTournamentPointsTable();
    }

    if (profile.size > 0) {
      userId = profile.get("id");
      onLoadReferrerId({ userId });
    } else {
      onLoadProfile().then(response => {
        userId = response.id;
        onLoadReferrerId({ userId });
      });
    }

    if (
      !matchData ||
      (matchData && matchData.get("id") !== match.params.matchId)
    ) {
      if (games.size > 0) {
        onLoadMatch({ matchId, games: games.toJS(), userId }).then(response => {
          if (response.isChampionsMode) {
            onGetTeams({
              gameId: response.gameId
            });
          }
          onGetTournament({
            gameId: response.gameId,
            language: response.language
          });
        });
      } else {
        onLoadGames().then(response =>
          onLoadMatch({ matchId, games: response, userId }).then(r => {
            if (r.isChampionsMode) {
              onGetTeams({
                gameId: r.gameId
              });
            }
            onGetTournament({
              gameId: r.gameId,
              language: r.language
            });
          })
        );
      }
    } else {
      if (matchData.get("isChampionsMode")) {
        onGetTeams();
      }
    }

    onLoadWallet();
    onGetDashboardFooter({ selectedLanguage });

    this.pollingInterval = setInterval(
      () => this.setPollingInterval(),
      POLLING_INTERVAL_TIME
    );
  }

  onUpdateLoading(action) {
    this.setState({ isLoading: action });
  }

  componentDidUpdate(prevProps) {
    const {
      matchData,
      onLoadMatch,
      match,
      games,
      profile,
      onResetError
    } = this.props;

    const matchId = match.params.matchId;
    let userId = profile && profile.get("id");

    if (
      (matchData &&
        prevProps.matchData &&
        (matchData.get("status") !== prevProps.matchData.get("status") ||
          matchData.get("dateUpdated") !==
            prevProps.matchData.get("dateUpdated"))) ||
      (matchData && matchData.get("id") !== matchId)
    ) {
      this.setState({ isLoading: null });
      onLoadMatch({ matchId, games: games.toJS(), userId });

      onResetError();

      if (
        matchData.get("status") !== prevProps.matchData.get("status") &&
        matchData.get("status") === MATCH_STATUS.LIVE
      ) {
        this.setState({ reportResultRemainingTime: null });
      }
      if (
        matchData.get("status") !== prevProps.matchData.get("status") &&
        (matchData.get("status") === MATCH_STATUS.AWAITING_CHALLENGEE_REPORT ||
          matchData.get("status") === MATCH_STATUS.AWAITING_CHALLENGER_REPORT)
      ) {
        this.setState({ autoValidationRemainingTime: null });
      }
    }

    if (
      matchData &&
      ((!prevProps.matchData && matchData.get("startTime")) ||
        prevProps.matchData !== matchData) &&
      (matchData?.get("status") === MATCH_STATUS.LIVE ||
        matchData?.get("status") === MATCH_STATUS.AWAITING_CHALLENGEE_REPORT ||
        matchData?.get("status") === MATCH_STATUS.AWAITING_CHALLENGER_REPORT)
    ) {
      clearInterval(this.timerInterval);
      setInterval(
        () => this.handleTimeChange(matchData.get("startTime")),
        TIMER_INTERVAL_TIME
      );
    }

    if (
      matchData &&
      ((!prevProps.matchData && matchData?.get("lastUpdatedDate")) ||
        prevProps.matchData !== matchData) &&
      (matchData?.get("status") === MATCH_STATUS.AWAITING_CHALLENGEE_REPORT ||
        matchData?.get("status") === MATCH_STATUS.AWAITING_CHALLENGER_REPORT)
    ) {
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(
        () =>
          this.handleAutoVerificationTimeChange(
            matchData.get("lastUpdatedDate")
          ),
        TIMER_INTERVAL_TIME
      );
    }

    if (
      matchData &&
      ((!prevProps.matchData && matchData?.get("lastUpdatedDate")) ||
        prevProps.matchData !== matchData) &&
      matchData?.get("status") === MATCH_STATUS.WAITING &&
      matchData?.get("matchType") === MATCHTYPE.RIVAL
    ) {
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(
        () =>
          this.handleRivalMatchCountdownChange(
            matchData.get("lastUpdatedDate")
          ),
        TIMER_INTERVAL_TIME
      );
    }
  }

  handleTimeChange(timeMatchStarted) {
    const { matchData } = this.props;
    const reportMatchResultCountdon = matchData?.get(
      "reportMatchResultCountdon"
    );
    const timerStopTime = moment
      .utc(timeMatchStarted)
      .add(reportMatchResultCountdon, "minutes");
    const reportResultRemainingTime = timerStopTime.diff(
      moment.utc(),
      "seconds"
    );

    this.setState({ reportResultRemainingTime });
  }

  handleRivalMatchCountdownChange(timeMatchStarted) {
    const { matchData } = this.props;
    const maxRivalMatchCountdownInMinutes = matchData?.get(
      "maxRivalMatchCountdownInMinutes"
    );
    const timerStopTime = moment
      .utc(timeMatchStarted)
      .add(maxRivalMatchCountdownInMinutes, "minutes");
    const rivalMatchRemainingTime = timerStopTime.diff(moment.utc(), "seconds");

    this.setState({ rivalMatchRemainingTime });
  }

  handleAutoVerificationTimeChange(timeMatchStarted) {
    const { matchData } = this.props;
    const timerStopTime = moment
      .utc(timeMatchStarted)
      .add(matchData.get("autoValidationCountdownInMinutes"), "minutes");
    const autoValidationRemainingTime = timerStopTime.diff(
      moment.utc(),
      "seconds"
    );
    this.setState({ autoValidationRemainingTime });
  }

  checkBalance() {
    const {
      matchData,
      availableAmount,
      onUpdateAcceptChallenge,
      match,
      profile,
      games
    } = this.props;

    const game = games.find(g => g.get("id") == matchData.get("gameId"));

    const platForm =
      game && profile
        ? getGamerTag(profile.toJS(), game.get("gameType"))
        : null;

    const matchId = match.params.matchId;
    const userId = profile && profile.get("id");

    if (
      matchData &&
      (availableAmount || availableAmount == 0) &&
      matchData.get("betAmount") > availableAmount
    ) {
      this.setState({
        isLoading: null
      });

      toast(
        <ErrorToastNotification
          message={this.props.t("LowBalanceMessage")}
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
      return;
    }
    if (!platForm.value) {
      this.setState({
        isLoading: null
      });

      toast(
        <ErrorToastNotification
          message={this.props.t("RequestPlayerTags")}
          action={{
            text: this.props.t("AddGamerTag"),
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

      return;
    }
    onUpdateAcceptChallenge({ matchId, userId })
      .then(() => this.onUpdateLoading(null))
      .catch(error => {
        if (
          error !== "InsufficientFunds" ||
          error !== "PlayerTagsMissing" ||
          error !== "TooBigPlayerLevelDiference"
        ) {
          toast(<ErrorToastNotification message={this.props.t(error)} />, {
            className: "toast-custom",
            hideProgressBar: true,
            closeButton: false
          });
        }
      });
  }

  componentWillUnmount() {
    const { onResetMatchData, onResetError } = this.props;
    onResetMatchData();
    onResetError();
    clearInterval(this.pollingInterval);
    clearInterval(this.timerInterval);
  }

  getTournamentPoints() {
    const { tournamentPointsTable, matchData } = this.props;
    const prize = matchData && matchData.get("prize");
    const pointsTable = tournamentPointsTable.toJS();
    return toSelectedTournamentPrizeRange(pointsTable, prize);
  }

  render() {
    const {
      matchData,
      match,
      profile,
      selectedLanguage,
      onUpdateRefuseChallenge,
      onUpdateCancelChallenge,
      onUpdateStartMatch,
      history,
      previousLocation = {},
      location,
      challengeeStars,
      challengerStars,
      teams,
      error,
      tournament,
      dashboardFooter
    } = this.props;
    const {
      showTeams,
      reportResultRemainingTime,
      autoValidationRemainingTime,
      rivalMatchRemainingTime
    } = this.state;

    const returnUrl =
      previousLocation.pathname != location.pathname
        ? previousLocation.pathname
        : `/${selectedLanguage}`;
    const matchId = match.params.matchId;
    const userId = profile && profile.get("id"); // TODO: just for testing, remove later

    return (
      <MatchLobbyComponent
        error={error}
        history={history}
        onShowTeams={() => this.setState({ showTeams: true })}
        showTeams={showTeams}
        actionLoading={this.state.isLoading}
        match={matchData}
        challengerStars={challengerStars}
        challengeeStars={challengeeStars}
        currency={profile.get("currency")}
        matchId={match.params.matchId}
        matchStatus={matchData}
        // referrerId={referrerId} // TODO: not used temporarily
        lowBalance={this.state.lowBalance}
        showPlatformError={this.state.showPlatformError}
        handleAcceptChallenge={action => {
          this.onUpdateLoading(action);
          this.checkBalance();
        }}
        pageUrl={location.pathname}
        handleRefuseChallenge={action => {
          this.onUpdateLoading(action);
          onUpdateRefuseChallenge({ matchId, userId })
            .then(() => {
              history.push(returnUrl);
            })
            .catch(() => history.push(returnUrl));
        }}
        handleCancelChallenge={action => {
          this.onUpdateLoading(action);
          onUpdateCancelChallenge({
            matchId,
            userId: profile.get("id")
          });
        }}
        handleStartMatch={action => {
          this.onUpdateLoading(action);
          onUpdateStartMatch({ matchId, userId });
        }}
        teams={teams && teams.toJS()}
        selectedLanguage={selectedLanguage}
        tournament={tournament}
        reportResultRemainingTime={reportResultRemainingTime}
        autoValidationRemainingTime={autoValidationRemainingTime}
        rivalMatchRemainingTime={rivalMatchRemainingTime}
        dashboardFooter={dashboardFooter}
        tournamentPointsTable={this.getTournamentPoints()}
      />
    );
  }

  static fetchData(store, { url, params, authentication }) {
    return store.dispatch(
      fetchMatchLobby({
        pageData: {
          url
        },
        requestData: {
          matchId: params.matchId,
          games: store
            .getState()
            .get("games")
            .get("games")
            .toJS(),
          userId: authentication.profileId
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  matchData: selectMatch(state),
  matchStatus: selectMatchStatus(state),
  referrerId: selectReferrerId(state),
  isLoading: selectIsLoading(state),
  error: selectError(state),
  profile: selectProfile(state),
  selectedLanguage: selectSelectedLanguage(state),
  availableAmount: selectAvailableAmount(state),
  games: selectGames(state),
  challengerStars: selectChallengerStars(state),
  challengeeStars: selectChallengeeStars(state),
  teams: selectTeams(state),
  tournament: selectTournament(state),
  dashboardFooter: selectDashboardFooter(state),
  tournamentPointsTable: selectTournamentPointsTable(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadMatch: data => dispatch(getMatch(data)),
  onUpdateStartMatch: data => dispatch(updateStartMatch(data)),
  onUpdateAcceptChallenge: data => dispatch(updateAcceptChallenge(data)),
  onUpdateRefuseChallenge: data => dispatch(updateRefuseChallenge(data)),
  onUpdateCancelChallenge: data => dispatch(updateCancelChallenge(data)),
  onLoadReferrerId: data => dispatch(getReferrerId(data)),
  onLoadGames: data => dispatch(getGames(data)),
  onLoadProfile: () => dispatch(getProfile()),
  onLoadWallet: data => dispatch(getWalletAmount(data)),
  onResetMatchData: () => dispatch(resetMatchData()),
  onResetError: () => dispatch(resetError()),
  onGetTeams: data => dispatch(getTeams(data)),
  onGetTournament: data => dispatch(getTournament(data)),
  onGetDashboardFooter: data => dispatch(getDashboardFooter(data)),
  onLoadTournamentPointsTable: () => dispatch(getTournamentPointsTable())
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(MatchLobby), MatchLobby)),
    getPage,
    REDUCER_NAME
  )
);
