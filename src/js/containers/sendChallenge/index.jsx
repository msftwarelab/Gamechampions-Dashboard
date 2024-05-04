import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import Modal from "../../components/modal/modal";
import {
  getGamesAndRules,
  fetchGameRulesAndAccountBalance,
  getTournament,
  resetTournament,
  getEntryFee
} from "../createChallenge/actions";
import {
  selectGamesAndRules,
  selectTournament
} from "../createChallenge/reducer";
import { resetError } from "./actions";
import { selectError, selectIsLoading } from "./reducer";
import { getPage } from "../page/actions";
import { withPage } from "~hocs";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { getFormFields, REDUCER_NAME } from "../createChallenge/constants";
import { MATCHTYPE } from "~containers/createChallenge/constants";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectProfile } from "~containers/myaccount/reducer";
import { getGamerTag } from "~service/matches/adapter";
import { withTranslation } from "react-i18next";
import { getMatches } from "~containers/matches/actions";
import { getGames, getTournamentPointsTable } from "~containers/games/actions";
import { getWalletAmount } from "~containers/wallet/actions";
import {
  selectGames,
  selectTournamentPointsTable
} from "~containers/games/reducer";
import { selectAvailableAmount } from "~containers/wallet/reducer";
import { getProfile } from "~containers/myaccount/actions";
import { ErrorInfo } from "~components/custom/errorInfo";
import { sendChallenge } from "./actions";
import hoistStatics from "hoist-non-react-statics";
import { toSelectedTournamentPrizeRange } from "~service/games/adapter";
import ErrorToastNotification from "~components/custom/toastNotification/errorToastNotification";

class SendChallenge extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gameId: parseInt(props.match.params.gameId) || 0,
      prize: 0,
      ruleDescription: "",
      betAmount: 0,
      lowBalance: false,
      isSubmit: false,
      submitting: false,
      matchType: 1
    };
    this.onGameIdChange = this.onGameIdChange.bind(this);
    this.onRuleIdChange = this.onRuleIdChange.bind(this);
    this.onMatchTypeChange = this.onMatchTypeChange.bind(this);
    this.onPrizeChange = this.onPrizeChange.bind(this);
    this.getTournamentPoints = this.getTournamentPoints.bind(this);
  }

  componentDidMount() {
    const {
      onLoadGamesAndRules,
      onLoadWallet,
      onLoadProfile,
      onLoadTournament,
      match,
      tournamentPointsTable,
      onLoadTournamentPointsTable
    } = this.props;

    onLoadProfile();
    onLoadWallet();
    onLoadGamesAndRules();

    if (!tournamentPointsTable.size) {
      onLoadTournamentPointsTable();
    }

    const gameId = parseInt(match.params.gameId);
    if (gameId) {
      onLoadTournament({ gameId });
    }
  }

  componentWillUnmount() {
    const { onResetTournament, onResetError } = this.props;

    onResetTournament();
    onResetError();
  }

  onGameIdChange(value) {
    const gameId = parseInt(value);
    this.props.onLoadTournament({ gameId });
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
      this.setState({ betAmount: 0 });
      return;
    }
    onGetEntryFee({ prize: value }).then(betAmount =>
      this.setState({
        betAmount,
        lowBalance:
          isNaN(availableAmount) ||
          availableAmount < 1 ||
          betAmount > availableAmount
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
    const { onLoadGames, onLoadMatches, profile, games } = this.props;
    const promises = [];

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

  handleSendChallenge(data, selectedLanguage) {
    const { history, onSendchallenge } = this.props;
    if (this.state.lowBalance && !data.isTournamentMode) {
      this.setState({
        submitting: false
      });

      toast(
        <ErrorToastNotification
          message={this.props.t("LowBalanceMessage")}
          action={{
            text: this.props.t("AddFunds"),
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
      return onSendchallenge(data)
        .then(data => {
          this.updateMatches().then(() => {
            this.setState({
              submitting: false
            });
            return history.push(
              `/${selectedLanguage}/match-lobby/` +
                data?.id +
                "?success=true&action=create&object=Challenge"
            );
          });
        })
        .catch(error => {
          this.setState({
            submitting: false
          });

          toast(<ErrorToastNotification message={this.props.t(error.data)} />, {
            className: "toast-custom",
            hideProgressBar: true,
            closeButton: false
          });

          return history.push(
            `/${selectedLanguage}` +
              "?success=false&action=create&object=Challenge"
          );
        });
    }
  }
  render() {
    const {
      page,
      match,
      gamesAndRules,
      profile,
      selectedLanguage,
      t,
      error,
      history
    } = this.props;

    const returnUrl = this.props.location.state
      ? this.props.location.state.returnUrl
      : `${selectedLanguage}/arena`;
    const game = gamesAndRules.find(g => g.get("id") === this.state.gameId);
    let rulesDropdownOptions =
      game &&
      game
        .get("gameRules")
        .toJS()
        .filter(rule => !rule.isTournamentMode);
    const platForm =
      game && profile
        ? getGamerTag(profile.toJS(), game.get("gameType"))
        : null;

    const gamesDropdownOptions = game
      ? gamesAndRules
          .toJS()
          .reduce(
            (a, c) => (c.id == game.get("id") ? [c].concat(a) : a.concat([c])),
            []
          )
      : gamesAndRules.toJS();

    if (!this.state.gameId) {
      gamesDropdownOptions.unshift({ id: -1, title: "Select Game" });
    }

    if (!this.state.ruleId) {
      if (Array.isArray(rulesDropdownOptions)) {
        rulesDropdownOptions.unshift({ id: -1, title: "Select Rule" });
      } else {
        rulesDropdownOptions = [{ id: -1, title: "Select Rule" }];
      }
    }

    const selectedRule =
      rulesDropdownOptions &&
      rulesDropdownOptions.find(r => r.id === this.state.ruleId);

    return (
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
              selectedEntryFee: this.state.betAmount,
              selectedPrize: this.state.prize,
              currency: profile.get("currency") || "$",
              hideEntryFee: selectedRule && selectedRule.isTournamentMode,
              points: this.getTournamentPoints(selectedRule),
              onSelectGameChange: this.onGameIdChange,
              onSelectGameRuleChange: this.onRuleIdChange,
              onPrizeChange: this.onPrizeChange,
              isDirectChallenge: true
            })}
            submitButtonDisabled={
              !this.state.gameId ||
              !this.state.ruleId ||
              (selectedRule &&
                !selectedRule.isTournamentMode &&
                !this.state.prize)
            }
            submitButtonLabel="Send"
            returnUrl={`${returnUrl}/${match.params.playerId}`}
            loading={this.state.submitting}
            onSubmit={e => {
              this.setState({ isSubmit: true, submitting: true });
              if (!platForm.value) {
                toast(
                  <ErrorToastNotification
                    message={t("RequestPlayerTags")}
                    action={{
                      text: t("AddGamerTag"),
                      handler: () =>
                        history.push(
                          `/${selectedLanguage}/my-account/gamer-tags`
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
              let rule = rulesDropdownOptions.find(
                r => r.id === this.state.ruleId
              );
              const data = { ...e };
              delete data.games;
              delete data.gameRulesFormat;
              data.id = match.params.playerId;
              data.gameId = this.state.gameId;
              data.ruleId = this.state.ruleId;
              data.ruleFormat = this.state.ruleDescription;
              data.rule = rule.title;
              data.isChampionsMode = rule.isChampionsMode;
              data.isTournamentMode = rule.isTournamentMode;
              data.prize = rule.isTournamentMode ? 0 : this.state.prize;
              data.matchType = MATCHTYPE.RIVAL;
              this.handleSendChallenge(data, selectedLanguage);
            }}
            extraContents={error && <ErrorInfo>{t(error)}</ErrorInfo>}
          />
        </Card>
      </Modal>
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
  gamesAndRules: selectGamesAndRules(state),
  tournament: selectTournament(state),
  isLoading: selectIsLoading(state),
  profile: selectProfile(state),
  selectedLanguage: selectSelectedLanguage(state),
  games: selectGames(state),
  availableAmount: selectAvailableAmount(state),
  error: selectError(state),
  tournamentPointsTable: selectTournamentPointsTable(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadProfile: () => dispatch(getProfile()),
  onLoadGamesAndRules: () => dispatch(getGamesAndRules()),
  onLoadTournament: data => dispatch(getTournament(data)),
  onResetTournament: () => dispatch(resetTournament()),
  onLoadMatches: data => dispatch(getMatches(data)),
  onLoadGames: data => dispatch(getGames(data)),
  onLoadWallet: data => dispatch(getWalletAmount(data)),
  onResetError: () => dispatch(resetError()),
  onSendchallenge: data => dispatch(sendChallenge(data)),
  onLoadTournamentPointsTable: () => dispatch(getTournamentPointsTable()),
  onGetEntryFee: data => dispatch(getEntryFee(data))
});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(SendChallenge), SendChallenge)),
  getPage,
  REDUCER_NAME
);
