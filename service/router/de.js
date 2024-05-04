export const deRoutes = {
  root: "de",
  urlsAndDocTypes: [
    {
      key: "/de/streams",
      value: "home"
    },
    {
      key: "/de/arena",
      value: "sports"
    },
    {
      key: "/de/arena/get-bonus",
      value: "getBonus"
    },
    {
      key: "/de/livestats",
      value: "liveStats"
    },
    {
      key: "/de/forgot-password",
      value: "forgotPassword"
    },
    {
      key: "/de/reset-password",
      value: "resetPassword"
    },
    {
      key: "/de/login",
      value: "login"
    },
    {
      key: "/de/registration",
      value: "registration"
    },
    {
      key: "/de/logout",
      value: "logout"
    },
    {
      key: "/de/friends",
      value: "friends"
    },
    {
      key: "/de/my-account/:view",
      value: "myAccount"
    },
    {
      key: "/de/matches/:view",
      value: "matches"
    },
    {
      key: "/de/add-friend",
      value: "addFriend"
    },
    {
      key: "/de/game-lobby/:gameId/recentplayers",
      value: "recentPlayers"
    },
    {
      key: "/de/game-lobby/:gameId/matchmaking",
      value: "matchMaking"
    },
    {
      key: "/de/game-lobby/:gameId/rules",
      value: "gameRules"
    },
    {
      key: `/de/game-lobby/:gameId/tournaments`,
      value: "tournaments"
    },
    {
      key: `/de/game-lobby/:gameId/tournaments/leaderboard/:tournamentId`,
      value: "tournamentInfo"
    },
    {
      key: `/de/game-lobby/:gameId/tournaments/results/:tournamentId`,
      value: "tournamentResults"
    },
    {
      key: `/de/game-lobby/:gameId/tournaments/:tournamentId/paywall`,
      value: "tournamentPaywall"
    },
    {
      key: "/de/game-lobby/:gameId/chat",
      value: "gameLobbyChat"
    },
    {
      key: "/de/game-lobby/:gameId/leaderboards",
      value: "leaderBoards"
    },
    {
      key: "/de/game-lobby/:gameId/leaderboards/:playerId/:playerAction?",
      value: "leaderBoardsDetails"
    },
    {
      key: "/de/deposit/:step",
      value: "deposit"
    },
    {
      key: "/de/withdrawal/:step",
      value: "withdrawal"
    },
    {
      key: "/de/player-details/:playerId",
      value: "playerDetails"
    },
    {
      key: "/de/player-details/:playerId/matches/:matchId/:matchAction?",
      value: "MatchDetails"
    },
    {
      key: "/de/create-challenge/:gameId?",
      value: "CreateChallenge"
    },
    {
      key: "/de/transaction-details/:transactionId/:transactionAction?",
      value: "TransactionDetails"
    },
    {
      key: "/de/player-details/:playerId/send-challenge/:gameId?",
      value: "SendChallenge"
    },
    {
      key: "/de/wallet",
      value: "wallet"
    },
    {
      key: "/de/offers",
      value: "Offers"
    },
    {
      key: "/de/match-lobby/:matchId",
      value: "matchLobby"
    },
    {
      key: "/de/match-lobby/:matchId/chat",
      value: "matchLobbyChat"
    },
    {
      key: "/de/match-lobby/:matchId/report-results",
      value: "reportResults"
    },
    {
      key: "/de/match-lobby/:matchId/set-score-advantage",
      value: "setScoreAdvantage"
    },
    {
      key: "/de/notifications",
      value: "notifications"
    },
    {
      key: "/de/messages/:view",
      value: "messages"
    },
    {
      key: "/de/support",
      value: "support"
    },
    {
      key: "/de/affiliates",
      value: "affiliates"
    },
    {
      key: "/de/affiliates/new/create",
      value: "createAffiliates"
    },
    {
      key: "/de/affiliates/:affiliateId/urls",
      value: "affiliateUrls"
    },
    {
      key: "/de/affiliates/:affiliateId/urls/:urlId/update",
      value: "updateAffiliateUrl"
    },
    {
      key: "/de/affiliates/:affiliateId/urls/create",
      value: "createAffiliateUrl"
    },
    {
      key: "/de/affiliates/:affiliateId/affiliate-reporting",
      value: "affiliateReporting"
    },
    {
      key: "/de/affiliates/:affiliateId/affiliate-promotions",
      value: "affiliatePromotions"
    },
    {
      key: "/de/affiliates/:affiliateId/promote",
      value: "promoteAffiliate"
    },
    {
      key: "/de/promotions",
      value: "promotions"
    },
    {
      key: "/de/promotions/create-promotion",
      value: "createPromotion"
    },
    {
      key: "/de/promotions/:promotionId/update-promotion",
      value: "updatePromotion"
    },
    {
      key: "/de/affiliates/:affiliateId/update",
      value: "updateAffiliate"
    },
    {
      key: "/de/all-players",
      value: "players"
    },
    {
      key: "/de/all-players/:playerId/credit",
      value: "playerCredit"
    },
    {
      key: "/de/all-players/:playerId/credit-energy",
      value: "playerCreditEnergy"
    },
    {
      key: "/de/all-players/:playerId/credit-bonus",
      value: "playerCreditBonus"
    },
    {
      key: "/de/all-players/:playerId/player-xp",
      value: "playerXp"
    },
    {
      key: "/de/all-players/:playerId/bonus-transactions",
      value: "playerBonusTransactions"
    },
    {
      key: "/de/all-players/:playerId/block",
      value: "playerBlock"
    },
    {
      key: "/de/all-players/:playerId/withdraw",
      value: "playerWithdraw"
    },
    {
      key: "/de/all-players/:playerId/transactions",
      value: "playerTransactions"
    },
    {
      key: "/de/all-players/:playerId/matches",
      value: "playerMatches"
    },
    {
      key: "/de/all-players/:playerId/boy-profile",
      value: "playerBoyProfile"
    },
    {
      key: "/de/all-players/:playerId",
      value: "playerDetailsAdmin"
    },
    {
      key: "/de/global-chat",
      value: "globalChat"
    },
    {
      key: "/de/bonus-transaction-details/:transactionId/",
      value: "bonusTransactionDetails"
    },
    {
      key: "/de/bonus-campaigns",
      value: "bonusCampaigns"
    },
    {
      key: "/de/bonus-campaigns/new/create",
      value: "createBonusCampaigns"
    },
    {
      key: "/de/bonus-campaigns/:bonusId",
      value: "bonusCampaignsDetails"
    },
    {
      key: "/de/admin-games",
      value: "adminGames"
    },
    {
      key: "/de/admin-games/:gameId/:gameAction?",
      value: "adminGameDetails"
    },
    {
      key: "/de/admin-matches",
      value: "adminMatches"
    },
    {
      key: "/de/admin-matches/matchmaking",
      value: "adminMatchMaking"
    },
    {
      key: "/de/admin-boy-matches",
      value: "adminBoyMatches"
    },
    {
      key: "/de/admin-boy-matches/:matchId/update-status",
      value: "updateAdminBoyMatch"
    },
    {
      key: "/de/referral",
      value: "playerReferral"
    },
    {
      key: "/de/ips-report",
      value: "ipsReport"
    },
    {
      key: "/de/ips-report/detail",
      value: "ipsReportDetail"
    },
    {
      key: "/de/uplay/:gameId",
      value: "boyGameLobby"
    },
    {
      key: "/de/uplay/:gameId/update-boy-profile",
      value: "boyUpdateProfile"
    },
    {
      key: "/de/uplay/match/:matchId",
      value: "boyMatch"
    },
    {
      key: "/de/ios-a2hs",
      value: "IosAddToHomeScreen"
    }
  ]
};
