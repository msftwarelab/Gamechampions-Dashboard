import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import { withAuth, withPage } from "~hocs";
import { REDUCER_NAME, getCreditFormFields } from "./constants";
import { selectSelectedPlayer, selectIsLoading } from "./reducer";
import {
  fetchPlayerWithdraw,
  resetSelectedPlayer,
  submitPlayerCredit
} from "./actions";
import PlayerCreditForm from "~components/custom/players/playerCreditForm";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";

class PlayerCredit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      creditId: 10,
      error: ""
    };
    this.onCreditIdChange = this.onCreditIdChange.bind(this);
  }

  componentWillUnmount() {
    this.props.onResetSelectedPlayer();
  }

  onCreditIdChange(value) {
    const creditId = parseInt(value);
    this.setState({ creditId });
  }

  render() {
    const {
      selectedPlayer,
      selectedLanguage,
      isLoading,
      page,
      match,
      history,
      onPlayerCreditSubmit,
      t
    } = this.props;

    return (
      <Modal onClick={() => history.push(`/${selectedLanguage}/all-players`)}>
        <Card
          html={page.get("html")}
          htmlProps={{
            margin: "1rem 0"
          }}
          title={page.get("title")}
          closeUrl={`/${selectedLanguage}/all-players`}
          className="withdrawal-form"
        >
          <PlayerCreditForm
            error={this.state.error}
            isLoading={isLoading}
            action={match.url}
            formFields={getCreditFormFields({
              onSelectCreditTypeChange: this.onCreditIdChange,
              bonusCampaignOptions: []
            })}
            returnUrl={`/${selectedLanguage}`}
            onSubmit={(e = {}) => {
              onPlayerCreditSubmit({
                ...e,
                state: 2,
                type: 6,
                subtype: this.state.creditId,
                playerId: selectedPlayer.get("id")
              })
                .then(() => {
                  history.push(
                    `/${selectedLanguage}/all-players?success=true&action=save&object=Credit`
                  );
                })
                .catch(() => {
                  this.setState({ error: t("TransactionError") });
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
  selectedPlayer: selectSelectedPlayer(state)
});

const mapDispatchToProps = dispatch => ({
  onResetSelectedPlayer: data => dispatch(resetSelectedPlayer(data)),
  onPlayerCreditSubmit: data => dispatch(submitPlayerCredit(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(PlayerCredit), PlayerCredit)),
    getPage,
    REDUCER_NAME
  )
);
