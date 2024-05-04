import React from "react";
import { connect } from "react-redux";

import { fetchGameLobby, getGameTickerMatches, getGame } from "./actions";
import { selectGame, selectGameTickerMatches } from "./reducer";
import GameLobbyComponent from "~components/custom/gameLobby";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectProfile } from "~containers/myaccount/reducer";
import { getTournament } from "~containers/tournaments/actions";
import { selectTournament } from "~containers/tournaments/reducer";
import {
  selectBrandConfig,
  selectGameLobbyTabsConfig,
  selectIsMobile,
  selectTickerConfig
} from "~containers/app/reducer";

class GameLobby extends React.PureComponent {
  componentDidMount() {
    const {
      game,
      onLoadGame,
      onLoadGameTickerMatches,
      gameId,
      selectedLanguage,
      onLoadTournament
    } = this.props;

    if (!(game && game.get("id") && game.get("id") === gameId)) {
      onLoadGame({ gameId, language: selectedLanguage });
      onLoadGameTickerMatches({ gameId });
    }
    onLoadTournament({ gameId: gameId, language: selectedLanguage });
  }

  render() {
    const {
      tickerMatches,
      gameId,
      isTournament,
      selectedLanguage,
      game,
      profile,
      tournament,
      isMobile,
      gameLobbyTabsConfig,
      tickerConfig,
      brandConfig
    } = this.props;

    return (
      <GameLobbyComponent
        createChallengeUrl={
          isTournament
            ? `/${selectedLanguage}/create-challenge/${gameId}?tournament=true`
            : `/${selectedLanguage}/create-challenge/${gameId}`
        }
        selectedLanguage={selectedLanguage}
        game={game}
        tickerMatches={tickerMatches}
        gameId={gameId}
        isTournament={isTournament}
        profile={profile}
        tournament={tournament}
        isMobile={isMobile}
        getGameLobbyEnabledTabs={gameLobbyTabsConfig.toJS()}
        getTickerEnabled={tickerConfig.get("isEnabled")}
        websiteUrl={brandConfig.get("websiteUrl")}
      />
    );
  }

  static fetchData(store, { params }) {
    return store.dispatch(
      fetchGameLobby({
        requestData: {
          gameId: parseInt(params.gameId)
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  tickerMatches: selectGameTickerMatches(state),
  game: selectGame(state),
  selectedLanguage: selectSelectedLanguage(state),
  profile: selectProfile(state),
  tournament: selectTournament(state),
  isMobile: selectIsMobile(state),
  tickerConfig: selectTickerConfig(state),
  gameLobbyTabsConfig: selectGameLobbyTabsConfig(state),
  brandConfig: selectBrandConfig(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadGameTickerMatches: data => dispatch(getGameTickerMatches(data)),
  onLoadGame: data => dispatch(getGame(data)),
  onLoadTournament: data => dispatch(getTournament(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameLobby);
