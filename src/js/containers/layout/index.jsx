import React from "react";
import { connect } from "react-redux";
import { matchPath, withRouter } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

import { FlexBox } from "~components/atoms";
import Navigation from "../navigation/index";
import StickyNavigation from "../navigation/stickyNavigation";
import Snackbar from "../snackbar/index";
import ErrorMessage from "../errorBoundary/errorMessage";
import Breadcrumbs from "../breadcrumbs/index";
import Meta from "~components/meta/meta";
import Header from "~components/molecules/header";
import Card from "~components/card/card";
import Friends from "../../containers/friends/friends";
import NotificationsSnackBar from "../../containers/notifications/notificationsSnackBar";
import FadeTransition from "../../components/transitions/fade";
import ScrollToTop from "../../components/routes/scrollToTop";
import {
  selectIsLoading,
  selectMeta,
  selectUrl,
  selectAuth,
  selectOnlinePlayersConfig,
  selectGlobalChatConfig,
  selectIsMobile
} from "../app/reducer";
import {
  selectPlayerBonusCampaignStatus,
  selectProfile
} from "~containers/myaccount/reducer";
import { selectAvailableAmount } from "~containers/wallet/reducer";
import {
  getPlayerBonusCampaignStatus,
  getProfile
} from "~containers/myaccount/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectPersonalMessages } from "~containers/chat/reducer";
import { fetchPersonalMessages } from "~containers/chat/actions";
import { ROLES } from "~service/constants";
import { getPoll } from "./action";
import {
  selectChatPopupData,
  selectIsChatPopupOpen
} from "~containers/chat/reducer";
import Chat from "~containers/chat";
import { setChatPopupData, setIsChatPopupOpen } from "~containers/chat/actions";
import { resetFriend } from "~containers/friends/actions";

const INTERVAL_TIME = 5000;

const logo = {
  src: "/img/linear_logo.svg",
  alt: process.env.NAME,
  title: process.env.NAME
};

const mobile_logo = {
  src: "/img/G_logo.png",
  alt: process.env.NAME,
  title: process.env.NAME
};

const messageSoundUrl = "/img/audio/message.mp3";

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showNav: false,
      isInterval: false
    };

    this.onHamburgerClick = this.onHamburgerClick.bind(this);
  }

  onLoadWallet() {
    const { onLoadPoll, onLoadMessages, authentication } = this.props;

    if (
      authentication.get("token") &&
      authentication.get("role") == ROLES.PLAYER
    ) {
      onLoadPoll();
      onLoadMessages();
    }
  }

  componentDidMount() {
    const {
      profile,
      onLoadProfile,
      authentication,
      onGetPlayerBonusCampaignStatus
    } = this.props;

    if (!profile.get("id") && authentication.get("token")) {
      onLoadProfile();
    }
    this.interval = setInterval(() => this.onLoadWallet(), INTERVAL_TIME);

    if (
      profile.get("id") &&
      authentication.get("token") &&
      authentication.get("role") == ROLES.PLAYER
    ) {
      onGetPlayerBonusCampaignStatus({ playerId: profile.get("id") });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.personalMessages?.toJS()) !==
      JSON.stringify(this.props.personalMessages?.toJS())
    ) {
      const messageAudio = new Audio(messageSoundUrl);
      if (messageAudio) {
        messageAudio.play();
      }
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onHamburgerClick() {
    this.props.authentication.get("role") &&
      this.setState({ showNav: !this.state.showNav });
  }

  render() {
    const {
      authentication,
      children,
      meta,
      url,
      isLoading,
      showBreadcrumbs,
      profile,
      selectedLanguage,
      availableAmount,
      location,
      onlinePlayersConfig,
      playerBonusCampaignStatus,
      globalChatConfig,
      isMobile,
      isChatPopupOpen,
      onSetIsChatPopupOpen,
      chatPopupData,
      onSetChatPopupData,
      onResetFriend
    } = this.props;

    let chatPopupDataAsJS = {};
    if (chatPopupData?.toJS()) chatPopupDataAsJS = chatPopupData.toJS();

    return (
      <div
        className={
          (isLoading ? "is-loading" : "") +
          (authentication.get("role") == ROLES.PLAYER
            ? "layout"
            : "layout-admin")
        }
      >
        <ScrollToTop />
        <Meta meta={meta} url={url} />
        {authentication.get("role") && (
          <Header
            playerBonusCampaignStatus={
              playerBonusCampaignStatus && playerBonusCampaignStatus.toJS()
            }
            selectedLanguage={selectedLanguage}
            onHamburgerClick={this.onHamburgerClick}
            logo={logo}
            mobile_logo={mobile_logo}
            profileData={profile}
            availableAmount={availableAmount}
            isGlobalChatEnabled={globalChatConfig.get("isEnabled")}
            isMobile={isMobile}
          />
        )}
        <div className="layout__wrapper">
          {authentication.get("role") && (
            <Navigation showNav={this.state.showNav} logo={logo} />
          )}
          <FadeTransition in={!isLoading}>
            <main id="main" className="main">
              <Snackbar />
              <ErrorMessage />
              {showBreadcrumbs && <Breadcrumbs />}
              {children}
            </main>
          </FadeTransition>
          {onlinePlayersConfig.get("isEnabled") &&
            authentication.get("role") == ROLES.PLAYER &&
            !matchPath(location.pathname, {
              path: `/${selectedLanguage}/friends`,
              exact: true
            }) && (
              <div className="friends-wrapper">
                <Card className="friends-wrapper__card" padding="0">
                  <Friends />
                </Card>
              </div>
            )}
        </div>
        <NotificationsSnackBar />
        {authentication.get("role") == ROLES.PLAYER && <StickyNavigation />}

        {isChatPopupOpen && chatPopupDataAsJS !== {} && (
          <Chat
            friendId={chatPopupDataAsJS?.friendId}
            friendImage={chatPopupDataAsJS?.friendImage}
            friendName={chatPopupDataAsJS?.friendName}
            hasUnreadMessages={chatPopupDataAsJS?.hasUnreadMessages}
            onChatClose={() => {
              onSetIsChatPopupOpen(false);
              onSetChatPopupData({});
              onResetFriend();
            }}
          />
        )}

        <ToastContainer position="top-center" limit={1} transition={Slide} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: selectProfile(state),
  isLoading: selectIsLoading(state),
  meta: selectMeta(state),
  url: selectUrl(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  availableAmount: selectAvailableAmount(state),
  onlinePlayersConfig: selectOnlinePlayersConfig(state),
  playerBonusCampaignStatus: selectPlayerBonusCampaignStatus(state),
  globalChatConfig: selectGlobalChatConfig(state),
  personalMessages: selectPersonalMessages(state),
  isMobile: selectIsMobile(state),
  isChatPopupOpen: selectIsChatPopupOpen(state),
  chatPopupData: selectChatPopupData(state)
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadProfile: () => dispatch(getProfile()),
    onLoadPoll: () => dispatch(getPoll()),
    onLoadMessages: () => dispatch(fetchPersonalMessages()),
    onGetPlayerBonusCampaignStatus: data =>
      dispatch(getPlayerBonusCampaignStatus(data)),
    onSetChatPopupData: data => dispatch(setChatPopupData(data)),
    onSetIsChatPopupOpen: data => dispatch(setIsChatPopupOpen(data)),
    onResetFriend: () => dispatch(resetFriend())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
