import React from "react";
import { connect } from "react-redux";

import Modal from "~components/modal/modal";
import { getPage } from "../page/actions";
import { withPage } from "~hocs";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import {
  RETURN_URL,
  getMatchMakingOptions,
  REDUCER_NAME,
  CREATE_ACTION
} from "./constants";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import {
  fetchGameRulesAndAccountBalance,
  getGamesAndRules
} from "../createChallenge/actions";
import { selectGamesAndRules } from "../createChallenge/reducer";
import { createAdminMatch } from "./actions";

class MatchMaking extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      apiErrorMessage: "",
      isSuccess: false,
      submitting: false,
      action: props.match.params.gameAction || CREATE_ACTION,
      gamesAndRulesLoaded: false,
      gameId: 0,
      ruleId: 0,
      ruleDescription: "",
      isSubmit: false
    };
    this.onGameIdChange = this.onGameIdChange.bind(this);
    this.onRuleIdChange = this.onRuleIdChange.bind(this);
    this.submitSuccessCallback = this.submitSuccessCallback.bind(this);
    this.submitFailureCallback = this.submitFailureCallback.bind(this);
  }

  componentDidMount() {
    const { onLoadGamesAndRules, selectedLanguage } = this.props;
    onLoadGamesAndRules({ language: selectedLanguage }).then(() => {
      this.setState({ gamesAndRulesLoaded: true });
    });
  }

  onGameIdChange(value) {
    const gameId = parseInt(value);

    this.setState({ gameId, ruleId: 0, ruleDescription: "" });
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

  submitSuccessCallback() {
    const { history, selectedLanguage } = this.props;
    this.setState({
      isSuccess: true,
      submitting: false
    });
    history.push(
      `/${selectedLanguage}/admin-matches?success=true&action=create&object=Match`
    );
  }

  submitFailureCallback(err) {
    const { t } = this.props;

    const errorMessage = t(err.data);
    this.setState({
      apiErrorMessage: errorMessage,
      submitting: false
    });
  }

  render() {
    const {
      page,
      match,
      history,
      location = {},
      previousLocation = {},
      selectedLanguage,
      gamesAndRules,
      onCreateAdminMatch
    } = this.props;

    const { action, submitting, apiErrorMessage } = this.state;

    const returnUrl =
      previousLocation.pathname != location.pathname
        ? previousLocation.pathname
        : RETURN_URL + selectedLanguage;

    let gamesDropdownOptions = null;
    let rulesDropdownOptions = null;

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
        gamesDropdownOptions.unshift({ id: -1, title: "Select Game" });
      }

      if (this.state.ruleId === 0) {
        if (Array.isArray(rulesDropdownOptions)) {
          rulesDropdownOptions.unshift({ id: -1, title: "Select Rule" });
        } else {
          rulesDropdownOptions = [{ id: -1, title: "Select Rule" }];
        }
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
            mode={action}
            returnUrl={returnUrl}
            formFields={getMatchMakingOptions({
              hideBetAmount: selectedRule && selectedRule.isTournamentMode,
              gamesOptions: gamesDropdownOptions,
              gameRulesOptions: rulesDropdownOptions,
              onSelectGameChange: this.onGameIdChange,
              onSelectGameRuleChange: this.onRuleIdChange
            })}
            loading={submitting}
            apiErrorMessage={apiErrorMessage}
            submitButtonDisabled={!this.state.gameId || !this.state.ruleId}
            onSubmit={data => {
              this.setState({ isSubmit: true, submitting: true });
              let rule = rulesDropdownOptions.find(
                r => r.id === this.state.ruleId
              );
              const req = {
                ruleFormat: rule.ruleDescription,
                rule: rule.title,
                summary: rule.summary,
                thumbnailUrl: rule.thumbnail?.imageUrl,
                isChampionsMode: rule.isChampionsMode,
                isTournamentMode: rule.isTournamentMode,
                prize: rule.isTournamentMode ? 0 : data.prize,
                ...data
              };
              onCreateAdminMatch(req)
                .then(() => this.submitSuccessCallback())
                .catch(error => this.submitFailureCallback(error));
            }}
            onCancel={e => {
              e.preventDefault();
              history.push(returnUrl);
            }}
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
  selectedLanguage: selectSelectedLanguage(state),
  gamesAndRules: selectGamesAndRules(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadGamesAndRules: data => dispatch(getGamesAndRules(data)),
  onCreateAdminMatch: data => dispatch(createAdminMatch(data))
});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(MatchMaking), MatchMaking)),
  getPage,
  REDUCER_NAME
);
