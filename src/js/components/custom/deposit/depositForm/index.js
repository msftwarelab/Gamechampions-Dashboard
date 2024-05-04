import React from "react";
import DynamicForm from "~components/molecules/dynamicForm";
import { FlexBox, Loader, Image } from "~components/atoms";
import Card from "react-credit-cards";
import { default as styled } from "styled-components";
import { FlexBoxStyle, SizeStyle } from "~components/styles";
import { STORAGE_URL } from "~service/constants";
import { withTranslation } from "react-i18next";

const paymentTypes = [
  {
    src: "visa-icon.png",
    title: "visa"
  },
  {
    src: "maestro-icon.png",
    title: "maestro"
  }
];

class DepositForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setError = this.setError.bind(this);
  }

  renderCard() {
    const {
      initialValues,
      formFieldValues,
      isFormVisible,
      isMobile
    } = this.props;

    return (
      <>
        {(isMobile && !initialValues) || (isMobile && isFormVisible) ? (
          <FlexBox
            alignContent="center"
            justifyContent="center"
            gap="1em"
            margin="0.5em 0"
          >
            {paymentTypes &&
              paymentTypes.map((i, k) => {
                return (
                  <Image
                    width="25%"
                    key={k}
                    src={`${STORAGE_URL}images/${i.src}`}
                    title={i.title}
                    alt={i.title}
                  />
                );
              })}
          </FlexBox>
        ) : initialValues && !isFormVisible ? (
          <Card
            name={initialValues.get("cardHolderFullName")}
            number={`**** **** **** ${initialValues.get("cardDisplayNumber")}`}
            expiry="**/**"
            cvc="***"
            issuer="unknown"
            preview={true}
          />
        ) : (
          <Card {...formFieldValues} />
        )}
      </>
    );
  }

  getFinalAmount() {
    const { amount, commission, minimunAmountCommission } = this.props;
    const finalCommission = amount > 3 ? commission : minimunAmountCommission;
    const finalAmount = amount * (parseFloat(finalCommission) / 100 + 1);

    return finalAmount;
  }

  renderFormToggle() {
    const {
      onExistingCardSubmit,
      isFormVisible,
      initialValues,
      toggleFormFields
    } = this.props;

    if (
      !initialValues ||
      (initialValues && !Object.keys(initialValues).length === 0)
    ) {
      return null;
    }

    const finalAmount = this.getFinalAmount();

    return (
      <DynamicForm
        formFields={toggleFormFields}
        displayButtons={!isFormVisible}
        onSubmit={onExistingCardSubmit}
        initialValues={{
          isFormVisible: isFormVisible
        }}
        submitButtonLabel={`Pay ${!isNaN(finalAmount) &&
          `$${finalAmount.toFixed(2)}`}`}
        submitButtonIcon="lock"
      />
    );
  }

  renderForm() {
    const {
      onNewCardSubmit,
      depositFormFields,
      initialValues,
      isFormVisible
    } = this.props;

    const finalAmount = this.getFinalAmount();

    if (isFormVisible || !initialValues) {
      return (
        <DynamicForm
          formFields={depositFormFields}
          onSubmit={onNewCardSubmit}
          submitButtonLabel={`Pay ${!isNaN(finalAmount) &&
            `$${finalAmount.toFixed(2)}`}`}
          submitButtonIcon="lock"
        />
      );
    }
  }

  setError() {
    const { onSetError } = this.props;
    onSetError("WalletErrorPaymentFailed");
  }

  renderLoader() {
    return (
      <Loader
        isLoading={this.props.isLoading}
        margin="5rem auto"
        scale="6rem"
      />
    );
  }

  render() {
    const { isLoading } = this.props;

    return (
      <DepositFormStyle flexDirection="column" width="100%">
        {isLoading ? (
          this.renderLoader()
        ) : (
          <>
            {this.renderCard()}
            {this.renderFormToggle()}
            {this.renderForm()}
          </>
        )}
      </DepositFormStyle>
    );
  }
}

const DepositFormStyle = styled.div`
  display: flex;

  ${FlexBoxStyle};
  ${SizeStyle};
`;

export default withTranslation()(DepositForm);
