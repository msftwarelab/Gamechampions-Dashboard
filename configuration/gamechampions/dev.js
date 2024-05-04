export default {
  brandDescription: "",
  storageUrl: "https://gamechampionsstorage.blob.core.windows.net/",
  umbracoApiUrl: "https://cms.gamechampions.com",
  apiUrl: "https://api.gamechampions.com/",
  dashboardUrl: "https://play.gamechampions.com",
  websiteUrl: "https://www.gamechampions.com",
  globalChat: {
    isEnabled: false,
    isHomeChatEnabled: false,
    isGameLobbyMatchesChatEnabled: false
  },
  onlinePlayers: {
    isEnabled: false
  },
  gameLobby: {
    tabs: [
      {
        id: 1,
        name: "Lobby",
        isEnabled: true
      },
      {
        id: 2,
        name: "Matches",
        isEnabled: true
      },
      {
        id: 3,
        name: "Tournament",
        isEnabled: true
      },
      {
        id: 5,
        name: "Rules",
        isEnabled: true
      }
    ]
  },
  ticker: {
    isEnabled: true
  }
};
