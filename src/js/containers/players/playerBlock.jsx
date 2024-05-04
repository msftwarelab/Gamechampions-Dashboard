import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import { REDUCER_NAME, getBlockFormFields } from "./constants";
import { selectSelectedPlayer, selectIsLoading } from "./reducer";
import {
  fetchPlayerWithdraw,
  resetSelectedPlayer,
  submitPlayerBlock
} from "./actions";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth } from "../app/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { Loader } from "~components/atoms";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

class PlayerBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      error: null
    };
  }
  componentWillUnmount() {
    this.props.onResetSelectedPlayer();
  }
  render() {
    const {
      selectedLanguage,
      isLoading,
      page,
      match,
      history,
      onBlockPlayer,
      t
    } = this.props;

    if (isLoading) {
      return <Loader isLoading={isLoading} margin="5rem auto" scale="6rem" />;
    }
    return (
      <Modal onClick={() => history.push(`/${selectedLanguage}/all-players`)}>
        <Card
          html={page.get("html")}
          htmlProps={{
            margin: "1rem 0"
          }}
          title={page.get("title")}
          closeUrl={`/${selectedLanguage}/all-players`}
          className="player-details-form"
        >
          <DynamicForm
            apiErrorMessage={this.state.error}
            initialValues={{ barringType: this.state.type }}
            action={match.url}
            formFields={getBlockFormFields({
              onRadioChange: value => this.setState({ type: value }),
              isPermanent: () => this.state.type == 1
            })}
            returnUrl={`/${selectedLanguage}`}
            onSubmit={(e = {}) => {
              onBlockPlayer({
                ...e,
                playerId: match?.params?.playerId
              })
                .then(() => {
                  history.push(
                    `/${selectedLanguage}/all-players?success=true&action=save&object=Block`
                  );
                })
                .catch(() => {
                  this.setState({ error: t("BarringError") });
                });
            }}
            onCancel={e => {
              e.preventDefault();
              history.push(`/${selectedLanguage}/all-players`);
            }}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language, params }) {
    const { playerId } = params;
    return store.dispatch(
      fetchPlayerWithdraw({
        pageData: {
          url,
          language
        },
        requestData: {
          id: playerId
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  selectedPlayer: selectSelectedPlayer(state)
});

const mapDispatchToProps = dispatch => ({
  onResetSelectedPlayer: data => dispatch(resetSelectedPlayer(data)),
  onBlockPlayer: data => dispatch(submitPlayerBlock(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(PlayerBlock), PlayerBlock)),
    getPage,
    REDUCER_NAME
  )
);
