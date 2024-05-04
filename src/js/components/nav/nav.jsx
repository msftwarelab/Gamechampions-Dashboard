import React from "react";

import { withRouter, Link } from "react-router-dom";

import {
  getParameterByName,
  updateQueryStringParameter,
  removeQueryParameter,
  isElementInViewport
} from "../../util/util";
import Overlay from "./overlay";
import NavTree from "./navTree";
import { FlexBox } from "~components/atoms";
import LanguageSelector from "~containers/multiLanguage";
import NavSection from "~components/custom/multiLanguage/navSection";
import { withTranslation } from "react-i18next";
import { withTheme } from "~theme";
import { toNumOfUnreadMessages } from "~service/chat/adapter";
import { toListOfOngoingMatches } from "~service/matches/adapter";
import PwaItem from "./pwaItem";

const menuQueryItem = "_nav";

// This extends PureComponent instead of functional component because we use ref
class Nav extends React.PureComponent {
  constructor(props) {
    super(props);

    const { history, onSetNavItemActive } = this.props;

    history.listen(location => {
      onSetNavItemActive({
        href: location.pathname
      });
    });

    this.state = {
      isMenuOpen: true
    };

    this.onLinkClick = this.onLinkClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.updateSlide = this.updateSlide.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  componentDidMount() {
    const { profile } = this.props;
    document.tidioIdentify = {
      distinct_id: profile.get("id"),
      email: profile.get("email"),
      name: profile.get("fullName")
    };
    this.init();
  }

  init() {
    const self = this;
    self.isVisible = false;
    self.startX = 0;
    self.currentX = 0;
    self.touchingSideNav = false;

    self.element.addEventListener("click", () => {
      // toggle the overlay on click of the burger icon
      self.toggle();
    });

    self.overlay.addEventListener("click", () => {
      self.toggle();
    });

    window.onpopstate = function() {
      // user pressed back/forward button
      if (
        !getParameterByName(menuQueryItem, location.search) &&
        self.isVisible
      ) {
        // hide
        self.toggle(true);
      } else if (
        getParameterByName(menuQueryItem, location.search) &&
        !self.isVisible
      ) {
        // show
        self.toggle(true);
      }
    };

    // remove query string params if visible
    window.history.replaceState(
      null,
      "",
      window.location.pathname +
        removeQueryParameter(location.search, menuQueryItem)
    );
  }

  onLinkClick(href, onSetNavItemActive) {
    // reset the menu
    this.toggle(true, true);

    onSetNavItemActive({
      href
    });
  }

  updateSlide(self) {
    if (!self.touchingSideNav) {
      return;
    }
    requestAnimationFrame(() => {
      self.updateSlide(self);
    });

    const translateX = Math.min(0, self.currentX - self.startX);
    self.sideBarEl.style.transform = `translateX(${translateX}px)`;
  }

  updateHistory() {
    if (!this.isVisible) {
      // hide
      window.history.back();
    } else {
      // show
      window.history.pushState(
        null,
        "",
        updateQueryStringParameter(location.search, menuQueryItem, "1")
      );
    }
  }

  // toggle the overlay and the state of the navigation
  toggle(isFromHistory, isFromNavigation) {
    const self = this;
    if (
      isElementInViewport(self.element) &&
      self.element.parentElement.clientHeight
    ) {
      if (!self.isVisible && isFromNavigation) {
        return;
      }

      self.isVisible = !self.isVisible;

      if (self.isVisible) {
        self.element.checked = true;
      } else {
        self.element.checked = false;
      }

      if (self.isVisible) {
        self.overlay.setVisible(true);
        document.body.style.overflowY = "hidden";
      } else {
        // delay hiding the element to show animation
        setTimeout(() => {
          self.overlay.setVisible(false);
          document.body.style.overflowY = "visible";
        }, 300);
      }

      self.overlay.toggle();
    }

    if (!isFromHistory) {
      self.updateHistory();
    }
  }
  componentDidUpdate(prev) {
    // remove query string params if visible
    history.replaceState(
      null,
      "",
      location.pathname + removeQueryParameter(location.search, menuQueryItem)
    );

    if (prev.showNav !== this.props.showNav) {
      this.element.click();
    }
  }

  openMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    const {
      nav,
      logo,
      onSetNavItemActive,
      profile,
      selectedLanguage,
      t,
      isMobile,
      isIos,
      personalMessages,
      matches,
      history,
      deferredPrompt
    } = this.props;
    const isMenuOpen = isMobile ? false : this.state.isMenuOpen;
    const profileImageUrl = profile.get("profileImage")
      ? profile.get("profileImage")
      : "";

    let navSideDesktopStyle =
      "nav__side-nav nav__side-nav--always-open-on-desktop";

    if (isMenuOpen) {
      navSideDesktopStyle =
        "nav__side-nav nav__side-nav-open nav__side-nav--always-open-on-desktop";
    }

    const numOfUnreadMessages = toNumOfUnreadMessages(personalMessages.toJS());
    let numOfOngoingMatches = toListOfOngoingMatches(matches)?.size;

    return (
      <>
        <nav className="nav">
          <div className="nav__menu">
            <input
              type="checkbox"
              id="hamburger"
              ref={n => (this.element = n)}
            />
            <div
              className={navSideDesktopStyle}
              ref={n => (this.sideBarEl = n)}
            >
              <div className="nav__side-language__selector">
                <LanguageSelector showOnMobile={true} />
              </div>
              <div className="nav__side-nav__header">
                {!(profile && profile.get("userName")) && (
                  <div className="nav__side-nav__header__logo">
                    <img src={logo.src} alt={logo.alt} title={logo.title} />
                  </div>
                )}
                {profile && profile.get("userName") && (
                  <Link
                    to={`/${selectedLanguage}/my-account/personal-settings`}
                    title="profile"
                    onClick={() => {
                      this.toggle(true);
                    }}
                  >
                    <div className="nav__side-nav__header__profile">
                      <div className="nav--side__header__profile__image">
                        <img
                          src={profileImageUrl}
                          alt={profile.get("userName")}
                          title={profile.get("userName")}
                        />
                      </div>
                      <div className="nav--side__header__profile__text">
                        <div className="nav--side__header__profile__title">
                          {profile.get("userName")}
                        </div>
                        <div className="nav--side-nav__header__profile__details">
                          {profile.get("email")}
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <div className="nav__body">
                <div className="nav__section">
                  <NavTree
                    nav={nav}
                    isMobile={isMobile}
                    isMenuOpen={isMenuOpen}
                    onLinkClick={e => {
                      this.onLinkClick(e, onSetNavItemActive);
                    }}
                    numOfUnreadMessages={numOfUnreadMessages}
                    numOfOngoingMatches={numOfOngoingMatches}
                  />
                </div>
              </div>
              <div className="collapse-button" onClick={this.openMenu}>
                {isMenuOpen ? (
                  <img
                    src="/img/icons/ic_chevron_left-24px.svg"
                    alt="Shrink menu"
                    title="Shrink menu"
                  />
                ) : (
                  <img
                    src="/img/icons/ic_chevron_right-24px.svg"
                    alt="Expand menu"
                    title="Expand menu"
                  />
                )}
              </div>
              <NavSection>
                <FlexBox flexDirection="column" width="100%" padding="1em">
                  <PwaItem
                    selectedLanguage={selectedLanguage}
                    history={history}
                    isIos={isIos}
                    deferredPrompt={deferredPrompt}
                    t={t}
                  />
                </FlexBox>
              </NavSection>
              {isMenuOpen && (
                <div className="nav__credits">
                  <PwaItem
                    selectedLanguage={selectedLanguage}
                    history={history}
                    isIos={isIos}
                    deferredPrompt={deferredPrompt}
                    t={t}
                  />
                </div>
              )}
            </div>
          </div>
        </nav>
        <Overlay className="nav-overlay" ref={n => (this.overlay = n)} />
      </>
    );
  }
}

export default withRouter(withTheme(withTranslation()(Nav)));
