import React from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import {
  selectNavChildren,
  selectNavIcon,
  selectNavIsActive,
  selectNavName,
  selectNavUrl
} from "~containers/navigation/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { resetFriend } from "~containers/friends/actions";
import StickyNav from "../../components/nav/stickyNav";
import { fetchNavigation } from "./actions";
import { selectFriends } from "~containers/friends/reducer";
import { fromJS } from "immutable";
import { selectOnlinePlayersConfig } from "~containers/app/reducer";
import { selectPersonalMessages } from "~containers/chat/reducer";
import { fetchPersonalMessages } from "~containers/chat/actions";
import { selectMatches } from "~containers/matches/reducer";
import { selectProfile } from "~containers/myaccount/reducer";

class StickyNavigation extends React.PureComponent {
  componentDidMount() {
    const { onLoadMessages } = this.props;
    onLoadMessages();
  }

  render() {
    const {
      name,
      icon,
      url,
      isActive,
      children,
      selectedLanguage,
      onResetFriend,
      history,
      friends,
      onlinePlayersConfig,
      personalMessages,
      matches
    } = this.props;
    let itemsToShow =
      children && children.size > 2
        ? fromJS([children.get(0), children.get(1)]) // Sports and Activity Only
        : fromJS([]);

    let isNewMessage =
      friends && !!friends.find(x => x.get("hasUnreadMessages"));

    return (
      <StickyNav
        isOnlinePlayersEnabled={onlinePlayersConfig.get("isEnabled")}
        home={{ name, icon, url, isActive }}
        nav={itemsToShow}
        selectedLanguage={selectedLanguage}
        onResetFriend={onResetFriend}
        history={history}
        isNewMessage={isNewMessage}
        personalMessages={personalMessages}
        matches={matches}
      />
    );
  }
  static fetchData(store, { path, authentication, language }) {
    const role = authentication ? authentication.role : null;
    return store.dispatch(fetchNavigation({ path, role, language }));
  }
}

const mapStateToProps = state => ({
  name: selectNavName(state),
  url: selectNavUrl(state),
  icon: selectNavIcon(state),
  isActive: selectNavIsActive(state),
  children: selectNavChildren(state),
  selectedLanguage: selectSelectedLanguage(state),
  friends: selectFriends(state),
  onlinePlayersConfig: selectOnlinePlayersConfig(state),
  personalMessages: selectPersonalMessages(state),
  matches: selectMatches(state),
  profile: selectProfile(state)
});

const mapDispatchToProps = dispatch => {
  return {
    onResetFriend: () => dispatch(resetFriend()),
    onLoadMessages: () => dispatch(fetchPersonalMessages())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StickyNavigation)
);
