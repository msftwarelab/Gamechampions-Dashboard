import React from "react";
import { styled, media, withTheme } from "~theme";
import DynamicForm from "~components/molecules/dynamicForm";
import { FIELD_TYPES } from "~components/molecules/dynamicForm/constants";
import { FlexBox, Section } from "~components/atoms";
import { toPriceString } from "~service/adapter";
import PaymentInfo from "./paymentInfo";
import { withTranslation } from "react-i18next";
import Amount from "./amountField";
import { MAX_AMOUNT } from "~containers/wallet/constants";
import { ErrorInfo } from "~components/custom/errorInfo";
import SecureInfo from "../choseAmount/secureInfo/index";
import { AMOUNT_OPTIONS } from "~containers/deposit/constants";

const renderPriceLabel = ({
  t,
  option,
  theme,
  bonusValues,
  selectedAmount
}) => {
  var optionBonus = bonusValues.find(
    x => option.value >= x.from && option.value <= x.to
  );

  return (
    <>
      <Section>{toPriceString(t(option.label), "€")}</Section>
      {optionBonus && (
        <Section
          color={
            option.value == selectedAmount
              ? theme.colors.white
              : theme.colors.secondary
          }
          fontSize="0.75rem"
          fontWeight={theme.fonts.semiBold}
        >
          {`+ ${optionBonus.value}% ${t("ChoseAmountBonus")}`}
        </Section>
      )}
    </>
  );
};

const getFormFields = ({
  onRadioChange,
  currency,
  paymentSecure,
  selectedAmount,
  commission,
  minimunAmountCommission,
  t,
  theme,
  bonusValues
}) => {
  return [
    {
      id: 1,
      name: "quickAmount",
      options: AMOUNT_OPTIONS,
      componentType: FIELD_TYPES.RADIO_GROUP,
      fieldProps: {
        onChange: onRadioChange,
        getLabel: option => {
          return renderPriceLabel({
            option,
            t,
            options: AMOUNT_OPTIONS,
            currency,
            theme,
            bonusValues,
            selectedAmount
          });
        },
        material: true,
        className: "choose-amount"
      }
    },
    {
      id: 2,
      name: "amount",
      componentType: FIELD_TYPES.CUSTOM_FIELD,
      child: Amount,
      selectedAmount,
      paymentSecure,
      commission,
      minimunAmountCommission,
      onRadioChange,
      className: "single"
    }
  ];
};

class ChooseAmount extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMaxAmountText: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const {
      onResetError,
      onResetSuccess,
      onSetAmount,
      onClearProvider,
      onResetProviderUrl
    } = this.props;
    onResetError();
    onResetSuccess();
    onSetAmount(0);
    onClearProvider();
    onResetProviderUrl();
  }
  handleSubmit(e) {
    const {
      onSetAmount,
      history,
      selectedLanguage,
      transactionType,
      availableAmount,
      onRadioChange,
      onSetPromoCode
    } = this.props;
    let selectedAmount = parseInt(e.amount);
    let amount = isNaN(selectedAmount) ? 0 : selectedAmount;

    if (availableAmount + amount <= MAX_AMOUNT) {
      onSetAmount(amount);
      onSetPromoCode(e.promoCode);
      onRadioChange(0);
      history.push(`/${selectedLanguage}/${transactionType}/payment-method`);
    } else {
      this.setState({ showMaxAmountText: true });
    }
  }

  render() {
    const {
      note = "",
      returnUrl,
      currency,
      theme,
      paymentInfoRows,
      paymentSecure,
      t,
      onRadioChange,
      selectedAmount,
      commission,
      minimunAmountCommission,
      bonusValues
    } = this.props;

    return (
      <ChooseAmountStyle className="choose-amount" note={note}>
        <DynamicForm
          submitButtonDisabled={
            !selectedAmount || selectedAmount < AMOUNT_OPTIONS[0].value
          }
          formFields={getFormFields({
            onRadioChange: onRadioChange,
            selectedAmount: selectedAmount,
            currency: currency,
            paymentSecure: paymentSecure,
            commission,
            minimunAmountCommission,
            t,
            theme,
            bonusValues
          })}
          initialValues={{
            amount: AMOUNT_OPTIONS[0].value,
            quickAmount: AMOUNT_OPTIONS[0].value
          }}
          className="amount-select__form"
          returnUrl={returnUrl}
          submitButtonLabel="ButtonDynamicFormContinue"
          onSubmit={e => {
            this.handleSubmit(e);
          }}
          extraContents={
            this.state.showMaxAmountText && (
              <ErrorInfo>{t("AmountExceded")}</ErrorInfo>
            )
          }
        />
        {note && (
          <FlexBox
            margin="0 0.5em 1em 0.5em"
            justifyContent={{
              base: "center",
              md: "flex-end"
            }}
            color="rgba(0, 0, 0, 0.34)"
            fontSize={theme.fonts.xSmall}
            fontStyle="italic"
          >
            {t(note)}
          </FlexBox>
        )}
        {paymentSecure && (
          <FlexBox
            display={{ base: "flex", md: "none" }}
            justifyContent="center"
          >
            <SecureInfo rows={paymentSecure}></SecureInfo>
          </FlexBox>
        )}
        <PaymentInfo rows={paymentInfoRows} />
      </ChooseAmountStyle>
    );
  }
}

export default withTheme(withTranslation()(ChooseAmount));

const ChooseAmountStyle = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;

  ${media.md`
    width: auto;
    height: 100%;
  `};
`;
