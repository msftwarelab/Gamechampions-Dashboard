import React from "react";
import { connect } from "react-redux";

import { withPage } from "~hocs";
import { getPage } from "~containers/page/actions";
import {
  getBonusTransactionHistory,
  fetchBonusTransactionHistory
} from "./actions";
import { BONUS_REDUCER_NAME, TRANSACTION_FORM_FIELDS } from "./constants";
import { selectBonusTransactionHistory } from "./reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

class BonusTransactionDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      returnUrl: `/my-account/bonus-transaction-history`
    };
  }

  componentDidMount() {
    const {
      bonusTransactionHistory,
      onLoadBonusTransactionHistory
    } = this.props;

    if (!(bonusTransactionHistory && bonusTransactionHistory.size)) {
      onLoadBonusTransactionHistory();
    }
  }

  render() {
    const {
      page,
      history,
      match,
      bonusTransactionHistory,
      selectedLanguage
    } = this.props;

    const returnUrl = `/${selectedLanguage}` + this.state.returnUrl;
    const bonusTransactionDetails = bonusTransactionHistory.find(
      r => r.get("id") === parseInt(match.params.transactionId)
    );

    return (
      <Modal onClick={() => history.push(returnUrl)} wide={true}>
        <Card
          title={page.get("title")}
          html={page.get("html")}
          buttons={page.get("buttons")}
          closeUrl={returnUrl}
        >
          <DynamicForm
            formWrapperProps={{
              margin: "1rem 0 0"
            }}
            mode="view"
            initialValues={bonusTransactionDetails.toJS()}
            formFields={TRANSACTION_FORM_FIELDS}
            returnUrl={returnUrl}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchBonusTransactionHistory({
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
    bonusTransactionHistory: selectBonusTransactionHistory(state),
    selectedLanguage: selectSelectedLanguage(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onLoadBonusTransactionHistory: () => dispatch(getBonusTransactionHistory())
});

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(BonusTransactionDetails),
  getPage,
  BONUS_REDUCER_NAME
);
