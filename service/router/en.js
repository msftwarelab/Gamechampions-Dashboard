export const enRoutes = {
  root: "en",
  urlsAndDocTypes: [
    {
      key: "/en/streams",
      value: "home"
    },
    {
      key: "/en/arena",
      value: "sports"
    },
    {
      key: "/en/arena/get-bonus",
      value: "getBonus"
    },
    {
      key: "/en/livestats",
      value: "liveStats"
    },
    {
      key: "/en/forgot-password",
      value: "forgotPassword"
    },
    {
      key: "/en/reset-password",
      value: "resetPassword"
    },
    {
      key: "/en/login",
      value: "login"
    },
    {
      key: "/en/registration",
      value: "registration"
    },
    {
      key: "/en/logout",
      value: "logout"
    },
    {
      key: "/en/friends",
      value: "friends"
    },
    {
      key: "/en/my-account/:view",
      value: "myAccount"
    },
    {
      key: "/en/matches/:view",
      value: "matches"
    },
    {
      key: "/en/add-friend",
      value: "addFriend"
    },
    {
      key: "/en/game-lobby/:gameId/recentplayers",
      value: "recentPlayers"
    },
    {
      key: "/en/game-lobby/:gameId/matchmaking",
      value: "matchMaking"
    },
    {
      key: "/en/game-lobby/:gameId/rules",
      value: "gameRules"
    },
    {
      key: `/en/game-lobby/:gameId/tournaments`,
      value: "tournaments"
    },
    {
      key: `/en/game-lobby/:gameId/tournaments/leaderboard/:tournamentId`,
      value: "tournamentInfo"
    },
    {
      key: `/en/game-lobby/:gameId/tournaments/results/:tournamentId`,
      value: "tournamentResults"
    },
    {
      key: `/en/game-lobby/:gameId/tournaments/:tournamentId/paywall`,
      value: "tournamentPaywall"
    },
    {
      key: "/en/game-lobby/:gameId/chat",
      value: "gameLobbyChat"
    },
    {
      key: "/en/game-lobby/:gameId/leaderboards",
      value: "leaderBoards"
    },
    {
      key: "/en/game-lobby/:gameId/leaderboards/:playerId/:playerAction?",
      value: "leaderBoardsDetails"
    },
    {
      key: "/en/deposit/:step",
      value: "deposit"
    },
    {
      key: "/en/withdrawal/:step",
      value: "withdrawal"
    },
    {
      key: "/en/player-details/:playerId",
      value: "playerDetails"
    },
    {
      key: "/en/player-details/:playerId/matches/:matchId/:matchAction?",
      value: "MatchDetails"
    },
    {
      key: "/en/create-challenge/:gameId?",
      value: "CreateChallenge"
    },
    {
      key: "/en/transaction-details/:transactionId/:transactionAction?",
      value: "TransactionDetails"
    },
    {
      key: "/en/player-details/:playerId/send-challenge/:gameId?",
      value: "SendChallenge"
    },
    {
      key: "/en/wallet",
      value: "wallet"
    },
    {
      key: "/en/offers",
      value: "Offers"
    },
    {
      key: "/en/match-lobby/:matchId",
      value: "matchLobby"
    },
    {
      key: "/en/match-lobby/:matchId/chat",
      value: "matchLobbyChat"
    },
    {
      key: "/en/match-lobby/:matchId/report-results",
      value: "reportResults"
    },
    {
      key: "/en/match-lobby/:matchId/set-score-advantage",
      value: "setScoreAdvantage"
    },
    {
      key: "/en/notifications",
      value: "notifications"
    },
    {
      key: "/en/messages/:view",
      value: "messages"
    },
    {
      key: "/en/support",
      value: "support"
    },
    {
      key: "/en/affiliates",
      value: "affiliates"
    },
    {
      key: "/en/affiliates/new/create",
      value: "createAffiliate"
    },
    {
      key: "/en/affiliates/:affiliateId/urls",
      value: "affiliateUrls"
    },
    {
      key: "/en/affiliates/:affiliateId/urls/create",
      value: "createAffiliateUrl"
    },
    {
      key: "/en/affiliates/:affiliateId/urls/:urlId/update",
      value: "updateAffiliateUrl"
    },
    {
      key: "/en/affiliates/:affiliateId/affiliate-reporting",
      value: "affiliateReporting"
    },
    {
      key: "/en/affiliates/:affiliateId/affiliate-promotions",
      value: "affiliatePromotions"
    },
    {
      key: "/en/affiliates/:affiliateId/promote",
      value: "promoteAffiliate"
    },
    {
      key: "/en/promotions",
      value: "promotions"
    },
    {
      key: "/en/promotions/create-promotion",
      value: "createPromotion"
    },
    {
      key: "/en/promotions/:promotionId/update-promotion",
      value: "updatePromotion"
    },
    {
      key: "/en/affiliates/:affiliateId/update",
      value: "updateAffiliate"
    },
    {
      key: "/en/all-players",
      value: "players"
    },
    {
      key: "/en/all-players/:playerId/credit",
      value: "playerCredit"
    },
    {
      key: "/en/all-players/:playerId/credit-energy",
      value: "playerCreditEnergy"
    },
    {
      key: "/en/all-players/:playerId/credit-bonus",
      value: "playerCreditBonus"
    },
    {
      key: "/en/all-players/:playerId/player-xp",
      value: "playerXp"
    },
    {
      key: "/en/all-players/:playerId/bonus-transactions",
      value: "playerBonusTransactions"
    },
    {
      key: "/en/all-players/:playerId/block",
      value: "playerBlock"
    },
    {
      key: "/en/all-players/:playerId/withdraw",
      value: "playerWithdraw"
    },
    {
      key: "/en/all-players/:playerId/transactions",
      value: "playerTransactions"
    },
    {
      key: "/en/all-players/:playerId/matches",
      value: "playerMatches"
    },
    {
      key: "/en/all-players/:playerId/boy-profile",
      value: "playerBoyProfile"
    },
    {
      key: "/en/all-players/:playerId",
      value: "playerDetailsAdmin"
    },
    {
      key: "/en/global-chat",
      value: "globalChat"
    },
    {
      key: "/en/bonus-transaction-details/:transactionId/",
      value: "bonusTransactionDetails"
    },
    {
      key: "/en/bonus-campaigns",
      value: "bonusCampaigns"
    },
    {
      key: "/en/bonus-campaigns/new/create",
      value: "createBonusCampaigns"
    },
    {
      key: "/en/bonus-campaigns/:bonusId",
      value: "bonusCampaignsDetails"
    },
    {
      key: "/en/admin-games",
      value: "adminGames"
    },
    {
      key: "/en/admin-games/:gameId/:gameAction?",
      value: "adminGameDetails"
    },
    {
      key: "/en/admin-matches",
      value: "adminMatches"
    },
    {
      key: "/en/admin-matches/matchmaking",
      value: "adminMatchMaking"
    },
    {
      key: "/en/admin-boy-matches",
      value: "adminBoyMatches"
    },
    {
      key: "/en/admin-boy-matches/:matchId/update-status",
      value: "updateAdminBoyMatch"
    },
    {
      key: "/en/referral",
      value: "playerReferral"
    },
    {
      key: "/en/ips-report",
      value: "ipsReport"
    },
    {
      key: "/en/ips-report/detail",
      value: "ipsReportDetail"
    },
    {
      key: "/en/uplay/:gameId",
      value: "boyGameLobby"
    },
    {
      key: "/en/uplay/:gameId/update-boy-profile",
      value: "boyUpdateProfile"
    },
    {
      key: "/en/uplay/match/:matchId",
      value: "boyMatch"
    },
    {
      key: "/en/ios-a2hs",
      value: "IosAddToHomeScreen"
    }
  ]
};
