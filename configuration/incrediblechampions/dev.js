export default {
  brandDescription: "",
  storageUrl: "https://gamechampionsstorage.blob.core.windows.net/",
  umbracoApiUrl: "https://gamechampions-web-api-win-staging.azurewebsites.net/",
  apiUrl: "https://gamechampions-api-lnx-staging.azurewebsites.net/",
  dashboardUrl: "https://gamechampions-lnx-staging.azurewebsites.net",
  websiteUrl: "https://gamechampions-web-lnx-staging.azurewebsites.net",
  globalChat: {
    isEnabled: false
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
        isEnabled: false
      },
      {
        id: 5,
        name: "Rules",
        isEnabled: false
      }
    ]
  },
  ticker: {
    isEnabled: true
  }
};
