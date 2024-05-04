export const esRoutes = {
  root: "es",
  urlsAndDocTypes: [
    {
      key: "/es/streams",
      value: "home"
    },
    {
      key: "/es/arena",
      value: "sports"
    },
    {
      key: "/es/arena/get-bonus",
      value: "getBonus"
    },
    {
      key: "/es/livestats",
      value: "liveStats"
    },
    {
      key: "/es/forgot-password",
      value: "forgotPassword"
    },
    {
      key: "/es/reset-password",
      value: "resetPassword"
    },
    {
      key: "/es/login",
      value: "login"
    },
    {
      key: "/es/registration",
      value: "registration"
    },
    {
      key: "/es/logout",
      value: "logout"
    },
    {
      key: "/es/friends",
      value: "friends"
    },
    {
      key: "/es/my-account/:view",
      value: "myAccount"
    },
    {
      key: "/es/matches/:view",
      value: "matches"
    },
    {
      key: "/es/add-friend",
      value: "addFriend"
    },
    {
      key: "/es/game-lobby/:gameId/recentplayers",
      value: "recentPlayers"
    },
    {
      key: "/es/game-lobby/:gameId/matchmaking",
      value: "matchMaking"
    },
    {
      key: "/es/game-lobby/:gameId/rules",
      value: "gameRules"
    },
    {
      key: `/es/game-lobby/:gameId/tournaments`,
      value: "tournaments"
    },
    {
      key: `/es/game-lobby/:gameId/tournaments/leaderboard/:tournamentId`,
      value: "tournamentInfo"
    },
    {
      key: `/es/game-lobby/:gameId/tournaments/results/:tournamentId`,
      value: "tournamentResults"
    },
    {
      key: `/es/game-lobby/:gameId/tournaments/:tournamentId/paywall`,
      value: "tournamentPaywall"
    },
    {
      key: "/es/game-lobby/:gameId/chat",
      value: "gameLobbyChat"
    },
    {
      key: "/es/game-lobby/:gameId/leaderboards",
      value: "leaderBoards"
    },
    {
      key: "/es/game-lobby/:gameId/leaderboards/:playerId/:playerAction?",
      value: "leaderBoardsDetails"
    },
    {
      key: "/es/deposit/:step",
      value: "deposit"
    },
    {
      key: "/es/withdrawal/:step",
      value: "withdrawal"
    },
    {
      key: "/es/player-details/:playerId",
      value: "playerDetails"
    },
    {
      key: "/es/player-details/:playerId/matches/:matchId/:matchAction?",
      value: "MatchDetails"
    },
    {
      key: "/es/create-challenge/:gameId?",
      value: "CreateChallenge"
    },
    {
      key: "/es/transaction-details/:transactionId/:transactionAction?",
      value: "TransactionDetails"
    },
    {
      key: "/es/player-details/:playerId/send-challenge/:gameId?",
      value: "SendChallenge"
    },
    {
      key: "/es/wallet",
      value: "wallet"
    },
    {
      key: "/es/offers",
      value: "Offers"
    },
    {
      key: "/es/match-lobby/:matchId",
      value: "matchLobby"
    },
    {
      key: "/es/match-lobby/:matchId/chat",
      value: "matchLobbyChat"
    },
    {
      key: "/es/match-lobby/:matchId/report-results",
      value: "reportResults"
    },
    {
      key: "/es/match-lobby/:matchId/set-score-advantage",
      value: "setScoreAdvantage"
    },
    {
      key: "/es/notifications",
      value: "notifications"
    },
    {
      key: "/es/messages/:view",
      value: "messages"
    },
    {
      key: "/es/support",
      value: "support"
    },
    {
      key: "/es/affiliates",
      value: "affiliates"
    },
    {
      key: "/es/affiliates/new/create",
      value: "createAffiliates"
    },
    {
      key: "/es/affiliates/:affiliateId/urls",
      value: "affiliateUrls"
    },
    {
      key: "/es/affiliates/:affiliateId/urls/create",
      value: "createAffiliateUrl"
    },
    {
      key: "/es/affiliates/:affiliateId/urls/:urlId/update",
      value: "updateAffiliateUrl"
    },
    {
      key: "/es/affiliates/:affiliateId/affiliate-reporting",
      value: "affiliateReporting"
    },
    {
      key: "/es/affiliates/:affiliateId/affiliate-promotions",
      value: "affiliatePromotions"
    },
    {
      key: "/es/affiliates/:affiliateId/promote",
      value: "promoteAffiliate"
    },
    {
      key: "/es/promotions",
      value: "promotions"
    },
    {
      key: "/es/promotions/create-promotion",
      value: "createPromotion"
    },
    {
      key: "/es/promotions/:promotionId/update-promotion",
      value: "updatePromotion"
    },
    {
      key: "/es/affiliates/:affiliateId/update",
      value: "updateAffiliate"
    },
    {
      key: "/es/all-players",
      value: "players"
    },
    {
      key: "/es/all-players/:playerId/credit",
      value: "playerCredit"
    },
    {
      key: "/es/all-players/:playerId/credit-energy",
      value: "playerCreditEnergy"
    },
    {
      key: "/es/all-players/:playerId/credit-bonus",
      value: "playerCreditBonus"
    },
    {
      key: "/es/all-players/:playerId/player-xp",
      value: "playerXp"
    },
    {
      key: "/es/all-players/:playerId/bonus-transactions",
      value: "playerBonusTransactions"
    },
    {
      key: "/es/all-players/:playerId/block",
      value: "playerBlock"
    },
    {
      key: "/es/all-players/:playerId/withdraw",
      value: "playerWithdraw"
    },
    {
      key: "/es/all-players/:playerId/transactions",
      value: "playerTransactions"
    },
    {
      key: "/es/all-players/:playerId/matches",
      value: "playerMatches"
    },
    {
      key: "/es/all-players/:playerId/boy-profile",
      value: "playerBoyProfile"
    },
    {
      key: "/es/all-players/:playerId",
      value: "playerDetailsAdmin"
    },
    {
      key: "/es/global-chat",
      value: "globalChat"
    },
    {
      key: "/es/bonus-transaction-details/:transactionId/",
      value: "bonusTransactionDetails"
    },
    {
      key: "/es/bonus-campaigns",
      value: "bonusCampaigns"
    },
    {
      key: "/es/bonus-campaigns/new/create",
      value: "createBonusCampaigns"
    },
    {
      key: "/es/bonus-campaigns/:bonusId",
      value: "bonusCampaignsDetails"
    },
    {
      key: "/es/admin-games",
      value: "adminGames"
    },
    {
      key: "/es/admin-games/:gameId/:gameAction?",
      value: "adminGameDetails"
    },
    {
      key: "/es/admin-matches",
      value: "adminMatches"
    },
    {
      key: "/es/admin-matches/matchmaking",
      value: "adminMatchMaking"
    },
    {
      key: "/es/admin-boy-matches",
      value: "adminBoyMatches"
    },
    {
      key: "/es/admin-boy-matches/:matchId/update-status",
      value: "updateAdminBoyMatch"
    },
    {
      key: "/es/referral",
      value: "playerReferral"
    },
    {
      key: "/es/ips-report",
      value: "ipsReport"
    },
    {
      key: "/es/ips-report/detail",
      value: "ipsReportDetail"
    },
    {
      key: "/es/uplay/:gameId",
      value: "boyGameLobby"
    },
    {
      key: "/es/uplay/:gameId/update-boy-profile",
      value: "boyUpdateProfile"
    },
    {
      key: "/es/uplay/match/:matchId",
      value: "boyMatch"
    },
    {
      key: "/es/ios-a2hs",
      value: "IosAddToHomeScreen"
    }
  ]
};
