import React from "react";
import { connect } from "react-redux";
import Nav from "../../components/nav/nav";
import { fetchNavigation, setNavItemActive } from "./actions";
import {
  selectTitle,
  selectAuth,
  selectIsMobile,
  selectIsIos,
  selectDeferredPrompt
} from "../app/reducer";
import { selectProfile } from "~containers/myaccount/reducer";
import {
  selectNavName,
  selectNavIcon,
  selectNavUrl,
  selectNavChildren,
  selectNavIsActive
} from "./reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";
import { selectPersonalMessages } from "~containers/chat/reducer";
import { fetchPersonalMessages } from "~containers/chat/actions";
import { selectMatches } from "~containers/matches/reducer";
import { getMatches } from "~containers/matches/actions";
import { getGames } from "~containers/games/actions";
import { selectGames } from "~containers/games/reducer";

class Navigation extends React.PureComponent {
  componentDidMount() {
    const { onSetNavItemActive, onLoadMessages } = this.props;
    onLoadMessages();

    // set initial navigation item
    onSetNavItemActive({
      href: location.pathname
    });

    // Load the matches
    const { onLoadGames, onLoadMatches, profile, games } = this.props;
    if (games.size > 0 && profile.get("id")) {
      onLoadMatches({ userId: profile.get("id"), games: games.toJS() });
    } else {
      onLoadGames().then(response =>
        onLoadMatches({ userId: profile.get("id"), games: response })
      );
    }
  }

  render() {
    const {
      name,
      icon,
      url,
      isActive,
      children,
      logo,
      showNav,
      onSetNavItemActive,
      profile,
      selectedLanguage,
      isMobile,
      isIos,
      personalMessages,
      matches,
      deferredPrompt
    } = this.props;

    return (
      <Nav
        showNav={showNav}
        nav={{ name, icon, url, isActive, children }}
        logo={logo}
        onSetNavItemActive={onSetNavItemActive}
        profile={profile}
        selectedLanguage={selectedLanguage}
        isMobile={isMobile}
        isIos={isIos}
        personalMessages={personalMessages}
        matches={matches}
        deferredPrompt={deferredPrompt}
      />
    );
  }

  static fetchData(store, { path, authentication, language }) {
    const role = authentication ? authentication.role : null;
    return store.dispatch(fetchNavigation({ path, role, language }));
  }
}

const mapStateToProps = state => ({
  title: selectTitle(state),
  name: selectNavName(state),
  url: selectNavUrl(state),
  icon: selectNavIcon(state),
  isActive: selectNavIsActive(state),
  children: selectNavChildren(state),
  profile: selectProfile(state),
  authentication: selectAuth(state),
  selectedLanguage: selectSelectedLanguage(state),
  isMobile: selectIsMobile(state),
  isIos: selectIsIos(state),
  personalMessages: selectPersonalMessages(state),
  matches: selectMatches(state),
  games: selectGames(state),
  deferredPrompt: selectDeferredPrompt(state)
});

const mapDispatchToProps = dispatch => ({
  onSetNavItemActive: data => dispatch(setNavItemActive(data)),
  reLoadNavigation: data => dispatch(fetchNavigation(data)),
  onLoadMessages: () => dispatch(fetchPersonalMessages()),
  onLoadMatches: data => dispatch(getMatches(data)),
  onLoadGames: data => dispatch(getGames(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(Navigation), Navigation))
);
