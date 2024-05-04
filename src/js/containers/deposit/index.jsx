import React from "react";
import { connect } from "react-redux";
import { withPage } from "~hocs";
import { getPage } from "../page/actions";
import {
  REDUCER_NAME,
  DEPOSIT_TRANSACTION_TYPE,
  DEPOSIT_TRANSACTION_STEPS,
  PROVIDERS,
  PROVIDERS_TAG
} from "./constants";
import {
  fetchDeposit,
  setAmount,
  resetError,
  resetSuccessfulPayment,
  requestPaymentMethod,
  setError,
  getBonusValues,
  requestSkrillUrl,
  requestPayPalUrl,
  requestApcoPayUrl,
  resetProviderUrl,
  requestMacroPayUrl,
  setPromoCode,
  initTagHub,
  getTagging
} from "./actions";
import {
  selectAmount,
  selectError,
  selectIsLoading,
  selectIsSuccessfulPayment,
  selectPaymentReference,
  selectBonusValues,
  selectPaymentProvider,
  selectProviderUrl,
  selectPromoCode,
  selectIsConnectionCreated,
  selectDepositInfo
} from "./reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import ChooseCredits from "~components/custom/deposit/chooseCredits";
import WalletComponent from "~components/custom/wallet";
import { selectProfile } from "~containers/myaccount/reducer";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import DepositResult from "~components/custom/deposit/depositResult";
import { getReturnUrl, getParameterByName } from "../../util/util";
import { selectDepositCount } from "~containers/wallet/reducer";
import {
  selectCommission,
  selectMinimunAmountCommission,
  selectAvailableAmount
} from "~containers/wallet/reducer";
import { getCommission } from "~containers/wallet/actions";
import { selectIsMobile } from "~containers/app/reducer";
import { getPoll } from "../layout/action";
import ProviderContainer from "./providers";

class Deposit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedProvider: null,
      selectedPaymentOption: "",
      returnUrl: (props.location.state && props.location.state.returnUrl) || "/"
    };

    this.sendDepositCompleteGtm = this.sendDepositCompleteGtm.bind(this);
    this.sendDepositSessionStart = this.sendDepositSessionStart.bind(this);
    this.iFrameEventListener = this.iFrameEventListener.bind(this);
    this.onRequestPaymentUrl = this.onRequestPaymentUrl.bind(this);
  }

  setActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  sendDepositCompleteGtm({
    paymentReference,
    country,
    promoCode = this.props.promoCode
  }) {
    const { depositCount, depositInfo } = this.props;

    window.dataLayer.push({
      event: depositInfo.messageTagText,
      depositValue: depositInfo.amount,
      promoCode,
      transactionRef: paymentReference,
      userId: depositInfo.userId,
      userCountry: country || "MT",
      customerType: depositCount === 1 ? "new" : "existing",
      paymentProvider: depositInfo.paymentProvider
    });
  }

  sendDepositSessionStart({ isNewCard }) {
    const { depositCount, amount, profile, promoCode } = this.props;

    window.dataLayer.push({
      event: "depositSessionStart",
      promoCode,
      eventType: "card",
      depositValue: amount,
      userId: profile.get("id"),
      userCountry: profile.get("country") || "MT",
      isNewCard: isNewCard,
      customerType: depositCount === 1 ? "new" : "existing",
      paymentProvider: this.state.selectedPaymentOption
    });
  }

  componentDidUpdate(prevProps) {
    const {
      amount,
      isSuccessfulPayment,
      error,
      history,
      selectedLanguage,
      paymentReference,
      profile,
      onLoadPoll,
      onSetError,
      onGetTagging
    } = this.props;

    window.addEventListener(
      "message",
      event => {
        var status = null;
        if (event.data?.status) {
          status = event.data?.status.split("?")[0];
          if (status == "failed") {
            onSetError();
          }
          history.push(
            `/${selectedLanguage}/${DEPOSIT_TRANSACTION_TYPE}/${DEPOSIT_TRANSACTION_STEPS.COMPLETED}/`
          );
        }
      },
      false
    );

    if (paymentReference && prevProps.paymentReference !== paymentReference) {
      onLoadPoll().then(() => {
        onGetTagging();
        this.sendDepositCompleteGtm({
          amount,
          paymentReference,
          country: profile.get("country"),
          userId: profile.get("id")
        });
      });
    }

    if (
      (prevProps.isSuccessfulPayment != isSuccessfulPayment &&
        isSuccessfulPayment) ||
      (prevProps.error != error && !!error)
    ) {
      // go to final state
      history.push(
        `/${selectedLanguage}/${DEPOSIT_TRANSACTION_TYPE}/${DEPOSIT_TRANSACTION_STEPS.COMPLETED}/`
      );
    }
  }

  iFrameEventListener(event) {
    const {
      history,
      selectedLanguage,
      onSetError,
      amount,
      paymentReference,
      profile,
      onGetTagging
    } = this.props;
    var status = null;
    if (event.data?.status) {
      status = event.data?.status.split("?")[0];
      if (status == "failed") {
        onSetError();
      } else {
        // If payment is successful
        onGetTagging();
        this.sendDepositCompleteGtm({
          amount,
          paymentReference,
          country: profile.get("country"),
          userId: profile.get("id")
        });
      }
      history.push(
        `/${selectedLanguage}/${DEPOSIT_TRANSACTION_TYPE}/${DEPOSIT_TRANSACTION_STEPS.COMPLETED}/`
      );
    }
  }

  onRequestPaymentUrl() {
    const { selectedProvider } = this.state;
    const {
      amount,
      onRequestSkrillUrl,
      onRequestPayPalUrl,
      onRequestApcoPayUrl,
      onRequestMacroPayUrl,
      promoCode
    } = this.props;
    const providerTag = PROVIDERS_TAG[selectedProvider] || "";
    const payload = { amount, promoCode, providerTag };
    const PROVIDERS_HANDLER = {
      [PROVIDERS.APCOPAY]: onRequestApcoPayUrl,
      [PROVIDERS.SKRILL]: onRequestSkrillUrl,
      [PROVIDERS.GIROPAY]: onRequestMacroPayUrl,
      [PROVIDERS.OPENBANK]: onRequestMacroPayUrl,
      [PROVIDERS.IDEAL]: onRequestMacroPayUrl,
      [PROVIDERS.SOFORT]: onRequestMacroPayUrl,
      [PROVIDERS.BANCONTACT]: onRequestMacroPayUrl,
      [PROVIDERS.P24]: onRequestMacroPayUrl,
      [PROVIDERS.EPS]: onRequestMacroPayUrl,
      [PROVIDERS.PAYPAL]: onRequestPayPalUrl
    };

    if (!PROVIDERS_HANDLER[selectedProvider]) return;
    PROVIDERS_HANDLER[selectedProvider](payload);
  }

  componentDidMount() {
    const {
      commission,
      onLoadCommission,
      match = {},
      error,
      profile,
      isConnectionCreated,
      onLoadPoll,
      onLoadBonusValues,
      onRequestPaymentMethod,
      onGetTagging,
      onSetError,
      onInitTagHub
    } = this.props;
    const { params = {} } = match;
    const { step = "" } = params;
    if (!isConnectionCreated) {
      onInitTagHub();
    }
    window.addEventListener("message", this.iFrameEventListener, false);

    onLoadBonusValues();
    onRequestPaymentMethod();

    const paymentReference = getParameterByName(
      "paymentReference",
      location.search
    );
    const amount = getParameterByName("amount", location.search);
    const promoCode = getParameterByName("promoCode", location.search);
    const isSuccessful = getParameterByName("isSuccessful", location.search);

    if (isSuccessful === "false") {
      onSetError();
    }

    if (!commission) {
      onLoadCommission();
    }

    onLoadPoll().then(() => {
      if (
        DEPOSIT_TRANSACTION_STEPS.COMPLETED === step &&
        !error &&
        paymentReference &&
        amount
      ) {
        onGetTagging();
        this.sendDepositCompleteGtm({
          amount,
          paymentReference,
          country: profile.get("country"),
          userId: profile.get("id"),
          promoCode
        });
      }
    });
  }

  componentWillUnmount() {
    const { onResetError, onResetSuccess } = this.props;
    onResetError();
    onResetSuccess();

    window.removeEventListener("message", this.iFrameEventListener, false);
  }

  calculateCommissionAmount() {
    return (
      this.props.amount *
      (parseFloat(
        this.props.amount > 3
          ? this.props.commission
          : this.props.minimunAmountCommission
      ) /
        100 +
        1)
    );
  }

  getTabComponents() {
    const {
      isLoading,
      onSetAmount,
      onResetError,
      onResetSuccess,
      history,
      profile,
      selectedLanguage,
      error,
      availableAmount,
      providerUrl,
      paymentProvider,
      onResetProviderUrl,
      onSetPromoCode
    } = this.props;

    const { selectedProvider } = this.state;

    const componentArray = [
      {
        id: 1,
        title: "DepositAmountTabTitle",
        transactionStep: DEPOSIT_TRANSACTION_STEPS.CHOOSE_AMOUNT,
        component: (
          <ChooseCredits
            availableAmount={availableAmount}
            onResetError={onResetError}
            onResetSuccess={onResetSuccess}
            transactionType={DEPOSIT_TRANSACTION_TYPE}
            currency={profile.get("currency") || "$"}
            onSetAmount={onSetAmount}
            onSetPromoCode={onSetPromoCode}
            history={history}
            returnUrl={`/${selectedLanguage}`}
            selectedLanguage={selectedLanguage}
            onClearProvider={() => this.setState({ selectedProvider: null })}
            onResetProviderUrl={onResetProviderUrl}
          />
        )
      },
      {
        id: 2,
        title: "DepositMethodTabTitle",
        transactionStep: DEPOSIT_TRANSACTION_STEPS.PAYMENT_METHOD,
        component: (
          <ProviderContainer
            selectedProvider={selectedProvider}
            onSetProvider={provider =>
              this.setState({ selectedProvider: provider })
            }
            paymentProvider={paymentProvider && paymentProvider.providersList}
            onDepositSessionStart={this.sendDepositSessionStart}
            onRequestUrl={this.onRequestPaymentUrl}
            displayAmount={this.calculateCommissionAmount()}
            providerUrl={providerUrl}
          />
        )
      },
      {
        id: 3,
        title: "DepositCompleteTabTitle",
        transactionStep: DEPOSIT_TRANSACTION_STEPS.COMPLETED,
        component: <DepositResult isLoading={isLoading} error={error} />
      }
    ];

    return componentArray;
  }

  render() {
    const {
      amount,
      match,
      selectedLanguage,
      location = {},
      previousLocation = {},
      history,
      page,
      isLoading
    } = this.props;
    const tabComponents = this.getTabComponents();

    let returnUrl = getReturnUrl({
      location,
      previousLocation,
      selectedLanguage
    });

    return (
      <Modal onClick={() => history.push(returnUrl)}>
        <Card
          padding="0"
          titleProps={{ padding: { base: "1rem", md: "1rem 1rem 0 1rem" } }}
          title={page.get("title")}
          closeUrl={returnUrl}
        >
          <WalletComponent
            steps={DEPOSIT_TRANSACTION_STEPS}
            amount={amount}
            transactionType={DEPOSIT_TRANSACTION_TYPE}
            selectedLanguage={selectedLanguage}
            tabs={tabComponents}
            transactionStep={match.params.step}
            isLoading={isLoading}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language, query = {} }) {
    const { paymentReference = "" } = query;

    return store.dispatch(
      fetchDeposit({
        pageData: {
          url,
          language
        },
        requestData: {
          paymentReference
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  profile: selectProfile(state),
  amount: selectAmount(state),
  promoCode: selectPromoCode(state),
  selectedLanguage: selectSelectedLanguage(state),
  error: selectError(state),
  isLoading: selectIsLoading(state),
  isSuccessfulPayment: selectIsSuccessfulPayment(state),
  commission: selectCommission(state),
  minimunAmountCommission: selectMinimunAmountCommission(state),
  availableAmount: selectAvailableAmount(state),
  isMobile: selectIsMobile(state),
  paymentReference: selectPaymentReference(state),
  depositCount: selectDepositCount(state),
  bonusValues: selectBonusValues(state),
  providerUrl: selectProviderUrl(state),
  paymentProvider: selectPaymentProvider(state),
  isConnectionCreated: selectIsConnectionCreated(state),
  depositInfo: selectDepositInfo(state)
});

const mapDispatchToProps = dispatch => ({
  onSetAmount: data => dispatch(setAmount(data)),
  onSetPromoCode: data => dispatch(setPromoCode(data)),
  onResetError: () => dispatch(resetError()),
  onResetSuccess: data => dispatch(resetSuccessfulPayment(data)),
  onLoadCommission: () => dispatch(getCommission()),
  onRequestApcoPayUrl: data => dispatch(requestApcoPayUrl(data)),
  onRequestSkrillUrl: data => dispatch(requestSkrillUrl(data)),
  onRequestPayPalUrl: data => dispatch(requestPayPalUrl(data)),
  onRequestMacroPayUrl: data => dispatch(requestMacroPayUrl(data)),
  onRequestPaymentMethod: () => dispatch(requestPaymentMethod()),
  onInitTagHub: () => dispatch(initTagHub()),
  onGetTagging: () => dispatch(getTagging()),
  onSetError: data => dispatch(setError(data)),
  onLoadPoll: () => dispatch(getPoll()),
  onLoadBonusValues: () => dispatch(getBonusValues()),
  onResetProviderUrl: () => dispatch(resetProviderUrl())
});

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(Deposit),
  getPage,
  REDUCER_NAME
);
