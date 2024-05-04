import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import { fetchLeaderBoards, getLeaderBoards } from "./actions";
import { REDUCER_NAME } from "./constants";
import { selectIsLoading, selectLeaderBoards, selectGameId } from "./reducer";
import LeaderBoardsComponent from "~components/custom/leaderBoards";
import { getPage } from "~containers/page/actions";
import { selectProfile } from "~containers/myaccount/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectIsMobile } from "~containers/app/reducer";

class LeaderBoards extends React.PureComponent {
  componentDidMount() {
    const {
      leaderBoards,
      onLoadLeaderBoards,
      match,
      leaderBoardGameId
    } = this.props;

    const gameId = parseInt(match.params.gameId);

    if (!(leaderBoards && leaderBoards.size) || leaderBoardGameId != gameId) {
      onLoadLeaderBoards({ gameId });
    }
  }

  render() {
    const {
      leaderBoards,
      isLoading,
      match,
      profile,
      selectedLanguage,
      isMobile
    } = this.props;

    return (
      <LeaderBoardsComponent
        isMobile={isMobile}
        leaderBoards={leaderBoards}
        gameId={parseInt(match.params.gameId)}
        isLoading={isLoading}
        currency={profile.get("currency")}
        selectedLanguage={selectedLanguage}
      />
    );
  }

  static fetchData(store, { url, params }) {
    return store.dispatch(
      fetchLeaderBoards({
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
  profile: selectProfile(state),
  leaderBoards: selectLeaderBoards(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  leaderBoardGameId: selectGameId(state),
  isMobile: selectIsMobile(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadLeaderBoards: data => dispatch(getLeaderBoards(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(LeaderBoards),
    getPage,
    REDUCER_NAME
  )
);
