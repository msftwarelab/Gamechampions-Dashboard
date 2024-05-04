import React from "react";
import { connect } from "react-redux";

import Modal from "../../components/modal/modal";
import Card from "../../components/card/card";
import { FORM_FIELDS, REDUCER_NAME, REDIRECT_QUERY_PARAM } from "./constants";
import {
  login,
  getRegistrationApiErrorMessage,
  verifyRecaptchaToken
} from "./../app/actions";
import { fetchPage, getPage } from "../page/actions";
import { withPage } from "~hocs";
import { fetchNavigation } from "../navigation/actions";
import { selectAuth, selectIsMobile } from "~containers/app/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import LoginPage from "~components/custom/login";
import { getWalletAmount } from "~containers/wallet/actions";
import { getProfile } from "~containers/myaccount/actions";
import { ROLES } from "~service/constants";
import { getGames } from "~containers/games/actions";
import { Loader } from "~components/atoms";
import { getParameterByName } from "../../util/util";
import { selectProfile } from "~containers/myaccount/reducer";
import { media, styled, withTheme } from "~theme";
import LanguageSelector from "~containers/multiLanguage";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      authFailureMessage: "",
      submitting: false,
      isLoading: false
    };

    this.submitSuccessCallback = this.submitSuccessCallback.bind(this);
    this.submitFailureCallback = this.submitFailureCallback.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    this.sendLoginSuccessEvent = this.sendLoginSuccessEvent.bind(this);
  }
  setIsLoading(value) {
    this.setState({ isLoading: value });
  }

  submitSuccessCallback(response) {
    const {
      authentication,
      reLoadNavigation,
      selectedLanguage,
      onLoadWallet,
      onLoadProfile,
      onLoadGames
    } = this.props;
    const { role } = authentication.toJS();

    const promises = [
      onLoadGames(),
      reLoadNavigation({ role, language: selectedLanguage }),
      onLoadProfile()
    ];

    if (role == ROLES.PLAYER) {
      promises.push(onLoadWallet());
    }

    OneSignal.push(function() {
      OneSignal.isPushNotificationsEnabled().then(enabled => {
        if (!enabled) {
          OneSignal.push(function() {
            OneSignal.showSlidedownPrompt();
          });

          OneSignal.on("subscriptionChange", function(isSubscribed) {
            if (isSubscribed) {
              OneSignal.push(function() {
                OneSignal.sendTag("user", "user_" + response.profile.id);
              });
            }
          });
        } else {
          OneSignal.push(function() {
            OneSignal.sendTag("user", "user_" + response.profile.id);
          });
        }
      });
    });

    Promise.all(promises).then(() => {
      this.sendLoginSuccessEvent({ type: "traditional" });
      this.redirectUser();
    });
  }

  sendLoginSuccessEvent({ type }) {
    const { profile } = this.props;

    window.dataLayer.push({
      event: "loginSuccess",
      eventType: type,
      email: profile.get("email"),
      userName: profile.get("userName"),
      user_id: profile.get("id")
    });
  }

  submitFailureCallback(err) {
    const { t } = this.props;

    const errorMessage =
      err.data && t(err.data)
        ? t(err.data)
        : t(getRegistrationApiErrorMessage(err));
    this.setState({
      authFailureMessage: errorMessage,
      submitting: false
    });
  }

  redirectUser() {
    const { location = {}, selectedLanguage, history } = this.props;
    const { search } = location;
    const redirectUrl = getParameterByName(REDIRECT_QUERY_PARAM, search);
    history.push(`/${selectedLanguage}/arena`);
  }

  render() {
    const { match, onLogin, selectedLanguage } = this.props;

    return (
      <Modal modalClassName="fullscreen">
        <Wrapper1>
          <Wrapper2>
            <Card
              padding={{ base: "1rem", md: "2.5rem 5rem 4rem" }}
              titleProps={{
                padding: "0",
                textAlign: "center",
                flex: "1",
                margin: "0 0 1rem"
              }}
              cardClassName="fullscreen"
              className="login background-gradient"
              showLanguage={true}
            >
              {this.state.isLoading ? (
                <Loader
                  isLoading={this.state.isLoading}
                  margin="5rem auto"
                  scale="6rem"
                />
              ) : (
                <LoginPage
                  formFields={FORM_FIELDS}
                  match={match}
                  selectedLanguage={selectedLanguage}
                  apiErrorMessage={this.state.authFailureMessage}
                  loading={this.state.submitting}
                  onSubmit={e => {
                    this.setState({
                      authFailureMessage: "",
                      submitting: true
                    });

                    return onLogin(e)
                      .then(response => this.submitSuccessCallback(response))
                      .catch(error => this.submitFailureCallback(error));
                  }}
                />
              )}
            </Card>

            <LanguageSelectorWrapper>
              <LanguageSelector isDirectionTop={true} />
            </LanguageSelectorWrapper>
          </Wrapper2>
        </Wrapper1>
      </Modal>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(fetchPage({ url, language }, REDUCER_NAME));
  }
}

const mapStateToProps = state => {
  return {
    authentication: selectAuth(state),
    selectedLanguage: selectSelectedLanguage(state),
    isMobile: selectIsMobile(state),
    profile: selectProfile(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch(login(data)),
  reLoadNavigation: data => dispatch(fetchNavigation(data)),
  onLoadWallet: () => dispatch(getWalletAmount()),
  onLoadProfile: () => dispatch(getProfile()),
  onLoadGames: () => dispatch(getGames()),
  onVerifyRecaptchaResponse: data => dispatch(verifyRecaptchaToken(data))
});

const Wrapper1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  position: relative;
  min-height: 100vh;

  ${media.md`
    justify-content: flex-end;
    background-image: url('/img/login_bg.png');
    background-repeat: no-repeat;
    background-size: auto 100%;
  `};
`;
const Wrapper2 = styled.div`
  width: 100%;
  position: relative;

  ${media.md`
    width: 45%;
  `};
`;

const LanguageSelectorWrapper = styled.div`
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
`;

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(withTheme(Login)), Login)),
  getPage,
  REDUCER_NAME
);
