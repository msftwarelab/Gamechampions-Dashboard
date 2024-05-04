import React from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";

import { withAuth, withPage } from "~hocs";
import { fetchGames, getGames, searchGames, submitGameDelete } from "./actions";
import { REDUCER_NAME, PAGE_SIZE_VALUE, DEBOUNCE_TIME } from "./constants";
import { selectGames, selectIsLoading, selectPagination } from "./reducer";
import GamesTable from "~components/custom/games/gamesTable";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth, selectIsMobile } from "../app/reducer";
import { getParameterByName, onChangePaginationClick } from "../../util/util";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";

class Games extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onSearchChange = this.onSearchChange.bind(this);
    this.debouncedSearchChange = debounce(this.onSearchChange, DEBOUNCE_TIME);
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
    const { games, onLoadGames } = this.props;

    if (!(games && games.size)) {
      onLoadGames({
        page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
        pageSize:
          getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
          PAGE_SIZE_VALUE
      });
    }
  }

  render() {
    const {
      games,
      selectedLanguage,
      isLoading,
      pagination,
      onLoadGames,
      isMobile,
      onSubmitGameDelete
    } = this.props;

    return (
      <GamesTable
        onSearchChange={this.debouncedSearchChange}
        isLoading={isLoading}
        games={games}
        selectedLanguage={selectedLanguage}
        onSubmitGameDelete={onSubmitGameDelete}
        isMobile={isMobile}
        pagination={pagination}
        onChangePageClick={e =>
          onChangePaginationClick(e, PAGE_SIZE_VALUE, data => {
            onLoadGames({
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
      fetchGames({
        pageData: {
          url,
          language
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  games: selectGames(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  pagination: selectPagination(state),
  isMobile: selectIsMobile(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadGames: data => dispatch(getGames(data)),
  onSearchGames: data => dispatch(searchGames(data)),
  onSubmitGameDelete: data => dispatch(submitGameDelete(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(Games),
    getPage,
    REDUCER_NAME
  )
);
