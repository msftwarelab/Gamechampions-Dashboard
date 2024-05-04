import { SET_GAME_TICKER_MATCHES, SET_GAME } from "./constants";
import Api from "../../../../service/main";

const setGameTickerMatches = data => ({
  type: SET_GAME_TICKER_MATCHES,
  data
});
export const setGame = data => ({
  type: SET_GAME,
  data
});
export const getGame = data => dispatch => {
  return Api.games
    .getGame(data)
    .then(response => {
      dispatch(setGame(response));
      return response;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const getGameTickerMatches = data => dispatch => {
  return Api.games
    .getGameTickerMatches(data)
    .then(response => {
      dispatch(setGameTickerMatches(response));
      return response;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const fetchGameLobby = ({ requestData }) => dispatch =>
  Promise.all([
    getGameTickerMatches(requestData)(dispatch),
    getGame(requestData)(dispatch)
  ]);
