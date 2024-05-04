import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import { withAuth, withPage } from "~hocs";
import { REDUCER_NAME, AFFILIATE_REPORTING_TABLE_FIELDS } from "./constants";
import {
  selectIsLoading,
  selectMedia,
  selectPagination,
  selectSelectedAffiliatePlayers,
  selectCommission
} from "./reducer";
import {
  fetchAffiliateReporting,
  getAffiliatePlayers,
  loadMedia,
  setSelectedAffiliate,
  getAffiliateCommission,
  resetAffiliateCommission,
  resetAffiliatePlayers
} from "./actions";
import AffiliateReportingTable from "~components/custom/affiliates/AffiliateReportingTable";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth, selectIsMobile } from "../app/reducer";

class AffiliateReporting extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onMediumChange = this.onMediumChange.bind(this);
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);

    this.state = {
      medium: null,
      dateFrom: null,
      dateTo: null
    };
  }

  filterReport(type, value) {
    const {
      onLoadAffiliatePlayers,
      onGetAffiliateCommission,
      match
    } = this.props;

    this.setState({ [type]: value }, () => {
      const { dateFrom, dateTo, medium } = this.state;

      onLoadAffiliatePlayers({
        affiliateId: match.params.affiliateId,
        medium,
        dateFrom,
        dateTo
      });
      onGetAffiliateCommission({
        id: match.params.affiliateId,
        medium,
        dateFrom,
        dateTo
      });
    });
  }

  onMediumChange(mediumName) {
    this.filterReport("medium", mediumName === "0" ? undefined : mediumName);
  }

  onDateFromChange({ value }) {
    this.filterReport("dateFrom", value);
  }

  onDateToChange({ value }) {
    this.filterReport("dateTo", value);
  }

  componentDidMount() {
    const {
      players,
      onLoadAffiliatePlayers,
      onLoadMediums,
      match,
      onGetAffiliateCommission
    } = this.props;
    const { dateFrom, dateTo, medium } = this.state;

    if (!(players && players.size)) {
      onLoadAffiliatePlayers({
        affiliateId: match.params.affiliateId,
        medium,
        dateFrom,
        dateTo
      });
      onLoadMediums(match.params.affiliateId);
    }

    onGetAffiliateCommission({ id: match.params.affiliateId });
  }

  componentWillUnmount() {
    const { onResetAffiliateCommission, onResetAffiliatePlayers } = this.props;
    onResetAffiliateCommission();
    onResetAffiliatePlayers();
  }

  render() {
    const {
      players,
      isLoading,
      isMobile,
      media,
      commission,
      t,
      history,
      selectedLanguage,
      page
    } = this.props;

    const mediaList = [
      { id: 0, title: t("AffiliateReportMediumAllFilter") },
      ...(media.size > 0 ? media.toJS() : [])
    ];
    const returnUrl = `/${selectedLanguage}/affiliates`;

    return (
      <AffiliateReportingTable
        isLoading={isLoading}
        players={players}
        formFields={AFFILIATE_REPORTING_TABLE_FIELDS({
          mediumsList: mediaList,
          onMediumChange: this.onMediumChange,
          onDateToChange: this.onDateToChange,
          onDateFromChange: this.onDateFromChange
        })}
        isMobile={isMobile}
        commission={commission}
        history={history}
        returnUrl={returnUrl}
        page={page}
      />
    );
  }

  static fetchData(store, { url, language, params }) {
    return store.dispatch(
      fetchAffiliateReporting({
        pageData: {
          url,
          language
        },
        requestData: {
          affiliateId: parseInt(params.affiliateId)
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  players: selectSelectedAffiliatePlayers(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  pagination: selectPagination(state),
  isMobile: selectIsMobile(state),
  media: selectMedia(state),
  commission: selectCommission(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadAffiliatePlayers: data => dispatch(getAffiliatePlayers(data)),
  onLoadMediums: data => dispatch(loadMedia(data)),
  onSetSelectedAffiliate: data => dispatch(setSelectedAffiliate(data)),
  onGetAffiliateCommission: data => dispatch(getAffiliateCommission(data)),
  onResetAffiliateCommission: () => dispatch(resetAffiliateCommission()),
  onResetAffiliatePlayers: () => dispatch(resetAffiliatePlayers())
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(AffiliateReporting), AffiliateReporting)),
    getPage,
    REDUCER_NAME
  )
);
