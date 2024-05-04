import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import { withAuth, withPage } from "~hocs";
import {
  createAffiliateUrl,
  fetchCreateAffiliateUrl,
  loadUrls,
  resetError
} from "./actions";
import {
  CREATE_AFFILIATE_URLS_FORM_FIELDS,
  REDUCER_NAME,
  BASE_DESTINATION
} from "./constants";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectIsMobile } from "../app/reducer";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import {
  selectIsLoading,
  selectSelectedAffiliate,
  selectUrls,
  selectError
} from "./reducer";
import { FlexBox } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";
import { ErrorInfo } from "~components/custom/errorInfo";

class CreateAffiliateUrl extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false
    };
    this.crateInitialValues = this.crateInitialValues.bind(this);
  }

  componentDidMount() {
    const { onLoadUrls, match } = this.props;
    const { affiliateId } = match.params;

    onLoadUrls({ affiliateId: affiliateId });
  }

  crateInitialValues(selectedAffiliate) {
    if (selectedAffiliate) {
      let destination = BASE_DESTINATION;
      let sourceName = selectedAffiliate
        .get("fullName")
        .replace(/\s+/g, "")
        .toLowerCase();
      let source = `?IWSource=${sourceName}-${selectedAffiliate.get("id")}`;
      let medium = "";
      let shortUrl = destination;
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

  componentWillUnmount() {
    const { onResetError } = this.props;
    onResetError();
  }

  render() {
    const {
      selectedLanguage,
      history,
      page,
      selectedAffiliate,
      onCreateAffiliateUrl,
      error,
      t
    } = this.props;
    let returnUrl = `/${selectedLanguage}/affiliates/${selectedAffiliate.get(
      "id"
    )}/urls`;

    let initialvalues = this.crateInitialValues(selectedAffiliate);

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
          <FlexBox flexDirection={{ md: "row-reverse", base: "column" }}>
            {!!initialvalues && (
              <DynamicForm
                formFields={CREATE_AFFILIATE_URLS_FORM_FIELDS}
                className="games-search__form"
                returnUrl={returnUrl}
                initialValues={initialvalues}
                onSubmit={e => {
                  this.setState({ submitting: true });
                  let data = { ...e };
                  data.affiliateId = selectedAffiliate.get("id");
                  return onCreateAffiliateUrl(data)
                    .then(() => {
                      history.push(returnUrl);
                    })
                    .catch();
                }}
                extraContents={error && <ErrorInfo>{t(error)}</ErrorInfo>}
              />
            )}
          </FlexBox>
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language, params }) {
    return store.dispatch(
      fetchCreateAffiliateUrl({
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
  error: selectError(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadUrls: data => dispatch(loadUrls(data)),
  onCreateAffiliateUrl: data => dispatch(createAffiliateUrl(data)),
  onResetError: () => dispatch(resetError())
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(CreateAffiliateUrl), CreateAffiliateUrl)),
    getPage,
    REDUCER_NAME
  )
);
