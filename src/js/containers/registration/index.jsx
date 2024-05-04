import React from "react";
import { connect } from "react-redux";

import Modal from "../../components/modal/modal";
import { FlexBox, Span, Link, Paragraph } from "~components/atoms";
import Card from "../../components/card/card";
import DynamicForm from "../../components/molecules/dynamicForm";
import { RETURN_URL, REDUCER_NAME } from "./constants";
import { getPage } from "../page/actions";
import { withPage } from "~hocs";
import { AFFILIATE_COOKIE_NAME } from "../../../../service/constants";
import LanguageSelector from "~containers/multiLanguage";

import {
  getProfileFormFields,
  ProfileFormTypes
} from "~containers/myaccount/constants";
import { selectAuth, selectIsMobile } from "~containers/app/reducer";
import { fetchNavigation } from "~containers/navigation/actions";
import {
  createAccount,
  getRegistrationApiErrorMessage,
  fetchRegistration,
  addUserMail,
  sendTrackAffiliate
} from "./actions";
import { selectProfile } from "~containers/myaccount/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import { selectCountries } from "../app/reducer";
import { verifyRecaptchaToken } from "~containers/app/actions";
import { getWalletAmount } from "~containers/wallet/actions";
import { getProfile } from "~containers/myaccount/actions";
import { getGames } from "~containers/games/actions";
import { getCookie } from "../../util/util";
import { media, styled, withTheme } from "~theme";

class Registration extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      apiErrorMessage: "",
      submitting: false,
      countryCode: null
    };

    this.submitSuccessCallback = this.submitSuccessCallback.bind(this);
    this.submitFailureCallback = this.submitFailureCallback.bind(this);
    this.getTermsLabel = this.getTermsLabel.bind(this);
    this.sendRegisterSuccessEvent = this.sendRegisterSuccessEvent.bind(this);
  }

  sendRegisterSuccessEvent({ type }) {
    const { profile } = this.props;

    window.dataLayer.push({
      event: "registrationSuccess",
      eventType: type,
      email: profile.get("email"),
      userName: profile.get("userName"),
      user_id: profile.get("id")
    });
  }

  getTermsLabel() {
    const { t } = this.props;

    return (
      <>
        <Span>{t("RegisterTnCLabel")}</Span>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.gamechampions.com/terms-of-use/"
        >
          <Span>{t("RegisterTermsLinkLabel")}</Span>
        </a>
        <Span>{t("RegisterTncSeperator")}</Span>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.gamechampions.com/privacy-policy/"
        >
          <Span>{t("RegisterPrivacyLinkLabel")}</Span>
        </a>
      </>
    );
  }

  handleUserRegisterAffiliate() {
    const { onSendTrackAffiliate } = this.props;

    const affiliate = getCookie(AFFILIATE_COOKIE_NAME);

    // after register check if you have an affiliate, if so send request to API
    if (affiliate) {
      const affiliateObj = JSON.parse(affiliate);
      onSendTrackAffiliate(affiliateObj);
    }
  }

  submitSuccessCallback() {
    const {
      authentication,
      history,
      reLoadNavigation,
      selectedLanguage,
      onAddUserMail,
      profile
    } = this.props;
    const { role } = authentication.toJS();

    this.sendRegisterSuccessEvent({
      type: "traditional"
    });

    onAddUserMail({
      email: profile.get("email"),
      userName: profile.get("userName")
    });

    reLoadNavigation({ role, language: selectedLanguage }).then(() => {
      this.setState({
        submitting: false
      });
      history.push(`/${selectedLanguage}/arena`);
    });

    this.handleUserRegisterAffiliate();
  }

  submitFailureCallback(err) {
    const { t } = this.props;

    const errorMessage =
      err && err.data && t(err.data)
        ? t(err.data)
        : t(getRegistrationApiErrorMessage(err));
    this.setState({
      apiErrorMessage: errorMessage,
      submitting: false
    });
  }

  render() {
    const {
      countries,
      history,
      match,
      onSubmitAccount,
      selectedLanguage,
      t,
      theme
    } = this.props;

    const returnUrl = `/${selectedLanguage}` + RETURN_URL;

    const formFields = getProfileFormFields({
      formType: ProfileFormTypes.Register,
      onSelectCountryChange: value => {
        this.setState({ countryCode: value });
      },
      countryCode: this.state.countryCode
    });

    if (formFields.find(x => x.name === "country")) {
      formFields.find(x => x.name === "country").options = countries.toJS
        ? countries.toJS()
        : countries;
    }

    if (formFields.find(x => x.name === "acceptedTaC")) {
      formFields.find(
        x => x.name === "acceptedTaC"
      ).fieldProps.child = this.getTermsLabel;
    }

    return (
      <Modal modalClassName="fullscreen">
        <Wrapper1>
          <Wrapper2>
            <Card
              padding={{ base: "1rem", md: "2.5rem 5rem 4rem" }}
              showLanguage={true}
              titleProps={{
                padding: "0",
                textAlign: "center",
                flex: "1",
                margin: "0 0 1rem"
              }}
              cardClassName="fullscreen"
              className="login background-gradient"
            >
              <FlexBox maxWidth="48em" margin="0 auto" flexDirection="column">
                <Paragraph
                  textAlign="center"
                  padding=".5em 0"
                  fontSize={{ base: "1.5em", md: "2em" }}
                  fontStyle="italic"
                  color={theme.colors.charcoalGrey}
                >
                  {t("RegisterFormTitle")}
                </Paragraph>
              </FlexBox>

              <DynamicForm
                action={match.url}
                formFields={formFields}
                apiErrorMessage={this.state.apiErrorMessage}
                loading={this.state.submitting}
                className="registration-form"
                submitButtonLabel={"RegisterFormSubmitButton"}
                isRecaptched
                onSubmit={async e => {
                  const data = { ...e };
                  this.setState({
                    apiErrorMessage: "",
                    submitting: true
                  });

                  return onSubmitAccount(data)
                    .then(() => this.submitSuccessCallback())
                    .catch(error => this.submitFailureCallback(error));
                }}
                onCancel={e => {
                  e.preventDefault();
                  history.push(returnUrl);
                }}
                extraContents={
                  <>
                    <FlexBox
                      alignItems="center"
                      justifyContent="center"
                      flexDirection={{ base: "column", md: "row" }}
                    >
                      <Paragraph fontSize="1rem" margin="0 0.25rem 0 0">
                        {t("RegisterFormGoToLogin")}
                      </Paragraph>
                      <Link to={`/${selectedLanguage}/login`} fontSize="1rem">
                        {t("RegisterFormCancelButton")}
                      </Link>
                    </FlexBox>
                  </>
                }
              />
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
    return store.dispatch(
      fetchRegistration({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: selectProfile(state),
    authentication: selectAuth(state),
    selectedLanguage: selectSelectedLanguage(state),
    countries: selectCountries(state),
    isMobile: selectIsMobile(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmitAccount: data => dispatch(createAccount(data)),
  reLoadNavigation: data => dispatch(fetchNavigation(data)),
  onLoadWallet: () => dispatch(getWalletAmount()),
  onLoadProfile: () => dispatch(getProfile()),
  onLoadGames: () => dispatch(getGames()),
  onAddUserMail: data => dispatch(addUserMail(data)),
  onSendTrackAffiliate: data => dispatch(sendTrackAffiliate(data)),
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
  )(hoistStatics(withTranslation()(withTheme(Registration)), Registration)),
  getPage,
  REDUCER_NAME
);
