export const jpRoutes = {
  root: "jp",
  urlsAndDocTypes: [
    {
      key: "/jp/streams",
      value: "home"
    },
    {
      key: "/jp/arena",
      value: "sports"
    },
    {
      key: "/jp/arena/get-bonus",
      value: "getBonus"
    },
    {
      key: "/jp/livestats",
      value: "liveStats"
    },
    {
      key: "/jp/forgot-password",
      value: "forgotPassword"
    },
    {
      key: "/jp/reset-password",
      value: "resetPassword"
    },
    {
      key: "/jp/login",
      value: "login"
    },
    {
      key: "/jp/registration",
      value: "registration"
    },
    {
      key: "/jp/logout",
      value: "logout"
    },
    {
      key: "/jp/friends",
      value: "friends"
    },
    {
      key: "/jp/my-account/:view",
      value: "myAccount"
    },
    {
      key: "/jp/matches/:view",
      value: "matches"
    },
    {
      key: "/jp/add-friend",
      value: "addFriend"
    },
    {
      key: "/jp/game-lobby/:gameId/recentplayers",
      value: "recentPlayers"
    },
    {
      key: "/jp/game-lobby/:gameId/matchmaking",
      value: "matchMaking"
    },
    {
      key: "/jp/game-lobby/:gameId/rules",
      value: "gameRules"
    },
    {
      key: `/jp/game-lobby/:gameId/tournaments`,
      value: "tournaments"
    },
    {
      key: `/jp/game-lobby/:gameId/tournaments/leaderboard/:tournamentId`,
      value: "tournamentInfo"
    },
    {
      key: `/jp/game-lobby/:gameId/tournaments/results/:tournamentId`,
      value: "tournamentResults"
    },
    {
      key: `/jp/game-lobby/:gameId/tournaments/:tournamentId/paywall`,
      value: "tournamentPaywall"
    },
    {
      key: "/jp/game-lobby/:gameId/chat",
      value: "gameLobbyChat"
    },
    {
      key: "/jp/game-lobby/:gameId/leaderboards",
      value: "leaderBoards"
    },
    {
      key: "/jp/game-lobby/:gameId/leaderboards/:playerId/:playerAction?",
      value: "leaderBoardsDetails"
    },
    {
      key: "/jp/deposit/:step",
      value: "deposit"
    },
    {
      key: "/jp/withdrawal/:step",
      value: "withdrawal"
    },
    {
      key: "/jp/player-details/:playerId",
      value: "playerDetails"
    },
    {
      key: "/jp/player-details/:playerId/matches/:matchId/:matchAction?",
      value: "MatchDetails"
    },
    {
      key: "/jp/create-challenge/:gameId?",
      value: "CreateChallenge"
    },
    {
      key: "/jp/transaction-details/:transactionId/:transactionAction?",
      value: "TransactionDetails"
    },
    {
      key: "/jp/player-details/:playerId/send-challenge/:gameId?",
      value: "SendChallenge"
    },
    {
      key: "/jp/wallet",
      value: "wallet"
    },
    {
      key: "/jp/offers",
      value: "Offers"
    },
    {
      key: "/jp/match-lobby/:matchId",
      value: "matchLobby"
    },
    {
      key: "/jp/match-lobby/:matchId/chat",
      value: "matchLobbyChat"
    },
    {
      key: "/jp/match-lobby/:matchId/report-results",
      value: "reportResults"
    },
    {
      key: "/jp/match-lobby/:matchId/set-score-advantage",
      value: "setScoreAdvantage"
    },
    {
      key: "/jp/notifications",
      value: "notifications"
    },
    {
      key: "/jp/messages/:view",
      value: "messages"
    },
    {
      key: "/jp/support",
      value: "support"
    },
    {
      key: "/jp/affiliates",
      value: "affiliates"
    },
    {
      key: "/jp/affiliates/new/create",
      value: "createAffiliate"
    },
    {
      key: "/jp/affiliates/:affiliateId/urls",
      value: "affiliateUrls"
    },
    {
      key: "/jp/affiliates/:affiliateId/urls/create",
      value: "createAffiliateUrl"
    },
    {
      key: "/jp/affiliates/:affiliateId/urls/:urlId/update",
      value: "updateAffiliateUrl"
    },
    {
      key: "/jp/affiliates/:affiliateId/affiliate-reporting",
      value: "affiliateReporting"
    },
    {
      key: "/jp/affiliates/:affiliateId/affiliate-promotions",
      value: "affiliatePromotions"
    },
    {
      key: "/jp/affiliates/:affiliateId/promote",
      value: "promoteAffiliate"
    },
    {
      key: "/jp/promotions",
      value: "promotions"
    },
    {
      key: "/jp/promotions/create-promotion",
      value: "createPromotion"
    },
    {
      key: "/jp/promotions/:promotionId/update-promotion",
      value: "updatePromotion"
    },
    {
      key: "/jp/affiliates/:affiliateId/update",
      value: "updateAffiliate"
    },
    {
      key: "/jp/all-players",
      value: "players"
    },
    {
      key: "/jp/all-players/:playerId/credit",
      value: "playerCredit"
    },
    {
      key: "/jp/all-players/:playerId/credit-energy",
      value: "playerCreditEnergy"
    },
    {
      key: "/jp/all-players/:playerId/credit-bonus",
      value: "playerCreditBonus"
    },
    {
      key: "/jp/all-players/:playerId/player-xp",
      value: "playerXp"
    },
    {
      key: "/jp/all-players/:playerId/bonus-transactions",
      value: "playerBonusTransactions"
    },
    {
      key: "/jp/all-players/:playerId/block",
      value: "playerBlock"
    },
    {
      key: "/jp/all-players/:playerId/withdraw",
      value: "playerWithdraw"
    },
    {
      key: "/jp/all-players/:playerId/transactions",
      value: "playerTransactions"
    },
    {
      key: "/jp/all-players/:playerId/matches",
      value: "playerMatches"
    },
    {
      key: "/jp/all-players/:playerId/boy-profile",
      value: "playerBoyProfile"
    },
    {
      key: "/jp/all-players/:playerId",
      value: "playerDetailsAdmin"
    },
    {
      key: "/jp/global-chat",
      value: "globalChat"
    },
    {
      key: "/jp/bonus-transaction-details/:transactionId/",
      value: "bonusTransactionDetails"
    },
    {
      key: "/jp/bonus-campaigns",
      value: "bonusCampaigns"
    },
    {
      key: "/jp/bonus-campaigns/new/create",
      value: "createBonusCampaigns"
    },
    {
      key: "/jp/bonus-campaigns/:bonusId",
      value: "bonusCampaignsDetails"
    },
    {
      key: "/jp/admin-games",
      value: "adminGames"
    },
    {
      key: "/jp/admin-games/:gameId/:gameAction?",
      value: "adminGameDetails"
    },
    {
      key: "/jp/admin-matches",
      value: "adminMatches"
    },
    {
      key: "/jp/admin-matches/matchmaking",
      value: "adminMatchMaking"
    },
    {
      key: "/jp/admin-boy-matches",
      value: "adminBoyMatches"
    },
    {
      key: "/jp/admin-boy-matches/:matchId/update-status",
      value: "updateAdminBoyMatch"
    },
    {
      key: "/jp/referral",
      value: "playerReferral"
    },
    {
      key: "/jp/ips-report",
      value: "ipsReport"
    },
    {
      key: "/jp/ips-report/detail",
      value: "ipsReportDetail"
    },
    {
      key: "/jp/uplay/:gameId",
      value: "boyGameLobby"
    },
    {
      key: "/jp/uplay/:gameId/update-boy-profile",
      value: "boyUpdateProfile"
    },
    {
      key: "/jp/uplay/match/:matchId",
      value: "boyMatch"
    },
    {
      key: "/jp/ios-a2hs",
      value: "IosAddToHomeScreen"
    }
  ]
};
