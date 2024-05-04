export const itRoutes = {
  root: "it",
  urlsAndDocTypes: [
    {
      key: "/it/streams",
      value: "home"
    },
    {
      key: "/it/arena",
      value: "sports"
    },
    {
      key: "/it/arena/get-bonus",
      value: "getBonus"
    },
    {
      key: "/it/livestats",
      value: "liveStats"
    },
    {
      key: "/it/forgot-password",
      value: "forgotPassword"
    },
    {
      key: "/it/reset-password",
      value: "resetPassword"
    },
    {
      key: "/it/login",
      value: "login"
    },
    {
      key: "/it/registration",
      value: "registration"
    },
    {
      key: "/it/logout",
      value: "logout"
    },
    {
      key: "/it/friends",
      value: "friends"
    },
    {
      key: "/it/my-account/:view",
      value: "myAccount"
    },
    {
      key: "/it/matches/:view",
      value: "matches"
    },
    {
      key: "/it/add-friend",
      value: "addFriend"
    },
    {
      key: "/it/game-lobby/:gameId/recentplayers",
      value: "recentPlayers"
    },
    {
      key: "/it/game-lobby/:gameId/matchmaking",
      value: "matchMaking"
    },
    {
      key: "/it/game-lobby/:gameId/rules",
      value: "gameRules"
    },
    {
      key: `/it/game-lobby/:gameId/tournaments`,
      value: "tournaments"
    },
    {
      key: `/it/game-lobby/:gameId/tournaments/leaderboard/:tournamentId`,
      value: "tournamentInfo"
    },
    {
      key: `/it/game-lobby/:gameId/tournaments/results/:tournamentId`,
      value: "tournamentResults"
    },
    {
      key: `/it/game-lobby/:gameId/tournaments/:tournamentId/paywall`,
      value: "tournamentPaywall"
    },
    {
      key: "/it/game-lobby/:gameId/chat",
      value: "gameLobbyChat"
    },
    {
      key: "/it/game-lobby/:gameId/leaderboards",
      value: "leaderBoards"
    },
    {
      key: "/it/game-lobby/:gameId/leaderboards/:playerId/:playerAction?",
      value: "leaderBoardsDetails"
    },
    {
      key: "/it/deposit/:step",
      value: "deposit"
    },
    {
      key: "/it/withdrawal/:step",
      value: "withdrawal"
    },
    {
      key: "/it/player-details/:playerId",
      value: "playerDetails"
    },
    {
      key: "/it/player-details/:playerId/matches/:matchId/:matchAction?",
      value: "MatchDetails"
    },
    {
      key: "/it/create-challenge/:gameId?",
      value: "CreateChallenge"
    },
    {
      key: "/it/transaction-details/:transactionId/:transactionAction?",
      value: "TransactionDetails"
    },
    {
      key: "/it/player-details/:playerId/send-challenge/:gameId?",
      value: "SendChallenge"
    },
    {
      key: "/it/wallet",
      value: "wallet"
    },
    {
      key: "/it/offers",
      value: "Offers"
    },
    {
      key: "/it/match-lobby/:matchId",
      value: "matchLobby"
    },
    {
      key: "/it/match-lobby/:matchId/chat",
      value: "matchLobbyChat"
    },
    {
      key: "/it/match-lobby/:matchId/report-results",
      value: "reportResults"
    },
    {
      key: "/it/match-lobby/:matchId/set-score-advantage",
      value: "setScoreAdvantage"
    },
    {
      key: "/it/notifications",
      value: "notifications"
    },
    {
      key: "/it/messages/:view",
      value: "messages"
    },
    {
      key: "/it/support",
      value: "support"
    },
    {
      key: "/it/affiliates",
      value: "affiliates"
    },
    {
      key: "/it/affiliates/new/create",
      value: "createAffiliates"
    },
    {
      key: "/it/affiliates/:affiliateId/urls",
      value: "affiliateUrls"
    },
    {
      key: "/it/affiliates/:affiliateId/urls/create",
      value: "createAffiliateUrl"
    },
    {
      key: "/it/affiliates/:affiliateId/urls/:urlId/update",
      value: "updateAffiliateUrl"
    },
    {
      key: "/it/affiliates/:affiliateId/affiliate-reporting",
      value: "affiliateReporting"
    },
    {
      key: "/it/promotions",
      value: "promotions"
    },
    {
      key: "/it/promotions/create-promotion",
      value: "createPromotion"
    },
    {
      key: "/it/promotions/:promotionId/update-promotion",
      value: "updatePromotion"
    },
    {
      key: "/it/affiliates/:affiliateId/affiliate-promotions",
      value: "affiliatePromotions"
    },
    {
      key: "/it/affiliates/:affiliateId/promote",
      value: "promoteAffiliate"
    },
    {
      key: "/it/affiliates/:affiliateId/update",
      value: "updateAffiliate"
    },
    {
      key: "/it/all-players",
      value: "players"
    },
    {
      key: "/it/all-players/:playerId/credit",
      value: "playerCredit"
    },
    {
      key: "/it/all-players/:playerId/credit-energy",
      value: "playerCreditEnergy"
    },
    {
      key: "/it/all-players/:playerId/credit-bonus",
      value: "playerCreditBonus"
    },
    {
      key: "/it/all-players/:playerId/player-xp",
      value: "playerXp"
    },
    {
      key: "/it/all-players/:playerId/bonus-transactions",
      value: "playerBonusTransactions"
    },
    {
      key: "/it/all-players/:playerId/block",
      value: "playerBlock"
    },
    {
      key: "/it/all-players/:playerId/withdraw",
      value: "playerWithdraw"
    },
    {
      key: "/it/all-players/:playerId/transactions",
      value: "playerTransactions"
    },
    {
      key: "/it/all-players/:playerId/matches",
      value: "playerMatches"
    },
    {
      key: "/it/all-players/:playerId/boy-profile",
      value: "playerBoyProfile"
    },
    {
      key: "/it/all-players/:playerId",
      value: "playerDetailsAdmin"
    },
    {
      key: "/it/global-chat",
      value: "globalChat"
    },
    {
      key: "/it/bonus-transaction-details/:transactionId/",
      value: "bonusTransactionDetails"
    },
    {
      key: "/it/bonus-campaigns",
      value: "bonusCampaigns"
    },
    {
      key: "/it/bonus-campaigns/new/create",
      value: "createBonusCampaigns"
    },
    {
      key: "/it/bonus-campaigns/:bonusId",
      value: "bonusCampaignsDetails"
    },
    {
      key: `/it/admin-games`,
      value: "adminGames"
    },
    {
      key: `/it/admin-games/:gameId/:gameAction?`,
      value: "adminGameDetails"
    },
    {
      key: `/it/admin-matches`,
      value: "adminMatches"
    },
    {
      key: "/it/admin-matches/matchmaking",
      value: "adminMatchMaking"
    },
    {
      key: "/it/admin-boy-matches",
      value: "adminBoyMatches"
    },
    {
      key: "/it/admin-boy-matches/:matchId/update-status",
      value: "updateAdminBoyMatch"
    },
    {
      key: `/it/referral`,
      value: "playerReferral"
    },
    {
      key: "/it/ips-report",
      value: "ipsReport"
    },
    {
      key: "/it/ips-report/detail",
      value: "ipsReportDetail"
    },
    {
      key: "/it/uplay/:gameId",
      value: "boyGameLobby"
    },
    {
      key: "/it/uplay/:gameId/update-boy-profile",
      value: "boyUpdateProfile"
    },
    {
      key: "/it/uplay/match/:matchId",
      value: "boyMatch"
    },
    {
      key: "/it/ios-a2hs",
      value: "IosAddToHomeScreen"
    }
  ]
};
