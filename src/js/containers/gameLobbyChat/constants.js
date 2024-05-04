export const REDUCER_NAME = "gameLobbyChat";
export const SET_MESSAGES = `${REDUCER_NAME}/SET_MESSAGES`;
export const RESET_MESSAGES = `${REDUCER_NAME}/RESET_MESSAGES`;
export const ADD_MESSAGE = `${REDUCER_NAME}/ADD_MESSAGE`;
export const SET_IS_NEW_MESSAGE = `${REDUCER_NAME}/SET_IS_NEW_MESSAGE`;
export const SET_IS_NEW_MESSAGE_CONDITIONALLY = `${REDUCER_NAME}/SET_IS_NEW_MESSAGE_CONDITIONALLY`;
export const INTERVAL_TIME = 3000;
export const GAMES = [
  { id: 1, title: "FIFA", gameType: 1, icon: "/img/fifa.svg", selected: true },
  { id: 2, title: "NFL", gameType: 2, icon: "/img/NFL.svg", selected: false },
  { id: 3, title: "NBA", gameType: 3, icon: "/img/NBA.svg", selected: false },
  { id: 4, title: "WZ", gameType: 4, icon: "/img/WZ.svg", selected: false },
  {
    id: 5,
    title: "FN",
    gameType: 5,
    icon: "/img/fortnite.svg",
    selected: false
  }
];
