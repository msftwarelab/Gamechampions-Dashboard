const GameLobbyTheme = ({ colors }) => ({
  gameLobbyBannerTheme: {
    headerTheme: {
      color: colors.white,
      textAlign: "center",
      margin: "0"
    },
    summaryTheme: {
      color: colors.white
    },
    ctaButtonTheme: {
      color: colors.white,
      backgroundColor: "transparent",
      hoverColor: colors.white,
      opacity: 0.9,
      icon: "addCircle"
    }
  }
});

export default GameLobbyTheme;
