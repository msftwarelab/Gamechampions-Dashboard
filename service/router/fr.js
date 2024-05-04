export const frRoutes = {
  root: "fr",
  urlsAndDocTypes: [
    {
      key: "/fr/streams",
      value: "home"
    },
    {
      key: "/fr/arena",
      value: "sports"
    },
    {
      key: "/fr/arena/get-bonus",
      value: "getBonus"
    },
    {
      key: "/fr/livestats",
      value: "liveStats"
    },
    {
      key: "/fr/forgot-password",
      value: "forgotPassword"
    },
    {
      key: "/fr/reset-password",
      value: "resetPassword"
    },
    {
      key: "/fr/login",
      value: "login"
    },
    {
      key: "/fr/registration",
      value: "registration"
    },
    {
      key: "/fr/logout",
      value: "logout"
    },
    {
      key: "/fr/friends",
      value: "friends"
    },
    {
      key: "/fr/my-account/:view",
      value: "myAccount"
    },
    {
      key: "/fr/matches/:view",
      value: "matches"
    },
    {
      key: "/fr/add-friend",
      value: "addFriend"
    },
    {
      key: "/fr/game-lobby/:gameId/recentplayers",
      value: "recentPlayers"
    },
    {
      key: "/fr/game-lobby/:gameId/matchmaking",
      value: "matchMaking"
    },
    {
      key: "/fr/game-lobby/:gameId/rules",
      value: "gameRules"
    },
    {
      key: `/fr/game-lobby/:gameId/tournaments`,
      value: "tournaments"
    },
    {
      key: `/fr/game-lobby/:gameId/tournaments/leaderboard/:tournamentId`,
      value: "tournamentInfo"
    },
    {
      key: `/fr/game-lobby/:gameId/tournaments/results/:tournamentId`,
      value: "tournamentResults"
    },
    {
      key: `/fr/game-lobby/:gameId/tournaments/:tournamentId/paywall`,
      value: "tournamentPaywall"
    },
    {
      key: "/fr/game-lobby/:gameId/chat",
      value: "gameLobbyChat"
    },
    {
      key: "/fr/game-lobby/:gameId/leaderboards",
      value: "leaderBoards"
    },
    {
      key: "/fr/game-lobby/:gameId/leaderboards/:playerId/:playerAction?",
      value: "leaderBoardsDetails"
    },
    {
      key: "/fr/deposit/:step",
      value: "deposit"
    },
    {
      key: "/fr/withdrawal/:step",
      value: "withdrawal"
    },
    {
      key: "/fr/player-details/:playerId",
      value: "playerDetails"
    },
    {
      key: "/fr/player-details/:playerId/matches/:matchId/:matchAction?",
      value: "MatchDetails"
    },
    {
      key: "/fr/create-challenge/:gameId?",
      value: "CreateChallenge"
    },
    {
      key: "/fr/transaction-details/:transactionId/:transactionAction?",
      value: "TransactionDetails"
    },
    {
      key: "/fr/player-details/:playerId/send-challenge/:gameId?",
      value: "SendChallenge"
    },
    {
      key: "/fr/wallet",
      value: "wallet"
    },
    {
      key: "/fr/offers",
      value: "Offers"
    },
    {
      key: "/fr/match-lobby/:matchId",
      value: "matchLobby"
    },
    {
      key: "/fr/match-lobby/:matchId/chat",
      value: "matchLobbyChat"
    },
    {
      key: "/fr/match-lobby/:matchId/report-results",
      value: "reportResults"
    },
    {
      key: "/fr/match-lobby/:matchId/set-score-advantage",
      value: "setScoreAdvantage"
    },
    {
      key: "/fr/notifications",
      value: "notifications"
    },
    {
      key: "/fr/messages/:view",
      value: "messages"
    },
    {
      key: "/fr/support",
      value: "support"
    },
    {
      key: "/fr/affiliates",
      value: "affiliates"
    },
    {
      key: "/fr/affiliates/new/create",
      value: "createAffiliates"
    },
    {
      key: "/fr/promotions",
      value: "promotions"
    },
    {
      key: "/fr/promotions/create-promotion",
      value: "createPromotion"
    },
    {
      key: "/fr/promotions/:promotionId/update-promotion",
      value: "updatePromotion"
    },
    {
      key: "/fr/affiliates/:affiliateId/affiliate-promotions",
      value: "affiliatePromotions"
    },
    {
      key: "/fr/affiliates/:affiliateId/promote",
      value: "promoteAffiliate"
    },
    {
      key: "/fr/all-players",
      value: "players"
    },
    {
      key: "/fr/affiliates/:affiliateId/urls",
      value: "affiliateUrls"
    },
    {
      key: "/fr/affiliates/:affiliateId/urls/:urlId/update",
      value: "updateAffiliateUrl"
    },
    {
      key: "/fr/affiliates/:affiliateId/urls/create",
      value: "createAffiliateUrl"
    },
    {
      key: "/fr/affiliates/:affiliateId/affiliate-reporting",
      value: "affiliateReporting"
    },
    {
      key: "/fr/affiliates/:affiliateId/update",
      value: "updateAffiliate"
    },
    {
      key: "/fr/all-players/:playerId/credit",
      value: "playerCredit"
    },
    {
      key: "/fr/all-players/:playerId/credit-energy",
      value: "playerCreditEnergy"
    },
    {
      key: "/fr/all-players/:playerId/credit-bonus",
      value: "playerCreditBonus"
    },
    {
      key: "/fr/all-players/:playerId/player-xp",
      value: "playerXp"
    },
    {
      key: "/fr/all-players/:playerId/bonus-transactions",
      value: "playerBonusTransactions"
    },
    {
      key: "/fr/all-players/:playerId/block",
      value: "playerBlock"
    },
    {
      key: "/fr/all-players/:playerId/withdraw",
      value: "playerWithdraw"
    },
    {
      key: "/fr/all-players/:playerId/transactions",
      value: "playerTransactions"
    },
    {
      key: "/fr/all-players/:playerId/matches",
      value: "playerMatches"
    },
    {
      key: "/fr/all-players/:playerId/boy-profile",
      value: "playerBoyProfile"
    },
    {
      key: "/fr/all-players/:playerId",
      value: "playerDetailsAdmin"
    },
    {
      key: "/fr/global-chat",
      value: "globalChat"
    },
    {
      key: "/fr/bonus-transaction-details/:transactionId/",
      value: "bonusTransactionDetails"
    },
    {
      key: "/fr/bonus-campaigns",
      value: "bonusCampaigns"
    },
    {
      key: "/fr/bonus-campaigns/new/create",
      value: "createBonusCampaigns"
    },
    {
      key: "/fr/bonus-campaigns/:bonusId",
      value: "bonusCampaignsDetails"
    },
    {
      key: "/fr/admin-games",
      value: "adminGames"
    },
    {
      key: "/fr/admin-games/:gameId/:gameAction?",
      value: "adminGameDetails"
    },
    {
      key: "/fr/admin-matches",
      value: "adminMatches"
    },
    {
      key: "/fr/admin-matches/matchmaking",
      value: "adminMatchMaking"
    },
    {
      key: "/fr/admin-boy-matches",
      value: "adminBoyMatches"
    },
    {
      key: "/fr/admin-boy-matches/:matchId/update-status",
      value: "updateAdminBoyMatch"
    },
    {
      key: "/fr/referral",
      value: "playerReferral"
    },
    {
      key: "/fr/ips-report",
      value: "ipsReport"
    },
    {
      key: "/fr/ips-report/detail",
      value: "ipsReportDetail"
    },
    {
      key: "/fr/uplay/:gameId",
      value: "boyGameLobby"
    },
    {
      key: "/fr/uplay/:gameId/update-boy-profile",
      value: "boyUpdateProfile"
    },
    {
      key: "/fr/uplay/match/:matchId",
      value: "boyMatch"
    },
    {
      key: "/fr/ios-a2hs",
      value: "IosAddToHomeScreen"
    }
  ]
};
