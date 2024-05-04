import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import {
  fetchPlayerReferral,
  getReferralLink,
  resetReferralLink
} from "./actions";
import { REDUCER_NAME } from "./constants";
import { selectIsLoading, selectReferralLink } from "./reducer";
import PlayerReferralPage from "~components/custom/playerReferral";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectIsMobile } from "~containers/app/reducer";

class PlayerReferral extends React.PureComponent {
  componentDidMount() {
    const { referralLink, onGetReferralLink } = this.props;

    if (!referralLink) {
      onGetReferralLink();
    }
  }

  render() {
    const {
      referralLink,
      isLoading,
      selectedLanguage,
      isMobile,
      page
    } = this.props;

    return (
      <PlayerReferralPage
        isMobile={isMobile}
        referralLink={referralLink && referralLink.toJS()}
        isLoading={isLoading}
        selectedLanguage={selectedLanguage}
        page={page}
      />
    );
  }

  static fetchData(store, { url }) {
    return store.dispatch(
      fetchPlayerReferral({
        pageData: {
          url
        },
        requestData: {}
      })
    );
  }
}

const mapStateToProps = state => ({
  referralLink: selectReferralLink(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  isMobile: selectIsMobile(state)
});

const mapDispatchToProps = dispatch => ({
  onGetReferralLink: data => dispatch(getReferralLink(data)),
  onResetReferralLink: data => dispatch(resetReferralLink(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(PlayerReferral),
    getPage,
    REDUCER_NAME
  )
);
