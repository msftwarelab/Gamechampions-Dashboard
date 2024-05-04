import React from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";

import { withAuth, withPage } from "~hocs";
import {
  fetchPlayerTransactions,
  resetSelectedPlayer,
  completeTransaction,
  getPlayerBonusTransactions
} from "./actions";
import {
  REDUCER_NAME,
  TRANSACTIONS_PAGE_SIZE_VALUE,
  DEBOUNCE_TIME,
  getBonusTransactionsFormFields
} from "./constants";
import {
  selectSelectedPlayer,
  selectTransactions,
  selectTransactionsLoading,
  selectTransactionPagination
} from "./reducer";
import PlayerBonusTransactionsTable from "~components/custom/players/playerBonusTransactionsTable";
import { getPage } from "~containers/page/actions";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";
import { selectAuth } from "../app/reducer";
import { getParameterByName, onChangePaginationClick } from "../../util/util";
import {
  PAGE_QUERY_PARAM_NAME,
  PAGE_SIZE_QUERY_PARAM_NAME,
  SEARCH_TERM_PARAM_NAME
} from "~service/constants";
import Modal from "~components/modal/modal";
import Card from "~components/card/card";
import { FlexBox } from "~components/atoms";
import DynamicForm from "~components/molecules/dynamicForm";

class PlayerTransactions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.debouncedSearchChange = debounce(this.onSearchChange, DEBOUNCE_TIME);
    this.state = {
      type: null,
      value: null
    };
  }
  onSearchChange(textToSearch) {
    const { onLoadTransactions, selectedPlayer, history } = this.props;
    const value = parseInt(textToSearch);
    this.setState({ value: value });
    onLoadTransactions({
      page: 1,
      pageSize:
        getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
        TRANSACTIONS_PAGE_SIZE_VALUE,
      id: selectedPlayer.get("id"),
      type: this.state.type,
      searchTerm: value != 0 && value
    });
    let url = `?${PAGE_QUERY_PARAM_NAME}=1&${PAGE_SIZE_QUERY_PARAM_NAME}=${TRANSACTIONS_PAGE_SIZE_VALUE}`;
    url = textToSearch
      ? `${url}&${SEARCH_TERM_PARAM_NAME}=${textToSearch}`
      : url;
    history.push(url);
  }
  componentDidMount() {
    const { selectedPlayer, onLoadTransactions } = this.props;
    if (selectedPlayer && selectedPlayer.get("id")) {
      onLoadTransactions({
        page: getParameterByName(PAGE_QUERY_PARAM_NAME, location.search) || 1,
        pageSize:
          getParameterByName(PAGE_SIZE_QUERY_PARAM_NAME, location.search) ||
          TRANSACTIONS_PAGE_SIZE_VALUE,
        id: selectedPlayer.get("id")
      });
    }
  }

  componentWillUnmount() {
    this.props.onResetSelectedPlayer();
  }

  render() {
    const {
      transactions,
      selectedLanguage,
      isLoading,
      transactionPagination,
      onLoadTransactions,
      history,
      page,
      selectedPlayer,
      onCompleteTransaction,
      match = {}
    } = this.props;

    const { params = {} } = match;
    const { playerId } = params;

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
          className="player-transactions-table-card"
        >
          <FlexBox flexDirection={{ md: "row-reverse", base: "column" }}>
            <DynamicForm
              formFields={getBonusTransactionsFormFields({
                onSelectChange: value => {
                  this.setState({ type: value }, () => {
                    onLoadTransactions({
                      page: 1,
                      pageSize:
                        getParameterByName(
                          PAGE_SIZE_QUERY_PARAM_NAME,
                          location.search
                        ) || TRANSACTIONS_PAGE_SIZE_VALUE,
                      id: selectedPlayer.get("id"),
                      type: value != 0 && value,
                      searchTerm: this.state.value
                    }).then(() => {
                      let url = `?${PAGE_QUERY_PARAM_NAME}=1&${PAGE_SIZE_QUERY_PARAM_NAME}=${TRANSACTIONS_PAGE_SIZE_VALUE}`;
                      url = this.state.value
                        ? `${url}&${SEARCH_TERM_PARAM_NAME}=${this.state.value}`
                        : url;
                      history.push(url);
                    });
                  });
                },
                onSearchChange: this.debouncedSearchChange
              })}
              displayButtons={false}
              className="modal-search__form"
            />
          </FlexBox>
          <PlayerBonusTransactionsTable
            playerId={playerId}
            onCompleteTransaction={onCompleteTransaction}
            isLoading={isLoading}
            transactions={transactions}
            selectedLanguage={selectedLanguage}
            pagination={transactionPagination}
            history={history}
            onChangePageClick={e =>
              onChangePaginationClick(e, TRANSACTIONS_PAGE_SIZE_VALUE, data => {
                onLoadTransactions({
                  ...data,
                  id: selectedPlayer.get("id"),
                  type: this.state.type,
                  searchTerm: this.state.value
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
      query[PAGE_SIZE_QUERY_PARAM_NAME] || TRANSACTIONS_PAGE_SIZE_VALUE;
    const { playerId: id } = params;

    return store.dispatch(
      fetchPlayerTransactions({
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
  transactions: selectTransactions(state),
  isLoading: selectTransactionsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  selectedPlayer: selectSelectedPlayer(state),
  authentication: selectAuth(state),
  transactionPagination: selectTransactionPagination(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadTransactions: data => dispatch(getPlayerBonusTransactions(data)),
  onResetSelectedPlayer: data => dispatch(resetSelectedPlayer(data)),
  onCompleteTransaction: data => dispatch(completeTransaction(data))
});

export default withAuth(
  withPage(
    connect(mapStateToProps, mapDispatchToProps)(PlayerTransactions),
    getPage,
    REDUCER_NAME
  )
);
