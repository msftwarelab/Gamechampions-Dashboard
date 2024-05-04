import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withPage } from "~hocs";
import hoistStatics from "hoist-non-react-statics";

import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { getPage } from "~containers/page/actions";
import {
  RETURN_URL,
  FORM_FIELDS,
  REDUCER_NAME,
  BONUS_CAMPAIGN_TYPE
} from "./constants";
import { fetchBonuses, submitCreateBonus } from "./actions";

class CreateBonusCampaign extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      apiErrorMessage: "",
      isSuccess: false,
      submitting: false,
      isPublic: null,
      isDirectBonus: false
    };

    this.submitSuccessCallback = this.submitSuccessCallback.bind(this);
    this.submitFailureCallback = this.submitFailureCallback.bind(this);
  }

  submitSuccessCallback() {
    const { history, selectedLanguage } = this.props;
    this.setState({
      isSuccess: true,
      submitting: false
    });
    history.push(
      `/${selectedLanguage}/bonus-campaigns` +
        "?success=true&action=create&object=Bonus"
    );
  }

  submitFailureCallback(err) {
    const { t, history, selectedLanguage } = this.props;

    const errorMessage = t(err.data);
    this.setState({
      apiErrorMessage: errorMessage,
      submitting: false
    });
    history.push(
      `/${selectedLanguage}/bonus-campaigns` +
        "?success=false&action=create&object=Bonus"
    );
  }

  render() {
    const {
      page,
      match,
      history,
      location = {},
      previousLocation = {},
      selectedLanguage,
      onCreateBonusCampaign
    } = this.props;

    const {
      action,
      submitting,
      apiErrorMessage,
      isPublic,
      isDirectBonus
    } = this.state;

    const returnUrl =
      previousLocation.pathname != location.pathname
        ? previousLocation.pathname
        : RETURN_URL + selectedLanguage;

    return (
      <Modal>
        <Card
          title={page.get("title")}
          html={page.get("html")}
          buttons={page.buttons}
          closeUrl={returnUrl}
        >
          <DynamicForm
            key={this.state.isDirectBonus ? "isDirect" : "isDeposit"}
            formWrapperProps={{
              padding: "2em 0 0 0"
            }}
            action={match.url}
            mode={action}
            returnUrl={returnUrl}
            initialValues={{ isDirectBonus: this.state.isDirectBonus }}
            formFields={FORM_FIELDS({
              OnChange: (v, c) => this.setState({ isPublic: c }),
              OnDirectBonusChange: (v, c) =>
                this.setState({ isDirectBonus: c }),
              isPublic,
              isDirectBonus
            })}
            loading={submitting}
            apiErrorMessage={apiErrorMessage}
            onSubmit={data => {
              delete data.isDirectBonus;
              data.type = isDirectBonus
                ? BONUS_CAMPAIGN_TYPE.DIRECT
                : BONUS_CAMPAIGN_TYPE.DEPOSIT;
              this.setState({
                apiErrorMessage: "",
                submitting: true
              });
              return onCreateBonusCampaign(data)
                .then(() => this.submitSuccessCallback())
                .catch(error => this.submitFailureCallback(error));
            }}
            onCancel={e => {
              e.preventDefault();
              history.push(returnUrl);
            }}
          />
        </Card>
      </Modal>
    );
  }
  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchBonuses({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onCreateBonusCampaign: data => dispatch(submitCreateBonus(data))
});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(CreateBonusCampaign), CreateBonusCampaign)),
  getPage,
  REDUCER_NAME
);
