import React from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";

import { withAuth, withPage } from "~hocs";
import {
  fetchPlayers,
  setSelectedPlayer,
  SearchPlayers,
  submitPlayerUnBlock,
  submitPlayerMute,
  submitPlayerUnMute
} from "./actions";
import { REDUCER_NAME, PAGE_SIZE_VALUE, DEBOUNCE_TIME } from "./constants";
import {
  selectPlayers,
  selectIsLoading,
  selectPagination,
  selectSelectedPlayer
} from "./reducer";
import PlayersTable from "~components/custom/players/playersTable";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth } from "../app/reducer";
import { getParameterByName, onChangePaginationClick } from "../../util/util";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME,
  SEARCH_TERM_PARAM_NAME
} from "~service/constants";

class Players extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.debouncedSearchChange = debounce(this.onSearchChange, DEBOUNCE_TIME);
    this.state = {
      search: null
    };
  }
  onSearchChange(textToSearch) {
    const { onSearchPlayers, history } = this.props;

    onSearchPlayers({
      searchTerm: textToSearch,
      page: 1,
      pageSize: PAGE_SIZE_VALUE
    }).then(() => {
      let url = `?${PAGE_QUERY_PARAM_NAME}=1&${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE_VALUE}`;
      history.push(url);
    });

    this.setState({
      search: textToSearch
    });
  }
  componentDidMount() {
    const { onSearchPlayers } = this.props;
    this.setState({
      search:
        getParameterByName(SEARCH_TERM_PARAM_NAME, location.search) || null
    });
    onSearchPlayers({
      page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
      pageSize:
        getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
        PAGE_SIZE_VALUE,
      searchTerm:
        getParameterByName(SEARCH_TERM_PARAM_NAME, location.search) || null
    });
  }

  render() {
    const {
      players,
      selectedLanguage,
      isLoading,
      pagination,
      onSetSelectedPlayer,
      history,
      onSearchPlayers,
      onUnblockPlayer,
      selectedPlayer,
      onMutePlayer,
      onUnMutePlayer
    } = this.props;

    return (
      <PlayersTable
        onSearchChange={this.debouncedSearchChange}
        isLoading={isLoading}
        players={players.toJS()}
        selectedLanguage={selectedLanguage}
        pagination={pagination}
        onSetSelectedPlayer={onSetSelectedPlayer}
        history={history}
        unblockPlayer={onUnblockPlayer}
        mutePlayer={onMutePlayer}
        unMutePlayer={onUnMutePlayer}
        selectedPlayer={selectedPlayer}
        onChangePageClick={e =>
          onChangePaginationClick(e, PAGE_SIZE_VALUE, data => {
            onSearchPlayers({
              ...data,
              searchTerm: this.state.search
            });
          })
        }
      />
    );
  }

  static fetchData(store, { url, language, query }) {
    const page = query[PAGE_QUERY_PARAM_NAME] || 1;
    const pageSize = query[PAGE_SIZE_QUERY_PARAM_NAME] || PAGE_SIZE_VALUE;

    return store.dispatch(
      fetchPlayers({
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
  players: selectPlayers(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  pagination: selectPagination(state),
  selectedPlayer: selectSelectedPlayer(state)
});

const mapDispatchToProps = dispatch => ({
  onSearchPlayers: data => dispatch(SearchPlayers(data)),
  onSetSelectedPlayer: data => dispatch(setSelectedPlayer(data)),
  onUnblockPlayer: data => dispatch(submitPlayerUnBlock(data)),
  onMutePlayer: data => dispatch(submitPlayerMute(data)),
  onUnMutePlayer: data => dispatch(submitPlayerUnMute(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(Players),
    getPage,
    REDUCER_NAME
  )
);
