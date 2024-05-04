import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import {
  setSelectedAffiliateUrl,
  fetchAffiliateUrls,
  getAffiliateById,
  loadUrls,
  blockAffiliateLink,
  setSelectedUrl
} from "./actions";
import { REDUCER_NAME } from "./constants";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectIsMobile } from "../app/reducer";
import AffiliateUrlsTable from "~components/custom/affiliates/affiliateUrlsTable";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import {
  selectIsLoading,
  selectSelectedAffiliate,
  selectSelectedUrl,
  selectUrls
} from "./reducer";

class AffiliateUrls extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { selectedAffiliate, onLoadUrls, onGetAffiliate, match } = this.props;
    let { affiliateId } = match.params;

    if (!selectedAffiliate) {
      onGetAffiliate(affiliateId);
    }
    onLoadUrls({ affiliateId });
  }

  render() {
    const {
      selectedLanguage,
      history,
      page,
      urls,
      isLoading,
      selectedAffiliate,
      onSetSelectedAffiliateUrl,
      onSetSelectedUrl,
      selectedUrl,
      onblockAffiliateUrl
    } = this.props;
    let returnUrl = `/${selectedLanguage}/affiliates`;

    return (
      <Modal onClick={() => history.push(returnUrl)}>
        <Card
          html={page.get("html")}
          htmlProps={{
            margin: "1rem 0"
          }}
          padding="1rem 0.5rem"
          title={page.get("title")}
          closeUrl={returnUrl}
          className="player-matches-table-card"
        >
          <AffiliateUrlsTable
            isLoading={isLoading}
            urls={urls}
            selectedLanguage={selectedLanguage}
            blockAffiliateUrl={onblockAffiliateUrl}
            selectedAffiliate={selectedAffiliate}
            onSetSelectedAffiliateUrl={onSetSelectedAffiliateUrl}
            onSetSelectedUrl={onSetSelectedUrl}
            selectedUrl={selectedUrl}
          />
        </Card>
      </Modal>
    );
  }
  static fetchData(store, { url, language, params }) {
    return store.dispatch(
      fetchAffiliateUrls({
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
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  isMobile: selectIsMobile(state),
  urls: selectUrls(state),
  selectedAffiliate: selectSelectedAffiliate(state),
  selectedUrl: selectSelectedUrl(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadUrls: data => dispatch(loadUrls(data)),
  onGetAffiliate: data => dispatch(getAffiliateById(data)),
  onSetSelectedAffiliateUrl: data => dispatch(setSelectedAffiliateUrl(data)),
  onblockAffiliateUrl: data => dispatch(blockAffiliateLink(data)),
  onSetSelectedUrl: data => dispatch(setSelectedUrl(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(AffiliateUrls),
    getPage,
    REDUCER_NAME
  )
);
