import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { FlexBox, Image } from "~components/atoms";
import { styled, withTheme } from "~theme";
import Span from "~components/atoms/span";
import ErrorToastNotification from "~components/custom/toastNotification/errorToastNotification";
import DynamicForm from "~components/molecules/dynamicForm";
import { withPage, withAuth } from "~hocs";
import { getPage } from "../page/actions";
import {
  REDUCER_NAME,
  WITHDRAWAL_TYPE,
  getWithdrawalFields
} from "./constants";
import {
  fetchWithdrawal,
  setAmount,
  getWithdrawApiErrorMessage,
  submitWithdraw
} from "./actions";
import { selectProfile } from "../myaccount/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAvailableAmount } from "~containers/wallet/reducer";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";
import { getReturnUrl } from "../../util/util";
import Paragraph from "~components/atoms/paragraph";
import Button from "~components/atoms/button";

class Withdrawal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      apiErrorMessage: "",
      isSubmitted: false,
      submitting: false,
      steps: 1,
      amount: 0,
      returnUrl:
        (props.location.state && props.location.state.returnUrl) || "/",
      giftSelected: false,
      swiftSelected: false,
      euSelected: false
    };

    this.submitFailureCallback = this.submitFailureCallback.bind(this);
    this.handlePaymentMethod = this.handlePaymentMethod.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
  }

  handlePaymentMethod() {
    const { selectedLanguage, profile, history, t } = this.props;
    const { amount, giftSelected, swiftSelected, euSelected } = this.state;
    const withdrawalType = giftSelected
      ? WITHDRAWAL_TYPE.GIFT_CARD
      : swiftSelected
      ? WITHDRAWAL_TYPE.SWIFT_TRANSFER
      : euSelected
      ? WITHDRAWAL_TYPE.EU_SEPA_TRANSFER
      : null;

    if (withdrawalType) {
      this.setState({
        submitting: true
      });
      return submitWithdraw({
        playerId: profile.get("id"),
        amount: amount,
        WithdrawalType: withdrawalType
      })
        .then(() => {
          this.setState({ isSubmitted: true, submitting: false });
          history.push(
            `/${selectedLanguage}` +
              "?success=true&action=send&object=Withdrawal"
          );
        })
        .catch(error => {
          this.submitFailureCallback(error);
          const message =
            error.data.errorCode !== undefined
              ? t(`BoyError${error.data.errorCode}`)
              : t("GenericError");
          toast(<ErrorToastNotification message={message} />, {
            className: "toast-custom",
            hideProgressBar: true,
            closeButton: false
          });
          if (error.data.errorCode === 464) {
            history.push(`/${selectedLanguage}/my-account/bank-details`);
          } else if (error.data.errorCode === 466) {
            history.push(`/${selectedLanguage}/deposit/choose-amount`);
          } else if (error.data.errorCode === 461) {
            history.push(`/${selectedLanguage}/my-account/personal-settings`);
          }
        });
    } else {
      toast(<ErrorToastNotification message={t(`WithdrawTypeChoose`)} />, {
        className: "toast-custom",
        hideProgressBar: true,
        closeButton: false
      });
    }
  }

  submitFailureCallback(err) {
    const { t } = this.props;

    const errorMessage = t(getWithdrawApiErrorMessage(err));
    this.setState({
      apiErrorMessage: errorMessage,
      submitting: false
    });
  }

  onChangeAmount(value, c) {
    const { availableAmount } = this.props;
    if (value.toString().length <= availableAmount.toString().length) {
      this.setState({
        amount: value
      });
    }
  }

  render() {
    const {
      page,
      history,
      selectedLanguage,
      location = {},
      previousLocation = {},
      theme,
      availableAmount,
      t
    } = this.props;
    const {
      steps,
      amount,
      giftSelected,
      swiftSelected,
      euSelected
    } = this.state;
    const inputMaxSize = 10 ** amount.toString().length;
    const returnUrl = getReturnUrl({
      location,
      previousLocation,
      selectedLanguage
    });

    return (
      <>
        <Modal onClick={() => history.push(returnUrl)}>
          <Card
            title={page.get("title")}
            closeUrl={returnUrl}
            className={`withdrawal-form ${steps == 3 ? "grid-display" : ""}`}
          >
            <Paragraph textAlign="center">{t("WithdrawTitle1")}</Paragraph>
            <Paragraph textAlign="center">
              {t("WithdrawTitle2")}: ${availableAmount}
            </Paragraph>
            <FlexBox
              justifyContent="center"
              padding="0.75rem 0 0.75rem 3rem"
              margin="0 0 2rem 0"
              borderWidth="0 0 2px 0"
              borderColor={theme.colors.secondary}
              borderStyle="solid"
              fontWeight={theme.fonts.bold}
              color={theme.colors.secondary}
              fontSize="4.5rem"
            >
              <Span margin="2rem 0rem 0rem 0rem">$</Span>
              <DynamicForm
                formFields={getWithdrawalFields({
                  max: inputMaxSize,
                  onChange: this.onChangeAmount,
                  amount: amount
                })}
                displayButtons={false}
              />
            </FlexBox>
            <FlexBox
              width="100%"
              height="100%"
              margin="1rem 0"
              padding={{
                base: "1rem 0.375rem 1.25rem 1.25rem",
                md: "1.5rem 0.5rem 1.5rem 1.5rem"
              }}
              justifyContent="space-between"
              alignItems="center"
              borderRadius="1rem"
              borderColor={giftSelected ? "#5ad1ce" : "#BABABA"}
              borderStyle="solid"
              borderWidth="3px"
              cursor="pointer"
              onClick={() => {
                this.setState({
                  giftSelected: true,
                  swiftSelected: false,
                  euSelected: false
                });
              }}
            >
              <Dot selected={giftSelected} />
              <FlexBox
                flexDirection="column"
                width="72%"
                padding={{ base: "0", md: "0 0 0 1rem" }}
              >
                <Paragraph
                  fontSize={{ base: "1rem", md: "2rem" }}
                  margin={{ base: "0", md: "0 0 1rem 0" }}
                >
                  {t("WithdrawGiftCards")}
                </Paragraph>
                <Paragraph fontSize={{ base: "0.75rem", md: "1rem" }}>
                  {t("WithdrawGiftCardsParagraph")}
                </Paragraph>
              </FlexBox>
              <GridImage>
                <Image src="/img/visa.png" />
                <Image src="/img/paypal.png" />
                <Image src="/img/Nintendo.png" />
                <Image src="/img/Adidas.png" />
                <Image src="/img/Playstore.png" />
                <Image src="/img/Amazon.png" />
                <Image src="/img/PSN.png" />
                <Image src="/img/Xbox.png" />
                <Image src="/img/spotify.png" />
              </GridImage>
            </FlexBox>
            <FlexBox
              width="100%"
              height="100%"
              margin="1rem 0"
              padding={{
                base: "1rem 0.375rem 1.25rem 1.25rem",
                md: "1.5rem 0.5rem 1.5rem 1.5rem"
              }}
              justifyContent="space-between"
              alignItems="center"
              borderRadius="1rem"
              borderColor={swiftSelected ? "#5ad1ce" : "#BABABA"}
              borderStyle="solid"
              borderWidth="3px"
              cursor="pointer"
              onClick={() => {
                this.setState({
                  giftSelected: false,
                  swiftSelected: true,
                  euSelected: false
                });
              }}
            >
              <Dot selected={swiftSelected} />
              <FlexBox flexDirection="column" width="72%">
                <Paragraph
                  fontSize={{ base: "1rem", md: "2rem" }}
                  margin={{ base: "0", md: "0 0 1rem 0" }}
                >
                  {t("WithdrawSwift")}
                </Paragraph>
                <Paragraph fontSize={{ base: "0.75rem", md: "1rem" }}>
                  {t("WithdrawSwiftParagraph")}
                </Paragraph>
              </FlexBox>
              <Image width="7rem" src="/img/SWIFT_transfer.png" />
            </FlexBox>
            <FlexBox
              width="100%"
              height="100%"
              margin="1rem 0"
              padding={{
                base: "1rem 0.375rem 1.25rem 1.25rem",
                md: "1.5rem 0.5rem 1.5rem 1.5rem"
              }}
              justifyContent="space-between"
              alignItems="center"
              borderRadius="1rem"
              borderColor={euSelected ? "#5ad1ce" : "#BABABA"}
              borderStyle="solid"
              borderWidth="3px"
              cursor="pointer"
              onClick={() => {
                this.setState({
                  giftSelected: false,
                  swiftSelected: false,
                  euSelected: true
                });
              }}
            >
              <Dot selected={euSelected} />
              <FlexBox flexDirection="column" width="72%">
                <Paragraph
                  fontSize={{ base: "1rem", md: "2rem" }}
                  margin={{ base: "0", md: "0 0 1rem 0" }}
                >
                  {t("WithdrawEuSepa")}
                </Paragraph>
                <Paragraph fontSize={{ base: "0.75rem", md: "1rem" }}>
                  {t("WithdrawEuSepaParagraph")}
                </Paragraph>
              </FlexBox>
              <Image width="7rem" src="/img/EU_SEPA_transfer.png" />
            </FlexBox>
            <Button onClick={this.handlePaymentMethod}>
              {t("ButtonDynamicFormContinue")}
            </Button>
          </Card>
        </Modal>
      </>
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
  availableAmount: selectAvailableAmount(state),
  selectedLanguage: selectSelectedLanguage(state),
  profile: selectProfile(state)
});

const mapDispatchToProps = dispatch => ({
  onSetAmount: data => dispatch(setAmount(data))
});

export default withTheme(
  withAuth(
    withPage(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(hoistStatics(withTranslation()(Withdrawal), Withdrawal)),
      getPage,
      REDUCER_NAME
    )
  )
);

const Dot = styled("span")`
  background-color: ${({ selected }) => (selected ? "#5ad1ce" : "#d9d9d9")};
  bottom: 0;
  right: 0;
  min-width: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 4px solid;
  margin-right: 5px;
  border-color: #d9d9d9;
`;

const GridImage = styled.ul`
  display: grid;
  padding: 0;
  margin: 0 0.1rem 0.5rem 0;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  grid-template-columns: 1fr 1fr 1fr;
`;
