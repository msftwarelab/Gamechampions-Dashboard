import React from "react";
import { connect } from "react-redux";

import Modal from "../../components/modal/modal";
import Card from "../../components/card/card";
import { getParameterByName } from "../../util/util";
import {
  RETURN_URL,
  FORM_FIELDS,
  REDUCER_NAME,
  HASH_QUERY_STRING_PARAM
} from "./constants";
import { fetchResetPassword, getPerson, submitResetPassword } from "./actions";
import { selectPerson, selectEmail, selectResetPasswordHash } from "./reducer";
import { getPage } from "../page/actions";
import { withPage, withSubmit } from "~hocs";
import DynamicForm from "~components/molecules/dynamicForm";
import hoistStatics from "hoist-non-react-statics";
import { withTranslation } from "react-i18next";
import { CentralContainer } from "~components/styles";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

class ResetPassword extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false
    };
  }

  componentDidMount() {
    const { onLoadPerson } = this.props;

    const hash =
      getParameterByName(HASH_QUERY_STRING_PARAM, location.search) || "";

    if (hash) {
      onLoadPerson(hash);
    }
  }

  render() {
    const {
      page,
      match,
      email,
      history,
      person,
      t,
      selectedLanguage
    } = this.props;

    const invalidTokenTitle = t("ResetPasswordInvalidTokenTitle");
    const invalidTokenMessage = t("ResetPasswordInvalidTokenMessage");

    return (
      <Modal modalClassName="fullscreen">
        <Card
          title={email ? page.get("title") : invalidTokenTitle}
          html={!email && invalidTokenMessage}
          showLanguage={true}
          showLogo={true}
          buttons={page.buttons}
          cardClassName="fullscreen"
          className="background-gradient"
          titleProps={{
            padding: "0",
            textAlign: "center",
            flex: "1",
            margin: "0 0 1rem"
          }}
          htmlProps={{
            justifyContent: "center"
          }}
        >
          <CentralContainer>
            {email && (
              <DynamicForm
                action={match.url}
                formFields={FORM_FIELDS}
                initialValues={{
                  email
                }}
                loading={this.state.submitting}
                onSubmit={e => {
                  const data = { ...e };
                  data.id = person.id;
                  data.role = person.role;
                  this.setState({
                    submitting: true
                  });
                  return submitResetPassword(data).then(() => {
                    this.setState({
                      submitting: false
                    });
                    history.push(`/${selectedLanguage}${RETURN_URL}`);
                  });
                }}
                onCancel={e => {
                  e.preventDefault();
                  history.push(`/${selectedLanguage}${RETURN_URL}`);
                }}
              />
            )}
          </CentralContainer>
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, query, language }) {
    let hash = query[HASH_QUERY_STRING_PARAM] || "";

    return store.dispatch(
      fetchResetPassword({
        pageData: {
          url,
          language
        },
        requestData: {
          hash
        }
      })
    );
  }
}

const mapStateToProps = state => {
  return {
    person: selectPerson(state),
    email: selectEmail(state),
    resetPasswordHash: selectResetPasswordHash(state),
    selectedLanguage: selectSelectedLanguage(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onLoadPerson: data => dispatch(getPerson(data))
});

export default withSubmit(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(ResetPassword), ResetPassword)),
    getPage,
    REDUCER_NAME
  )
);
