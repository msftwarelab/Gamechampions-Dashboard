import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import {
  blockAffiliate,
  fetchAffiliates,
  getAffiliates,
  setSelectedAffiliate
} from "./actions";
import { REDUCER_NAME, PAGE_SIZE_VALUE } from "./constants";
import {
  selectAffiliates,
  selectIsLoading,
  selectPagination,
  selectSelectedAffiliate
} from "./reducer";
import AffiliatesTable from "~components/custom/affiliates/affilaitesTable";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth, selectIsMobile } from "../app/reducer";
import { getParameterByName, onChangePaginationClick } from "../../util/util";
import {
  ADMIN_NAVIGATION_TABS,
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";
import TabMenu from "~components/molecules/tabMenu";
import { FlexBox } from "~components/atoms";

class Affiliates extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: null
    };
  }

  componentDidMount() {
    const { affiliates, onLoadAffiliates } = this.props;

    if (!(affiliates && affiliates.size)) {
      onLoadAffiliates({
        page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
        pageSize:
          getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
          PAGE_SIZE_VALUE
      });
    }
  }

  render() {
    const {
      affiliates,
      selectedLanguage,
      isLoading,
      pagination,
      isMobile,
      onLoadAffiliates,
      onSetSelectedAffiliate,
      selectedAffiliate,
      onblockAffiliate,
      history,
      match
    } = this.props;

    return (
      <FlexBox flexDirection="column">
        <TabMenu
          tabs={ADMIN_NAVIGATION_TABS}
          selectedLanguage={selectedLanguage}
          match={match}
        />
        <AffiliatesTable
          isLoading={isLoading}
          affiliates={affiliates}
          selectedLanguage={selectedLanguage}
          onSetSelectedAffiliate={onSetSelectedAffiliate}
          isMobile={isMobile}
          blockAffiliate={onblockAffiliate}
          selectedAffiliate={selectedAffiliate}
          pagination={pagination}
          history={history}
          onChangePageClick={e =>
            onChangePaginationClick(e, PAGE_SIZE_VALUE, data => {
              onLoadAffiliates({
                ...data
              });
            })
          }
        />
      </FlexBox>
    );
  }

  static fetchData(store, { url, language, query }) {
    const page = query[PAGE_QUERY_PARAM_NAME] || 1;
    const pageSize = query[PAGE_SIZE_QUERY_PARAM_NAME] || PAGE_SIZE_VALUE;

    return store.dispatch(
      fetchAffiliates({
        pageData: {
          url,
          language
        },
        requestData: {
          page,
          pageSize
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  affiliates: selectAffiliates(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  pagination: selectPagination(state),
  isMobile: selectIsMobile(state),
  selectedAffiliate: selectSelectedAffiliate(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadAffiliates: data => dispatch(getAffiliates(data)),
  onSetSelectedAffiliate: data => dispatch(setSelectedAffiliate(data)),
  onblockAffiliate: data => dispatch(blockAffiliate(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(Affiliates),
    getPage,
    REDUCER_NAME
  )
);
