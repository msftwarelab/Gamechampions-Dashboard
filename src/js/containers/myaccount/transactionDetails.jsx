import React from "react";
import { connect } from "react-redux";

import { withPage } from "~hocs";
import { getPage } from "~containers/page/actions";
import { getTransactionHistory, fetchTransactionHistory } from "./actions";
import { REDUCER_NAME, TRANSACTION_FORM_FIELDS } from "./constants";
import { selectTransactionHistory } from "./reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import DynamicForm from "~components/molecules/dynamicForm";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

class TransactionDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      returnUrl: `/my-account/transaction-history`
    };
  }

  componentDidMount() {
    const { transactionHistory, onLoadTransactionHistory } = this.props;

    if (!(transactionHistory && transactionHistory.size)) {
      onLoadTransactionHistory();
    }
  }

  render() {
    const {
      page,
      history,
      match,
      transactionHistory,
      selectedLanguage
    } = this.props;

    const returnUrl = `/${selectedLanguage}` + this.state.returnUrl;
    const transactionDetails = transactionHistory.find(
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
            mode="view"
            initialValues={transactionDetails.toJS()}
            formFields={TRANSACTION_FORM_FIELDS}
            returnUrl={returnUrl}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchTransactionHistory({
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
    transactionHistory: selectTransactionHistory(state),
    selectedLanguage: selectSelectedLanguage(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onLoadTransactionHistory: () => dispatch(getTransactionHistory())
});

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(TransactionDetails),
  getPage,
  REDUCER_NAME
);
