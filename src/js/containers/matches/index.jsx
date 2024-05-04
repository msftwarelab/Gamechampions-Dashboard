import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import { getMatches, getSportsMatches } from "./actions";
import { REDUCER_NAME } from "./constants";
import { selectMatches, selectIsLoading } from "./reducer";
import MatchesComponent from "~components/custom/matches";
import { getPage } from "~containers/page/actions";
import { selectProfile } from "~containers/myaccount/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectGames } from "~containers/games/reducer";
import { getGames } from "~containers/games/actions";

class Matches extends React.PureComponent {
  componentDidMount() {
    const {
      onLoadGames,
      onLoadMatches,
      profile,
      games,
      selectedLanguage
    } = this.props;

    if (games.size > 0) {
      onLoadMatches({
        userId: profile.get("id"),
        games: games.toJS(),
        selectedLanguage: selectedLanguage
      });
    } else {
      onLoadGames().then(response =>
        onLoadMatches({
          userId: profile.get("id"),
          games: response,
          selectedLanguage: selectedLanguage
        })
      );
    }
  }

  render() {
    const {
      matches,
      match,
      games,
      profile,
      onLoadSportsMatches,
      selectedLanguage,
      isLoading,
      history
    } = this.props;
    return (
      <MatchesComponent
        sportsMatches={matches}
        match={match}
        selectedLanguage={selectedLanguage}
        isLoading={isLoading}
        history={history}
        profile={profile}
        games={games}
        onLoadSportsMatches={onLoadSportsMatches}
      />
    );
  }
}

const mapStateToProps = state => ({
  profile: selectProfile(state),
  matches: selectMatches(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  games: selectGames(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadMatches: data => dispatch(getMatches(data)),
  onLoadSportsMatches: data => dispatch(getSportsMatches(data)),
  onLoadGames: data => dispatch(getGames(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(Matches),
    getPage,
    REDUCER_NAME
  )
);
