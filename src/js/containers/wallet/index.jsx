import React from "react";
import { connect } from "react-redux";
import { withPage } from "~hocs";
import { getPage } from "../page/actions";
import { REDUCER_NAME } from "./constants";
import { fetchWalletDetails, getWalletAmount } from "./actions";
import {
  selectBonusMoney,
  selectAvailableAmount,
  selectInplayBalance
} from "./reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import DepositAndWithdraw from "~components/custom/wallet/depositAndWithdraw";
import MoneyDetails from "~components/custom/wallet/moneyDetails";
import { selectProfile } from "~containers/myaccount/reducer";
import ViewTransactionHistory from "~components/custom/wallet/viewTransactionHistory";
import { Paragraph, FlexBox } from "~components/atoms";
import { withTheme } from "~theme";
import { getReturnUrl } from "../../util/util";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

class Wallet extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoadWallet();
  }

  render() {
    const {
      history,
      theme,
      profile,
      bonusMoney,
      availableAmount,
      inPlayBalance,
      selectedLanguage,
      t
    } = this.props;

    const walletTitle = (
      <Paragraph
        color={theme.colors.darkSlateGray}
        fontSize={theme.fonts.large}
        fontWeight={theme.fonts.semiBold}
        margin="0 2px"
      >
        {t("WalletTitle")}
      </Paragraph>
    );

    const returnUrl = getReturnUrl(this.props);

    return (
      <Modal onClick={() => history.push(returnUrl)} modalClassName="wallet">
        <Card title={walletTitle} closeUrl={returnUrl} className="wallet">
          <FlexBox
            width="100%"
            padding={{ base: "2.5rem 0", md: "1.5rem 4rem" }}
            flexDirection="column"
          >
            <MoneyDetails
              bonusMoney={bonusMoney}
              availableAmount={availableAmount}
              inPlayBalance={inPlayBalance}
              currency={profile.get("currency")}
              selectedLanguage={selectedLanguage}
              history={history}
            />
            <FlexBox
              alignItems="center"
              flexDirection="column"
              margin={{ base: "1.5rem 0 0", md: "1.25rem 0 0" }}
              gap={{ base: "2.5rem", md: "1.5rem" }}
            >
              <DepositAndWithdraw
                selectedLanguage={selectedLanguage}
                depositTitle={t("WalletDepositButton")}
                withDrawTitle={t("WalletWithdrawButton")}
                returnUrl={`/${selectedLanguage}/wallet`}
              />
              <ViewTransactionHistory
                returnUrl={`/${selectedLanguage}/my-account/transaction-history`}
              />
            </FlexBox>
          </FlexBox>
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchWalletDetails({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  bonusMoney: selectBonusMoney(state),
  availableAmount: selectAvailableAmount(state),
  inPlayBalance: selectInplayBalance(state),
  profile: selectProfile(state),
  selectedLanguage: selectSelectedLanguage(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadWallet: data => dispatch(getWalletAmount(data))
});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(withTheme(Wallet)), Wallet)),
  getPage,
  REDUCER_NAME
);
