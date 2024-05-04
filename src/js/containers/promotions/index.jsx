import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import {
  deletePromotion,
  fetchPromotions,
  loadPromotions,
  setSelectedPromotion
} from "./actions";
import { REDUCER_NAME, PAGE_SIZE_VALUE } from "./constants";
import {
  selectIsLoading,
  selectPagination,
  selectPromotions,
  selectSelectedPromotion
} from "./reducer";
import PromotionsTable from "~components/custom/promotions/promotionsTable";
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

class Promotions extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: null
    };
  }

  componentDidMount() {
    const { onLoadPromotions } = this.props;

    onLoadPromotions({
      page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
      pageSize:
        getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
        PAGE_SIZE_VALUE
    });
  }

  render() {
    const {
      selectedLanguage,
      isLoading,
      pagination,
      isMobile,
      onLoadPromotions,
      selectedPromotion,
      onPromotionDelete,
      promtions,
      onSetSelectedPromotion,
      match
    } = this.props;

    return (
      <FlexBox flexDirection="column">
        <TabMenu
          tabs={ADMIN_NAVIGATION_TABS}
          selectedLanguage={selectedLanguage}
          match={match}
        />
        <PromotionsTable
          isLoading={isLoading}
          promtions={promtions}
          selectedLanguage={selectedLanguage}
          isMobile={isMobile}
          pagination={pagination}
          selectedPromotion={selectedPromotion}
          onPromotionDelete={onPromotionDelete}
          onSetSelectedPromotion={onSetSelectedPromotion}
          onChangePageClick={e =>
            onChangePaginationClick(e, PAGE_SIZE_VALUE, data => {
              onLoadPromotions(data);
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
      fetchPromotions({
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
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  pagination: selectPagination(state),
  isMobile: selectIsMobile(state),
  promtions: selectPromotions(state),
  selectedPromotion: selectSelectedPromotion(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadPromotions: data => dispatch(loadPromotions(data)),
  onSetSelectedPromotion: data => dispatch(setSelectedPromotion(data)),
  onPromotionDelete: data => dispatch(deletePromotion(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(Promotions),
    getPage,
    REDUCER_NAME
  )
);
