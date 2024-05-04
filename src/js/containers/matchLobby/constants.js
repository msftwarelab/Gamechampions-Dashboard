import { postFile } from "./actions";
export const REDUCER_NAME = "matchLobby";
export const MATCH_LOADING = `${REDUCER_NAME}/MATCH_LOADING`;
export const MATCH_ERROR = `${REDUCER_NAME}/MATCH_ERROR`;
export const SET_ERROR = `${REDUCER_NAME}/SET_ERROR`;
export const RESET_ERROR = `${REDUCER_NAME}/RESET_ERROR`;
export const SET_MATCH = `${REDUCER_NAME}/SET_MATCH`;
export const SET_TEAMS = `${REDUCER_NAME}/SET_TEAMS`;
export const SET_MATCH_STATUS = `${REDUCER_NAME}/SET_MATCH_STATUS`;
export const SET_CHALLENGER_XPPOINTS = `${REDUCER_NAME}/CHALLENGER_XPPOINTS`;
export const SET_CHALLENGEE_XPPOINTS = `${REDUCER_NAME}/CHALLENGEE_XPPOINTS`;
export const POLLING_INTERVAL_TIME = 3000;
export const TIMER_INTERVAL_TIME = 1000;
export const REPORT_RESULTS_WAITING_TIME = 15; // minutes
export const SUBMIT_PHOTO_PROOF = `${REDUCER_NAME}/SUBMIT_PHOTO_PROOF`;
export const MATCHTYPE = { INCOGNITO: 0, RIVAL: 1 };
export const MATCH_STATUS = {
  UPCOMING: 1,
  LIVE: 2,
  WAITING: 3,
  UNDER_REVIEW: 4,
  COMPLETED: 5,
  AWAITING_CHALLENGER_REPORT: 6,
  AWAITING_CHALLENGEE_REPORT: 7,
  CANCELLED: 8
};

export const MATCH_ACTION = {
  ACCEPT_CHALLENGE: 1,
  START_MATCH: 2,
  REFUSE_CHALLENGE: 3,
  CANCEL_CHALLENGE: 4
};
export const PLATFORM = {
  XBOX: "XBOX",
  PS4: "PS4",
  PS3: "PS3",
  PS4XBOX: "PS4/XBOX",
  NEXTGEN: "NEXT GEN",
  NEXTGEN1: "NEXTGEN"
};

export const GAMETYPES = {
  FIFA: 1,
  MADDEN: 2,
  NBA: 3,
  WARZONE: 4,
  FORTNITE: 5,
  LEAGUEOFLEGENDS: 6,
  PUBG: 7
};

export const DOCUMENT_TYPE = {
  IdentityDocument: 1,
  ProofOfAdressDocument: 2
};

export const onImageLoad = (file, target) =>
  postFile({
    file: target.result.substr(target.result.lastIndexOf(",") + 1),
    extension: file.name.substr(file.name.lastIndexOf(".") + 1),
    documentType: DOCUMENT_TYPE.IdentityDocument,
    fileName: file.name
  });
