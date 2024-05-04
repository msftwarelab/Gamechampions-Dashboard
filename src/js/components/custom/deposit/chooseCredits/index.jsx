import React from "react";
import { withTheme } from "~theme";
import { FlexBox, Paragraph, Button, Icon } from "~components/atoms";
import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ErrorToastNotification from "~components/custom/toastNotification/errorToastNotification";
import {
  DEPOSIT_AVAILABLE_AMOUNTS,
  DEPOSIT_DEFAULT_AMOUNTS
} from "~containers/deposit/constants";
import { MAX_AMOUNT, MIN_AMOUNT } from "~containers/wallet/constants";
import { ErrorInfo } from "~components/custom/errorInfo";
import Span from "~components/atoms/span";

class ChooseCredits extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: DEPOSIT_DEFAULT_AMOUNTS,
      showMaxAmountText: false
    };
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.handleClickCreditsType = this.handleClickCreditsType.bind(this);
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

  onChangeAmount(e) {
    if (e.target.value.toString().length <= MAX_AMOUNT.toString().length) {
      const inputValue = e.target.value;
      this.setState({ amount: inputValue });
    }
  }

  handleClickCreditsType(val) {
    this.setState({
      amount: val
    });
  }

  handleSubmit() {
    const {
      onSetAmount,
      history,
      selectedLanguage,
      transactionType,
      availableAmount,
      onSetPromoCode,
      t
    } = this.props;
    if (isNaN(Number(this.state.amount)) || this.state.amount < MIN_AMOUNT) {
      toast(<ErrorToastNotification message={t("ChooseAmountMinimum")} />, {
        className: "toast-custom",
        hideProgressBar: true,
        closeButton: false
      });
    } else {
      let amount = isNaN(Number(this.state.amount)) ? 0 : this.state.amount;

      if (availableAmount + amount <= MAX_AMOUNT) {
        onSetAmount(amount);
        onSetPromoCode(null);
        history.push(`/${selectedLanguage}/${transactionType}/payment-method`);
      } else {
        this.setState({ showMaxAmountText: true });
      }
    }
  }

  render() {
    const { theme, t, currency } = this.props;
    const { amount, showMaxAmountText } = this.state;
    const inputMaxSize = 10 ** amount.toString().length;

    return (
      <FlexBox justifyContent="center" width="100%">
        <FlexBox flexDirection="column" width={{ base: "100%", md: "35rem" }}>
          <FlexBox
            justifyContent="center"
            padding="0.75rem 0 0.75rem 0"
            borderWidth="0 0 2px 0"
            borderColor={theme.colors.secondary}
            borderStyle="solid"
            fontWeight={theme.fonts.bold}
            color={theme.colors.secondary}
            alignItems="center"
            fontSize="4.5rem"
          >
            <Span margin="0rem -2.6rem 0rem 0rem">$</Span>
            <input
              className="form-field__input__deposit"
              type="number"
              min="0"
              max={inputMaxSize}
              style={{
                color: theme.colors.secondary,
                fontWeight: theme.fonts.bold,
                backgroundColor: "transparent"
              }}
              value={amount}
              onChange={this.onChangeAmount}
            />
          </FlexBox>
          <FlexBox justifyContent="center" gap="1rem" margin="1.25rem 0 0">
            {DEPOSIT_AVAILABLE_AMOUNTS.map((amountType, index) => (
              <FlexBox
                key={index}
                backgroundColor={
                  amount === amountType
                    ? theme.colors.turquoiseFilled
                    : theme.colors.turquoiseFilledLighten
                }
                hoverBackgroundColor={
                  amount === amountType
                    ? theme.colors.turquoiseFilled
                    : theme.colors.turquoiseFilledLighten
                }
                justifyContent="center"
                alignItems="center"
                borderRadius="50%"
                width="82px"
                height="82px"
                cursor="pointer"
                onClick={() => this.handleClickCreditsType(amountType)}
              >
                <Paragraph
                  color={
                    amount === amountType
                      ? theme.colors.white
                      : theme.colors.darkSlateGray
                  }
                  fontSize={theme.fonts.xLarge}
                  fontWeight={theme.fonts.semiBold}
                >
                  {`${currency ? currency : "$"}${amountType}`}
                </Paragraph>
              </FlexBox>
            ))}
          </FlexBox>
          <FlexBox margin="1.5rem 0 0">
            <Button to="#" width="100%" onClick={this.handleSubmit}>
              {t("ButtonDynamicFormContinue")}
            </Button>
          </FlexBox>
          <FlexBox margin="0.5rem 0 0">
            {showMaxAmountText && <ErrorInfo>{t("AmountExceded")}</ErrorInfo>}
          </FlexBox>
          <FlexBox
            backgroundColor={theme.colors.mistyGrey}
            hoverBackgroundColor={theme.colors.mistyGrey}
            borderRadius="1rem"
            margin="1.5rem 0 1.5rem"
            padding="1rem"
          >
            <FlexBox alignItems="center" justifyContent="center">
              <Icon
                scale="2"
                icon="info_icon_2"
                viewBox="0 0 32 32"
                color={theme.colors.darkSlateGray}
                margin="0 13px 0 2px"
              />
            </FlexBox>
            <FlexBox alignItems="center">
              <Paragraph
                color={theme.colors.darkSlateGray}
                fontSize={theme.fonts.small}
              >
                {t("DepositText")}
              </Paragraph>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    );
  }
}

export default withTheme(withTranslation()(ChooseCredits));
