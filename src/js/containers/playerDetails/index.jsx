import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import PlayerDetailsComponent from "~components/custom/playerDetails";
import { getPage } from "~containers/page/actions";
import {
  fetchPlayerDetails,
  getPlayerMatches,
  getGamerTags,
  getXPPoints,
  getPlayerStats
} from "./actions";
import { REDUCER_NAME } from "./constants";
import {
  selectMatches,
  selectPersonalDetails,
  selectStatistics,
  selectIsLoading,
  selectXPPoints,
  selectStars,
  selectPlayerStats
} from "./reducer";
import { selectProfile } from "~containers/myaccount/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectGames } from "~containers/games/reducer";
import { getGames } from "~containers/games/actions";
import { setFriend } from "~containers/friends/actions";
import { setChatPopupData, setIsChatPopupOpen } from "~containers/chat/actions";
import { FlexBox, Loader } from "~components/atoms";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";

class PlayerDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.handleChatOpen = this.handleChatOpen.bind(this);
  }

  loadData(data) {
    const {
      games,
      onLoadMatches,
      onLoadGamerTags,
      onLoadGames,
      onLoadXPPoints,
      onLoadPlayerStats
    } = this.props;

    onLoadGamerTags(data);
    onLoadPlayerStats(data);

    if (!(games && games.size)) {
      onLoadGames().then((response = {}) => {
        const { data: games = [] } = response;
        if (games.length) {
          data.gameType = games[0].gameType;
          onLoadMatches(data);
          onLoadXPPoints(data);
        }
      });
    } else {
      data.gameType = games.get(0).get("gameType");
      onLoadMatches(data);
      onLoadXPPoints(data);
    }
  }

  componentDidMount() {
    const { match, profile } = this.props;
    this.loadData({ playerId: parseInt(match.params.playerId) });

    OneSignal.push(function() {
      OneSignal.deleteTag("user", "user_" + profile.get("id"));
    });
  }

  componentWillUnmount() {
    const { profile, onSetIsChatPopupOpen } = this.props;
    onSetIsChatPopupOpen(false);

    OneSignal.push(function() {
      OneSignal.sendTag("user", "user_" + profile.get("id"));
    });
  }

  handleChatOpen({ friendId, friendImage, friendName, hasUnreadMessages }) {
    const { onSetChatPopupData, onSetIsChatPopupOpen } = this.props;
    if (friendId) this.props.onSetFriend({ id: friendId });
    onSetChatPopupData({
      friendId,
      friendImage,
      friendName,
      hasUnreadMessages
    });
    onSetIsChatPopupOpen(true);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (
      parseInt(prevProps.match.params.playerId) !=
      parseInt(match.params.playerId)
    ) {
      this.loadData({ playerId: parseInt(match.params.playerId) });
    }
  }

  render() {
    const {
      matches,
      personalDetails,
      statistics,
      games,
      onLoadMatches,
      match,
      profile,
      selectedLanguage,
      playerStats,
      stars,
      onLoadXPPoints,
      isLoading
    } = this.props;

    const returnUrl = this.props.location.state
      ? this.props.location.state.returnUrl
      : `/${selectedLanguage}/arena`;

    if (isLoading) {
      return (
        <Modal>
          <Card>
            <FlexBox
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Loader
                isLoading={true}
                height="4em"
                alignItems="center"
                scale="6rem"
              />
            </FlexBox>
          </Card>
        </Modal>
      );
    }

    return (
      matches && (
        <Modal>
          <Card closeUrl={returnUrl}>
            <PlayerDetailsComponent
              matches={matches}
              personalDetails={personalDetails}
              statistics={statistics}
              currency={profile.get("currency")}
              playerStats={playerStats}
              games={games}
              onLoadMatches={onLoadMatches}
              playerId={parseInt(match.params.playerId)}
              selectedLanguage={selectedLanguage}
              onChatOpen={this.handleChatOpen}
              stars={stars}
              onLoadXPPoints={onLoadXPPoints}
            ></PlayerDetailsComponent>
          </Card>
        </Modal>
      )
    );
  }

  static fetchData(store, { url, params, language }) {
    return store.dispatch(
      fetchPlayerDetails({
        pageData: {
          url,
          language
        },
        requestData: {
          playerId: parseInt(params.playerId),
          gameId: store
            .getState()
            .get("games")
            .get("games")
            .get(0)
            .get("id")
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  matches: selectMatches(state),
  profile: selectProfile(state),
  personalDetails: selectPersonalDetails(state),
  xpPoints: selectXPPoints(state),
  playerStats: selectPlayerStats(state),
  stars: selectStars(state),
  statistics: selectStatistics(state),
  games: selectGames(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadMatches: data => dispatch(getPlayerMatches(data)),
  onLoadGamerTags: data => dispatch(getGamerTags(data)),
  onLoadGames: () => dispatch(getGames()),
  onLoadPlayerStats: data => dispatch(getPlayerStats(data)),
  onSetFriend: data => dispatch(setFriend(data)),
  onLoadXPPoints: data => dispatch(getXPPoints(data)),
  onSetChatPopupData: data => dispatch(setChatPopupData(data)),
  onSetIsChatPopupOpen: data => dispatch(setIsChatPopupOpen(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(PlayerDetails),
    getPage,
    REDUCER_NAME
  )
);
