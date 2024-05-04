import React from "react";
import { connect } from "react-redux";

import Modal from "~components/modal/modal";
import { getPage } from "../../page/actions";
import { withPage } from "~hocs";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import {
  RETURN_URL,
  FORM_FIELDS,
  REDUCER_NAME,
  DEFAULT_ACTION
} from "../constants";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { createGame } from "../actions";
import { selectGames } from "~containers/games/reducer";
import { fetchGames, getGames } from "~containers/games/actions";

class GameDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      apiErrorMessage: "",
      isSuccess: false,
      submitting: false,
      action: props.match.params.gameAction || DEFAULT_ACTION
    };

    this.submitSuccessCallback = this.submitSuccessCallback.bind(this);
    this.submitFailureCallback = this.submitFailureCallback.bind(this);
  }

  submitSuccessCallback() {
    const { history, selectedLanguage } = this.props;
    this.setState({
      isSuccess: true,
      submitting: false
    });
    history.push(
      `/${selectedLanguage}/admin-games` +
        "?success=true&action=create&object=Game"
    );
  }

  submitFailureCallback(err) {
    const { t, history, selectedLanguage } = this.props;

    const errorMessage = t(err.data);
    this.setState({
      apiErrorMessage: errorMessage,
      submitting: false
    });
    history.push(
      `/${selectedLanguage}` + "?success=false&action=create&object=Game"
    );
  }

  render() {
    const {
      page,
      match,
      history,
      location = {},
      previousLocation = {},
      selectedLanguage,
      onCreateGame
    } = this.props;

    const { action, submitting, apiErrorMessage } = this.state;

    const returnUrl =
      previousLocation.pathname != location.pathname
        ? previousLocation.pathname
        : RETURN_URL + selectedLanguage;

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
            formFields={FORM_FIELDS}
            loading={submitting}
            apiErrorMessage={apiErrorMessage}
            onSubmit={data => {
              this.setState({
                apiErrorMessage: "",
                submitting: true
              });
              return onCreateGame(data)
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
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadGames: () => dispatch(getGames()),
  onCreateGame: data => dispatch(createGame(data))
});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(GameDetails), GameDetails)),
  getPage,
  REDUCER_NAME
);
