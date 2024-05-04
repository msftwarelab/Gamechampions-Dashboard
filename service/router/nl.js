export const nlRoutes = {
  root: "nl",
  urlsAndDocTypes: [
    {
      key: "/nl/streams",
      value: "home"
    },
    {
      key: "/nl/arena",
      value: "sports"
    },
    {
      key: "/nl/arena/get-bonus",
      value: "getBonus"
    },
    {
      key: "/nl/livestats",
      value: "liveStats"
    },
    {
      key: "/nl/forgot-password",
      value: "forgotPassword"
    },
    {
      key: "/nl/reset-password",
      value: "resetPassword"
    },
    {
      key: "/nl/login",
      value: "login"
    },
    {
      key: "/nl/registration",
      value: "registration"
    },
    {
      key: "/nl/logout",
      value: "logout"
    },
    {
      key: "/nl/friends",
      value: "friends"
    },
    {
      key: "/nl/my-account/:view",
      value: "myAccount"
    },
    {
      key: "/nl/matches/:view",
      value: "matches"
    },
    {
      key: "/nl/add-friend",
      value: "addFriend"
    },
    {
      key: "/nl/game-lobby/:gameId/recentplayers",
      value: "recentPlayers"
    },
    {
      key: "/nl/game-lobby/:gameId/matchmaking",
      value: "matchMaking"
    },
    {
      key: "/nl/game-lobby/:gameId/rules",
      value: "gameRules"
    },
    {
      key: `/nl/game-lobby/:gameId/tournaments`,
      value: "tournaments"
    },
    {
      key: `/nl/game-lobby/:gameId/tournaments/leaderboard/:tournamentId`,
      value: "tournamentInfo"
    },
    {
      key: `/nl/game-lobby/:gameId/tournaments/results/:tournamentId`,
      value: "tournamentResults"
    },
    {
      key: `/nl/game-lobby/:gameId/tournaments/:tournamentId/paywall`,
      value: "tournamentPaywall"
    },
    {
      key: "/nl/game-lobby/:gameId/chat",
      value: "gameLobbyChat"
    },
    {
      key: "/nl/game-lobby/:gameId/leaderboards",
      value: "leaderBoards"
    },
    {
      key: "/nl/game-lobby/:gameId/leaderboards/:playerId/:playerAction?",
      value: "leaderBoardsDetails"
    },
    {
      key: "/nl/deposit/:step",
      value: "deposit"
    },
    {
      key: "/nl/withdrawal/:step",
      value: "withdrawal"
    },
    {
      key: "/nl/player-details/:playerId",
      value: "playerDetails"
    },
    {
      key: "/nl/player-details/:playerId/matches/:matchId/:matchAction?",
      value: "MatchDetails"
    },
    {
      key: "/nl/create-challenge/:gameId?",
      value: "CreateChallenge"
    },
    {
      key: "/nl/transaction-details/:transactionId/:transactionAction?",
      value: "TransactionDetails"
    },
    {
      key: "/nl/player-details/:playerId/send-challenge/:gameId?",
      value: "SendChallenge"
    },
    {
      key: "/nl/wallet",
      value: "wallet"
    },
    {
      key: "/nl/offers",
      value: "Offers"
    },
    {
      key: "/nl/match-lobby/:matchId",
      value: "matchLobby"
    },
    {
      key: "/nl/match-lobby/:matchId/chat",
      value: "matchLobbyChat"
    },
    {
      key: "/nl/match-lobby/:matchId/report-results",
      value: "reportResults"
    },
    {
      key: "/nl/match-lobby/:matchId/set-score-advantage",
      value: "setScoreAdvantage"
    },
    {
      key: "/nl/notifications",
      value: "notifications"
    },
    {
      key: "/nl/messages/:view",
      value: "messages"
    },
    {
      key: "/nl/support",
      value: "support"
    },
    {
      key: "/nl/affiliates",
      value: "affiliates"
    },
    {
      key: "/nl/affiliates/new/create",
      value: "createAffiliate"
    },
    {
      key: "/nl/affiliates/:affiliateId/urls",
      value: "affiliateUrls"
    },
    {
      key: "/nl/affiliates/:affiliateId/urls/create",
      value: "createAffiliateUrl"
    },
    {
      key: "/nl/affiliates/:affiliateId/urls/:urlId/update",
      value: "updateAffiliateUrl"
    },
    {
      key: "/nl/affiliates/:affiliateId/affiliate-reporting",
      value: "affiliateReporting"
    },
    {
      key: "/nl/affiliates/:affiliateId/affiliate-promotions",
      value: "affiliatePromotions"
    },
    {
      key: "/nl/affiliates/:affiliateId/promote",
      value: "promoteAffiliate"
    },
    {
      key: "/nl/promotions",
      value: "promotions"
    },
    {
      key: "/nl/promotions/create-promotion",
      value: "createPromotion"
    },
    {
      key: "/nl/promotions/:promotionId/update-promotion",
      value: "updatePromotion"
    },
    {
      key: "/nl/affiliates/:affiliateId/update",
      value: "updateAffiliate"
    },
    {
      key: "/nl/all-players",
      value: "players"
    },
    {
      key: "/nl/all-players/:playerId/credit",
      value: "playerCredit"
    },
    {
      key: "/nl/all-players/:playerId/credit-energy",
      value: "playerCreditEnergy"
    },
    {
      key: "/nl/all-players/:playerId/credit-bonus",
      value: "playerCreditBonus"
    },
    {
      key: "/nl/all-players/:playerId/player-xp",
      value: "playerXp"
    },
    {
      key: "/nl/all-players/:playerId/bonus-transactions",
      value: "playerBonusTransactions"
    },
    {
      key: "/nl/all-players/:playerId/block",
      value: "playerBlock"
    },
    {
      key: "/nl/all-players/:playerId/withdraw",
      value: "playerWithdraw"
    },
    {
      key: "/nl/all-players/:playerId/transactions",
      value: "playerTransactions"
    },
    {
      key: "/nl/all-players/:playerId/matches",
      value: "playerMatches"
    },
    {
      key: "/nl/all-players/:playerId/boy-profile",
      value: "playerBoyProfile"
    },
    {
      key: "/nl/all-players/:playerId",
      value: "playerDetailsAdmin"
    },
    {
      key: "/nl/global-chat",
      value: "globalChat"
    },
    {
      key: "/nl/bonus-transaction-details/:transactionId/",
      value: "bonusTransactionDetails"
    },
    {
      key: "/nl/bonus-campaigns",
      value: "bonusCampaigns"
    },
    {
      key: "/nl/bonus-campaigns/new/create",
      value: "createBonusCampaigns"
    },
    {
      key: "/nl/bonus-campaigns/:bonusId",
      value: "bonusCampaignsDetails"
    },
    {
      key: "/nl/admin-games",
      value: "adminGames"
    },
    {
      key: "/nl/admin-games/:gameId/:gameAction?",
      value: "adminGameDetails"
    },
    {
      key: "/nl/admin-matches",
      value: "adminMatches"
    },
    {
      key: "/nl/admin-matches/matchmaking",
      value: "adminMatchMaking"
    },
    {
      key: "/nl/admin-boy-matches",
      value: "adminBoyMatches"
    },
    {
      key: "/nl/admin-boy-matches/:matchId/update-status",
      value: "updateAdminBoyMatch"
    },
    {
      key: "/nl/referral",
      value: "playerReferral"
    },
    {
      key: "/nl/ips-report",
      value: "ipsReport"
    },
    {
      key: "/nl/ips-report/detail",
      value: "ipsReportDetail"
    },
    {
      key: "/nl/uplay/:gameId",
      value: "boyGameLobby"
    },
    {
      key: "/nl/uplay/:gameId/update-boy-profile",
      value: "boyUpdateProfile"
    },
    {
      key: "/nl/uplay/match/:matchId",
      value: "boyMatch"
    },
    {
      key: "/nl/ios-a2hs",
      value: "IosAddToHomeScreen"
    }
  ]
};
