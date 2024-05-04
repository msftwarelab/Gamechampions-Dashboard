import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import { CREATE_AFFILIATE_URLS_FORM_FIELDS, REDUCER_NAME } from "./constants";
import {
  selectSelectedAffiliate,
  selectSelectedAffiliateUrl,
  selectUrls
} from "./reducer";
import {
  fetchUpdateAffiliateUrl,
  reSetSelectedAffiliateUrl,
  setSelectedAffiliate,
  updateAffiliateUrl
} from "./actions";
import UpdateAffiliateUrlForm from "~components/custom/affiliates/updateAffiliateUrlForm";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";

class UpdateAffiliateUrl extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false
    };
    this.crateInitialValues = this.crateInitialValues.bind();
  }

  componentDidMount() {
    const { match, urls, onSetUrl } = this.props;
    const { params = {} } = match;
    const { urlId } = params;

    if (urls && urls.size && urlId) {
      onSetUrl(urls.toJS().find(item => item.id == parseInt(urlId)));
    }
  }

  componentWillUnmount() {
    this.props.onReSetSelectedAffiliateUrl();
  }

  crateInitialValues(selectedUrl) {
    if (selectedUrl) {
      let destination = selectedUrl.destination;
      let sourceName = selectedUrl.affiliateName
        .replace(/\s+/g, "")
        .toLowerCase();
      let source = `?IWSource=${sourceName}-${selectedUrl.affiliateId}`;
      let medium = selectedUrl.medium;
      let shortUrl = selectedUrl.urlShort;
      const initialValues = {
        destinationUrl: destination,
        medium: medium,
        source: source,
        shortenedUrl: shortUrl
      };
      return initialValues;
    }

    return {};
  }

  render() {
    const {
      selectedUrl,
      selectedLanguage,
      history,
      onUpdateAffiliateUrl,
      selectedAffiliate,
      match,
      page
    } = this.props;

    let initialValues = {};

    if (selectedUrl && selectedUrl.size) {
      initialValues = this.crateInitialValues(selectedUrl.toJS());
    }

    let returnUrl = `/${selectedLanguage}/affiliates/${selectedAffiliate.get(
      "id"
    )}/urls`;
    return (
      <Modal onClick={() => history.push(returnUrl)}>
        <Card
          closeUrl={returnUrl}
          className="player-details-form"
          padding="1rem 0.5rem"
          title={page.get("title")}
        >
          <UpdateAffiliateUrlForm
            initialValues={initialValues}
            formFields={CREATE_AFFILIATE_URLS_FORM_FIELDS}
            returnUrl={returnUrl}
            onUpdateAffiliateUrl={onUpdateAffiliateUrl}
            history={history}
            urlId={selectedUrl && selectedUrl.get("id")}
            affiliateId={selectedAffiliate && selectedAffiliate.get("id")}
            match={match}
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language, params }) {
    const { affiliateId, urlId } = params;
    return store.dispatch(
      fetchUpdateAffiliateUrl({
        pageData: {
          url,
          language
        },
        requestData: {
          id: affiliateId,
          urlId: urlId
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: selectSelectedLanguage(state),
  selectedAffiliate: selectSelectedAffiliate(state),
  selectedUrl: selectSelectedAffiliateUrl(state),
  urls: selectUrls(state)
});

const mapDispatchToProps = dispatch => ({
  onReSetSelectedAffiliateUrl: () => dispatch(reSetSelectedAffiliateUrl()),
  onSetAffiliate: data => dispatch(setSelectedAffiliate(data)),
  onUpdateAffiliateUrl: data => dispatch(updateAffiliateUrl(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(UpdateAffiliateUrl),
    getPage,
    REDUCER_NAME
  )
);
