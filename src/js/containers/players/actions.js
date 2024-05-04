import {
  REDUCER_NAME,
  PLAYERS_LOADING,
  PLAYERS_ERROR,
  SET_PLAYERS,
  SET_PAGINATION,
  SET_SELECTED_PLAYER,
  RESET_SELECTED_PLAYER,
  SET_SELECTED_PLAYER_BALANCE,
  SET_TRANSACTIONS,
  SET_TRANSACTIONS_PAGINATION,
  TRANSACTIONS_LOADING,
  SET_MATCHES,
  SET_MATCHES_PAGINATION,
  MATCHES_LOADING,
  UPDATE_TRANSACTION,
  UPDATE_PLAYER,
  SET_PLAYER_XP_POINTS,
  UPDATE_MATCH,
  SET_SELECTED_MATCH,
  CANCELL_MATCH_LOADING,
  SET_ACTIVE_TOURNAMENTS,
  SET_PLAYER_BOY_PROFILE
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: PLAYERS_LOADING,
  data
});

const isCancelMatchLoading = data => ({
  type: CANCELL_MATCH_LOADING,
  data
});

const isTransactionsLoading = data => ({
  type: TRANSACTIONS_LOADING,
  data
});

const isMatchesLoading = data => ({
  type: MATCHES_LOADING,
  data
});

const isError = data => ({
  type: PLAYERS_ERROR,
  data
});

const setPlayers = data => ({
  type: SET_PLAYERS,
  data
});
const updatePlayers = data => ({
  type: UPDATE_PLAYER,
  data
});

const setPlayerTransactions = data => ({
  type: SET_TRANSACTIONS,
  data
});

const setPlayerMatches = data => ({
  type: SET_MATCHES,
  data
});

const setPagination = data => ({
  type: SET_PAGINATION,
  data
});

const setTransactionPagination = data => ({
  type: SET_TRANSACTIONS_PAGINATION,
  data
});

const setMatchPagination = data => ({
  type: SET_MATCHES_PAGINATION,
  data
});

export const setSelectedPlayerBalance = data => ({
  type: SET_SELECTED_PLAYER_BALANCE,
  data
});

export const setSelectedPlayer = data => ({
  type: SET_SELECTED_PLAYER,
  data
});

export const resetSelectedPlayer = data => ({
  type: RESET_SELECTED_PLAYER,
  data
});

export const updateTransaction = data => ({
  type: UPDATE_TRANSACTION,
  data
});

export const setPlayerXpPoints = data => ({
  type: SET_PLAYER_XP_POINTS,
  data
});

export const updateMatches = data => ({
  type: UPDATE_MATCH,
  data
});

export const setSelectedMatch = data => ({
  type: SET_SELECTED_MATCH,
  data
});

export const setActiveTournaments = data => ({
  type: SET_ACTIVE_TOURNAMENTS,
  data
});

export const setPlayerBoyProfile = data => ({
  type: SET_PLAYER_BOY_PROFILE,
  data
});

export const submitPlayerWithdraw = data => dispatch => {
  dispatch(isLoading(true));
  return Api.wallet
    .submitWithdraw(data)
    .then(response => {
      if (response) {
        dispatch(isLoading(false));
        return response;
      } else {
        dispatch(isError(true));
        dispatch(isLoading(false));
        throw "operation failed";
      }
    })
    .catch(error => {
      dispatch(isError(true));
      dispatch(isLoading(false));
      console.error(error);
      throw error;
    });
};

export const getPlayerBalance = data => dispatch => {
  return Api.players
    .getBalanceById(data)
    .then(response => {
      dispatch(setSelectedPlayerBalance(response));
      return response;
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getPlayers = data => dispatch => {
  dispatch(isLoading(true));
  return Api.players
    .get(data)
    .then(response => {
      dispatch(setPlayers(response.data));
      dispatch(
        setPagination({
          ...response.pagination,
          page: data.page,
          pageSize: data.pageSize
        })
      );
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const SearchPlayers = data => dispatch => {
  dispatch(isLoading(true));
  return Api.players
    .search(data)
    .then(response => {
      dispatch(setPlayers(response.data));
      if (data && data.page && data.pageSize) {
        dispatch(
          setPagination({
            ...response.pagination,
            page: data.page,
            pageSize: data.pageSize
          })
        );
      }
      return response;
    })
    .then(response => {
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getPlayerById = data => dispatch => {
  dispatch(isLoading(true));
  return Api.players
    .getById(data)
    .then(response => {
      dispatch(setSelectedPlayer(response));
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getPlayerTransactions = data => dispatch => {
  dispatch(isTransactionsLoading(true));
  return Api.players
    .getPlayerTransactions(data)
    .then(response => {
      dispatch(setPlayerTransactions(response.data));
      dispatch(
        setTransactionPagination({
          ...response.pagination,
          page: data.page,
          pageSize: data.pageSize
        })
      );
      dispatch(isTransactionsLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isTransactionsLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};
export const getPlayerBonusTransactions = data => dispatch => {
  dispatch(isTransactionsLoading(true));
  return Api.players
    .getPlayerBonusTransactions(data)
    .then(response => {
      dispatch(setPlayerTransactions(response.data));
      dispatch(
        setTransactionPagination({
          ...response.pagination,
          page: data.page,
          pageSize: data.pageSize
        })
      );
      dispatch(isTransactionsLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isTransactionsLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getPlayerMatches = data => dispatch => {
  dispatch(isMatchesLoading(true));
  return Api.players
    .getPlayerMatches(data)
    .then(response => {
      dispatch(setPlayerMatches(response.data));
      dispatch(
        setMatchPagination({
          ...response.pagination,
          page: data.page,
          pageSize: data.pageSize
        })
      );
      dispatch(isMatchesLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isMatchesLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const updateAdminCancelChallenge = data => dispatch => {
  dispatch(isCancelMatchLoading(true));
  return Api.matches
    .adminCancelChallenge(data.matchId)
    .then(() => {
      dispatch(isCancelMatchLoading(false));
      getPlayerMatches({
        id: data.playerId,
        page: data.page,
        pageSize: data.pageSize
      })(dispatch);
    })
    .catch(error => {
      dispatch(isCancelMatchLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const completeTransaction = data => dispatch => {
  dispatch(isTransactionsLoading(true));
  return Api.players
    .completeTransaction(data)
    .then(response => {
      dispatch(updateTransaction(response));
      dispatch(isTransactionsLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(isTransactionsLoading(false));
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const submitPlayerBlock = data => dispatch => {
  return Api.players
    .blockPlayer(data)
    .then(response => {
      dispatch(updatePlayers(response));
      return response;
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const submitPlayerUnBlock = data => dispatch => {
  return Api.players
    .unblockPlayer(data)
    .then(response => {
      dispatch(updatePlayers(response));
      return response;
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const submitPlayerMute = data => dispatch => {
  return Api.players
    .mutePlayer(data)
    .then(response => {
      dispatch(updatePlayers(response));
      return response;
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const submitPlayerUnMute = data => dispatch => {
  return Api.players
    .unMutePlayer(data)
    .then(response => {
      dispatch(updatePlayers(response));
      return response;
    })
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const submitPlayerCredit = data => dispatch => {
  return Api.transactions
    .creditPlayer(data)
    .then(response => response)
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const submitPlayerCreditEnergy = data => dispatch => {
  return Api.transactions
    .creditPlayerWithEnergy(data)
    .then(response => response)
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const submitPlayerCreditBonus = data => dispatch => {
  return Api.bonusTransactions
    .creditBonus(data)
    .then(response => response)
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const updateAdminPlayer = data => dispatch => {
  return Api.players
    .updateAdminPlayer(data)
    .then(response => dispatch(updatePlayers(response)))
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const getPlayerXpPoints = data => dispatch => {
  return Api.players
    .getXPPoints(data)
    .then(response => dispatch(setPlayerXpPoints(response)))
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });
};

export const updatePlayerXpPoints = data => dispatch => {
  return Api.players.updateXPPoints(data).catch(error => {
    dispatch(isError(true));
    console.error(error);
    throw error;
  });
};

export const uploadPlayerDocuments = data => dispatch =>
  Api.players.uploadPlayerDocuments(data).catch(error => {
    dispatch(isError(true));
    console.error(error);
    throw error;
  });

export const deletePlayerDocument = data => dispatch =>
  Api.players.deletePlayerDocument(data).catch(error => {
    dispatch(isError(true));
    console.error(error);
    throw error;
  });
export const validatePlayerDocument = data => dispatch => {
  Api.players.validatePlayerDocument(data).catch(error => {
    dispatch(isError(true));
    console.error(error);
    throw error;
  });
};

export const fetchPlayers = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    SearchPlayers(requestData)(dispatch)
  ]);

export const fetchPlayerWithdraw = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getPlayerById(requestData)(dispatch)
  ]);

export const fetchPlayerTransactions = ({
  pageData,
  requestData
}) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getPlayerTransactions(requestData)(dispatch),
    getPlayerById(requestData)(dispatch)
  ]);

export const fetchPlayerMatches = ({ pageData, requestData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch),
    getPlayerMatches(requestData)(dispatch),
    getPlayerById(requestData)(dispatch)
  ]);

export const fetchCancelMatch = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch)
  ]);

export const getActiveTournaments = data => dispatch =>
  Api.tournaments
    .getActiveTournaments(data)
    .then(response => dispatch(setActiveTournaments(response)))
    .catch(error => {
      dispatch(isError(true));
      console.error(error);
      throw error;
    });