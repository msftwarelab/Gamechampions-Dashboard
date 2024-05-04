import React from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";

import { withAuth, withPage } from "~hocs";
import {
  fetchPlayerMatches,
  getPlayerMatches,
  resetSelectedPlayer,
  setSelectedMatch,
  updateAdminCancelChallenge
} from "./actions";
import {
  REDUCER_NAME,
  MATCHES_PAGE_SIZE_VALUE,
  DEBOUNCE_TIME,
  getMatchesFormFields
} from "./constants";
import {
  selectCancelMatchLoading,
  selectMatches,
  selectMatchesLoading,
  selectMatchPagination,
  selectSelectedMatch
} from "./reducer";
import PlayerMatchesTable from "~components/custom/players/playerMatchesTable";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth, selectIsMobile } from "../app/reducer";
import { getParameterByName, onChangePaginationClick } from "../../util/util";
import {
  MATCH_STATUS_PARAM_NAME,
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME,
  SEARCH_TERM_PARAM_NAME
} from "~service/constants";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import { selectGames } from "~containers/games/reducer";
import { selectProfile } from "~containers/myaccount/reducer";
import { FlexBox } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";
import { MATCH_STATUS } from "~containers/matchLobby/constants";

class PlayerMatches extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.debouncedSearchChange = debounce(this.onSearchChange, DEBOUNCE_TIME);
    this.state = {
      search: null,
      type: null
    };
  }
  onSearchChange(textToSearch) {
    const { onLoadMatches, match, history } = this.props;
    this.setState({ search: textToSearch });
    onLoadMatches({
      page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
      pageSize:
        getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
        MATCHES_PAGE_SIZE_VALUE,
      id: match.params.playerId,
      type: this.state.type != 0 && this.state.type,
      searchTerm: textToSearch
    }).then(() => {
      let url = `?${PAGE_QUERY_PARAM_NAME}=1&${PAGE_SIZE_QUERY_PARAM_NAME}=${MATCHES_PAGE_SIZE_VALUE}`;
      url = textToSearch
        ? `${url}&${SEARCH_TERM_PARAM_NAME}=${textToSearch}`
        : url;
      history.push(url);
    });
  }
  componentDidMount() {
    const { onLoadMatches, match } = this.props;

    onLoadMatches({
      page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
      pageSize:
        getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
        MATCHES_PAGE_SIZE_VALUE,
      id: match.params.playerId
    });
  }

  componentWillUnmount() {
    this.props.onResetSelectedPlayer();
  }

  render() {
    const {
      matches,
      selectedLanguage,
      onUpdateAdminCancelChallenge,
      onSetSelectedMatch,
      selectedMatch,
      isLoading,
      isCancelMatchLoading,
      matchPagination,
      onLoadMatches,
      games,
      isMobile,
      profile,
      history,
      match,
      page,
      location = {}
    } = this.props;

    const { pathname = "" } = location;

    return (
      <Modal onClick={() => history.push(`/${selectedLanguage}/all-players`)}>
        <Card
          html={page.get("html")}
          htmlProps={{
            margin: "1rem 0"
          }}
          padding="1rem 0.5rem"
          title={page.get("title")}
          closeUrl={`/${selectedLanguage}/all-players`}
          className="player-matches-table-card"
        >
          <FlexBox flexDirection={{ md: "row-reverse", base: "column" }}>
            {!isCancelMatchLoading && (
              <DynamicForm
                formFields={getMatchesFormFields({
                  matchStatusList: { ALL: 0, ...MATCH_STATUS },
                  onSearchChange: this.debouncedSearchChange,
                  onSelectChange: value => {
                    this.setState({ type: value }, () => {
                      onLoadMatches({
                        page: 1,
                        pageSize:
                          getParameterByName(
                            PAGE_SIZE_QUERY_PARAM_NAME,
                            location.search
                          ) || MATCHES_PAGE_SIZE_VALUE,
                        id: match.params.playerId,
                        type: value != 0 && value,
                        searchTerm: this.state.search
                      }).then(() => {
                        let url = `?${PAGE_QUERY_PARAM_NAME}=1&${PAGE_SIZE_QUERY_PARAM_NAME}=${MATCHES_PAGE_SIZE_VALUE}`;
                        url = this.state.value
                          ? `${url}&${MATCH_STATUS_PARAM_NAME}=${this.state.type.value}`
                          : url;
                        history.push(url);
                      });
                    });
                  }
                })}
                displayButtons={false}
                className="modal-search__form"
              />
            )}
          </FlexBox>
          <PlayerMatchesTable
            isLoading={isLoading}
            matches={matches}
            selectedLanguage={selectedLanguage}
            games={games}
            match={match}
            pagination={matchPagination}
            currency={profile.get("currency")}
            history={history}
            pathname={pathname}
            isMobile={isMobile}
            onUpdateAdminCancelChallenge={onUpdateAdminCancelChallenge}
            onSetSelectedMatch={onSetSelectedMatch}
            selectedMatch={selectedMatch}
            onChangePageClick={e =>
              onChangePaginationClick(e, MATCHES_PAGE_SIZE_VALUE, data => {
                onLoadMatches({
                  ...data,
                  id: match.params.playerId,
                  searchTerm: this.state.search,
                  type: this.state.type != 0 && this.state.type
                });
              })
            }
          />
        </Card>
      </Modal>
    );
  }

  static fetchData(store, { url, language, query, params }) {
    const page = query[PAGE_QUERY_PARAM_NAME] || 1;
    const pageSize =
      query[PAGE_SIZE_QUERY_PARAM_NAME] || MATCHES_PAGE_SIZE_VALUE;
    const { playerId: id } = params;

    return store.dispatch(
      fetchPlayerMatches({
        pageData: {
          url,
          language
        },
        requestData: {
          page,
          pageSize,
          id
        }
      })
    );
  }
}

const mapStateToProps = state => ({
  matches: selectMatches(state),
  games: selectGames(state),
  profile: selectProfile(state),
  isLoading: selectMatchesLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  authentication: selectAuth(state),
  matchPagination: selectMatchPagination(state),
  isMobile: selectIsMobile(state),
  selectedMatch: selectSelectedMatch(state),
  isCancelMatchLoading: selectCancelMatchLoading(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadMatches: data => dispatch(getPlayerMatches(data)),
  onResetSelectedPlayer: data => dispatch(resetSelectedPlayer(data)),
  onUpdateAdminCancelChallenge: data =>
    dispatch(updateAdminCancelChallenge(data)),
  onSetSelectedMatch: data => dispatch(setSelectedMatch(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(PlayerMatches),
    getPage,
    REDUCER_NAME
  )
);
