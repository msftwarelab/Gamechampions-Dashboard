import React from "react";
import { connect } from "react-redux";
import { withAuth, withPage } from "~hocs";
import { fetchGameRules } from "./actions";
import { REDUCER_NAME } from "./constants";
import { selectIsLoading } from "./reducer";
import GameRulesComponent from "~components/custom/gameRules";
import { getPage } from "~containers/page/actions";
import { selectGame } from "~containers/gameLobby/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { getGame } from "~containers/gameLobby/actions";
import { getDashboardFooter } from "~containers/boyGameLobby/actions";
import { selectDashboardFooter } from "~containers/boyGameLobby/reducer";

class GameRules extends React.PureComponent {
  componentDidMount() {
    const {
      game,
      onLoadGame,
      match,
      onGetDashboardFooter,
      selectedLanguage
    } = this.props;

    const gameId = parseInt(match.params.gameId);

    onLoadGame({ gameId: gameId, language: selectedLanguage });
    onGetDashboardFooter({ selectedLanguage });
  }

  render() {
    const { game, match, dashboardFooter } = this.props;

    return (
      <GameRulesComponent
        title={game.get("title")}
        gameRules={game.get("rules")}
        gameRulesContent={game.get("rulesContent")}
        gameId={parseInt(match.params.gameId)}
        dashboardFooter={dashboardFooter}
      />
    );
  }

  static fetchData(store, { url, params }) {
    return store.dispatch(
      fetchGameRules({
        pageData: {
          url
        },
        requestData: {
          gameId: parseInt(params.gameId)
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  game: selectGame(state),
  selectedLanguage: selectSelectedLanguage(state),
  isLoading: selectIsLoading(state),
  dashboardFooter: selectDashboardFooter(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadGame: data => dispatch(getGame(data)),
  onGetDashboardFooter: data => dispatch(getDashboardFooter(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(GameRules),
    getPage,
    REDUCER_NAME
  )
);
