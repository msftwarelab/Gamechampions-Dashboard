let id = 100;
export const frPages = [
  {
    meta: {
      title: "La page n'existe pas",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html:
      "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at.</p>",
    template: "Page not Found",
    id: (id += 1),
    name: "Page not Found",
    title: "404 - la page n'existe pas!",
    summary: "",
    url: "/fr/page-not-found",
    isHidden: true
  },
  {
    meta: {
      title: "Messages",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html:
      "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at.</p>",
    template: "Messages",
    id: (id += 1),
    name: "Messages",
    title: "Messages",
    summary: "",
    url: "/fr/messages/:view",
    isHidden: true
  },
  {
    meta: {
      title: "Streams",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>Voici la version française de FEBoilerplate <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Streams",
    id: (id += 1),
    name: "Streams",
    title: "Streams",
    summary: "",
    url: "/fr/streams",
    isHidden: true
  },
  {
    meta: {
      title: "ARENA",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "ARENA",
    id: (id += 1),
    name: "ARENA",
    title: "ARENA",
    summary: "",
    url: "/fr/arena",
    isHidden: true
  },
  {
    meta: {
      title: "Votre profil",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "<p>Vous pouvez voir les données de votre profil</p>",
    template: "Your Profile",
    id: (id += 1),
    name: "YourProfile",
    title: "Votre profil",
    summary: "",
    url: "/fr/profile",
    isHidden: true
  },
  {
    meta: {
      title: "Mot de passe oublié",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html:
      "<p>Ce n'est pas grave ça arrive au meilleur d'entre nous.S'il vous plait rentrez votre email et nous ferons le nécessaire </p>",
    template: "Forgot password",
    id: 5,
    name: "Forgot password",
    title: "Mot de passe oublié",
    summary: "",
    url: `/fr/forgot-password`,
    isHidden: true
  },
  {
    meta: {
      title: "Mise à jour du mot de passe",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "<p>S'il vous plait taper votre nouveau mot de passe.</p>",
    template: "ResetPassword",
    id: (id += 1),
    name: "Reset Password",
    title: "Mise à jour du mot de passe",
    summary: "",
    url: `/fr/reset-password`,
    isHidden: true
  },
  {
    meta: {
      title: "Connexion",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html:
      "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at.</p>",
    template: "Login",
    id: 7,
    name: "Login",
    title: "Connexion",
    summary: "",
    url: `/fr/login`,
    isHidden: true
  },
  {
    meta: {
      title: "Enregistrement",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html:
      "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque omnis dicta soluta cum similique modi doloribus at.</p>",
    template: "Registeration",
    id: (id += 1),
    name: "Enregistrement",
    title: "Enregistrement",
    summary: "",
    url: "/fr/registration",
    isHidden: true
  },
  {
    meta: {
      title: "Mon Compte",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "My Account",
    id: (id += 1),
    name: "My Account",
    title: "",
    summary: "",
    url: "/fr/my-account/:view",
    isHidden: true
  },
  {
    meta: {
      title: "Matches",
      description: "Game Champions matches page",
      keywords: "games, matches",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
    template: "Matches",
    id: (id += 1),
    name: "Matches",
    title: "Matches",
    summary: "",
    url: "/fr/matches/:view",
    isHidden: true
  },
  {
    meta: {
      title: "Ajouter un ami",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "<p>tu peux ajouter un(e) ami(e) en utilisant son adresse email</p>",
    template: "Add Friend",
    id: (id += 1),
    name: "Add Friend",
    title: "Ajouter un ami",
    summary: "",
    url: "/fr/add-friend",
    isHidden: true
  },
  {
    meta: {
      title: "Matchmaking",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Matchmaking",
    id: (id += 1),
    name: "Matchmaking",
    title: "Matchmaking",
    summary: "",
    url: "/fr/game-lobby/:gameId/matchmaking",
    isHidden: true
  },
  {
    meta: {
      title: "Recent Players",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Recent Players",
    id: (id += 1),
    name: "Recent Players",
    title: "Recent Players",
    summary: "",
    url: "/fr/game-lobby/:gameId/recentplayers",
    isHidden: true
  },
  {
    meta: {
      title: "Leaderboards",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Leaderboards",
    id: (id += 1),
    name: "Classements",
    title: "Classements",
    summary: "",
    url: "/fr/game-lobby/:gameId/leaderboards",
    isHidden: true
  },
  {
    meta: {
      title: "Leaderboards Details",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Leaderboards Details",
    id: (id += 1),
    name: "Détails des classements",
    title: "Détails des classements",
    summary: "",
    url: "/fr/game-lobby/:gameId/leaderboards/:playerId/:playerAction?",
    isHidden: true
  },
  {
    meta: {
      title: "Chat du lobby du jeu",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "GameLobbyChat",
    id: (id += 1),
    name: "Game lobby chat",
    title: "Chat du lobby du jeu",
    summary: "",
    url: "/fr/game-lobby/:gameId/chat",
    isHidden: true
  },
  {
    meta: {
      title: "Rules",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Règles",
    id: (id += 1),
    name: "Règles",
    title: "Règles",
    summary: "",
    url: "/fr/game-lobby/:gameId/rules",
    isHidden: true
  },
  {
    meta: {
      title: "Depôt",
      description: "Game Champions deposit page",
      keywords: "wallet, deposit",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Deposit",
    id: (id += 1),
    name: "Deposit",
    title: "Acheter des crédits",
    summary: "",
    url: "/fr/deposit/:step",
    isHidden: true
  },
  {
    meta: {
      title: "Retrait",
      description: "Game Champions withdrawal page",
      keywords: "wallet, withdrawal",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Withdrawal",
    id: (id += 1),
    name: "Retrait",
    title: "Retrait",
    summary: "",
    url: "/fr/withdrawal/:step",
    isHidden: true
  },
  {
    meta: {
      title: "Détails du joueur",
      description: "Game Champions Player Details page",
      keywords: "games, player",

      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
    template: "Player Details",
    id: (id += 1),
    name: "Player Details",
    title: "Détails du joueur",
    summary: "",
    url: "/fr/player-details/:playerId",
    isHidden: true
  },
  {
    meta: {
      title: "Détails du match",
      description: "Game Champions Match Details page",
      keywords: "games, matches",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Match Details",
    id: (id += 1),
    name: "Match Details",
    title: "Détails du match",
    summary: "",
    url: "/fr/player-details/:playerId/matches/:matchId/:matchAction?",
    isHidden: true
  },
  {
    meta: {
      title: "Détails de la transaction",
      description: "Game Champions Transaction Details page",
      keywords: "games, matches",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Transaction Details",
    id: (id += 1),
    name: "Transaction Details",
    title: "Détails de la transaction",
    summary: "",
    url: "/fr/transaction-details/:transactionId/:transactionAction?",
    isHidden: true
  },
  {
    meta: {
      title: "Créer un défi",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Create Challenge",
    id: (id += 1),
    name: "Create Challenge",
    title: "Créer un défi",
    summary: "",
    url: "/fr/create-challenge/:gameId?",
    isHidden: true
  },
  {
    meta: {
      title: "Game details",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Game details",
    id: (id += 1),
    name: "Game details",
    title: "Game details",
    summary: "",
    url: "/fr/admin-games/:gameId/:gameAction?",
    isHidden: true
  },
  {
    meta: {
      title: "Envoyer une demande de défi",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Send Challenge Request",
    id: (id += 1),
    name: "Send Challenge Request",
    title: "Envoyer une demande de défi",
    summary: "",
    url: "/fr/player-details/:playerId/send-challenge/:gameId?",
    isHidden: true
  },
  {
    meta: {
      title: "Wallet",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Wallet",
    id: (id += 1),
    name: "Wallet",
    title: "Portefeuille",
    summary: "",
    url: "/fr/wallet",
    isHidden: true
  },
  {
    meta: {
      title: "Offers",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Offers",
    id: (id += 1),
    name: "Offers",
    title: "Offers",
    summary: "",
    url: "/fr/offers",
    isHidden: true
  },
  {
    meta: {
      title: "Match",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Match",
    id: (id += 1),
    name: "Match",
    title: "Rencontre",
    summary: "",
    url: "/fr/match-lobby/:matchId",
    isHidden: true
  },
  {
    meta: {
      title: "Match chat",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Match chat",
    id: (id += 1),
    name: "Match chat",
    title: "Chat du match",
    summary: "",
    url: "/fr/match-lobby/:matchId/chat",
    isHidden: true
  },
  {
    meta: {
      title: "Set Score Advantage",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Set Score Advantage",
    id: (id += 1),
    name: "Set Score Advantage",
    title: "Définir l'avantage de score",
    summary: "",
    url: "/fr/match-lobby/:matchId/set-score-advantage",
    isHidden: true
  },
  {
    meta: {
      title: "Report Results",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Report Results",
    id: (id += 1),
    name: "Report Results",
    title: "Rapporte les Résultats",
    summary: "",
    url: "/fr/match-lobby/:matchId/report-results",
    isHidden: true
  },
  {
    meta: {
      title: "Notifications",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Notifications",
    id: (id += 1),
    name: "Notifications",
    title: "Notifications",
    summary: "",
    url: "/fr/notifications",
    isHidden: true
  },
  {
    meta: {
      title: "Support",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Support",
    id: (id += 1),
    name: "Support",
    title: "Support",
    summary: "",
    url: "/fr/support",
    isHidden: true
  },
  {
    meta: {
      title: "All players",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "Please submit the value you would like to transfer to the player. ",
    template: "All players",
    id: (id += 1),
    name: "All players",
    title: "All players",
    summary: "",
    url: "/fr/all-players",
    isHidden: true
  },
  {
    meta: {
      title: "Player credit",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "Please submit the value you would like to transfer to the player. ",
    template: "Player credit",
    id: (id += 1),
    name: "Player credit",
    title: "Player credit",
    summary: "",
    url: "/fr/all-players/:playerId/credit",
    isHidden: true
  },
  {
    meta: {
      title: "Player Energy Credit",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "Please submit the value you would like to transfer to the player. ",
    template: "Player credit",
    id: (id += 1),
    name: "Player credit",
    title: "Player credit",
    summary: "",
    url: "/fr/all-players/:playerId/credit-energy",
    isHidden: true
  },
  {
    meta: {
      title: "Player withdraw",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "Please submit the value you would like to transfer to the player. ",
    template: "Player withdraw",
    id: (id += 1),
    name: "Player withdraw",
    title: "Player withdraw",
    summary: "",
    url: "/fr/all-players/:playerId/withdraw",
    isHidden: true
  },
  {
    meta: {
      title: "Player credit bonus",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html:
      "Please submit the value you would like to credit as bonus to the player. ",
    template: "Player credit bonus",
    id: (id += 1),
    name: "Player credit bonus",
    title: "Player credit bonus",
    summary: "",
    url: "/fr/all-players/:playerId/credit-bonus",
    isHidden: true
  },
  {
    meta: {
      title: "Player xp points",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html:
      "Please submit the value you would like to credit as bonus to the player. ",
    template: "Player xp points",
    id: (id += 1),
    name: "Player xp points",
    title: "Player xp points",
    summary: "",
    url: "/fr/all-players/:playerId/player-xp",
    isHidden: true
  },
  {
    meta: {
      title: "Player bonus transactions",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html:
      "Please submit the value you would like to credit as bonus to the player. ",
    template: "Player bonus transactions",
    id: (id += 1),
    name: "Player bonus transactions",
    title: "Player bonus transactions",
    summary: "",
    url: "/fr/all-players/:playerId/bonus-transactions",
    isHidden: true
  },
  {
    meta: {
      title: "Player transactions",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "Please submit the value you would like to transfer to the player. ",
    template: "Player transactions",
    id: (id += 1),
    name: "Player transactions",
    title: "Player transactions",
    summary: "",
    url: "/fr/all-players/:playerId/transactions",
    isHidden: true
  },
  {
    meta: {
      title: "Player matches",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "Please submit the value you would like to transfer to the player. ",
    template: "Player matches",
    id: (id += 1),
    name: "Player matches",
    title: "Player matches",
    summary: "",
    url: "/fr/all-players/:playerId/matches",
    isHidden: true
  },
  {
    meta: {
      title: "Player Boy Profile",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/02/2023"
    },
    html: "Please submit the value you would like to transfer to the player. ",
    template: "Player Boy Profile",
    id: (id += 1),
    name: "Player Boy Profile",
    title: "Player Boy Profile",
    summary: "",
    url: "/fr/all-players/:playerId/boy-profile",
    isHidden: true
  },
  {
    meta: {
      title: "Player Details",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Player Details",
    id: (id += 1),
    name: "Player Details",
    title: "Player Details",
    summary: "",
    url: "/fr/all-players/:playerId",
    isHidden: true
  },
  {
    meta: {
      title: "Global Chat",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Global Chat",
    id: (id += 1),
    name: "Global Chat",
    title: "Global Chat",
    summary: "",
    url: "/fr/global-chat",
    isHidden: true
  },
  {
    meta: {
      title: "Bonus Transaction Details",
      description: "Game Champions Bonus Transaction Details page",
      keywords: "games, matches",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Bonus Transaction Details",
    id: (id += 1),
    name: "Bonus Transaction Details",
    title: "Bonus Transaction Details",
    summary: "",
    url: "/fr/bonus-transaction-details/:transactionId/",
    isHidden: true
  },
  {
    meta: {
      title: "Bonus Campaigns ",
      description: "Game Champions Bonus Campaigns page",
      keywords: "games, matches",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Bonus Campaigns",
    id: (id += 1),
    name: "Bonus Campaigns",
    title: "Bonus Campaigns",
    summary: "",
    url: "/fr/bonus-campaigns/",
    isHidden: true
  },
  {
    meta: {
      title: "Create Bonus Campaign",
      description: "Game Champions Create Bonus Campaign page",
      keywords: "games, matches",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Create Bonus Campaign",
    id: (id += 1),
    name: "Create Bonus Campaign",
    title: "Create Bonus Campaign",
    summary: "",
    url: "/fr/bonus-campaigns/new/create",
    isHidden: true
  },
  {
    meta: {
      title: "Bonus Campaign Details",
      description: "Game Champions Bonus Campaign Details page",
      keywords: "games, matches",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Bonus Campaign Details",
    id: (id += 1),
    name: "Bonus Campaign Details",
    title: "Bonus Campaign Details",
    summary: "",
    url: "/fr/bonus-campaigns/:bonusId",
    isHidden: true
  },
  {
    meta: {
      title: "Games",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Games",
    id: (id += 1),
    name: "Games",
    title: "Games",
    summary: "",
    url: "/fr/admin-games",
    isHidden: true
  },
  {
    meta: {
      title: "Affiliates",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "Please submit the value you would like to transfer to the player. ",
    template: "Affiliates",
    id: (id += 1),
    name: "Affiliates",
    title: "Affiliates",
    summary: "",
    url: "/fr/affiliates",
    isHidden: true
  },
  {
    meta: {
      title: "Create Affiliate",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "Please submit the values you would like to set to the affiliate.",
    template: "Create Affiliate",
    id: (id += 1),
    name: "Create Affiliate",
    title: "Create Affiliate",
    summary: "",
    url: "/fr/affiliates/new/create",
    isHidden: true
  },
  {
    meta: {
      title: "Affiliate Urls",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "Affiliate Urls",
    template: "Affiliate Urls",
    id: (id += 1),
    name: "Affiliate Urls",
    title: "Affiliate Urls",
    summary: "",
    url: "/fr/affiliates/:affiliateId/urls",
    isHidden: true
  },
  {
    meta: {
      title: "Create Affiliate Url",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html:
      "Please submit the values you would like to set to the affiliate Url.",
    template: "Create Affiliate Url",
    id: (id += 1),
    name: "Create Affiliate Url",
    title: "Create Affiliate Url",
    summary: "",
    url: "/fr/affiliates/:affiliateId/urls/create",
    isHidden: true
  },
  {
    meta: {
      title: "AffiliateReporting",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "AffiliatesReporting",
    id: (id += 1),
    name: "AffiliateReporting",
    title: "AffiliateReporting",
    summary: "",
    url: "/fr/affiliates/:affiliateId/affiliate-reporting",
    isHidden: true
  },
  {
    meta: {
      title: "UpdateAffiliate",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,

    template: "UpdateAffiliate",
    id: (id += 1),
    name: "UpdateAffiliate",
    title: "UpdateAffiliate",
    summary: "",
    url: "/fr/affiliates/:affiliateId/update",
    isHidden: true
  },
  {
    meta: {
      title: "Create Promotion",

      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "CreatePromotion",
    id: (id += 1),
    name: "Create Promotion",
    title: "Create Promotion",
    summary: "",
    url: "/fr/promotions/create-promotion",
    isHidden: true
  },
  {
    meta: {
      title: "Update Promotion",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Update Promotion",
    id: (id += 1),
    name: "Update Promotion",
    title: "Update Promotion",
    summary: "",
    url: "/fr/promotions/:promotionId/update-promotion",

    isHidden: true
  },
  {
    meta: {
      title: "Promotions",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Promotions",
    id: (id += 1),
    name: "Promotions",
    title: "Promotions",
    summary: "",
    url: "/fr/promotions",
    isHidden: true
  },
  {
    meta: {
      title: "Update Affiliate Url",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Update Affiliate Url",
    id: (id += 1),
    name: "Update Affiliate Url",
    title: "Update Affiliate Url",
    summary: "",
    url: "/fr/affiliates/:affiliateId/urls/:urlId/update",
    isHidden: true
  },
  {
    meta: {
      title: "Affiliate Promotions",

      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Affiliate Promotions",
    id: (id += 1),
    name: "Affiliate Promotions",
    title: "Affiliate Promotions",
    summary: "",
    url: "/fr/affiliates/:affiliateId/affiliate-promotions",
    isHidden: true
  },
  {
    meta: {
      title: "Promote Affiliate",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Promote Affiliate",
    id: (id += 1),
    name: "Promote Affiliate",
    title: "Promote Affiliate",
    summary: "",
    url: "/fr/affiliates/:affiliateId/promote",

    isHidden: true
  },
  {
    meta: {
      title: "Referral",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Referral",
    id: (id += 1),
    name: "Referral",
    title: "Referral",
    summary: "",
    url: "/fr/referral",
    isHidden: true
  },
  {
    meta: {
      title: "Tournaments",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Tournaments",
    id: (id += 1),
    name: "Tournaments",
    title: "Tournaments",
    summary: "",
    url: "/fr/game-lobby/:gameId/tournaments"
  },
  {
    meta: {
      title: "Matches",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Matches",
    id: (id += 1),
    name: "Matches",
    title: "Matches",
    summary: "",
    url: "/fr/admin-matches",
    isHidden: true
  },
  {
    meta: {
      title: "Matches",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: `<p>Create match</p>`,
    template: "Matches",
    id: (id += 1),
    name: "Matches Making",
    title: "Matches Making",
    summary: "",
    url: "/fr/admin-matches/matchmaking",
    isHidden: true
  },
  {
    meta: {
      title: "BOY Matches",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/27/2023"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Matches",
    id: (id += 1),
    name: "BOY Matches",
    title: "BOY Matches",
    summary: "",
    url: "/fr/admin-boy-matches",
    isHidden: true
  },
  {
    meta: {
      title: "BOY Match Detail",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/27/2023"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Matches",
    id: (id += 1),
    name: "BOY Match Detail",
    title: "BOY Match Detail",
    summary: "",
    url: "/fr/admin-boy-matches/:matchId/update-status"
  },
  {
    meta: {
      title: "IPs Report",
      description: "",
      keywords: "",
      creator: "Cristian Nieto",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Ips report",
    id: (id += 1),
    name: "IPs report",
    title: "IPs report",
    summary: "",
    url: "/fr/ips-report",
    isHidden: true
  },
  {
    meta: {
      title: "IPs Report Detail",
      description: "",
      keywords: "",
      creator: "Cristian Nieto",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Ips report",
    id: (id += 1),
    name: "Ips report Detail",
    title: "Ips report Detail",
    summary: "",
    url: "/fr/ips-report/detail",
    isHidden: true
  },
  {
    meta: {
      title: "UPlay Lobby",
      description: "",
      keywords: "",
      creator: "Cristian Nieto",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Ips report",
    id: (id += 1),
    name: "UPlay Lobby",
    title: "UPlay Lobby",
    summary: "",
    url: "/fr/uplay/:gameId",
    isHidden: true
  },
  {
    meta: {
      title: "Update BOY Profile",
      description: "",
      keywords: "",
      creator: "John Doe",
      date: "01/01/2018"
    },
    html: "",
    template: "Update BOY Profile",
    id: (id += 1),
    name: "Update BOY Profile",
    title: "Update BOY Profile",
    summary: "",
    url: "/fr/uplay/:gameId/update-boy-profile",
    isHidden: true
  },
  {
    meta: {
      title: "UPlay Match",
      description: "",
      keywords: "",
      creator: "Cristian Nieto",
      date: "01/01/2018"
    },
    html: `<p>FE Boilerplate Malta can assist you to find the opportunity that you’re looking for or help you sustain your growth in business by finding excellent and suitable candidates for the opportunities you’re offering! Recruiting both from professional workers; from an administrator up to CEO level and also skilled workers. Should there’s a problem on the system please contact Emanuel on +356 20161010  or <a href="mailto:feboilerplate@incredible.com" target="_top">feboilerplate@incredible.com</a></p>`,
    template: "Ips report",
    id: (id += 1),
    name: "UPlay Match",
    title: "UPlay Match",
    summary: "",
    url: "/fr/uplay/match/:gameId",
    isHidden: true
  }
];
