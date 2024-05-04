import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import debounce from "lodash/debounce";
import { withAuth, withPage } from "~hocs";
import {
  fetchMatches,
  getMatches,
  updateAdminDeleteChallenge
} from "./actions";
import {
  REDUCER_NAME,
  PAGE_SIZE_VALUE,
  DEBOUNCE_TIME,
  getMatchesFormFields
} from "./constants";
import { selectIsLoading, selectPagination, selectMatches } from "./reducer";
import AdminMatchesTable from "~components/custom/matches/adminMatches";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth, selectIsMobile } from "../app/reducer";
import { getParameterByName, onChangePaginationClick } from "../../util/util";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME
} from "~service/constants";
import { FlexBox, Button } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";
import { MATCH_STATUS } from "~containers/matchLobby/constants";
import { selectSelectedMatch } from "~containers/players/reducer";
import { setSelectedMatch } from "~containers/players/actions";
import hoistStatics from "hoist-non-react-statics";

class AdminMatches extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onSearchChange = this.onSearchChange.bind(this);
    this.debouncedSearchChange = debounce(this.onSearchChange, DEBOUNCE_TIME);

    this.state = {
      type: 0,
      filterByMatchMade: false,
      search: null
    };
  }

  onSearchChange(textToSearch) {
    this.setState(
      {
        search: textToSearch
      },
      () => {
        this.loadMatches();
      }
    );
  }

  componentDidMount() {
    const { games, onLoadMatches } = this.props;

    if (!(games && games.size)) {
      onLoadMatches({
        page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
        pageSize:
          getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
          PAGE_SIZE_VALUE
      });
    }
  }

  loadMatches() {
    const { history, onLoadMatches } = this.props;
    const { filterByMatchMade, type, search } = this.state;

    onLoadMatches({
      page: 1,
      pageSize:
        getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
        PAGE_SIZE_VALUE,
      type: type || 0,
      filterByMatchMade: filterByMatchMade || false,
      searchId: search || null
    }).then(() =>
      history.push(
        `?${PAGE_QUERY_PARAM_NAME}=1&${PAGE_SIZE_QUERY_PARAM_NAME}=${PAGE_SIZE_VALUE}`
      )
    );
  }

  render() {
    const {
      onUpdateAdminCancelChallenge,
      onSetSelectedMatch,
      selectedMatch,
      matches,
      theme,
      currency,
      selectedLanguage,
      isLoading,
      pagination,
      onLoadMatches,
      isMobile,
      history,
      t
    } = this.props;

    return (
      <FlexBox flexDirection="column" padding="1em">
        <FlexBox
          flexDirection={{ md: "row-reverse", base: "column" }}
          alignItems="center"
          padding="1em 0"
        >
          <FlexBox flexDirection={{ base: "column" }} justifyContent="center">
            <Button
              to={`/${selectedLanguage}/admin-matches/matchmaking`}
              width={{ base: "15.5em", md: "auto" }}
              padding="0.5em 2.5em"
            >
              {t("CreateGame")}
            </Button>
          </FlexBox>
          <DynamicForm
            formFields={getMatchesFormFields({
              matchStatusList: { ALL: 0, ...MATCH_STATUS },
              onSelectChange: value => {
                this.setState({ type: parseInt(value) }, () => {
                  this.loadMatches();
                });
              },
              onFilterChange: () => {
                const { filterByMatchMade } = this.state;
                this.setState({ filterByMatchMade: !filterByMatchMade }, () => {
                  this.loadMatches();
                });
              },
              onSearchChange: this.debouncedSearchChange
            })}
            displayButtons={false}
            className="search__match__form"
          />
        </FlexBox>
        <AdminMatchesTable
          matches={matches}
          theme={theme}
          currency={currency}
          isMobile={isMobile}
          history={history}
          isLoading={isLoading}
          selectedLanguage={selectedLanguage}
          pagination={pagination}
          onUpdateAdminCancelChallenge={onUpdateAdminCancelChallenge}
          onSetSelectedMatch={onSetSelectedMatch}
          selectedMatch={selectedMatch}
          type={this.state.type}
          onChangePageClick={e =>
            onChangePaginationClick(e, PAGE_SIZE_VALUE, data =>
              onLoadMatches({
                ...data,
                type: this.state.type || 0,
                filterByMatchMade: this.state.filterByMatchMade || false,
                searchId: this.state.search || null
              })
            )
          }
        />
      </FlexBox>
    );
  }

  static fetchData(store, { url, language, query }) {
    const page = query[PAGE_QUERY_PARAM_NAME] || 1;
    const pageSize = query[PAGE_SIZE_QUERY_PARAM_NAME] || PAGE_SIZE_VALUE;

    return store.dispatch(
      fetchMatches({
        pageData: {
          url,
          language
        },
        matchesData: {
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
  matches: selectMatches(state),
  selectedMatch: selectSelectedMatch(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadMatches: data => dispatch(getMatches(data)),
  onUpdateAdminCancelChallenge: data =>
    dispatch(updateAdminDeleteChallenge(data)),
  onSetSelectedMatch: data => dispatch(setSelectedMatch(data))
});

export default withAuth(
  withPage(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(hoistStatics(withTranslation()(AdminMatches), AdminMatches)),
    getPage,
    REDUCER_NAME
  )
);
