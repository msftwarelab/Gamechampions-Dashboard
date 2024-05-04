import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";
import hoistStatics from "hoist-non-react-statics";
import ErrorToastNotification from "~components/custom/toastNotification/errorToastNotification";

import { withAuth, withPage } from "~hocs";
import {
  REDUCER_NAME,
  getWithdrawFormFields,
  PLAYER_BALANCE_INTERVAL_TIME,
  WITHDRAWAL_TYPE
} from "./constants";
import {
  selectSelectedPlayer,
  selectSelectedPlayerBalance,
  selectIsLoading
} from "./reducer";
import {
  fetchPlayerWithdraw,
  getPlayerBalance,
  resetSelectedPlayer,
  submitPlayerWithdraw
} from "./actions";
import PlayerWithdrawForm from "~components/custom/players/playerWithdrawForm";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth } from "../app/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";

class PlayerWithdraw extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      withdrawError: ""
    };
  }

  componentDidMount() {
    const { onLoadPlayerBalance, selectedPlayer } = this.props;

    onLoadPlayerBalance({ id: selectedPlayer.get("id") });

    this.interval = setInterval(() => {
      if (selectedPlayer) {
        onLoadPlayerBalance({ id: selectedPlayer.get("id") });
      }
    }, PLAYER_BALANCE_INTERVAL_TIME);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.onResetSelectedPlayer();
  }

  render() {
    const {
      selectedPlayer,
      selectedPlayerBalance,
      selectedLanguage,
      isLoading,
      page,
      match,
      history,
      onPlayerWithdrawSubmit,
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
          <PlayerWithdrawForm
            withdrawError={this.state.withdrawError}
            selectedLanguage={selectedLanguage}
            selectedPlayer={selectedPlayer}
            selectedPlayerBalance={selectedPlayerBalance}
            isLoading={isLoading}
            action={match.url}
            formFields={getWithdrawFormFields({
              maxAccountValue: selectedPlayerBalance.get("availableAmount")
            })}
            returnUrl={`/${selectedLanguage}`}
            onSubmit={(e = {}) => {
              onPlayerWithdrawSubmit({
                ...e,
                playerId: selectedPlayer.get("id"),
                WithdrawalType: WITHDRAWAL_TYPE.EU_SEPA_TRANSFER
              })
                .then(() => {
                  history.push(
                    `/${selectedLanguage}/all-players?success=true&action=save&object=Withdraw`
                  );
                })
                .catch(error => {
                  this.setState({ withdrawError: t("TransactionError") });
                  toast(
                    <ErrorToastNotification
                      message={t(`BoyError${error.data.errorCode}`)}
                    />,
                    {
                      className: "toast-custom",
                      hideProgressBar: true,
                      closeButton: false
                    }
                  );
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
  selectedPlayer: selectSelectedPlayer(state),
  selectedPlayerBalance: selectSelectedPlayerBalance(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadPlayerBalance: data => dispatch(getPlayerBalance(data)),
  onResetSelectedPlayer: data => dispatch(resetSelectedPlayer(data)),
  onPlayerWithdrawSubmit: data => dispatch(submitPlayerWithdraw(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(PlayerWithdraw), PlayerWithdraw)),
    getPage,
    REDUCER_NAME
  )
);
