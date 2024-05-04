import {
  REDUCER_NAME,
  GAMES_LOADING,
  GAMES_ERROR,
  SET_GAMES,
  SET_PAGINATION,
  REMOVE_GAME,
  GAME_DETAILS_ERROR,
  ADD_GAME,
  SET_ADMIN_FILTER_FROM,
  SET_ADMIN_FILTER_TO,
  SET_INSTANT_MATCHES,
  SET_MESSAGES_SENT,
  SET_PLAYER_DEPOSITS,
  SET_PLAYER_REGISTRATIONS,
  SET_MATCHES_PLAYED,
  SET_PLAYER_WINS,
  SET_ACTIVE_PLAYERS,
  SET_DEPOSIT_SUM,
  SET_DEPOSIT_COUNT,
  SET_REGISTERED_PLAYER_COUNT,
  SET_MATCH_COMMISSIONS,
  SET_MATCH_PRIZES,
  SET_TOURNAMENT,
  SET_TOURNAMENT_POINTS_TABLE,
  SET_ROTATING_BANNERS
} from "./constants";
import { renderPage, getPage } from "../page/actions";
import Api from "../../../../service/main";

const isLoading = data => ({
  type: GAMES_LOADING,
  data
});

const isError = data => ({
  type: GAMES_ERROR,
  data
});

const setError = data => {
  return {
    type: GAME_DETAILS_ERROR,
    data
  };
};

const setGames = data => ({
  type: SET_GAMES,
  data
});

export const setFilterFrom = data => ({
  type: SET_ADMIN_FILTER_FROM,
  data
});

export const setFilterTo = data => ({
  type: SET_ADMIN_FILTER_TO,
  data
});

export const setInstantMatches = data => ({
  type: SET_INSTANT_MATCHES,
  data
});

export const setMessagesSent = data => ({
  type: SET_MESSAGES_SENT,
  data
});

export const setPlayerDeposits = data => ({
  type: SET_PLAYER_DEPOSITS,
  data
});

export const setPlayerRegistrations = data => ({
  type: SET_PLAYER_REGISTRATIONS,
  data
});

export const setMatchesPlayed = data => ({
  type: SET_MATCHES_PLAYED,
  data
});

export const setPlayerWins = data => ({
  type: SET_PLAYER_WINS,
  data
});

export const setActivePlayers = data => ({
  type: SET_ACTIVE_PLAYERS,
  data
});

export const setDepositSum = data => ({
  type: SET_DEPOSIT_SUM,
  data
});

export const setDepositCount = data => ({
  type: SET_DEPOSIT_COUNT,
  data
});

export const setRegisteredPlayerCount = data => ({
  type: SET_REGISTERED_PLAYER_COUNT,
  data
});

const setMatchCommissions = data => ({
  type: SET_MATCH_COMMISSIONS,
  data
});

const setMatchPrizes = data => ({
  type: SET_MATCH_PRIZES,
  data
});

const setPagination = data => ({
  type: SET_PAGINATION,
  data
});

const removeGame = data => ({
  type: REMOVE_GAME,
  data
});

const addGame = data => ({
  type: ADD_GAME,
  data
});

const setTournament = data => ({
  type: SET_TOURNAMENT,
  data
});

const setTournamentPointsTable = data => ({
  type: SET_TOURNAMENT_POINTS_TABLE,
  data
});

const setRotatingBanners = data => ({
  type: SET_ROTATING_BANNERS,
  data
});

export const getGames = data => dispatch => {
  dispatch(isLoading(true));
  return Api.games
    .get(data)
    .then(response => {
      dispatch(setGames(response.data));
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
export const searchGames = data => dispatch => {
  dispatch(isLoading(true));
  return Api.games
    .search(data)
    .then(response => {
      dispatch(setGames(response.data));
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

export const createGame = data => dispatch => {
  return Api.games
    .createGame(data)
    .then(response => {
      dispatch(addGame(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });
};

export const submitGameDelete = data => dispatch =>
  Api.games
    .deleteGame(data)
    .then(response => {
      dispatch(removeGame(data));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getRegisteredPlayerCount = data => dispatch =>
  Api.statistics
    .getRegisteredPlayerCount(data)
    .then(response => {
      dispatch(setRegisteredPlayerCount(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getDepositCount = data => dispatch =>
  Api.statistics
    .getDepositCount(data)
    .then(response => {
      dispatch(setDepositCount(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getDepositSum = data => dispatch =>
  Api.statistics
    .getDepositSum(data)
    .then(response => {
      dispatch(setDepositSum(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getActivePlayers = data => dispatch =>
  Api.statistics
    .getActivePlayers(data)
    .then(response => {
      dispatch(setActivePlayers(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getPlayerWins = data => dispatch =>
  Api.statistics
    .getPlayerWins(data)
    .then(response => {
      dispatch(setPlayerWins(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getMatchesPlayed = data => dispatch =>
  Api.statistics
    .getMatchesPlayed(data)
    .then(response => {
      dispatch(setMatchesPlayed(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getPlayerRegistrations = data => dispatch =>
  Api.statistics
    .getPlayerRegistrations(data)
    .then(response => {
      dispatch(setPlayerRegistrations(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getPlayerDeposits = data => dispatch =>
  Api.statistics
    .getPlayerDeposits(data)
    .then(response => {
      dispatch(setPlayerDeposits(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getMatchCommissions = data => dispatch =>
  Api.statistics
    .getMatchCommissions(data)
    .then(response => {
      dispatch(setMatchCommissions(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getMatchPrizes = data => dispatch =>
  Api.statistics
    .getMatchPrizes(data)
    .then(response => {
      dispatch(setMatchPrizes(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getMessagesSent = data => dispatch =>
  Api.statistics
    .getMessagesSent(data)
    .then(response => {
      dispatch(setMessagesSent(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getInstantMatches = data => dispatch =>
  Api.statistics
    .getInstantMatches(data)
    .then(response => {
      dispatch(setInstantMatches(response));
      return response;
    })
    .catch(error => {
      dispatch(setError(error));
      console.error(error);
    });

export const getTournament = data => dispatch => {
  dispatch(isLoading(true));
  return Api.tournaments
    .getTournament(data)
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setTournament(response));
      return response;
    })
    .catch(() => {
      dispatch(isLoading(false));
    });
};

export const getTournamentPointsTable = () => dispatch => {
  dispatch(isLoading(true));
  return Api.games
    .getTournamentPointsTable()
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setTournamentPointsTable(response));
      return response;
    })
    .catch(() => {
      dispatch(isLoading(false));
    });
};

export const getRotatingBanners = data => dispatch => {
  dispatch(isLoading(true));
  return Api.games
    .getRotatingBanners(data)
    .then(response => {
      dispatch(isLoading(false));
      dispatch(setRotatingBanners(response));
      return response;
    })
    .catch(() => {
      dispatch(isLoading(false));
    });
};

export const fetchGames = ({ pageData }) => dispatch =>
  Promise.all([
    renderPage({
      reducerName: REDUCER_NAME,
      get: getPage,
      data: pageData
    })(dispatch)
  ]);
