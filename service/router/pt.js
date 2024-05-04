export const ptRoutes = {
  root: "pt",
  urlsAndDocTypes: [
    {
      key: "/pt/streams",
      value: "home"
    },
    {
      key: "/pt/arena",
      value: "sports"
    },
    {
      key: "/pt/arena/get-bonus",
      value: "getBonus"
    },
    {
      key: "/pt/livestats",
      value: "liveStats"
    },
    {
      key: "/pt/forgot-password",
      value: "forgotPassword"
    },
    {
      key: "/pt/reset-password",
      value: "resetPassword"
    },
    {
      key: "/pt/login",
      value: "login"
    },
    {
      key: "/pt/registration",
      value: "registration"
    },
    {
      key: "/pt/logout",
      value: "logout"
    },
    {
      key: "/pt/friends",
      value: "friends"
    },
    {
      key: "/pt/my-account/:view",
      value: "myAccount"
    },
    {
      key: "/pt/matches/:view",
      value: "matches"
    },
    {
      key: "/pt/add-friend",
      value: "addFriend"
    },
    {
      key: "/pt/game-lobby/:gameId/recentplayers",
      value: "recentPlayers"
    },
    {
      key: "/pt/game-lobby/:gameId/matchmaking",
      value: "matchMaking"
    },
    {
      key: "/pt/game-lobby/:gameId/rules",
      value: "gameRules"
    },
    {
      key: `/pt/game-lobby/:gameId/tournaments`,
      value: "tournaments"
    },
    {
      key: `/pt/game-lobby/:gameId/tournaments/leaderboard/:tournamentId`,
      value: "tournamentInfo"
    },
    {
      key: `/pt/game-lobby/:gameId/tournaments/results/:tournamentId`,
      value: "tournamentResults"
    },
    {
      key: `/pt/game-lobby/:gameId/tournaments/:tournamentId/paywall`,
      value: "tournamentPaywall"
    },
    {
      key: "/pt/game-lobby/:gameId/chat",
      value: "gameLobbyChat"
    },
    {
      key: "/pt/game-lobby/:gameId/leaderboards",
      value: "leaderBoards"
    },
    {
      key: "/pt/game-lobby/:gameId/leaderboards/:playerId/:playerAction?",
      value: "leaderBoardsDetails"
    },
    {
      key: "/pt/deposit/:step",
      value: "deposit"
    },
    {
      key: "/pt/withdrawal/:step",
      value: "withdrawal"
    },
    {
      key: "/pt/player-details/:playerId",
      value: "playerDetails"
    },
    {
      key: "/pt/player-details/:playerId/matches/:matchId/:matchAction?",
      value: "MatchDetails"
    },
    {
      key: "/pt/create-challenge/:gameId?",
      value: "CreateChallenge"
    },
    {
      key: "/pt/transaction-details/:transactionId/:transactionAction?",
      value: "TransactionDetails"
    },
    {
      key: "/pt/player-details/:playerId/send-challenge/:gameId?",
      value: "SendChallenge"
    },
    {
      key: "/pt/wallet",
      value: "wallet"
    },
    {
      key: "/pt/offers",
      value: "Offers"
    },
    {
      key: "/pt/match-lobby/:matchId",
      value: "matchLobby"
    },
    {
      key: "/pt/match-lobby/:matchId/chat",
      value: "matchLobbyChat"
    },
    {
      key: "/pt/match-lobby/:matchId/report-results",
      value: "reportResults"
    },
    {
      key: "/pt/match-lobby/:matchId/set-score-advantage",
      value: "setScoreAdvantage"
    },
    {
      key: "/pt/notifications",
      value: "notifications"
    },
    {
      key: "/pt/messages/:view",
      value: "messages"
    },
    {
      key: "/pt/support",
      value: "support"
    },
    {
      key: "/pt/affiliates",
      value: "affiliates"
    },
    {
      key: "/pt/affiliates/new/create",
      value: "createAffiliate"
    },
    {
      key: "/pt/affiliates/:affiliateId/urls",
      value: "affiliateUrls"
    },
    {
      key: "/pt/affiliates/:affiliateId/urls/create",
      value: "createAffiliateUrl"
    },
    {
      key: "/pt/affiliates/:affiliateId/urls/:urlId/update",
      value: "updateAffiliateUrl"
    },
    {
      key: "/pt/affiliates/:affiliateId/affiliate-reporting",
      value: "affiliateReporting"
    },
    {
      key: "/pt/affiliates/:affiliateId/affiliate-promotions",
      value: "affiliatePromotions"
    },
    {
      key: "/pt/affiliates/:affiliateId/promote",
      value: "promoteAffiliate"
    },
    {
      key: "/pt/promotions",
      value: "promotions"
    },
    {
      key: "/pt/promotions/create-promotion",
      value: "createPromotion"
    },
    {
      key: "/pt/promotions/:promotionId/update-promotion",
      value: "updatePromotion"
    },
    {
      key: "/pt/affiliates/:affiliateId/update",
      value: "updateAffiliate"
    },
    {
      key: "/pt/all-players",
      value: "players"
    },
    {
      key: "/pt/all-players/:playerId/credit",
      value: "playerCredit"
    },
    {
      key: "/pt/all-players/:playerId/credit-energy",
      value: "playerCreditEnergy"
    },
    {
      key: "/pt/all-players/:playerId/credit-bonus",
      value: "playerCreditBonus"
    },
    {
      key: "/pt/all-players/:playerId/player-xp",
      value: "playerXp"
    },
    {
      key: "/pt/all-players/:playerId/bonus-transactions",
      value: "playerBonusTransactions"
    },
    {
      key: "/pt/all-players/:playerId/block",
      value: "playerBlock"
    },
    {
      key: "/pt/all-players/:playerId/withdraw",
      value: "playerWithdraw"
    },
    {
      key: "/pt/all-players/:playerId/transactions",
      value: "playerTransactions"
    },
    {
      key: "/pt/all-players/:playerId/matches",
      value: "playerMatches"
    },
    {
      key: "/pt/all-players/:playerId/boy-profile",
      value: "playerBoyProfile"
    },
    {
      key: "/pt/all-players/:playerId",
      value: "playerDetailsAdmin"
    },
    {
      key: "/pt/global-chat",
      value: "globalChat"
    },
    {
      key: "/pt/bonus-transaction-details/:transactionId/",
      value: "bonusTransactionDetails"
    },
    {
      key: "/pt/bonus-campaigns",
      value: "bonusCampaigns"
    },
    {
      key: "/pt/bonus-campaigns/new/create",
      value: "createBonusCampaigns"
    },
    {
      key: "/pt/bonus-campaigns/:bonusId",
      value: "bonusCampaignsDetails"
    },
    {
      key: "/pt/admin-games",
      value: "adminGames"
    },
    {
      key: "/pt/admin-games/:gameId/:gameAction?",
      value: "adminGameDetails"
    },
    {
      key: "/pt/admin-matches",
      value: "adminMatches"
    },
    {
      key: "/pt/admin-matches/matchmaking",
      value: "adminMatchMaking"
    },
    {
      key: "/pt/admin-boy-matches",
      value: "adminBoyMatches"
    },
    {
      key: "/pt/admin-boy-matches/:matchId/update-status",
      value: "updateAdminBoyMatch"
    },
    {
      key: "/pt/referral",
      value: "playerReferral"
    },
    {
      key: "/pt/ips-report",
      value: "ipsReport"
    },
    {
      key: "/pt/ips-report/detail",
      value: "ipsReportDetail"
    },
    {
      key: "/pt/uplay/:gameId",
      value: "boyGameLobby"
    },
    {
      key: "/pt/uplay/:gameId/update-boy-profile",
      value: "boyUpdateProfile"
    },
    {
      key: "/pt/uplay/match/:matchId",
      value: "boyMatch"
    },
    {
      key: "/pt/ios-a2hs",
      value: "IosAddToHomeScreen"
    }
  ]
};
