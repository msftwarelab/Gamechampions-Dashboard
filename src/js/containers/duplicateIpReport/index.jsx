import React from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import moment from "moment";

import { withAuth, withPage } from "~hocs";
import {
  fetchDuplicatePlayerIps,
  getDuplicatePlayerIps,
  setFilterFrom,
  setFilterTo
} from "./actions";
import {
  REDUCER_NAME,
  PAGE_SIZE_VALUE,
  getFilterByDateFormFields,
  MINIMUM_LENGTH_TO_SEARCH,
  DEBOUNCE_TIME
} from "./constants";
import {
  selectDuplicateIpPlayers,
  selectIsLoading,
  selectPagination,
  selectFilterFrom,
  selectFilterTo
} from "./reducer";
import DuplicateIpsTable from "~components/custom/duplicateips/duplicateIpsTable";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth, selectIsMobile } from "../app/reducer";
import { getParameterByName, onChangePaginationClick } from "../../util/util";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";
import { FlexBox } from "~components/atoms";

class DuplicateIpsReport extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: null
    };

    this.onRangeChange = this.onRangeChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.debouncedSearchChange = debounce(this.onSearchChange, DEBOUNCE_TIME);
  }

  componentDidMount() {
    const {
      duplicateIpPlayers,
      loadDuplicateIps,
      onSetFilterFrom,
      onSetFilterTo,
      filterFrom,
      filterTo
    } = this.props;

    const end = moment();
    const start = moment().subtract(30, "days");

    const endFormatted = end.format("YYYY-MM-DD");
    const startFormatted = start.format("YYYY-MM-DD");

    if (!filterFrom) {
      onSetFilterFrom(startFormatted);
    }
    if (!filterTo) {
      onSetFilterTo(endFormatted);
    }

    if (!(duplicateIpPlayers && duplicateIpPlayers.size)) {
      loadDuplicateIps({
        dateFrom: filterFrom ? filterFrom : startFormatted,
        dateTo: filterTo ? filterTo : endFormatted,
        page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
        pageSize:
          getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
          PAGE_SIZE_VALUE
      });
    }
  }

  onRangeChange({ name, value }) {
    const {
      onSetFilterFrom,
      onSetFilterTo,
      filterFrom,
      filterTo,
      loadDuplicateIps,
      history
    } = this.props;
    let formattedValue = null;

    if (value) {
      formattedValue = value.format("YYYY-MM-DD");
    }

    if (formattedValue) {
      if (name == "from") {
        onSetFilterFrom(formattedValue);

        if (filterTo) {
          loadDuplicateIps({
            dateFrom: formattedValue,
            dateTo: filterTo,
            page: 1,
            pageSize: PAGE_SIZE_VALUE,
            email: this.state.search
          }).then(() => {
            let url = `?${PAGE_QUERY_PARAM_NAME}=1&${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE_VALUE}`;
            history.push(url);
          });
        }
      }

      if (name == "to") {
        onSetFilterTo(formattedValue);

        if (filterFrom) {
          loadDuplicateIps({
            dateFrom: filterFrom,
            dateTo: formattedValue,
            page: 1,
            pageSize: PAGE_SIZE_VALUE,
            email: this.state.search
          }).then(() => {
            let url = `?${PAGE_QUERY_PARAM_NAME}=1&${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE_VALUE}`;
            history.push(url);
          });
        }
      }
    }
  }

  onSearchChange(textToSearch) {
    const { loadDuplicateIps, filterFrom, filterTo, history } = this.props;

    if (
      textToSearch.length >= MINIMUM_LENGTH_TO_SEARCH ||
      textToSearch === ""
    ) {
      loadDuplicateIps({
        dateFrom: filterFrom,
        dateTo: filterTo,
        page: 1,
        pageSize: PAGE_SIZE_VALUE,
        email: textToSearch
      }).then(() => {
        let url = `?${PAGE_QUERY_PARAM_NAME}=1&${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE_VALUE}`;
        history.push(url);
      });
    }

    this.setState({
      search: textToSearch
    });
  }

  render() {
    const {
      duplicateIpPlayers,
      isLoading,
      isMobile,
      loadDuplicateIps,
      filterFrom,
      filterTo,
      pagination,
      selectedLanguage
    } = this.props;

    return (
      <FlexBox flexDirection="column">
        <DuplicateIpsTable
          isLoading={isLoading}
          duplicateIpPlayers={duplicateIpPlayers}
          isMobile={isMobile}
          formFields={getFilterByDateFormFields({
            onRangeChange: this.onRangeChange,
            onSearchChange: this.debouncedSearchChange
          })}
          initialValues={{
            from: filterFrom && filterFrom,
            to: filterTo && filterTo
          }}
          onChangePageClick={e =>
            onChangePaginationClick(e, PAGE_SIZE_VALUE, data => {
              loadDuplicateIps({
                ...data,
                dateFrom: filterFrom,
                dateTo: filterTo,
                email: this.state.search
              });
            })
          }
          pagination={pagination}
          selectedLanguage={selectedLanguage}
        />
      </FlexBox>
    );
  }

  static fetchData(store, { url, language, query }) {
    const page = query[PAGE_QUERY_PARAM_NAME] || 1;
    const pageSize = query[PAGE_SIZE_QUERY_PARAM_NAME] || PAGE_SIZE_VALUE;

    const end = moment();
    const start = moment().subtract(30, "days");

    const endFormatted = end.format("YYYY-MM-DD");
    const startFormatted = start.format("YYYY-MM-DD");

    return store.dispatch(
      fetchDuplicatePlayerIps({
        pageData: {
          url,
          language
        },
        requestData: {
          page,
          pageSize,
          dateFrom: startFormatted,
          dateTo: endFormatted
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  duplicateIpPlayers: selectDuplicateIpPlayers(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  pagination: selectPagination(state),
  isMobile: selectIsMobile(state),
  filterFrom: selectFilterFrom(state),
  filterTo: selectFilterTo(state)
});

const mapDispatchToProps = dispatch => ({
  loadDuplicateIps: data => dispatch(getDuplicatePlayerIps(data)),
  onSetFilterFrom: data => dispatch(setFilterFrom(data)),
  onSetFilterTo: data => dispatch(setFilterTo(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(DuplicateIpsReport),
    getPage,
    REDUCER_NAME
  )
);
