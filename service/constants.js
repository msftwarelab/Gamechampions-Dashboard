import configuration from "~config";

export const API_URL = `${configuration.apiUrl}api`;
export const HUBS_API_URL = `${configuration.apiUrl}`;
export const UMBRACO_API_URL = configuration.umbracoApiUrl;
export const STORAGE_URL = configuration.storageUrl;
export const IMAGES_STORAGE_URL = `${configuration.storageUrl}images/`;
export const ROLES = {
  ADMIN: 1,
  PLAYER: 2,
  AFFILIATE: 3
};
export const SEARCH_TERM_PARAM_NAME = "searchTerm";
export const SEARCH_ID_PARAM_NAME = "searchId";
export const PAGE_QUERY_PARAM_NAME = "page";
export const PAGE_SIZE_QUERY_PARAM_NAME = "pageSize";
export const GAMEID_QUERY_PARAM_NAME = "gameId";
export const NUMBER_OF_DAYS_QUERY_PARAM_NAME = "numberOfDays";
export const USER_NAME_PARAM_NAME = "userName";
export const ID_PARAM_NAME = "id";

export const MATCH_STATUS_PARAM_NAME = "state";
export const MATCH_FILTER_BY_ADMIN_MATCH_MADE = "filterByMatchMade";
export const SESSION_NAME = "user";

export const BOY_MATCH_STATUS_PARAM_NAME = "status";

export const SESSION_LANGUAGE = "language";

export const BONUS_TRANSACTION_TYPE = {
  0: "ALL",
  1: "DEPOSIT BONUS",
  2: "REDEEM",
  3: "REVOKE",
  4: "CREDIT",
  5: "INACTIVEACCOUNTFEE",
  7: "WELCOME"
};

export const BONUS_TRANSACTION_STATUS = {
  0: "ALL",
  1: "PENDING",
  2: "COMPLETE",
  3: "CANCELLED",
  4: "REJECTED"
};

export const TransactionState = {
  "1": "Pending",
  "2": "Complete",
  "3": "Cancelled",
  "4": "Rejected"
};

export const TransactionType = {
  "1": "Deposit",
  "2": "Withdrawal",
  "3": "Bet",
  "4": "Win",
  "5": "Refund",
  "6": "Credit",
  "7": "BonusRedeem",
  "8": "InactiveAccountFee",
  "9": "Purchase"
};
export const Credit = {
  state: 2,
  type: 6
};

export const MatchState = {
  "1": "Upcoming",
  "2": "Live",
  "3": "Waiting",
  "4": "Under Review",
  "5": "Completed",
  "6": "Awaiting challenger report",
  "7": "Awaiting challengee report",
  "8": "Cancelled"
};

export const BoyMatchState = {
  "1": "Pending",
  "2": "Running",
  "3": "PlayerComplete",
  "4": "Completed",
  "5": "Cancelled"
};

export const BoyMatchAuxillaryStatus = {
  "1": "NotStarted",
  "2": "RunningInGame",
  "3": "RunningIncorrectMode",
  "4": "RunningSettlementInProgress",
  "5": "RunningAwaitingResult",
  "6": "CompleteAutomated",
  "7": "CompletedByAdmin",
  "8": "CancelledIncorrectMode",
  "9": "CancelledIncorrectModeBots",
  "10": "CancelledByUser",
  "11": "CancelledByTrader",
  "12": "CancelledByAdmin",
  "13": "MatchNotPlayed24Hrs",
  "14": "CohortChanged",
  "15": "TraderSettled",
  "16": "MatchNotPlayed15Minutes",
  "17": "Winsurance",
  "18": "IncorrectChampion",
  "19": "BetDuringMatch",
  "20": "InvalidMatchPlayed"
};

export const AFFILIATE_SOURCE_QUERY_PARAM = "IWSource";
export const AFFILIATE_MEDIUM_QUERY_PARAM = "IWMedium";
export const AFFILIATE_COOKIE_NAME = "IWAffiliateCookie";

export const ADMIN_NAVIGATION_TABS = [
  {
    title: "Affiliate List",
    path: `/affiliates`
  },
  {
    title: "Promotion List",
    path: `/promotions`
  }
];

//Hubs
export const globalChatSendMessageApiHubTaskName = "SendMessage";

export const GOOGLE_DRIVE_DOC_URL = "https://drive.google.com/viewer?url=";
