import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import Modal from "../../components/modal/modal";
import {
  getGamesAndRules,
  getTournament,
  resetTournament,
  submitChallenge,
  fetchGameRulesAndAccountBalance,
  resetError,
  getEntryFee
} from "./actions";
import {
  selectError,
  selectGamesAndRules,
  selectTournament,
  selectIsLoading
} from "./reducer";
import { getPage } from "../page/actions";
import { withPage } from "~hocs";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import {
  RETURN_URL,
  getFormFields,
  REDUCER_NAME,
  TOURNAMENT_QUERY_STRING_PARAM,
  MATCHTYPE
} from "./constants";
import { selectProfile } from "~containers/myaccount/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { getProfile } from "~containers/myaccount/actions";
import { getGames, getTournamentPointsTable } from "~containers/games/actions";
import { getMatches } from "~containers/matches/actions";
import {
  selectGames,
  selectTournamentPointsTable
} from "~containers/games/reducer";
import { selectGame as selectMatchMakingGame } from "~containers/matchMaking/reducer";
import { getInstantMatches } from "~containers/matchMaking/actions";
import { getWalletAmount } from "~containers/wallet/actions";
import { selectAvailableAmount } from "~containers/wallet/reducer";
import { withTranslation } from "react-i18next";
import { getGamerTag } from "~service/matches/adapter";
import hoistStatics from "hoist-non-react-statics";
import {
  createMessage,
  initGlobalChatHub,
  postHubMessages
} from "~containers/globalChat/actions";
import { getParameterByName } from "../../util/util";
import { selectIsConnectionCreated } from "~containers/globalChat/reducer";
import { toSelectedTournamentPrizeRange } from "~service/games/adapter";
import PaywallPopup from "~components/custom/matches/paywallPopup";
import ErrorToastNotification from "~components/custom/toastNotification/errorToastNotification";

class CreateChallenge extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gameId: parseInt(props.match.params.gameId) || 0,
      ruleId: 0,
      gamesAndRulesLoaded: false,
      ruleDescription: "",
      prize: 0,
      lowBalance: false,
      isSubmit: false,
      submitting: false,
      showPaywallPopup: false,
      matchType: 1
    };
    this.onGameIdChange = this.onGameIdChange.bind(this);
    this.onRuleIdChange = this.onRuleIdChange.bind(this);
    this.onPrizeChange = this.onPrizeChange.bind(this);
    this.onMatchTypeChange = this.onMatchTypeChange.bind(this);
    this.getTournamentPoints = this.getTournamentPoints.bind(this);
    this.handleClosePaywallPopup = this.handleClosePaywallPopup.bind(this);
  }

  componentDidMount() {
    const {
      selectedLanguage,
      onLoadGamesAndRules,
      onLoadTournamentPointsTable,
      onLoadWallet,
      onLoadProfile,
      tournamentPointsTable
    } = this.props;

    onLoadProfile();
    onLoadWallet();
    onLoadGamesAndRules({ language: selectedLanguage }).then(gamesAndRules => {
      let isTournament = getParameterByName(
        TOURNAMENT_QUERY_STRING_PARAM,
        this.props.history.location.search
      );

      if (!tournamentPointsTable.size) {
        onLoadTournamentPointsTable();
      }
      if (isTournament) {
        let game = gamesAndRules.find(r => r.id === this.state.gameId);
        let rules = game && game.gameRules;
        let rule = rules.find(r => r.isTournamentMode === true);
        if (rule) {
          let ruleId = rule.id;
          let ruleDescription = rule.summary;
          this.setState({ ruleId, ruleDescription });
        } else {
          this.setState({ ruleId: 0 });
        }
      }

      this.setState({ gamesAndRulesLoaded: true });
    });
  }

  componentWillUnmount() {
    const { onResetTournament, onResetError } = this.props;

    onResetTournament();
    onResetError();
  }

  componentDidUpdate(prevProps) {
    const { error, t } = this.props;

    if (prevProps.error !== error) {
      if (error === "GenericError") {
        toast(
          <ErrorToastNotification
            message={t(error)}
            action={{
              text: t("Contact"),
              handler: () =>
                window.open("https://www.gamechampions.com/contact")
            }}
          />,
          {
            className: "toast-custom",
            hideProgressBar: true,
            closeButton: false
          }
        );
      } else if (error === "InsufficientFunds") {
        return;
      } else {
        toast(<ErrorToastNotification message={t(error)} />, {
          className: "toast-custom",
          hideProgressBar: true,
          closeButton: false
        });
      }
    }
  }

  onGameIdChange(value) {
    const gameId = parseInt(value);
    this.props.onLoadTournament({
      gameId,
      language: this.props.selectedLanguage
    });
    this.setState({ gameId, ruleId: 0, ruleDescription: "" });
  }

  onMatchTypeChange(value) {
    this.setState({ matchType: value ? MATCHTYPE.INCOGNITO : MATCHTYPE.RIVAL });
  }

  onRuleIdChange(value) {
    const ruleId = parseInt(value);
    let game = this.props.gamesAndRules.find(
      r => r.get("id") === this.state.gameId
    );
    let rules = game && game.get("gameRules");
    let rule = rules.find(r => r.get("id") === ruleId);
    let ruleDescription = (rule && rule.get("summary")) || "";
    this.setState({ ruleId, ruleDescription });
  }

  onPrizeChange(value) {
    const { onGetEntryFee, availableAmount } = this.props;
    this.setState({ prize: value });
    if (!value) {
      this.setState({ entryFee: 0 });
      return;
    }
    onGetEntryFee({ prize: value }).then(entryFee =>
      this.setState({
        entryFee,
        lowBalance:
          isNaN(availableAmount) ||
          availableAmount < 1 ||
          entryFee > availableAmount
      })
    );
  }

  getTournamentPoints(selectedRule) {
    const { tournamentPointsTable } = this.props;
    const isTournamentMode = selectedRule && selectedRule.isTournamentMode;
    const { prize } = this.state;
    if (!prize && !isTournamentMode) return 0;
    const pointsTable = tournamentPointsTable.toJS();
    const range = toSelectedTournamentPrizeRange(pointsTable, prize);

    return range && range.win;
  }

  updateMatches() {
    const {
      onLoadGames,
      onLoadMatches,
      onLoadInstantMatches,
      profile,
      games,
      matchMakingGame
    } = this.props;
    const promises = [];

    if (matchMakingGame && matchMakingGame.get("id")) {
      promises.push(
        onLoadInstantMatches({ gameId: matchMakingGame.get("id") })
      );
    }

    if (games.size > 0) {
      promises.push(
        onLoadMatches({ userId: profile.get("id"), games: games.toJS() })
      );
    } else {
      promises.push(
        onLoadGames().then((response = {}) => {
          const { data = [] } = response;
          return onLoadMatches({ userId: profile.get("id"), games: data });
        })
      );
    }

    return Promise.all(promises);
  }

  handleSendChallenge(data, returnUrl) {
    const {
      history,
      onSubmitChallenge,
      tournament,
      profile,
      onPostHubMessages,
      isConnectionCreated,
      onInitGlobalChatHub,
      selectedLanguage,
      t
    } = this.props;
    if (this.state.lowBalance && !data.isTournamentMode) {
      this.setState({
        submitting: false
      });

      toast(
        <ErrorToastNotification
          message={t("LowBalanceMessage")}
          action={{
            text: t("AddFunds"),
            handler: () =>
              history.push(`/${selectedLanguage}/deposit/choose-amount`)
          }}
        />,
        {
          className: "toast-custom",
          hideProgressBar: true,
          closeButton: false
        }
      );
    } else {
      return onSubmitChallenge(data)
        .then(data => {
          // after you create the new challange, update the store
          this.updateMatches().then(() => {
            this.setState({
              submitting: false
            });

            let tournamentPrize =
              tournament &&
              tournament
                .get("prizes")
                .map(x => parseInt(x))
                .reduce((a, b) => a + b, 0);
            let messagedata = {
              messageText: "PublicChallengeHasBeenCreated",
              isFromSender: true,
              isTranslatable: true,
              isLink: true,
              gameId: data.gameId,
              isTournamentMode: data.isTournamentMode,
              prize: data.prize > 0 ? data.prize : tournamentPrize,
              userId: profile.get("id")
            };
            if (!isConnectionCreated) {
              onInitGlobalChatHub().then(() => {
                onPostHubMessages(messagedata);
              });
            } else {
              onPostHubMessages(messagedata);
            }

            return history.push(returnUrl + data.id);
          });
        })
        .catch(error => {
          if (
            error.status === 400 &&
            error.data === "PlayerDailyFreeMatchesExceeded"
          ) {
            this.setState({ showPaywallPopup: true });
          }

          if (error.data === "PlayerExceededInstantMatchLimit") {
            toast(
              <ErrorToastNotification
                message={t("PlayerExceededInstantMatchLimit")}
              />,
              {
                className: "toast-custom",
                hideProgressBar: true,
                closeButton: false
              }
            );
          }

          this.setState({
            submitting: false
          });
        });
    }
  }

  handleClosePaywallPopup() {
    this.setState({ showPaywallPopup: false });
  }

  render() {
    const {
      page,
      match,
      history,
      profile,
      walletBalance,
      gamesAndRules,
      location = {},
      previousLocation = {},
      selectedLanguage,
      t
    } = this.props;

    const returnUrl =
      previousLocation.pathname != location.pathname
        ? previousLocation.pathname
        : RETURN_URL + selectedLanguage;

    let gamesDropdownOptions = null;
    let rulesDropdownOptions = null;
    let selectedRule = null;

    // there is a problem that once dropdown is populated with a nonempty array of options it can't be populated again with other options
    // so this way I prevent rules dropdown to be populated until gamesAndRules are loaded
    if (this.state.gamesAndRulesLoaded) {
      const game = gamesAndRules.find(g => g.get("id") === this.state.gameId);
      const rules = game && game.get("gameRules").toJS();
      rulesDropdownOptions =
        rules &&
        rules.reduce(
          (a, c) => (c.id == this.state.ruleId ? [c].concat(a) : a.concat([c])),
          []
        );

      gamesDropdownOptions = game
        ? gamesAndRules
            .toJS()
            .reduce(
              (a, c) =>
                c.id == game.get("id") ? [c].concat(a) : a.concat([c]),
              []
            )
        : gamesAndRules.toJS();

      if (!this.state.gameId) {
        gamesDropdownOptions.unshift({ id: -1, title: t("SelectGame") });
      }

      if (this.state.ruleId === 0) {
        if (Array.isArray(rulesDropdownOptions)) {
          rulesDropdownOptions.unshift({ id: -1, title: t("SelectRule") });
        } else {
          rulesDropdownOptions = [{ id: -1, title: t("SelectRule") }];
        }
      }

      selectedRule =
        rulesDropdownOptions &&
        rulesDropdownOptions.find(r => r.id === this.state.ruleId);
    }

    return (
      <>
        {this.state.showPaywallPopup ? (
          <PaywallPopup
            closeUrl={returnUrl}
            history={history}
            walletBalance={walletBalance}
            match={match}
            language={selectedLanguage}
            onClose={this.handleClosePaywallPopup}
          />
        ) : (
          <Modal>
            <Card
              title={page.get("title")}
              html={page.get("html")}
              buttons={page.buttons}
              className="create-challenge-form"
              closeUrl={returnUrl}
            >
              <DynamicForm
                action={match.url}
                formFields={getFormFields({
                  activeRule: this.state.ruleDescription,
                  gamesOptions: gamesDropdownOptions,
                  gameRulesOptions: rulesDropdownOptions,
                  onMatchTypeChange: this.onMatchTypeChange,
                  selectedEntryFee: this.state.entryFee,
                  selectedPrize: this.state.prize,
                  currency: profile.get("currency") || "$",
                  hideEntryFee: selectedRule && selectedRule.isTournamentMode,
                  points: this.getTournamentPoints(selectedRule),
                  onSelectGameChange: this.onGameIdChange,
                  onSelectGameRuleChange: this.onRuleIdChange,
                  onPrizeChange: this.onPrizeChange,
                  isDirectChallenge: false
                })}
                submitButtonDisabled={
                  !this.state.gameId ||
                  !this.state.ruleId ||
                  (selectedRule &&
                    !selectedRule.isTournamentMode &&
                    !this.state.prize)
                }
                submitButtonLabel="ButtonDynamicFormCreate"
                returnUrl={returnUrl}
                loading={this.state.submitting}
                onSubmit={e => {
                  this.setState({ isSubmit: true, submitting: true });

                  let rule = rulesDropdownOptions.find(
                    r => r.id === this.state.ruleId
                  );
                  const data = { ...e };
                  delete data.games;
                  delete data.gameRulesFormat;
                  data.gameId = this.state.gameId;
                  data.ruleId = this.state.ruleId;
                  data.ruleFormat = rule.ruleDescription;
                  data.summary = rule.summary;
                  data.thumbnailUrl = rule.thumbnail
                    ? rule.thumbnail.imageUrl
                    : "";
                  data.rule = rule.title;
                  data.isChampionsMode = rule.isChampionsMode;
                  data.isTournamentMode = rule.isTournamentMode;
                  data.prize = rule.isTournamentMode ? 0 : this.state.prize;
                  data.matchType = this.state.matchType;
                  this.handleSendChallenge(
                    data,
                    `/${selectedLanguage}/match-lobby/`
                  );
                }}
                onCancel={e => {
                  e.preventDefault();
                  history.push(returnUrl);
                }}
              />
            </Card>
          </Modal>
        )}
      </>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchGameRulesAndAccountBalance({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  profile: selectProfile(state),
  walletBalance: selectAvailableAmount(state),
  gamesAndRules: selectGamesAndRules(state),
  tournament: selectTournament(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  games: selectGames(state),
  matchMakingGame: selectMatchMakingGame(state),
  availableAmount: selectAvailableAmount(state),
  error: selectError(state),
  isConnectionCreated: selectIsConnectionCreated(state),
  tournamentPointsTable: selectTournamentPointsTable(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadGamesAndRules: data => dispatch(getGamesAndRules(data)),
  onLoadTournament: data => dispatch(getTournament(data)),
  onResetTournament: () => dispatch(resetTournament()),
  onLoadProfile: () => dispatch(getProfile()),
  onSubmitChallenge: data => dispatch(submitChallenge(data)),
  onLoadMatches: data => dispatch(getMatches(data)),
  onLoadGames: data => dispatch(getGames(data)),
  onLoadInstantMatches: data => dispatch(getInstantMatches(data)),
  onLoadWallet: data => dispatch(getWalletAmount(data)),
  onResetError: () => dispatch(resetError()),
  onCreateMessage: data => dispatch(createMessage(data)),
  onPostHubMessages: data => dispatch(postHubMessages(data)),
  onInitGlobalChatHub: () => dispatch(initGlobalChatHub()),
  onLoadTournamentPointsTable: () => dispatch(getTournamentPointsTable()),
  onGetEntryFee: data => dispatch(getEntryFee(data))
});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(CreateChallenge), CreateChallenge)),
  getPage,
  REDUCER_NAME
);
