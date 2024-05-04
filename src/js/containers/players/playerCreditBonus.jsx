import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import { withAuth, withPage } from "~hocs";
import { REDUCER_NAME, getCreditBonusFormFields } from "./constants";
import {
  selectSelectedPlayer,
  selectIsLoading,
  selectSelectedPlayerBalance
} from "./reducer";
import {
  fetchPlayerWithdraw,
  getPlayerBalance,
  resetSelectedPlayer,
  submitPlayerCreditBonus
} from "./actions";
import PlayerCreditBonusForm from "~components/custom/players/playerCreditBonusForm";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import { Credit } from "~service/constants";
import { getDirectBonusCampaings } from "~containers/bonusCampaigns/actions";
import { selectDirectBonuses } from "~containers/bonusCampaigns/reducer";

class PlayerCreditBonus extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: ""
    };
  }

  componentDidMount() {
    const {
      onLoadPlayerBalance,
      selectedPlayer,
      onGetDirectBonusCampaigns
    } = this.props;

    onGetDirectBonusCampaigns();
    onLoadPlayerBalance({ id: selectedPlayer && selectedPlayer.get("id") });
  }
  componentWillUnmount() {
    this.props.onResetSelectedPlayer();
  }

  render() {
    const {
      selectedPlayer,
      selectedLanguage,
      isLoading,
      page,
      match,
      history,
      onPlayerCreditBonusSubmit,
      selectedPlayerBalance,
      directBonusCampaigns,
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
        >
          <PlayerCreditBonusForm
            bonusBalance={
              selectedPlayerBalance && selectedPlayerBalance.get("bonusMoney")
            }
            error={this.state.error}
            isLoading={isLoading}
            action={match.url}
            formFields={getCreditBonusFormFields({
              bonusCampaignOptions: directBonusCampaigns.toJS()
            })}
            returnUrl={`/${selectedLanguage}`}
            onSubmit={(e = {}) => {
              onPlayerCreditBonusSubmit({
                ...e,
                ...Credit,
                playerId: selectedPlayer.get("id")
              })
                .then(() => {
                  history.push(
                    `/${selectedLanguage}/all-players?success=true&action=save&object=Bonus`
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
  selectedPlayer: selectSelectedPlayer(state),
  selectedPlayerBalance: selectSelectedPlayerBalance(state),
  directBonusCampaigns: selectDirectBonuses(state)
});

const mapDispatchToProps = dispatch => ({
  onResetSelectedPlayer: data => dispatch(resetSelectedPlayer(data)),
  onPlayerCreditBonusSubmit: data => dispatch(submitPlayerCreditBonus(data)),
  onLoadPlayerBalance: data => dispatch(getPlayerBalance(data)),
  onGetDirectBonusCampaigns: () => dispatch(getDirectBonusCampaings())
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(PlayerCreditBonus), PlayerCreditBonus)),
    getPage,
    REDUCER_NAME
  )
);
