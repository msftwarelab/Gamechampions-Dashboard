export const krRoutes = {
  root: "kr",
  urlsAndDocTypes: [
    {
      key: "/kr/streams",
      value: "home"
    },
    {
      key: "/kr/arena",
      value: "sports"
    },
    {
      key: "/kr/arena/get-bonus",
      value: "getBonus"
    },
    {
      key: "/kr/livestats",
      value: "liveStats"
    },
    {
      key: "/kr/forgot-password",
      value: "forgotPassword"
    },
    {
      key: "/kr/reset-password",
      value: "resetPassword"
    },
    {
      key: "/kr/login",
      value: "login"
    },
    {
      key: "/kr/registration",
      value: "registration"
    },
    {
      key: "/kr/logout",
      value: "logout"
    },
    {
      key: "/kr/friends",
      value: "friends"
    },
    {
      key: "/kr/my-account/:view",
      value: "myAccount"
    },
    {
      key: "/kr/matches/:view",
      value: "matches"
    },
    {
      key: "/kr/add-friend",
      value: "addFriend"
    },
    {
      key: "/kr/game-lobby/:gameId/recentplayers",
      value: "recentPlayers"
    },
    {
      key: "/kr/game-lobby/:gameId/matchmaking",
      value: "matchMaking"
    },
    {
      key: "/kr/game-lobby/:gameId/rules",
      value: "gameRules"
    },
    {
      key: `/kr/game-lobby/:gameId/tournaments`,
      value: "tournaments"
    },
    {
      key: `/kr/game-lobby/:gameId/tournaments/leaderboard/:tournamentId`,
      value: "tournamentInfo"
    },
    {
      key: `/kr/game-lobby/:gameId/tournaments/results/:tournamentId`,
      value: "tournamentResults"
    },
    {
      key: `/kr/game-lobby/:gameId/tournaments/:tournamentId/paywall`,
      value: "tournamentPaywall"
    },
    {
      key: "/kr/game-lobby/:gameId/chat",
      value: "gameLobbyChat"
    },
    {
      key: "/kr/game-lobby/:gameId/leaderboards",
      value: "leaderBoards"
    },
    {
      key: "/kr/game-lobby/:gameId/leaderboards/:playerId/:playerAction?",
      value: "leaderBoardsDetails"
    },
    {
      key: "/kr/deposit/:step",
      value: "deposit"
    },
    {
      key: "/kr/withdrawal/:step",
      value: "withdrawal"
    },
    {
      key: "/kr/player-details/:playerId",
      value: "playerDetails"
    },
    {
      key: "/kr/player-details/:playerId/matches/:matchId/:matchAction?",
      value: "MatchDetails"
    },
    {
      key: "/kr/create-challenge/:gameId?",
      value: "CreateChallenge"
    },
    {
      key: "/kr/transaction-details/:transactionId/:transactionAction?",
      value: "TransactionDetails"
    },
    {
      key: "/kr/player-details/:playerId/send-challenge/:gameId?",
      value: "SendChallenge"
    },
    {
      key: "/kr/wallet",
      value: "wallet"
    },
    {
      key: "/kr/offers",
      value: "Offers"
    },
    {
      key: "/kr/match-lobby/:matchId",
      value: "matchLobby"
    },
    {
      key: "/kr/match-lobby/:matchId/chat",
      value: "matchLobbyChat"
    },
    {
      key: "/kr/match-lobby/:matchId/report-results",
      value: "reportResults"
    },
    {
      key: "/kr/match-lobby/:matchId/set-score-advantage",
      value: "setScoreAdvantage"
    },
    {
      key: "/kr/notifications",
      value: "notifications"
    },
    {
      key: "/kr/messages/:view",
      value: "messages"
    },
    {
      key: "/kr/support",
      value: "support"
    },
    {
      key: "/kr/affiliates",
      value: "affiliates"
    },
    {
      key: "/kr/affiliates/new/create",
      value: "createAffiliate"
    },
    {
      key: "/kr/affiliates/:affiliateId/urls",
      value: "affiliateUrls"
    },
    {
      key: "/kr/affiliates/:affiliateId/urls/create",
      value: "createAffiliateUrl"
    },
    {
      key: "/kr/affiliates/:affiliateId/urls/:urlId/update",
      value: "updateAffiliateUrl"
    },
    {
      key: "/kr/affiliates/:affiliateId/affiliate-reporting",
      value: "affiliateReporting"
    },
    {
      key: "/kr/affiliates/:affiliateId/affiliate-promotions",
      value: "affiliatePromotions"
    },
    {
      key: "/kr/affiliates/:affiliateId/promote",
      value: "promoteAffiliate"
    },
    {
      key: "/kr/promotions",
      value: "promotions"
    },
    {
      key: "/kr/promotions/create-promotion",
      value: "createPromotion"
    },
    {
      key: "/kr/promotions/:promotionId/update-promotion",
      value: "updatePromotion"
    },
    {
      key: "/kr/affiliates/:affiliateId/update",
      value: "updateAffiliate"
    },
    {
      key: "/kr/all-players",
      value: "players"
    },
    {
      key: "/kr/all-players/:playerId/credit",
      value: "playerCredit"
    },
    {
      key: "/kr/all-players/:playerId/credit-energy",
      value: "playerCreditEnergy"
    },
    {
      key: "/kr/all-players/:playerId/credit-bonus",
      value: "playerCreditBonus"
    },
    {
      key: "/kr/all-players/:playerId/player-xp",
      value: "playerXp"
    },
    {
      key: "/kr/all-players/:playerId/bonus-transactions",
      value: "playerBonusTransactions"
    },
    {
      key: "/kr/all-players/:playerId/block",
      value: "playerBlock"
    },
    {
      key: "/kr/all-players/:playerId/withdraw",
      value: "playerWithdraw"
    },
    {
      key: "/kr/all-players/:playerId/transactions",
      value: "playerTransactions"
    },
    {
      key: "/kr/all-players/:playerId/matches",
      value: "playerMatches"
    },
    {
      key: "/kr/all-players/:playerId/boy-profile",
      value: "playerBoyProfile"
    },
    {
      key: "/kr/all-players/:playerId",
      value: "playerDetailsAdmin"
    },
    {
      key: "/kr/global-chat",
      value: "globalChat"
    },
    {
      key: "/kr/bonus-transaction-details/:transactionId/",
      value: "bonusTransactionDetails"
    },
    {
      key: "/kr/bonus-campaigns",
      value: "bonusCampaigns"
    },
    {
      key: "/kr/bonus-campaigns/new/create",
      value: "createBonusCampaigns"
    },
    {
      key: "/kr/bonus-campaigns/:bonusId",
      value: "bonusCampaignsDetails"
    },
    {
      key: "/kr/admin-games",
      value: "adminGames"
    },
    {
      key: "/kr/admin-games/:gameId/:gameAction?",
      value: "adminGameDetails"
    },
    {
      key: "/kr/admin-matches",
      value: "adminMatches"
    },
    {
      key: "/kr/admin-matches/matchmaking",
      value: "adminMatchMaking"
    },
    {
      key: "/kr/admin-boy-matches",
      value: "adminBoyMatches"
    },
    {
      key: "/kr/admin-boy-matches/:matchId/update-status",
      value: "updateAdminBoyMatch"
    },
    {
      key: "/kr/referral",
      value: "playerReferral"
    },
    {
      key: "/kr/ips-report",
      value: "ipsReport"
    },
    {
      key: "/kr/ips-report/detail",
      value: "ipsReportDetail"
    },
    {
      key: "/kr/uplay/:gameId",
      value: "boyGameLobby"
    },
    {
      key: "/kr/uplay/:gameId/update-boy-profile",
      value: "boyUpdateProfile"
    },
    {
      key: "/kr/uplay/match/:matchId",
      value: "boyMatch"
    },
    {
      key: "/kr/ios-a2hs",
      value: "IosAddToHomeScreen"
    }
  ]
};
