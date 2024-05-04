import React from "react";
import { connect } from "react-redux";
import { withPage } from "~hocs";
import { getPage } from "../page/actions";
import { REDUCER_NAME, PAGE_SIZE_VALUE } from "./constants";
import {
  fetchProfile,
  getTransactionHistory,
  getBonusTransactionHistory,
  getProfile,
  submitMyAccount,
  submitMyBankDetails,
  getPlayerLinkedBonusCampaigns
} from "./actions";
import {
  selectTransactionHistory,
  selectBonusTransactionHistory,
  selectProfile,
  selectIsLoading,
  selectplayerLinkedBonusCampaigns,
  selectHistoryPagination,
  selectBonusPagination
} from "./reducer";
import { selectCountries } from "../app/reducer";
import { getParameterByName, onChangePaginationClick } from "../../util/util";

import ScrollableTabs from "~components/tabs";
import PersonalSettings from "~components/custom/personalSettings";
import GamerTags from "~components/custom/gamerTags";
import ChangePassword from "~components/custom/changePassword";
import TransactionHistory from "~components/custom/transactionHistory";
import BonusTransactionHistory from "~components/custom/bonusTransactionHistory";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import {
  selectBonusMoney,
  selectAvailableAmount
} from "~containers/wallet/reducer";
import BankDetails from "~components/custom/bankDetails";
import { getWalletAmount } from "~containers/wallet/actions";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";
import BonusPromotions from "~components/custom/bonusPromotions";
import { selectBoyProfile } from "~containers/players/reducer";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";

class MyAccount extends React.PureComponent {
  componentDidMount() {
    const {
      onLoadTransactionHistory,
      onLoadBonusTransactionHistory,
      onLoadWallet,
      onGetPlayerLinkedBonusCampaigns,
      onLoadProfile,
      profile
    } = this.props;
    onLoadWallet();
    onLoadProfile();
    onLoadTransactionHistory({
      page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
      pageSize:
        getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
        PAGE_SIZE_VALUE
    });
    onLoadBonusTransactionHistory({
      page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
      pageSize:
        getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
        PAGE_SIZE_VALUE
    });
    onGetPlayerLinkedBonusCampaigns({ playerId: profile.get("id") });
  }

  render() {
    const {
      history,
      profile,
      boyProfile,
      page,
      match,
      transactionHistory,
      bonusTransactionHistory,
      availableAmount,
      bonusMoney,
      selectedLanguage,
      countries,
      historyPagination,
      bonusPagination,
      onSubmitMyAccount,
      onSubmitMyBankDetails,
      onLoadTransactionHistory,
      onLoadBonusTransactionHistory,
      playerLinkedBonusCampaigns,
      isLoading,
      t
    } = this.props;
    const elementArray = [
      {
        id: 0,
        title: t("ProfileTabTitle"),
        url: `/${selectedLanguage}/my-account/personal-settings`,
        element: (
          <PersonalSettings
            countries={countries}
            history={history}
            profile={profile}
            match={match}
            selectedLanguage={selectedLanguage}
            onSubmitMyAccount={onSubmitMyAccount}
          />
        )
      },
      {
        id: 1,
        title: t("TagsTabTitle"),
        url: `/${selectedLanguage}/my-account/gamer-tags`,
        element: (
          <GamerTags
            history={history}
            profile={profile}
            boyProfile={boyProfile}
            match={match}
            selectedLanguage={selectedLanguage}
          />
        )
      },
      {
        id: 2,
        title: t("HistoryTabTitle"),
        url: `/${selectedLanguage}/my-account/transaction-history`,
        element: (
          <TransactionHistory
            data={transactionHistory}
            availableAmount={availableAmount}
            pagination={historyPagination}
            currency={profile.get("currency")}
            selectedLanguage={selectedLanguage}
            isLoading={isLoading}
            onChangePageClick={e =>
              onChangePaginationClick(e, PAGE_SIZE_VALUE, data =>
                onLoadTransactionHistory({
                  ...data
                })
              )
            }
          />
        )
      },
      {
        id: 3,
        title: t("PasswordTabTitle"),
        url: `/${selectedLanguage}/my-account/change-password`,
        element: (
          <ChangePassword
            history={history}
            profile={profile}
            match={match}
            selectedLanguage={selectedLanguage}
          />
        )
      },
      {
        id: 4,
        title: t("BankTabTitle"),
        url: `/${selectedLanguage}/my-account/bank-details`,
        element: (
          <BankDetails
            history={history}
            profile={profile}
            countries={countries}
            match={match}
            selectedLanguage={selectedLanguage}
            onSubmitMyBankDetails={onSubmitMyBankDetails}
          />
        )
      },
      {
        id: 5,
        title: t("BonusTransactionHistoryTabTitle"),
        url: `/${selectedLanguage}/my-account/bonus-transaction-history`,
        element: (
          <BonusTransactionHistory
            data={bonusTransactionHistory}
            currency={profile.get("currency")}
            pagination={bonusPagination}
            selectedLanguage={selectedLanguage}
            bonusMoney={bonusMoney}
            isLoading={isLoading}
            onChangePageClick={e =>
              onChangePaginationClick(e, PAGE_SIZE_VALUE, data =>
                onLoadBonusTransactionHistory({
                  ...data
                })
              )
            }
          />
        )
      },
      {
        id: 6,
        title: t("BonusCashPromotionsTabTitle"),
        url: `/${selectedLanguage}/my-account/bonus-promotions`,
        element: (
          <BonusPromotions
            playerLinkedBonusCampaigns={
              playerLinkedBonusCampaigns && playerLinkedBonusCampaigns.toJS()
            }
          />
        )
      }
    ];

    return (
      <div className="content">
        <section className="card">
          <div className="card-title">
            <h1>{page.get("title")}</h1>
          </div>
          <ScrollableTabs tabs={elementArray} match={match} />
        </section>
      </div>
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchProfile({
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
    profile: selectProfile(state),
    boyProfile: selectBoyProfile(state),
    availableAmount: selectAvailableAmount(state),
    bonusMoney: selectBonusMoney(state),
    transactionHistory: selectTransactionHistory(state),
    bonusTransactionHistory: selectBonusTransactionHistory(state),
    selectedLanguage: selectSelectedLanguage(state),
    historyPagination: selectHistoryPagination(state),
    bonusPagination: selectBonusPagination(state),
    countries: selectCountries(state),
    isLoading: selectIsLoading(state),
    playerLinkedBonusCampaigns: selectplayerLinkedBonusCampaigns(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onLoadTransactionHistory: data => dispatch(getTransactionHistory(data)),
  onLoadWallet: data => dispatch(getWalletAmount(data)),
  onLoadProfile: () => dispatch(getProfile()),
  onSubmitMyAccount: data => dispatch(submitMyAccount(data)),
  onSubmitMyBankDetails: data => dispatch(submitMyBankDetails(data)),
  onLoadBonusTransactionHistory: data =>
    dispatch(getBonusTransactionHistory(data)),
  onGetPlayerLinkedBonusCampaigns: data =>
    dispatch(getPlayerLinkedBonusCampaigns(data))
});

export default withPage(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hoistStatics(withTranslation()(MyAccount), MyAccount)),
  getPage,
  REDUCER_NAME
);
