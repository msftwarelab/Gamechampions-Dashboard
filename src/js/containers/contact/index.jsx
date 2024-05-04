import React from "react";
import { connect } from "react-redux";
import Card from "../../components/card/card";
import DynamicForm from "../../components/molecules/dynamicForm";
import { REDUCER_NAME, FORM_FIELDS_CONTACT } from "./constants";
import { getPage, fetchPage } from "../page/actions";
import { withPage } from "~hocs";
import { submitContact, getContactApiErrorMessage } from "./actions";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import { selectIsSuccess } from "./reducer";

class Contact extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      apiErrorMessage: ""
    };

    this.submitFailureCallback = this.submitFailureCallback.bind(this);
  }

  submitFailureCallback(err) {
    const { t } = this.props;

    const errorMessage = t(getContactApiErrorMessage(err));
    this.setState({
      apiErrorMessage: errorMessage
    });
  }

  render() {
    const {
      history,
      match,
      page,
      selectedLanguage,
      onSubmitContact,
      isSuccess,
      t
    } = this.props;

    return (
      <Card title={page.get("title")} cardClassName="fullscreen">
        {!isSuccess ? (
          <DynamicForm
            action={match.url}
            formFields={FORM_FIELDS_CONTACT}
            className="contact-form"
            apiErrorMessage={this.state.apiErrorMessage}
            onSubmit={e => {
              const data = { ...e };
              this.setState({
                apiErrorMessage: ""
              });
              onSubmitContact(data).catch(error =>
                this.submitFailureCallback(error)
              );
            }}
            onCancel={e => {
              e.preventDefault();
              history.push(`/${selectedLanguage}`);
            }}
          />
        ) : (
          <p>{t("ContactFormMessageSubmitted")}</p>
        )}
      </Card>
    );
  }

  static fetchData(store, { url }) {
    return store.dispatch(fetchPage({ url: url }, REDUCER_NAME));
  }
}

const mapStateToProps = state => {
  return {
    isSuccess: selectIsSuccess(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onSubmitContact: data => dispatch(submitContact(data))
});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(Contact), Contact)),
  getPage,
  REDUCER_NAME
);
