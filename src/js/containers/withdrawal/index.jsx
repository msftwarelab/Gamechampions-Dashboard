import React from "react";
import { connect } from "react-redux";
import { withPage } from "~hocs";
import { getPage } from "../page/actions";
import {
  REDUCER_NAME,
  WITHDRAWAL_TRANSACTION_TYPE,
  WITHDRAWAL_TRANSACTION_STEPS
} from "./constants";
import { fetchWithdrawal, setAmount } from "./actions";
import { selectAmount } from "./reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import ChooseAmount from "~components/custom/wallet/choseAmount";
import WalletComponent from "~components/custom/wallet";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { getReturnUrl } from "../../util/util";

class Withdrawal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      returnUrl: (props.location.state && props.location.state.returnUrl) || "/"
    };
  }

  render() {
    const {
      page,
      amount,
      onSetAmount,
      history,
      match,
      selectedLanguage,
      location = {},
      previousLocation = {}
    } = this.props;

    const componentArray = [
      {
        id: 1,
        title: "ChooseAmountTabTitle",
        transactionType: WITHDRAWAL_TRANSACTION_TYPE,
        transactionStep: WITHDRAWAL_TRANSACTION_STEPS.CHOOSE_AMOUNT,
        component: (
          <ChooseAmount
            description="ChooseAmountWithdraw"
            transactionType={WITHDRAWAL_TRANSACTION_TYPE}
            amount={amount}
            onSetAmount={onSetAmount}
            history={history}
            returnUrl={`/${selectedLanguage}`}
            selectedLanguage={selectedLanguage}
          />
        )
      },
      {
        id: 2,
        title: "PaymentMethodTabTitle",
        transactionType: WITHDRAWAL_TRANSACTION_TYPE,
        transactionStep: WITHDRAWAL_TRANSACTION_STEPS.PAYMENT_METHOD,
        component: <div>Payment method</div>
      },
      {
        id: 3,
        title: "PersonalInfoTabTitle",
        transactionType: WITHDRAWAL_TRANSACTION_TYPE,
        transactionStep: WITHDRAWAL_TRANSACTION_STEPS.PERSONAL_INFO,
        component: <div>Personal info</div>
      },
      {
        id: 4,
        title: "VerifyTabTitle",
        transactionType: WITHDRAWAL_TRANSACTION_TYPE,
        transactionStep: WITHDRAWAL_TRANSACTION_STEPS.VERIFY,
        component: <div>Verify</div>
      }
    ];

    const returnUrl = getReturnUrl({
      location,
      previousLocation,
      selectedLanguage
    });

    return (
      <Modal onClick={() => history.push(returnUrl)}>
        <Card
          title={page.get("title")}
          closeUrl={returnUrl}
          className="wallet-card"
        >
          <WalletComponent
            tabs={componentArray}
            transactionStep={match.params.step}
            selectedLanguage={selectedLanguage}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchWithdrawal({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  amount: selectAmount(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onSetAmount: data => dispatch(setAmount(data))
});

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(Withdrawal),
  getPage,
  REDUCER_NAME
);
