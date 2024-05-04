import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";
import { withAuth, withPage } from "~hocs";
import { REDUCER_NAME, FORM_FIELDS_PLAYER_XP_POINTS } from "./constants";
import { selectSelectedPlayer, selectPlayers, selectXpPoints } from "./reducer";
import { selectGames } from "../games/reducer";
import {
  fetchPlayerWithdraw,
  getPlayerXpPoints,
  resetSelectedPlayer,
  setSelectedPlayer,
  updateAdminPlayer,
  updatePlayerXpPoints
} from "./actions";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { FlexBox, Span } from "~components/atoms";

class PlayerWithdraw extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onSelectChange = this.onSelectChange.bind(this);
  }
  onSelectChange(gameType) {
    const { selectedPlayer, onGetXPPoints } = this.props;

    onGetXPPoints({ playerId: selectedPlayer.get("id"), gameType });
  }

  componentDidMount() {
    const { onSetPlayer, match, players, games } = this.props;
    const { params = {} } = match;
    const { playerId } = params;

    if (players && players.size && playerId) {
      onSetPlayer(players.toJS().find(item => item.id == parseInt(playerId)));
    }
    let game = games.get(0);
    this.onSelectChange(game.get("gameType"));
  }

  componentWillUnmount() {
    this.props.onResetSelectedPlayer();
  }

  render() {
    const {
      selectedLanguage,
      history,
      games,
      xpPoints,
      selectedPlayer,
      onUpdatePlayerXpPoints,
      t
    } = this.props;

    let returnUrl = `/${selectedLanguage}/all-players`;
    return (
      <Modal onClick={() => history.push(returnUrl)}>
        <Card closeUrl={returnUrl} className="player-details-form">
          <FlexBox padding="1em 0">
            <DynamicForm
              formFields={FORM_FIELDS_PLAYER_XP_POINTS({
                games,
                label: () => (
                  <Span fontWeight="bold">
                    {" "}
                    {t("CurrentXP")} {xpPoints}
                  </Span>
                ),
                onSelectChange: this.onSelectChange
              })}
              returnUrl={returnUrl}
              onSubmit={e => {
                this.setState({ submitting: true });
                let data = {};
                data.playerId = selectedPlayer.get("id");
                data.gameType = e.games;
                data.xpPoints = e.xpPoint;
                return onUpdatePlayerXpPoints(data)
                  .then(() => {
                    history.push(
                      returnUrl + `/${selectedPlayer.get("id")}/player-xp`
                    );
                  })
                  .then(() =>
                    history.push(
                      returnUrl + "?success=true&action=edit&object=profile"
                    )
                  )
                  .catch(() =>
                    history.push(
                      returnUrl + "?success=false&action=edit&object=profile"
                    )
                  );
              }}
            />
          </FlexBox>
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
  selectedLanguage: selectSelectedLanguage(state),
  selectedPlayer: selectSelectedPlayer(state),
  players: selectPlayers(state),
  games: selectGames(state),
  xpPoints: selectXpPoints(state)
});

const mapDispatchToProps = dispatch => ({
  onResetSelectedPlayer: data => dispatch(resetSelectedPlayer(data)),
  onSetPlayer: data => dispatch(setSelectedPlayer(data)),
  onUpdatePlayer: data => dispatch(updateAdminPlayer(data)),
  onGetXPPoints: data => dispatch(getPlayerXpPoints(data)),
  onUpdatePlayerXpPoints: data => dispatch(updatePlayerXpPoints(data))
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
