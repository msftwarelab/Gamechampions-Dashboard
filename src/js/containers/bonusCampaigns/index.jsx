import React from "react";
import { connect } from "react-redux";

import { withAuth, withPage } from "~hocs";
import {
  fetchBonuses,
  getBonuses,
  setSelectedBonus,
  submitDeleteBonus
} from "./actions";
import { REDUCER_NAME, PAGE_SIZE_VALUE } from "./constants";
import { selectBonuses, selectIsLoading, selectPagination } from "./reducer";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth, selectIsMobile } from "../app/reducer";
import { getParameterByName, onChangePaginationClick } from "../../util/util";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";
import BonusTable from "~components/custom/bonusCampaigns/bonusTable";

class BonusCampaigns extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.state = {
      search: null
    };
  }
  onSearchChange(textToSearch) {
    const { onSearchGames } = this.props;

    this.setState({
      search: textToSearch
    });
    onSearchGames({
      searchTerm: textToSearch
    });
  }
  componentDidMount() {
    const { bonuses, onLoadBonuses } = this.props;

    if (!(bonuses && bonuses.size)) {
      onLoadBonuses({
        page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
        pageSize:
          getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
          PAGE_SIZE_VALUE
      });
    }
  }

  render() {
    const {
      bonuses,
      selectedLanguage,
      isLoading,
      pagination,
      onLoadBonuses,
      isMobile,
      onSubmitBonusDelete,
      onSetSelectedBonus
    } = this.props;

    return (
      <BonusTable
        isLoading={isLoading}
        bonuses={bonuses && bonuses.toJS()}
        selectedLanguage={selectedLanguage}
        onSubmitBonusDelete={onSubmitBonusDelete}
        isMobile={isMobile}
        pagination={pagination}
        onSetSelectedBonus={onSetSelectedBonus}
        onChangePageClick={e =>
          onChangePaginationClick(e, PAGE_SIZE_VALUE, data => {
            onLoadBonuses({
              ...data,
              searchTerm: this.state.search
            });
          })
        }
      />
    );
  }

  static fetchData(store, { url, language }) {
    return store.dispatch(
      fetchBonuses({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  bonuses: selectBonuses(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  pagination: selectPagination(state),
  isMobile: selectIsMobile(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadBonuses: data => dispatch(getBonuses(data)),
  onSubmitBonusDelete: data => dispatch(submitDeleteBonus(data)),
  onSetSelectedBonus: data => dispatch(setSelectedBonus(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(BonusCampaigns),
    getPage,
    REDUCER_NAME
  )
);
