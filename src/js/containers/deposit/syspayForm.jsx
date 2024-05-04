import React from "react";
import { connect } from "react-redux";
import { getDepositFormFields, getToggleFormFields } from "./constants";
import {
  getCard,
  resetCard,
  executeTransaction,
  createCardAndExecuteTransaction,
  resetError,
  resetSuccessfulPayment,
  confirmPaypalTransaction,
  setError
} from "./actions";
import {
  selectAmount,
  selectCard,
  selectError,
  selectIsLoading,
  selectIsSuccessfulPayment,
  selectPaymentReference,
  selectPromoCode
} from "./reducer";
import { selectProfile } from "~containers/myaccount/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import DepositForm from "~components/custom/deposit/depositForm";
import { selectDepositCount } from "~containers/wallet/reducer";
import {
  selectCommission,
  selectMinimunAmountCommission,
  selectAvailableAmount
} from "~containers/wallet/reducer";
import { selectIsMobile } from "~containers/app/reducer";
import { getPoll } from "../layout/action";

class SyspayForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sysPayReturnUrl: process.env.SYSPAY_RETURN_URL,
      isFormVisible: false,
      formFieldValues: {
        name: "",
        number: "",
        expiry: "",
        cvc: "",
        focused: ""
      }
    };

    this.handleDepositFormOnChange = this.handleDepositFormOnChange.bind(this);
    this.handleToggleFormOnChange = this.handleToggleFormOnChange.bind(this);
    this.sendDepositSessionStart = this.sendDepositSessionStart.bind(this);
  }

  componentDidMount() {
    const { onLoadCard, card } = this.props;
    if (!card) {
      onLoadCard();
    }
  }

  sendDepositSessionStart({ isNewCard }) {
    const { depositCount, amount, profile, promoCode } = this.props;

    window.dataLayer.push({
      event: "depositSessionStart",
      eventType: "card",
      depositValue: amount,
      userId: profile.get("id"),
      userCountry: profile.get("country") || "MT",
      promoCode,
      isNewCard: isNewCard,
      customerType: depositCount === 1 ? "new" : "existing",
      paymentProvider: "SysPay"
    });
  }

  componentWillUnmount() {
    const { onResetCard } = this.props;
    onResetCard();
  }

  handleToggleFormOnChange() {
    const { isFormVisible } = this.state;
    this.setState({ isFormVisible: !isFormVisible });
  }

  handleDepositFormOnChange(name, value) {
    const { formFieldValues } = this.state;

    this.setState({
      formFieldValues: {
        ...formFieldValues,
        [name]: value,
        focused: name
      }
    });
  }

  render() {
    const {
      amount,
      card,
      isLoading,
      history,
      selectedLanguage,
      onSetNewCard,
      onExecuteTransaction,
      commission,
      minimunAmountCommission,
      isMobile,
      onSetError,
      promoCode
    } = this.props;

    const { sysPayReturnUrl, formFieldValues, isFormVisible } = this.state;

    return (
      <DepositForm
        isFormVisible={isFormVisible}
        toggleFormFields={getToggleFormFields({
          handleOnChange: this.handleToggleFormOnChange
        })}
        depositFormFields={getDepositFormFields({
          handleOnChange: this.handleDepositFormOnChange,
          formFieldValues
        })}
        onNewCardSubmit={data => {
          this.sendDepositSessionStart({ isNewCard: true });
          onSetNewCard({
            ...data,
            amount,
            promoCode,
            returnUrl: sysPayReturnUrl.replace("{{lang}}", selectedLanguage)
          });
        }}
        onExistingCardSubmit={() => {
          this.sendDepositSessionStart({ isNewCard: false });
          onExecuteTransaction({
            amount,
            promoCode,
            returnUrl: sysPayReturnUrl.replace("{{lang}}", selectedLanguage)
          });
        }}
        formFieldValues={formFieldValues}
        initialValues={card}
        isLoading={isLoading}
        amount={amount}
        commission={commission}
        minimunAmountCommission={minimunAmountCommission}
        isMobile={isMobile}
        history={history}
        selectedLanguage={selectedLanguage}
        onSetError={onSetError}
      />
    );
  }
}

const mapStateToProps = state => ({
  profile: selectProfile(state),
  amount: selectAmount(state),
  selectedLanguage: selectSelectedLanguage(state),
  card: selectCard(state),
  error: selectError(state),
  isLoading: selectIsLoading(state),
  isSuccessfulPayment: selectIsSuccessfulPayment(state),
  commission: selectCommission(state),
  minimunAmountCommission: selectMinimunAmountCommission(state),
  availableAmount: selectAvailableAmount(state),
  isMobile: selectIsMobile(state),
  paymentReference: selectPaymentReference(state),
  depositCount: selectDepositCount(state),
  promoCode: selectPromoCode(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadCard: () => dispatch(getCard()),
  onResetCard: () => dispatch(resetCard()),
  onResetError: () => dispatch(resetError()),
  onSetNewCard: data => dispatch(createCardAndExecuteTransaction(data)),
  onExecuteTransaction: data => dispatch(executeTransaction(data)),
  onResetSuccess: data => dispatch(resetSuccessfulPayment(data)),
  onConfirmPaypalTransaction: data => dispatch(confirmPaypalTransaction(data)),
  onSetError: data => dispatch(setError(data)),
  onLoadPoll: () => dispatch(getPoll())
});

export default connect(mapStateToProps, mapDispatchToProps)(SyspayForm);
