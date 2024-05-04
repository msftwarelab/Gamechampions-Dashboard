import React from "react";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { fetchPage, getPage } from "../page/actions";
import { withPage } from "~hocs";
import { RETURN_URL, FORM_FIELDS, REDUCER_NAME } from "./constants";
import {
  submitForgotPassword,
  getForgoPasswordApiErrorMessage
} from "./actions";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import { CentralContainer } from "~components/styles";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { connect } from "react-redux";

class ForgotPassword extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      apiErrorMessage: "",
      isSuccess: false,
      submitting: false
    };

    this.submitSuccessCallback = this.submitSuccessCallback.bind(this);
    this.submitFailureCallback = this.submitFailureCallback.bind(this);
  }

  submitSuccessCallback() {
    this.setState({
      isSuccess: true,
      submitting: false
    });
  }

  submitFailureCallback(err) {
    const { t } = this.props;

    const errorMessage =
      err.data && t(err.data)
        ? t(err.data)
        : t(getForgoPasswordApiErrorMessage(err));
    this.setState({
      apiErrorMessage: errorMessage,
      submitting: false
    });
  }

  render() {
    const { page, match, t, selectedLanguage } = this.props;

    const successMessage = t("ForgotPasswordSuccessMessage");
    return (
      <Modal modalClassName="fullscreen">
        <Card
          titleProps={{
            padding: "0",
            textAlign: "center",
            flex: "1",
            margin: "0 0 1rem"
          }}
          htmlProps={{
            justifyContent: "center",
            textAlign: "center"
          }}
          showLanguage={true}
          showLogo={true}
          title={page.get("title")}
          html={this.state.isSuccess && successMessage}
          buttons={
            this.state.isSuccess
              ? [
                  {
                    url: `/${selectedLanguage}${RETURN_URL}`,
                    title: t("ForgotPasswordGoBackLabel")
                  }
                ]
              : null
          }
          cardClassName="fullscreen"
          className="background-gradient"
        >
          <CentralContainer>
            {!this.state.isSuccess && (
              <DynamicForm
                action={match.url}
                formFields={FORM_FIELDS}
                returnUrl={`/${selectedLanguage}${RETURN_URL}`}
                apiErrorMessage={this.state.apiErrorMessage}
                loading={this.state.submitting}
                onSubmit={e => {
                  this.setState({
                    apiErrorMessage: "",
                    submitting: true
                  });
                  return submitForgotPassword(e)
                    .then(() => this.submitSuccessCallback())
                    .catch(error => this.submitFailureCallback(error));
                }}
              />
            )}
          </CentralContainer>
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(fetchPage({ url, language }, REDUCER_NAME));
  }
}

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state)
});

export default withPage(
  connect(
    mapStateToProps,
    {}
  )(hoistStatics(withTranslation()(ForgotPassword), ForgotPassword)),
  getPage,
  REDUCER_NAME
);
